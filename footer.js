
  document.addEventListener("DOMContentLoaded", function () {
    const footerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-left">
            <h3>MyCompany</h3>
            <p>&copy; ${new Date().getFullYear()} MyCompany. All rights reserved.</p>
          </div>
          <div class="footer-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    `;
    document.getElementById("footer-section").innerHTML = footerHTML;
  });
