
var positions = [80, 100, 200, 300, 500, 700];
var positionsStar = [10, 50, 150, 300, 500, 800];



var Character = function(img, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = img;
};


var Star = function() {
    Character.call(this, 'images/star.png', -100, 30);
    this.y = positionsStar[Math.floor(Math.random() * 9)];
    this.speed = Math.floor(Math.random() * 100) + 100;
};

Star.prototype = Object.create(Character.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 800) {
        allStars.push(new Star());
        var starsList = allStars.indexOf(this);
        allStars.splice(starsList, 1);
    }
};


Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Enemy = function() {
    
    Character.call(this, 'images/enemy-bug.png', -100, 200);
    
    this.y = positions[Math.floor(Math.random() * 4)];
    
    this.speed = Math.floor(Math.random() * 200) + 100;
};



Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

   
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    
    if (this.x >= 800) {
        allEnemies.push(new Enemy());
        
        var enemiesList = allEnemies.indexOf(this);
        allEnemies.splice(enemiesList, 1);
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
  
    Character.call(this, 'images/char-pink-girl.png', 400, 600);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(gameLevel);
};


function playerDies() {
    player.reset();

}

function gotPoint() {
    player.sprite = 'images/char-princess-girl.png';

}


var displayScoreLevel = function(currentLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];
    scoreLevelDiv.innerHTML = 'Level: ' + currentLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
      if (!(allEnemies[i].y + 70 < this.y ||
        allEnemies[i].y > this.y + 70 ||
        allEnemies[i].x + 70 < this.x ||
        allEnemies[i].x > this.x + 70)) {
        playerDies();
        console.log("Collided!")
        }
    }
};


Player.prototype.checkCollections = function() {
    for (var i = 0; i < allStars.length; i++) {
        if (!(allStars[i].y + 70 < this.y || 
            allStars[i].y > this.y + 70 ||
            allStars[i].x + 70 < this.x ||
            allStars[i].x > this.x + 70)) {
            gotPoint();

        }
    }
}


Player.prototype.handleInput = function(e) {
    if (e === 'left' && this.x != 0) {
        this.x -= 100;
    } else if (e === 'right' && this.x != 800) {
        this.x += 100;
    } else if (e === 'up') {
        this.y = this.y - 80;
    } else if (e === 'down' && this.y != 600) {
        this.y = this.y + 80;
    }
    e = null;
};

// When player wins, give an alert and reset player
Player.prototype.update = function() {
    if (this.y < 50) { 
        gameLevel += 1;
        console.log('current level: ' + gameLevel);
        increaseDifficulty(gameLevel);
        this.reset();
    }
}

Player.prototype.reset = function() {
    this.x = 400;
    this.y = 600;
    this.sprite = 'images/char-pink-girl.png';
};

var allEnemies = [];
for (var i = 0; i < 2; i++) {
    allEnemies.push(new Enemy());
}

var increaseDifficulty = function(numEnemies) {
    
    allEnemies.length = 0;

    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 106);
        
        allEnemies.push(enemy);
    }
};

var player = new Player(202.5, 383, 50);
var gameLevel = 1;


var scoreLevelDiv = document.createElement('div');
var allStars = [];
for (var i = 0; i < 2; i++) {
    allStars.push(new Star());
}

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

