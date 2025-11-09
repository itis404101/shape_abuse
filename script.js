// Shape class with properties: x, y, size, colour, shapeType
class Shape {
    constructor(x, y, size, colour, shapeType) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.colour = colour;
        this.shapeType = shapeType; // 'circle', 'square', 'triangle', 'star'
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2; // Random rotation speed
    }
    
    // Draw the shape on canvas with rotation effect
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw the shape based on type
        ctx.fillStyle = this.colour;
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        
        switch(this.shapeType) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'square':
                ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.lineTo(this.size, this.size);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'star':
                this.drawStar(ctx, 0, 0, 5, this.size, this.size / 2);
                break;
                
            case 'pentagon':
                this.drawPolygon(ctx, 0, 0, 5, this.size);
                break;
                
            case 'hexagon':
                this.drawPolygon(ctx, 0, 0, 6, this.size);
                break;
                
            case 'octagon':
                // Wider octagon to better fit faces
                this.drawPolygon(ctx, 0, 0, 8, this.size * 1.2);
                break;
                
            case 'diamond':
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size * 0.6, 0);
                ctx.lineTo(0, this.size);
                ctx.lineTo(-this.size * 0.6, 0);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'heart':
                this.drawHeart(ctx, 0, 0, this.size * 1.3);
                break;
                
            case 'cross':
                const crossWidth = this.size * 0.4;
                ctx.fillRect(-crossWidth, -this.size, crossWidth * 2, this.size * 2);
                ctx.fillRect(-this.size, -crossWidth, this.size * 2, crossWidth * 2);
                break;
        }
        
        // Draw suffering face
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        
        // Eyes (X marks for suffering)
        ctx.beginPath();
        // Left eye X
        ctx.moveTo(-this.size * 0.3, -this.size * 0.2);
        ctx.lineTo(-this.size * 0.15, -this.size * 0.05);
        ctx.moveTo(-this.size * 0.15, -this.size * 0.2);
        ctx.lineTo(-this.size * 0.3, -this.size * 0.05);
        // Right eye X
        ctx.moveTo(this.size * 0.15, -this.size * 0.2);
        ctx.lineTo(this.size * 0.3, -this.size * 0.05);
        ctx.moveTo(this.size * 0.3, -this.size * 0.2);
        ctx.lineTo(this.size * 0.15, -this.size * 0.05);
        ctx.stroke();
        
        // Suffering mouth (wavy) - moved up to stay within shape
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.3, this.size * 0.15);
        for (let i = 0; i < 5; i++) {
            const x = -this.size * 0.3 + (i * this.size * 0.15);
            const y = this.size * 0.15 + (i % 2 === 0 ? -this.size * 0.05 : this.size * 0.05);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Helper method to draw a star
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
    
    // Helper method to draw a regular polygon
    drawPolygon(ctx, cx, cy, sides, radius) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
    }
    
    // Helper method to draw a heart
    drawHeart(ctx, cx, cy, size) {
        ctx.beginPath();
        // Bottom point of the heart
        ctx.moveTo(cx, cy + size * 0.5);
        
        // Left side of heart (wider)
        ctx.bezierCurveTo(
            cx, cy + size * 0.2,           // Control point 1
            cx - size * 0.7, cy + size * 0.3,  // Control point 2 (pushed out more)
            cx - size * 0.6, cy            // End point (left curve top, wider)
        );
        
        // Left top bump (rounder)
        ctx.bezierCurveTo(
            cx - size * 0.6, cy - size * 0.6,  // Control point 1
            cx - size * 0.2, cy - size * 0.7,  // Control point 2
            cx, cy - size * 0.3            // End point (center top)
        );
        
        // Right top bump (rounder)
        ctx.bezierCurveTo(
            cx + size * 0.2, cy - size * 0.7,  // Control point 1
            cx + size * 0.6, cy - size * 0.6,  // Control point 2
            cx + size * 0.6, cy            // End point (right curve top, wider)
        );
        
        // Right side of heart (wider)
        ctx.bezierCurveTo(
            cx + size * 0.7, cy + size * 0.3,  // Control point 1 (pushed out more)
            cx, cy + size * 0.2,           // Control point 2
            cx, cy + size * 0.5            // End point (bottom)
        );
        
        ctx.closePath();
        ctx.fill();
    }
    
    // Update shape position
    update(canvasWidth, canvasHeight, speedX, speedY) {
        // Move circle
        this.x += speedX;
        this.y += speedY;
        
        // Rotate forever (SUFFER) - steady rotation
        this.rotation += this.rotationSpeed;
        
        // Bounce off walls - return new speeds if bounced
        let newSpeedX = speedX;
        let newSpeedY = speedY;
        let escaped = false;
        
        if (this.x + this.size > canvasWidth || this.x - this.size < 0) {
            newSpeedX = -speedX;
            escaped = true;
        }
        
        if (this.y + this.size > canvasHeight || this.y - this.size < 0) {
            newSpeedY = -speedY;
            escaped = true;
        }
        
        // Clamp position to stay within bounds
        this.x = Math.max(this.size, Math.min(canvasWidth - this.size, this.x));
        this.y = Math.max(this.size, Math.min(canvasHeight - this.size, this.y));
        
        return { speedX: newSpeedX, speedY: newSpeedY, escaped };
    }
}

