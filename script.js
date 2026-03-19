// SCROLL ANIMATIONS
const elements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("show"); }
    });
});
elements.forEach(el => observer.observe(el));

// NAVBAR SCROLL
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { navbar.classList.add("scrolled"); }
    else { navbar.classList.remove("scrolled"); }
});

// MENU HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});

// HERO MAGNETIC EFFECT
const heroText = document.querySelector('.hero-text');
const heroRing = document.querySelector('.hero-ring');
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Hero-text se mueve más
    heroText.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;

    // Ring se mueve menos, efecto sutil
    heroRing.style.transform = `translateX(-50%) translate(${x * 0.015}px, ${y * 0.015}px)`;
});

hero.addEventListener('mouseleave', () => {
    heroText.style.transform = `translate(0,0)`;
    heroRing.style.transform = `translateX(-50%) translate(0,0)`;
});

// SKINS DINÁMICOS
const skins = [
    { name: "AJ Styles", img: "imagen.jpg", tag: "aj" },
    { name: "Roman Reigns", img: "imagen.jpg", tag: "roman" },
    { name: "John Cena", img: "imagen.jpg", tag: "john" },
    { name: "AJ Styles 2", img: "imagen.jpg", tag: "aj" },
    { name: "Roman Reigns 2", img: "imagen.jpg", tag: "roman" },
];

const grid = document.getElementById("grid");
function renderCards(filter = "all") {
    grid.innerHTML = "";
    skins.forEach(skin => {
        if (filter === "all" || skin.tag === filter) {
            const card = document.createElement("div");
            card.classList.add("card", "hidden");
            card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <div class="card-img">
              <img src="${skin.img}">
              <div class="overlay"><a href="#">Ver más</a></div>
            </div>
          </div>
          <div class="card-back">${skin.name}</div>
        </div>
      `;
            grid.appendChild(card);
            observer.observe(card);
        }
    });
}
renderCards();

// FILTROS
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCards(btn.dataset.filter);
    });
});

// GLOW DYNAMICO EN CARD
document.addEventListener("mouseover", e => {
    const card = e.target.closest(".card");
    if (card) {
        card.style.boxShadow = "0 0 20px red, 0 0 40px red, 0 0 60px white";
    }
});
document.addEventListener("mouseout", e => {
    const card = e.target.closest(".card");
    if (card) {
        card.style.boxShadow = "none";
    }
});