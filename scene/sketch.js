// Interactive Scene
// Luca Kuin :P
// Sept 22, 26
//
// Extra for Experts:
// Made a cool window size to game size converter multiplier thingy
// Made a really cool system to handle bullets inside a single array AND handle their deletion when off screen

let state = 'MENU';

let gameWidth  = 800;
let gameHeight = 600;

let gameBoxX = 25;
let gameBoxY = 25;
let gameBoxW = 550;
let gameBoxH = 550;

let widthMultiplier  = 0;
let heightMultiplier = 0;

let enemyImg;
let font;

let mouseIsClicked = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();

  widthMultiplier  = width/gameWidth;   //width draw conversion multiplier
  heightMultiplier = height/gameHeight; //height draw conversion multiplier

  enemyImg = await loadImage('/scene/assets/felos.png');
  font     = await loadFont('/scene/fonts/C64_Pro-STYLE.otf');

  textFont(font);
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
    this.liv = 500;              //players lives, if it reaches 0 you DIE MWAHAHA!!!
    this.dif = 1;              //game difficulty, you take more damage at higher difficulties
    this.ded = false;          //player dead state, if true u cant do anything cuz ur ded
    this.scr = 0;              //players score, you gain more score the more attacks you survive
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
    else state = 'DEAD';
  }
}

player = new Player();


//----------------------//
//---ATTACKS HANDLING---//
//----------------------//

let attackFrame     = 0;              //Counts frames since an attack started
let nextAttackFrame = 30;             //Once attackFrame reaches this number, an attack happens and attack frame resets
let currentAttack   = 4;              //Controls what will happen when an attack happens and how long nextAttackFrame is
let attacks         = 0;              //Goes up everytime an attack happens, once it goes up a certain amount a new attack starts, then it resets

