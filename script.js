// ══════════════════════════════════════
//  Faiza Birthday - Enhanced Script
// ══════════════════════════════════════

// ── Sparkles ──
(function createSparkles() {
    const field = document.getElementById('sparkleField');
    const colors = ['var(--gold)', 'var(--cream)', 'var(--gold-light)', '#fff'];
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.animationDelay = (Math.random() * 10) + 's';
        dot.style.animationDuration = (7 + Math.random() * 5) + 's';
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        field.appendChild(dot);
    }
})();

// ── Floating Balloons ──
(function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    const balloonColors = [
        'radial-gradient(circle at 30% 30%, #c4474a, #7f1d1d)',
        'radial-gradient(circle at 30% 30%, #2d8a5e, #0a3d1f)',
        'radial-gradient(circle at 30% 30%, #fcd34d, #d4a010)',
        'radial-gradient(circle at 30% 30%, #e07070, #991b1b)',
        'radial-gradient(circle at 30% 30%, #4ade80, #14532d)',
    ];
    for (let i = 0; i < 8; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = (5 + Math.random() * 90) + '%';
        b.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        b.style.animationDuration = (12 + Math.random() * 10) + 's';
        b.style.animationDelay = (Math.random() * 15) + 's';
        b.style.width = (40 + Math.random() * 20) + 'px';
        b.style.height = (50 + Math.random() * 24) + 'px';
        container.appendChild(b);
    }
})();

// ── Cursor Particle Trail ──
document.addEventListener('mousemove', (() => {
    let throttle = 0;
    const trailColors = ['#fbbf24', '#fcd34d', '#7f1d1d', '#1a5c3a', '#fff'];
    return function (e) {
        if (Date.now() - throttle < 40) return;
        throttle = Date.now();
        const p = document.createElement('div');
        p.className = 'cursor-particle';
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        p.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    };
})());

// ── Confetti Burst ──
const CONFETTI_COLORS = [
    '#7f1d1d', '#991b1b', '#b91c1c',
    '#1a5c3a', '#14532d', '#2d8a5e',
    '#fbbf24', '#fcd34d', '#fefce8',
];

