const GAMEWIDTH  = 800;
const GAMEHEIGHT = 600;

const ASPECTRATIO = GAMEWIDTH/GAMEHEIGHT;

let WINDOWMULTIPLIER; //Im aware this is not a const, but it was impossible to define within the function and keep it global

function calculateCanvasSize() {
  //calculates how large the canvas should be to fit the required aspect ration
  let w = windowWidth;
  let h = windowWidth / ASPECTRATIO;
  
  if (h > windowHeight) {
    h = windowHeight;
    w = windowHeight * ASPECTRATIO;
  }

  WINDOWMULTIPLIER = w/GAMEWIDTH;
  
  return { w, h };
}