var Game = function(fps, images, runCallback) {

	var g = {
		actions: {},
		keydowns: {},
		//images是一个对象,里面是图片的引用名字和图片路径,程序会在所有图片载入成功后运行
		images: {},
	}
	var canvas = document.querySelector("#id-canvas")
	var context = canvas.getContext("2d")
	g.canvas = canvas
	g.context = context

	g.drawImage = function(guaImage) {
		g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
	}

	window.addEventListener('keydown', function(event) {
		g.keydowns[event.key] = true
	})
	window.addEventListener('keyup', function(event) {
		g.keydowns[event.key] = false
	})
	g.registerAction = function(key, callback) {
		g.actions[key] = callback
	}

	//希望程序中动态修改帧率
	window.fps = 30
	var runloop = function() {
		var actions = Object.keys(g.actions)
		for(var i = 0; i < actions.length; i++) {
			var key = actions[i]
			if(g.keydowns[key]) {
				//如果按键被按下,调用注册的action
				g.actions[key]()
			}
		}
		//update
		g.update()
		context.clearRect(0, 0, canvas.width, canvas.height)
		//draw
		g.draw()
		//next run loop
		setTimeout(function() {
			runloop()
		}, 1000 / window.fps)
	}

	/*
		setInterval(function() {
			var actions = Object.keys(g.actions)
			for (var i = 0; i < actions.length; i++) {
				var key = actions[i]
				if (g.keydowns[key]) {
					//如果按键被按下,调用注册的action
					g.actions[key]()
				}
			}
			//update
			g.update()
			context.clearRect(0, 0, canvas.width, canvas.height)
				//draw
			g.draw()
		}, 1000 / fps)
	*/

	var loads = []
	//预先载入所有图片
	var names = Object.keys(images)
	for(var i = 0; i < names.length; i++) {
		//这里必须用let,使用var的话后面所有的name都是最后一个
		let name = names[i]
		var path = images[name]
		let img = new Image()
		img.src = path
		//图片加载是一个异步操作
		img.onload = function() {
			//存入g.images中
			g.images[name] = img
			//所有图片加载成功后,调用run
			loads.push(1)
			log('load images', loads.length, names.length)
			if(loads.length == names.length) {
				log('load images', g.images)
				g.run()
			}
		}
	}

	g.imageByName = function(name) {
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
		}
		return image
	}
	g.run = function() {
		runCallback(g)
		//开始运行程序
		setTimeout(function() {
			runloop()
		}, 1000 / window.fps)

	}

	return g
}