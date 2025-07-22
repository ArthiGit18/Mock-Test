const apiBase = "https://api.languify.in/client/mockAttempt/status?attemptId=";

async function fetchResult() {
  const attemptId = document.getElementById("attemptId").value.trim();
  const resultContainer = document.getElementById("result");

  if (!attemptId) {
    resultContainer.innerHTML = `<p style="color: red;">Please enter a valid attempt ID.</p>`;
    return;
  }

  resultContainer.innerHTML = `<p>Loading...</p>`;

  try {
    const response = await fetch(`${apiBase}${attemptId}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    resultContainer.innerHTML = `
      <div class="result-item"><span>Name:</span> ${data.name || "N/A"}</div>
      <div class="result-item"><span>Status:</span> ${data.status || "N/A"}</div>
      <div class="result-item"><span>Score:</span> ${data.score || "N/A"}</div>
      <div class="result-item"><span>Attempt Date:</span> ${data.date || "N/A"}</div>
    `;
  } catch (error) {
    resultContainer.innerHTML = `<p style="color: red;">Failed to fetch result. Please check the attempt ID or try again later.</p>`;
    console.error(error);
  }
}
