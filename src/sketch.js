let CANVAS_HEIGHT = 500;
let CANVAS_WIDTH = 500;
let level, circle2

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    level = new Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 100, false, 'black', 30);
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

function draw() {
    background(255);
    let v1 = createVector(mouseX - level.x, mouseY - level.y);
    v1.normalize();
    // if (dist(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
    //     
    // } else {
    //     
    // }

    drawLevel();
    drawPlayer(createVector(level.x, level.y), v1.mult(level.radius));
}

function drawPlayer(base, vec) {
    translate(base.x, base.y);
    circle2.x = vec.x;
    circle2.y = vec.y;
    circle2.update();
}

function drawLevel() {
    level.update();
}

function Circle(x, y, radius, fillColor, strokeColor, strokeWeigh) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeigh;

    this.update = function() {
        this.draw();
    };

    this.draw = function() {
        if (this.strokeColor) {
            strokeWeight(this.strokeWeight);
            stroke(this.strokeColor);
        } else {
            noStroke();
        }

        if (this.color) {
            fill(this.color);
        } else {
            noFill();
        }

        circle(this.x, this.y, this.radius * 2);
    };
}