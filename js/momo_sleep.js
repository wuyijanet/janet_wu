var sketchSleep = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(700, 500);
    canvas.parent('momoSleepSketch');
    p.angleMode(p.DEGREES);
  };

  p.draw = function() {
    p.background(215, 232, 238);
    drawSleepingScene(p, p.width / 2, p.height / 2 - 20, 1); // ⭐往上移
  };

  function drawSleepingScene(p, x, y, s) {
    p.push();
    p.translate(x, y);
    p.scale(s);

    drawBed(p);
    drawCatBody(p);
    drawBlanket(p);
    drawCatHead(p);
    drawZzz(p);

    p.pop();
  }

  function drawBed(p) {
    p.push();
    p.rectMode(p.CENTER);
    p.noStroke();

    p.fill(0, 18);
    p.ellipse(0, 145, 340, 42);

    p.fill(186, 144, 102);
    p.rect(0, 82, 330, 120, 26);

    p.rect(135, 82, 24, 120, 12);

    p.fill(243, 237, 227);
    p.rect(0, 80, 290, 90, 22);

    p.fill(252, 246, 238);
    p.rect(-105, 72, 72, 56, 18);

    p.fill(176, 136, 95);
    p.rect(-110, 155, 18, 46, 9);
    p.rect(110, 155, 18, 46, 9);

    p.pop();
  }

  function drawCatBody(p) {
    p.push();

    let bodyBreathe = p.sin(p.frameCount * 0.08) * 2;

    p.noStroke();
    p.fill(248, 239, 224);
    p.ellipse(45, 92 + bodyBreathe, 155, 88);

    p.stroke(214, 184, 145);
    p.strokeWeight(16);
    p.noFill();
    p.arc(120, 100 + bodyBreathe, 86, 110, -60, 180);

    p.pop();
  }

  function drawBlanket(p) {
    p.push();
    p.rectMode(p.CENTER);
    p.noStroke();

    let breathe = p.sin(p.frameCount * 0.08) * 4;

    p.fill(205, 221, 238);
    p.rect(20, 92 + breathe, 200, 82, 28);

    p.pop();
  }

  function drawCatHead(p) {
    p.push();

    let headBreathe = p.sin(p.frameCount * 0.08) * 1.5;

    p.noStroke();

    p.fill(248, 239, 224);
    p.ellipse(-52, 68 + headBreathe, 126, 104);

    p.triangle(-88, 36 + headBreathe, -66, -4 + headBreathe, -46, 40 + headBreathe);
    p.triangle(-18, 36 + headBreathe, -38, -4 + headBreathe, -58, 40 + headBreathe);

    p.fill(238, 205, 196);
    p.triangle(-80, 36 + headBreathe, -66, 12 + headBreathe, -52, 39 + headBreathe);
    p.triangle(-26, 36 + headBreathe, -38, 12 + headBreathe, -54, 39 + headBreathe);

    p.fill(245, 210, 210, 130);
    p.ellipse(-82, 82 + headBreathe, 24, 16);
    p.ellipse(-22, 82 + headBreathe, 24, 16);

    p.stroke(120, 90, 90);
    p.strokeWeight(3);
    p.noFill();
    p.arc(-68, 66 + headBreathe, 20, 12, 0, 180);
    p.arc(-36, 66 + headBreathe, 20, 12, 0, 180);

    p.noStroke();
    p.fill(214, 150, 145);
    p.triangle(-52, 80 + headBreathe, -60, 90 + headBreathe, -44, 90 + headBreathe);

    p.stroke(120, 90, 90);
    p.strokeWeight(2.8);
    p.noFill();
    p.arc(-58, 101 + headBreathe, 12, 10, 0, 180);
    p.arc(-46, 101 + headBreathe, 12, 10, 0, 180);

    p.stroke(160, 130, 120);
    p.strokeWeight(2);
    p.line(-98, 88 + headBreathe, -68, 90 + headBreathe);
    p.line(-98, 98 + headBreathe, -68, 98 + headBreathe);
    p.line(-36, 90 + headBreathe, -6, 88 + headBreathe);
    p.line(-36, 98 + headBreathe, -6, 98 + headBreathe);

    p.stroke(214, 184, 145);
    p.strokeWeight(12);
    p.line(-8, 93 + headBreathe, 18, 118 + headBreathe);

    p.noStroke();
    p.fill(214, 184, 145);
    p.ellipse(22, 122 + headBreathe, 28, 18);

    p.pop();
  }

  function drawZzz(p) {
    p.push();
    p.noStroke();
    p.fill(150, 140, 180);

    let float1 = p.sin(p.frameCount * 0.06) * 4;
    let float2 = p.sin(p.frameCount * 0.06 + 20) * 4;
    let float3 = p.sin(p.frameCount * 0.06 + 40) * 4;

    let rise = (p.frameCount * 0.3) % 18;

    p.textSize(28);
    p.text("Z", 40 + float1 * 0.3, -10 - rise);

    p.textSize(22);
    p.text("Z", 70 + float2 * 0.3, -30 - rise);

    p.textSize(16);
    p.text("Z", 92 + float3 * 0.3, -44 - rise);

    p.pop();
  }
};

new p5(sketchSleep);