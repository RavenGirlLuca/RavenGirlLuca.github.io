let bullets = []; //bullet array, stores all bullets on screen

class Bullet {
  constructor(typ,img,px,py,sx,sy,vel,ang,siz,crv) {
    this.typ = typ; //Bullet type, used for special bullets like Bombs
    this.img = img; //Image used for bullet
    this.px  = px;  //X Position in the game
    this.py  = py;  //Y Position in the game
    this.sx  = sx;  //Special X position used for certain bullets
    this.sy  = sy;  //Special Y position used for certain bullets
    this.vel = vel; //Vector velocity, combined with angle to move the px and py
    this.ang = ang; //Angle, used with velocity to determain the new bullet pos
    this.siz = siz; //Bullets sized, used for both draw and determening collision with the player
    this.crv = crv; //Bullet tragectory curve, used on some attacks to curve the bullet path
  }

  draw() {
    //draws the bullets on screen, uses a multiplier to convert the games 4:3 gameplay ration to the screens size
    push();
    
    translate((this.px + (this.siz/2)) * WINDOWMULTIPLIER, (this.py + (this.siz/2)) * WINDOWMULTIPLIER);

    angleMode(DEGREES);
    rotate(this.ang+90);

    imageMode(CENTER); 
    image(this.img, 0, 0,16*WINDOWMULTIPLIER,16*WINDOWMULTIPLIER);

    pop();
  }

  despawnCheck() {
    //does a small AABB check to see if the bullets are still on screen, if not they despawn (treats bullets and rectangles)
    if (!(this.px + this.siz > 0 && this.px < GAMEWIDTH && this.py + this.siz > 0 && this.py < GAMEHEIGHT)) {
      return true;
    }

    return false;
  }

  update() {
    //updates the bullets position in the game
    if (!activeDialog) {
      if (this.typ === "bomb") {
        let vx = Math.cos(radians(this.ang)) * this.vel;
        let vy = Math.sin(radians(this.ang)) * this.vel;

        this.ang += this.crv;
        this.px  += vx;
        this.py  += vy;

        if (this.px >= this.sx - 10 && this.px <= this.sx + 10 && this.py >= this.sy - 10 && this.py <= this.sy + 10 ) {
          let ranBombRad = Math.floor(random(0,360));
          spawnBullets("normal", "normal", Math.floor(lerp(4,10,player.dif/5)), felosBulletBlank, this.px, this.py, this.px, this.py, 0, this.vel, ranBombRad, ranBombRad+360, this.siz/2, 0, 0, 0, 0);
          this.px = -999999999;
          this.py = -999999999;
        }
      }
      else {
        let vx = Math.cos(radians(this.ang)) * this.vel;
        let vy = Math.sin(radians(this.ang)) * this.vel;

        this.ang += this.crv;
        this.px  += vx;
        this.py  += vy;
      }
    }
  }
}

function spawnBullets(bulletType,type,amount,img,x1,y1,x2,y2,sdist,vel,minAng,maxAng,siz,crv,p1,p2,currentLoop) {
  if (type === "normal") {
    for (let i = 0; i < amount; i++) {
      let px  = lerp(x1,x2,((i+1)/amount)); //if u want the bullets to spawn evenly along a line, this handles that using x1, x2, y1, and y2
      let py  = lerp(y1,y2,((i+1)/amount));

      let ang = (((maxAng - minAng)/amount)*i)+minAng; //if u want the bullets to spawn along a ring, or a semi circle, this handles that using min, and max Ang

      let sx  = (Math.cos(radians(ang)) * sdist) + px;
      let sy  = (Math.sin(radians(ang)) * sdist) + py;

      bullets.push(new Bullet(bulletType,img,px,py,sx,sy,vel,ang,siz,crv));
    }
  }

  else if (type === "moveSpawn") {
    for (let i = 0; i < amount; i++) {
      let px  = lerp(x1 + (currentLoop * p1),x2 + (currentLoop * p1),((i+1)/amount));
      let py  = lerp(y1 + (currentLoop * p2),y2 + (currentLoop * p2),((i+1)/amount));

      let ang = (((maxAng - minAng)/amount)*i)+minAng;

      let sx  = (Math.cos(radians(ang)) * sdist) + px;
      let sy  = (Math.sin(radians(ang)) * sdist) + py;

      bullets.push(new Bullet(bulletType,img,px,py,sx,sy,vel,ang,siz,crv));
    }
  }
}

function updateBullets() {
  for (let i = bullets.length-1; i >= 0; i--) {
    bullets[i].update();

    //if bullet collides with player, delete it
    if (player.px + player.siz > bullets[i].px && player.px < bullets[i].px + bullets[i].siz && player.py + player.siz > bullets[i].py && player.py < bullets[i].py + bullets[i].siz) {
      player.bulletCol();
      bullets.splice(i,1); 
    }

    //if despawnCheck comes back as true, delete the bullet inside the array, should hypothetically save RAM... maybe
    else if (bullets[i].despawnCheck()) {
      bullets.splice(i,1); 
    }
  }
}

function drawBullets() {
  for (let i = bullets.length-1; i >= 0; i--) bullets[i].draw();
}