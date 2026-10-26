class Player {
  constructor() {
    this.name    = 'MISSINGNAME';

    this.easyScr = 0;
    this.normScr = 0;
    this.hardScr = 0;
    this.mastScr = 0;
    this.masoScr = 0;

    this.easyWin = false;
    this.normWin = false;
    this.hardWin = false;
    this.mastWin = false;
    this.masoWin = false;

    this.baseSpeed = 3; //players base speed, should never change

    this.sensitivity = 4.5;  //these 3 are used in the skirt function
    this.gravity     = 0.2; 
    this.friction    = 0.5;

    this.px  = GAMEBOXX+(GAMEBOXW/2);    //players x position in the world
    this.py  = GAMEBOXY+(GAMEBOXH/2);   //players y position in the world
    this.pvx = 0;              //players x velocity, used for the skirt
    this.spd = this.baseSpeed; //players speed, gets added to the player while moving
    this.siz = 15;             //player size, used for collision and drawing
    this.run = false;          //if shift is being held, this is true
    this.liv = 5;              //players lives, if it reaches 0 you DIE MWAHAHA!!!
    this.dif = 1;              //game difficulty, you take more damage at higher difficulties
    this.ded = false;          //player dead state, if true u cant do anything cuz ur ded
    this.scr = 0;              //players score, you gain more score the more attacks you survive
    this.srt = 0;              //skirt rotation, while the player is moving the skirt will be rotated with a physics sim to simulate cloth moving with inertia
    this.sps = this.px;        //skirt position, used with px to calculate how fast the players going
    this.skv = 0;              //skirt velocity
    this.grz = false;          //graze, if the player gets close to a bullet they get points but they cant infinitly grind the same bullet, this controls that
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
    return ((px > GAMEBOXX && px + this.siz < GAMEBOXX + GAMEBOXW && py > GAMEBOXY && py + this.siz < GAMEBOXY + GAMEBOXH )); 
  }

  skirtPhysics() {
    //Applys a sort of cloth sim to the players skirt
    this.pvx = this.px - this.sps;
    
    this.sps = this.px;
    
    this.skv -= this.pvx * this.sensitivity;
    this.skv -= this.srt * this.gravity;
    this.skv *= this.friction;
    this.srt += this.skv;
    
    this.srt = constrain(this.srt, -2*(this.spd*2), 2*(this.spd*2));
  }

  reset() {
    this.px  = GAMEBOXX+(GAMEBOXW/2);    
    this.py  = GAMEBOXY+(GAMEBOXH/2);   
    this.pvx = 0;              
    this.spd = this.baseSpeed; 
    this.siz = 15;             
    this.run = false;   
    this.fcs = false;
    this.liv = 5;              
    this.dif = 1;              
    this.ded = false;          
    this.scr = 0;              
    this.srt = 0;              
    this.sps = this.px;        
    this.skv = 0; 
  }

  update() {
    //handles most player functions that happen each frame
    if (!activeDialog) {
      if (!this.ded) {
        //Running
        this.run = (keyIsDown(SHIFT) || mobileRun);
        this.fcs = (keyIsDown(CONTROL));
        if (this.run) {
          this.spd = this.baseSpeed*1.5;
        }
        else if (this.fcs) {
          this.spd = this.baseSpeed*0.5;
        }
        else          {
          this.spd = this.baseSpeed;
        }

        //Movement
        if ((keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && ((keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)))) {
          this.spd *= 0.707;
        }

        if ((keyIsDown(UP_ARROW) || currentDir === 'UP') && this.gameBoxCol(this.px,this.py - this.spd))        {
          this.py -= this.spd;
        }
        if ((keyIsDown(DOWN_ARROW) || currentDir === 'DOWN') && this.gameBoxCol(this.px,this.py + this.spd))    {
          this.py += this.spd;
        }
        if ((keyIsDown(LEFT_ARROW) || currentDir === 'LEFT') && this.gameBoxCol(this.px - this.spd ,this.py))   {
          this.px -= this.spd;
        }
        if ((keyIsDown(RIGHT_ARROW) || currentDir === 'RIGHT') && this.gameBoxCol(this.px + this.spd, this.py)) {
          this.px += this.spd;
        }

        this.skirtPhysics();

        if (cheaterMode) this.liv = 5;

        if (this.liv <= 0) {
          this.ded = true;
        }
      }
      
      else {
        state = 'DEAD';
        enemyMusic.stop();
        gameoverSFX.start();

        if      (player.dif === 1 && player.easyScr < player.scr) player.easyScr = player.scr;
        else if (player.dif === 2 && player.normScr < player.scr) player.normScr = player.scr;
        else if (player.dif === 3 && player.hardScr < player.scr) player.hardScr = player.scr;
        else if (player.dif === 4 && player.mastScr < player.scr) player.mastScr = player.scr;
        else if (player.dif === 5 && player.masoScr < player.scr) player.masoScr = player.scr;
        saveData();
      }
    }
  }
}

player = new Player();