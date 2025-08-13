class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch-text');
        this.init();
    }
    
    init() {
        this.setupGlitchAnimations();
        this.setupRandomGlitches();
    }
    
    setupGlitchAnimations() {
        this.glitchElements.forEach((element, index) => {
            // Add random delay to each glitch element
            element.style.animationDelay = `${Math.random() * 2}s`;
            
            // Create enhanced glitch effect on hover
            element.addEventListener('mouseenter', () => {
                this.triggerIntenseGlitch(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetGlitch(element);
            });
        });
    }
    
    triggerIntenseGlitch(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'glitch-intense 0.3s ease-in-out';
        
        // Add data corruption effect
        this.addDataCorruption(element);
    }
    
    resetGlitch(element) {
        setTimeout(() => {
            element.style.animation = 'glitch 2s infinite';
            this.removeDataCorruption(element);
        }, 300);
    }
    
    addDataCorruption(element) {
        const originalText = element.textContent;
        const corruptedText = this.corruptText(originalText);
        
        element.textContent = corruptedText;
        
        setTimeout(() => {
            element.textContent = originalText;
        }, 200);
    }
    
    removeDataCorruption(element) {
        const originalText = element.getAttribute('data-text') || element.textContent;
        element.textContent = originalText;
    }
    
    corruptText(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let corrupted = '';
        
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                corrupted += ' ';
            } else if (Math.random() < 0.1) {
                corrupted += chars[Math.floor(Math.random() * chars.length)];
            } else {
                corrupted += text[i];
            }
        }
        
        return corrupted;
    }
    
    setupRandomGlitches() {
        // Randomly trigger glitch effects
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                const randomElement = this.glitchElements[
                    Math.floor(Math.random() * this.glitchElements.length)
                ];
                this.triggerRandomGlitch(randomElement);
            }
        }, 3000);
    }
    
    triggerRandomGlitch(element) {
        const glitchTypes = [
            'glitch-flicker',
            'glitch-slide',
            'glitch-shake',
            'glitch-rgb'
        ];
        
        const randomGlitch = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
        
        element.style.animation = `${randomGlitch} 0.5s ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = 'glitch 2s infinite';
        }, 500);
    }
    
    // Matrix-style digital rain effect
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 33);
    }
    
    // Screen distortion effect
    createScreenDistortion() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes screen-distortion {
                0% { filter: hue-rotate(0deg) contrast(1) brightness(1); }
                25% { filter: hue-rotate(90deg) contrast(1.2) brightness(1.1); }
                50% { filter: hue-rotate(180deg) contrast(0.8) brightness(0.9); }
                75% { filter: hue-rotate(270deg) contrast(1.1) brightness(1.2); }
                100% { filter: hue-rotate(360deg) contrast(1) brightness(1); }
            }
            
            .screen-distortion {
                animation: screen-distortion 10s infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Apply distortion effect occasionally
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                document.body.classList.add('screen-distortion');
                setTimeout(() => {
                    document.body.classList.remove('screen-distortion');
                }, 2000);
            }
        }, 5000);
    }
}

// TV Static Effect
class TVStaticEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'tv-static';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '9999';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0';
        this.canvas.style.mixBlendMode = 'overlay';
        
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        
        document.body.appendChild(this.canvas);
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    start() {
        this.canvas.style.opacity = '0.1';
        this.animate();
    }
    
    stop() {
        this.canvas.style.opacity = '0';
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    animate() {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = 255;   // Alpha
        }
        
        this.ctx.putImageData(imageData, 0, 0);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Hologram Effect
class HologramEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        
        // Add hologram lines
        const lines = document.createElement('div');
        lines.className = 'hologram-lines';
        lines.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 212, 255, 0.03) 2px,
                rgba(0, 212, 255, 0.03) 4px
            );
            pointer-events: none;
            animation: hologram-flicker 2s infinite;
        `;
        
        this.element.appendChild(lines);
        
        // Add CSS for hologram animation
        if (!document.getElementById('hologram-styles')) {
            const style = document.createElement('style');
            style.id = 'hologram-styles';
            style.textContent = `
                @keyframes hologram-flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                .hologram-effect {
                    filter: brightness(1.2) contrast(1.1);
                    text-shadow: 
                        0 0 5px rgba(0, 212, 255, 0.5),
                        0 0 10px rgba(0, 212, 255, 0.3),
                        0 0 15px rgba(0, 212, 255, 0.2);
                }
            `;
            document.head.appendChild(style);
        }
        
        this.element.classList.add('hologram-effect');
    }
}

// Add CSS animations for enhanced glitch effects
const addGlitchStyles = () => {
    if (!document.getElementById('glitch-styles')) {
        const style = document.createElement('style');
        style.id = 'glitch-styles';
        style.textContent = `
            @keyframes glitch-intense {
                0%, 100% { transform: translate(0); }
                10% { transform: translate(-5px, -5px); }
                20% { transform: translate(5px, 5px); }
                30% { transform: translate(-5px, 5px); }
                40% { transform: translate(5px, -5px); }
                50% { transform: translate(-5px, -5px); }
                60% { transform: translate(5px, 5px); }
                70% { transform: translate(-5px, 5px); }
                80% { transform: translate(5px, -5px); }
                90% { transform: translate(-5px, -5px); }
            }
            
            @keyframes glitch-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            @keyframes glitch-slide {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            @keyframes glitch-shake {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-5px); }
                75% { transform: translateY(5px); }
            }
            
            @keyframes glitch-rgb {
                0%, 100% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize glitch styles when script loads
addGlitchStyles();

// Export classes
window.GlitchEffect = GlitchEffect;
window.TVStaticEffect = TVStaticEffect;
window.HologramEffect = HologramEffect;
