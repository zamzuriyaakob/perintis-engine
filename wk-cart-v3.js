/* Web Kilat Cart Engine - Complete Version (English) */
let cart = JSON.parse(localStorage.getItem('wk_cart')) || [];

function updateCartUI() {
    const badge = document.querySelector('.cart-badge');
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (badge) badge.textContent = totalItems;
    
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartList) {
        cartList.innerHTML = cart.length === 0 ? '<p class="text-center text-gray-500 py-8">Cart is empty</p>' : '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartList.innerHTML += `
                <div class="flex justify-between items-center mb-4 p-3 border-b">
                    <div><p class="font-bold">${item.name}</p><p class="text-sm">RM ${item.price} x ${item.quantity}</p></div>
                    <button onclick="removeFromCart(${index})" class="text-red-500">Remove</button>
                </div>
            `;
        });
        if (cartTotal) cartTotal.innerText = 'RM ' + total.toFixed(2);
    }
    localStorage.setItem('wk_cart', JSON.stringify(cart));
}

function toggleCartDrawer(show) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.style.transform = show ? 'translateX(0)' : 'translateX(100%)';
        overlay.style.display = show ? 'block' : 'none';
    }
}

// EXPOSE TO GLOBAL
window.addToCart = function(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartUI();
    toggleCartDrawer(true);
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

window.checkout = function() {
    if (cart.length === 0) return alert('Cart is empty!');
    const name = document.getElementById('cust-name')?.value || '-';
    const phone = document.getElementById('cust-phone')?.value || '-';
    const address = document.getElementById('cust-address')?.value || '-';
    const bizPhone = document.getElementById('biz-meta')?.dataset.bizPhone || '';
    
    let msg = '*NEW ORDER*%0A━━━━━━━━━━━━━━%0A%0A';
    cart.forEach(i => msg += `✅ ${i.quantity}x ${i.name} (RM ${(i.price * i.quantity).toFixed(2)})%0A`);
    msg += `%0a*TOTAL: RM ${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}*%0A%0A*CUSTOMER INFO*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;
    
    window.open(`https://wa.me/${bizPhone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
    cart = [];
    updateCartUI();
    toggleCartDrawer(false);
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    document.getElementById('close-cart')?.addEventListener('click', () => toggleCartDrawer(false));
    document.getElementById('cart-overlay')?.addEventListener('click', () => toggleCartDrawer(false));
    document.getElementById('cart-toggle')?.addEventListener('click', () => toggleCartDrawer(true));
});
