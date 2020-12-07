var Block = function(position) {
  // position 是 [0, 0] 格式
  var p = position
  var image = imageFromPath('block.png')
  var o = {
    image: image,
    x: p[0],
    y: p[1],
    w: 50,
    h: 20,
    alive: true,
    lives: p[2] || 1,
  }
  o.kill = function() {
    o.lives--
    if (o.lives < 1) {
      o.alive = false
    }
  }
  o.collide = function(b) {
    return o.alive && (recIntersects(o, b) || recIntersects(b, 0))
  }
  return o
}