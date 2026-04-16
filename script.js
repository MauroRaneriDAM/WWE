// ============================================
// AUTOMATIC INTRO ANIMATION (no scroll)
// ============================================

const ringScene   = document.getElementById('ring-scene');
const ringLuz1    = document.querySelector('.ring-luz1');
const ringLuz2    = document.querySelector('.ring-luz2');
const mainContent = document.getElementById('main-content');
const navbar      = document.getElementById('navbar');
const heroText    = document.querySelector('.hero-text');

// Scroll blocked from start until intro finishes
document.body.style.overflow = 'hidden';

// ============================================
// ANIMATION SEQUENCE
// ============================================
function runIntroAnimation() {

    // 1. Fade out Luz2
    setTimeout(() => {
        ringLuz2.style.transition = 'opacity 1.6s ease-in-out';
        ringLuz2.style.opacity    = '0';
    }, 600);

    // 2. Fade out Luz1
    setTimeout(() => {
        ringLuz1.style.transition = 'opacity 1.8s ease-in-out';
        ringLuz1.style.opacity    = '0';
    }, 1800);

    // 3. Show main content
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 2800);

    // 4. Crossfade ring-scene
    setTimeout(() => {
        ringScene.style.transition    = 'opacity 1.4s ease-in-out';
        ringScene.style.opacity       = '0';
        ringScene.style.pointerEvents = 'none';
    }, 3200);

    // 5. Hide ring-scene completely
    setTimeout(() => {
        ringScene.classList.add('completed');
        ringScene.style.opacity    = '';
        ringScene.style.transition = '';
    }, 4700);

    // 6. Navbar slide-down
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 3600);

    // 7. Hero black overlay fades
    setTimeout(() => {
        const heroSection = document.getElementById('home');
        if (heroSection) heroSection.classList.add('hero-revealed');
    }, 3800);

    // 8. Hero text appears
    setTimeout(() => {
        heroText.classList.add('visible');
    }, 4000);

    // 9. magnetic-ready: removes CSS transition for JS control
    setTimeout(() => {
        heroText.classList.add('magnetic-ready');
    }, 5200);

    // 10. Unlock scroll and start magnetic effect
    //     Scroll only unlocks when animation is fully complete
    setTimeout(() => {
        document.body.style.overflow = '';
        document.body.classList.add('intro-complete');
        initMagneticHero();
    }, 4800);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntroAnimation);
} else {
    runIntroAnimation();
}

// ============================================
// MAGNETIC EFFECT ON HERO
// No custom cursor: uses system default cursor
// Background stays at same size (scale 1.07 base in CSS)
// ============================================
function initMagneticHero() {
    const hero   = document.getElementById('home');
    const heroBg = document.querySelector('.hero-bg img');

    if (!hero || !heroText) return;

    // Only on devices with mouse (not touch)
    if (window.matchMedia('(hover: none)').matches) return;

    // Magnetic effect interpolation state
    let currentX = 0, currentY = 0;
    let targetX  = 0, targetY  = 0;
    let rafId    = null;
    let isInHero = false;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    // Unified animation loop
    function animate() {
        // Magnetic effect: slow and smooth interpolation
        currentX = lerp(currentX, targetX, 0.055);
        currentY = lerp(currentY, targetY, 0.055);

        // Text: moves in mouse direction (foreground)
        heroText.style.transform = `translate(${currentX * 24}px, ${currentY * 18}px)`;

        // Background: smooth parallax without altering base scale
        // Base scale(1.07) comes from CSS, we only offset X and Y
        if (heroBg) {
            heroBg.style.transform = `scale(1.07) translate(${-currentX * 10}px, ${-currentY * 7}px)`;
        }

        // Stop loop if no longer in hero and everything is centered
        if (!isInHero
            && Math.abs(currentX) < 0.001
            && Math.abs(currentY) < 0.001) {
            cancelAnimationFrame(rafId);
            rafId = null;
            currentX = 0;
            currentY = 0;
            heroText.style.transform = '';
            // On exit restore base scale without any offset
            if (heroBg) heroBg.style.transform = 'scale(1.07)';
            return;
        }

        rafId = requestAnimationFrame(animate);
    }

    // Mouse movement inside hero
    hero.addEventListener('mousemove', (e) => {
        const bounds = hero.getBoundingClientRect();

        // Normalize from -1 to 1 inside hero
        targetX = ((e.clientX - bounds.left)  / bounds.width  - 0.5) * 2;
        targetY = ((e.clientY - bounds.top)   / bounds.height - 0.5) * 2;

        if (!rafId) {
            isInHero = true;
            animate();
        }
    });

    // Enter hero
    hero.addEventListener('mouseenter', () => {
        isInHero = true;
        if (!rafId) animate();
    });

    // Leave hero: smoothly return to center
    hero.addEventListener('mouseleave', () => {
        isInHero = false;
        targetX  = 0;
        targetY  = 0;
        if (!rafId) animate();
    });
}

