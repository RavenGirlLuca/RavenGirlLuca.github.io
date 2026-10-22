function startDialog(string, name, img) {
  activeDialog = true;
  currentDialog = string;
  currentDialogName =  name;
  currentDialogProfile = img;
}

function endDialog() {
  activeDialog = false;
  currentDialog = null;
  currentDialogName =  null;
  currentDialogProfile = null;
}

function drawDialog() {
    
}

function updateDialog() {
  if (keyIsDown(ENTER)) {
    endDialog();
  }
}