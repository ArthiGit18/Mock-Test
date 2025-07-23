const banners = [
  "Langufiy offers <strong>AI-powered IELTS Mock Tests</strong> that can be embedded into your platform via <strong>API integration</strong>.",
  "Trigger tests with a <strong>Magic Link API</strong> using user info, template ID, and rerouting URL to get a token-based test URL.",
  "Tests can be opened in an <strong>iframe</strong> or a <strong>new browser tab</strong> for a smooth experience.",
  "Access a <strong>Report Fetch API</strong> after the test to get detailed feedback including scores, user answers, and tips.",
  "<strong>Test Types:</strong> Full-Length IELTS, 30-min Diagnostics, or Individual Sections—tailored for user needs."
];

let index = 0;
const bannerText = document.getElementById("banner-text");

function updateBanner() {
  bannerText.classList.remove("active");
  setTimeout(() => {
    bannerText.innerHTML = banners[index];
    bannerText.classList.add("active");
    index = (index + 1) % banners.length;
  }, 300); // Fade-out duration
}

// Initial load
updateBanner();
setInterval(updateBanner, 5000); // Change every 5s
