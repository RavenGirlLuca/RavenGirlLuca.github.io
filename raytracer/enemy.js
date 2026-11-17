let enemies = [];
let finder;

function loadEnemy(img, type, x, y, speed, aSpeed, size, dmg, health) {
  enemies.push({
    img: img,
    type: type,
    x: x,
    y: y,
    speed: speed,
    aSpeed: aSpeed,
    size: size,
    dmg: dmg,
    health: health,
    cooldown: 0,
  });
}

function updateEnemies(){
  for( let enemy of enemies) {
    let enemyGridX = floor(enemy.x/TILE_SIZE);
    let enemyGridY = floor(enemy.y/TILE_SIZE);
    let playerGridX = floor(player.x/TILE_SIZE);
    let playerGridY = floor(player.y/TILE_SIZE);
    
    if (
      (dist(enemy.x, enemy.y, player.x, player.y) >= 20  && enemy.type === 'melee' ) ||
      (dist(enemy.x, enemy.y, player.x, player.y) >= 80 && enemy.type === 'ranged')
    ) {
      let path = finder.findPath(
        enemyGridX,
        enemyGridY, 
        playerGridX, 
        playerGridY, 
        PfWorld.clone());

      if (path.length >=2) {
        let angle = atan2(path[1][1] - path[0][1], path[1][0] - path[0][0]);
        
        enemy.x += cos(angle)*enemy.speed;
        enemy.y += sin(angle)*enemy.speed;
      }
    }

    if (
      (dist(enemy.x, enemy.y, player.x, player.y) <= 30  && enemy.type === 'melee' ) ||
      (dist(enemy.x, enemy.y, player.x, player.y) <= 100 && enemy.type === 'ranged')
    ) {
      if (enemy.cooldown === 0) {
        player.health -= enemy.dmg;

        enemy.cooldown = enemy.aSpeed;
      }
    }

    if (enemy.cooldown > 0) enemy.cooldown--;

    billboards.push({
      img: enemy.img,
      x: enemy.x,
      y: enemy.y,
      size: enemy.size
    });
  }
}