let slideIndex = 1;
let slideInterval;

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

// Initialize when the page loads
// Initialize performance chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
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

    new Chart(ctx, config);
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

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initMobileMenu();
    initPerformanceChart();
    initFAQ();
});

// Handle Read More buttons in benefits section
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