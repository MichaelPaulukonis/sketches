export default function Sketch (p5, P5, t, size) {

    // All the paths
    let paths = [];
    // Are we painting?
    let painting = false;
    // How long until the next circle
    let next = 0;
    // Where are we now and where were we?
    let current;
    let previous;
    let px = 0;
    let py = 10000;
    const cWidth = size.width
    const cHeight = size.height

    p5.setup = () => {
        const canvas = p5.createCanvas(cWidth, cHeight);
        canvas.parent("p5Canvas");
        current = p5.createVector(0, 0);
        previous = p5.createVector(0, 0);
        p5.colorMode(p5.HSB, cWidth, cHeight, 100, 1)
    }

    const getPos = () => ({
        x: Math.floor(cWidth * p5.noise(px)),
        y: Math.floor(cHeight * p5.noise(py))
    })

    p5.draw = () => {
        p5.background(0);

        const pp = p5.random()
        if (pp < 0.05 && !painting) {
            startPainting()
        }
        if (pp < 0.02 && painting) {
            stopPainting()
        }

        // If it's time for a new point
        if (p5.millis() > next && painting) {
            px += 0.01;
            py += 0.01;
            // Grab mouse position      
            // current.x = mouseX;
            // current.y = mouseY;
            const pos = getPos()
            current.x = pos.x
            current.y = pos.y

            // New particle's force is based on mouse movement
            let force = P5.Vector.sub(current, previous);
            force.mult(0.5);

            // Add new particle
            paths[paths.length - 1].add(current, force);

            // Schedule next circle
            next = p5.millis() + p5.random(100);

            // Store mouse values
            previous.x = current.x;
            previous.y = current.y;
        } else {
            px += 0.02;
            py += 0.02;
        }

        // Draw all paths
        for (let i = 0; i < paths.length; i++) {
            paths[i].update();
            paths[i].display();
        }
    }

    p5.mousePressed = () => {
        startPainting()
    }

    // Stop
    p5.mouseReleased = () => {
        stopPainting()
    }

    // Start it up
    const startPainting = () => {
        next = 0;
        painting = true;
        const pos = getPos()
        previous.x = pos.x
        previous.y = pos.y
        paths.push(new Path(pos));
    }

    // Stop
    const stopPainting = () => {
        painting = false;
    }

    // A Path is a list of particles
    class Path {
        constructor(position) {
            // console.log(`new Path from: ${JSON.stringify(position)}`)
            this.particles = [];
            this.hue = p5.random(100);
            this.sizeChange = p5.random([0.995, 1.005, 0.99, 1.01, 0.995, 1.005, 0.99, 1.01, 0.95, 1.05])
            this.alignment = p5.random([p5.LEFT, p5.RIGHT, p5.CENTER])
            this.position = position
        }

        add (position, force) {
            // Add a new particle with a position, force, and hue
            this.particles.push(new Particle(position, force, this.hue, this.sizeChange, this.alignment));
        }

        // Display plath
        update () {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
            }
        }

        // Display plath
        display () {
            // Loop through backwards
            for (let i = this.particles.length - 1; i >= 0; i--) {
                // If we shold remove it
                if (this.particles[i].lifespan <= 0) {
                    this.particles.splice(i, 1);
                    // Otherwise, display it
                } else {
                    this.particles[i].display(this.particles[i + 1]);
                }
            }

        }
    }

    // Particles along the path
    class Particle {
        constructor(position, force, hue, sizeChange, alignment) {
            this.position = p5.createVector(position.x, position.y);
            this.velocity = p5.createVector(force.x, force.y);
            this.drag = 0.95;
            this.sizeChange = sizeChange
            this.lifespan = 150;
            this.text = t.getWord()
            this.size = p5.map(hue, 0, 100, 4, 64)
            this.alignment = alignment
        }

        update () {
            // Move it
            this.position.add(this.velocity);
            // Slow it down
            this.velocity.mult(this.drag);
            this.size = this.size / this.sizeChange;
            // Fade it out
            this.lifespan--;
        }

        display (other) {
            p5.stroke(this.position.x, this.position.y, 100, p5.map(this.lifespan, 0, 255, 0, 1, true));
            p5.fill(this.position.x, this.position.y, 100, p5.map(this.lifespan / 2, 0, 255, 0, 1, true));
            p5.textSize(this.size)
            p5.textAlign(this.alignment)
            p5.text(this.text, this.position.x, this.position.y);
            // If we need to draw a line
            if (other) {
                // line(this.position.x, this.position.y, other.position.x, other.position.y);
            }
        }
    }
}
