//This is a virtual pet simulator featuring Momo, an interactive digital pet that can eat, sleep, study, and play.
//Use your mouse to click the corresponding buttons to trigger Momo’s actions.
//Use keyboard shortcuts to control Momo directly:
//Press the keyboard "E" for eating, "S" for sleeping, "T" for Studying, "P" for playing.
//Also, Momo's eye will follow users's mouse. 
//If you choose the correct action, Momo happily performs it and says "thank you".
//If you choose the wrong action, Momo still performs the selected action but says "I don't want this!"


let petState = "idle";
let blinkTimer = 0;
let isBlinking = false;
let ballX = 350; 
let ballY = 230;
let ballAngle = 0;
let zzzSize = 20;
let zzzGrowing = true;
let idleTimer = 0;
let dialogue = "Hi, I'm Momo"; 
let dialogueTimer = 0;
let dialogueOptions = ["I'm hungry!", "I'm sleepy!", "I want to study!", "I want to play!"];
let currentNeed = "";
let responseMessage = "";
//buttons for user interaction
let buttons = [
  { label: "Eat (E)", x: 100, y: 300, width: 80, height: 40, color: [238, 252, 225], state: "eat", need: "I'm hungry!" },
  { label: "Sleep (S)", x: 200, y: 300, width: 80, height: 40, color: [250, 225, 252], state: "sleep", need: "I'm sleepy!" },
  { label: "Study (T)", x: 300, y: 300, width: 80, height: 40, color: [252, 252, 225], state: "study", need: "I want to study!" },
  { label: "Play (P)", x: 400, y: 300, width: 80, height: 40, color: [225, 250, 252], state: "play", need: "I want to play!" }
];

var sketch3 = function (p) {
p.setup = function() {
let canvas = p.createCanvas(600,400);
canvas.parent('momoVersion1Sketch');
}
p.draw = function() {
  p.background(240,247,247);
  p.drawBackground();
  p.drawPet();
  p.drawButtons();
  p.handleBlinking();
  p.drawSpeakbox();
//every 6 seconds, Momo will change request if there is no response message
  if (p.millis() - dialogueTimer > 6000 && responseMessage === "") {
  currentNeed = p.random(dialogueOptions);
  dialogue = currentNeed;
  dialogueTimer = p.millis();
  }
}

p.drawBackground = function() {
// floor
  p.fill(180, 140, 100);
  p.rect(0, 200, p.width, 200);
//sofa
  p.textSize(150);
  p.text("🛋️", 480, 200); 
//window
  p.fill(180, 220, 255);
  p.rect(50, 70, 100, 80, 10);
  p.fill(255);
  p.line(50, 110, 150, 110);
  p.line(100, 70, 100, 150);
  //potted plant
  p.textSize(80);
  p.text("🪴", 120, 220);
}


p.drawPet = function() {
  p.fill(0);
  p.textSize(24);
  p.textAlign(p.CENTER, p.CENTER);
  
  //body
  p.fill(255);
  p.ellipse(300, 180, 100, 130); 

  //crown
  p.textSize(40);
  p.text("👑", 300, 110);

  // Eyes
  if (isBlinking || petState === "sleep") {
    p.fill(0);
    p.rect(270, 155, 20, 2); // Left blink 
    p.rect(310, 155, 20, 2); // Right blink 
  } else {
    p.fill(255);
    p.ellipse(285, 160, 20, 25); // Left eye
    p.ellipse(315, 160, 20, 25); // Right eye
    p.fill(0);
    let eyeX = p.constrain(p.mouseX, 280, 290);
    let eyeY = p.constrain(p.mouseY, 155, 165);
    p.ellipse(eyeX, eyeY, 10, 10); // Left pupil
    eyeX = p.constrain(p.mouseX, 310, 320);
    p.ellipse(eyeX, eyeY, 10, 10); // Right pupil
  }

  // arms 
  if (petState === "eat" || petState === "study") {
    p.line(250, 190, 290, 220);
    p.line(350, 190, 310, 220);
  } else {
    p.line(250, 190, 230, 220);
    p.line(350, 190, 370, 220);
  }

  // Legs
  p.line(280, 240, 270, 270);
  p.line(320, 240, 330, 270);
  
  // Shoes
  p.ellipse(265,270,20,10);
  p.ellipse(335,270,20,10);








  //Mouth
  if (petState === "eat"){ //mouth will change to circle when Momo are eating. 
    p.fill(181, 65, 63);
    p.ellipse(300,200, 30, 20); 
  } else if (petState === "sleep") { //mouth will change to a line if Momo are sleeping.
    p.rect(290, 200, 20,2);
  } else {
    p.fill(181, 65, 63);
    p.arc(300, 190, 30, 30, 0, p.PI);
  }

  if (petState === "eat") { // When Momo are eating will have a "burge" on it's mouth. 
    p.text("🍔", 300, 220);
    p.fill(0);

  } else if (petState === "sleep") {
    p.fill(0);
    p.textSize(zzzSize);
    p.text("💤", 360, 120); 
    
    // zzz emoji growing and shrinking
    if (zzzGrowing) {
      zzzSize += 0.5;
      if (zzzSize >= 40) zzzGrowing = false;
    } else {
      zzzSize -= 0.5;
      if (zzzSize <= 20) zzzGrowing = true;
    }

  } else if (petState === "study") {
    p.text("📖", 300, 220);
    p.fill(0);
  } else if (petState === "play") { // When Momo is playing the ball, the ball will moving around the right foot.
    p.fill(0);
    ballX = 370 + 40 * p.sin(ballAngle);
    ballY = 260;
    p.text("⚽", ballX, ballY);
    ballAngle += 0.1;
  } else {
    p.fill(0);
  }
}


p.drawSpeakbox = function(){
  p.fill(255);
  p.triangle(350,80,400,80,330,100);
  p.ellipse(405, 60, 180, 50);
  p.fill(0);
  p.textSize(18);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(dialogue, 410, 60);
}


//blinking animation
p.handleBlinking = function() {
  if (p.frameCount % 60 === 0) { // Blink every 1 seconds
    isBlinking = true;
    setTimeout(() => { isBlinking = false; }, 100);
  }
}


p.drawButtons = function() {
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    p.fill(btn.color);
    p.rect(btn.x, btn.y, btn.width, btn.height, 10);
    p.fill(0);
    p.textSize(18);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
  }
}