// ============================================
// NAVBAR SCROLL
// ============================================
window.addEventListener('scroll', () => {
    if (navbar.classList.contains('visible')) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================
const elements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
elements.forEach(el => observer.observe(el));

// ============================================
// HAMBURGER MENU
// ============================================
const toggle = document.getElementById('menu-toggle');
const nav    = document.getElementById('nav');
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// ============================================
// WWE 2K SKINS DATA
// ============================================
const skins = [
    {
        name: 'Roman Reigns WrestleMania 42',
        wrestler: 'Roman Reigns',
        img: 'img/RomanReigns.png',
        imgBack: 'img/RomanReigns.png',
        tags: ['#WWE2K24', '#RomanReigns', '#WrestleMania'],
        creator: 'Nicknamed'
    },
    {
        name: 'Roman Reigns Tribal Chief',
        wrestler: 'Roman Reigns',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#TribalChief', '#Bloodline', '#WWE'],
        creator: 'Nicknamed'
    },
    {
        name: 'Roman Reigns Shield',
        wrestler: 'Roman Reigns',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#TheShield', '#Classic', '#Attire'],
        creator: 'Nicknamed'
    },
    {
        name: 'Jey Uso Feb. \'26 Better Hair',
        wrestler: 'Jey Uso',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#JeyUso', '#MainEvent', '#Usos'],
        creator: 'Nicknamed'
    },
    {
        name: 'Jey Uso Promo',
        wrestler: 'Jey Uso',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#JeyUso', '#Promo', '#WWE2K'],
        creator: 'Nicknamed'
    },
    {
        name: 'Jey Uso Main Event',
        wrestler: 'Jey Uso',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#MainEvent', '#YeetCity', '#Uso'],
        creator: 'Nicknamed'
    },
    {
        name: 'AJ Styles Phenomenal',
        wrestler: 'AJ Styles',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#AJStyles', '#Phenomenal', '#P1'],
        creator: 'Nicknamed'
    },
    {
        name: 'AJ Styles TNA',
        wrestler: 'AJ Styles',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#TNA', '#Classic', '#AJStyles'],
        creator: 'Nicknamed'
    },
    {
        name: 'John Cena Ruthless',
        wrestler: 'John Cena',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#JohnCena', '#Ruthless', '#NeverGiveUp'],
        creator: 'Nicknamed'
    },
    {
        name: 'John Cena WrestleMania',
        wrestler: 'John Cena',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#WrestleMania', '#Cena', '#Legend'],
        creator: 'Nicknamed'
    },
    {
        name: 'Brock Lesnar 2013',
        wrestler: 'Brock Lesnar',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#BrockLesnar', '#Beast', '#2013'],
        creator: 'Nicknamed'
    },
    {
        name: 'Brock Lesnar Beast Mode',
        wrestler: 'Brock Lesnar',
        img: 'imagen.jpg',
        imgBack: 'imagen.jpg',
        tags: ['#BeastMode', '#Suplex', '#Lesnar'],
        creator: 'Nicknamed'
    },
];

// ============================================
// MODAL
// ============================================
const modalOverlay  = document.getElementById('modal-overlay');
const modalImage    = document.getElementById('modal-image');
const modalName     = document.getElementById('modal-name');
const modalClose    = document.getElementById('modal-close');
const modalHashtags = document.getElementById('modal-hashtags');
const modalCreator  = document.getElementById('modal-creator');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function openModal(imgSrc, name, tags, creator) {
    modalImage.src = imgSrc;
    modalName.textContent = name;

    const hashtagElements = modalHashtags.querySelectorAll('.hashtag');
    tags.forEach((tag, index) => {
        if (hashtagElements[index]) {
            hashtagElements[index].textContent = tag;
        }
    });

    modalCreator.textContent = `Creator name: ${creator}`;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// SEARCH
// ============================================
function searchSkins(query, skinsArray) {
    if (!query.trim()) return skinsArray;
    const queryLower = query.toLowerCase().trim();
    return skinsArray.filter(skin =>
        skin.name.toLowerCase().includes(queryLower) ||
        skin.wrestler.toLowerCase().includes(queryLower)
    );
}

// ============================================
// GROUP SKINS BY WRESTLER
// ============================================
function groupByWrestler(skinsArray) {
    const groups = {};
    skinsArray.forEach(skin => {
        if (!groups[skin.wrestler]) groups[skin.wrestler] = [];
        groups[skin.wrestler].push(skin);
    });
    return groups;
}

// ============================================
// RENDER CARDS
// ============================================
const wrestlersContainer = document.getElementById('wrestlers-container');
const searchNoResults    = document.getElementById('search-no-results');

function renderGroupedCards(skinsToRender) {
    if (!wrestlersContainer) return;

    wrestlersContainer.innerHTML = '';

    if (skinsToRender.length === 0) {
        if (searchNoResults) searchNoResults.classList.add('visible');
        return;
    }

    if (searchNoResults) searchNoResults.classList.remove('visible');

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
            const card = document.createElement('div');
            card.classList.add('card');

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
// SEARCH BAR
// ============================================
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
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
}

if (searchClear) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        if (searchNoResults) searchNoResults.classList.remove('visible');
        renderGroupedCards(skins);
        searchInput.focus();
    });
}