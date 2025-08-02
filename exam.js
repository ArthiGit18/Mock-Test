const userData = JSON.parse(localStorage.getItem("exam_user"));


async function verifyUser() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const examId = params.get("examId");

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("login-error");

  loginError.textContent = "";

  if (!username || !password || !email || !examId) {
    loginError.textContent = "All fields required.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/exam/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, examId, username, password })
    });

    const result = await res.json();

    if (result.error) {
      loginError.textContent = result.message || "Verification failed";
      return;
    }

    // Save user info and load questions
    window.examUser = { email, username, examId };
    document.getElementById("login-form").style.display = "none";
    document.querySelector(".exam-container").style.display = "block";

    loadQuestions(); // Load exam questions
  } catch (err) {
    console.error(err);
    loginError.textContent = "Server error. Please try again.";
  }
}


function loadQuestions() {
  const { email, username, examId } = window.examUser;

  document.getElementById('exam-title').textContent = `Welcome, ${username}! Answer the following questions:`;

  fetch(`http://localhost:3000/api/questions/${examId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'secret': 'dummy-secret'
    },
    body: JSON.stringify({ user: { name: username, email } })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('question-container');
      container.innerHTML = '';
      if (data.error || !data.questions || !data.questions.length) {
        container.textContent = 'No questions available.';
        return;
      }

      window.examQuestions = data.questions;

      data.questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question-block';

        // Common question title
        let innerHTML = `<h4>Q${index + 1}. ${q.question}</h4>`;

        if (q.options.length > 0) {
          // If options are present → show multiple choice
          innerHTML += `<ul>
      ${q.options.map(opt => `
        <li>
          <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>
        </li>
      `).join('')}
    </ul>`;
        } else {
          // If no options → show textarea for writing
          innerHTML += `
      <label for="q${index}_textarea">Your Answer:</label><br>
      <textarea id="q${index}_textarea" name="q${index}" rows="5" style="width: 100%; margin-top: 8px; padding: 10px; border-radius: 6px; border: 1px solid #ccc;"></textarea>
    `;
        }

        div.innerHTML = innerHTML;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Error loading questions:', err);
      document.getElementById('question-container').textContent = 'Failed to load questions.';
    });
}



// Submit exam
function submitExam() {
  if (!confirm("Are you sure you want to submit your answers?")) return;

  // Load user and exam data from localStorage
  const userData = JSON.parse(localStorage.getItem("exam_user"));

  if (!userData || !userData.user || !userData.user.email || !userData.examId) {
    alert("User data is missing. Please log in again.");
    console.error("Missing userData:", userData);
    return;
  }

  const questions = window.examQuestions;
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    alert("Questions not loaded. Cannot submit.");
    return;
  }

  let score = 0;

  questions.forEach((q, index) => {
    let userAnswer = "";
    if (q.options && q.options.length > 0) {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      userAnswer = selected ? selected.value : "";
      if (userAnswer === q.correct) {
        score++;
      }
    } else {
      const textarea = document.getElementById(`q${index}_textarea`);
      userAnswer = textarea ? textarea.value.trim() : "";
      // Optional: handle manual grading for subjective answers
    }
  });

  const total = questions.length;
  const percentage = ((score / total) * 100).toFixed(2);
  const resultText = `You scored ${score} out of ${total} (${percentage}%)`;

  const payload = {
    email: userData.user.email,
    examId: userData.examId,
    score: score,
    total: total
  };

  console.log("Submitting payload:", payload);

  // SUBMIT TO SERVER
  fetch("http://localhost:3000/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "secret": "dummy-secret" // Optional: only if your backend requires this
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        // Show result popup
        document.getElementById("result-message").textContent = resultText;
        document.getElementById("result-popup").style.display = "flex";

        localStorage.removeItem("exam_user");

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        alert("Error: " + data.message);
        console.error("Server error:", data);
      }
    })
    .catch(err => {
      alert("Network error occurred.");
      console.error("Fetch error:", err);
    });
}


document.getElementById("leave-btn").addEventListener("click", () => {
  localStorage.removeItem("exam_user");
  window.location.href = "index.html";
});