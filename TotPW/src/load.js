//Important Global Variables
const VERSION = 'v0.3.3-BETA';

const GAMEBOXX = 25;
const GAMEBOXY = 25;
const GAMEBOXW = 550;
const GAMEBOXH = 550;

let state    = 'START';
let platform = 'PC';

let mouseIsClicked = false;

let currentDir = 'NONE';
let mobileRun  = false;

let enemySprite;
let enemyName;
let enemyBG;
let enemyMusic;
let currentBattle;

let currentAttackIndex = 0;
let currentAttackLoop  = 0;
let currentAttackFrame = 0;

//Dialog
let activeDialog = false;
let currentDialogLine = 0;
let currentDialog;
let currentDialogProfile;
let currentDialogName;
let isDialogEndBattle = false;

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
let acciaioBullet;
let bomb;
let bombShrap;
let playerTopNormal;
let playerBottomNormal;
let playerSkirtNormal;
let greenGuyTop;
let greenGuyBottom;
let greenGuyUFO;
let acciaioSprite;
let mainMenuBg0;
let arrowUp;
let arrowDown;
let arrowLeft;
let arrowRight;
let arrowUpRight;
let arrowDownLeft;
let arrowUpLeft;
let arrowDownRight;
let spiralClockwise;
let spiralCounterClockwise;

async function loadImages() {
  //Load Images
  felosBulletBlank   = await loadImage('/TotPW/src/assets/bullet.png');
  felosBulletRed     = await loadImage('/TotPW/src/assets/bulletred.png');
  felosBulletOrange  = await loadImage('/TotPW/src/assets/bulletorange.png');
  felosBulletYellow  = await loadImage('/TotPW/src/assets/bulletyellow.png');
  felosBulletGreen   = await loadImage('/TotPW/src/assets/bulletgreen.png');
  felosBulletBlue    = await loadImage('/TotPW/src/assets/bulletblue.png');
  felosBulletPurple  = await loadImage('/TotPW/src/assets/bulletpurple.png');
  acciaioBullet      = await loadImage('/TotPW/src/assets/acciaioBullet.png');
  bomb               = await loadImage('/TotPW/src/assets/bomb.png');
  bombShrap          = await loadImage('/TotPW/src/assets/bombShrap.png');
  playerTopNormal    = await loadImage('/TotPW/src/assets/playertop.png');
  playerBottomNormal = await loadImage('/TotPW/src/assets/playerbottom.png');
  playerSkirtNormal  = await loadImage('/TotPW/src/assets/playerskirt.png');
  greenGuyTop        = await loadImage('/TotPW/src/assets/greenguytop.png');
  greenGuyBottom     = await loadImage('/TotPW/src/assets/greenguybottom.png');
  greenGuyUFO        = await loadImage('/TotPW/src/assets/greenguyufo.png');
  acciaioSprite      = await loadImage('/TotPW/src/assets/acciaio.png');
  mainMenuBg0        = await loadImage('/TotPW/src/assets/felosBG.png');
  arrowUp            = await loadImage('/TotPW/src/assets/arrowup.png');
  arrowDown          = await loadImage('/TotPW/src/assets/arrowdown.png');
  arrowLeft          = await loadImage('/TotPW/src/assets/arrowleft.png');
  arrowRight         = await loadImage('/TotPW/src/assets/arrowright.png');
  arrowUpRight       = await loadImage('/TotPW/src/assets/arrowupright.png');
  arrowDownLeft      = await loadImage('/TotPW/src/assets/arrowdownleft.png');
  arrowUpLeft        = await loadImage('/TotPW/src/assets/arrowupleft.png');
  arrowDownRight     = await loadImage('/TotPW/src/assets/arrowdownright.png');
  spiralClockwise    = await loadImage('/TotPW/src/assets/spiralclockwise.png');
  spiralCounterClockwise = await loadImage('/TotPW/src/assets/spiralcounterclockwise.png');
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
  felosMusic   = await loadSound('/TotPW/src/assets/PRISMATIC-WITCH-I.ogg');
  acciaioMusic = await loadSound('/TotPW/src/assets/ACCIAIO.ogg');
  menuMusic    = await loadSound('/TotPW/src/assets/MENU-I.ogg');
  gameoverSFX  = await loadSound('/TotPW/src/assets/GAMEOVER-I.ogg');

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
  bossFirstJSON = await loadJSON('/TotPW/src/battles/bossFirst.json');
  bossFinalJSON = await loadJSON('/TotPW/src/battles/bossFinal.json');
}