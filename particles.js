// Particle System for Starfield Background
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('starfield');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.config = {
            particleCount: 150,
            connectionDistance: 150,
            mouseInfluence: 100,
            colors: {
                particles: ['#00d4ff', '#b847ff', '#ff006e', '#00ffff', '#39ff14'],
                connections: 'rgba(0, 212, 255, 0.2)'
            },
            speeds: {
                min: 0.1,
                max: 0.5
            },
            sizes: {
                min: 1,
                max: 3
            }
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * (this.config.speeds.max - this.config.speeds.min) + this.config.speeds.min,
                vy: (Math.random() - 0.5) * (this.config.speeds.max - this.config.speeds.min) + this.config.speeds.min,
                size: Math.random() * (this.config.sizes.max - this.config.sizes.min) + this.config.sizes.min,
                color: this.config.colors.particles[Math.floor(Math.random() * this.config.colors.particles.length)],
                opacity: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseInfluence) {
                const force = (this.config.mouseInfluence - distance) / this.config.mouseInfluence;
                particle.x -= (dx / distance) * force * 2;
                particle.y -= (dy / distance) * force * 2;
            }
            
            // Update twinkle animation
            particle.twinkle += particle.twinkleSpeed;
            particle.opacity = 0.5 + Math.sin(particle.twinkle) * 0.3;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawConnections() {
        this.ctx.strokeStyle = this.config.colors.connections;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    this.ctx.save();
                    this.ctx.globalAlpha = 1 - distance / this.config.connectionDistance;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    
                    this.ctx.restore();
                }
            }
        }
    }
    
    drawShootingStars() {
        // Occasionally draw shooting stars
        if (Math.random() < 0.001) {
            const startX = Math.random() * this.canvas.width;
            const startY = 0;
            const endX = startX + Math.random() * 200 - 100;
            const endY = Math.random() * 200 + 50;
            
            const gradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.save();
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ffffff';
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
            
            this.ctx.restore();
        }
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw gradient background
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    animate() {
        this.clear();
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        this.drawShootingStars();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
}

// Nebula Effect (additional background effect)
class NebulaEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.time = 0;
    }
    
    draw() {
        this.time += 0.005;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Create multiple nebula layers
        for (let i = 0; i < 3; i++) {
            const radius = 200 + i * 100;
            const offsetX = Math.sin(this.time + i) * 50;
            const offsetY = Math.cos(this.time * 0.7 + i) * 30;
            
            const gradient = this.ctx.createRadialGradient(
                centerX + offsetX, centerY + offsetY, 0,
                centerX + offsetX, centerY + offsetY, radius
            );
            
            const colors = [
                'rgba(184, 71, 255, 0.1)',  // Purple
                'rgba(0, 212, 255, 0.05)',  // Blue
                'rgba(255, 0, 110, 0.05)'   // Pink
            ];
            
            gradient.addColorStop(0, colors[i]);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
}

// Export classes for use in other modules
window.ParticleSystem = ParticleSystem;
window.NebulaEffect = NebulaEffect;
