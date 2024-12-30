let cart = [];
let cartTotal = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;
    updateCartUI();
    showNotification(`${name} agregado al carrito`);
}

function updateCartUI() {
    // Actualizar contador
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;

    // Actualizar items del carrito
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <div>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">×</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    // Actualizar total
    document.querySelector('.total-amount').textContent = `$${cartTotal.toFixed(2)}`;
}

function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        alert('¡Gracias por tu compra!');
        cart = [];
        cartTotal = 0;
        updateCartUI();
        cartModal.classList.remove('active');
    });
}); 