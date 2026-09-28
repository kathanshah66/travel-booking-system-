// Travel Explorer Main JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initPackageTabs();
    initPackageFilter();
    initTestimonials();
    initNewsletter();
    initHeroSearch();
    initSmoothScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// Package Tabs
function initPackageTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const packageCards = document.querySelectorAll('.package-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.dataset.category;

            // Filter packages
            packageCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Package Filter
function initPackageFilter() {
    const searchInput = document.querySelector('.search-input');
    const packageCards = document.querySelectorAll('.package-card');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            packageCards.forEach(card => {
                const title = card.querySelector('.package-title').textContent.toLowerCase();
                const desc = card.querySelector('.package-desc').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Testimonials Carousel
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    if (testimonialCards.length > 0) {
        // Show first testimonial
        testimonialCards[0].classList.add('active');

        // Auto rotate testimonials
        setInterval(() => {
            testimonialCards[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialCards[currentIndex].classList.add('active');
        }, 5000);
    }
}

// Newsletter Form
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simulate API call
            showNotification('Subscribing to newsletter...', 'info');

            setTimeout(() => {
                showNotification('Successfully subscribed to newsletter!', 'success');
                this.reset();
            }, 1500);
        });
    }
}

// Hero Search
function initHeroSearch() {
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-input');
    const searchSelect = document.querySelector('.search-select');
    const searchDate = document.querySelector('.search-date');

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            const destination = searchInput.value;
            const packageType = searchSelect.value;
            const date = searchDate.value;

            if (!destination) {
                showNotification('Please enter a destination', 'warning');
                return;
            }

            // Simulate search
            showNotification(`Searching for ${destination} packages...`, 'info');

            // Redirect to packages page with search parameters
            setTimeout(() => {
                window.location.href = `packages.html?search=${encodeURIComponent(destination)}&type=${packageType}`;
            }, 1000);
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

// Helper functions for notifications
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#4CAF50',
        'error': '#F44336',
        'warning': '#FF9800',
        'info': '#2196F3'
    };
    return colors[type] || '#2196F3';
}

// Booking Functionality
function bookPackage(packageId, packageType, packageName, price) {
    if (!isLoggedIn()) {
        showNotification('Please login to book packages', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=booking';
        }, 1500);
        return;
    }

    // Show booking modal
    showBookingModal(packageId, packageType, packageName, price);
}

// Check if user is logged in (simulated)
function isLoggedIn() {
    return localStorage.getItem('travelExplorerUser') !== null;
}

// Booking Modal
function showBookingModal(packageId, packageType, packageName, price) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Package: ${packageName}</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="booking-summary">
                    <p><strong>Package Type:</strong> ${packageType}</p>
                    <p><strong>Price:</strong> $${price}</p>
                </div>
                <form class="booking-form">
                    <div class="form-group">
                        <label>Number of Travelers</label>
                        <input type="number" min="1" max="10" value="1" class="travelers-count">
                    </div>
                    <div class="form-group">
                        <label>Travel Date</label>
                        <input type="date" class="travel-date" required>
                    </div>
                    <div class="form-group">
                        <label>Special Requests</label>
                        <textarea class="special-requests" placeholder="Any special requirements..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline modal-close">Cancel</button>
                        <button type="submit" class="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .booking-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            min-width: 500px;
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .booking-form .form-group {
            margin-bottom: 1rem;
        }
        .booking-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        .booking-form input,
        .booking-form textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal handlers
    const closeBtns = modal.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });

    // Form submission
    const form = modal.querySelector('.booking-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const travelers = modal.querySelector('.travelers-count').value;
        const date = modal.querySelector('.travel-date').value;
        const requests = modal.querySelector('.special-requests').value;

        // Simulate booking API call
        showNotification('Processing your booking...', 'info');

        setTimeout(() => {
            showNotification('Booking confirmed! Check your email for details.', 'success');
            modal.remove();
        }, 2000);
    });
}

