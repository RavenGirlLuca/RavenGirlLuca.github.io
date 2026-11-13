let enemies = [];

function loadEnemy(img, type, x, y, speed, aSpeed, dmg) {
  enemies.push({
    img: img,
    type: type,
    x: x,
    y: y,
    speed: speed,
    aSpeed: aSpeed,
    dmg: dmg
  });
}

function updateEnemies(){
  for( let enemy of enemies) {
    let finder = new PF.AStarFinder();
  }
}