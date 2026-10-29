let imageLookupTable = {}
let musicLookupTable = {}

function buildLookupTable() {
    imageLookupTable = {
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
}