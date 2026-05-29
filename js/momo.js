// ================= MOMO - COMPLETE VIRTUAL PET =================
    let stats = {
        hunger: 10,
        energy: 10,
        work: 10,
        fun: 10
    };
    
    let decayIntervals = {};
    let activeAction = "idle";
    let actionTimer = 0;
    let warningMessage = "";
    let warningTimer = 0;
    
    // Background elements - enhanced
    let grassBlades = [];
    let flowers = [];
    let clovers = [];
    let trees = [];
    let swayOffset = 0;
    let clouds = [];
    let particles = [];
    
    function updateStatsUI() {
        document.getElementById('hungerBar').style.width = (stats.hunger / 10 * 100) + '%';
        document.getElementById('energyBar').style.width = (stats.energy / 10 * 100) + '%';
        document.getElementById('workBar').style.width = (stats.work / 10 * 100) + '%';
        document.getElementById('funBar').style.width = (stats.fun / 10 * 100) + '%';
        document.getElementById('hungerVal').innerText = Math.floor(stats.hunger) + '/10';
        document.getElementById('energyVal').innerText = Math.floor(stats.energy) + '/10';
        document.getElementById('workVal').innerText = Math.floor(stats.work) + '/10';
        document.getElementById('funVal').innerText = Math.floor(stats.fun) + '/10';
        
        if (activeAction === "idle") {
            checkZeroStats();
        }
    }
    
    function checkZeroStats() {
        let zeroStat = null;
        if (stats.hunger <= 0) zeroStat = "hunger";
        else if (stats.energy <= 0) zeroStat = "energy";
        else if (stats.work <= 0) zeroStat = "work";
        else if (stats.fun <= 0) zeroStat = "fun";
        
        if (zeroStat && warningTimer <= 0) {
            if (zeroStat === "hunger") warningMessage = "I'm starving! Please feed me!";
            else if (zeroStat === "energy") warningMessage = "So tired... I need sleep!";
            else if (zeroStat === "work") warningMessage = "I need to work and earn money!";
            else if (zeroStat === "fun") warningMessage = "Bored! Let's play together!";
            warningTimer = 180;
            addEffectBurst(300, 170, false);
        }
    }
    
    function addParticle(x, y, color) {
        particles.push({
            x: x, y: y, vx: (Math.random() - 0.5) * 2, vy: Math.random() * -2 - 1,
            life: 1, size: Math.random() * 4 + 2, color: color
        });
    }
    
    function addEffectBurst(x, y, isHappy) {
        let col = isHappy ? [255, 200, 100] : [200, 100, 90];
        for (let i = 0; i < 12; i++) addParticle(x + (Math.random() - 0.5) * 50, y + (Math.random() - 0.5) * 40, col);
    }
    
    function performAction(action) {
        let restored = false;
        switch(action) {
            case "eat":
                if (stats.hunger < 10) {
                    stats.hunger = Math.min(10, stats.hunger + 4);
                    restored = true;
                }
                break;
            case "sleep":
                if (stats.energy < 10) {
                    stats.energy = Math.min(10, stats.energy + 4);
                    restored = true;
                }
                break;
            case "work":
                if (stats.work < 10) {
                    stats.work = Math.min(10, stats.work + 4);
                    restored = true;
                }
                break;
            case "play":
                if (stats.fun < 10) {
                    stats.fun = Math.min(10, stats.fun + 4);
                    restored = true;
                }
                break;
        }
        updateStatsUI();
        activeAction = action;
        actionTimer = 420;
        
        if (restored) {
            addEffectBurst(300, 170, true);
            warningMessage = "";
            warningTimer = 0;
        } else {
            addEffectBurst(300, 190, false);
        }
    }
    
    function startDecay() {
        decayIntervals.hunger = setInterval(() => {
            stats.hunger = Math.max(0, stats.hunger - 1);
            updateStatsUI();
        }, 8000);
        
        decayIntervals.energy = setInterval(() => {
            stats.energy = Math.max(0, stats.energy - 1);
            updateStatsUI();
        }, 12000);
        
        decayIntervals.work = setInterval(() => {
            stats.work = Math.max(0, stats.work - 1);
            updateStatsUI();
        }, 10000);
        
        decayIntervals.fun = setInterval(() => {
            stats.fun = Math.max(0, stats.fun - 1);
            updateStatsUI();
        }, 14000);
    }
    
    // ============= ENHANCED BACKGROUND FUNCTIONS =============
    function initBackground(p) {
        // Detailed grass blades with varying heights and colors
        for (let i = 0; i < 120; i++) {
            grassBlades.push({
                x: p.random(0, 600),
                y: p.random(210, 235),
                height: p.random(10, 32),
                thickness: p.random(1, 3),
                phase: p.random(p.TWO_PI),
                color: [p.random(80, 110), p.random(100, 130), p.random(70, 85)]
            });
        }
        
        // Wildflowers with more variety
        let flowerColors = [
            [255, 200, 220], [255, 220, 180], [230, 200, 255], 
            [255, 180, 160], [210, 230, 180], [255, 240, 150]
        ];
        let centerColors = [[255, 200, 80], [255, 160, 60]];
        
        for (let i = 0; i < 35; i++) {
            flowers.push({
                x: p.random(8, 592),
                y: p.random(212, 248),
                size: p.random(5, 11),
                color: flowerColors[Math.floor(p.random(flowerColors.length))],
                centerColor: centerColors[Math.floor(p.random(centerColors.length))]
            });
        }
        
        // Clovers for extra detail
        for (let i = 0; i < 45; i++) {
            clovers.push({
                x: p.random(5, 595),
                y: p.random(215, 250),
                size: p.random(3, 7)
            });
        }
        
        // Trees with more organic shapes
        for (let i = 0; i < 4; i++) {
            trees.push({ x: p.random(15, 80), y: 150, size: p.random(45, 70) });
            trees.push({ x: p.random(520, 585), y: 150, size: p.random(45, 70) });
        }
        
        // Moving clouds with different speeds
        for (let i = 0; i < 5; i++) {
            clouds.push({
                x: p.random(-100, 700),
                y: p.random(30, 90),
                size: p.random(45, 85),
                speed: p.random(0.2, 0.6)
            });
        }
    }
    
    function updateClouds(p) {
        for (let cloud of clouds) {
            cloud.x += cloud.speed;
            if (cloud.x > 700) {
                cloud.x = -120;
                cloud.y = p.random(30, 90);
            }
        }
    }
    
    function drawGrass(p) {
        p.strokeWeight(1.5);
        for (let g of grassBlades) {
            let sway = p.sin(swayOffset * 1.5 + g.phase) * 3;
            p.stroke(g.color[0], g.color[1], g.color[2]);
            p.line(g.x, g.y, g.x + sway, g.y - g.height);
            p.line(g.x, g.y, g.x - sway * 0.7, g.y - g.height * 0.7);
            // Add little blades
            p.line(g.x - 2, g.y - 2, g.x - 2 + sway * 0.5, g.y - g.height * 0.5);
            p.line(g.x + 2, g.y - 2, g.x + 2 - sway * 0.5, g.y - g.height * 0.5);
        }
    }
    
    function drawFlowers(p) {
        for (let f of flowers) {
            // Stem
            p.stroke(100, 140, 80);
            p.strokeWeight(1);
            p.line(f.x, f.y, f.x, f.y - f.size * 0.8);
            // Flower petals
            p.noStroke();
            p.fill(f.color[0], f.color[1], f.color[2]);
            p.ellipse(f.x - 2, f.y - f.size * 0.6, f.size * 0.6, f.size * 0.5);
            p.ellipse(f.x + 2, f.y - f.size * 0.6, f.size * 0.6, f.size * 0.5);
            p.ellipse(f.x, f.y - f.size * 0.8, f.size * 0.6, f.size * 0.5);
            p.ellipse(f.x, f.y - f.size * 0.4, f.size * 0.6, f.size * 0.5);
            // Center
            p.fill(f.centerColor[0], f.centerColor[1], f.centerColor[2]);
            p.ellipse(f.x, f.y - f.size * 0.6, f.size * 0.4, f.size * 0.4);
        }
    }
    
    function drawClovers(p) {
        p.fill(90, 130, 70);
        p.noStroke();
        for (let c of clovers) {
            p.ellipse(c.x, c.y, c.size, c.size);
            p.ellipse(c.x - c.size * 0.6, c.y - c.size * 0.3, c.size * 0.8, c.size * 0.8);
            p.ellipse(c.x + c.size * 0.6, c.y - c.size * 0.3, c.size * 0.8, c.size * 0.8);
            p.ellipse(c.x, c.y - c.size * 0.7, c.size * 0.8, c.size * 0.8);
        }
    }
    
    function drawTrees(p) {
        for (let t of trees) {
            p.fill(110, 75, 50);
            p.noStroke();
            p.rect(t.x - 6, t.y, 12, 55);
            // Leafy canopy
            p.fill(65, 95, 50);
            p.ellipse(t.x + 2, t.y - 8, t.size, t.size * 0.9);
            p.fill(55, 85, 45);
            p.ellipse(t.x - 3, t.y - 15, t.size * 0.7, t.size * 0.7);
            p.ellipse(t.x + 7, t.y - 12, t.size * 0.65, t.size * 0.65);
            // Add some highlights
            p.fill(80, 115, 65, 150);
            p.ellipse(t.x - 1, t.y - 12, t.size * 0.3, t.size * 0.3);
        }
    }
    
    function drawClouds(p) {
        p.fill(255, 255, 250, 220);
        p.noStroke();
        for (let cloud of clouds) {
            p.ellipse(cloud.x, cloud.y, cloud.size, cloud.size * 0.7);
            p.ellipse(cloud.x - cloud.size * 0.5, cloud.y + cloud.size * 0.1, cloud.size * 0.7, cloud.size * 0.55);
            p.ellipse(cloud.x + cloud.size * 0.5, cloud.y + cloud.size * 0.05, cloud.size * 0.7, cloud.size * 0.55);
            p.ellipse(cloud.x + cloud.size * 0.2, cloud.y - cloud.size * 0.25, cloud.size * 0.55, cloud.size * 0.5);
            p.ellipse(cloud.x - cloud.size * 0.3, cloud.y - cloud.size * 0.2, cloud.size * 0.55, cloud.size * 0.5);
        }
    }
    
    function drawBackground(p) {
        // Sky gradient
        for (let i = 0; i <= p.height; i++) {
            let inter = p.map(i, 0, p.height, 0, 1);
            let c = p.lerpColor(p.color(200, 225, 245), p.color(160, 190, 170), inter);
            p.stroke(c);
            p.line(0, i, p.width, i);
        }
        p.noStroke();
        
        // Ground gradient
        for (let i = 205; i <= p.height; i++) {
            let inter = p.map(i, 210, p.height, 0, 1);
            let c = p.lerpColor(p.color(115, 155, 95), p.color(80, 110, 65), inter);
            p.stroke(c);
            p.line(0, i, p.width, i);
        }
        
        // Draw clouds (moving)
        drawClouds(p);
        
        // Draw trees
        drawTrees(p);
        
        // Draw grass (with sway animation)
        drawGrass(p);
        
        // Draw flowers
        drawFlowers(p);
        
        // Draw clovers
        drawClovers(p);
        
        // Update cloud positions
        updateClouds(p);
    }
    
    // ============= EAT SCENE - Complete Animation =============
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
        
        let leftHandX = -85, leftHandY = 0 + bob;
        let rightHandX = 85, rightHandY = 0 + bob;
        let targetLeftX = -28, targetLeftY = 58 + bob;
        let targetRightX = 28, targetRightY = 58 + bob;
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
        return { leftHandX, leftHandY, rightHandX, rightHandY, mouthOpen };
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
        let fishW = 42 * fishScale, fishH = 18, fishX = -6;
        p.fill(126, 174, 198);
        p.ellipse(fishX, 62, fishW, fishH);
        if (fishScale > 0.52) {
            p.triangle(fishX + fishW * 0.45, 62, fishX + fishW * 0.85, 53, fishX + fishW * 0.85, 71);
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
        let x = 10, y = 61, s = 1, alpha = 255;
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
    
    // ============= SLEEP SCENE =============
    function drawSleepScene(p, x, y, s) {
        p.push();
        p.translate(x, y);
        p.scale(s);
        p.rectMode(p.CENTER);
        p.angleMode(p.DEGREES);
        
        let breathe = p.sin(p.frameCount * 0.08) * 2;
        
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
        
        p.noStroke();
        p.fill(248, 239, 224);
        p.ellipse(45, 92 + breathe, 155, 88);
        p.stroke(214, 184, 145);
        p.strokeWeight(16);
        p.noFill();
        p.arc(120, 100 + breathe, 86, 110, -60, 180);
        p.noStroke();
        p.fill(205, 221, 238);
        p.rect(20, 92 + breathe, 200, 82, 28);
        
        p.fill(248, 239, 224);
        p.ellipse(-52, 68 + breathe * 0.8, 126, 104);
        p.triangle(-88, 36 + breathe * 0.8, -66, -4 + breathe * 0.8, -46, 40 + breathe * 0.8);
        p.triangle(-18, 36 + breathe * 0.8, -38, -4 + breathe * 0.8, -58, 40 + breathe * 0.8);
        p.fill(238, 205, 196);
        p.triangle(-80, 36 + breathe * 0.8, -66, 12 + breathe * 0.8, -52, 39 + breathe * 0.8);
        p.triangle(-26, 36 + breathe * 0.8, -38, 12 + breathe * 0.8, -54, 39 + breathe * 0.8);
        p.fill(245, 210, 210, 130);
        p.ellipse(-82, 82 + breathe * 0.8, 24, 16);
        p.ellipse(-22, 82 + breathe * 0.8, 24, 16);
        
        p.stroke(120, 90, 90);
        p.strokeWeight(3);
        p.noFill();
        p.arc(-68, 66 + breathe * 0.8, 20, 12, 0, 180);
        p.arc(-36, 66 + breathe * 0.8, 20, 12, 0, 180);
        
        p.noStroke();
        p.fill(214, 150, 145);
        p.triangle(-52, 80 + breathe * 0.8, -60, 90 + breathe * 0.8, -44, 90 + breathe * 0.8);
        p.stroke(120, 90, 90);
        p.strokeWeight(2.8);
        p.noFill();
        p.arc(-58, 101 + breathe * 0.8, 12, 10, 0, 180);
        p.arc(-46, 101 + breathe * 0.8, 12, 10, 0, 180);
        
        p.stroke(160, 130, 120);
        p.strokeWeight(2);
        p.line(-98, 88 + breathe * 0.8, -68, 90 + breathe * 0.8);
        p.line(-98, 98 + breathe * 0.8, -68, 98 + breathe * 0.8);
        p.line(-36, 90 + breathe * 0.8, -6, 88 + breathe * 0.8);
        p.line(-36, 98 + breathe * 0.8, -6, 98 + breathe * 0.8);
        
        p.stroke(214, 184, 145);
        p.strokeWeight(12);
        p.line(-8, 93 + breathe * 0.8, 18, 118 + breathe * 0.8);
        p.noStroke();
        p.fill(214, 184, 145);
        p.ellipse(22, 122 + breathe * 0.8, 28, 18);
        
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
    
    // ============= WORK SCENE =============
    function drawWorkScene(p, x, y, s) {
        p.push();
        p.translate(x, y);
        p.scale(s);
        p.angleMode(p.DEGREES);
        p.rectMode(p.CENTER);
        
        p.noStroke();
        p.fill(0, 15);
        p.ellipse(10, 175, 420, 45);
        p.fill(166, 188, 204);
        p.rect(-90, 55, 100, 140, 30);
        p.fill(140, 162, 178);
        p.rect(-95, 148, 16, 62, 10);
        p.fill(184, 206, 220);
        p.rect(-95, 112, 115, 32, 18);
        p.fill(160, 184, 198);
        p.ellipse(-95, 178, 72, 20);
        
        p.noStroke();
        p.fill(248, 239, 224);
        p.ellipse(-20, 120, 140, 166);
        p.fill(255, 248, 238);
        p.ellipse(-20, 125, 82, 108);
        
        p.stroke(214, 184, 145);
        p.strokeWeight(14);
        p.line(-42, 185, -52, 230);
        p.line(6, 185, 18, 230);
        p.noStroke();
        p.fill(214, 184, 145);
        p.ellipse(-55, 235, 34, 20);
        p.ellipse(21, 235, 34, 20);
        
        p.fill(176, 136, 95);
        p.rect(-130, 170, 18, 130, 10);
        p.rect(130, 170, 18, 130, 10);
        p.fill(194, 153, 110);
        p.rect(-5, 118, 355, 30, 15);
        
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
        
        p.noStroke();
        p.fill(248, 239, 224);
        p.ellipse(-20, 5, 145, 125);
        p.triangle(-62, -28, -38, -82, -15, -28);
        p.triangle(22, -28, -2, -82, -25, -28);
        p.fill(238, 205, 196);
        p.triangle(-54, -28, -38, -56, -22, -28);
        p.triangle(14, -28, -2, -56, -18, -28);
        p.fill(245, 210, 210, 130);
        p.ellipse(-55, 20, 24, 16);
        p.ellipse(15, 20, 24, 16);
        
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
        
        p.fill(214, 150, 145);
        p.triangle(-18, 18, -28, 31, -8, 31);
        p.stroke(120, 90, 90);
        p.strokeWeight(2.8);
        p.noFill();
        p.arc(-23, 40, 12, 10, 0, 180);
        p.arc(-13, 40, 12, 10, 0, 180);
        
        p.stroke(160, 130, 120);
        p.strokeWeight(2);
        p.line(-82, 28, -44, 30);
        p.line(-82, 40, -44, 40);
        p.line(8, 30, 46, 28);
        p.line(8, 40, 46, 40);
        
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
    
    // ============= PLAY SCENE =============
    function drawPlayScene(p, x, y, s) {
        p.push();
        p.translate(x, y);
        p.scale(s);
        p.angleMode(p.DEGREES);
        
        let bounce = p.sin(p.frameCount * 8) * 8;
        let legSwing = p.sin(p.frameCount * 8) * 18;
        let armSwing = p.sin(p.frameCount * 8) * 16;
        let kiteX = 180 + p.cos(p.frameCount * 2) * 18;
        let kiteY = -150 + p.sin(p.frameCount * 3) * 24;
        
        p.push();
        p.stroke(170, 120, 120);
        p.strokeWeight(2);
        p.line(kiteX, kiteY + 28, kiteX + 14, kiteY + 60);
        p.line(kiteX + 14, kiteY + 60, kiteX + 28, kiteY + 92);
        p.line(kiteX + 28, kiteY + 92, kiteX + 42, kiteY + 120);
        p.noStroke();
        p.fill(255, 164, 164);
        p.quad(kiteX, kiteY - 28, kiteX + 34, kiteY, kiteX, kiteY + 28, kiteX - 34, kiteY);
        p.fill(255, 224, 130);
        p.triangle(kiteX, kiteY - 28, kiteX + 34, kiteY, kiteX, kiteY);
        p.fill(132, 197, 228);
        p.triangle(kiteX, kiteY, kiteX - 34, kiteY, kiteX, kiteY + 28);
        p.pop();
        
        let handX = 98 + armSwing;
        let handY = 30 - armSwing * 0.4;
        p.stroke(150, 150, 150);
        p.strokeWeight(2);
        p.noFill();
        p.bezier(handX, handY, 120, -5, 145, -80, kiteX, kiteY + 2);
        
        p.push();
        p.translate(0, bounce);
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
        p.stroke(214, 184, 145);
        p.strokeWeight(16);
        p.noFill();
        p.arc(72, 108, 84, 112, -70, 170);
        p.pop();
        p.pop();
    }
    
    // ============= IDLE CAT =============
    function drawStandardCat(p, x, y, s) {
        p.push();
        p.translate(x, y);
        p.scale(s);
        p.angleMode(p.DEGREES);
        
        p.noStroke();
        p.fill(248, 239, 224);
        p.ellipse(0, 55, 120, 135);
        p.fill(255, 248, 238);
        p.ellipse(0, 75, 72, 85);
        p.fill(248, 239, 224);
        p.ellipse(0, -40, 145, 125);
        p.triangle(-48, -82, -18, -135, -2, -72);
        p.triangle(48, -82, 18, -135, 2, -72);
        p.fill(238, 205, 196);
        p.triangle(-39, -84, -18, -118, -8, -77);
        p.triangle(39, -84, 18, -118, 8, -77);
        p.fill(245, 210, 210, 150);
        p.ellipse(-42, -28, 22, 14);
        p.ellipse(42, -28, 22, 14);
        p.fill(255);
        p.ellipse(-26, -46, 28, 34);
        p.ellipse(26, -46, 28, 34);
        p.fill(35, 25, 25);
        let leftPupilX = p.constrain(p.mouseX - (x - 26), -4, 4);
        let rightPupilX = p.constrain(p.mouseX - (x + 26), -4, 4);
        let pupilY = p.constrain(p.mouseY - (y - 43), -6, 4);
        p.ellipse(-26 + leftPupilX * 0.5, -43 + pupilY * 0.3, 12, 18);
        p.ellipse(26 + rightPupilX * 0.5, -43 + pupilY * 0.3, 12, 18);
        p.fill(255);
        p.ellipse(-21 + leftPupilX * 0.3, -47 + pupilY * 0.2, 4, 6);
        p.ellipse(31 + rightPupilX * 0.3, -47 + pupilY * 0.2, 4, 6);
        p.fill(214, 150, 145);
        p.triangle(0, -24, -8, -14, 8, -14);
        p.stroke(120, 90, 90);
        p.strokeWeight(2.5);
        p.noFill();
        p.arc(-7, -8, 14, 12, 10, 120);
        p.arc(7, -8, 14, 12, 60, 170);
        p.stroke(160, 130, 120);
        p.strokeWeight(1.8);
        p.line(-52, -18, -20, -14);
        p.line(-52, -8, -20, -8);
        p.line(20, -14, 52, -18);
        p.line(20, -8, 52, -8);
        p.stroke(214, 184, 145);
        p.strokeWeight(12);
        p.line(-42, 35, -58, 78);
        p.line(42, 35, 58, 78);
        p.noStroke();
        p.fill(214, 184, 145);
        p.ellipse(-60, 82, 18, 14);
        p.ellipse(60, 82, 18, 14);
        p.stroke(214, 184, 145);
        p.strokeWeight(12);
        p.line(-24, 108, -30, 140);
        p.line(24, 108, 30, 140);
        p.noStroke();
        p.fill(214, 184, 145);
        p.ellipse(-32, 145, 26, 16);
        p.ellipse(32, 145, 26, 16);
        p.stroke(230, 205, 170);
        p.strokeWeight(3);
        p.line(-10, -97, -2, -110);
        p.line(0, -98, 0, -114);
        p.line(10, -97, 2, -110);
        
        p.pop();
    }
    
    // ============= P5 Sketch =============
    var sketchMomo = function(p) {
        p.setup = function() {
            let canvas = p.createCanvas(600, 400);
            canvas.parent('mySketch3');
            p.frameRate(60);
            p.angleMode(p.DEGREES);
            startDecay();
            updateStatsUI();
            initBackground(p);
            
            document.getElementById('feedBtn').onclick = () => performAction("eat");
            document.getElementById('sleepBtn').onclick = () => performAction("sleep");
            document.getElementById('workBtn').onclick = () => performAction("work");
            document.getElementById('playBtn').onclick = () => performAction("play");
        };
        
        p.draw = function() {
            drawBackground(p);
            
            if (activeAction === "eat") {
                drawEatingScene(p, 300, 215, 0.82);
            } else if (activeAction === "sleep") {
                drawSleepScene(p, 300, 205, 0.78);
            } else if (activeAction === "work") {
                drawWorkScene(p, 300, 210, 0.75);
            } else if (activeAction === "play") {
                drawPlayScene(p, 260, 220, 0.8);
            } else {
                drawStandardCat(p, 300, 220, 0.9);
            }
            
            // Particles
            for (let i = particles.length-1; i >= 0; i--) {
                let pt = particles[i];
                pt.x += pt.vx;
                pt.y += pt.vy;
                pt.vy += 0.08;
                pt.life -= 0.018;
                if (pt.life <= 0) particles.splice(i,1);
                else {
                    p.fill(pt.color[0], pt.color[1], pt.color[2], pt.life * 200);
                    p.noStroke();
                    p.ellipse(pt.x, pt.y, pt.size * pt.life);
                }
            }
            
            // Warning message
            if (warningTimer > 0 && warningMessage && activeAction === "idle") {
                warningTimer--;
                p.fill(255, 250, 240);
                p.stroke(180, 130, 100);
                p.strokeWeight(2);
                p.rect(350, 18, 220, 48, 22);
                p.fill(100, 70, 50);
                p.triangle(325, 35, 350, 35, 337, 52);
                p.fill(70, 50, 35);
                p.textSize(12);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(warningMessage, 460, 42);
                p.textAlign(p.LEFT);
            }
            
            if (actionTimer > 0) {
                actionTimer--;
                if (actionTimer <= 0) {
                    activeAction = "idle";
                    checkZeroStats();
                }
            }
        };
        
        p.keyPressed = function() {
            if (p.key === 'E' || p.key === 'e') performAction("eat");
            if (p.key === 'S' || p.key === 's') performAction("sleep");
            if (p.key === 'W' || p.key === 'w') performAction("work");
            if (p.key === 'P' || p.key === 'p') performAction("play");
        };
    };
    
    new p5(sketchMomo);