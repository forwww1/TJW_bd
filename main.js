// color palette: https://coolors.co/palette/573c27-a98360-fdeed9-ffadc6-e34989
var sound1, sound2;
let font;
let img2025;
let menuOpen = false;
let menuItems = ["主页", "2021", "2022", "2023", "2024", "2025"];
// ---------------- FULL-SCREEN INTRO OVERLAY STATE ----------------
let introOpen = true; // <-- show a full-screen rect when the page first loads

function preload(){  
  sound1 = loadSound("audio/creakingmusic.mp3");  
  sound2 = loadSound("audio/hmm.mp3");

  font = loadFont("MaShanZheng-Regular.ttf");  // load custom font

  img2025 = loadImage("pictures/2025_tjw.gif");
}

function setup() {
  createCanvas(1170, 2532); // full phone-screen canvas
}

// function touchStarted() { 
//   if (!sound1.isPlaying()) { // sound1.loop(); // 
//   sound1.setVolume(500); // Set volume to 
//   // 500% 
// } 
// }

function draw() {
  background(227, 197, 195); // background color from palette

  Header();// draw the header bar + hamburger icon
  
 if (img2025) {
    imageMode(CENTER);
    let imgW = width * 0.9;
    let imgH = (img2025.height / img2025.width) * imgW;
    image(img2025, width/2, height/2 - 250, imgW, imgH);
  }

  // if menu is open, draw full overlay
  if (menuOpen) { 
    drawFullScreenMenu();
  }

  // ---- draw intro overlay LAST so it covers everything (including header/menu) ----
  if (introOpen) { // <-- draw full-screen rect on first load
    drawIntroOverlay();
    return; // <-- nothing else to draw/frame while overlay is up
  }
}

// ---------------- HEADER BAR ----------------
function Header(){
  noStroke();
  fill(174, 68, 90);                  // dark rose color
  rect(0, 0, width, 200);             // header bar (covers top of canvas)

  // Title text
  textFont(font);
  textSize(80);
  textAlign(LEFT, CENTER);
  fill(0);
  text("大雪猿", 40, 100);             // app title

  // Hamburger (3 stacked lines, top-right corner)
  const hx1 = width - 150;            // left x of hamburger lines
  const hx2 = width - 70;             // right x of hamburger lines
  const hy = 70;                      // y of first line
  stroke(0);
  strokeWeight(6);
  line(hx1, hy,    hx2, hy);
  line(hx1, hy+25, hx2, hy+25);
  line(hx1, hy+50, hx2, hy+50);

  // Invisible hitbox (makes tapping easier)
  noStroke();
  fill(0, 0);                         // transparent
  rect(width - 180, 40, 160, 120);
}

// ---------------- INTERACTION ----------------
function mousePressed() {
  // ---- first click: dismiss intro overlay (and optionally start audio) ----
  if (introOpen) {                      // <-- handle overlay first
    introOpen = false;                  // hide overlay
    // Optional: start sound on first gesture (needs p5.sound in HTML)
    if (sound1 && !sound1.isPlaying()) {
      // userStartAudio();              // uncomment if you need to unlock audio on some browsers
      sound1.setVolume(3.0);            // 0.0–1.0
      sound1.loop();
       if (sound2 && !sound2.isPlaying()) {
    // userStartAudio();
    sound2.setVolume(0.7);
    sound2.loop();
  }
    }
    return false;
  }

  if (!menuOpen && inHamburger(mouseX, mouseY)) {
    // open menu when hamburger clicked
    menuOpen = true;
  } else if (menuOpen) {
    // if menu is open, check clicks inside it
    handleMenuClick(mouseX, mouseY);
  }
}

function touchStarted() {
  // ---- first touch: dismiss intro overlay (and optionally start audio) ----
  if (introOpen) {                      // <-- handle overlay first
    introOpen = false;                  // hide overlay
    // Optional: start sound on first gesture (needs p5.sound in HTML)
    if (sound1 && !sound1.isPlaying()) {
      // userStartAudio();              // uncomment if you need to unlock audio on some browsers
      sound1.setVolume(3.0);            // 0.0–1.0
      sound1.loop();
    }
     if (sound2 && !sound2.isPlaying()) {
    userStartAudio();
    sound2.setVolume(0.7);
    sound2.loop();
  }
    return false;                       // prevent default scroll
  }

  if (!menuOpen && inHamburger(touchX, touchY)) {
    // open menu on touch
    menuOpen = true;
    return false;
  } else if (menuOpen) {
    // handle touch clicks inside menu
    handleMenuClick(touchX, touchY);
    return false;
  }
  return false;
}

// test if a point is inside hamburger hitbox
function inHamburger(x, y) {
  return (x >= width - 180 && x <= width - 20 && y >= 40 && y <= 160);
}

// ---------------- FULL-SCREEN MENU ----------------
function drawFullScreenMenu() {
  // Full overlay background
  noStroke();
  fill (75, 67, 118); // semi-opaque pink overlay (add alpha as 4th arg if needed)
  rect(0, 0, width, height);

  // Close button "X" (top-right corner)
  stroke(0);
  strokeWeight(8);
  line(width - 120, 60, width - 60, 120);
  line(width - 120, 120, width - 60, 60);

  // Menu items (centered vertically)
  noStroke();
  textFont(font);
  textSize(96);
  textAlign(CENTER, CENTER);
  fill(255);

  const startY = 500;  // starting y position for first item
  const spacing = 160; // spacing between items
  for (let i = 0; i < menuItems.length; i++) {
    text(menuItems[i], width / 2, startY + i * spacing);
  }
}

// handle clicks inside the full-screen menu
function handleMenuClick(x, y) {
  // Close button area (top-right corner box around the "X")
  if (x >= width - 140 && x <= width - 40 && y >= 40 && y <= 140) {
    menuOpen = false;// close the menu
    return;
  }

  // Menu item areas (simple hitboxes)
  const startY = 500;
  const spacing = 160;
  for (let i = 0; i < menuItems.length; i++) {
    const top = startY + i * spacing - 60;
    const bottom = top + 120;
    if (y >= top && y <= bottom) {
      console.log("Clicked:", menuItems[i]);   // log which item was clicked

      // redirect to corresponding page
      if (menuItems[i] === "主页") {
        window.location.href = "index.html";   // go to home page
      } else if (menuItems[i] === "2021") {
        window.location.href = "2021.html";
      } else if (menuItems[i] === "2022") {
        window.location.href = "2022.html";
      } else if (menuItems[i] === "2023") {
        window.location.href = "2023.html";
      } else if (menuItems[i] === "2024") {
        window.location.href = "2024.html";
      }

      menuOpen = false;// close after selecting
      break;
    }
  }
}

// ---------------- INTRO OVERLAY DRAW ----------------
function drawIntroOverlay(){ // <-- full-screen rect + optional hint text
  noStroke();
  // Use your palette or semi-opaque black; adjust alpha as you like
  fill(0);    // semi-opaque overlay
  rect(0, 0, width, height); // cover entire canvas

  // // Optional: hint text
  // textFont(font);
  // textSize(72);
  // textAlign(CENTER, CENTER);
  // fill(255);
  // text("点击开始", width/2, height/2); // "Tap to start"
}
