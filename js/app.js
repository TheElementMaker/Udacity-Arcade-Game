var numWins = 0;
// Enemies our player must avoid
class Enemy {
	constructor(x, y, movement){
		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'images/enemy-bug.png';
	}
	update(dt) {
		//Reseting the bug to start over again
		if(this.x > 505){
			this.x = -150;
		}
		//Doing Player collisons detections and reset wins to 0
		if(player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y){
			player.x = 200;
			player.y = 380;
			numWins = 0;
		}
		//Update the bugs pos
		this.x += this.movement * dt;
	};
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, movment){
		this.x = x;
		this.y = y;
		this.movement = movment;
		this.sprite = 'images/char-boy.png';
	}
	handleInput(keyCode) {
		switch (keyCode) {
			case 'left':
				this.x -= this.movement + 50;
				break;
			case 'up':
				this.y -= this.movement + 30;
				break;
			case 'right':
				this.x += this.movement + 50;
				break;
			case 'down':
				this.y += this.movement + 30;
				break;
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	update() {
		document.getElementById('scoreCount').innerHTML = 'Number of wins: '+numWins;
		//Border for the map and stop movment outside
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.y < 0){
			numWins++;
			this.y = 380;
		}
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 400, 50);
let enemyPosition = [60, 140, 220];

enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
	// console.log(allEnemies);
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