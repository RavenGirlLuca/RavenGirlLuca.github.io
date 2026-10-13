function drawGameBox() {
  //Draws a green border around the area the player can move
  fill("BLACK");
  strokeWeight(4);
  stroke(86,160,73);
  rect(GAMEBOXX*WINDOWMULTIPLIER,GAMEBOXY*WINDOWMULTIPLIER,GAMEBOXW*WINDOWMULTIPLIER,GAMEBOXH*WINDOWMULTIPLIER);
}

let statMenuX = (GAMEBOXX + GAMEBOXW) + 25;
let statMenuY = (0.375*GAMEHEIGHT) + 25;
let statMenuW = 175;
let statMenuH = 325;

let enemyX = (GAMEBOXX + GAMEBOXW) + 25;
let enemyY = 25;
let enemyW = 175;
let enemyH = 200;

let mobileButtonW      = 50;
let mobileButtonH      = 50;
let mobileButtonUpX    = statMenuX + ((statMenuW/2)-(mobileButtonW/2));
let mobileButtonUpY    = statMenuY+160;
let mobileButtonDownX  = statMenuX + ((statMenuW/2)-(mobileButtonW/2));
let mobileButtonDownY  = statMenuY+270;
let mobileButtonLeftX  = statMenuX + ((statMenuW/2)-((mobileButtonW*1.5)+5));
let mobileButtonLeftY  = statMenuY+215;
let mobileButtonRightX = statMenuX + ((statMenuW/2)+((mobileButtonW/2)+5));
let mobileButtonRightY = statMenuY+215;
let mobileButtonRunX   = statMenuX + ((statMenuW/2)-(mobileButtonW/2));
let mobileButtonRunY   = statMenuY+215;


let enemyName = "FELOS\nTHE PRISMATIC WITCH";

