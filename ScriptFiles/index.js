const orbitContainer = document.getElementById('orbitContainer');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            orbitContainer.classList.add('visible');
        }
    });
}, {
    threshold: 0.4
});

observer.observe(orbitContainer);

const hoverMap = {
    scoreLogo: "scoreBlock",
    scopeLogo: "scopeBlock",
    scomeLogo: "scomeBlock",
    scorpLogo: "scorpBlock",
    scophLogo: "scophBlock",
    scogsLogo: "scogsBlock",
    scoraLogo: "scoraBlock",
    bemsaLogo: "bemsaBlock"
};


Object.keys(hoverMap).forEach(logoId => {
    const logo = document.getElementById(logoId);
    const blockId = hoverMap[logoId];
    const block = document.getElementById(blockId);

    logo.addEventListener("mouseenter", () => {
        block.style.opacity = 1;
    });

    logo.addEventListener("mouseleave", () => {
        block.style.opacity = 0;
    });
});



const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const nav = document.querySelector('.carousel-nav');

let currentIndex = 0;
let autoplay;


slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    nav.appendChild(dot);
});

const dots = Array.from(document.querySelectorAll('.dot'));

// --- SWIPE VARIABLES ---
let startX = 0;
let endX = 0;
const swipeThreshold = 50; // minimum distance for swipe

function updateCarousel(index) {
    currentIndex = index;

    const slide = slides[index];

    const slideRect = slide.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    const slideCenter = slideRect.left + slideRect.width / 2;
    const viewportCenter = window.innerWidth / 2;

    const offset = slideCenter - viewportCenter;

    const currentTransform = track.style.transform.match(/-?\d+\.?\d*/);
    const currentX = currentTransform ? parseFloat(currentTransform[0]) : 0;

    track.style.transform = `translateX(${currentX - offset}px)`;

    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    updateCarousel((currentIndex + 1) % slides.length);
}

function prevSlide() {
    updateCarousel(
        (currentIndex - 1 + slides.length) % slides.length
    );
}

function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(nextSlide, 5000);
}

slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        if (index === currentIndex) return;

        if (index < currentIndex) {
            prevSlide();
        } else {
            nextSlide();
        }

        resetAutoplay();
    });
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        updateCarousel(Number(dot.dataset.index));
        resetAutoplay();
    });
});

// --- SWIPE SUPPORT ---
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
    const distance = startX - endX;

    if (Math.abs(distance) > swipeThreshold) {
        if (distance > 0) {
            // Swipe left → next slide
            nextSlide();
        } else {
            // Swipe right → previous slide
            prevSlide();
        }

        resetAutoplay();
    }

    // reset values
    startX = 0;
    endX = 0;
});

autoplay = setInterval(nextSlide, 5000);

window.addEventListener('resize', () => {
    updateCarousel(currentIndex);
});