function burstConfetti(originX, originY) {
    for (let i = 0; i < 90; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const size = 6 + Math.random() * 8;
        const shapes = ['50%', '2px', '0'];
        piece.style.cssText = `
            left:${originX}px; top:${originY}px;
            width:${size}px; height:${size * (0.6 + Math.random() * 0.8)}px;
            background:${color}; border-radius:${shapes[Math.floor(Math.random() * shapes.length)]};
        `;
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 220;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 180;
        piece.animate([
            { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) rotate(${360 + Math.random() * 720}deg) scale(0.3)`, opacity: 0 }
        ], { duration: 1500 + Math.random() * 1500, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)', fill: 'forwards' });
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3500);
    }
}

// ── Fireworks ──
const fwCanvas = document.getElementById('fireworksCanvas');
const fwCtx = fwCanvas.getContext('2d');
let fireworks = [];
let fwParticles = [];

function resizeFwCanvas() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}
resizeFwCanvas();
window.addEventListener('resize', resizeFwCanvas);

class Firework {
    constructor(x, targetY) {
        this.x = x;
        this.y = window.innerHeight;
        this.targetY = targetY;
        this.speed = 4 + Math.random() * 3;
        this.alive = true;
        this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    }
    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.alive = false;
            this.explode();
        }
    }
    explode() {
        const count = 40 + Math.floor(Math.random() * 30);
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.2;
            const speed = 1 + Math.random() * 3;
            fwParticles.push({
                x: this.x, y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                size: 2 + Math.random() * 2,
            });
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function launchFireworks(count = 5) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            fireworks.push(new Firework(
                100 + Math.random() * (window.innerWidth - 200),
                100 + Math.random() * (window.innerHeight * 0.4)
            ));
        }, i * 300);
    }
}

function animateFireworks() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    fireworks = fireworks.filter(fw => {
        fw.update();
        if (fw.alive) fw.draw(fwCtx);
        return fw.alive;
    });

    fwParticles = fwParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= 0.012;
        if (p.alpha <= 0) return false;
        fwCtx.globalAlpha = p.alpha;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fwCtx.fillStyle = p.color;
        fwCtx.fill();
        fwCtx.globalAlpha = 1;
        return true;
    });

    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// ── Cake Interaction ──
let candlesLit = true;

document.getElementById('cakeScene').addEventListener('click', function () {
    const rect = this.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.3;

    if (candlesLit) {
        const flames = document.querySelectorAll('.flame');
        const smokes = document.querySelectorAll('.smoke');
        flames.forEach((f, i) => setTimeout(() => f.classList.add('blown-out'), i * 80));
        smokes.forEach((s, i) => setTimeout(() => s.classList.add('active'), i * 80 + 150));

        burstConfetti(cx, cy);
        launchFireworks(6);
        candlesLit = false;
        document.querySelector('.click-hint').style.opacity = '0';
        setTimeout(() => document.getElementById('relightMsg').classList.add('visible'), 1200);
    } else {
        document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown-out'));
        document.querySelectorAll('.smoke').forEach(s => s.classList.remove('active'));
        candlesLit = true;
        document.getElementById('relightMsg').classList.remove('visible');
        document.querySelector('.click-hint').style.opacity = '';
        burstConfetti(cx, cy);
    }
});

// ── Gift Box ──
document.getElementById('giftBox').addEventListener('click', function () {
    const reveal = document.getElementById('giftReveal');
    reveal.classList.toggle('open');
    if (reveal.classList.contains('open')) {
        const rect = this.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top);
    }
});

// ── Music & Autoplay Overlay ──
const musicBtn = document.getElementById('musicBtn');
const bgGuitar = document.getElementById('bgGuitar');
const trackDot = document.querySelector('.track-dot');
const trackLabel = document.querySelector('.track-label');
const autoplayOverlay = document.getElementById('autoplayOverlay');
const autoplayBtn = document.getElementById('autoplayBtn');
let musicPlaying = false;

bgGuitar.volume = 0.7;

// On "Start Celebration" click: play music, dismiss overlay, launch effects
autoplayBtn.addEventListener('click', function () {
    // Play music
    bgGuitar.play().then(() => {
        musicPlaying = true;
        musicBtn.textContent = '🎵';
        musicBtn.classList.add('playing');
        trackDot.classList.add('active');
    }).catch(err => console.warn('Playback failed:', err));

    // Dismiss overlay with animation
    autoplayOverlay.classList.add('hidden');
    setTimeout(() => autoplayOverlay.remove(), 900);

    // Launch celebration effects
    launchFireworks(8);
    burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
});

// Music toggle button (after overlay is dismissed)
musicBtn.addEventListener('click', function () {
    if (musicPlaying) {
        bgGuitar.pause();
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('playing');
        trackDot.classList.remove('active');
    } else {
        bgGuitar.play().catch(err => console.warn('Playback failed:', err));
        musicBtn.textContent = '🎵';
        musicBtn.classList.add('playing');
        trackDot.classList.add('active');
    }
    musicPlaying = !musicPlaying;
});

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.mosaic-item').forEach(item => {
    item.addEventListener('click', function () {
        const imgSrc = this.dataset.img;
        if (imgSrc) {
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});

// ── Filmstrip Auto-Scroll ──
(function () {
    const track = document.getElementById('filmstripTrack');
    if (!track) return;

    let scrollSpeed = 1;
    let isPaused = false;
    let scrollDir = 1;

    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);
    track.addEventListener('touchstart', () => isPaused = true, { passive: true });
    track.addEventListener('touchend', () => isPaused = false);

    function autoScroll() {
        if (!isPaused) {
            track.scrollLeft += scrollSpeed * scrollDir;
            // Reverse direction at edges
            if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) {
                scrollDir = -1;
            } else if (track.scrollLeft <= 2) {
                scrollDir = 1;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    // Delay start slightly
    setTimeout(autoScroll, 2000);
})();

// ══════════════════════════════════════
//  Birthday Card Generator (PNG)
// ══════════════════════════════════════

(function cardGenerator() {
    const canvas = document.getElementById('cardCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Design themes — Maroon & Deep Blue palette
    const DESIGNS = {
        elegant: {
            bg1: '#4a0e0e', bg2: '#7f1d1d', bg3: '#1a0505',
            accent: '#fbbf24', accent2: '#fcd34d',
            text: '#fefce8', subtext: 'rgba(254,252,232,0.7)',
            border: '#fbbf24', decoColor: '#fbbf24',
            glow: 'rgba(251,191,36,0.15)'
        },
        rose: {
            bg1: '#5c0a2e', bg2: '#8b1a3a', bg3: '#2d0518',
            accent: '#f9a8d4', accent2: '#fce7f3',
            text: '#fce7f3', subtext: 'rgba(252,231,243,0.7)',
            border: '#f9a8d4', decoColor: '#fb7185',
            glow: 'rgba(249,168,212,0.15)'
        },
        ocean: {
            bg1: '#0a0e3d', bg2: '#142560', bg3: '#050720',
            accent: '#67e8f9', accent2: '#a5f3fc',
            text: '#ecfeff', subtext: 'rgba(236,254,255,0.7)',
            border: '#67e8f9', decoColor: '#22d3ee',
            glow: 'rgba(103,232,249,0.15)'
        },
        sunset: {
            bg1: '#3d0a0a', bg2: '#6b1a1a', bg3: '#1f0505',
            accent: '#fdba74', accent2: '#fed7aa',
            text: '#fff7ed', subtext: 'rgba(255,247,237,0.7)',
            border: '#fdba74', decoColor: '#fb923c',
            glow: 'rgba(253,186,116,0.15)'
        },
        lavender: {
            bg1: '#0d1354', bg2: '#1a237e', bg3: '#06092a',
            accent: '#c4b5fd', accent2: '#ddd6fe',
            text: '#ede9fe', subtext: 'rgba(237,233,254,0.7)',
            border: '#c4b5fd', decoColor: '#a78bfa',
            glow: 'rgba(196,181,253,0.15)'
        },
        forest: {
            bg1: '#0a2a2a', bg2: '#0d3d3d', bg3: '#051515',
            accent: '#86efac', accent2: '#bbf7d0',
            text: '#f0fdf4', subtext: 'rgba(240,253,244,0.7)',
            border: '#86efac', decoColor: '#4ade80',
            glow: 'rgba(134,239,172,0.15)'
        }
    };

    let currentDesign = 'elegant';
    let selectedPhoto = 'Fiaza.png';
    let loadedImage = null;

    // Load initial image
    function loadPhoto(src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            loadedImage = img;
            renderCard();
        };
        img.onerror = function () {
            loadedImage = null;
            renderCard();
        };
        img.src = src;
    }

    // Draw rounded rect
    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    // Draw a star
    function drawStar(ctx, cx, cy, spikes, outerR, innerR, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;
        ctx.moveTo(cx, cy - outerR);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
            rot += step;
            ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
            rot += step;
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Draw diamond shape
    function drawDiamond(ctx, cx, cy, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size * 0.6, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size * 0.6, cy);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Render the card on canvas (1200×800)
    function renderCard() {
        const W = canvas.width;
        const H = canvas.height;
        const theme = currentDesign === 'custom' ? buildCustomTheme() : DESIGNS[currentDesign];
        const name = document.getElementById('cardName').value || 'Faiza';
        const from = document.getElementById('cardFrom').value || '';
        const message = document.getElementById('cardMessage').value || '';

        ctx.clearRect(0, 0, W, H);

        // === Background gradient (3-stop for depth) ===
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, theme.bg3);
        bgGrad.addColorStop(0.4, theme.bg1);
        bgGrad.addColorStop(1, theme.bg2);
        roundRect(ctx, 0, 0, W, H, 30);
        ctx.fillStyle = bgGrad;
        ctx.fill();

        // === Radial glow behind photo area ===
        const glowGrad = ctx.createRadialGradient(260, H / 2, 20, 260, H / 2, 300);
        glowGrad.addColorStop(0, theme.glow);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, W, H);

        // === Outer ornamental border ===
        roundRect(ctx, 12, 12, W - 24, H - 24, 24);
        ctx.strokeStyle = theme.border;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // === Inner dotted border ===
        roundRect(ctx, 28, 28, W - 56, H - 56, 18);
        ctx.setLineDash([6, 12]);
        ctx.strokeStyle = theme.border;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // === Decorative corner flourishes ===
        const corners = [
            { x: 50, y: 50 }, { x: W - 50, y: 50 },
            { x: 50, y: H - 50 }, { x: W - 50, y: H - 50 }
        ];
        corners.forEach((c, i) => {
            drawStar(ctx, c.x, c.y, 4, 18, 8, theme.decoColor, 0.35);
            drawDiamond(ctx, c.x + (i % 2 ? -30 : 30), c.y, 8, theme.decoColor, 0.2);
        });

        // === Scattered stars ===
        const starPositions = [
            [120, 60], [W - 120, 60], [W / 2, 45],
            [90, H / 2 - 80], [W - 90, H / 2 + 60],
            [W / 2 - 200, H - 55], [W / 2 + 200, H - 55],
            [W / 2 + 60, 65], [W / 2 - 60, H - 65],
            [180, H - 70], [W - 180, 70],
            [W - 150, H / 2], [150, H / 2 + 100],
        ];
        starPositions.forEach(([x, y], i) => {
            drawStar(ctx, x, y, 4, 10 + (i % 3) * 4, 5 + (i % 2) * 2, theme.decoColor, 0.2 + (i % 4) * 0.06);
        });

        // === Decorative circles ===
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = theme.accent;
        ctx.beginPath(); ctx.arc(W - 180, 160, 140, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(180, H - 140, 110, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(W / 2, H / 2, 250, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;

        // === Photo (left side, larger) ===
        const photoR = 140;
        const photoCX = 260;
        const photoCY = H / 2;

        if (loadedImage) {
            ctx.save();

            // Outer glow ring
            ctx.globalAlpha = 0.15;
            ctx.fillStyle = theme.accent;
            ctx.beginPath();
            ctx.arc(photoCX, photoCY, photoR + 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 0.08;
            ctx.beginPath();
            ctx.arc(photoCX, photoCY, photoR + 36, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Clip circle for photo
            ctx.beginPath();
            ctx.arc(photoCX, photoCY, photoR, 0, Math.PI * 2);
            ctx.clip();

            // Draw image centered
            const imgW = loadedImage.width;
            const imgH = loadedImage.height;
            const scale = Math.max(photoR * 2 / imgW, photoR * 2 / imgH);
            const drawW = imgW * scale;
            const drawH = imgH * scale;
            ctx.drawImage(loadedImage, photoCX - drawW / 2, photoCY - drawH / 2, drawW, drawH);
            ctx.restore();

            // Photo border ring (double ring)
            ctx.beginPath();
            ctx.arc(photoCX, photoCY, photoR + 4, 0, Math.PI * 2);
            ctx.strokeStyle = theme.border;
            ctx.lineWidth = 4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(photoCX, photoCY, photoR + 12, 0, Math.PI * 2);
            ctx.strokeStyle = theme.border;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // === Text area (right side) ===
        const textX = 470;
        const textMaxW = W - textX - 60;

        // Decorative line above title
        const lineTopGrad = ctx.createLinearGradient(textX, 0, textX + 250, 0);
        lineTopGrad.addColorStop(0, theme.accent);
        lineTopGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = lineTopGrad;
        ctx.fillRect(textX, 120, 250, 2);

        // "Happy Birthday" label
        ctx.fillStyle = theme.accent;
        ctx.font = '600 26px Outfit, sans-serif';
        ctx.letterSpacing = '5px';
        ctx.textAlign = 'left';
        ctx.fillText('✨  HAPPY BIRTHDAY  ✨', textX, 160);

        // Name (large)
        ctx.fillStyle = theme.text;
        ctx.font = '700 88px Playfair Display, serif';
        ctx.fillText(name, textX, 260);

        // Decorative line under name
        const nameWidth = ctx.measureText(name).width;
        const lineGrad = ctx.createLinearGradient(textX, 0, textX + Math.min(nameWidth, textMaxW), 0);
        lineGrad.addColorStop(0, theme.accent);
        lineGrad.addColorStop(0.7, theme.accent2);
        lineGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = lineGrad;
        ctx.fillRect(textX, 275, Math.min(nameWidth + 20, textMaxW), 3);

        // Message (wrapped, larger text)
        if (message) {
            ctx.fillStyle = theme.subtext;
            ctx.font = '400 26px Outfit, sans-serif';
            const words = message.split(' ');
            let line = '';
            let lineY = 330;
            const lineH = 38;
            const maxLines = 6;
            let lineCount = 0;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                if (ctx.measureText(testLine).width > textMaxW && line) {
                    ctx.fillText(line.trim(), textX, lineY);
                    line = words[i] + ' ';
                    lineY += lineH;
                    lineCount++;
                    if (lineCount >= maxLines) break;
                } else {
                    line = testLine;
                }
            }
            if (lineCount < maxLines) {
                ctx.fillText(line.trim(), textX, lineY);
            }
        }

        // "From" text
        if (from) {
            ctx.fillStyle = theme.accent2;
            ctx.font = 'italic 28px Playfair Display, serif';
            ctx.fillText('— ' + from, textX, H - 110);
        }

        // Bottom decorative hearts
        ctx.fillStyle = theme.decoColor;
        ctx.globalAlpha = 0.35;
        ctx.font = '30px serif';
        ctx.fillText('♥   ♥   ♥   ♥   ♥', textX, H - 60);
        ctx.globalAlpha = 1;

        // === Corner badge (larger) ===
        ctx.fillStyle = theme.accent;
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.moveTo(W - 140, 0);
        ctx.lineTo(W, 0);
        ctx.lineTo(W, 140);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = theme.accent;
        ctx.font = '36px serif';
        ctx.save();
        ctx.translate(W - 38, 50);
        ctx.rotate(Math.PI / 4);
        ctx.fillText('🎂', -18, 10);
        ctx.restore();

        // === Bottom-left badge ===
        ctx.fillStyle = theme.accent;
        ctx.globalAlpha = 0.08;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(120, H);
        ctx.lineTo(0, H - 120);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.font = '28px serif';
        ctx.save();
        ctx.translate(28, H - 30);
        ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = theme.decoColor;
        ctx.globalAlpha = 0.5;
        ctx.fillText('💖', -10, 6);
        ctx.restore();
        ctx.globalAlpha = 1;
    }

    // Helper: hex to rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // Helper: lighten a hex color
    function lightenHex(hex, amount) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.min(255, r + amount);
        g = Math.min(255, g + amount);
        b = Math.min(255, b + amount);
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    // Helper: darken a hex color
    function darkenHex(hex, amount) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.max(0, r - amount);
        g = Math.max(0, g - amount);
        b = Math.max(0, b - amount);
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    // Build custom theme from color pickers
    function buildCustomTheme() {
        const bg1 = document.getElementById('customBg1').value;
        const bg2 = document.getElementById('customBg2').value;
        const bg3 = document.getElementById('customBg3').value;
        const accent = document.getElementById('customAccent').value;
        const text = document.getElementById('customText').value;
        return {
            bg1, bg2, bg3,
            accent,
            accent2: lightenHex(accent, 50),
            text,
            subtext: hexToRgba(text, 0.7),
            border: accent,
            decoColor: lightenHex(accent, 30),
            glow: hexToRgba(accent, 0.15)
        };
    }

    // Update color preview bar
    function updateColorPreviewBar() {
        const bg1 = document.getElementById('customBg1').value;
        const bg2 = document.getElementById('customBg2').value;
        const bg3 = document.getElementById('customBg3').value;
        const bar = document.getElementById('colorPreviewBar');
        if (bar) bar.style.background = `linear-gradient(135deg, ${bg3}, ${bg1}, ${bg2})`;
    }

    // Custom color panel
    const customPanel = document.getElementById('customColorPanel');
    const customColorIds = ['customBg1', 'customBg2', 'customBg3', 'customAccent', 'customText'];

    // Live update on custom color change
    customColorIds.forEach(id => {
        document.getElementById(id).addEventListener('input', function () {
            if (currentDesign === 'custom') {
                updateColorPreviewBar();
                renderCard();
            }
        });
    });

    // Design picker
    document.getElementById('designGrid').addEventListener('click', function (e) {
        const btn = e.target.closest('.design-option');
        if (!btn) return;
        document.querySelectorAll('.design-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDesign = btn.dataset.design;

        // Toggle custom color panel
        if (currentDesign === 'custom') {
            customPanel.classList.add('open');
        } else {
            customPanel.classList.remove('open');
        }

        renderCard();
    });

    // Photo picker
    document.getElementById('photoPicker').addEventListener('click', function (e) {
        const item = e.target.closest('.photo-pick-item');
        if (!item) return;
        document.querySelectorAll('.photo-pick-item').forEach(p => p.classList.remove('active'));
        item.classList.add('active');
        selectedPhoto = item.dataset.photo;
        loadPhoto(selectedPhoto);
    });

    // Live preview on input change
    ['cardName', 'cardFrom', 'cardMessage'].forEach(id => {
        document.getElementById(id).addEventListener('input', renderCard);
    });

    // Download as PNG (no jsPDF needed)
    document.getElementById('cardDownloadBtn').addEventListener('click', function () {
        renderCard();
        const imgData = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `Birthday_Card_${document.getElementById('cardName').value || 'Faiza'}.png`;
        link.href = imgData;
        link.click();

        // Celebration effect on download
        burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
        launchFireworks(4);
    });

    // Initial render
    loadPhoto(selectedPhoto);
})();
