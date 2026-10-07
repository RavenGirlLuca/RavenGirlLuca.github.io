const GAMEWIDTH  = 800;
const GAMEHEIGHT = 600;

const ASPECTRATIO = GAMEWIDTH/GAMEHEIGHT;

let WindowMultiplier;

function calculateCanvasSize() {
  //calculates how large the canvas should be to fit the required aspect ration
  let w = windowWidth;
  let h = windowWidth / ASPECTRATIO;
  
  if (h > windowHeight) {
    h = windowHeight;
    w = windowHeight * ASPECTRATIO;
  }
  
  return { w, h };
}