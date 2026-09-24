// Interactive Scene
// Luca Kuin :P
// Sept 22, 26
//
// Extra for Experts:
// Made a cool window size to game size converter multiplier thingy
// Made a really cool system to handle bullets inside a single array AND handle their deletion when off screen

let gameWidth  = 800;
let gameHeight = 600;

let gameBoxX = 25;
let gameBoxY = 25;
let gameBoxW = 550;
let gameBoxH = 550;

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
    noStroke()
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

function createBullets(type,amount,x1,y1,x2,y2,vel,minAng,maxAng,siz,crv) {
  //used to summon bullets with set properties

  for (let i = 0; i < amount; i++) {
    let px  = lerp(x1,x2,((i+1)/amount)); //if u want the bullets to spawn evenly along a line, this handles that using x1, x2, y1, and y2
    let py  = lerp(y1,y2,((i+1)/amount));

    let ang = (((maxAng - minAng)/amount)*i)+minAng; //if u want the bullets to spawn along a ring, or a semi circle, this handles that using min, and max Ang

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
    if (!this.ded) fill(136,57,50);
    else           fill(120,120,120);
    noStroke()
    rect(this.px*widthMultiplier,this.py*heightMultiplier,this.siz*widthMultiplier,this.siz*heightMultiplier);
  }

  bulletCol() {
    //if this runs, take damage
    this.liv -= this.dif;
  }

  gameBoxCol(px,py) {
    //returns false if the players action will leave the box
    return ((px > gameBoxX && px + this.siz < gameBoxX + gameBoxW && py > gameBoxY && py + this.siz < gameBoxY + gameBoxH )) 
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

      if (keyIsDown(UP_ARROW) && this.gameBoxCol(this.px,this.py - this.spd))     this.py -= this.spd;
      if (keyIsDown(DOWN_ARROW) && this.gameBoxCol(this.px,this.py + this.spd))   this.py += this.spd;
      if (keyIsDown(LEFT_ARROW) && this.gameBoxCol(this.px - this.spd ,this.py))  this.px -= this.spd;
      if (keyIsDown(RIGHT_ARROW) && this.gameBoxCol(this.px + this.spd, this.py)) this.px += this.spd;

      if (this.liv <= 0) this.ded = true;
    }
  }
}

player = new Player();

//--------------------//
//---WORLD HANDLING---//
//--------------------//

function drawGameBox() {
  //Draws a green border around the area the player can move
  fill("BLACK")
  strokeWeight(4);
  stroke(86,160,73);
  rect(gameBoxX*widthMultiplier,gameBoxY*heightMultiplier,gameBoxW*widthMultiplier,gameBoxH*heightMultiplier);
}

let statMenuX = (gameBoxX + gameBoxW) + 25;
let statMenuY = ((1/3)*gameHeight) + 25;
let statMenuW = 175;
let statMenuH = 350;

function drawMenu() {
  //Draws a green border around the players stats, including if their health, if theyre running, their name, and what difficulty their playing on, and if theire alive
  
  //Draws border
  fill("BLACK")
  strokeWeight(4);
  stroke(86,160,73);
  rect(statMenuX*widthMultiplier,statMenuY*heightMultiplier,statMenuW*widthMultiplier,statMenuH*heightMultiplier);

  //Draws Name

  //Draws Health
  fill("BLACK")
  strokeWeight(8);
  stroke("WHITE");

  rect((statMenuX+10)*widthMultiplier,(statMenuY+75)*heightMultiplier,(statMenuW-20)*widthMultiplier,(25)*heightMultiplier);
  
  noStroke();

  for (let i = 0; i < 5; i++) {
    if (i+1 <= player.liv) fill(136,57,50);
    else                   fill(120,120,120);

    rect(((statMenuX+10)+(31*i))*widthMultiplier,(statMenuY+75)*heightMultiplier,((statMenuW-20)/5)*widthMultiplier,(25)*heightMultiplier)
  }

  //Draws States
  fill("WHITE");
  textSize(25);

  if (player.run) text('RUNNING',(statMenuX+8)*widthMultiplier,(statMenuY+125)*heightMultiplier);
  else            text('WALKING',(statMenuX+8)*widthMultiplier,(statMenuY+125)*heightMultiplier);

  if (!player.ded) text('ALIVE',(statMenuX+8)*widthMultiplier,(statMenuY+175)*heightMultiplier);
  else             text('DEAD' ,(statMenuX+8)*widthMultiplier,(statMenuY+175)*heightMultiplier);
}

function drawEnemy() {

}

function draw() {
  background(0);

  //createBullets("heh",20,400,50,400,50,5,0,360,10,0);

  //update loop for bg graphics
  drawGameBox();
  drawMenu();

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
