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
        name: "Royal Rumble '26",
        wrestler: 'Roman Reigns',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664241902424095/3717070_20260506204103_1-Photoroom.png?ex=69fce54e&is=69fb93ce&hm=17416f324ee0f4423fb60097c85db0f4508cf978e4e156c5b005773cf4592af5&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970291981816008/RomanReigns_RoyalRumble2026.jpg?ex=69fe0256&is=69fcb0d6&hm=e5efae70ac3ffdee3a50bef9ec4592ddf05b9ca095d2d9f04a34bbff796b5ef6&',
        tags: ['#WWE2K24', '#RomanReigns', '#WrestleMania'],
        creator: 'Nicknamed'
    },
    {
        name: "Promo April '26",
        wrestler: 'Roman Reigns',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664346907082873/3717070_20260506204646_1-Photoroom.png?ex=69fce567&is=69fb93e7&hm=ec9b02ee70c076d69ce4675be469f66a0cfa17c18601b4e499e327aa3fdb1f9a&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970271010291872/RomanReigns_PromoApril2026.jpg?ex=69fe0251&is=69fcb0d1&hm=4b6d3fccb0391e0a13076e68f8e8453074c43f33b169f27dd4e0b22778fdec17&',
        tags: ['#WWE2K24', '#RomanReigns', '#WrestleMania'],
        creator: 'Nicknamed'
    },
    {
        name: "Wrestlemania 42",
        wrestler: 'Roman Reigns',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664405228617858/3717070_20260506205148_1-Photoroom.png?ex=69fce575&is=69fb93f5&hm=e0a852b62fe915dc41da3c9e48f3d725e91672559c3a4fe2cdde01ae17ebb459&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970321173905458/RomanReigns_Wrestlemania42.jpg?ex=69fe025d&is=69fcb0dd&hm=d7dfdb507e416bf926fb84206048a6a1c028140471af9773cb580d9ae8ec9c86&',
        tags: ['#WWE2K24', '#RomanReigns', '#WrestleMania'],
        creator: 'Nicknamed'
    },
    {
        name: "Royal Rumble '26",
        wrestler: 'Oba Femi',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664270809698594/3717070_20260506204155_1-Photoroom.png?ex=69fce555&is=69fb93d5&hm=ad7eff65d53f466e373bcb6db7c95a1df9718c095006e50296f102908923d77d&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970188680298608/ObaFemi_RoyalRumble2026.jpg?ex=69fe023e&is=69fcb0be&hm=f704ab4d535f1c34635cb47c55bd4c2d423ebf13af4132e24d6a3f50974e1cbd&',
        tags: ['#TribalChief', '#Bloodline', '#WWE'],
        creator: 'Nicknamed'
    },
    {
        name: "March '26",
        wrestler: 'Oba Femi',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664372844662804/3717070_20260506204724_1-Photoroom.png?ex=69fce56e&is=69fb93ee&hm=81bf3e5956b092c73336addb6120261e4bac574408ae7835d61d446d49a2cbd7&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970165972209684/ObaFemi_March2026.jpg?ex=69fe0238&is=69fcb0b8&hm=893ea7509f6b4b1518dfc7bfc5811bae2f8bdb4067a59f114dda3f79ffd03c98&',
        tags: ['#TheShield', '#Classic', '#Attire'],
        creator: 'Nicknamed'
    },
    {
        name: "Promo '26",
        wrestler: 'Penta',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664437700919326/3717070_20260506205314_1-Photoroom.png?ex=69fce57d&is=69fb93fd&hm=d86e32630597ac81eae7ce36105927fc2f330e1446aefd05992d164cc93a4c4e&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970228140052571/Penta_Promo.jpg?ex=69fe0247&is=69fcb0c7&hm=29c970fcbeff9047519a442bc2bd57a178d052a80181ddc85303d229d8eba7ff&',
        tags: ['#JeyUso', '#MainEvent', '#Usos'],
        creator: 'Nicknamed'
    },
    {
        name: "Royal Rumble '25",
        wrestler: 'Penta',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664458521444352/3717070_20260506205608_1-Photoroom.png?ex=69fce582&is=69fb9402&hm=3964386734cccf65a9f2a5fdb50db47d4797a5c731633515a794945b3163d1b2&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970248755314698/Penta_RoyalRumble2025.jpg?ex=69fe024c&is=69fcb0cc&hm=0b0ec3d1179c6f6cc215758b3cbc4d59f0af2f1bd1842d220fd0efa6b72e0309&',
        tags: ['#JeyUso', '#MainEvent', '#Usos'],
        creator: 'Nicknamed'
    },
    {
        name: "Alt. red attire",
        wrestler: 'Penta',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664565916864512/3717070_20260506205846_1-Photoroom.png?ex=69fce59c&is=69fb941c&hm=2f7b20f912c2526857196253373c67c71e2d6cc0ec4f392e44fd15787c8484c7&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970215376785531/Penta_AltRedAttire.jpg?ex=69fe0244&is=69fcb0c4&hm=b1caf3abdeb7a0cd2ce4587903cb8b5ea5c7b1f4cd370d7dc722aa76ad2ae9c1&',
        tags: ['#JeyUso', '#MainEvent', '#Usos'],
        creator: 'Nicknamed'
    },
    {
        name: "Promo April '26",
        wrestler: 'Jey Uso',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664504558256352/3717070_20260506205725_1-Photoroom.png?ex=69fce58d&is=69fb940d&hm=742cdb59fe29f98ae80ea292804724291f1a4f895c03855ee5e3c0d0be2c5ae1&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970130635067443/JeyUso_PromoApril2026.jpg?ex=69fe0230&is=69fcb0b0&hm=cd40af3737964524a76e5ca952310783b44377332965481204e9559f37cab622&',
        tags: ['#JeyUso', '#Promo', '#WWE2K'],
        creator: 'Nicknamed'
    },
    {
        name: "Feb '26",
        wrestler: 'Jey Uso',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664624070758543/3717070_20260506210100_1-Photoroom.png?ex=69fce5a9&is=69fb9429&hm=2e5a8fb1a26a8175a2bf57da18775ce4533d545820823a6f9d69152554ec3267&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970068085412004/JeyUso_Feb2026.jpg?ex=69fe0221&is=69fcb0a1&hm=e8010e2c4819c6069945be3b55af806c66309d0eda2750706a0b5be2094bbf61&',
        tags: ['#MainEvent', '#YeetCity', '#Uso'],
        creator: 'Nicknamed'
    },
    {
        name: "Promo '26",
        wrestler: 'Jey Uso',
        img: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501664664348659732/3717070_20260506210423_1-Photoroom.png?ex=69fce5b3&is=69fb9433&hm=e869c14b384b1b1b6e5a64a0200c9def58c6c8687555c222953b22a1892aef4d&',
        imgBack: 'https://cdn.discordapp.com/attachments/1501662259003265084/1501970104101900449/JeyUso_Promo2026.jpg?ex=69fe022a&is=69fcb0aa&hm=e73d5fdf8a76632f50c7abc776da53654afded772dffc9f9fc202e824565336c&',
        tags: ['#MainEvent', '#YeetCity', '#Uso'],
        creator: 'Nicknamed'
    }
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

// ============================================
// CONTACT FORM - ENVIAR MENSAJE AL BACKEND
// ============================================
const contactForm  = document.getElementById('contact-form');
const submitBtn    = document.getElementById('submit-btn');
const formMessage  = document.getElementById('form-message');
const emailInput   = document.getElementById('email-input');
const messageInput = document.getElementById('message-input');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener valores
        const email   = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validacion basica
        if (!email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Validar formato email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Estado de carga
        submitBtn.classList.add('loading');

        try {
            // Enviar al servidor
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, message })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showFormMessage('Message sent successfully! Thank you for your feedback.', 'success');
                contactForm.reset();
            } else {
                showFormMessage(data.error || 'Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('Connection error. Please try again later.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

// ============================================
// MOSTRAR MENSAJE DEL FORMULARIO
// ============================================
function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className   = 'form-message';
    formMessage.classList.add(type);

    // Ocultar despues de 5 segundos
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}
