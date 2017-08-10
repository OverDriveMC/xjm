var loadLevel = function(n) {
	//level是数组,下标从0开始
	n = n - 1
	var level = levels[n]
	var blocks = []
	for (var i = 0; i < level.length; i++) {
		var p = level[i]
		var b = Block(p)
		blocks.push(b)
	}
	return blocks
}
var blocks = []
var enableDebugMode = function(enable) {
	if (!enable) {
		return
	}
	window.paused = false
	window.addEventListener('keydown', function(event) {
			var k = event.key
			log(k)
			if (k == 'p') {
				//暂停功能
				window.paused = !window.paused
			} else if ('1234567'.includes(event.key)) {
				blocks = loadLevel(Number(k))
			}
		})
		//控制速度
		//change事件只在结束时触发
	document.querySelector("#id-input-speed").addEventListener('input', function(event) {
		var input = event.target
		window.fps = Number(input.value)
	})
}


//定义入口,所有函数都放入入口函数中
var __main = function() {

	enableDebugMode(true)
	var game = Game(60)

	var paddle = Paddle()
		//Ball和paddle很类似,都有x,y
	var ball = Ball()

	blocks = loadLevel(1)

	game.registerAction('a', function() {
		paddle.moveLeft()
	})
	game.registerAction('d', function() {
		paddle.moveRight(game.canvas.width)
	})

	game.registerAction('f', function() {
		ball.fire()
	})

	game.update = function() {
		//暂停
		if (window.paused) {
			return
		}


		ball.move()
			//判断相撞,矩形是否相交
		if (paddle.collide(ball)) {
			ball.rebound()
		}
		//判断ball和blocks相撞
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.collide(ball)) {
				log('block 相撞')
				block.kill()
				ball.rebound()
			}
		}
	}
	game.draw = function() {
		game.drawImage(paddle)
		game.drawImage(ball)
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.alive) {
				game.drawImage(block)
			}
		}
		game.context.fillText('分数:', 10, 290)
	}

}
__main()