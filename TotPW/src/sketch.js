// Tower of the Prismatic Witch
// Luca Kuin :3
// Sept 27, 26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

async function setup() {
  let { w, h } = calculateCanvasSize();
  createCanvas(w, h);

  loadImages();
}

function draw() {
  background('black');

  createBullets(":P",felosBulletBlank,5,100,100,100,100,1,0,0,10,0);

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].draw();

    //if bullet collides with player, delete it
    if (player.px + player.siz > bullets[i].px && player.px < bullets[i].px + bullets[i].siz && player.py + player.siz > bullets[i].py && player.py < bullets[i].py + bullets[i].siz) {
      player.bulletCol();
      bullets.splice(i,1); 
    }

    //if despawnCheck comes back as true, delete the bullet inside the array, should hypothetically save RAM... maybe
    else if (bullets[i].despawnCheck()) {
      bullets.splice(i,1); 
    }
  }

  player.update();
  player.draw();
}
