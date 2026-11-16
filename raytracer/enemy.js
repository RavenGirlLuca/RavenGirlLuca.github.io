let enemies = [];
let finder;

function loadEnemy(img, type, x, y, speed, aSpeed, size, dmg) {
  enemies.push({
    img: img,
    type: type,
    x: x,
    y: y,
    speed: speed,
    aSpeed: aSpeed,
    size: size,
    dmg: dmg
  });
}

function updateEnemies(){
  for( let enemy of enemies) {
    let enemyGridX = floor(enemy.x/TILE_SIZE);
    let enemyGridY = floor(enemy.y/TILE_SIZE);
    let playerGridX = floor(player.x/TILE_SIZE);
    let playerGridY = floor(player.y/TILE_SIZE);
    
    if (!(enemyGridX === playerGridX && enemyGridY === playerGridY)) {
      let path = finder.findPath(
        enemyGridX,
        enemyGridY, 
        playerGridX, 
        playerGridY, 
        PfWorld.clone());

      if (path.length >=1) {
        let angle = atan2(path[1][1] - path[0][1], path[1][0] - path[0][0]);
        
        enemy.x += cos(angle)*enemy.speed;
        enemy.y += sin(angle)*enemy.speed;
      }
    }

    billboards.push({
      img: enemy.img,
      x: enemy.x,
      y: enemy.y,
      size: enemy.size
    });
  }
}