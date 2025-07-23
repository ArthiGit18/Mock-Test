// async function fetchTemplates() {
//     try {
//         const response = await fetch("http://localhost:3000/api/templates", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "secret": "dummy-secret"
//             }
//         });

//         const result = await response.json();
//         const container = document.getElementById("templateContainer");
//         container.innerHTML = "";

//         if (!result.error && result.data.length > 0) {
//             result.data.forEach((template, index) => {
//                 const card = document.createElement("div");
//                 card.className = "template-card";

//                 card.innerHTML = `
//                     <h2>${template.name || 'Test ' + (index + 1)}</h2>
//                     <p><strong>Module:</strong> ${template.module}</p>
//                     <p><strong>Mock Type:</strong> ${template.mockType}</p>
//                     <p><strong>Duration:</strong> ${template.duration} seconds</p>
//                     <button onclick="window.location.href='instruction.html?id=${template.id}'">Overview</button>
//                 `;

//                 container.appendChild(card);
//             });
//         } else {
//             container.innerHTML = "<p>No templates found.</p>";
//         }
//     } catch (error) {
//         document.getElementById("templateContainer").innerHTML = `<p>Error loading templates: ${error.message}</p>`;
//     }
// }

// fetchTemplates();
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

  // LOGIN
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/test/login", {
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

  // SIGNUP
  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();

    try {
      const res = await fetch("http://localhost:3000/test/signup", {
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

// Fetch templates
async function fetchTemplates() {
  try {
    const response = await fetch("http://localhost:3000/api/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "secret": "dummy-secret"
      }
    });

    const result = await response.json();
    const container = document.getElementById("templateContainer");
    container.innerHTML = "";

    if (!result.error && result.data.length > 0) {
      result.data.forEach((template, index) => {
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
    } else {
      container.innerHTML = "<p>No templates found.</p>";
    }
  } catch (error) {
    document.getElementById("templateContainer").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
