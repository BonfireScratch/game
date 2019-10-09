let noiseScale = 0.01;
let smoothness = 80;
let offsetX = 0;
let speed = 10;

function setup() {
    createCanvas(480, 360);
}

function draw() {
	background(0);
	
	if (keyIsDown(LEFT_ARROW)) {
		offsetX -= speed;
	} else if (keyIsDown(RIGHT_ARROW)) {
		offsetX += speed;
	}
	
	for (let x = 0; x <= width; x++) {
		let noiseVal = noise((offsetX + x) * noiseScale, noiseScale);
		stroke(500);
		line(x, noiseVal * smoothness, x, height);
	}
}
