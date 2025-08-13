// Typing Effect System
class TypingEffect {
    constructor(element, text, delay = 50) {
        this.element = typeof element === 'string' ? document.getElementById(element) : element;
        this.text = text;
        this.delay = delay;
        this.currentIndex = 0;
        this.isTyping = false;
        
        if (this.element) {
            this.start();
        }
    }
    
    start() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        this.element.textContent = '';
        this.element.style.borderRight = '2px solid #00d4ff';
        this.element.style.animation = 'blink 1s infinite';
        
        this.typeCharacter();
    }
    
    typeCharacter() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            
            // Variable delay for more natural typing
            const currentDelay = this.getVariableDelay();
            
            setTimeout(() => {
                this.typeCharacter();
            }, currentDelay);
        } else {
            this.complete();
        }
    }
    
    getVariableDelay() {
        const char = this.text[this.currentIndex - 1];
        
        // Longer pauses after punctuation
        if (char === '.' || char === '!' || char === '?') {
            return this.delay * 8;
        } else if (char === ',' || char === ';') {
            return this.delay * 4;
        } else if (char === ' ') {
            return this.delay * 2;
        }
        
        // Random variation for natural feel
        return this.delay + (Math.random() * this.delay * 0.5);
    }
    
    complete() {
        this.isTyping = false;
        
        // Remove cursor after completion
        setTimeout(() => {
            this.element.style.borderRight = 'none';
            this.element.style.animation = 'none';
        }, 1000);
    }
    
    reset() {
        this.currentIndex = 0;
        this.isTyping = false;
        this.element.textContent = '';
    }
    
    // Static method for quick typing effect
    static type(element, text, delay = 50) {
        return new TypingEffect(element, text, delay);
    }
}

// Terminal Typing Effect (with command prompt style)
class TerminalTypingEffect extends TypingEffect {
    constructor(element, text, delay = 30) {
        super(element, text, delay);
        this.prompt = '$ ';
        this.setupTerminalStyle();
    }
    
    setupTerminalStyle() {
        this.element.style.fontFamily = "'Courier New', monospace";
        this.element.style.color = '#00ff00';
        this.element.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.element.style.padding = '10px';
        this.element.style.borderRadius = '4px';
    }
    
    start() {
        this.element.textContent = this.prompt;
        this.element.style.borderRight = '2px solid #00ff00';
        this.element.style.animation = 'blink 1s infinite';
        
        this.isTyping = true;
        this.typeCharacter();
    }
    
    typeCharacter() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent = this.prompt + this.text.substring(0, this.currentIndex + 1);
            this.currentIndex++;
            
            setTimeout(() => {
                this.typeCharacter();
            }, this.delay);
        } else {
            this.complete();
        }
    }
}

// Glitch Typing Effect
class GlitchTypingEffect extends TypingEffect {
    constructor(element, text, delay = 50) {
        super(element, text, delay);
        this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
        this.glitchCount = 0;
        this.maxGlitches = 3;
    }
    
    typeCharacter() {
        if (this.currentIndex < this.text.length) {
            // Occasionally glitch the text
            if (Math.random() < 0.1 && this.glitchCount < this.maxGlitches) {
                this.glitchText();
            } else {
                this.element.textContent += this.text[this.currentIndex];
                this.currentIndex++;
                
                setTimeout(() => {
                    this.typeCharacter();
                }, this.delay);
            }
        } else {
            this.complete();
        }
    }
    
    glitchText() {
        const currentText = this.element.textContent;
        const glitchChar = this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
        
        this.element.textContent = currentText + glitchChar;
        this.element.style.color = '#ff006e';
        
        this.glitchCount++;
        
        setTimeout(() => {
            this.element.textContent = currentText;
            this.element.style.color = '';
            
            // Continue with normal character
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            
            setTimeout(() => {
                this.typeCharacter();
            }, this.delay);
        }, 100);
    }
}

// Matrix-style Typing Effect
class MatrixTypingEffect {
    constructor(element, text, delay = 50) {
        this.element = typeof element === 'string' ? document.getElementById(element) : element;
        this.text = text;
        this.delay = delay;
        this.matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        this.currentIndex = 0;
        
        this.setupMatrixStyle();
        if (this.element) {
            this.start();
        }
    }
    
    setupMatrixStyle() {
        this.element.style.fontFamily = "'Courier New', monospace";
        this.element.style.color = '#00ff00';
        this.element.style.textShadow = '0 0 10px #00ff00';
        this.element.style.letterSpacing = '2px';
    }
    
    start() {
        this.element.textContent = '';
        this.revealCharacter();
    }
    
    revealCharacter() {
        if (this.currentIndex < this.text.length) {
            this.animateCharacterReveal();
        }
    }
    
    animateCharacterReveal() {
        const targetChar = this.text[this.currentIndex];
        let iterations = 0;
        const maxIterations = 10;
        
        const scrambleInterval = setInterval(() => {
            const currentText = this.text.substring(0, this.currentIndex);
            const scrambledChar = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
            
            this.element.textContent = currentText + scrambledChar;
            
            iterations++;
            
            if (iterations >= maxIterations) {
                clearInterval(scrambleInterval);
                this.element.textContent = this.text.substring(0, this.currentIndex + 1);
                this.currentIndex++;
                
                setTimeout(() => {
                    this.revealCharacter();
                }, this.delay);
            }
        }, 50);
    }
}

// Quantum Text Effect (characters appear in random order then settle)
class QuantumTypingEffect {
    constructor(element, text, delay = 50) {
        this.element = typeof element === 'string' ? document.getElementById(element) : element;
        this.text = text;
        this.delay = delay;
        this.chars = text.split('');
        this.positions = this.chars.map((_, i) => i);
        this.revealed = new Set();
        
        if (this.element) {
            this.start();
        }
    }
    
    start() {
        this.element.innerHTML = this.createSpanStructure();
        this.shufflePositions();
        this.revealCharacters();
    }
    
    createSpanStructure() {
        return this.chars.map((char, index) => 
            `<span id="char-${index}" style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }
    
    shufflePositions() {
        for (let i = this.positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.positions[i], this.positions[j]] = [this.positions[j], this.positions[i]];
        }
    }
    
    revealCharacters() {
        if (this.revealed.size < this.chars.length) {
            const nextPosition = this.positions[this.revealed.size];
            const span = document.getElementById(`char-${nextPosition}`);
            
            if (span) {
                span.style.opacity = '1';
                span.style.color = '#00d4ff';
                span.style.textShadow = '0 0 10px #00d4ff';
                
                // Fade to normal color
                setTimeout(() => {
                    span.style.color = '';
                    span.style.textShadow = '';
                }, 200);
            }
            
            this.revealed.add(nextPosition);
            
            setTimeout(() => {
                this.revealCharacters();
            }, this.delay);
        }
    }
}

// Add CSS for typing cursor animation
const addTypingStyles = () => {
    if (!document.getElementById('typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            @keyframes blink {
                0%, 50% { border-color: #00d4ff; }
                51%, 100% { border-color: transparent; }
            }
            
            .typing-cursor {
                border-right: 2px solid #00d4ff;
                animation: blink 1s infinite;
            }
            
            .typing-complete .typing-cursor {
                border-right: none;
                animation: none;
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize typing styles
addTypingStyles();

// Export classes
window.TypingEffect = TypingEffect;
window.TerminalTypingEffect = TerminalTypingEffect;
window.GlitchTypingEffect = GlitchTypingEffect;
window.MatrixTypingEffect = MatrixTypingEffect;
window.QuantumTypingEffect = QuantumTypingEffect;
