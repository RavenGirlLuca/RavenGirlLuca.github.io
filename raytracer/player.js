class Player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dir = 0;
    this.speed = 2;
    this.turnSpeed = 2;
    this.checkWorld = [
      [0,0],[0,1],[0,2],
      [1,0],[1,1],[1,2],
      [2,0],[2,1],[2,2]]

    this.rayCount = 140;
    this.rayLength = 400;
    this.raySegmentLength = 2;
    this.fov = 70;
  }

  setWorldTiles() {
    let x = Math.floor(this.x/TILE_SIZE);
    let y = Math.floor(this.y/TILE_SIZE);

    this.checkWorld = [
      [y-1,x-1],[y-1,x],[y-1,x+1],
      [y  ,x-1],[y  ,x],[y  ,x+1],
      [y+1,x-1],[y+1,x],[y+1,x+1]]
  }

  collision(x, y) {
    for (let tile of this.checkWorld) {
      if (tile[0] >= 0 && tile[1] >= 0 && tile[0] < world.length && tile[1] < world[tile[0]].length) {
        if (
          x             < (tile[1] * TILE_SIZE) + TILE_SIZE &&
          x + this.size >  tile[1] * TILE_SIZE              &&
          y             < (tile[0] * TILE_SIZE) + TILE_SIZE &&
          y + this.size >  tile[0] * TILE_SIZE              
        ) {
          if (world[tile[0]][tile[1]] === 0) {
            //do nothing
          }
          else {
            return true;
          }
        }
      }
    }
    return false;
  }

  movement() {
    if (keyIsDown(LEFT_ARROW)) {
      this.dir -= this.turnSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.dir += this.turnSpeed;
    }

    let moveX = 0;
    let moveY = 0;

    if (keyIsDown(UP_ARROW)) {
      moveX += cos(radians(this.dir)) * this.speed;
      moveY += sin(radians(this.dir)) * this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      moveX -= cos(radians(this.dir)) * this.speed;
      moveY -= sin(radians(this.dir)) * this.speed;
    }
    
    if (!this.collision(this.x + moveX, this.y)) {
      this.x += moveX;
    }

    if (!this.collision(this.x, this.y  + moveY)) {
      this.y += moveY;
    }
  }

  drawDebug() {
    fill('red');
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.setWorldTiles()
    this.movement()
  }

  raycast() {
    let wallWidth  = width/this.rayCount;
    let py = height/2;

    for (let i = 0; i < this.rayCount; i++) {
      let rayAngle = (((this.fov/this.rayCount) * i) - this.fov/2) + this.dir;
      let rayX  = this.x + (this.size/2);
      let rayY  = this.y + (this.size/2);
      let stepX = cos(radians(rayAngle)) * this.raySegmentLength;
      let stepY = sin(radians(rayAngle)) * this.raySegmentLength;

      let rayLength = 0;
      let hit = false;
      let px = i * wallWidth;
      let wallColor = color(255,255,255);
      let wallID = 1;
      
      while (rayLength < this.rayLength) {
        let mapX = Math.floor(rayX / TILE_SIZE);
        let mapY = Math.floor(rayY / TILE_SIZE);

        if (mapY >= 0 && mapY < world.length && mapX >= 0 && mapX < world[mapY].length) {
          if (world[mapY][mapX] > 0) {
            hit = true;
            wallID = world[mapY][mapX];
            break;
          }
        }

        rayX += stepX;
        rayY += stepY;
        rayLength += this.raySegmentLength;
      }

      if (!hit) continue;

      if (wallID === 1) wallColor = color(76, 87, 96);
      if (wallID === 2) wallColor = color(147, 168, 172);
      if (wallID === 3) wallColor = color(215, 206, 178);
      if (wallID === 4) wallColor = color(165, 158, 140);
      if (wallID === 5) wallColor = color(102, 99, 91);

      push();
      let correctedDistance = rayLength * cos(radians(rayAngle - this.dir));
      let wallHeight = ((TILE_SIZE * height) / correctedDistance);

      let c = map(correctedDistance*2, 0, height, 0, 1);
      fill(lerpColor(wallColor, color(12,12,30), c));

      rectMode(CENTER);
      rect(px + (wallWidth / 2),py,wallWidth+1,wallHeight);
      pop();
    }
  }
}

let player = new Player(100,100);