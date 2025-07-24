document.addEventListener("DOMContentLoaded", function () {
    const subscriptionHTML = `
    <section class="subscribe">
      <div class="subscribe-container">
        <div class="subscription_text">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get updates on the latest news, articles, and launches directly in your inbox.</p>
        </div>
        <div class="subscribe-form">
          <div class="subs_input">
            <input type="email" id="subscriber-email" placeholder="Enter your email" required class="igft" />
          </div>
          <button id="subscribe-btn" type="submit">Subscribe</button>
        </div>
        <p id="subscribe-msg" style="color: green; margin-top: 10px;"></p>
      </div>
    </section>
  `;
    document.getElementById("subscription-section").innerHTML = subscriptionHTML;
    const subscribeBtn = document.getElementById("subscribe-btn");
    const emailInput = document.getElementById("subscriber-email");
    const messageBox = document.getElementById("subscribe-msg");
    subscribeBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            messageBox.textContent = "Thanks for subscribing!";
            messageBox.style.color = "yellowgreen";
            messageBox.style.fontSize = "20px";
            messageBox.style.fontWeight = "700";
            emailInput.value = "";
        } else {
            messageBox.textContent = "Please enter a valid email address.";
            messageBox.style.color = "red";
            messageBox.style.fontSize = "20px";
            messageBox.style.fontWeight = "700";
        }
    });
});