// API Simulation Functions
class TravelAPI {
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock API response
                if (email && password.length >= 6) {
                    const user = {
                        id: 1,
                        email: email,
                        name: email.split('@')[0],
                        token: 'mock-jwt-token-12345'
                    };
                    localStorage.setItem('travelExplorerUser', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject('Invalid credentials');
                }
            }, 1000);
        });
    }

    static async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData.email && userData.password) {
                    const user = {
                        id: Date.now(),
                        ...userData,
                        token: 'mock-jwt-token-12345'
                    };
                    localStorage.setItem('travelExplorerUser', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject('Invalid registration data');
                }
            }, 1000);
        });
    }

    static async getPackages(filters = {}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockPackages = [
                    {
                        id: 1,
                        name: "Bali Beach Escape",
                        type: "basic",
                        price: 499,
                        duration: "4 days",
                        rating: 4.2,
                        image: "images/packages/bali-basic.jpg"
                    },
                    // Add more mock packages...
                ];

                let filtered = mockPackages;

                if (filters.type) {
                    filtered = filtered.filter(p => p.type === filters.type);
                }

                if (filters.search) {
                    const searchTerm = filters.search.toLowerCase();
                    filtered = filtered.filter(p =>
                        p.name.toLowerCase().includes(searchTerm)
                    );
                }

                resolve(filtered);
            }, 500);
        });
    }

    static async bookPackage(bookingData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (bookingData.packageId && bookingData.travelers > 0) {
                    const booking = {
                        id: Date.now(),
                        ...bookingData,
                        status: 'confirmed',
                        bookingDate: new Date().toISOString()
                    };
                    resolve(booking);
                } else {
                    reject('Invalid booking data');
                }
            }, 1500);
        });
    }
}
// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initAuthTabs();
    initPasswordToggle();
    initPasswordStrength();
    initLoginForm();
    initRegisterForm();
    initSocialAuth();
});

// Auth Tabs
function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabName = this.dataset.tab;

            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Password Toggle
function initPasswordToggle() {
    const showPasswordBtns = document.querySelectorAll('.show-password');

    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password Strength
function initPasswordStrength() {
    const passwordInput = document.getElementById('regPassword');

    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text span');

            let strength = 0;
            let color = '#f72585'; // Red for weak

            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;

            if (strength >= 75) {
                color = '#38b000'; // Green for strong
                strengthText.textContent = 'Strong';
            } else if (strength >= 50) {
                color = '#f8961e'; // Orange for medium
                strengthText.textContent = 'Medium';
            } else {
                strengthText.textContent = 'Weak';
            }

            strengthBar.style.width = strength + '%';
            strengthBar.style.backgroundColor = color;
        });
    }
}

// Login Form
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const remember = this.querySelector('input[name="remember"]').checked;

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;

            try {
                // Simulate API call
                const user = await TravelAPI.login(email, password);

                showNotification('Login successful!', 'success');

                // Redirect after successful login
                setTimeout(() => {
                    const redirectUrl = getUrlParam('redirect') || 'dashboard.html';
                    window.location.href = redirectUrl;
                }, 1500);

            } catch (error) {
                showNotification(error || 'Login failed. Please try again.', 'error');

                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Register Form
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = this.querySelector('#fullName').value;
            const email = this.querySelector('#regEmail').value;
            const password = this.querySelector('#regPassword').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;

            // Validation
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;

            try {
                // Simulate API call
                const user = await TravelAPI.register({
                    name: name,
                    email: email,
                    password: password
                });

                showNotification('Account created successfully!', 'success');

                // Redirect after successful registration
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                showNotification(error || 'Registration failed. Please try again.', 'error');

                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Social Auth
function initSocialAuth() {
    const googleBtn = document.querySelector('.btn-social.google');
    const facebookBtn = document.querySelector('.btn-social.facebook');

    if (googleBtn) {
        googleBtn.addEventListener('click', function () {
            showNotification('Google authentication coming soon!', 'info');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function () {
            showNotification('Facebook authentication coming soon!', 'info');
        });
    }
}

// Helper function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Check if user is already logged in
function checkAuthStatus() {
    const user = localStorage.getItem('travelExplorerUser');

    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }

    if (!user && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('travelExplorerUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize auth check
checkAuthStatus();