// Canvas setup and animation
class FireworksAnimation {
    constructor() {
        this.playground = document.getElementById('fireworks-canvas');
        this.ctx = this.playground.getContext('2d');
        
        // Set default and canvas size
        this.defaultWidth = 800;
        this.defaultHeight = 600;
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.resizeCanvas();
        
        // Array to store circles
        this.circles = [];
        
        // Array to store speeds separately
        this.speeds = [];
        
        // Alert system
        this.escapeAlert = document.getElementById('escape-alert');
        this.alertTimeout = null;
        this.speeds = [];
        // Create 10 circles with random properties
        this.createCircles(10);
        
        // Setup button controls
        this.setupControls();
        
        // Update height slider length
        this.updateHeightSliderLength();
        
        // Resize event
        window.addEventListener('resize', () => {
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            document.getElementById('width-slider').max = window.innerWidth;
            document.getElementById('height-slider').max = window.innerHeight;
            document.getElementById('width-slider').value = this.canvasWidth;
            document.getElementById('height-slider').value = this.canvasHeight;
            this.resizeCanvas();
            this.updateSizeDisplay();
            this.updateHeightSliderLength();
        });
        
        // Click to spawn shapes
        this.playground.addEventListener('click', (e) => {
            const rect = this.playground.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.spawnShapeAt(x, y);
        });
        
        // Start animation
        this.animate();
    }
    
