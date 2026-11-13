class Player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dir = 0;
    this.speed = 2;
    this.turnSpeed = 1.5;
    this.checkWorld = [
      [0,0],[0,1],[0,2],
      [1,0],[1,1],[1,2],
      [2,0],[2,1],[2,2]];
    this.currentGrid = [];
    this.rayCount = 90;
    this.rayLength = 400;
    this.raySegmentLength = 2;
    this.fov = 70;
    this.drawOrder = [];

    this.wallWidth = width/this.rayCount;
  }

  setWorldTiles() {
    let x = Math.floor(this.x/TILE_SIZE);
    let y = Math.floor(this.y/TILE_SIZE);

    this.checkWorld = [
      [y-1,x-1],[y-1,x],[y-1,x+1],
      [y  ,x-1],[y  ,x],[y  ,x+1],
      [y+1,x-1],[y+1,x],[y+1,x+1]];

    this.currentGrid = [y, x];
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
    if (keyIsDown('a') || keyIsDown(LEFT_ARROW)) {
      this.dir -= this.turnSpeed;
    }
    if (keyIsDown('d') || keyIsDown(RIGHT_ARROW)) {
      this.dir += this.turnSpeed;
    }

    if (this.dir > 360) this.dir -= 360;
    if (this.dir < 0)   this.dir += 360

    let moveX = 0;
    let moveY = 0;

    if (keyIsDown('w') || keyIsDown(UP_ARROW)) {
      moveX += cos(radians(this.dir)) * this.speed;
      moveY += sin(radians(this.dir)) * this.speed;
    }
    if (keyIsDown('s') || keyIsDown(DOWN_ARROW)) {
      moveX -= cos(radians(this.dir)) * this.speed;
      moveY -= sin(radians(this.dir)) * this.speed;
    }
    if (keyIsDown('q')) {
      moveX += cos(radians(this.dir - 90)) * this.speed;
      moveY += sin(radians(this.dir - 90)) * this.speed;
    }
    if (keyIsDown('e')) {
      moveX += cos(radians(this.dir + 90)) * this.speed;
      moveY += sin(radians(this.dir + 90)) * this.speed;
    }
    
    if (!this.collision(this.x + moveX, this.y)) {
      this.x += moveX;
    }

    if (!this.collision(this.x, this.y  + moveY)) {
      this.y += moveY;
    }
  }

  update() {
    this.drawOrder = [];
    this.setWorldTiles();
    this.movement();
    this.raycast();
    this.billboard();
    this.drawOrder.sort((a, b) => b.dist - a.dist);
  }

  billboard() {
    let playerCenterX = this.x + (this.size / 2);
    let playerCenterY = this.y + (this.size / 2);

    for (let billboard of billboards) {
      let dx = billboard.x - playerCenterX;
      let dy = billboard.y - playerCenterY;
      let dist = sqrt((dx * dx) + (dy * dy));

      let angleToBillboard = degrees(atan2(dy, dx));
      let angleDiff = angleToBillboard - this.dir;

      while (angleDiff > 180) angleDiff -= 360;
      while (angleDiff < -180) angleDiff += 360;

      if (abs(angleDiff) < (this.fov / 2) + 20) {
        let correctedDist = dist * cos(radians(angleDiff));
        if (correctedDist <= 0.1) continue;

        let screenX = map(angleDiff, -this.fov / 2, this.fov / 2, 0, width);
        let projectedSize = (billboard.size * (height/2)) / correctedDist;

        this.drawOrder.push({
          type: 'billboard',
          dist: dist,
          img: billboard.img,
          position: screenX,
          size: projectedSize
        });
      }
    }
  }

  raycast() {
    for (let i = 0; i < this.rayCount; i++) {
      let rayAngle = (((this.fov/this.rayCount) * i) - this.fov/2) + this.dir;
      let rayX  = this.x + (this.size/2);
      let rayY  = this.y + (this.size/2);
      let stepX = cos(radians(rayAngle)) * this.raySegmentLength;
      let stepY = sin(radians(rayAngle)) * this.raySegmentLength;

      let rayLength = 0;
      let hit = false;
      let px = i * this.wallWidth;
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

      if (wallID === 1)      wallColor = color(76, 87, 96);
      else if (wallID === 2) wallColor = color(147, 168, 172);
      else if (wallID === 3) wallColor = color(215, 206, 178);
      else if (wallID === 4) wallColor = color(165, 158, 140);
      else if (wallID === 5) wallColor = color(102, 99, 91);
      else                   wallColor = color(255, 255, 255);

      push();
      let correctedDistance = rayLength * cos(radians(rayAngle - this.dir));
      let wallHeight = ((TILE_SIZE * height) / correctedDistance);

      let c = color(lerpColor(wallColor, color(12,12,30), map(correctedDistance*2, 0, height, 0, 1)));

      this.drawOrder.push({
        type: 'wall',
        dist: rayLength,
        wallHeight: wallHeight,
        color: c,
        position: px
      })

      pop();
    }
  }

  draw() {
    for (let object of this.drawOrder) {
      if (object.type === 'wall') {
        this.drawWalls(object.position, object.wallHeight, object.color);
      }

      else if (object.type === 'billboard') {
        this.drawBillboard(object.position, object.size, object.img);
      }
    }
  }

  drawWalls(x, h, c) {
    push();
    fill(c);
    rectMode(CENTER);
    rect(x + (this.wallWidth / 2),height/2,this.wallWidth+1,h);
    pop();
  }

  drawBillboard(x, size, img) {
    push();
    imageMode(CENTER);
    image(img, x, height/2, size, size)
    pop();
  }
}

let player;