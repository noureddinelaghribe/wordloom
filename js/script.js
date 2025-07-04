/**
 * WriteFlow Landing Page Scripts
 * Author: Manus AI
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon && icon.classList.contains("fa-times")) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });
    
    // Generic Slider Function
    function setupSlider(sliderSelector, dotSelector, prevBtnSelector, nextBtnSelector, intervalTime) {
        const slider = document.querySelector(sliderSelector);
        const dots = document.querySelectorAll(dotSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        const slides = slider ? slider.querySelectorAll(":scope > .screenshot, :scope > .testimonial") : [];
        // يدعم كل من screenshots و testimonials
        if (slider && dots.length && prevBtn && nextBtn && slides.length) {
            let currentIndex = 0;
            const maxIndex = dots.length;

            function updateSlider() {
                slides.forEach((slide, index) => {
                    if (index === currentIndex) {
                        slide.classList.add("active");
                    } else {
                        slide.classList.remove("active");
                    }
                });
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndex);
                });
            }

            nextBtn.addEventListener("click", function() {
                currentIndex = (currentIndex + 1) % maxIndex;
                updateSlider();
            });

            prevBtn.addEventListener("click", function() {
                currentIndex = (currentIndex - 1 + maxIndex) % maxIndex;
                updateSlider();
            });

            dots.forEach((dot, index) => {
                dot.addEventListener("click", function() {
                    currentIndex = index;
                    updateSlider();
                });
            });

            setInterval(function() {
                currentIndex = (currentIndex + 1) % maxIndex;
                updateSlider();
            }, intervalTime);

            // Initial update
            updateSlider();
        }
    }

    // Screenshots Slider Setup
    setupSlider(".screenshots-slider", ".screenshots .dot", ".screenshots .prev-btn", ".screenshots .next-btn", 5000);
    
    // Testimonials Slider Setup
    setupSlider(".testimonials-slider", ".testimonials .dot", ".testimonials .prev-btn", ".testimonials .next-btn", 7000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        if (question) {
            question.addEventListener("click", function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains("active")) {
                        otherItem.classList.remove("active");
                        const toggle = otherItem.querySelector(".faq-toggle i");
                        if (toggle && toggle.classList.contains("fa-minus")) {
                            toggle.classList.remove("fa-minus");
                            toggle.classList.add("fa-plus");
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle("active");
                const toggle = item.querySelector(".faq-toggle i");
                if (toggle) {
                    toggle.classList.toggle("fa-plus");
                    toggle.classList.toggle("fa-minus");
                }
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector(".header");
    
    if (header) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
                header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
            } else {
                header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            }
        });
    }
});


