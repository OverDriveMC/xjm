var Ball = function(game) {
	var img = game.imageByName('ball')
		//o 是Object代表一切对象
	var o = {
		image: img.image,
		x: 100,
		y: 200,
		speedX: 5,
		speedY: 5,
		//保存是否被发射
		fired: false,
	}
	o.move = function() {
		if (o.fired) {
			//判断是否反向
			if (o.x < 0 || o.x + img.width > 400) {
				o.speedX *= -1
			}
			if (o.y < 0 || o.y > 400) {
				o.speedY *= -1
			}
			log('move')
			o.x += o.speedX
			o.y += o.speedY
		}
	}

	o.fire = function() {
		o.fired = true
	}
	o.rebound = function() {
		o.speedY *= -1
	}

	return o
}