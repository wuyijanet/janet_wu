var sketchPlay = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(700, 500);
    canvas.parent('momoPlaySketch');
    p.angleMode(p.DEGREES);
  };

  p.draw = function() {
    p.background(215, 232, 238);
    drawPlayScene(p, p.width / 2, p.height / 2 -20, 1);
  };

  function drawPlayScene(p, x, y, s) {
    p.push();
    p.translate(x, y);
    p.scale(s);

    let bounce = p.sin(p.frameCount * 8) * 8;
    let legSwing = p.sin(p.frameCount * 8) * 18;
    let armSwing = p.sin(p.frameCount * 8) * 16;
    let kiteX = 180 + p.cos(p.frameCount * 2) * 18;
    let kiteY = -150 + p.sin(p.frameCount * 3) * 24;

    drawSky(p);
    drawGrass(p);
    drawClouds(p);
    drawKite(p, kiteX, kiteY);
    drawString(p, kiteX, kiteY, armSwing);

    p.push();
    p.translate(0, bounce);

    drawCatBody(p, legSwing);
    drawCatHead(p);
    drawArms(p, armSwing);
    drawTail(p);

    p.pop();
    p.pop();
  }

  function drawSky(p) {
    p.push();
    p.noStroke();
    p.fill(255, 255, 255, 60);
    p.ellipse(-180, -170, 180, 80);
    p.ellipse(110, -200, 220, 90);
    p.pop();
  }

  function drawGrass(p) {
    p.push();
    p.noStroke();

    p.fill(137, 188, 126);
    p.ellipse(0, 175, 540, 125);

    p.fill(122, 174, 112);
    p.ellipse(-120, 188, 230, 72);
    p.ellipse(120, 188, 230, 72);

    p.fill(255, 232, 170);
    p.circle(-150, 178, 8);
    p.circle(-138, 170, 8);
    p.circle(-126, 178, 8);
    p.circle(-138, 186, 8);
    p.fill(255, 205, 120);
    p.circle(-138, 178, 8);

    p.fill(255, 210, 220);
    p.circle(150, 184, 8);
    p.circle(162, 176, 8);
    p.circle(174, 184, 8);
    p.circle(162, 192, 8);
    p.fill(255, 190, 200);
    p.circle(162, 184, 8);

    p.pop();
  }

  function drawClouds(p) {
    p.push();
    p.noStroke();
    p.fill(255, 255, 255, 220);

    p.ellipse(-160, -120, 46, 34);
    p.ellipse(-130, -125, 56, 40);
    p.ellipse(-100, -120, 46, 34);

    p.ellipse(130, -150, 44, 32);
    p.ellipse(158, -155, 54, 38);
    p.ellipse(188, -150, 44, 32);

    p.pop();
  }

  function drawKite(p, kiteX, kiteY) {
    p.push();

    p.stroke(170, 120, 120);
    p.strokeWeight(2);
    p.line(kiteX, kiteY + 28, kiteX + 14, kiteY + 60);
    p.line(kiteX + 14, kiteY + 60, kiteX + 28, kiteY + 92);
    p.line(kiteX + 28, kiteY + 92, kiteX + 42, kiteY + 120);

    p.noStroke();
    p.fill(255, 190, 200);
    drawBow(p, kiteX + 12, kiteY + 56, 0.8);
    drawBow(p, kiteX + 26, kiteY + 88, 0.7);
    drawBow(p, kiteX + 40, kiteY + 116, 0.6);

    p.fill(255, 164, 164);
    p.quad(kiteX, kiteY - 28, kiteX + 34, kiteY, kiteX, kiteY + 28, kiteX - 34, kiteY);

    p.fill(255, 224, 130);
    p.triangle(kiteX, kiteY - 28, kiteX + 34, kiteY, kiteX, kiteY);
    p.fill(132, 197, 228);
    p.triangle(kiteX, kiteY, kiteX - 34, kiteY, kiteX, kiteY + 28);

    p.stroke(120, 120, 120);
    p.strokeWeight(2);
    p.line(kiteX, kiteY - 28, kiteX, kiteY + 28);
    p.line(kiteX - 34, kiteY, kiteX + 34, kiteY);

    p.pop();
  }

  function drawBow(p, x, y, s) {
    p.push();
    p.translate(x, y);
    p.scale(s);
    p.noStroke();
    p.triangle(-6, 0, 0, -4, 0, 4);
    p.triangle(6, 0, 0, -4, 0, 4);
    p.circle(0, 0, 4);
    p.pop();
  }

  function drawCatBody(p, legSwing) {
    p.push();
    p.noStroke();

    p.fill(248, 239, 224);
    p.ellipse(-20, 80, 125, 145);

    p.fill(255, 248, 238);
    p.ellipse(-20, 98, 68, 88);

    p.stroke(214, 184, 145);
    p.strokeWeight(14);
    p.line(-42, 138, -52 + legSwing, 172);
    p.line(2, 138, 16 - legSwing, 172);

    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(-55 + legSwing, 176, 30, 18);
    p.ellipse(20 - legSwing, 176, 30, 18);

    p.pop();
  }

  function drawCatHead(p) {
    p.push();
    p.noStroke();

    p.fill(248, 239, 224);
    p.ellipse(-20, -5, 138, 118);

    p.triangle(-62, -34, -38, -84, -14, -34);
    p.triangle(22, -34, -2, -84, -26, -34);

    p.fill(238, 205, 196);
    p.triangle(-54, -34, -38, -58, -22, -34);
    p.triangle(14, -34, -2, -58, -18, -34);

    p.fill(245, 210, 210, 130);
    p.ellipse(-55, 12, 24, 16);
    p.ellipse(15, 12, 24, 16);

    p.fill(255);
    p.ellipse(-40, -6, 28, 34);
    p.ellipse(0, -6, 28, 34);

    p.fill(35, 25, 25);
    p.ellipse(-37, -4, 12, 18);
    p.ellipse(3, -4, 12, 18);

    p.fill(255);
    p.ellipse(-34, -10, 5, 7);
    p.ellipse(6, -10, 5, 7);

    p.fill(214, 150, 145);
    p.triangle(-18, 12, -27, 24, -9, 24);

    p.stroke(120, 90, 90);
    p.strokeWeight(2.8);
    p.noFill();
    p.arc(-23, 34, 12, 10, 0, 180);
    p.arc(-13, 34, 12, 10, 0, 180);

    p.stroke(160, 130, 120);
    p.strokeWeight(2);
    p.line(-82, 20, -44, 22);
    p.line(-82, 32, -44, 32);
    p.line(8, 22, 46, 20);
    p.line(8, 32, 46, 32);

    p.pop();
  }

  function drawArms(p, armSwing) {
    p.push();

    p.stroke(214, 184, 145);
    p.strokeWeight(14);

    p.line(-58, 62, -90 - armSwing * 0.5, 104);
    p.line(18, 56, 82 + armSwing, 18 - armSwing * 0.4);

    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(-93 - armSwing * 0.5, 106, 20, 16);
    p.ellipse(85 + armSwing, 16 - armSwing * 0.4, 20, 16);

    p.stroke(150, 110, 90);
    p.strokeWeight(4);
    p.line(82 + armSwing, 18 - armSwing * 0.4, 98 + armSwing, 30 - armSwing * 0.4);

    p.pop();
  }

  function drawTail(p) {
    p.push();
    p.stroke(214, 184, 145);
    p.strokeWeight(16);
    p.noFill();
    p.arc(72, 108, 84, 112, -70, 170);
    p.pop();
  }

  function drawString(p, kiteX, kiteY, armSwing) {
    p.push();

    let handX = 98 + armSwing;
    let handY = 30 - armSwing * 0.4;

    p.stroke(150, 150, 150);
    p.strokeWeight(2);
    p.noFill();
    p.bezier(
      handX, handY,
      120, -5,
      145, -80,
      kiteX, kiteY + 2
    );

    p.pop();
  }
};

new p5(sketchPlay);