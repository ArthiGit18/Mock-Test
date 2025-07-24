const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get('id');
let formData = {};
const submitButton = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
fetch('https://mock-test-backend-uogj.onrender.com/api/templates', {
  headers: { 'secret': 'dummy-secret' }
})
.then(res => res.json())
.then(data => {
  const test = data.data.find(t => t.id === testId);
  if (!test) return;
  document.getElementById('test-name').textContent = test.name;
  const instructions = document.getElementById('instructions');
  test.sections.forEach(sec => {
    const div = document.createElement('div');
    div.className = 'section';
    div.innerHTML = `
      <h3>${sec.name}</h3>
      <p>Duration: ${sec.duration} seconds</p>
      <p>Questions: ${sec.questionsCount}</p>
    `;
    instructions.appendChild(div);
  });
})
.catch(err => console.error('Error fetching template:', err));
document.getElementById('exam-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  errorMsg.textContent = '';
  if (password !== confirmPassword) {
    errorMsg.textContent = 'Passwords do not match.';
    return;
  }
  formData = { username, password, email, phone, gender, age, examId: testId };
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  try {
    const res = await fetch('https://mock-test-backend-uogj.onrender.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': 'dummy-secret'
      },
      body: JSON.stringify(formData)
    });
    const result = await res.json();
    if (result.error) {
      alert(result.message || 'Registration failed');
      location.reload();
      return;
    }
    document.getElementById('confirmation-popup').style.display = 'flex';
  } catch (err) {
    alert('An unexpected error occurred.');
    console.error(err);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Start Exam';
  }
});
document.getElementById('yes-btn').addEventListener('click', async () => {
  const userData = {
    user: { name: formData.username, email: formData.email },
    examId: testId,
    score: 0,
    total: 0,
    status: 'pending'
  };
  try {
    localStorage.setItem('exam_user', JSON.stringify(userData));
    await fetch('https://mock-test-backend-uogj.onrender.com/api/user/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, status: 'pending' })
    });
    await fetch('https://mock-test-backend-uogj.onrender.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': 'dummy-secret'
      },
      body: JSON.stringify(userData)
    });
    window.location.href = `exam.html?id=${testId}&email=${encodeURIComponent(formData.email)}&user=${encodeURIComponent(formData.username)}`;
  } catch (err) {
    alert('Error submitting start status');
    console.error(err);
    location.reload();
  }
});
document.getElementById('no-btn').addEventListener('click', async () => {
  const userData = {
    user: { name: formData.username, email: formData.email },
    examId: testId,
    score: 0,
    total: 0,
    status: 'not_started'
  };
  try {
    localStorage.setItem('exam_user', JSON.stringify(userData));
    await fetch('https://mock-test-backend-uogj.onrender.com/api/user/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, status: 'not_started' })
    });
    await fetch('https://mock-test-backend-uogj.onrender.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': 'dummy-secret'
      },
      body: JSON.stringify(userData)
    });
    alert('You chose not to start the test.');
  } catch (err) {
    console.error('Error logging not started:', err);
  } finally {
    document.getElementById('confirmation-popup').style.display = 'none';
  }
});
