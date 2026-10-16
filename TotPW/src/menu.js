let version = 'v0.1.6-BETA';

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

let currentInputName = '';

let enemyName = "FELOS\nTHE PRISMATIC WITCH";

function drawGameBox() {
  //Draws a green border around the area the player can move
  fill("BLACK");
  strokeWeight(4);
  stroke(86,160,73);
  rect(GAMEBOXX*WINDOWMULTIPLIER,GAMEBOXY*WINDOWMULTIPLIER,GAMEBOXW*WINDOWMULTIPLIER,GAMEBOXH*WINDOWMULTIPLIER);
}


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
let buttonH = 60;

function mainMenu() {
  //Draws main menu, allows you to choose from 3 dificulties and shows the title
  image(mainMenuBg0, 0,0, GAMEWIDTH*WINDOWMULTIPLIER, GAMEHEIGHT*WINDOWMULTIPLIER);

  textAlign(CENTER);

  stroke("WHITE");
  strokeWeight(4);
  textSize(40*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > buttonY*WINDOWMULTIPLIER && mouseY < buttonY*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(64,49,141);
    if (mouseIsClicked) {
      mouseIsClicked = false;
      state = 'DIFMENU';
    }
  }
  else {
    fill(120,105,196);
  } 

  rect(buttonX*WINDOWMULTIPLIER,buttonY*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+80)*WINDOWMULTIPLIER && mouseY < (buttonY+80)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    //fill(85,160,73);
    fill(80,80,80);
    if (mouseIsClicked) {
      mouseIsClicked = false;
      //state = 'BONUSMENU';
    }
  }
  else {
    //fill(148,224,137);
    fill(80,80,80);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+80)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+160)*WINDOWMULTIPLIER && mouseY < (buttonY+160)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(136,57,50);
    if (mouseIsClicked) {
      mouseIsClicked = false;
      state = 'OPTIONSMENU';
    }
  }
  else {
    fill(184,105,98);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+160)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+240)*WINDOWMULTIPLIER && mouseY < (buttonY+240)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      mouseIsClicked = false;
      saveData();
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+240)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+320)*WINDOWMULTIPLIER && mouseY < (buttonY+320)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      mouseIsClicked = false;
      window.location.href = '../';
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+320)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  noStroke();
  fill("WHITE");

  text("PLAY",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+15)*WINDOWMULTIPLIER);
  text("BONUS",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+95)*WINDOWMULTIPLIER);
  text("OPTIONS",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+175)*WINDOWMULTIPLIER);
  text("SAVE",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+255)*WINDOWMULTIPLIER);
  text("EXIT",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+335)*WINDOWMULTIPLIER);

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
  //After you die player starts, shows your score and adds a button to the screen that sends you to the main menu and resets all stats and score
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
      mouseIsClicked = false;
      player.reset();
      state = 'MAINMENU';

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
    state = 'MAINMENU';
    menuMusic.start();
  }
}

let diffMenuButtonX = 30;
let diffMenuButtonY = GAMEHEIGHT*(3/8);
let diffMenuButtonW = (GAMEWIDTH/2)-40;
let diffMenuButtonH = 80;

function diffMenu() {
  textAlign(CENTER);
  noStroke();
  fill("WHITE");
  textSize(64*WINDOWMULTIPLIER);

  text("SELECT A\nDIFFICULTY",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/8))*WINDOWMULTIPLIER);

  textSize(40*WINDOWMULTIPLIER);
  stroke("WHITE");
  strokeWeight(4);

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

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+80)*WINDOWMULTIPLIER && mouseY < (buttonY+80)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
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

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+80)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+160)*WINDOWMULTIPLIER && mouseY < (buttonY+160)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
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

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+160)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+240)*WINDOWMULTIPLIER && mouseY < (buttonY+240)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      player.dif = 4;
      nextAttackFrame = 15;
      state = 'GAME';
      felosMusic.start();
      menuMusic.stop();
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+240)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  if (mouseX > buttonX*WINDOWMULTIPLIER && mouseX < buttonX*WINDOWMULTIPLIER + buttonW*WINDOWMULTIPLIER && mouseY > (buttonY+320)*WINDOWMULTIPLIER && mouseY < (buttonY+320)*WINDOWMULTIPLIER + buttonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      player.dif = 5;
      nextAttackFrame = 10;
      state = 'GAME';
      felosMusic.start();
      menuMusic.stop();
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(buttonX*WINDOWMULTIPLIER,(buttonY+320)*WINDOWMULTIPLIER,buttonW*WINDOWMULTIPLIER,buttonH*WINDOWMULTIPLIER);

  noStroke();
  fill("WHITE");

  text("EASY",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+15)*WINDOWMULTIPLIER);
  text("NORMAL",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+95)*WINDOWMULTIPLIER);
  text("HARD",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+175)*WINDOWMULTIPLIER);
  text("MASTER",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+255)*WINDOWMULTIPLIER);
  text("MASOCHIST",(buttonX+(buttonW/2))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+335)*WINDOWMULTIPLIER);

  textAlign(LEFT);

  text("SCR: " + player.easyScr,(buttonX+(buttonW+20))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+15)*WINDOWMULTIPLIER);
  text("SCR: " + player.normScr,(buttonX+(buttonW+20))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+95)*WINDOWMULTIPLIER);
  text("SCR: " + player.hardScr,(buttonX+(buttonW+20))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+175)*WINDOWMULTIPLIER);
  text("SCR: " + player.mastScr,(buttonX+(buttonW+20))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+255)*WINDOWMULTIPLIER);
  text("SCR: " + player.masoScr,(buttonX+(buttonW+20))*WINDOWMULTIPLIER,(buttonY+(buttonH/2)+335)*WINDOWMULTIPLIER);
}

