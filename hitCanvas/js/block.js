var Block = function(game,position) {
	//position是[0,0]格式
	var img = game.imageByName('block')
	var p=position
		//o 是Object代表一切对象
	var o = {
		image: img.image,
		x: p[0],
		y: p[1],
		w: 50,
		h: 20,
		alive: true,
		//默认为1
		lifes:p[2] ||1,
	}

	o.kill = function() {
		o.lifes--
		if(o.lifes<1){
			o.alive = false	
		}
	}

	//检测是否碰撞过
	o.collide = function(b) {
		return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))

	}

	return o
}