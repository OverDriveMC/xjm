var e= sel =>document.querySelector(sel)


var log = console.log.bind(console)
/*
var log=function(){
	
}
*/
var imageFromPath = function(path) {
	var img = new Image()
	img.src = path
	return img
}


var rectIntersects = function(a, b) {
	o = a
	if (b.y > o.y && b.y < o.y + o.image.height) {
		if (b.x > o.x && b.x < o.x + o.image.width) {
			log('block 相撞')
			return true
		}
	}
	return false
}