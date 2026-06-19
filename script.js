// Expanded Products List (8 items)
const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, icon: "🎧" },
    { id: 2, name: "Smart Watch", price: 129.99, icon: "⌚" },
    { id: 3, name: "Mechanical Keyboard", price: 89.99, icon: "⌨️" },
    { id: 4, name: "Ergonomic Mouse", price: 45.00, icon: "🖱️" },
    { id: 5, name: "Gaming Laptop", price: 999.99, icon: "💻" },
    { id: 6, name: "Bluetooth Speaker", price: 34.99, icon: "🔊" },
    { id: 7, name: "Leather Backpack", price: 75.00, icon: "🎒" },
    { id: 8, name: "Wireless Charger", price: 19.99, icon: "🔋" }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// 1. Render Products (Filters based on search query)
function displayProducts(filteredProducts = products) {
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <div class="product-image">${product.icon}</div>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    }
}

// 2. Real-time Search Handler
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
});

// 3. Mobile Navigation Toggle Menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 4. Add item to cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

// 5. Update Cart Totals and Display
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
            </div>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = totalItems;
    cartTotal.innerText = totalPrice.toFixed(2);
}

// Sidebar Open/Close Event Listeners
cartIcon.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

// Initialize
displayProducts();