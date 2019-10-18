let WIDTH = window.innerWidth * 0.6;
let HEIGHT = window.innerHeight * 0.75;
let noiseScale = 0.01;
let smoothness = 80;
let offsetX = 0;
let offsetY = 0;
let maxY = HEIGHT * 0.8;
let blockSize = 2;
let speedX = 1;
let speedY = 5;
let velX = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
	background(140, 190, 214);
	
	if (keyIsDown(LEFT_ARROW)) {
		velX = (velX - speedX) * 0.9;
	} else if (keyIsDown(RIGHT_ARROW)) {
		velX = (velX + speedX) * 0.9;
	} else {
		velX *= 0.9;
	}
	
	offsetX += velX;
	
	if (keyIsDown(UP_ARROW)) {
		offsetY += speedY;
	} else if (keyIsDown(DOWN_ARROW)) {
		offsetY -= speedY;
	}
	
	for (let x = 0; x <= WIDTH; x += blockSize) {
		let noiseVal = noise((offsetX + x) * noiseScale, noiseScale);
		let y = noiseVal * smoothness + height + offsetY - maxY;
		let finalY = round(y / blockSize) * blockSize - 10;
		noStroke();
		
		fill(155, 118, 83);
		rect(x, HEIGHT, blockSize, finalY - HEIGHT);
		fill(126, 200, 80);
		rect(x, finalY, blockSize, 10);
	}
}

window.onresize = () => {
	WIDTH = window.innerWidth * 0.6;
	HEIGHT = window.innerHeight * 0.75;
}