let settingsButtonX = 20;
let settingsButtonY = 120;
let settingsButtonW = 240;
let settingsButtonH = 60;

function settingsMenu() {
  textAlign(CENTER);
  noStroke();
  fill("WHITE");
  textSize(64*WINDOWMULTIPLIER);

  text("SETTINGS",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/8))*WINDOWMULTIPLIER);

  textSize(20*WINDOWMULTIPLIER);
  stroke("WHITE");
  strokeWeight(4);

  //ROW 1

  if (mouseX > settingsButtonX*WINDOWMULTIPLIER && 
    mouseX < settingsButtonX*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+0)*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+0)*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      storeItem('dataExists', false);
      state = 'DATAINPUT';
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(settingsButtonX*WINDOWMULTIPLIER,(settingsButtonY+0)*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+0)*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+0)*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      player.easyScr = 0;
      player.normScr = 0;
      player.hardScr = 0;
      player.mastScr = 0;
      player.masoScr = 0;

      player.easyWin = false;
      player.normWin = false;
      player.hardWin = false;
      player.mastWin = false;
      player.masoWin = false;
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER,(settingsButtonY+0)*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+0)*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+0)*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      currentInputName = '';
      state = 'NAMEINPUT';
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+0)*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  //ROW 2

  if (mouseX > settingsButtonX*WINDOWMULTIPLIER && 
    mouseX < settingsButtonX*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      cheaterMode = !cheaterMode;
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(settingsButtonX*WINDOWMULTIPLIER,(settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER,(settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+(settingsButtonH + 20))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  //ROW 3

  if (mouseX > settingsButtonX*WINDOWMULTIPLIER && 
    mouseX < settingsButtonX*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(settingsButtonX*WINDOWMULTIPLIER,(settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER,(settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+(2*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  //ROW 4

  if (mouseX > settingsButtonX*WINDOWMULTIPLIER && 
    mouseX < settingsButtonX*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect(settingsButtonX*WINDOWMULTIPLIER,(settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (settingsButtonW + 20))*WINDOWMULTIPLIER,(settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+(3*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  //Page Buttons

  if (mouseX > (settingsButtonX)*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX)*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX)*WINDOWMULTIPLIER,(settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  if (mouseX > (settingsButtonX + (1 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (1 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      state = 'MAINMENU';
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (1 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);


  if (mouseX > (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER && 
    mouseX < (settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER + settingsButtonW*WINDOWMULTIPLIER && 
    mouseY > (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER && 
    mouseY < (settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER + settingsButtonH*WINDOWMULTIPLIER) {
    fill(80,80,80);
    if (mouseIsClicked) {
      
    }
  }
  else {
    fill(159,159,159);
  } 

  rect((settingsButtonX + (2 * (settingsButtonW + 20)))*WINDOWMULTIPLIER,(settingsButtonY+(4*(settingsButtonH + 20)))*WINDOWMULTIPLIER,settingsButtonW*WINDOWMULTIPLIER,settingsButtonH*WINDOWMULTIPLIER);

  noStroke();
  fill("WHITE");

  text("RESET DATA",  (settingsButtonX+(settingsButtonW/2))*WINDOWMULTIPLIER                         ,(settingsButtonY+(settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("RESET SCORE", (settingsButtonX+((settingsButtonW+20)+(settingsButtonW/2)))*WINDOWMULTIPLIER  ,(settingsButtonY+(settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("CHANEGE NAME",(settingsButtonX+((2*(settingsButtonW+20))+settingsButtonW/2))*WINDOWMULTIPLIER,(settingsButtonY+(settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("CHEATER MODE",(settingsButtonX+(settingsButtonW/2))*WINDOWMULTIPLIER                         ,(settingsButtonY+((settingsButtonH+20)+(settingsButtonH/2))+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((settingsButtonW+20)+(settingsButtonW/2)))*WINDOWMULTIPLIER  ,(settingsButtonY+((settingsButtonH+20)+(settingsButtonH/2))+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((2*(settingsButtonW+20))+settingsButtonW/2))*WINDOWMULTIPLIER,(settingsButtonY+((settingsButtonH+20)+(settingsButtonH/2))+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+(settingsButtonW/2))*WINDOWMULTIPLIER                         ,(settingsButtonY+((2*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((settingsButtonW+20)+(settingsButtonW/2)))*WINDOWMULTIPLIER  ,(settingsButtonY+((2*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((2*(settingsButtonW+20))+settingsButtonW/2))*WINDOWMULTIPLIER,(settingsButtonY+((2*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+(settingsButtonW/2))*WINDOWMULTIPLIER                         ,(settingsButtonY+((3*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((settingsButtonW+20)+(settingsButtonW/2)))*WINDOWMULTIPLIER  ,(settingsButtonY+((3*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("NULL",        (settingsButtonX+((2*(settingsButtonW+20))+settingsButtonW/2))*WINDOWMULTIPLIER,(settingsButtonY+((3*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("<--",         (settingsButtonX+(settingsButtonW/2))*WINDOWMULTIPLIER                         ,(settingsButtonY+((4*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("MAINMENU",    (settingsButtonX+((settingsButtonW+20)+(settingsButtonW/2)))*WINDOWMULTIPLIER  ,(settingsButtonY+((4*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
  text("-->",         (settingsButtonX+((2*(settingsButtonW+20))+settingsButtonW/2))*WINDOWMULTIPLIER,(settingsButtonY+((4*(settingsButtonH+20))+settingsButtonH/2)+10)*WINDOWMULTIPLIER);
}

function dataMenu() {
  textAlign(CENTER);
  noStroke();
  fill("WHITE");
  textSize(64*WINDOWMULTIPLIER);

  text("ENTER A\nUSERNAME",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/8))*WINDOWMULTIPLIER);

  textSize(40*WINDOWMULTIPLIER);
  stroke("WHITE");
  strokeWeight(4);
  fill('BLACK');


  rect(20*WINDOWMULTIPLIER,300*WINDOWMULTIPLIER,(GAMEWIDTH-40)*WINDOWMULTIPLIER,80*WINDOWMULTIPLIER);

  noStroke();

  if (currentInputName === '') {
    fill("GREY");
    text("ENTER A NAME...",(GAMEWIDTH/2)*WINDOWMULTIPLIER,355*WINDOWMULTIPLIER)
  }
  else {
    fill("WHITE");
    text(currentInputName,(GAMEWIDTH/2)*WINDOWMULTIPLIER,355*WINDOWMULTIPLIER)
  }

  if(!(currentInputName === '') && keyIsDown(ENTER) && currentInputName.length <= 8) {
    createData(currentInputName);
    state = 'MAINMENU';
  }
}

function nameMenu() {
  textAlign(CENTER);
  noStroke();
  fill("WHITE");
  textSize(64*WINDOWMULTIPLIER);

  text("ENTER A\nUSERNAME",(GAMEWIDTH/2)*WINDOWMULTIPLIER,(GAMEHEIGHT*(1/8))*WINDOWMULTIPLIER);

  textSize(40*WINDOWMULTIPLIER);
  stroke("WHITE");
  strokeWeight(4);
  fill('BLACK');


  rect(20*WINDOWMULTIPLIER,300*WINDOWMULTIPLIER,(GAMEWIDTH-40)*WINDOWMULTIPLIER,80*WINDOWMULTIPLIER);

  noStroke();

  if (currentInputName === '') {
    fill("GREY");
    text("ENTER A NAME...",(GAMEWIDTH/2)*WINDOWMULTIPLIER,355*WINDOWMULTIPLIER)
  }
  else {
    fill("WHITE");
    text(currentInputName,(GAMEWIDTH/2)*WINDOWMULTIPLIER,355*WINDOWMULTIPLIER)
  }

  if(!(currentInputName === '') && keyIsDown(ENTER) && currentInputName.length <= 8) {
    storeItem('name', currentInputName);
    state = 'MAINMENU';
  }
}