/* Web Kilat Animation Engine - 3D Card Flip Only
   Powered by Perintis Digital 
*/

function init3DCardFlip() {
    const card = document.querySelector('.card-inner');
    if (!card) return;

    // Inject CSS khusus untuk 3D Flip
    if (!document.getElementById('wk-3d-flip-style')) {
        const style = document.createElement('style');
        style.id = 'wk-3d-flip-style';
        style.textContent = `
            .card-container { perspective: 1000px; }
            .card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform;
            }
            .card-inner.is-flipped { transform: rotateY(180deg); }
            .card-front, .card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }
            .card-back { transform: rotateY(180deg); }
        `;
        document.head.appendChild(style);
    }

    // Listener untuk klik pada kad atau butang flip
    const triggerFlip = () => card.classList.toggle('is-flipped');
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button') && !e.target.closest('a')) {
            triggerFlip();
        }
    });

    const control = document.querySelector('[data-flip-card]');
    if (control) control.onclick = triggerFlip;
}

// Jalankan bila DOM sedia
document.addEventListener('DOMContentLoaded', init3DCardFlip);
