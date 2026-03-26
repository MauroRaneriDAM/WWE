// ============================================
// SCROLL ANIMATIONS
// Detecta cuando los elementos con clase "hidden"
// entran en el viewport y les anade clase "show"
// ============================================
const elements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            entry.target.classList.add("show"); 
        }
    });
});
elements.forEach(el => observer.observe(el));

// ============================================
// NAVBAR SCROLL
// Anade clase "scrolled" al navbar cuando
// el usuario hace scroll mas de 50px
// ============================================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { 
        navbar.classList.add("scrolled"); 
    } else { 
        navbar.classList.remove("scrolled"); 
    }
});

// ============================================
// MENU HAMBURGUESA
// Toggle del menu en dispositivos moviles
// ============================================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});

// ============================================
// HERO MAGNETIC EFFECT
// Efecto de seguimiento del cursor en el hero
// El texto se mueve ligeramente hacia el mouse
// ============================================
const heroText = document.querySelector('.hero-text');
const heroRing = document.querySelector('.hero-ring');
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    heroText.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;

    if (heroRing) {
        heroRing.style.transform = `translateX(-50%) translate(${x * 0.015}px, ${y * 0.015}px)`;
    }
});

hero.addEventListener('mouseleave', () => {
    heroText.style.transform = `translate(0,0)`;
    if (heroRing) {
        heroRing.style.transform = `translateX(-50%) translate(0,0)`;
    }
});

// ============================================
// DATOS DE SKINS WWE 2K
// Array con todas las skins disponibles
// - name: Nombre de la skin
// - wrestler: Nombre del luchador (para agrupar)
// - img: Imagen principal
// - imgBack: Imagen que se muestra en el modal
// - tags: Array de 3 hashtags
// - creator: Nombre del creador
// ============================================
const skins = [
    { 
        name: "Roman Reigns WrestleMania 42", 
        wrestler: "Roman Reigns",
        img: "RomanReigns.png",
        imgBack: "RomanReigns.png",
        tags: ["#WWE2K24", "#RomanReigns", "#WrestleMania"],
        creator: "Nicknamed"
    },
    { 
        name: "Roman Reigns Tribal Chief", 
        wrestler: "Roman Reigns",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#TribalChief", "#Bloodline", "#WWE"],
        creator: "Nicknamed"
    },
    { 
        name: "Roman Reigns Shield", 
        wrestler: "Roman Reigns",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#TheShield", "#Classic", "#Attire"],
        creator: "Nicknamed"
    },
    { 
        name: "Jey Uso Feb. '26 Better Hair", 
        wrestler: "Jey Uso",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#JeyUso", "#MainEvent", "#Usos"],
        creator: "Nicknamed"
    },
    { 
        name: "Jey Uso Promo", 
        wrestler: "Jey Uso",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#JeyUso", "#Promo", "#WWE2K"],
        creator: "Nicknamed"
    },
    { 
        name: "Jey Uso Main Event", 
        wrestler: "Jey Uso",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#MainEvent", "#YeetCity", "#Uso"],
        creator: "Nicknamed"
    },
    { 
        name: "AJ Styles Phenomenal", 
        wrestler: "AJ Styles",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#AJStyles", "#Phenomenal", "#P1"],
        creator: "Nicknamed"
    },
    { 
        name: "AJ Styles TNA", 
        wrestler: "AJ Styles",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#TNA", "#Classic", "#AJStyles"],
        creator: "Nicknamed"
    },
    { 
        name: "John Cena Ruthless", 
        wrestler: "John Cena",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#JohnCena", "#Ruthless", "#NeverGiveUp"],
        creator: "Nicknamed"
    },
    { 
        name: "John Cena WrestleMania", 
        wrestler: "John Cena",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#WrestleMania", "#Cena", "#Legend"],
        creator: "Nicknamed"
    },
    { 
        name: "Brock Lesnar 2013", 
        wrestler: "Brock Lesnar",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#BrockLesnar", "#Beast", "#2013"],
        creator: "Nicknamed"
    },
    { 
        name: "Brock Lesnar Beast Mode", 
        wrestler: "Brock Lesnar",
        img: "imagen.jpg", 
        imgBack: "imagen.jpg",
        tags: ["#BeastMode", "#Suplex", "#Lesnar"],
        creator: "Nicknamed"
    },
];

