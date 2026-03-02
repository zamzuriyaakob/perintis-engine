/* Web Kilat Ultimate Engine V3 - Auto-Inject Edition
   Powered by Perintis Digital 
   Updates: Added Delete (removeFromCart) & Reset (resetCart) functionality.
*/

// --- FUNGSI ANIMASI BACKGROUND (PARTICLES) ---
function initParticlesBackground() {
    const particleContainer = document.getElementById('particles-bg');
    
    // Kalau tak wujud div tu, kita abaikan (tak bazir memory)
    if (!particleContainer) return;

    // Load Particles.js secara dinamik
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
        // Configurasi ala-ala aadigital (Network AI)
        particlesJS("particles-bg", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#a855f7", "#3b82f6"] }, // Warna titik (purple/blue)
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8b5cf6", // Warna garisan
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Bergerak perlahan dan elegan
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" }, // Garisan sambung ke mouse bila hover
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    };
    document.body.appendChild(script);
}

// Jalankan fungsi bila script engine diload
document.addEventListener('DOMContentLoaded', () => {
    initParticlesBackground();
});


// Function khas untuk inject CSS bisnes.live
function initBisnesLiveStyles() {
  const engineStyles = `

  /* Magic Glowing Icon FX */
    .magic-icon-box {
      position: relative; border-radius: 0.75rem; z-index: 1; overflow: hidden; display: flex; align-items: center; justify-content: center;
    }
    .magic-icon-box::before {
      content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
      background: conic-gradient(from 0deg, transparent 0%, transparent 70%, #a855f7 100%); /* Warna purple ala aadigital */
      animation: rotate-magic-border 3s linear infinite; z-index: -2;
    }
    .magic-icon-box::after {
      content: ""; position: absolute; inset: 2px; background: inherit; border-radius: calc(0.75rem - 2px); z-index: -1;
    }
    @keyframes rotate-magic-border {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    /* 3D Flip Card FX */
    .flip-card { background-color: transparent; perspective: 1000px; }
    .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.8s; transform-style: preserve-3d; }
    .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
    .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 1.5rem; }
    .flip-card-back { transform: rotateY(180deg); }

    /* Magic Media Float FX */
    .magic-media-item { animation: float 6s ease-in-out infinite; }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = engineStyles;
  document.head.appendChild(styleSheet);
}




document.addEventListener('DOMContentLoaded', function() {
    // 1. AUTO-INJECT DRAWER HTML
    const drawerHTML = `
    <div id="cart-drawer" class="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-2xl z-[100] transform translate-x-full transition-transform duration-300 overflow-y-auto font-sans">
        <div class="p-6 flex flex-col h-full">
            <div class="flex justify-between items-center mb-8">
                <h3 class="text-2xl font-bold text-gray-800">Troli Anda</h3>
                <a href="javascript:void(0)" id="close-cart" class="text-gray-500 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </a>
            </div>
            
            <div id="cart-items" class="flex-grow overflow-y-auto space-y-4"></div>
            
            <div class="border-t pt-6 mt-6">
                <div class="flex justify-between text-xl font-bold mb-6">
                    <span>Jumlah:</span>
                    <span id="cart-total" class="text-blue-900">RM 0.00</span>
                </div>
                
                <div class="space-y-3 mb-6">
                    <input type="text" id="cust-name" placeholder="Nama Penuh" class="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition-all">
                    <input type="tel" id="cust-phone" placeholder="No. Telefon WhatsApp" class="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition-all">
                    <textarea id="cust-address" placeholder="Alamat Penghantaran" rows="2" class="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 outline-none transition-all"></textarea>
                </div>

                <div class="grid grid-cols-4 gap-2 mb-3">
                    <button id="reset-cart" class="col-span-1 bg-gray-100 text-gray-500 py-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center shadow-sm" title="Kosongkan Troli">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                    <button id="checkout-whatsapp" class="col-span-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md">
                        Pesan via WhatsApp
                    </button>
                </div>
                
                <button id="copy-order" class="w-full bg-gray-50 text-gray-500 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    Salin Info Pesanan
                </button>
            </div>
        </div>
    </div>
    <div id="cart-overlay" class="fixed inset-0 bg-black/50 z-[90] hidden transition-opacity"></div>`;

    document.body.insertAdjacentHTML('beforeend', drawerHTML);

    // 2. CORE LOGIC
    lucide.createIcons();
    let cart = JSON.parse(localStorage.getItem('wk_cart')) || [];

    window.updateUI = function() {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        const badgeNav = document.getElementById('cart-badge') || document.getElementById('cart-count');
        
        if(!container || !totalEl) return;
        container.innerHTML = cart.length === 0 ? '<div class="py-20 text-center opacity-40 italic">Troli anda kosong.</div>' : '';
        
        let total = 0;
        cart.forEach((item, index) => {
            total += (item.price * item.quantity);
            const div = document.createElement('div');
            div.className = 'bg-gray-50 p-4 rounded-2xl border flex justify-between items-center group relative';
            div.innerHTML = `
                <div class="pr-8">
                    <div class="font-bold text-sm text-gray-800">${item.name}</div>
                    <div class="text-blue-900 font-bold text-xs">RM ${item.price.toFixed(2)}</div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-3 bg-white px-3 py-1 rounded-full border shadow-sm text-xs">
                        <button onclick="changeQty(${index}, -1)" class="text-gray-400 hover:text-red-500 font-bold px-1">-</button>
                        <span class="font-bold w-4 text-center">${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)" class="text-gray-400 hover:text-green-500 font-bold px-1">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-gray-300 hover:text-red-500 transition-colors" title="Padam">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0-1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                </div>`;
            container.appendChild(div);
        });
        
        totalEl.innerText = 'RM ' + total.toLocaleString(undefined, {minimumFractionDigits: 2});
        if(badgeNav) badgeNav.innerText = cart.reduce((s, i) => s + i.quantity, 0);
        localStorage.setItem('wk_cart', JSON.stringify(cart));
    };

    window.addToCart = function(n, p) {
        if (navigator.vibrate) navigator.vibrate(50); 
        const idx = cart.findIndex(i => i.name === n);
        if (idx > -1) cart[idx].quantity++; else cart.push({ name: n, price: p, quantity: 1 });
        updateUI(); toggleCart(true);
    };

    window.changeQty = function(i, d) {
        cart[i].quantity += d; if (cart[i].quantity <= 0) cart.splice(i, 1); updateUI();
    };

    // FUNGSI BARU: DELETE ITEM
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateUI();
    };

    // FUNGSI BARU: RESET CART
    window.resetCart = function() {
        if(confirm('Kosongkan semua item dalam troli?')) {
            cart = [];
            updateUI();
        }
    };

    function toggleCart(show) {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        if(show) {
            drawer.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            drawer.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        }
    }

    window.checkoutWA = function(bizPhone) {
        if (cart.length === 0) return alert('Troli kosong!');
        const name = document.getElementById('cust-name').value || "-";
        const phone = document.getElementById('cust-phone').value || "-";
        const address = document.getElementById('cust-address').value || "-";

        let msg = "*TEMPAHAN BARU*\\n━━━━━━━━━━━━━━\\n\\n";
        cart.forEach(i => msg += `✅ ${i.quantity}x ${i.name} (RM ${(i.price * i.quantity).toFixed(2)})\\n`);
        msg += `\\n*TOTAL: RM ${cart.reduce((s, i) => s + (i.price*i.quantity), 0).toFixed(2)}*\\n\\n*INFO:*\\nNama: ${name}\\nNo Tel: ${phone}\\nAlamat: ${address}`;
        
        window.open('https://wa.me/' + (bizPhone || '60182240140') + '?text=' + encodeURIComponent(msg.replace(/\\n/g, '\n')), '_blank');
        cart = []; localStorage.removeItem('wk_cart'); updateUI(); toggleCart(false);
    };

    // Listeners
    document.getElementById('close-cart').onclick = () => toggleCart(false);
    document.getElementById('cart-overlay').onclick = () => toggleCart(false);
    document.getElementById('reset-cart').onclick = () => resetCart();
    
    const navTgl = document.getElementById('cart-toggle') || document.querySelector('[onclick="toggleCart()"]');
    if(navTgl) navTgl.onclick = (e) => { e.preventDefault(); toggleCart(true); };
    
    document.getElementById('checkout-whatsapp').onclick = function() {
        const bizPhone = document.querySelector('[data-biz-phone]')?.dataset.bizPhone || '60182240140';
        window.checkoutWA(bizPhone);
    };

    updateUI();
});
