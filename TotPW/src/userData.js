function loadData() {
  if (getItem('dataExists') === true) {
    player.name    = getItem('name');
    player.easyScr = getItem('easyScore');
    player.normScr = getItem('normalScore');
    player.hardScr = getItem('hardScore');
    player.mastScr = getItem('masterScore');
    player.masoScr = getItem('masochistScore');
    player.easyWin = getItem('easyComplete');
    player.normWin = getItem('normalComplete');
    player.hardWin = getItem('hardComplete');
    player.mastWin = getItem('masterComplete');
    player.masoWin = getItem('masochistComplete');
  }
  else {
    state = 'DATAINPUT';
  }
}

function saveData() {
  storeItem('name', player.name);
  storeItem('easyScore', player.easyScr);
  storeItem('normalScore', player.normScr);
  storeItem('hardScore', player.hardScr);
  storeItem('masterScore', player.mastScr);
  storeItem('masochistScore', player.masoScr);
  storeItem('easyComplete', player.easyWin);
  storeItem('normalComplete', player.normWin);
  storeItem('hardComplete', player.hardWin);
  storeItem('masterComplete', player.mastWin);
  storeItem('masochistComplete', player.masoWin);
}

function createData(inputName) {
  //Used when playing for the first time, create all player data then loads it using loadData()
  storeItem('dataExists', true);
  storeItem('name', inputName);
  storeItem('easyScore', 0);
  storeItem('normalScore', 0);
  storeItem('hardScore', 0);
  storeItem('masterScore', 0);
  storeItem('masochistScore', 0);
  storeItem('easyComplete', false);
  storeItem('normalComplete', false);
  storeItem('hardComplete', false);
  storeItem('masterComplete', false);
  storeItem('masochistComplete', false);

  loadData();
}