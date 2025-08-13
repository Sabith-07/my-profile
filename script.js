// Main JavaScript file for Mohd Sabith's Portfolio
class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'hero';
        this.scrollTimeout = null;
        this.observer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollAnimations();
        this.initializeComponents();
        this.startParticleSystem();
        
        // Initialize typing effects
        setTimeout(() => {
            this.initTypingEffects();
        }, 500);
        
        // Initialize CV download functionality
        this.initCVDownload();
        
        // Initialize contact form
        this.initContactForm();
        
        this.isLoading = false;
    }
    
    setupEventListeners() {
        // Navigation events
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMContentLoaded();
        });
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Navigation menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
                
                // Close mobile menu
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Custom cursor
        this.initCustomCursor();
    }
    
    initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const cursorTrail = document.getElementById('cursorTrail');
        
        if (!cursor || !cursorTrail) return;
        
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth trail animation
        const updateTrail = () => {
            const dx = mouseX - trailX;
            const dy = mouseY - trailY;
            
            trailX += dx * 0.1;
            trailY += dy * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            requestAnimationFrame(updateTrail);
        };
        
        updateTrail();
        
        // Cursor hover effects
        document.querySelectorAll('a, button, .skill-item, .cert-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    handleDOMContentLoaded() {
        // Initialize particle system
        if (window.ParticleSystem) {
            this.particles = new ParticleSystem();
        }
        
        // Initialize glitch effects
        if (window.GlitchEffect) {
            this.glitchEffect = new GlitchEffect();
        }
    }
    
    handleScroll() {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
            this.updateNavigation();
            this.updateScrollProgress();
        }, 10);
    }
    
    handleResize() {
        if (this.particles) {
            this.particles.resize();
        }
        
        if (this.skillsRadar) {
            this.initSkillsRadar();
        }
    }
    
    updateNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        
        this.currentSection = currentSection;
    }
    
    updateScrollProgress() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    }
    
    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    initializeAnimations() {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            const themeToggle = document.getElementById('themeToggle');
            const icon = themeToggle.querySelector('i');
            icon.className = 'fas fa-moon';
        }
    }
    
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements
        document.querySelectorAll('.timeline-item, .project-card, .cert-card').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    initializeComponents() {
        // Initialize skills radar
        this.initSkillsRadar();
        
        // Initialize skill hover effects
        this.initSkillHoverEffects();
        
        // Initialize certificate hover effects
        this.initCertificateEffects();
        
        // Initialize project terminal effects
        this.initProjectTerminalEffects();
    }
    
    initSkillsRadar() {
        const canvas = document.getElementById('skillsRadar');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const size = 280;
        canvas.width = size;
        canvas.height = size;
        
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size * 0.4;
        
        const skills = [
            { name: 'JavaScript', level: 90 },
            { name: 'Python', level: 85 },
            { name: 'React', level: 85 },
            { name: 'Java', level: 80 },
            { name: 'CSS', level: 90 },
            { name: 'Node.js', level: 75 },
            { name: 'SQL', level: 80 },
            { name: 'Git', level: 90 }
        ];
        
        const drawRadar = () => {
            ctx.clearRect(0, 0, size, size);
            
            // Draw radar grid
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = 1;
            
            // Draw concentric circles
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Draw spokes
            const angleStep = (Math.PI * 2) / skills.length;
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + Math.cos(angle) * radius,
                    centerY + Math.sin(angle) * radius
                );
                ctx.stroke();
            }
            
            // Draw skill levels
            ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const skillRadius = (radius * skills[i].level) / 100;
                const x = centerX + Math.cos(angle) * skillRadius;
                const y = centerY + Math.sin(angle) * skillRadius;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Draw skill points
            ctx.fillStyle = '#00d4ff';
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const skillRadius = (radius * skills[i].level) / 100;
                const x = centerX + Math.cos(angle) * skillRadius;
                const y = centerY + Math.sin(angle) * skillRadius;
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw skill labels
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Orbitron';
            ctx.textAlign = 'center';
            
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const labelRadius = radius + 20;
                const x = centerX + Math.cos(angle) * labelRadius;
                const y = centerY + Math.sin(angle) * labelRadius;
                
                ctx.fillText(skills[i].name, x, y);
            }
        };
        
        // Animate radar
        let animationProgress = 0;
        const animateRadar = () => {
            if (animationProgress < 1) {
                animationProgress += 0.02;
                drawRadar();
                requestAnimationFrame(animateRadar);
            } else {
                drawRadar();
            }
        };
        
        // Start animation when radar comes into view
        const radarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRadar();
                    radarObserver.unobserve(entry.target);
                }
            });
        });
        
        radarObserver.observe(canvas);
    }
    
    initSkillHoverEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Add glow effect
                item.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
                item.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = '';
                item.style.transform = '';
            });
        });
    }
    
    initCertificateEffects() {
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                // Add click animation
                card.style.transform = 'scale(1.05) rotateY(5deg)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            });
        });
    }
    
    initProjectTerminalEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const terminal = card.querySelector('.project-terminal');
            
            card.addEventListener('mouseenter', () => {
                terminal.style.transform = 'translateY(-5px)';
                terminal.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                terminal.style.transform = '';
                terminal.style.boxShadow = '';
            });
        });
    }
    
    initTypingEffects() {
        if (window.TypingEffect) {
            // Hero section typing effects
            new TypingEffect('greeting', "Hi, I'm", 1000);
            setTimeout(() => {
                new TypingEffect('title', 'Full Stack Developer & Problem Solver', 2500);
            }, 1500);
            setTimeout(() => {
                new TypingEffect('tagline', 'Turning ideas into scalable software solutions. Passionate about AI, Cybersecurity, and Smart Tech.', 4000);
            }, 3000);
            
            // Project typing effects
            const projectTypings = document.querySelectorAll('.typing-project');
            projectTypings.forEach((element, index) => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                new TypingEffect(element, element.dataset.text, 50);
                            }, index * 200);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(element);
            });
        }
    }
    
    initCVDownload() {
        const cvTyping = document.getElementById('cvTyping');
        const cvResponse = document.getElementById('cvResponse');
        const cvReady = document.getElementById('cvReady');
        const cvDownloadBtn = document.getElementById('cvDownloadBtn');
        
        if (!cvTyping) return;
        
        const cvObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        cvResponse.style.display = 'block';
                        cvResponse.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 1500);
                    
                    setTimeout(() => {
                        cvReady.style.display = 'block';
                        cvReady.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 2500);
                    
                    setTimeout(() => {
                        cvDownloadBtn.style.display = 'block';
                        cvDownloadBtn.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, 3500);
                    
                    cvObserver.unobserve(entry.target);
                }
            });
        });
        
        cvObserver.observe(cvTyping);
    }
    
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--gradient-accent)';
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
    
    startParticleSystem() {
        // Initialize particle system if available
        if (window.ParticleSystem) {
            this.particles = new ParticleSystem();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Get random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
};

// Export utils for other modules
window.utils = utils;
