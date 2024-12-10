// Helper Functions for Smooth Scroll
function smoothScrollTo(target) {
    target.scrollIntoView({
        behavior: 'smooth'
    });
}

function addClickEvent(selector, callback) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', callback);
    });
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function showAlert(errors) {
    alert(errors.join('\n'));
}

// Smooth Scroll for anchor links
addClickEvent('a[href^="#"]', function (e) {
    if (this.pathname === window.location.pathname) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) smoothScrollTo(target);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Validation
const contactForm = document.querySelector('#contact form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    let errors = [];

    if (name === '') errors.push('Name is required.');
    if (!validateEmail(email)) errors.push('Email is invalid.');
    if (message === '') errors.push('Message is required.');

    if (errors.length > 0) showAlert(errors);
    else {
        alert('Thank you for your message!');
        contactForm.reset();
    }
});

// Newsletter Form Validation
const newsletterForm = document.querySelector('#newsletter form');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.querySelector('#newsletter-email').value.trim();
    if (!validateEmail(email)) alert('Please enter a valid email.');
    else {
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    }
});

// Back-to-Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆️ Back to Top';
backToTopBtn.classList.add('back-to-top');
document.body.appendChild(backToTopBtn);
backToTopBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;padding:10px;font-size:1.2rem;display:none;cursor:pointer;';

window.addEventListener('scroll', function () {
    backToTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙 Dark Mode';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);
darkModeToggle.style.cssText = 'position:fixed;bottom:20px;left:20px;padding:10px;font-size:1.2rem;cursor:pointer;';

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// FAQ Accordion
addClickEvent('.faq-question', function () {
    const faqAnswer = this.nextElementSibling;
    faqAnswer.style.display = faqAnswer.style.display === 'block' ? 'none' : 'block';
});

// Image Carousel
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const nextButton = document.createElement('button');
const prevButton = document.createElement('button');
nextButton.textContent = '➡️ Next';
prevButton.textContent = '⬅️ Previous';

document.querySelector('.carousel').appendChild(nextButton);
document.querySelector('.carousel').appendChild(prevButton);

nextButton.style.cssText = 'position:absolute;right:10px;bottom:10px;';
prevButton.style.cssText = 'position:absolute;left:10px;bottom:10px;';

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
    });
}

nextButton.addEventListener('click', function () {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlides();
});

prevButton.addEventListener('click', function () {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlides();
});

showSlides();

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:5px;background-color:#ff5733;width:0%;';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function () {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (window.scrollY / scrollTotal) * 100;
    progressBar.style.width = `${scrollProgress}%`;
});

// Modal Popup
const modal = document.createElement('div');
modal.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);width:400px;height:300px;background-color:#fff;padding:20px;border-radius:10px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);display:none;';
document.body.appendChild(modal);

const modalContent = document.createElement('div');
modalContent.textContent = 'This is a modal popup!';
modal.appendChild(modalContent);

const closeModalButton = document.createElement('button');
closeModalButton.textContent = 'Close';
modal.appendChild(closeModalButton);

closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

const showModalButton = document.createElement('button');
showModalButton.textContent = 'Open Modal';
showModalButton.style.cssText = 'position:fixed;top:20px;right:20px;';
document.body.appendChild(showModalButton);

showModalButton.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Random Quote Generator
const quotes = [
    'Code is like humor. When you have to explain it, it’s bad.',
    'Simplicity is the soul of efficiency.',
    'Before software can be reusable it first has to be usable.',
    'Make it work, make it right, make it fast.',
    'Experience is the name everyone gives to their mistakes.',
    'Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.'
];

const quoteSection = document.createElement('div');
quoteSection.classList.add('quote-section');
document.body.appendChild(quoteSection);

const quoteText = document.createElement('p');
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
quoteSection.appendChild(quoteText);

quoteSection.style.textAlign = 'center';
quoteSection.style.marginTop = '20px';
quoteSection.style.fontSize = '1.5rem';
quoteSection.style.fontStyle = 'italic';

const newQuoteButton = document.createElement('button');
newQuoteButton.textContent = 'New Quote';
quoteSection.appendChild(newQuoteButton);

newQuoteButton.addEventListener('click', function () {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote;
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateX(100%)';
    });
    testimonials[index].classList.add('active');
    testimonials[index].style.opacity = '1';
    testimonials[index].style.transform = 'translateX(0)';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play the slider every 5 seconds
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover
document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// Initialize the first slide
showSlide(currentSlide);

// Scroll-triggered animations for services
const serviceItems = document.querySelectorAll('.service-item');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

serviceItems.forEach(item => {
    serviceObserver.observe(item);
});

// Lazy load images with fade-in effect
const serviceImages = document.querySelectorAll('.service-image img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
});

serviceImages.forEach(img => {
    imageObserver.observe(img);
});

// Tooltips for service buttons
const serviceButtons = document.querySelectorAll('.service-item a');

serviceButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerText = 'Click to explore this service';
        document.body.appendChild(tooltip);

        const rect = button.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight + window.scrollY}px`;

        button.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});

// Fade-in effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    serviceItems.forEach(item => {
        if (item.offsetTop < scrollPosition) {
            item.classList.add('fade-in');
        } else {
            item.classList.remove('fade-in');
        }
    });
});