    setupControls() {
        this.updateSizeDisplay();
        
        // Setup sliders
        const widthSlider = document.getElementById('width-slider');
        const heightSlider = document.getElementById('height-slider');
        
        // Set initial slider values
        widthSlider.max = window.innerWidth;
        heightSlider.max = window.innerHeight;
        widthSlider.value = this.canvasWidth;
        heightSlider.value = this.canvasHeight;
        
        // Interval tracking for hold functionality
        let holdInterval = null;
        
        // Width slider
        widthSlider.addEventListener('input', (e) => {
            this.canvasWidth = parseInt(e.target.value);
            this.resizeCanvas();
            this.updateSizeDisplay();
        });
        
        // Height slider
        heightSlider.addEventListener('input', (e) => {
            this.canvasHeight = parseInt(e.target.value);
            this.resizeCanvas();
            this.updateSizeDisplay();
        });
        
        // Helper function to start holding
        const startHold = (callback) => {
            callback(); // Execute immediately
            holdInterval = setInterval(callback, 50); // Then repeat every 50ms
        };
        
        // Helper function to stop holding
        const stopHold = () => {
            if (holdInterval) {
                clearInterval(holdInterval);
                holdInterval = null;
            }
        };
        
        // Increase width button
        const increaseWidthBtn = document.getElementById('increase-width');
        increaseWidthBtn.addEventListener('mousedown', () => {
            startHold(() => {
                this.canvasWidth = Math.min(this.canvasWidth + 1, window.innerWidth);
                widthSlider.value = this.canvasWidth;
                this.resizeCanvas();
                this.updateSizeDisplay();
            });
        });
        increaseWidthBtn.addEventListener('mouseup', stopHold);
        increaseWidthBtn.addEventListener('mouseleave', stopHold);
        
        // Decrease width button
        const decreaseWidthBtn = document.getElementById('decrease-width');
        decreaseWidthBtn.addEventListener('mousedown', () => {
            startHold(() => {
                this.canvasWidth = Math.max(this.canvasWidth - 1, 200);
                widthSlider.value = this.canvasWidth;
                this.resizeCanvas();
                this.updateSizeDisplay();
            });
        });
        decreaseWidthBtn.addEventListener('mouseup', stopHold);
        decreaseWidthBtn.addEventListener('mouseleave', stopHold);
        
        // Increase height button
        const increaseHeightBtn = document.getElementById('increase-height');
        increaseHeightBtn.addEventListener('mousedown', () => {
            startHold(() => {
                this.canvasHeight = Math.min(this.canvasHeight + 1, window.innerHeight);
                heightSlider.value = this.canvasHeight;
                this.resizeCanvas();
                this.updateSizeDisplay();
            });
        });
        increaseHeightBtn.addEventListener('mouseup', stopHold);
        increaseHeightBtn.addEventListener('mouseleave', stopHold);
        
        // Decrease height button
        const decreaseHeightBtn = document.getElementById('decrease-height');
        decreaseHeightBtn.addEventListener('mousedown', () => {
            startHold(() => {
                this.canvasHeight = Math.max(this.canvasHeight - 1, 200);
                heightSlider.value = this.canvasHeight;
                this.resizeCanvas();
                this.updateSizeDisplay();
            });
        });
        decreaseHeightBtn.addEventListener('mouseup', stopHold);
        decreaseHeightBtn.addEventListener('mouseleave', stopHold);
        
        document.getElementById('default').addEventListener('click', () => {
            this.canvasWidth = this.defaultWidth;
            this.canvasHeight = this.defaultHeight;
            widthSlider.value = this.canvasWidth;
            heightSlider.value = this.canvasHeight;
            this.resizeCanvas();
            this.updateSizeDisplay();
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            widthSlider.value = this.canvasWidth;
            heightSlider.value = this.canvasHeight;
            this.resizeCanvas();
            // Clear all existing shapes and speeds, then reset to 10
            this.circles = [];
            this.speeds = [];
            this.createCircles(10);
            this.updateSizeDisplay();
        });
    }
    
    updateSizeDisplay() {
        document.getElementById('current-size').textContent = 
            `Current: ${this.canvasWidth} x ${this.canvasHeight}`;
        document.getElementById('max-size').textContent = 
            `Maximum: ${window.innerWidth} x ${window.innerHeight} | Default: ${this.defaultWidth} x ${this.defaultHeight}`;
        document.getElementById('creature-count').textContent = 
            `Suffering Crewmates: ${this.circles.length} 💀`;
    }
    
    resizeCanvas() {
        this.playground.width = this.canvasWidth;
        this.playground.height = this.canvasHeight;
        
        // Fill canvas with black background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.playground.width, this.playground.height);
    }
    
    updateHeightSliderLength() {
        const heightSliderGroup = document.querySelector('.height-slider-group');
        const heightSlider = document.getElementById('height-slider');
        
        if (heightSliderGroup && heightSlider) {
            const groupHeight = heightSliderGroup.offsetHeight;
            heightSlider.style.width = (groupHeight - 100) + 'px';
        }
    }
    
