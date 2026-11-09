class Player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.dir = 0;
    this.speed = 2;
    this.turnSpeed = 0.1;
  }

  draw() {
    fill('red');
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    if (keyIsDown(UP_ARROW)) {
      this.x -= Math.sin(this.dir) * this.speed;
      this.y -= Math.cos(this.dir) * this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.x += Math.sin(this.dir) * this.speed;
      this.y += Math.cos(this.dir) * this.speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.dir += this.turnSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.dir -= this.turnSpeed;
    }
  }
}

let player = new Player(100,100);