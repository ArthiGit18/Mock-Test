const userData = JSON.parse(localStorage.getItem('exam_user'));
if (!userData || !userData.examId || !userData.user) {
  alert('User not found. Redirecting...');
  window.location.href = 'index.html';
}
const examId = userData.examId;
const username = userData.user.name;
const email = userData.user.email;
document.getElementById('exam-title').textContent = `Welcome, ${username}! Answer the following questions:`;
fetch(`https://mock-test-backend-uogj.onrender.com/api/questions/${examId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'secret': 'dummy-secret'
  },
  body: JSON.stringify({ user: { name: username, email: email } })
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
    div.innerHTML = `
      <h4>Q${index + 1}. ${q.question}</h4>
      <ul>
        ${q.options.map(opt => `
          <li>
            <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>
          </li>
        `).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
})
.catch(err => {
  console.error('Error loading questions:', err);
  document.getElementById('question-container').textContent = 'Failed to load questions.';
});
function submitExam() {
  const confirmed = confirm("Are you sure you want to submit your answers?");
  if (!confirmed) return;
  const questions = window.examQuestions;
  let score = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.correct) {
      score++;
    }
  });
  const total = questions.length;
  const percentage = ((score / total) * 100).toFixed(2);
  const resultText = `You answered ${score} out of ${total} correctly. (${percentage}%)`;
  document.getElementById('result').textContent = resultText;
  fetch('https://mock-test-backend-uogj.onrender.com/api/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'secret': 'dummy-secret'
    },
    body: JSON.stringify({
      user: { name: username, email },
      examId,
      score,
      total,
      status: 'completed'
    })
  })
    .then(res => res.json())
    .then(() => {
      alert('Submitted successfully!');
      localStorage.removeItem('exam_user');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    })
    .catch(err => {
      console.error(err);
      alert('Failed to submit. Try again.');
    });
}
document.getElementById("submit-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to submit the exam?")) {
    const userId = localStorage.getItem("userId");
    fetch(`https://mock-test-backend-uogj.onrender.com/api/users/${userId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          alert("Test submitted successfully!");
          window.location.href = "index.html";
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch(err => {
        alert("Network Error: " + err.message);
      });
  }
});