    // Generate completely random color
    randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Create multiple circles with randomized properties
    createCircles(count) {
        // Start position at the middle of canvas
        const centerX = this.playground.width / 2;
        const centerY = this.playground.height / 2;
        
    // Available shape types
    const shapeTypes = ['circle', 'square', 'triangle', 'star', 'pentagon', 'hexagon', 'octagon', 'diamond', 'heart', 'cross'];
        
        for (let i = 0; i < count; i++) {
            // Fixed size
            const size = 15;
            
            // Random color
            const colour = this.randomColor();
            
            // Random shape type
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            
            // Random speed and direction (between -3 and 3)
            const speedX = (Math.random() - 0.5) * 6;
            const speedY = (Math.random() - 0.5) * 6;
            
            // Create and add shape at center position
            this.circles.push(new Shape(centerX, centerY, size, colour, shapeType));
            
            // Store speed separately
            this.speeds.push({ speedX, speedY });
        }
    }
    
    // Spawn a single shape at specific position
    spawnShapeAt(x, y) {
        const shapeTypes = ['circle', 'square', 'triangle', 'star', 'pentagon', 'hexagon', 'octagon', 'diamond', 'heart', 'cross'];
        
        const size = 15;
        const colour = this.randomColor();
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const speedX = (Math.random() - 0.5) * 6;
        const speedY = (Math.random() - 0.5) * 6;
        
        this.circles.push(new Shape(x, y, size, colour, shapeType));
        this.speeds.push({ speedX, speedY });
        
        // Update the creature count
        this.updateSizeDisplay();
    }
    
    // Show escape alert
    showEscapeAlert() {
        this.escapeAlert.classList.add('show');
        
        // Clear any existing timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }
        
        // Hide after 0.1 second
        this.alertTimeout = setTimeout(() => {
            this.escapeAlert.classList.remove('show');
        }, 100);
    }
    
    // Check and handle collisions between shapes
    handleCollisions() {
        for (let i = 0; i < this.circles.length; i++) {
            for (let j = i + 1; j < this.circles.length; j++) {
                const circle1 = this.circles[i];
                const circle2 = this.circles[j];
                
                // Calculate distance between centers
                const dx = circle2.x - circle1.x;
                const dy = circle2.y - circle1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = circle1.size + circle2.size;
                
                // Check if circles are colliding
                if (distance < minDistance) {
                    // Calculate collision normal
                    const nx = dx / distance;
                    const ny = dy / distance;
                    
                    // Separate overlapping circles
                    const overlap = minDistance - distance;
                    const separationX = (overlap / 2) * nx;
                    const separationY = (overlap / 2) * ny;
                    
                    circle1.x -= separationX;
                    circle1.y -= separationY;
                    circle2.x += separationX;
                    circle2.y += separationY;
                    
                    // Get velocities
                    const speed1 = this.speeds[i];
                    const speed2 = this.speeds[j];
                    
                    // Calculate relative velocity
                    const dvx = speed2.speedX - speed1.speedX;
                    const dvy = speed2.speedY - speed1.speedY;
                    
                    // Calculate relative velocity in collision normal direction
                    const dvn = dvx * nx + dvy * ny;
                    
                    // Do not resolve if velocities are separating
                    if (dvn < 0) continue;
                    
                    // Apply impulse (elastic collision with equal mass)
                    const impulse = dvn;
                    
                    speed1.speedX += impulse * nx;
                    speed1.speedY += impulse * ny;
                    speed2.speedX -= impulse * nx;
                    speed2.speedY -= impulse * ny;
                }
            }
        }
    }
    
    // Animation loop
    animate() {
        // Clear canvas with slight trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.playground.width, this.playground.height);
        
        // Draw playground
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, this.playground.width, this.playground.height);
        
        // Handle collisions between shapes
        this.handleCollisions();
        
        // Update and draw all circles
        this.circles.forEach((circle, index) => {
            // Get current speed for this circle
            const speed = this.speeds[index];
            
            // Update circle and get new speed (in case of bounce)
            const result = circle.update(this.playground.width, this.playground.height, speed.speedX, speed.speedY);
            
            // Check for escape attempt
            if (result.escaped) {
                console.log(`🚨 ESCAPE ATTEMPT! Shape #${index + 1} tried to escape but was caught!`);
                this.showEscapeAlert();
            }
            
            // Update stored speed
            this.speeds[index] = { speedX: result.speedX, speedY: result.speedY };
            
            // Draw circle
            circle.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FireworksAnimation();
});
