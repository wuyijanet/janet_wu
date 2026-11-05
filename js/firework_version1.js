console.log("ONLY v1 loaded");
const fireworkVersion1Sketch = (p) => {
  let fireworks = [];

  const colorSet = [
    [255, 100, 0],
    [255, 50, 0],
    [255, 255, 0]
  ];

  const altColorSet = [
    [0, 100, 255],
    [0, 255, 100],
    [150, 0, 255]
  ];

  p.setup = function () {
    const canvas = p.createCanvas(640, 480);
    canvas.parent("fireworkSketchV1");
  };

  p.draw = function () {
    p.background(255, 210, 220);

    if (!sharedVideo || !sharedVideo.elt) return;

    p.push();
    p.translate(p.width, 0);
    p.scale(-1, 1);
    p.image(sharedVideo.elt, 0, 0, p.width, p.height);
    p.pop();

    if (p.frameCount % 12 === 0) {
      const useAlt = p.random() > 0.5;
      const colors = useAlt ? altColorSet : colorSet;

      fireworks.push(
        new Firework(
          p.random(80, p.width - 80),
          p.random(80, p.height - 180),
          colors
        )
      );
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();

      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
  };

  class Firework {
    constructor(x, y, colors) {
      this.particles = [];
      for (let i = 0; i < 30; i++) {
        const angle = p.random(p.TWO_PI);
        const speed = p.random(2, 5);
        const vx = p.cos(angle) * speed;
        const vy = p.sin(angle) * speed;
        const col = colors[p.int(p.random(colors.length))];
        this.particles.push(new Particle(x, y, vx, vy, col));
      }
    }

    update() {
      for (const particle of this.particles) particle.update();
    }

    show() {
      for (const particle of this.particles) particle.show();
    }

    done() {
      return this.particles.every((p) => p.lifespan <= 0);
    }
  }

  class Particle {
    constructor(x, y, vx, vy, col) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.col = col;
      this.lifespan = 150;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.1;
      this.lifespan -= 2;
    }

    show() {
      p.noStroke();
      p.fill(this.col[0], this.col[1], this.col[2], this.lifespan);
      p.ellipse(this.x, this.y, 6);
    }
  }
};

new p5(fireworkVersion1Sketch);