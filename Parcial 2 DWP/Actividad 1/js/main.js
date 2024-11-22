// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const products = [
      {
        id: 1,
        name: 'Laptop Lenovo Ideapad Gaming 3',
        description: 'Ryzen 5, 8GB, SSD 512GB, Color Negro',
        price: 15000,
        image: 'img/Laptop1.png'
      },
      {
        id: 2,
        name: 'Dell Inspiron 15',
        description: 'Intel i5, 8GB, SSD 256GB, Color Plata',
        price: 18000,
        image: 'img/Laptop2.png'
      },
      {
        id: 3,
        name: 'HP Pavilion 14',
        description: 'Intel i7, 16GB, SSD 512GB, Color Azul',
        price: 22000,
        image: 'img/Laptop3.png'
      },
      {
        id: 4,
        name: 'Asus VivoBook 15',
        description: 'AMD Ryzen 7, 16GB, SSD 1TB, Color Gris',
        price: 20000,
        image: 'img/Laptop4.png'
      },
      // Agrega más productos según sea necesario
    ];
  
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    const applyDiscountBtn = document.getElementById('apply-discount');
    const discountCodeInput = document.getElementById('discount-code');
    const discountMessage = document.getElementById('discount-message');
  
    let cart = {};
    let discount = 0;
  
    // Cargar el carrito desde localStorage
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      updateCartCount();
      renderCart();
    }
  
    // Renderizar la lista de productos
    function renderProducts() {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3 mb-4';
        productCard.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text fw-bold">$${product.price.toLocaleString()}</p>
              <button class="btn btn-add-cart mt-auto" data-id="${product.id}">Agregar al Carrito</button>
            </div>
          </div>
        `;
        productList.appendChild(productCard);
      });
    }
  
    renderProducts();
  
    // Añadir evento a los botones de agregar al carrito
    productList.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-add-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
      }
    });
  
    // Función para añadir al carrito
    function addToCart(productId) {
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        const product = products.find(p => p.id === productId);
        cart[productId] = {
          ...product,
          quantity: 1
        };
      }
      saveCart();
      updateCartCount();
      renderCart();
    }
  
    // Función para actualizar la cuenta del carrito en el navbar
    function updateCartCount() {
      const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  
    // Función para guardar el carrito en localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Función para renderizar el carrito en el Offcanvas
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartSubtotal.textContent = '$0';
        cartTax.textContent = '$0';
        cartTotal.textContent = '$0';
        discount = 0;
        discountMessage.textContent = '';
        return;
      }
  
      // Crear contenedor para dos filas
      const row = document.createElement('div');
      row.className = 'row';
  
      Object.values(cart).forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'col-12 mb-3 cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h6>${item.name}</h6>
            <div class="item-actions">
              <input type="number" class="form-control form-control-sm me-2 quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
              <span class="text-muted">$${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
          <button class="btn btn-danger btn-sm ms-3 remove-item" data-id="${item.id}">Eliminar</button>
        `;
        row.appendChild(cartItem);
      });
  
      cartItemsContainer.appendChild(row);
      updateCartSummary();
    }
  
    // Evento para manejar cambios en la cantidad
    cartItemsContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('quantity-input')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const newQuantity = parseInt(e.target.value);
        if (newQuantity < 1) {
          e.target.value = 1;
          return;
        }
        cart[productId].quantity = newQuantity;
        saveCart();
        updateCartCount();
        updateCartSummary();
      }
    });
  
    // Evento para eliminar un item del carrito
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        delete cart[productId];
        saveCart();
        updateCartCount();
        renderCart();
      }
    });
  
    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
      let subtotal = 0;
      Object.values(cart).forEach(item => {
        subtotal += item.price * item.quantity;
      });
  
      const tax = subtotal * 0.10; // 10% de impuestos
      let total = subtotal + tax;
  
      // Aplicar descuento si existe
      const discountCode = discountCodeInput.value.trim();
      if (discountCode === 'DESCUENTO10') {
        discount = subtotal * 0.10; // 10% de descuento
        total = total - discount;
        discountMessage.textContent = 'Descuento aplicado: 10%';
        discountMessage.style.color = 'green';
      } else if (discountCode !== '' && discountCode !== 'DESCUENTO10') {
        discountMessage.textContent = 'Código de descuento inválido.';
        discountMessage.style.color = 'red';
        discount = 0;
      } else {
        discountMessage.textContent = '';
        discount = 0;
      }
  
      cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
      cartTax.textContent = `$${tax.toLocaleString()}`;
      cartTotal.textContent = `$${total.toLocaleString()}`;
    }
  
    // Evento para aplicar código de descuento
    applyDiscountBtn.addEventListener('click', () => {
      updateCartSummary();
    });
  });
  