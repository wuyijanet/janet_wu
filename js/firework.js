console.log("ONLY current loaded");
const fireworkCurrentSketch = (p) => {
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

  let leftGesture = "open";
  let rightGesture = "open";

  p.setup = function () {
    const canvas = p.createCanvas(640, 480);
    canvas.parent("fireworkSketchCurrent");
  };

  p.draw = function () {
    p.background(0);

    if (!sharedVideo || !sharedVideo.elt) return;

    p.push();
    p.translate(p.width, 0);
    p.scale(-1, 1);
    p.image(sharedVideo.elt, 0, 0, p.width, p.height);
    p.pop();

    let hands = sharedHands || [];
    let rightHand = null;
    let leftHand = null;
    const fingerThreshold = 30;

    if (hands.length > 0) {
      for (let hand of hands) {
        if (hand.index_finger_tip && hand.middle_finger_tip) {
          const d = p.dist(
            hand.index_finger_tip.x,
            hand.index_finger_tip.y,
            hand.middle_finger_tip.x,
            hand.middle_finger_tip.y
          );

          if (hand.handedness === "Right") {
            rightGesture = d < fingerThreshold ? "freeze" : "open";
            rightHand = hand.index_finger_tip;
          } else if (hand.handedness === "Left") {
            leftGesture = d < fingerThreshold ? "freeze" : "open";
            leftHand = hand.index_finger_tip;
          }
        }
      }
    }

    if (leftHand && leftGesture === "open") {
      fireworks.push(new Firework(leftHand.x, leftHand.y, colorSet));
    }

    if (rightHand && rightGesture === "open") {
      fireworks.push(new Firework(rightHand.x, rightHand.y, altColorSet));
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

new p5(fireworkCurrentSketch);