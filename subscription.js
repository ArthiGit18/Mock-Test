
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
                <input type="email" placeholder="Enter your email" required class="igft"/>
                </div>
                <button type="submit">Subscribe</button>
            </div>
        </div>
    </section>
    `;
    document.getElementById("subscription-section").innerHTML = subscriptionHTML;
});
