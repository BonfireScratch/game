let WIDTH = window.innerWidth * 0.5;
let HEIGHT = window.innerHeight * 0.7;
let noiseScale = 0.01;
let smoothness = 80;
let offsetX = 0;
let offsetY = 0;
let maxY = HEIGHT * 0.8;
let blockSize = 2;
let speedX = 1;
let speedY = 5;
let velX = 0;
let velY = -10;
let jumpHeight = 11;
let onAir = false;
let dir = 0;
let lastDir = 0;
let fpsShown = true;
let fps = 40;
let noiseArray = [];
let chunkX = 2000;
let backgroundColorDay, backgroundColorNight;

setup = () => {
	generateTerrain();
    createCanvas(WIDTH, HEIGHT);
	backgroundColorDay = color(140, 190, 214);
	backgroundColorNight = color(46, 51, 90);
}

draw = () => {
	background(lerpColor(backgroundColorDay, backgroundColorNight, frameCount / 10000));
	
	controls();
	
	for (let x = 0; x <= WIDTH; x += blockSize) {
		let y = noiseArray[floor(offsetX + x) + chunkX] * smoothness + height + offsetY - maxY;
		let finalY = round(y / blockSize) * blockSize;
		noStroke();
		
		fill(136, 140, 141);
		rect(x, HEIGHT, blockSize, finalY - HEIGHT);
		fill(155, 118, 83);
		rect(x, finalY, blockSize, blockSize * 10);
		fill(126, 200, 80);
		rect(x, finalY, blockSize, blockSize * 2);
	}
	
	if (fpsShown) {
		fill(0);
		text(fps, 20, 30);
		
		if (frameCount % 10 == 0) {
			fps = round(getFrameRate());
		}
	}
}

controls = () => {
	if (keyIsDown(LEFT_ARROW)) {
		velX = (velX - speedX) * 0.9;
		dir = -10;
	} else if (keyIsDown(RIGHT_ARROW)) {
		velX = (velX + speedX) * 0.9;
		dir = 10;
	} else {
		velX *= 0.9;
	}
	
	if (dir != lastDir) {
		offsetX += dir;
	}
	
	offsetX += velX;
	
	offsetX = (offsetX <= -chunkX) ? -chunkX : ((offsetX >= chunkX - WIDTH) ? chunkX - WIDTH : offsetX);
	
	if (keyIsDown(UP_ARROW) && !onAir) {
		onAir = true;
		velY = jumpHeight;
	}
	
	if (velY > -jumpHeight + 1) {
		velY -= 1;
		if (onAir) offsetY += velY;
	} else if (velY == -jumpHeight + 1) {
		velY = 0;
		onAir = false;
	}
	
	lastDir = dir;
}

generateTerrain = () => {
	noiseSeed(random(0, 1000));
	noiseArray = [];
	
	for (let x = -chunkX; x <= chunkX; x++) {
		let noiseVal = noise(x * blockSize * noiseScale);
		noiseArray.push(noiseVal);
	}
}

toggleFPS = () => {
	if (fpsShown) {
		fpsShown = false;
	} else {
		fpsShown = true;
	}
}

window.onresize = () => {
	WIDTH = window.innerWidth * 0.6;
	HEIGHT = window.innerHeight * 0.75;
	createCanvas(WIDTH, HEIGHT);
}
