var Game = function(fps, images, runCallback) {
  // images 是一个对象，里面是图片的引用名字和图片
  // 程序会在所有图片载入成功后才运行
  var g = {
    scene: null,
    actions: {},
    keydowns: {},
    images: {},
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
  // update
  g.update = function() {
    g.scene.update()
  }
  // draw 
  g.draw = function() {
    g.scene.draw()
  }
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

  var loads = []
  // 预先载入所有图片
  var names = Object.keys(images)
  for (var i = 0; i < names.length; i++) {
    let name = names[i]
    var path = images[name]
    let img = new Image()
    img.src = path
    img.onload = function() {
      // 存入 g.images 中
      g.images[name] = img
      // 所有图片都成功载入之后，调用 run
      loads.push(1)
      if (loads.length == names.length) {
        g.__start()
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

  g.runWithScene = function(scene) {
    g.scene = scene
    // 开始运行程序
    setTimeout(function(){
      runloop()
    }, 1000/fps)
  }
  g.replaceScene = function(scene) {
    g.scene = scene
  }
  g.__start = function(scene) {
    runCallback(g)
  }

  return g
}