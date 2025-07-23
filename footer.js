
document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-left">
  <div style="display: flex; align-items: center; gap: 10px;">
    <img src="./assets/logo/2.png" alt="Logo" style="height: 100px;" />
    <h3>MyMockApp</h3>
  </div>
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
