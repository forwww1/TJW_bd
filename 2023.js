let font;
let img2021;
let menuOpen = false;
let menuItems = ["主页", "2021", "2022", "2023", "2024", "2025"];

function preload(){  
  font = loadFont("MaShanZheng-Regular.ttf");
  img2023 = loadImage("pictures/2023_tjw.jpg");
}

function setup() {
  createCanvas(1170, 2532);
}

function draw() {
  background(227, 197, 195);

  Header();

  // show this page's image
  if (img2023) {
    imageMode(CENTER);
    let imgW = width * 0.9;
    let imgH = (img2023.height / img2023.width) * imgW;
    image(img2023, width/2, height/2 - 250, imgW, imgH);
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

    fill(255);
  rect(70, 1830, 1050, 200, 20);
  textSize(70);
  fill(0);
  text("2023年: 你发神经喊玛琪玛妈妈", 100, 1900);

}

// ---------------- INTERACTION ----------------
function mousePressed() {
  if (!menuOpen && inHamburger(mouseX, mouseY)) {
    menuOpen = true;
  } else if (menuOpen) {
    handleMenuClick(mouseX, mouseY);
  }
}

function touchStarted() {
  if (!menuOpen && inHamburger(touchX, touchY)) {
    menuOpen = true;
    return false;
  } else if (menuOpen) {
    handleMenuClick(touchX, touchY);
    return false;
  }
  return false;
}

function inHamburger(x, y) {
  return (x >= width - 180 && x <= width - 20 && y >= 40 && y <= 160);
}

// ---------------- FULL-SCREEN MENU ----------------
function drawFullScreenMenu() {
  // Full overlay background
  noStroke();
  fill (75, 67, 118);           // semi-opaque pink overlay (add alpha as 4th arg if needed)
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

  const startY = 500;                 // starting y position for first item
  const spacing = 160;                // spacing between items
  for (let i = 0; i < menuItems.length; i++) {
    text(menuItems[i], width / 2, startY + i * spacing);
  }
}

// handle clicks inside the full-screen menu
function handleMenuClick(x, y) {
  // Close button area (top-right corner box around the "X")
  if (x >= width - 140 && x <= width - 40 && y >= 40 && y <= 140) {
    menuOpen = false;                 // close the menu
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
      } else if (menuItems[i] === "2025") {
        window.location.href = "2025.html";
      }    
      menuOpen = false;                         // close after selecting
      break;
    }
  }
}

