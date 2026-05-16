// wk-engine-v3.js
(function() {
  'use strict';

  // --- State ---
  let cart = [];
  let bizPhone = '';
  const CART_BAR_ID = 'wk-cart-bar';
  const META_ID = 'biz-meta';

  // --- Init ---
  function init() {
    const metaEl = document.getElementById(META_ID);
    if (!metaEl) { console.warn('wk-engine: #biz-meta not found'); return; }
    
    bizPhone = metaEl.dataset.bizPhone || metaEl.getAttribute('data-biz-phone');
    if (!bizPhone) { console.warn('wk-engine: phone not set'); return; }

    injectCartBar();
    bindGlobalFunctions();
    updateCartUI();
  }

  // --- UI Injection ---
  function injectCartBar() {
    if (document.getElementById(CART_BAR_ID)) return;
    
    const bar = document.createElement('div');
    bar.id = CART_BAR_ID;
    bar.className = 'fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 shadow-2xl z-50 transform translate-y-full transition-transform duration-300';
    bar.innerHTML = `
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-green-500 p-2 rounded-full"><i class="fas fa-shopping-bag"></i></div>
          <div>
            <p class="text-xs text-gray-300">Troli Anda</p>
            <p class="font-bold text-green-400" id="wk-cart-total">RM 0.00</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button id="wk-cart-toggle" class="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800">Tutup</button>
          <button id="wk-cart-checkout" class="px-4 py-1 bg-green-600 rounded font-bold hover:bg-green-700">Checkout WA</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);

    // Bind internal events
    document.getElementById('wk-cart-toggle').onclick = () => toggleBar();
    document.getElementById('wk-cart-checkout').onclick = () => checkoutToWhatsApp();
  }

  // --- Global Bindings (AI akan call ini) ---
  function bindGlobalFunctions() {
    window.addToCart = function(name, price) {
      if (typeof name !== 'string' || isNaN(price)) return;
      cart.push({ name, price: parseFloat(price), qty: 1 });
      updateCartUI();
      showBar();
    };

    const toggleBtn = document.getElementById('cart-toggle');
    if (toggleBtn) toggleBtn.onclick = () => toggleBar();
  }

  // --- Cart Logic ---
  function updateCartUI() {
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    document.getElementById('wk-cart-total').innerText = `RM ${total.toFixed(2)} (${cart.length} item)`;
  }

  function showBar() {
    document.getElementById(CART_BAR_ID).classList.remove('translate-y-full');
  }

  function hideBar() {
    document.getElementById(CART_BAR_ID).classList.add('translate-y-full');
  }

  function toggleBar() {
    const bar = document.getElementById(CART_BAR_ID);
    bar.classList.contains('translate-y-full') ? showBar() : hideBar();
  }

  // --- WhatsApp Checkout ---
  function checkoutToWhatsApp() {
    if (cart.length === 0) return;
    
    let msg = `*Tempahan Baru*%0A%0A`;
    let total = 0;
    cart.forEach(item => {
      msg += `✅ ${item.name} - RM${item.price.toFixed(2)}%0A`;
      total += item.price;
    });
    msg += `%0A*Jumlah: RM${total.toFixed(2)}*%0A%0ASila confirm slot penghantaran. Terima kasih.`;
    
    window.open(`https://wa.me/${bizPhone}?text=${msg}`, '_blank');
    cart = [];
    updateCartUI();
    hideBar();
  }

  // --- Auto Init ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
