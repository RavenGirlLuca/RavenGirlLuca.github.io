function drawIndicatorGrid(grid) {
  if (!grid || grid.length === 0) return;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (!(grid[y][x][0] === 0)) {
        fill(255, 165, 0, grid[y][x][0] * 25);
        noStroke();

        rect(
          ((x * (GAMEBOXW/grid[y].length)) + GAMEBOXX)*WINDOWMULTIPLIER,
          ((y * (GAMEBOXH/grid.length))    + GAMEBOXY)*WINDOWMULTIPLIER,
          (GAMEBOXW/grid[y].length)*WINDOWMULTIPLIER,
          (GAMEBOXH/grid.length)*WINDOWMULTIPLIER
        );

        if (!(grid[y][x][1] === 0)) {
          push();

          imageMode(CENTER);
          image(
            imageLookupTable[grid[y][x][1]],
            (((x * (GAMEBOXW/grid[y].length)) + GAMEBOXX) + ((GAMEBOXW/grid[y].length)/2))*WINDOWMULTIPLIER,
            (((y * (GAMEBOXH/grid.length)) + GAMEBOXY)    + ((GAMEBOXH/grid.length)/2))*WINDOWMULTIPLIER,
            ((GAMEBOXW/grid[y].length) - 25)*WINDOWMULTIPLIER,
            ((GAMEBOXH/grid.length) - 25)*WINDOWMULTIPLIER
          );

          pop();
        }
      }
    }
  }
}