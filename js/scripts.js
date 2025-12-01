// Basic JavaScript functionality
let products = [];

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        products = data;
        console.log('Products loaded:', products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Render products dynamically
function renderProducts() {
    const productCTA = document.getElementById('product-cta');
    if (!productCTA) {
        console.error('product-cta div not found');
        return;
    }

    if (!products || !products.length) {
        console.warn('No products loaded yet');
        return;
    }

    const productsContainer = document.createElement('div');
    productsContainer.className = 'products-grid';

    products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';

        item.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-img" onerror="this.src='https://via.placeholder.com/300x200?text=Producto'">
            <h3>${product.nombre}</h3>
            <p class="product-price">${product.precio}</p>
            <a href="./pages/producto.html?id=${index}" class="btn btn-small">Ver Detalles</a>
        `;

        productsContainer.appendChild(item);
    });

    // Replace existing content
    const section = productCTA.parentElement;
    productCTA.replaceWith(productsContainer);
    console.log('Products rendered');
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    // Initialize page-specific functions
    if (document.getElementById('product-cta')) {
        console.log('Loading products...');
        (async () => {
            await loadProducts();
            renderProducts();
        })();
    } else {
        console.log('No product-cta div found, skipping product load');
    }

    // Only handle smooth scroll for anchor links (not external pages)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensaje enviado. Gracias por contactarnos.');
            contactForm.reset();
        });
    }

    // Basic animation for sections on scroll (simplified)
    const sections = document.querySelectorAll('.et_pb_section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0.5';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});