// ============================================
// MODAL - ELEMENTOS DEL DOM
// Referencias a los elementos del modal
// ============================================
const modalOverlay = document.getElementById('modal-overlay');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalClose = document.getElementById('modal-close');
const modalHashtags = document.getElementById('modal-hashtags');
const modalCreator = document.getElementById('modal-creator');

// ============================================
// MODAL - CERRAR CON BOTON X
// ============================================
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// ============================================
// MODAL - CERRAR AL HACER CLICK FUERA
// ============================================
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// MODAL - CERRAR CON TECLA ESCAPE
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// MODAL - FUNCION PARA ABRIR
// ============================================
function openModal(imgSrc, name, tags, creator) {
    modalImage.src = imgSrc;
    modalName.textContent = name;
    
    // Actualizar hashtags
    const hashtagElements = modalHashtags.querySelectorAll('.hashtag');
    tags.forEach((tag, index) => {
        if (hashtagElements[index]) {
            hashtagElements[index].textContent = tag;
        }
    });
    
    // Actualizar creador
    modalCreator.textContent = `Created by: ${creator}`;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// BUSQUEDA EXACTA
// Solo muestra resultados que contengan el texto buscado
// ============================================
function searchSkins(query, skinsArray) {
    if (!query.trim()) {
        return skinsArray;
    }
    
    const queryLower = query.toLowerCase().trim();
    
    // Solo devuelve skins donde el nombre o luchador contenga el texto
    return skinsArray.filter(skin => {
        const nameLower = skin.name.toLowerCase();
        const wrestlerLower = skin.wrestler.toLowerCase();
        
        return nameLower.includes(queryLower) || wrestlerLower.includes(queryLower);
    });
}

// ============================================
// AGRUPAR SKINS POR LUCHADOR
// ============================================
function groupByWrestler(skinsArray) {
    const groups = {};
    
    skinsArray.forEach(skin => {
        if (!groups[skin.wrestler]) {
            groups[skin.wrestler] = [];
        }
        groups[skin.wrestler].push(skin);
    });
    
    return groups;
}

// ============================================
// RENDERIZADO DE CARTAS AGRUPADAS POR LUCHADOR
// ============================================
const wrestlersContainer = document.getElementById("wrestlers-container");
const searchNoResults = document.getElementById("search-no-results");

function renderGroupedCards(skinsToRender) {
    wrestlersContainer.innerHTML = "";
    
    if (skinsToRender.length === 0) {
        searchNoResults.classList.add('visible');
        return;
    }
    
    searchNoResults.classList.remove('visible');
    
    const groups = groupByWrestler(skinsToRender);
    
    Object.keys(groups).forEach(wrestlerName => {
        const wrestlerSkins = groups[wrestlerName];
        
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('wrestler-group', 'hidden');
        
        groupDiv.innerHTML = `
            <div class="wrestler-header">
                <h3 class="wrestler-name">${wrestlerName}</h3>
                <hr class="wrestler-divider">
            </div>
            <div class="grid"></div>
        `;
        
        const grid = groupDiv.querySelector('.grid');
        
        wrestlerSkins.forEach(skin => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${skin.img}" alt="${skin.name}">
                </div>
                <div class="card-info">
                    <h3>${skin.name}</h3>
                </div>
            `;
            
            card.addEventListener('click', () => {
                openModal(skin.imgBack, skin.name, skin.tags, skin.creator);
            });
            
            grid.appendChild(card);
        });
        
        wrestlersContainer.appendChild(groupDiv);
        observer.observe(groupDiv);
    });
}

renderGroupedCards(skins);

// ============================================
// BUSCADOR
// ============================================
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");

let searchTimeout;

searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    
    if (query.length > 0) {
        searchClear.classList.add('visible');
    } else {
        searchClear.classList.remove('visible');
    }
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const results = searchSkins(query, skins);
        renderGroupedCards(results);
    }, 300);
});

searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.classList.remove('visible');
    searchNoResults.classList.remove('visible');
    renderGroupedCards(skins);
    searchInput.focus();
});