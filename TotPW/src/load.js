//Important Global Variables
const VERSION = 'v0.2.1-BETA';

const GAMEBOXX = 25;
const GAMEBOXY = 25;
const GAMEBOXW = 550;
const GAMEBOXH = 550;

let state    = 'START';
let platform = 'PC';

let mouseIsClicked = false;

let currentDir = 'NONE';
let mobileRun  = false;

//Settings
let cheaterMode = false;

//Define Images
let felosBulletBlank;
let felosBulletRed;
let felosBulletOrange;
let felosBulletYellow;
let felosBulletGreen;
let felosBulletBlue;
let felosBulletPurple;
let playerTopNormal;
let playerBottomNormal;
let playerSkirtNormal;
let mainMenuBg0;

async function loadImages() {
  //Load Images
  felosBulletBlank   = await loadImage('/TotPW/src/assets/bullet.png');
  felosBulletRed     = await loadImage('/TotPW/src/assets/bulletred.png');
  felosBulletOrange  = await loadImage('/TotPW/src/assets/bulletorange.png');
  felosBulletYellow  = await loadImage('/TotPW/src/assets/bulletyellow.png');
  felosBulletGreen   = await loadImage('/TotPW/src/assets/bulletgreen.png');
  felosBulletBlue    = await loadImage('/TotPW/src/assets/bulletblue.png');
  felosBulletPurple  = await loadImage('/TotPW/src/assets/bulletpurple.png');
  playerTopNormal    = await loadImage('/TotPW/src/assets/playertop.png');
  playerBottomNormal = await loadImage('/TotPW/src/assets/playerbottom.png');
  playerSkirtNormal  = await loadImage('/TotPW/src/assets/playerskirt.png');
  mainMenuBg0        = await loadImage('/TotPW/src/assets/felosBG.png');
}

//Define GIFs
let felosSprite;

async function loadGIFs() {
  //Load GIFs
  felosSprite = await loadImage('/TotPW/src/assets/felos.gif');
}

//Define Audios
let felosMusic;
let menuMusic;
let gameoverSFX;

async function loadAudio() {
  //Load Audio
  felosMusic  = await loadSound('/TotPW/src/assets/PRISMATIC-WITCH-I.ogg');
  menuMusic   = await loadSound('/TotPW/src/assets/MENU-I.ogg');
  gameoverSFX = await loadSound('/TotPW/src/assets/GAMEOVER-I.ogg');

  felosMusic.loop(true);
  menuMusic.loop(true);
}

//Define Fonts
let C64Font;

async function loadFonts() {
  //Load Fonts
  font = await loadFont('/TotPW/src/assets/fonts/C64_Pro-STYLE.otf');

  textFont(font);
}

//Define JSONs
let bossFinalJSON;

async function loadJSONs() {
  //Load JSONs
  bossFinalJSON = await loadJSON('/TotPW/src/battles/bossFinal.json');
}