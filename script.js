let slideIndex = 1;
let slideInterval;
let currentChart = null;

// Initialize the slideshow
function initSlideshow() {
    showSlides(slideIndex);
    startAutoSlide();
}

// Auto slide function
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    // Handle wrap-around
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }

    // Show current slide and activate corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Initialize performance chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }
    
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
            label: 'Satisfação do Cliente (%)',
            data: [65, 75, 82, 87, 92, 95],
            borderColor: '#4CAF50',
            tension: 0.4,
            fill: false
        }, {
            label: 'Tempo de Resposta (min)',
            data: [30, 25, 20, 15, 10, 5],
            borderColor: '#2196F3',
            tension: 0.4,
            fill: false
        }, {
            label: 'Taxa de Resolução (%)',
            data: [70, 75, 80, 85, 90, 95],
            borderColor: '#FF9800',
            tension: 0.4,
            fill: false
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    };

    currentChart = new Chart(ctx.getContext('2d'), config);
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Handle Read More buttons in benefits section
function initReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.benefit-card');
            const fullText = card.querySelector('.full-text');
            const previewText = card.querySelector('.preview-text');
            
            fullText.classList.toggle('hidden');
            
            if (fullText.classList.contains('hidden')) {
                this.textContent = 'Ler mais';
                previewText.style.display = 'block';
            } else {
                this.textContent = 'Ler menos';
                previewText.style.display = 'none';
            }
        });
    });
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? null : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Toggle icon
        themeIcon.classList.toggle('fa-sun');
        themeIcon.classList.toggle('fa-moon');
    });
}

// Initialize everything when the page loads
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const monthlyPricing = document.querySelector('.monthly-pricing');
    const annualPricing = document.querySelector('.annual-pricing');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Toggle pricing grids
            if (button.dataset.pricing === 'monthly') {
                monthlyPricing.classList.add('active');
                annualPricing.classList.remove('active');
            } else {
                annualPricing.classList.add('active');
                monthlyPricing.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initMobileMenu();
    initPerformanceChart();
    initFAQ();
    initReadMoreButtons();
    initThemeToggle();
    initPricingToggle();
});