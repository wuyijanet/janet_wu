var sketchEat = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(700, 500);
    canvas.parent('momoEatSketch');
    p.angleMode(p.DEGREES);
  };

  p.draw = function() {
    p.background(215, 232, 238);
    drawEatingScene(p, p.width / 2, p.height / 2 - 10, 1);
  };

  function drawEatingScene(p, x, y, s) {
    p.push();
    p.translate(x, y);
    p.scale(s);

    let cycle = p.frameCount % 220;
    let bob = p.sin(p.frameCount * 0.08) * 2;
    let pose = getEatingPose(p, cycle, bob);

    drawBackCatParts(p, bob);
    drawTableScene(p, cycle);
    drawFrontCatParts(p, cycle, bob, pose);
    drawFishPieceTop(p, cycle, bob, pose);

    p.pop();
  }

  function getEatingPose(p, cycle, bob) {
    let reachT = p.constrain(p.map(cycle, 0, 55, 0, 1), 0, 1);
    let cutT   = p.constrain(p.map(cycle, 55, 120, 0, 1), 0, 1);
    let liftT  = p.constrain(p.map(cycle, 120, 170, 0, 1), 0, 1);
    let eatT   = p.constrain(p.map(cycle, 170, 220, 0, 1), 0, 1);

    let leftHandX = -85;
    let leftHandY = 0 + bob;
    let rightHandX = 85;
    let rightHandY = 0 + bob;

    let targetLeftX = -28;
    let targetLeftY = 58 + bob;
    let targetRightX = 28;
    let targetRightY = 58 + bob;

    let mouthOpen = 0;

    if (cycle <= 55) {
      leftHandX = p.lerp(-85, targetLeftX, reachT);
      leftHandY = p.lerp(0 + bob, targetLeftY, reachT);

      rightHandX = p.lerp(85, targetRightX, reachT);
      rightHandY = p.lerp(0 + bob, targetRightY, reachT);
    } else if (cycle <= 120) {
      let chop = p.sin(cutT * 720) * 8;

      leftHandX = targetLeftX - 4;
      leftHandY = targetLeftY + chop * 0.15;

      rightHandX = targetRightX + 6;
      rightHandY = targetRightY - p.abs(chop) * 0.9;
    } else if (cycle <= 170) {
      leftHandX = p.lerp(targetLeftX - 4, -16, liftT);
      leftHandY = p.lerp(targetLeftY, -8 + bob, liftT);

      rightHandX = p.lerp(targetRightX + 6, 58, liftT);
      rightHandY = p.lerp(targetRightY, 16 + bob, liftT);
    } else {
      leftHandX = p.lerp(-16, -4, eatT);
      leftHandY = p.lerp(-8 + bob, -18 + bob, eatT);

      rightHandX = p.lerp(58, 70, eatT);
      rightHandY = p.lerp(16 + bob, 20 + bob, eatT);

      mouthOpen = p.abs(p.sin(eatT * 360)) * 24;
    }

    return {
      leftHandX,
      leftHandY,
      rightHandX,
      rightHandY,
      mouthOpen
    };
  }

  function drawBackCatParts(p, bob) {
    p.push();

    p.noStroke();
    p.fill(0, 20);
    p.ellipse(0, 145, 280, 40);

    p.stroke(214, 184, 145);
    p.strokeWeight(18);
    p.noFill();
    p.arc(120, 65 + bob, 95, 135, -50, 210);

    p.noStroke();
    p.fill(248, 239, 224);
    p.ellipse(0, 45 + bob, 130, 165);

    p.fill(255, 248, 238);
    p.ellipse(0, 68 + bob, 78, 108);

    p.stroke(214, 184, 145);
    p.strokeWeight(14);
    p.line(-28, 115 + bob, -40, 155 + bob);
    p.line(28, 115 + bob, 40, 155 + bob);

    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(-43, 160 + bob, 34, 20);
    p.ellipse(43, 160 + bob, 34, 20);

    p.pop();
  }

  function drawTableScene(p, cycle) {
    p.push();
    p.rectMode(p.CENTER);

    let fishScale = 1;
    if (cycle > 95) {
      let t = p.constrain(p.map(cycle, 95, 220, 0, 1), 0, 1);
      fishScale = p.lerp(1, 0.72, t);
    }

    p.noStroke();
    p.fill(201, 160, 116);
    p.rect(0, 78, 320, 34, 18);

    p.fill(176, 136, 95);
    p.rect(-115, 150, 20, 115, 10);
    p.rect(115, 150, 20, 115, 10);

    p.fill(250);
    p.ellipse(0, 62, 100, 34);
    p.fill(235);
    p.ellipse(0, 62, 72, 22);

    let fishW = 42 * fishScale;
    let fishH = 18;
    let fishX = -6;

    p.fill(126, 174, 198);
    p.ellipse(fishX, 62, fishW, fishH);

    if (fishScale > 0.52) {
      p.triangle(
        fishX + fishW * 0.45, 62,
        fishX + fishW * 0.85, 53,
        fishX + fishW * 0.85, 71
      );

      p.fill(35);
      p.ellipse(fishX - fishW * 0.28, 60, 3.5, 3.5);

      p.stroke(80, 110, 130);
      p.strokeWeight(1.5);
      p.noFill();
      p.arc(fishX - fishW * 0.38, 64, 6, 4, 200, 340);
    }

    if (cycle > 95) {
      p.noStroke();
      p.fill(235);
      p.rect(10, 61, 14, 10, 3);
    }

    p.noStroke();
    p.fill(125, 181, 112);
    p.ellipse(-28, 66, 10, 5);
    p.ellipse(-23, 60, 10, 5);

    p.pop();
  }

  function drawFishPieceTop(p, cycle, bob, pose) {
    if (cycle < 95) return;

    let x = 10;
    let y = 61;
    let s = 1;
    let alpha = 255;

    if (cycle <= 120) {
      let t = p.constrain(p.map(cycle, 95, 120, 0, 1), 0, 1);
      x = p.lerp(8, 18, t);
      y = p.lerp(61, 60, t);
    } else if (cycle <= 170) {
      let t = p.constrain(p.map(cycle, 120, 170, 0, 1), 0, 1);
      x = p.lerp(18, -10, t);
      y = p.lerp(60, -4, t);
    } else {
      let t = p.constrain(p.map(cycle, 170, 220, 0, 1), 0, 1);
      x = p.lerp(-10, 0, t);
      y = p.lerp(-4, -16, t);
      s = p.lerp(1, 0.15, t);
      alpha = p.lerp(255, 0, t);
    }

    p.push();
    p.translate(x, y);
    p.scale(s);
    p.noStroke();
    p.fill(255, 210, 170, alpha);
    p.rectMode(p.CENTER);
    p.rect(0, 0, 14, 10, 3);
    p.fill(255, 225, 190, alpha);
    p.rect(-2, -1, 8, 4, 2);
    p.pop();
  }

  function drawFrontCatParts(p, cycle, bob, pose) {
    p.push();

    p.noStroke();
    p.fill(248, 239, 224);
    p.ellipse(0, -35 + bob, 155, 132);

    p.fill(248, 239, 224);
    p.triangle(-48, -84 + bob, -18, -135 + bob, -2, -70 + bob);
    p.triangle(48, -84 + bob, 18, -135 + bob, 2, -70 + bob);

    p.fill(238, 205, 196);
    p.triangle(-38, -84 + bob, -18, -118 + bob, -8, -75 + bob);
    p.triangle(38, -84 + bob, 18, -118 + bob, 8, -75 + bob);

    p.fill(245, 210, 210, 150);
    p.ellipse(-44, -18 + bob, 24, 16);
    p.ellipse(44, -18 + bob, 24, 16);

    p.fill(255);
    p.ellipse(-28, -42 + bob, 32, 38);
    p.ellipse(28, -42 + bob, 32, 38);

    p.fill(35, 25, 25);
    p.ellipse(-25, -39 + bob, 14, 20);
    p.ellipse(25, -39 + bob, 14, 20);

    p.fill(255);
    p.ellipse(-21, -45 + bob, 6, 8);
    p.ellipse(29, -45 + bob, 6, 8);

    p.fill(214, 150, 145);
    p.triangle(0, -10 + bob, -10, 2 + bob, 10, 2 + bob);

    if (cycle < 170) {
      p.stroke(120, 90, 90);
      p.strokeWeight(2.8);
      p.noFill();
      p.arc(-7, 12 + bob, 14, 12, 0, 180);
      p.arc(7, 12 + bob, 14, 12, 0, 180);
    } else {
      p.noStroke();
      p.fill(120, 90, 90);
      p.ellipse(0, 20 + bob, 18, pose.mouthOpen);

      p.fill(255, 170, 180, 180);
      p.ellipse(0, 24 + bob, 10, pose.mouthOpen * 0.35);
    }

    p.stroke(160, 130, 120);
    p.strokeWeight(2);
    p.line(-56, -2 + bob, -22, 2 + bob);
    p.line(-56, 10 + bob, -22, 10 + bob);
    p.line(22, 2 + bob, 56, -2 + bob);
    p.line(22, 10 + bob, 56, 10 + bob);

    p.noStroke();
    p.fill(255, 236, 220);
    p.arc(0, 20 + bob, 64, 44, 0, 180);

    p.stroke(214, 184, 145);
    p.strokeWeight(14);
    p.line(-38, 38 + bob, pose.leftHandX, pose.leftHandY);
    p.line(38, 38 + bob, pose.rightHandX, pose.rightHandY);

    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(pose.leftHandX, pose.leftHandY, 20, 16);
    p.ellipse(pose.rightHandX, pose.rightHandY, 20, 16);

    p.stroke(230, 205, 170);
    p.strokeWeight(3);
    p.line(-10, -92 + bob, -2, -108 + bob);
    p.line(0, -94 + bob, 0, -110 + bob);
    p.line(10, -92 + bob, 2, -108 + bob);

    p.pop();
  }
};

new p5(sketchEat);