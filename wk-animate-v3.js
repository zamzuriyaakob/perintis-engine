/* bisnes.live Animation Engine V3 - Ultimate Spec
   Categories: 
   1. Opening Animation (Triangle, Ken Burns, Staggered Text, Scroll Reveal Up/Left/Right)
   2. Cosmetic Animation (3D Flip, Magnetic, Bounce, Zoom)
   Powered by Perintis Digital 
*/

(function() {
    const injectStyles = () => {
        if (document.getElementById('bisnes-live-v3-css')) return;
        const style = document.createElement('style');
        style.id = 'bisnes-live-v3-css';
        style.textContent = `
            /* --- CATEGORY 1: OPENING & ENTRANCE --- */
            /* Triangle Reveal */
            .triangle-reveal {
                clip-path: polygon(50% 50%, 50% 50%, 50% 50%);
                transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
            }
            .triangle-reveal.active { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }

            /* Ken Burns Effect */
            .ken-burns { animation: kenburns 20s infinite alternate; will-change: transform; }
            @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.2) translateY(-20px); } }

            /* Staggered Text Reveal */
            .char-reveal { display: inline-block; opacity: 0; transform: translateY(20px); }
            .char-reveal.show { animation: charShow 0.5s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            @keyframes charShow { to { opacity: 1; transform: translateY(0); } }

            /* Directional Scroll Reveal */
            .reveal-up { opacity: 0; transform: translateY(40px); transition: all 0.8s ease-out; }
            .reveal-left { opacity: 0; transform: translateX(-50px); transition: all 0.8s ease-out; }
            .reveal-right { opacity: 0; transform: translateX(50px); transition: all 0.8s ease-out; }
            
            .reveal-up.active, .reveal-left.active, .reveal-right.active { 
                opacity: 1; transform: translate(0, 0); 
            }

            /* --- CATEGORY 2: COSMETIC & INTERACTION --- */
            /* 3D Flip Card */
            .card-container { perspective: 1000px; }
            .card-inner {
                position: relative; width: 100%; height: 100%;
                transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform; cursor: pointer;
            }
            .card-inner.is-flipped { transform: rotateY(180deg); }
            .card-front, .card-back {
                position: absolute; width: 100%; height: 100%;
                backface-visibility: hidden; -webkit-backface-visibility: hidden;
            }
            .card-back { transform: rotateY(180deg); }

            /* Magnetic Button */
            .magnetic-item { display: inline-block; transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1); }

            /* Bounce Effect */
            .bounce-item:hover { animation: bounce 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            /* Magic Glow & Zoom Image */
            .magic-icon-box:hover { filter: drop-shadow(0 0 10px #a855f7); }
            .zoom-img { transition: transform 0.5s ease; cursor: pointer; }
            .zoom-img:hover { transform: scale(1.15); z-index: 10; }
        `;
        document.head.appendChild(style);
    };

    // LOGIC: 3D Flip
    const init3DFlip = () => {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.card-inner');
            if (card && !e.target.closest('button') && !e.target.closest('a')) {
                card.classList.toggle('is-flipped');
            }
        });
    };

    // LOGIC: Magnetic Interaction
    const initMagnetic = () => {
        document.querySelectorAll('.magnetic-item').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
        });
    };

    // LOGIC: Opening Sequence & Intersection Observer
    const initOpeningAndReveal = () => {
        // Observer for all reveal directions
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { 
                if (entry.isIntersecting) entry.target.classList.add('active'); 
            });
        }, { threshold: 0.15 });
        
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
        
        // Trigger Opening Triangle
        const hero = document.querySelector('.triangle-reveal');
        if (hero) setTimeout(() => hero.classList.add('active'), 100);

        // Trigger Staggered Text Reveal
        const texts = document.querySelectorAll('.staggered-text');
        texts.forEach(text => {
            const content = text.textContent;
            text.textContent = '';
            content.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'char-reveal';
                span.style.animationDelay = `${(i * 0.04) + 0.6}s`;
                text.appendChild(span);
                setTimeout(() => span.classList.add('show'), 50);
            });
        });
    };

    // BOOTSTRAP ALL ENGINES
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        init3DFlip();
        initMagnetic();
        initOpeningAndReveal();
    });
})();
