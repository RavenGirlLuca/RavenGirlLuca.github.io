let bullets = []; //bullet array, stores all bullets on screen

class Bullet {
  constructor(px,py,vel,ang,siz,crv) {
    this.px  = px;  //X Position in the game
    this.py  = py;  //Y Position in the game
    this.vel = vel; //Vector velocity, combined with angle to move the px and py
    this.ang = ang; //Angle, used with velocity to determain the new bullet pos
    this.siz = siz; //Bullets sized, used for both draw and determening collision with the player
    this.crv = crv; //Bullet tragectory curve, used on some attacks to curve the bullet path
  }

  draw() {
    //draws the bullets on screen, uses a multiplier to convert the games 4:3 gameplay ration to the screens size
    push();
    
    translate((this.px + (this.siz/2)) * widthMultiplier, (this.py + (this.siz/2)) * heightMultiplier);

    angleMode(DEGREES);
    rotate(this.ang+90);

    imageMode(CENTER); 
    image(bulletImg, 0, 0,16*widthMultiplier,16*heightMultiplier);

    pop();
  }

  despawnCheck() {
    //does a small AABB check to see if the bullets are still on screen, if not they despawn (treats bullets and rectangles)
    if (!(this.px + this.siz > 0 && this.px < gameWidth && this.py + this.siz > 0 && this.py < gameHeight)) {
      return true;
    }

    return false;
  }

  update() {
    //updates the bullets position in the game
    let vx = Math.cos(radians(this.ang)) * this.vel;
    let vy = Math.sin(radians(this.ang)) * this.vel;

    this.ang += this.crv;
    this.px  += vx;
    this.py  += vy;
  }
}

function createBullets(type,amount,x1,y1,x2,y2,vel,minAng,maxAng,siz,crv) {
  //used to summon bullets with set properties

  for (let i = 0; i < amount; i++) {
    let px  = lerp(x1,x2,((i+1)/amount)); //if u want the bullets to spawn evenly along a line, this handles that using x1, x2, y1, and y2
    let py  = lerp(y1,y2,((i+1)/amount));

    let ang = (((maxAng - minAng)/amount)*i)+minAng; //if u want the bullets to spawn along a ring, or a semi circle, this handles that using min, and max Ang

    bullets.push(new Bullet(px,py,vel,ang,siz,crv));
  }
}