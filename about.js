document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("about-section");
  const section = document.createElement("section");
  section.className = "about-section";
  section.innerHTML = `
    <div class="about-content">
      <div class="about-image">
        <img src="./assets/1.png" alt="About Image">
      </div>
      <div class="about-text">
        <h2>About Us</h2>
        <p>We are a passionate team dedicated to delivering innovative solutions and exceptional digital experiences. Our journey began with a mission to empower businesses and individuals through technology.</p>
        <ul>
          <li>✔️ 10+ years of industry experience</li>
          <li>✔️ Expert team of developers & designers</li>
          <li>✔️ Customer-first approach</li>
          <li>✔️ Quality-driven development</li>
        </ul>
      </div>
    </div>
  `;
  container.appendChild(section);
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  observer.observe(section);
});
