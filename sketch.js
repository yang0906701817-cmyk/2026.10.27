let spriteSheet; // 宣告角色的水平精靈圖。
const frameCountInSheet = 8; // 設定精靈圖中的動畫格數。
const sheetWidth = 1019; // 設定精靈圖的總寬度。
const sheetHeight = 195; // 設定精靈圖的總高度。
const frameWidth = sheetWidth / frameCountInSheet; // 計算每格動畫的寬度。
let characterX; // 儲存角色中心點的水平位置。
let characterY; // 儲存角色中心點的垂直位置。
let facing = 1; // 設定角色初始朝向，1 為右、-1 為左。
let currentFrame = 0; // 儲存目前要顯示的動畫格。
let moving = false; // 記錄角色目前是否正在移動。

function preload() { // 在畫布建立前載入角色精靈圖。
  spriteSheet = loadImage("1/走路/COMBINE.png"); // 載入專案內的八格角色精靈圖。
} // 結束 preload 函式。

function setup() { // 設定畫布與角色的初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  characterX = width / 2; // 將角色初始水平位置設在畫面中央。
  characterY = height / 2; // 將角色初始垂直位置設在畫面中央。
  imageMode(CENTER); // 讓圖片以指定位置作為中心點繪製。
  frameRate(60); // 將畫面更新頻率設定為每秒六十格。
} // 結束 setup 函式。

function draw() { // 每一畫格更新背景、移動與角色動畫。
  background("#b7e4e8"); // 使用指定的淺藍綠色填滿畫布背景。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否正被按住。
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否正被按住。
  const horizontalDirection = Number(movingRight) - Number(movingLeft); // 計算角色的水平移動方向。
  moving = horizontalDirection !== 0; // 根據移動方向更新角色的移動狀態。

  if (moving) { // 只有按下單一方向鍵時才移動角色。
    characterX += horizontalDirection * 4; // 按照方向以每畫格四像素移動角色。
    facing = horizontalDirection; // 讓角色朝向目前移動的方向。
    currentFrame = floor(frameCount / 8) % frameCountInSheet; // 依畫格計數切換八格走路動畫。
  } else { // 角色停止時改為顯示精靈圖的第一格。
    currentFrame = 0; // 將閒置動畫固定在第一格。
  } // 結束移動狀態判斷。

  const displayScale = min(1, (height * 0.7) / sheetHeight, (width * 0.7) / frameWidth); // 依視窗大小縮放角色並避免超出畫布。
  const displayWidth = frameWidth * displayScale; // 計算單格角色圖片的顯示寬度。
  const displayHeight = sheetHeight * displayScale; // 計算單格角色圖片的顯示高度。
  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色不會移出畫布左右邊界。

  push(); // 暫存目前的繪圖狀態。
  translate(characterX, characterY); // 將繪圖原點移至角色中心。
  scale(facing, 1); // 依角色朝向水平翻轉圖片。
  image(spriteSheet, 0, 0, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, sheetHeight); // 繪製目前的精靈圖動畫格。
  pop(); // 還原繪圖狀態，避免影響後續畫面。
} // 結束 draw 函式。

function keyPressed() { // 攔截方向鍵，避免瀏覽器捲動頁面。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵。
    return false; // 阻止瀏覽器執行方向鍵的預設捲動行為。
  } // 結束方向鍵判斷。
} // 結束 keyPressed 函式。

function windowResized() { // 在視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗尺寸。
  characterX = constrain(characterX, 0, width); // 確保角色水平位置仍在新畫布範圍內。
  characterY = height / 2; // 讓角色在視窗縮放後維持垂直置中。
} // 結束 windowResized 函式。
