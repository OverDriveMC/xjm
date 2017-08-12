var Paddle = function(game) {
	var img = game.imageByName('paddle')
	var o = {
		image: img.image,
		x: 100,
		y: 250,
		speed: 15,
	}

	o.move = function(x, maxpos) {
		if (x < 0) {
			x = 0
		}
		if (x > maxpos - o.image.width) {
			x = maxpos - o.image.width
		}
		o.x = x
	}


	o.moveLeft = function() {
		o.move(o.x - o.speed)
	}
	o.moveRight = function(maxpos) {
		o.move(o.x + o.speed, maxpos)
	}

	o.collide = function(ball) {
		if (ball.y + ball.image.height > o.y) {
			if (ball.x > o.x && ball.x < o.x + o.image.width) {
				log('相撞')
				return true
			}
		}
		return false
	}


	return o
}