p.mousePressed = function() {
  petState = "idle"; 
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    if (p.mouseX > btn.x && p.mouseX < btn.x + btn.width && p.mouseY > btn.y && p.mouseY < btn.y + btn.height) {
      //regardless of correctness, momo preforms the selected action
      petState = btn.state; 
      //check if the selected was correct
      if (btn.need === currentNeed) {
        responseMessage = "✨ Thank you! ✨"; 
      } else {
        responseMessage = "😡 I don't want this!";
      }
      //update the dialogue box
      dialogue = responseMessage;
      // change new need after 3 seconds
      setTimeout(() => {
        responseMessage = "";
        currentNeed = p.random(dialogueOptions);
        dialogue = currentNeed; 
        petState = "idle"; 
      }, 6000);
    } 
  }
}

p.keyPressed = function () {
  petState = "idle"; 
  let keyMap = {
    'E': "eat",
    'e': "eat",
    'S': "sleep",
    's': "sleep",
    'T': "study",
    't': "study",
    'P': "play",
    'p': "play"
  };
  if (p.key in keyMap) {
    let selectedState = keyMap[p.key];
    // find the correct button 
    let btn = buttons.find(b => b.state === selectedState);
    // regardless of cottectness, momo performs the selected action
    petState = btn.state;
    // check if the selected action correct
    if (btn.need === currentNeed) {
      responseMessage = "✨ Thank you! ✨"; 
    } else {
      responseMessage = "😡 I don't want this!";
    }
    // update the dialogue box
    dialogue = responseMessage;
    // change to new need after 3 seonds
    setTimeout(() => {
      responseMessage = "";
      currentNeed = p.random(dialogueOptions);
      dialogue = currentNeed;
      petState = "idle"; 
    }, 6000);
  }
}
}

new p5(sketch3);