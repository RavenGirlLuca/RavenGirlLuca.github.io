function startDialog(string, name, img) {
  activeDialog = true;
  currentDialog = string;
  currentDialogName =  name;
  currentDialogProfile = img;
}

function endDialog() {
  activeDialog = false;
  isDialogEndBattle = false;
  currentDialogLine = 0;
  currentDialog = null;
  currentDialogName =  null;
  currentDialogProfile = null;
}

function drawDialog() {
  push();

  noStroke();
  fill(0);
  rect(0 * WINDOWMULTIPLIER,
      (GAMEHEIGHT*(3/5)) * WINDOWMULTIPLIER,
       GAMEWIDTH * WINDOWMULTIPLIER,
      (GAMEHEIGHT*(2/5)) * WINDOWMULTIPLIER,
  )

  image(currentDialogProfile,25 * WINDOWMULTIPLIER,
                           ((GAMEHEIGHT*(3/5)) + 25)*WINDOWMULTIPLIER,
                           ((GAMEHEIGHT*(2/5)) - 50)*WINDOWMULTIPLIER,
                           ((GAMEHEIGHT*(2/5)) - 50)*WINDOWMULTIPLIER);

  noStroke();
  fill(255);
  textAlign(LEFT);
  textSize(18*WINDOWMULTIPLIER);
  textLeading(45*WINDOWMULTIPLIER);
  text(currentDialog[currentDialogLine],240*WINDOWMULTIPLIER,420*WINDOWMULTIPLIER);

  strokeWeight(4);
  stroke(86,160,73);
  noFill()
  rect(25 * WINDOWMULTIPLIER,
    ((GAMEHEIGHT*(3/5)) + 25) * WINDOWMULTIPLIER,
      (GAMEWIDTH - 50) * WINDOWMULTIPLIER,
    ((GAMEHEIGHT*(2/5)) - 50) * WINDOWMULTIPLIER,
  )

  pop();
}

function updateDialog() {
  if (currentDialogLine >= currentDialog.length - 1) {
    if (isDialogEndBattle) {
      endBattle2();
    }
    else {
      enemyMusic.start();
    }
    endDialog();
  }
  else {
    currentDialogLine++;
  }
}