function drawStatMenu() {
  //Draws a green border around the players stats, including if their health, if theyre running, their name, and what difficulty their playing on, and if theire alive
  textAlign(LEFT);

  //Draws border
  fill("BLACK");
  strokeWeight(4);
  stroke(86,160,73);
  rect(statMenuX*WINDOWMULTIPLIER,statMenuY*WINDOWMULTIPLIER,statMenuW*WINDOWMULTIPLIER,statMenuH*WINDOWMULTIPLIER);

  //Draws Name

  //Draws Health
  fill("BLACK");
  strokeWeight(8);
  stroke("WHITE");

  rect((statMenuX+10)*WINDOWMULTIPLIER,(statMenuY+10)*WINDOWMULTIPLIER,(statMenuW-20)*WINDOWMULTIPLIER,(25)*WINDOWMULTIPLIER);
  
  noStroke();

  for (let i = 0; i < 5; i++) {
    if (i+1 <= player.liv) {
      fill(136,57,50);
    }
    else                   {
      fill(120,120,120);
    }

    rect(((statMenuX+10)+(31*i))*WINDOWMULTIPLIER,(statMenuY+10)*WINDOWMULTIPLIER,((statMenuW-20)/5)*WINDOWMULTIPLIER,(25)*WINDOWMULTIPLIER);
  }

  //Draws States
  fill("WHITE");
  textSize(9*WINDOWMULTIPLIER);

  if (player.run)  {
    text('RUNNING',(statMenuX+8)*WINDOWMULTIPLIER,(statMenuY+60)*WINDOWMULTIPLIER);
  }
  else             {
    text('WALKING',(statMenuX+8)*WINDOWMULTIPLIER,(statMenuY+60)*WINDOWMULTIPLIER);
  }

  if (!player.ded) {
    text('ALIVE',(statMenuX+8)*WINDOWMULTIPLIER,(statMenuY+90)*WINDOWMULTIPLIER);
  }
  else             {
    text('DEAD' ,(statMenuX+8)*WINDOWMULTIPLIER,(statMenuY+90)*WINDOWMULTIPLIER);
  }

  //Draws Score
  text("SCORE: " + player.scr,(statMenuX+8)*WINDOWMULTIPLIER,(statMenuY+120)*WINDOWMULTIPLIER);

  //Mobile Buttons
  if (platform === 'MOBILE') {
    if (mouseX > mobileButtonUpX*WINDOWMULTIPLIER && 
        mouseX < mobileButtonUpX*WINDOWMULTIPLIER + mobileButtonW*WINDOWMULTIPLIER && 
        mouseY > mobileButtonUpY*WINDOWMULTIPLIER && 
        mouseY < mobileButtonUpY*WINDOWMULTIPLIER + mobileButtonH*WINDOWMULTIPLIER) {
      fill(80,80,80);
      if (mouseIsPressed) {
        currentDir = 'UP';
      }
    }
    else {
      fill(159,159,159);
    } 

    rect(mobileButtonUpX*WINDOWMULTIPLIER,mobileButtonUpY*WINDOWMULTIPLIER,mobileButtonW*WINDOWMULTIPLIER,mobileButtonH*WINDOWMULTIPLIER);

    if (mouseX > mobileButtonDownX*WINDOWMULTIPLIER && 
        mouseX < mobileButtonDownX*WINDOWMULTIPLIER + mobileButtonW*WINDOWMULTIPLIER && 
        mouseY > mobileButtonDownY*WINDOWMULTIPLIER && 
        mouseY < mobileButtonDownY*WINDOWMULTIPLIER + mobileButtonH*WINDOWMULTIPLIER) {
      fill(80,80,80);
      if (mouseIsPressed) {
        currentDir = 'DOWN';
      }
    }
    else {
      fill(159,159,159);
    } 

    rect(mobileButtonDownX*WINDOWMULTIPLIER,mobileButtonDownY*WINDOWMULTIPLIER,mobileButtonW*WINDOWMULTIPLIER,mobileButtonH*WINDOWMULTIPLIER);

    if (mouseX > mobileButtonLeftX*WINDOWMULTIPLIER && 
        mouseX < mobileButtonLeftX*WINDOWMULTIPLIER + mobileButtonW*WINDOWMULTIPLIER && 
        mouseY > mobileButtonLeftY*WINDOWMULTIPLIER && 
        mouseY < mobileButtonLeftY*WINDOWMULTIPLIER + mobileButtonH*WINDOWMULTIPLIER) {
      fill(80,80,80);
      if (mouseIsPressed) {
        currentDir = 'LEFT';
      }
    }
    else {
      fill(159,159,159);
    } 

    rect(mobileButtonLeftX*WINDOWMULTIPLIER,mobileButtonLeftY*WINDOWMULTIPLIER,mobileButtonW*WINDOWMULTIPLIER,mobileButtonH*WINDOWMULTIPLIER);

    if (mouseX > mobileButtonRightX*WINDOWMULTIPLIER && 
        mouseX < mobileButtonRightX*WINDOWMULTIPLIER + mobileButtonW*WINDOWMULTIPLIER && 
        mouseY > mobileButtonRightY*WINDOWMULTIPLIER && 
        mouseY < mobileButtonRightY*WINDOWMULTIPLIER + mobileButtonH*WINDOWMULTIPLIER) {
      fill(80,80,80);
      if (mouseIsPressed) {
        currentDir = 'RIGHT';
      }
    }
    else {
      fill(159,159,159);
    } 

    rect(mobileButtonRightX*WINDOWMULTIPLIER,mobileButtonRightY*WINDOWMULTIPLIER,mobileButtonW*WINDOWMULTIPLIER,mobileButtonH*WINDOWMULTIPLIER);

    if (mouseX > mobileButtonRunX*WINDOWMULTIPLIER && 
        mouseX < mobileButtonRunX*WINDOWMULTIPLIER + mobileButtonW*WINDOWMULTIPLIER && 
        mouseY > mobileButtonRunY*WINDOWMULTIPLIER && 
        mouseY < mobileButtonRunY*WINDOWMULTIPLIER + mobileButtonH*WINDOWMULTIPLIER) {
      fill(80,80,80);
      if (mouseIsClicked) {
        mobileRun = !mobileRun;
      }
    }
    else {
      fill(159,159,159);
    } 

    rect(mobileButtonRunX*WINDOWMULTIPLIER,mobileButtonRunY*WINDOWMULTIPLIER,mobileButtonW*WINDOWMULTIPLIER,mobileButtonH*WINDOWMULTIPLIER);

    if (!mouseIsPressed) {
      currentDir = 'NONE';
    }
  }
}

function drawEnemy() {
  //Draws a border around a png (or gif if i feel like it) of the enemy, also draws their name
  textAlign(CENTER);

  //Draws border
  fill("BLACK");
  strokeWeight(4);
  stroke(86,160,73);
  rect(enemyX*WINDOWMULTIPLIER,enemyY*WINDOWMULTIPLIER,enemyW*WINDOWMULTIPLIER,enemyH*WINDOWMULTIPLIER);

  //Draws Enemy Image
  image(felosSprite,(enemyX+1)*WINDOWMULTIPLIER,(enemyY+1)*WINDOWMULTIPLIER,(enemyW-2)*WINDOWMULTIPLIER,(enemyH-27)*WINDOWMULTIPLIER);

  //Draws Enemy Name
  text(enemyName,(enemyX+(enemyW/2))*WINDOWMULTIPLIER,(enemyH+8)*WINDOWMULTIPLIER);
}

