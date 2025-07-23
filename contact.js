document.addEventListener("DOMContentLoaded", function () {
  const contactHTML = `
    <section class="contact">
      <div class="contact-container">
        <!-- Left: Contact Form -->
        <div class="contact-form">
          <h2>Contact Us</h2>
          <form id="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <!-- Right: Contact Info -->
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <p>We’d love to hear from you. Connect with us on social media or drop us a message anytime!</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:yourmail@example.com">yourmail@example.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a></li>
            <li><strong>Instagram:</strong> <a href="https://instagram.com/yourprofile" target="_blank">@yourprofile</a></li>
          </ul>
        </div>
      </div>
    </section>
  `;
  document.getElementById("contact-section").innerHTML = contactHTML;

  // Add submit handler
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await res.json();
      alert(result.message);

      // Optionally reset form
      if (!result.error) form.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  });
});
