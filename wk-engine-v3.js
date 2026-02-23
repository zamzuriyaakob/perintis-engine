/* Web Kilat Ultimate Engine V3 
   Powered by Perintis Digital 
*/
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    let cart = JSON.parse(localStorage.getItem('wk_cart')) || [];

    window.updateUI = function() {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        const badgeNav = document.getElementById('cart-badge');
        const badgeFloat = document.getElementById('cart-badge-floating');
        
        if(!container || !totalEl) return;
        container.innerHTML = cart.length === 0 ? '<div class="py-12 text-center opacity-40 text-sm italic font-medium">Troli anda kosong...</div>' : '';
        
        let total = 0;
        cart.forEach((item, index) => {
            total += (item.price * item.quantity);
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border mb-3 transition-all';
            div.innerHTML = `
                <div class="text-sm text-left">
                    <div class="font-bold text-gray-800 text-xs">${item.name}</div>
                    <div class="text-primary font-bold font-mono">RM ${item.price.toFixed(2)}</div>
                </div>
                <div class="flex items-center gap-3 bg-white px-3 py-1 rounded-full border shadow-sm">
                    <a href="javascript:void(0)" onclick="changeQty(${index}, -1)" class="text-gray-400 hover:text-primary font-bold">-</a>
                    <span class="font-bold w-4 text-center text-xs">${item.quantity}</span>
                    <a href="javascript:void(0)" onclick="changeQty(${index}, 1)" class="text-gray-400 hover:text-primary font-bold">+</a>
                </div>`;
            container.appendChild(div);
        });
        
        totalEl.innerText = 'RM ' + total.toLocaleString(undefined, {minimumFractionDigits: 2});
        const count = cart.reduce((s, i) => s + i.quantity, 0);
        if(badgeNav) badgeNav.innerText = count;
        if(badgeFloat) badgeFloat.innerText = count;
        localStorage.setItem('wk_cart', JSON.stringify(cart));
        lucide.createIcons();
    };

    window.addToCart = function(n, p) {
        const idx = cart.findIndex(i => i.name === n);
        if (idx > -1) cart[idx].quantity++; else cart.push({ name: n, price: p, quantity: 1 });
        updateUI(); 
        const drawer = document.getElementById('cart-drawer');
        if(drawer) drawer.classList.add('open');
    };

    window.changeQty = function(i, d) {
        cart[i].quantity += d;
        if (cart[i].quantity <= 0) cart.splice(i, 1);
        updateUI();
    };

    function buildMessage() {
        const name = document.getElementById('cust-name')?.value || "-(Tidak diisi)-";
        const phone = document.getElementById('cust-phone')?.value || "-(Tidak diisi)-";
        const address = document.getElementById('cust-address')?.value || "-(Tidak diisi)-";
        let msg = "📦 *TEMPAHAN BARU*\\n━━━━━━━━━━━━━━━━━━━\\n\\n";
        cart.forEach(i => {
            msg += `✅ *${i.quantity}x* ${i.name}\\n      └─ RM ${(i.price * i.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})}\\n\\n`;
        });
        msg += "━━━━━━━━━━━━━━━━━━━\\n";
        msg += `💰 *TOTAL: RM ${cart.reduce((s, i) => s + (i.price*i.quantity), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}*\\n━━━━━━━━━━━━━━━━━━━\\n\\n`;
        msg += `👤 *INFO PELANGGAN:*\\nNama: ${name}\\nNo. Tel: ${phone}\\nAlamat: ${address}\\n\\n_Sila bantu saya proses tempahan ini._`;
        return msg;
    }

    window.checkoutWA = function(bizPhone) {
        if (cart.length === 0) return alert('Troli kosong!');
        const waLink = 'https://wa.me/' + bizPhone + '?text=' + encodeURIComponent(buildMessage().replace(/\\n/g, '\n'));
        window.open(waLink, '_blank');
        cart = []; localStorage.removeItem('wk_cart'); updateUI();
        document.getElementById('cart-drawer').classList.remove('open');
    };

    window.copyOrder = function() {
        if (cart.length === 0) return alert('Troli kosong!');
        const cleanMsg = buildMessage().replace(/\\n/g, '\n');
        navigator.clipboard.writeText(cleanMsg).then(() => {
            alert("✅ Maklumat pesanan berjaya disalin!");
        });
    };

    // Event Listeners for Static IDs
    const btnWA = document.getElementById('checkout-whatsapp');
    if(btnWA) btnWA.onclick = () => window.checkoutWA('60123456789'); // Phone will be replaced by AI later
    
    const btnCopy = document.getElementById('copy-order');
    if(btnCopy) btnCopy.onclick = () => window.copyOrder();

    const openers = ['cart-toggle', 'cart-floating-toggle'];
    openers.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.onclick = () => document.getElementById('cart-drawer').classList.add('open');
    });

    const cls = document.getElementById('close-cart');
    if(cls) cls.onclick = () => document.getElementById('cart-drawer').classList.remove('open');

    updateUI();
});