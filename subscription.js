async function loadTestimonials() {
    try {
        const res = await fetch("http://localhost:3000/api/contact");
        const data = await res.json();

        if (!Array.isArray(data.data)) return;

        const track = document.getElementById("testimonial-track");
        const testimonials = data.data.slice(0, 10); // limit for performance

        const createSlide = (entry) => `
        <div class="testimonial">
          <h3>${entry.name}</h3>
          <p>${entry.message}</p>
        </div>
      `;

        const slides = testimonials.map(createSlide).join("");

        // Duplicate slides for infinite loop
        track.innerHTML = slides + slides;

    } catch (error) {
        console.error("Error loading testimonials:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadTestimonials);