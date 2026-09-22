document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // ========================================================
    // PERSISTENT NAVBAR & ACTIVE STATE MANAGEMENT
    // ========================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.toLowerCase();

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const cleanHref = href.split('/').pop().toLowerCase();
        
        // Auto mark active based on filename in URL
        if (cleanHref && currentPath.endsWith(cleanHref)) {
            link.classList.add('active');
        } else if ((currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '') && (cleanHref === 'index.html' || cleanHref === '#')) {
            // home
        }

        link.addEventListener('click', (e) => {
            if (href === '#' || href === '') {
                e.preventDefault();
            }
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Cart Icon Redirection
    const cartIcons = document.querySelectorAll('.cart-icon');
    cartIcons.forEach(cartIcon => {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });

    // Bell Icon Notification Toggle
    const bellIcons = document.querySelectorAll('.bell-icon');
    bellIcons.forEach(bellIcon => {
        bellIcon.addEventListener('click', () => {
            bellIcon.classList.toggle('active');
        });
    });

    // Brand Logo Redirection
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // Hero Buttons Redirection
    const signupButtons = document.querySelectorAll('.btn-farmer, .btn-buyer');
    signupButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    });

    // ========================================================
    // CONTACT FORM INTERACTIVE HANDLER
    // ========================================================
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('contactMessage');
    const charCountDisplay = document.getElementById('charCount');
    const contactModal = document.getElementById('contactSuccessModal');
    const modalCloseBtn = document.getElementById('closeModalBtn');

    // Message character counter
    if (messageTextarea && charCountDisplay) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCountDisplay.textContent = count;
            if (count > 500) {
                charCountDisplay.style.color = '#e03131';
            } else {
                charCountDisplay.style.color = '#888';
            }
        });
    }

    // Contact Form Submission & Validation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('emailAddress');
            const phoneInput = document.getElementById('phoneNumber');
            const categorySelect = document.getElementById('inquiryCategory');
            const messageInput = document.getElementById('contactMessage');
            const submitBtn = document.getElementById('contactSubmitBtn');
            const spinner = submitBtn ? submitBtn.querySelector('.spinner-icon') : null;
            const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

            // Validate Full Name
            if (nameInput) {
                const err = document.getElementById('nameError');
                if (!nameInput.value.trim()) {
                    nameInput.classList.add('is-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else {
                    nameInput.classList.remove('is-error');
                    if (err) err.style.display = 'none';
                }
            }

            // Validate Email
            if (emailInput) {
                const err = document.getElementById('emailError');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                    emailInput.classList.add('is-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else {
                    emailInput.classList.remove('is-error');
                    if (err) err.style.display = 'none';
                }
            }

            // Validate Phone (10 digits)
            if (phoneInput) {
                const err = document.getElementById('phoneError');
                const cleanPhone = phoneInput.value.replace(/\D/g, '');
                if (!phoneInput.value.trim() || cleanPhone.length < 10) {
                    phoneInput.classList.add('is-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else {
                    phoneInput.classList.remove('is-error');
                    if (err) err.style.display = 'none';
                }
            }

            // Validate Category
            if (categorySelect) {
                const err = document.getElementById('categoryError');
                if (!categorySelect.value) {
                    categorySelect.classList.add('is-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else {
                    categorySelect.classList.remove('is-error');
                    if (err) err.style.display = 'none';
                }
            }

            // Validate Message
            if (messageInput) {
                const err = document.getElementById('messageError');
                if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
                    messageInput.classList.add('is-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else {
                    messageInput.classList.remove('is-error');
                    if (err) err.style.display = 'none';
                }
            }

            if (!isValid) {
                return;
            }

            // Loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                if (spinner) spinner.style.display = 'inline-block';
                if (btnText) btnText.textContent = 'Sending Message...';
            }

            // Simulate server network call
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if (spinner) spinner.style.display = 'none';
                    if (btnText) btnText.textContent = 'Send Message';
                }

                // Show confirmation modal
                if (contactModal) {
                    contactModal.classList.add('show');
                }

                // Reset form
                contactForm.reset();
                if (charCountDisplay) charCountDisplay.textContent = '0';
                
                // Re-initialize Lucide icons inside modal if needed
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    lucide.createIcons();
                }
            }, 1000);
        });
    }

    // Modal Close
    if (modalCloseBtn && contactModal) {
        modalCloseBtn.addEventListener('click', () => {
            contactModal.classList.remove('show');
        });

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('show');
            }
        });
    }

    // ========================================================
    // FAQ ACCORDION INTERACTION
    // ========================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });

    // ========================================================
    // LEGAL PAGES TABLE OF CONTENTS & SCROLLSPY
    // ========================================================
    const tocLinks = document.querySelectorAll('.legal-toc-link');
    const legalSections = document.querySelectorAll('.legal-section');

    if (tocLinks.length > 0 && legalSections.length > 0) {
        // Smooth scroll to section on link click
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        window.scrollTo({
                            top: targetEl.offsetTop - 90,
                            behavior: 'smooth'
                        });
                        tocLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });

        // Scrollspy on window scroll
        window.addEventListener('scroll', () => {
            let currentActiveId = '';
            const scrollPos = window.scrollY + 130;

            legalSections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentActiveId = '#' + section.getAttribute('id');
                }
            });

            if (currentActiveId) {
                tocLinks.forEach(link => {
                    if (link.getAttribute('href') === currentActiveId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    // Print & Download Buttons for Legal Pages
    const printBtns = document.querySelectorAll('.btn-print-policy');
    printBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.print();
        });
    });

    // Global Log Out Redirection
    document.addEventListener('click', (e) => {
        const logoutEl = e.target.closest('#logoutBtn, .logout-btn, [data-uxm-link="Login"]');
        if (logoutEl) {
            e.preventDefault();
            window.location.href = 'index.html';
            return;
        }

        // Global Farmer Profile Image Redirection
        const farmerAvatar = e.target.closest('img[src*="portraits/men/12"], img[alt*="Sukhdev"], .farmer-avatar');
        if (farmerAvatar) {
            window.location.href = 'sellerProfile.html';
        }

        // Global Buyer Profile Image & User Details Redirection
        const buyerAvatar = e.target.closest('img[src*="portraits/men/46"], img[alt*="Vikram"], .buyer-avatar');
        if (buyerAvatar) {
            window.location.href = 'buyerProfile.html';
        }

        // Global Transporter Profile Image & User Details Redirection
        const transporterAvatar = e.target.closest('img[src*="portraits/men/64"], img[alt*="Transporter"], .transporter-avatar');
        if (transporterAvatar) {
            window.location.href = 'transporterProfile.html';
        }
    });
});
