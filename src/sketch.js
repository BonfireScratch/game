let CANVAS_HEIGHT = 540;
let CANVAS_WIDTH = 720;
let level, levelBack, planet, player, canvas, deltaTime;
var dead, timeBetweenSpawns, timer, enemies, timeSinceStart;

function setup() {
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    level = new Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 100, false, 'black', 20);
    levelBack = new Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 90, false, 'gray', 15);
    planet = new Circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 40, 'black', 'gray', 5);
    player = new Circle(undefined, undefined, 30, 'red', false, undefined, undefined);
    dead = false;
    timer = 0;
    timeSinceStart = 0;
    timeBetweenSpawns = 2000;
    enemies = [];
}

function draw() {
    background(255);
    deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;
    
    if (!dead) {
        timer += deltaTime;
        timeSinceStart += deltaTime;

        if (timer > timeBetweenSpawns) {
            spawnEnemy();
            timer = 0;
            if (timeBetweenSpawns >= 400) {
                timeBetweenSpawns -= 2;
            }
        }
        
        drawLevel();
        drawPlayer();
        drawEnemies();
        drawText();
    }
}

function spawnEnemy() {
    let x = getRndInteger(-CANVAS_WIDTH / 2, CANVAS_WIDTH / 2);
    let y = CANVAS_HEIGHT / 2;
    enemies.push(new Enemy(x, y, 10, 'blue', false, undefined));
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemy = enemies[i];

        if (intersect(player, enemy)) {
            enemies.splice(i, i + 1);
        } else {
            enemy.update();
        }
    }
}

function intersect(circle, rectangle) {
    let circleDistance = createVector(abs(circle.x - rectangle.x), abs(circle.y - rectangle.y));

    if (circleDistance.x > (rectangle.sideLength / 2 + circle.radius) || circleDistance.y > (rectangle.sideLength / 2 + circle.radius)) {
        return false;
    }

    if (circleDistance.x <= (rectangle.sideLength / 2) || circleDistance.y <= (rectangle.sideLength / 2)) {
        return true;
    }

    let cornerDistance = (circleDistance.x - rectangle.sideLength / 2) ^ 2 + (circleDistance.y - rectangle.sideLength / 2) ^ 2;

    return (cornerDistance <= (circle.radius ^ 2));
}

function drawPlayer() {
    let v1 = createVector(mouseX - level.x, mouseY - level.y);
    v1.normalize();
    vec = v1.mult(level.radius);
    translate(level.x, level.y);
    player.x = vec.x;
    player.y = vec.y;
    player.update();
}

function drawLevel() {
    levelBack.update();
    level.update();
    planet.update();
}

function drawText() {
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text(round(timeSinceStart / 1000), -CANVAS_WIDTH / 3, -CANVAS_HEIGHT / 3);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Enemy(x, y, sideLength, fillColor, strokeColor, strokeWeigh) {
    this.x = x;
    this.y = y;
    this.sideLength = sideLength;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWeigh = strokeWeigh;

    this.update = function() {
        var dist = createVector(planet.x - this.x - CANVAS_WIDTH / 2, planet.y - this.y - CANVAS_HEIGHT / 2);
        dist.normalize();

        this.x += dist.x * (3000 - timeBetweenSpawns) / 1000;
        this.y += dist.y * (3000 - timeBetweenSpawns) / 1000;

        this.draw();
    };

    this.draw = function() {
        if (this.strokeColor) {
            strokeWeight(this.strokeWeight);
            stroke(this.strokeColor);
        } else {
            noStroke();
        }

        if (this.fillColor) {
            fill(this.fillColor);
        } else {
            noFill();
        }

        rectMode(CENTER);
        rect(this.x, this.y, this.sideLength, this.sideLength, 3);
    };
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
