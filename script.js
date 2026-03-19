// ANIMACIONES AL SCROLL
const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

elements.forEach(el => observer.observe(el));


// EFECTO PARALLAX SUAVE (imagen baja)
window.addEventListener("scroll", () => {
    const img = document.querySelector(".hero-img");
    let scroll = window.scrollY;

    img.style.transform = `translateY(${scroll * 0.2}px)`;
});