// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

//updates enemy position and speed after scrolling across screen
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x>550) {
        this.x = -100;
        this.speed = 250 + Math.floor(Math.random() * 300);
    };
    //check to see if player and enemies x and y positions (near) match
    if (player.x <= this.x + 40 &&
        player.x + 40 >= this.x &&
        player.y <= this.y + 40 &&
        player.y + 40 >= this.y) {
        //reset player position if true
        player.x = 200;
        player.y = 375;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player character constructor
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // sets boundaries for player character movement
    if (this.y > 375) {
        this.y = 375;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // resets player character to start upon reaching goal
    if (this.y < 0) {
        this.x = 200;
        this.y = 375;
    }
};
// draws player character on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// allows player movement using arrow keys
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    };
};
//variable declarations for characters
const allEnemies = [];
let bug;
const bugStart = [60, 140, 220];
const player = new Player(200, 375, 50);
//starting position and speed for each enemy bug
bugStart.forEach((posY) => {
    bug = new Enemy(0, posY, 200 + Math.floor(Math.random() * 600));
    allEnemies.push(bug);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
