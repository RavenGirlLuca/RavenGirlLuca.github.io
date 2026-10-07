let player;

class Player {
  constructor() {
    this.baseSpeed = 3; //players base speed, should never change

    this.sensitivity = 4.5;  //these 3 are used in the skirt function
    this.gravity     = 0.2; 
    this.friction    = 0.5;

    this.px  = GAMEWIDTH/2;    //players x position in the world
    this.py  = GAMEHEIGHT/2;   //players y position in the world
    this.pvx = 0;               //players x velocity, used for the skirt
    this.spd = this.baseSpeed; //players speed, gets added to the player while moving
    this.siz = 15;             //player size, used for collision and drawing
    this.run = false;          //if shift is being held, this is true
    this.liv = 5;              //players lives, if it reaches 0 you DIE MWAHAHA!!!
    this.dif = 1;              //game difficulty, you take more damage at higher difficulties
    this.ded = false;          //player dead state, if true u cant do anything cuz ur ded
    this.scr = 0;              //players score, you gain more score the more attacks you survive
    this.srt = 0;              //skirt rotation, while the player is moving the skirt will be rotated with a physics sim to simulate cloth moving with inertia
    this.sps = this.px;        //skirt position, used with px to calculate how fast the players going
    this.skv = 0;               //skirt velocity
  }

  draw() {
    //draws the player

    image(playerTopNormal,   (this.px-(this.siz*0.25))*WINDOWMULTIPLIER,(this.py-(this.siz*0.5))*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER,);
    image(playerBottomNormal,(this.px-(this.siz*0.25))*WINDOWMULTIPLIER,(this.py+this.siz)*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER,);

    push();
    
    imageMode(CENTER);
    translate((this.px*WINDOWMULTIPLIER)+((this.siz*WINDOWMULTIPLIER)/2), (this.py*WINDOWMULTIPLIER)+((this.siz*WINDOWMULTIPLIER)/2));

    angleMode(DEGREES);
    rotate(-this.srt);

    image(playerSkirtNormal,0,(this.siz*1.25)*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER,(this.siz*1.5)*WINDOWMULTIPLIER);

    pop();
  }

  bulletCol() {
    //if this runs, take damage
    this.liv -= this.dif;
  }

  gameBoxCol(px,py) {
    //returns false if the players action will leave the box
    //return ((px > gameBoxX && px + this.siz < gameBoxX + gameBoxW && py > gameBoxY && py + this.siz < gameBoxY + gameBoxH ));
    return true; 
  }

  skirtPhysics() {
    //Applys a sort of cloth sim to the players skirt
    this.pvx = this.px - this.sps;
    
    this.sps = this.px;
    
    this.skv -= this.pvx * this.sensitivity;
    this.skv -= this.srt * this.gravity;
    this.skv *= this.friction;
    this.srt += this.skv;
    
    this.srt = constrain(this.srt, -5*this.spd, 5*this.spd);
  }

  update() {
    //handles most player functions that happen each frame
    if (!this.ded) {
      //Running
      this.run = (keyIsDown(SHIFT));
      if (this.run) {
        this.spd = this.baseSpeed*1.5;
      }
      else          {
        this.spd = this.baseSpeed;
      }

      //Movement
      if ((keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && ((keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)))) {
        this.spd *= 0.707;
      }

      if ((keyIsDown(UP_ARROW)) && this.gameBoxCol(this.px,this.py - this.spd))        {
        this.py -= this.spd;
      }
      if ((keyIsDown(DOWN_ARROW)) && this.gameBoxCol(this.px,this.py + this.spd))    {
        this.py += this.spd;
      }
      if ((keyIsDown(LEFT_ARROW)) && this.gameBoxCol(this.px - this.spd ,this.py))   {
        this.px -= this.spd;
      }
      if ((keyIsDown(RIGHT_ARROW)) && this.gameBoxCol(this.px + this.spd, this.py)) {
        this.px += this.spd;
      }

      this.skirtPhysics();

      if (this.liv <= 0) {
        this.ded = true;
      }
    }
    
    else {
      state = 'DEAD';
      felosMusic.stop();
      gameoverSFX.start();
    }
  }
}

player = new Player();