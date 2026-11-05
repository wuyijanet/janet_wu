var sketchWork = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(700, 500);
    canvas.parent('momoWorkSketch');
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
  };

  p.draw = function() {
    p.background(210, 232, 242);
    drawWorkScene(p, p.width / 2, p.height / 2 - 20, 1);
  };

  function drawWorkScene(p, x, y, s) {
    p.push();
    p.translate(x, y);
    p.scale(s);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);

    p.noStroke();
    p.fill(0, 15);
    p.ellipse(10, 175, 420, 45);

    // chair
    p.fill(166, 188, 204);
    p.rect(-90, 55, 100, 140, 30);
    p.fill(140, 162, 178);
    p.rect(-95, 148, 16, 62, 10);
    p.fill(184, 206, 220);
    p.rect(-95, 112, 115, 32, 18);
    p.fill(160, 184, 198);
    p.ellipse(-95, 178, 72, 20);

    // body
    p.noStroke();
    p.fill(248, 239, 224);
    p.ellipse(-20, 120, 140, 166);
    p.fill(255, 248, 238);
    p.ellipse(-20, 125, 82, 108);

    // legs
    p.stroke(214, 184, 145);
    p.strokeWeight(14);
    p.line(-42, 185, -52, 230);
    p.line(6, 185, 18, 230);
    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(-55, 235, 34, 20);
    p.ellipse(21, 235, 34, 20);

    // desk
    p.fill(176, 136, 95);
    p.rect(-130, 170, 18, 130, 10);
    p.rect(130, 170, 18, 130, 10);
    p.fill(194, 153, 110);
    p.rect(-5, 118, 355, 30, 15);

    // papers / money
    p.fill(236, 228, 210);
    p.rect(-92, 106, 46, 26, 4);
    p.fill(220, 208, 188);
    p.rect(-92, 106, 4, 22, 2);

    p.fill(214, 191, 166);
    p.rect(-148, 96, 24, 30, 6);
    p.fill(255, 215, 100);
    p.circle(-148, 90, 10);
    p.fill(255, 200, 80);
    p.textSize(12);
    p.text("$", -152, 92);

    // head
    p.noStroke();
    p.fill(248, 239, 224);
    p.ellipse(-20, 5, 145, 125);
    p.triangle(-62, -28, -38, -82, -15, -28);
    p.triangle(22, -28, -2, -82, -25, -28);

    // inner ears
    p.fill(238, 205, 196);
    p.triangle(-54, -28, -38, -56, -22, -28);
    p.triangle(14, -28, -2, -56, -18, -28);

    // cheeks
    p.fill(245, 210, 210, 130);
    p.ellipse(-55, 20, 24, 16);
    p.ellipse(15, 20, 24, 16);

    // eyes
    p.fill(255);
    p.ellipse(-40, 0, 28, 35);
    p.ellipse(0, 0, 28, 35);

    p.fill(35, 25, 25);
    let leftPupilX = p.constrain(p.mouseX - (x - 40), -4, 4);
    let rightPupilX = p.constrain(p.mouseX - (x + 20), -4, 4);
    let pupilY = p.constrain(p.mouseY - (y - 5), -6, 4);
    p.ellipse(-37 + leftPupilX * 0.5, 2 + pupilY * 0.3, 13, 20);
    p.ellipse(3 + rightPupilX * 0.5, 2 + pupilY * 0.3, 13, 20);

    p.fill(255);
    p.ellipse(-34 + leftPupilX * 0.3, -4 + pupilY * 0.2, 5, 7);
    p.ellipse(6 + rightPupilX * 0.3, -4 + pupilY * 0.2, 5, 7);

    // nose + mouth
    p.fill(214, 150, 145);
    p.triangle(-18, 18, -28, 31, -8, 31);
    p.stroke(120, 90, 90);
    p.strokeWeight(2.8);
    p.noFill();
    p.arc(-23, 40, 12, 10, 0, 180);
    p.arc(-13, 40, 12, 10, 0, 180);

    // whiskers
    p.stroke(160, 130, 120);
    p.strokeWeight(2);
    p.line(-82, 28, -44, 30);
    p.line(-82, 40, -44, 40);
    p.line(8, 30, 46, 28);
    p.line(8, 40, 46, 40);

    // laptop
    p.noStroke();
    p.fill(126, 147, 163);
    p.rect(82, 46, 152, 92, 14);
    p.fill(160, 175, 185);
    p.quad(-80, 112, 80, 112, 100, 130, -60, 130);
    p.fill(118, 136, 150);
    p.rect(82, 104, 14, 26, 6);
    p.fill(145, 160, 172);
    p.rect(82, 116, 58, 10, 6);

    p.fill(50, 80, 100);
    p.textSize(20);
    p.text("$", 82, 52);

    // typing hands animation
    let typeMove = p.sin(p.frameCount * 10) * 5;
    p.stroke(214, 184, 145);
    p.strokeWeight(14);
    p.line(-55, 88, -20, 114 + typeMove);
    p.line(20, 95, 50, 114 - typeMove);
    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(-20, 114 + typeMove, 24, 17);
    p.ellipse(50, 114 - typeMove, 24, 17);

    p.pop();
  }
};

new p5(sketchWork);