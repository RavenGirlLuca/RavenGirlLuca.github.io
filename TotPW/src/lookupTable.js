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
        "acciaioSprite"     : acciaioSprite
    }

    musicLookupTable = {
        "acciaioMusic" : acciaioMusic,
        "felosMusic" : felosMusic
    }
}