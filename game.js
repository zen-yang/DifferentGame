var Game = function() {
  var g = {
    actions: {},
    keydowns: {},
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context
  // draw
  g.drawImage = function(gameImage) {
    g.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
  }
  // events
  window.addEventListener('keydown', function(event){
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', function(event){
    g.keydowns[event.key] = false
  })
  //
  // 把按键 key 按下执行的函数存到 actions 里面
  g.registerAction = function(key, callback) {
    g.actions[key] = callback
  }
  // timer
  window.fps = 30
  var runloop = function() {
    // events
    // 遍历它的 key, 检查一下，如果被按下了，就执行函数
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++){
      var key = actions[i]
      if (g.keydowns[key]) {
        // 如果按键被按下，调用注册的 action
        g.actions[key]()
      }
    }
    // update
    g.update()
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    g.draw()
    // next run loop
    setTimeout(function(){
      runloop()
    }, 1000/fps)
  }

  setTimeout(function(){
    runloop()
  }, 1000/fps)

  return g
}