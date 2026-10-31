let imageLookupTable = {};
let musicLookupTable = {};
let jsonArray  = [];

function buildLookupTable() {
  //Builds all Lookup Tables with Required Game Content
  imageLookupTable = {
    "playerTop"         : playerTopNormal,
    "playerBottom"      : playerBottomNormal,
    "playerSkirt"       : playerSkirtNormal,
    "felosBulletRed"    : felosBulletRed,
    "felosBulletOrange" : felosBulletOrange,
    "felosBulletYellow" : felosBulletYellow,
    "felosBulletGreen"  : felosBulletGreen,
    "felosBulletBlue"   : felosBulletBlue,
    "felosBulletPurple" : felosBulletPurple,
    "felosSprite"       : felosSprite,
    "acciaioSprite"     : acciaioSprite,
    "acciaioBullet"     : acciaioBullet,
    "bomb"              : bomb,
    "bombShrap"         : bombShrap,
    "arrowUp"           : arrowUp,
    "arrowDown"         : arrowDown,
    "arrowLeft"         : arrowLeft,
    "arrowRight"        : arrowRight,
    "arrowUpRight"      : arrowUpRight,
    "arrowDownLeft"     : arrowDownLeft,
    "arrowUpLeft"       : arrowUpLeft,
    "arrowDownRight"    : arrowDownRight,
    "spiralClockwise"   : spiralClockwise,
    "spiralCounterClockwise" : spiralCounterClockwise
  }

  musicLookupTable = {
    "acciaioMusic" : acciaioMusic,
    "felosMusic" : felosMusic
  }

  jsonArray  = [
    bossFirstJSON
  ]
}

function addLookupTable(table, itemName, itemData) {
  //Adds data to existing lookup tables, used mainly for modding
  table[itemName] = itemData;
}