function attack() {
  //attack function, most logic surrounding the main attack loop is stored here

  if (attackFrame >= nextAttackFrame) {
    if (player.dif === 1) {
      if (currentAttack === 0) {
        createBullets(":P", 7,575,25,575,25,5,0+(attacks*5),360+(attacks*5),10,0);
        createBullets(":P", 7,25,25,25,25,5,0+(attacks*5),360+(attacks*5),10,0);
        
        if (attacks >= 50) {    //once the attack has been repeated a set amount of times, do these actios
          attacks = 0;          //reset attack counter to 0
          currentAttack += 1;   //switch to next attack in the loop
          player.scr += 10;     //add 10 the the player score for surviving the attack
        }
      }

      else if (currentAttack === 1) {
        createBullets(":P", 15,-500+(attacks*10),25,575+(attacks*10),25,5,90,90,10,0);
        createBullets(":P", 15,-500+(attacks*10),575,575+(attacks*10),575,5,270,270,10,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        createBullets(":P", 8,-500+(attacks*10),25,575+(attacks*10),25,3,90,90,10,0);
        createBullets(":P", 8,25,-500+(attacks*10),25,575+(attacks*10),3,0,0,10,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        createBullets(":P", 7,-500+(attacks*10),25,575+(attacks*10),25,5,90,90,10,0.2);
        createBullets(":P", 7,25,-500+(attacks*10),25,575+(attacks*10),5,0,0,10,0.2);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        createBullets(":P",10,-15,25,550,25,5,90,90,10,0);
        createBullets(":P",2,575,0+((Math.sin(radians(45*attacks)))*100),575,400+((Math.sin(radians(45*attacks)))*100),5,180,180,10,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {
        createBullets(":P", 20,275,275,275,275,5,0+(attacks*10),360+(attacks*10),10,0);

        if (attacks >= 50) {
          attacks = 0;
          currentAttack = 0; //reset the current attack, restarting the loop
          player.scr += 10; 
          if (nextAttackFrame > 10) nextAttackFrame -= 1; //makes the next loop slightly harder up to a set limit
        }
      }
    }

    else if (player.dif === 2) {
      if (currentAttack === 0) {
        createBullets(":P", 13,575,25,575,25,5.5,0+(attacks*5),360+(attacks*5),10,0);
        createBullets(":P", 13,25,25,25,25,5.5,0+(attacks*5),360+(attacks*5),10,0);
        
        if (attacks >= 60) {    
          attacks = 0;          
          currentAttack += 1;   
          player.scr += 10;     
        }
      }

      else if (currentAttack === 1) {
        createBullets(":P", 20,-600+(attacks*10),25,575+(attacks*10),25,6,90,90,10,0);
        createBullets(":P", 20,-600+(attacks*10),575,575+(attacks*10),575,6,270,270,10,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        createBullets(":P", 12,-600+(attacks*10),25,575+(attacks*10),25,3,90,90,10,0);
        createBullets(":P", 12,25,-600+(attacks*10),25,575+(attacks*10),3,0,0,10,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        createBullets(":P", 15,-750+(attacks*10),25,575+(attacks*10),25,5,90,90,10,0.2);
        createBullets(":P", 15,25,-750+(attacks*10),25,575+(attacks*10),5,0,0,10,0.2);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        createBullets(":P",13,-15,25,550,25,7,90,90,10,0);
        createBullets(":P",4,575,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),5,180,180,10,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 5) {
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 6) {
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {

        if (attacks >= 60) {
          attacks = 0;
          currentAttack = 0;
          player.scr += 10; 
          if (nextAttackFrame > 7) nextAttackFrame -= 1;
        }
      }
    }

    else if (player.dif === 3) {
      if (currentAttack === 0) {
        
        if (attacks >= 70) {    
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 1) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 5) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 6) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 7) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 8) {
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {

        if (attacks >= 70) {
          attacks = 0;
          currentAttack = 0; 
          player.scr += 10; 
          if (nextAttackFrame > 5) nextAttackFrame -= 1;
        }
      }
    }

    attacks += 1;    //add 1 to the attack counter
    attackFrame = 0; //reset attack waiting frame counter
  }

  attackFrame += 1; //add one to the frame counter
}


//-------------------//
//---MENU HANDLING---//
//-------------------//

function drawGameBox() {
  //Draws a green border around the area the player can move
  fill("BLACK")
  strokeWeight(4);
  stroke(86,160,73);
  rect(gameBoxX*widthMultiplier,gameBoxY*heightMultiplier,gameBoxW*widthMultiplier,gameBoxH*heightMultiplier);
}

let statMenuX = (gameBoxX + gameBoxW) + 25;
let statMenuY = (0.5*gameHeight) + 25;
let statMenuW = 175;
let statMenuH = 250;

let enemyX = (gameBoxX + gameBoxW) + 25;
let enemyY = 25;
let enemyW = 175;
let enemyH = 260;

let enemyName = "FELOS, THE PRISMATIC WITCH";

function drawStatMenu() {
  //Draws a green border around the players stats, including if their health, if theyre running, their name, and what difficulty their playing on, and if theire alive
  textAlign(LEFT);

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
  textSize(15);

  if (player.run)  text('RUNNING',(statMenuX+8)*widthMultiplier,(statMenuY+125)*heightMultiplier);
  else             text('WALKING',(statMenuX+8)*widthMultiplier,(statMenuY+125)*heightMultiplier);

  if (!player.ded) text('ALIVE',(statMenuX+8)*widthMultiplier,(statMenuY+175)*heightMultiplier);
  else             text('DEAD' ,(statMenuX+8)*widthMultiplier,(statMenuY+175)*heightMultiplier);

  //Draws Score
  text("SCORE: " + player.scr,(statMenuX+8)*widthMultiplier,(statMenuY+225)*heightMultiplier);
}

function drawEnemy() {
  //Draws a border around a png (or gif if i feel like it) of the enemy, also draws their name

  //Draws border
  fill("BLACK");
  strokeWeight(4);
  stroke(86,160,73);
  rect(enemyX*widthMultiplier,enemyY*heightMultiplier,enemyW*widthMultiplier,enemyH*heightMultiplier);

  //Draws Enemy Image
  image(enemyImg,(enemyX+1)*widthMultiplier,(enemyY+1)*heightMultiplier,(enemyW-2)*widthMultiplier,(enemyH-26)*heightMultiplier);

  //Draws Enemy Name
  text(enemyName,(enemyX+8)*widthMultiplier,(enemyH+15)*heightMultiplier);
}

let buttonX = 200;
let buttonY = 200;
let buttonW = 400;
let buttonH = 80;

function mainMenu() {
  //Draws main menu, allows you to choose from 3 dificulties and shows the title
  textAlign(CENTER);

  stroke("WHITE")
  strokeWeight(4);
  textSize(64);

  if (mouseX > buttonX*widthMultiplier && mouseX < buttonX*widthMultiplier + buttonW*widthMultiplier && mouseY > buttonY*heightMultiplier && mouseY < buttonY*heightMultiplier + buttonH*heightMultiplier) {
    fill(64,49,141);
    if (mouseIsClicked) {
      player.dif = 1;
      nextAttackFrame = 30;
      state = 'GAME';
    }
  }
  else {
    fill(120,105,196);
  } 

  rect(buttonX*widthMultiplier,buttonY*heightMultiplier,buttonW*widthMultiplier,buttonH*heightMultiplier);

  if (mouseX > buttonX*widthMultiplier && mouseX < buttonX*widthMultiplier + buttonW*widthMultiplier && mouseY > (buttonY+100)*heightMultiplier && mouseY < (buttonY+100)*heightMultiplier + buttonH*heightMultiplier) {
    fill(85,160,73);
    if (mouseIsClicked) {
      player.dif = 2;
      nextAttackFrame = 25;
      state = 'GAME';
    }
  }
  else {
    fill(148,224,137);
  } 

  rect(buttonX*widthMultiplier,(buttonY+100)*heightMultiplier,buttonW*widthMultiplier,buttonH*heightMultiplier);

  if (mouseX > buttonX*widthMultiplier && mouseX < buttonX*widthMultiplier + buttonW*widthMultiplier && mouseY > (buttonY+200)*heightMultiplier && mouseY < (buttonY+200)*heightMultiplier + buttonH*heightMultiplier) {
    fill(136,57,50);
    if (mouseIsClicked) {
      player.dif = 3;
      nextAttackFrame = 20;
      state = 'GAME';
    }
  }
  else {
    fill(184,105,98);
  } 

  rect(buttonX*widthMultiplier,(buttonY+200)*heightMultiplier,buttonW*widthMultiplier,buttonH*heightMultiplier);

  noStroke();
  fill("WHITE")

  text("EASY",(buttonW)*widthMultiplier,(buttonY+(buttonH/2)+15)*heightMultiplier);
  text("NORMAL",(buttonW)*widthMultiplier,(buttonY+(buttonH/2)+115)*heightMultiplier);
  text("HARD",(buttonW)*widthMultiplier,(buttonY+(buttonH/2)+215)*heightMultiplier);

  textSize(64);
  text("TOWER OF THE PRISMATIC WITCH",(gameWidth/2)*widthMultiplier,100);

  textSize(82);
  text("DEMO",(gameWidth/2)*widthMultiplier,200);
}

let retryButtonX  = gameWidth*(1/4);
let retryButtonY  = (gameHeight*(1/2))-50;

function deadMenu() {
  //After you die this starts, shows your score and adds a button to the screen that sends you to the main menu and resets all stats and score
  textAlign(CENTER);
  
  //Draws "Game Over"
  noStroke();
  fill("WHITE")
  textSize(64);

  text("GAME OVER",(gameWidth/2)*widthMultiplier,(gameHeight*(1/3))*heightMultiplier);

  //Draws Score
  text("SCORE: " + player.scr,(gameWidth/2)*widthMultiplier,(gameHeight*(2/3))*heightMultiplier);

  //Try Again Button
  if (mouseX > retryButtonX*widthMultiplier && mouseX < retryButtonX*widthMultiplier + buttonW*widthMultiplier && mouseY > retryButtonY*heightMultiplier && mouseY < retryButtonY*heightMultiplier + buttonH*heightMultiplier) {
    fill(136,57,50);
    if (mouseIsClicked) {
      player.px  = gameWidth/2;
      player.py  = gameHeight/2;
      player.liv = 5;
      player.dif = 1;     
      player.ded = false;
      player.scr = 0;
      state = 'MENU';

      attackFrame     = 0;
      nextAttackFrame = 30;
      currentAttack   = 0;
      attacks         = 0;

      bullets = [];
    }
  }
  else {
    fill(184,105,98);
  } 

  rect(retryButtonX*widthMultiplier,retryButtonY*heightMultiplier,buttonW*widthMultiplier,buttonH*heightMultiplier);

}

function draw() {
  background(0);

  if (state === 'MENU') {
    mainMenu();
  }

  if (state === 'GAME') {
    //update loop for bg graphics
    drawGameBox();
    drawStatMenu();
    drawEnemy();

    //update loop for enemy attacks
    attack();

    //update loop for player
    player.update();
    player.draw();

    //update loop for each bullet inside the bullets array
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

  if (state === 'DEAD') {
    deadMenu();
  }

  mouseIsClicked = false;
}

function mouseClicked() {
  mouseIsClicked = true;
}