/* Web Kilat Cart Engine - Shopping & Checkout Logic
   Powered by Perintis Digital 
*/

let cart = JSON.parse(localStorage.getItem('wk_cart')) || [];

function toggleCart(show) {
    const cartEl = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (cartEl && overlay) {
        cartEl.style.transform = show ? 'translateX(0)' : 'translateX(100%)';
        overlay.style.display = show ? 'block' : 'none';
    }
}

function updateUI() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList) return;

    cartList.innerHTML = cart.length === 0 ? '<p class="text-center text-gray-500 py-8">Troli kosong</p>' : '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartList.innerHTML += `
            <div class="flex justify-between items-center mb-4 p-2 border-b">
                <div>
                    <p class="font-bold text-sm">${item.name}</p>
                    <p class="text-xs text-gray-500">RM ${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 text-xs">Padam</button>
            </div>
        `;
    });

    if (cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartTotal) cartTotal.innerText = 'RM ' + total.toFixed(2);
    localStorage.setItem('wk_cart', JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateUI();
    toggleCart(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

function resetCart() {
    cart = [];
    updateUI();
    toggleCart(false);
}

function checkout(bizPhone) {
    if (cart.length === 0) return alert('Troli kosong!');
    const name = document.getElementById('cust-name')?.value || "-";
    const phone = document.getElementById('cust-phone')?.value || "-";
    const address = document.getElementById('cust-address')?.value || "-";

    let msg = "*TEMPAHAN BARU*\n━━━━━━━━━━━━━━\n\n";
    cart.forEach(i => msg += `✅ ${i.quantity}x ${i.name} (RM ${(i.price * i.quantity).toFixed(2)})\n`);
    msg += `\n*TOTAL: RM ${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}*\n\n*INFO:*\nNama: ${name}\nNo Tel: ${phone}\nAlamat: ${address}`;
    
    const waUrl = `https://wa.me/${bizPhone || '60182240140'}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    
    cart = [];
    localStorage.removeItem('wk_cart');
    updateUI();
    toggleCart(false);
}

// Listeners & Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    const closeBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('cart-overlay');
    const resetBtn = document.getElementById('reset-cart');

    if (closeBtn) closeBtn.onclick = () => toggleCart(false);
    if (overlay) overlay.onclick = () => toggleCart(false);
    if (resetBtn) resetBtn.onclick = () => resetCart();
});
