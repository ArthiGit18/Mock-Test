document.addEventListener("DOMContentLoaded", () => {
  fetchTemplates();
  const loginModal = document.getElementById("login-modal");
  const signupModal = document.getElementById("signup-modal");
  const avatarContainer = document.getElementById("avatar-container");
  const avatarName = document.querySelector(".avatar-username");
  const logoutMenu = document.getElementById("logout-menu");
  document.getElementById("open-login").onclick = () => loginModal.style.display = "block";
  document.getElementById("open-signup").onclick = () => signupModal.style.display = "block";
  window.onclick = (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === signupModal) signupModal.style.display = "none";
  };
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    try {
      const res = await fetch("https://mock-test-backend-uogj.onrender.com/test/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.error) {
        loginModal.style.display = "none";
        showUserAvatar(data.user?.username || email);
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      alert("Login error. Please try again.");
    }
  });
  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    try {
      const res = await fetch("https://mock-test-backend-uogj.onrender.com/test/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, phone }),
      });
      const data = await res.json();
      if (!data.error) {
        signupModal.style.display = "none";
        showUserAvatar(data.user?.username || email);
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      alert("Signup error. Please try again.");
    }
  });
  logoutMenu.onclick = () => {
    avatarContainer.style.display = "none";
    document.getElementById("open-login").style.display = "inline-block";
    document.getElementById("open-signup").style.display = "inline-block";
    alert("Logged out");
  };
  function showUserAvatar(username) {
    avatarContainer.style.display = "flex";
    document.getElementById("open-login").style.display = "none";
    document.getElementById("open-signup").style.display = "none";
    avatarName.textContent = username.charAt(0).toUpperCase();
  }
});
let templatesData = [];
let showingAll = false;
async function fetchTemplates() {
  try {
    const response = await fetch("https://mock-test-backend-uogj.onrender.com/api/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "secret": "dummy-secret"
      }
    });
    const result = await response.json();
    if (!result.error && Array.isArray(result.data)) {
      templatesData = result.data;
      renderTemplates();
    } else {
      document.getElementById("templateContainer").innerHTML = "<p>No templates found.</p>";
    }
  } catch (error) {
    document.getElementById("templateContainer").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
function renderTemplates() {
  const container = document.getElementById("templateContainer");
  container.innerHTML = "";
  const dataToRender = showingAll ? templatesData : templatesData.slice(0, 3);
  dataToRender.forEach((template, index) => {
    const card = document.createElement("div");
    card.className = "template-card";
    card.innerHTML = `
      <h2>${template.name || 'Test ' + (index + 1)}</h2>
      <p><strong>Module:</strong> ${template.module}</p>
      <p><strong>Mock Type:</strong> ${template.mockType}</p>
      <p><strong>Duration:</strong> ${template.duration} seconds</p>
      <button onclick="window.location.href='instruction.html?id=${template.id}'">Overview</button>
    `;
    container.appendChild(card);
  });
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.style.display = templatesData.length > 3 ? "inline-block" : "none";
  toggleButton.textContent = showingAll ? "Show Less" : "Show More";
}
function toggleTemplates() {
  showingAll = !showingAll;
  renderTemplates();
}
document.addEventListener("DOMContentLoaded", fetchTemplates);
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
