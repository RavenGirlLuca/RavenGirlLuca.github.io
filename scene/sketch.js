// Interactive Scene
// Luca Kuin :P
// Sept 22, 26
//
// Extra for Experts:
// Made a cool window size to game size converter multiplier thingy
// Made a really cool system to handle bullets inside a single array AND handle their deletion when off screen

let gameWidth  = 800;
let gameHeight = 600;

let widthMultiplier  = 0;
let heightMultiplier = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  widthMultiplier  = width/gameWidth;   //width draw conversion multiplier
  heightMultiplier = height/gameHeight; //height draw conversion multiplier
}

//---------------------//
//---BULLET HANDLING---//
//---------------------//

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
    fill("WHITE");
    rect(this.px*widthMultiplier,this.py*heightMultiplier,this.siz*widthMultiplier,this.siz*heightMultiplier);
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

function spawnBullets(style,amount,x1,y1,x2,y2,vel,angMin,angMax,siz,crv) {
  for(let i = 0; i < amount; i++) {
    let px  = lerp(x1,x2,((i+1)/amount));
    let py  = lerp(y1,y2,((i+1)/amount));
    let ang = ((angMax - angMin)/amount) * (i+1);

    bullets.push(new Bullet(px,py,vel,ang,siz,crv));
  }
}

//---------------------//
//---PLAYER HANDLING---//
//---------------------//

class Player {
  constructor() {
    this.baseSpeed = 3; //players base speed, should never change

    this.px  = gameWidth/2;    //players x position in the world
    this.py  = gameHeight/2;   //players y position in the world
    this.spd = this.baseSpeed; //players speed, gets added to the player while moving
    this.siz = 15;             //player size, used for collision and drawing
    this.run = false;          //if shift is being held, this is true
    this.liv = 5;              //players lives, if it reaches 0 you DIE MWAHAHA!!!
    this.dif = 1;              //game difficulty, you take more damage at higher difficulties
    this.ded = false;          //player dead state, if true u cant do anything cuz ur ded
  }

  draw() {
    //draws the player, same system as bullet draw
    if (!this.ded) fill("RED");
    else           fill("GREY");
    rect(this.px*widthMultiplier,this.py*heightMultiplier,this.siz*widthMultiplier,this.siz*heightMultiplier);
  }

  bulletCol() {
    this.liv -= this.dif;
  }

  update() {
    //handles most player functions that happen each frame
    if (!this.ded) {
      if (this.liv <= 0) this.ded = true;

      //Running
      this.run = keyIsDown(SHIFT);
      if (this.run) this.spd = this.baseSpeed*1.5;
      else          this.spd = this.baseSpeed;

      //Movement
      if ((keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && ((keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)))) this.spd * 0.707;

      if (keyIsDown(UP_ARROW))    this.py -= this.spd;
      if (keyIsDown(DOWN_ARROW))  this.py += this.spd;
      if (keyIsDown(LEFT_ARROW))  this.px -= this.spd;
      if (keyIsDown(RIGHT_ARROW)) this.px += this.spd;
    }
  }
}

player = new Player();



function draw() {
  background(220);

  spawnBullets("word",25,800,0,0,600,3,0,0,10,0);

  //update loop for player
  player.update();
  player.draw();

  //update loop for each bullet inside the bullets array
  if (!player.ded) {
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].update();
      bullets[i].draw();

      //if bullet collides with player, delete it
      if (player.px + player.siz > bullets[i].px && player.px < bullets[i].px + bullets[i].siz && player.py + player.siz > bullets[i].py && player.py < bullets[i].py + bullets[i].siz) {
        player.bulletCol();
        bullets.splice(i,1); 
      }

      //if despawnCheck comes back as true, delete the bullet inside the array, should hypothetically save RAM... maybe
      if (bullets[i].despawnCheck()) {
        bullets.splice(i,1); 
      }
    }
  }
}
