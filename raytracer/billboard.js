let billboards = [];

let testImage;

async function testAddBillboard() {
    testImage = await loadImage('/TotPW/src/assets/felos.gif');
    let x = 200;
    let y = 200;
    let size = 50;

    billboards.push({
        img: testImage,
        x: x,
        y: y,
        size: size
    })
}