let buttonX = 20;
let buttonY = 200;
let buttonW = 400;
let buttonH = 80;

let version = 'v0.1.1-BETA';

function mainMenu() {
  //Draws main menu, allows you to choose from 3 dificulties and shows the title

  textAlign(CENTER);

  stroke("WHITE");
  strokeWeight(4);
  textSize(40*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > buttonY*WINDOWMULTIPLIER && mouseY < buttonY*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(64,49,141);
    if (mouseIsClicked) {
      player.dif = 1;
      nextAttackFrame = 30;
      state = 'GAME';
      felosMusic.start();
      menuMusic.stop();
    }
  }
  else {
    fill(120,105,196);
  } 

  rect(buttonX*WINDOWMULTIPLIER,buttonY*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+100)*WINDOWMULTIPLIER && mouseY < (buttonY+100)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(85,160,73);
    if (mouseIsClicked) {
      player.dif = 2;
      nextAttackFrame = 25;
      state = 'GAME';
      felosMusic.start();
      menuMusic.stop();
    }
  }
  else {
    fill(148,224,137);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+100)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+200)*WINDOWMULTIPLIER && mouseY < (buttonY+200)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(136,57,50);
    if (mouseIsClicked) {
      player.dif = 3;
      nextAttackFrame = 20;
      state = 'GAME';
      felosMusic.start();
      menuMusic.stop();
    }
  }
  else {
    fill(184,105,98);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+200)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+300)*WINDOWMULTIPLIER && mouseY < (buttonY+300)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      if (platform === 'PC') {
        platform = 'MOBILE';
      }
      else                   {
        platform = 'PC';
      }
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+300)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  noStroke();
  fill("WHITE");

  text("EASY",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+15)*WINDOWMULTIPLIER);
  text("NORMAL",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+115)*WINDOWMULTIPLIER);
  text("HARD",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+215)*WINDOWMULTIPLIER);

  if (platform === 'PC') {
    text("PC",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+315)*WINDOWMULTIPLIER);
  }
  else                   {
    text("MOBILE",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+315)*WINDOWMULTIPLIER);
  }

  textAlign(LEFT);
  textSize(40*WINDOWMULTIPLIER);
  text("TOWER\nOF THE\nPRISMATIC WITCH",10*WINDOWMULTIPLIER,60*WINDOWMULTIPLIER);

  textAlign(RIGHT);
  textSize(20*WINDOWMULTIPLIER);
  text(version,800*WINDOWMULTIPLIER,20*WINDOWMULTIPLIER);
}

let retryButtonX  = GAMEWIDTH*(1/4);
let retryButtonY  = (GAMEHEIGHT*(1/2))-50;

function deadMenu() {
  //After you die this starts, shows your score and adds a button to the screen that sends you to the main menu and resets all stats and score
  textAlign(CENTER);
  
  //Draws "Game Over"
  noStroke();
  fill("WHITE");
  textSize(39*WINDOWMULTIPLIER);

  text("GAME OVER",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/3))*WINDOWMULTIPLIER);

  //Draws Score
  text("SCORE: " + player.scr,(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(2/3))*WINDOWMULTIPLIER);

  //Try Again Button
  if (mouseX > retryButtonX*WINDOWMULTIPLIER && mouseX < retryButtonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > retryButtonY*WINDOWMULTIPLIER && mouseY < retryButtonY*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(136,57,50);
    if (mouseIsClicked) {
      player.px  = GAMEWIDTH/2;
      player.py  = GAMEHEIGHT/2;
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
      menuMusic.start();
      gameoverSFX.stop();
    }
  }
  else {
    fill(184,105,98);
  } 

  stroke('WHITE');
  strokeWeight(4);

  rect(retryButtonX*WINDOWMULTIPLIER,retryButtonY*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  noStroke();
  fill("WHITE");

  text("RETRY",(buttonW)*WINDOWMULTIPLIER,(retryButtonY+(buttonH/2)+15)*WINDOWMULTIPLIER);

}

function startMenu() {

  textAlign(CENTER);
  noStroke();
  fill("WHITE");
  textSize(64*WINDOWMULTIPLIER);

  text("CLICK ANYWHERE\nTO START",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/3))*WINDOWMULTIPLIER);

  if (mouseIsClicked) {
    mouseIsClicked = false;
    state = 'MENU';
    menuMusic.start();
  }
}