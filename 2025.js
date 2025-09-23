var sound1, sound2;
let font;
let img2025; // <-- use 2025 image here
let menuOpen = false;
let menuItems = ["主页", "2021", "2022", "2023", "2024", "2025"];

function preload(){  
  sound1 = loadSound("audio/creakingmusic.mp3");  // load sound
  sound2 = loadSound("audio/hmm.mp3")

  font = loadFont("MaShanZheng-Regular.ttf");
  img2025 = loadImage("pictures/2025_tjw.gif", 
    () => {}, 
    () => console.warn("2025 image missing")
  ); // <-- or comment out if you don't have it yet
}

function setup() {
  createCanvas(1170, 2532);

  tryAutoPlay(); // optional
}

function draw() {
  background(227, 197, 195);

  Header();

  // show this page's image (use 2025, not 2023)
  if (img2025) {
    imageMode(CENTER);
    let imgW = width * 0.9;
    let imgH = (img2025.height / img2025.width) * imgW;
    image(img2025, width/2, height/2 - 250, imgW, imgH);
  }

  if (menuOpen) {
    drawFullScreenMenu();
  }
}

// ---------------- HEADER BAR ----------------
function Header(){
  noStroke();
  fill(174, 68, 90);
  rect(0, 0, width, 200);

  textFont(font);
  textSize(80);
  textAlign(LEFT, CENTER);
  fill(0);
  text("大雪猿", 40, 100);

  const hx1 = width - 150;
  const hx2 = width - 70;
  const hy = 70;
  stroke(0);
  strokeWeight(6);
  line(hx1, hy,    hx2, hy);
  line(hx1, hy+25, hx2, hy+25);
  line(hx1, hy+50, hx2, hy+50);

  noStroke();
  fill(0, 0);
  rect(width - 180, 40, 160, 120);
}

// ---------------- INTERACTION ----------------
function mousePressed() {
  // start/unlock audio on first click (desktop)
  // if (sound1 && !sound1.isPlaying()){
  //   userStartAudio();
  //   sound1.setVolume(1.5); // <-- valid range 0..1
  //   sound1.loop();
  // }

  // hamburger logic
  if (!menuOpen && inHamburger(mouseX, mouseY)) {
    menuOpen = true;
  } else if (menuOpen) {
    handleMenuClick(mouseX, mouseY);
  }
}

function touchStarted() {
  // start/unlock audio on first touch (mobile)
  if (sound1 && !sound1.isPlaying()){
    userStartAudio();
    sound1.setVolume(2.0); 
    sound1.loop();
  }
    if (sound2 && !sound2.isPlaying()) {
    userStartAudio();
    sound2.setVolume(0.8);
    sound2.loop();

  // hamburger logic
  if (!menuOpen && inHamburger(touchX, touchY)) {
    menuOpen = true;
    return false; // prevent scrolling
  } else if (menuOpen) {
    handleMenuClick(touchX, touchY);
    return false;
  }
  return false;
}
}

function inHamburger(x, y) {
  return (x >= width - 180 && x <= width - 20 && y >= 40 && y <= 160);
}

// ---------------- FULL-SCREEN MENU ----------------
function drawFullScreenMenu() {
  noStroke();
  fill(75, 67, 118); // add alpha as 4th arg if you want translucency
  rect(0, 0, width, height);

  stroke(0);
  strokeWeight(8);
  line(width - 120, 60, width - 60, 120);
  line(width - 120, 120, width - 60, 60);

  noStroke();
  textFont(font);
  textSize(96);
  textAlign(CENTER, CENTER);
  fill(255);

  const startY = 500;
  const spacing = 160;
  for (let i = 0; i < menuItems.length; i++) {
    text(menuItems[i], width / 2, startY + i * spacing);
  }
}

function handleMenuClick(x, y) {
  if (x >= width - 140 && x <= width - 40 && y >= 40 && y <= 140) {
    menuOpen = false;
    return;
  }
  const startY = 500;
  const spacing = 160;
  for (let i = 0; i < menuItems.length; i++) {
    const top = startY + i * spacing - 60;
    const bottom = top + 120;
    if (y >= top && y <= bottom) {
      const label = menuItems[i];
      if (label === "主页") window.location.href = "index.html";
      else window.location.href = `${label}.html`; // assumes 2021.html etc.
      menuOpen = false;
      break;
    }
  }
}

// --- best-effort autoplay on page load (may be blocked on mobile) ---
function tryAutoPlay(){
   if (!sound1 || !sound2) return;
  try {
    const ctx = getAudioContext();
    const maybe = ctx && ctx.resume ? ctx.resume() : null;

    const start = () => {
      if (!sound1.isPlaying()){
        sound1.setVolume(2.0);                     // 0.0–1.0
        sound1.loop();                              // start looping
      }
      if (!sound2.isPlaying()) {      
        sound2.setVolume(0.8); 
        sound2.loop(); 
      } 
    };

    if (maybe && typeof maybe.then === "function") {
      maybe.then(start).catch(()=>{});             // if blocked, first tap will start it
    } else {
      start();                                     // older browsers
    }
  } catch(e) { /* ignore */ }
}
