document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initScrollTop();
    initHeaderScroll();
    initTabs();
    initAccordion();
    initExchangeCalculator();
    initContactForm();
});

function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

function initScrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    
    if (!scrollTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            accordionItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initExchangeCalculator() {
    const exchangeForm = document.getElementById('exchange-form');
    const giveAmount = document.getElementById('give-amount');
    const giveCurrency = document.getElementById('give-currency');
    const receiveAmount = document.getElementById('receive-amount');
    const receiveCurrency = document.getElementById('receive-currency');
    const exchangeRate = document.getElementById('exchange-rate');
    const swapButton = document.getElementById('swap-currencies');
    
    const rates = {
        BTC: 64230,
        ETH: 3420,
        USDT: 1,
        BNB: 580,
        XRP: 0.52,
        ADA: 0.45,
        SOL: 140
    };
    
    function calculateExchange() {
        const give = parseFloat(giveAmount.value) || 0;
        const giveRate = rates[giveCurrency.value];
        const receiveRate = rates[receiveCurrency.value];
        
        const giveInUSD = give * giveRate;
        const fee = giveInUSD * 0.001;
        const receiveInUSD = giveInUSD - fee;
        const receive = receiveInUSD / receiveRate;
        
        receiveAmount.value = receive.toFixed(8);
        
        const rate = giveRate / receiveRate;
        exchangeRate.textContent = `1 ${giveCurrency.value} ≈ ${rate.toFixed(8)} ${receiveCurrency.value}`;
    }
    
    if (giveAmount) {
        giveAmount.addEventListener('input', calculateExchange);
        giveCurrency.addEventListener('change', calculateExchange);
        receiveCurrency.addEventListener('change', calculateExchange);
    }
    
    if (swapButton) {
        swapButton.addEventListener('click', () => {
            const tempCurrency = giveCurrency.value;
            const tempAmount = giveAmount.value;
            
            giveCurrency.value = receiveCurrency.value;
            receiveCurrency.value = tempCurrency;
            giveAmount.value = receiveAmount.value;
            
            calculateExchange();
        });
    }
    
    if (exchangeForm) {
        exchangeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const modalMessage = `
                Обмен инициирован!
                
                Отдаете: ${giveAmount.value} ${giveCurrency.value}
                Получаете: ${receiveAmount.value} ${receiveCurrency.value}
                
                На следующем этапе вам будет предоставлен адрес для отправки криптовалюты.
            `;
            
            alert(modalMessage);
        });
    }
    
    calculateExchange();
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    const validators = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: 'Имя должно содержать минимум 2 символа'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Введите корректный email адрес'
        },
        subject: {
            validate: (value) => value !== '',
            message: 'Пожалуйста, выберите тему сообщения'
        },
        message: {
            validate: (value) => value.trim().length >= 10,
            message: 'Сообщение должно содержать минимум 10 символов'
        }
    };
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = 'var(--danger-color)';
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = '';
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function validateField(input) {
        const validator = validators[input.name];
        
        if (!validator) return true;
        
        const isValid = validator.validate(input.value);
        
        if (!isValid) {
            showError(input, validator.message);
        } else {
            clearError(input);
        }
        
        return isValid;
    }
    
    [nameInput, emailInput, subjectSelect, messageTextarea].forEach(input => {
        if (input) {
            input.addEventListener('blur', () => validateField(input));
            
            input.addEventListener('input', () => {
                if (input.style.borderColor === 'var(--danger-color)') {
                    validateField(input);
                }
            });
        }
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = [nameInput, emailInput, subjectSelect, messageTextarea];
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            const firstError = contactForm.querySelector('[style*="border-color"]');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            contactForm.reset();
            inputs.forEach(input => clearError(input));
            
            const successMessage = contactForm.querySelector('.form-success');
            if (successMessage) {
                successMessage.style.display = 'flex';
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
            
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

const cryptoCards = document.querySelectorAll('.crypto-card');
cryptoCards.forEach((card, index) => {
    setInterval(() => {
        const priceElement = card.querySelector('.crypto-price');
        const changeElement = card.querySelector('.crypto-change');
        
        if (priceElement && !priceElement.textContent.includes('1.00')) {
            const currentPrice = parseFloat(priceElement.textContent.replace(/[$,]/g, ''));
            const change = (Math.random() - 0.5) * (currentPrice * 0.02);
            const newPrice = currentPrice + change;
            
            priceElement.textContent = `$${newPrice.toLocaleString('en-US', {
                minimumFractionDigits: change < 1 ? 2 : 0,
                maximumFractionDigits: change < 1 ? 2 : 0
            })}`;
            
            const percentChange = ((change / currentPrice) * 100).toFixed(1);
            changeElement.textContent = `${percentChange >= 0 ? '+' : ''}${percentChange}%`;
            
            if (percentChange >= 0) {
                changeElement.classList.remove('neutral');
                changeElement.classList.add('positive');
            } else {
                changeElement.classList.remove('positive');
                changeElement.classList.add('neutral');
            }
        }
    }, 3000 + (index * 1000));
});

document.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section[id]');
    
    let current = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

const observeElements = document.querySelectorAll('.service-card, .review-card');
observeElements.forEach((element, index) => {
    element.style.setProperty('--delay', `${index * 0.1}s`);
});
