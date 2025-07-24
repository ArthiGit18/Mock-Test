async function loadTestimonials() {
    try {
        const res = await fetch("https://mock-test-backend-uogj.onrender.com/api/contact");
        const data = await res.json();
        if (data.error || !Array.isArray(data.data)) {
            throw new Error("Failed to load testimonials");
        }
        const container = document.getElementById("testimonial-track");
        container.innerHTML = "";
        data.data.slice(0, 6).forEach(entry => {
            const div = document.createElement("div");
            div.className = "testimonial";
            div.innerHTML = `
          <h3>${entry.name}</h3>
          <p>${entry.message}</p>
        `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading testimonials:", err);
    }
}
document.addEventListener("DOMContentLoaded", loadTestimonials);