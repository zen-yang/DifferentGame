搜索 mdn canvas image 知道如何加载页面

移动，改变坐标，清空画面，再画

搜索 mdn canvas clear 知道如何清空画面

#### 第一次提交 移动画面，锯齿严重

解决锯齿问题，setInterval 函数，1秒钟30次

监听 keydown、keyup 事件，用来改变状态

最外层只能有函数，不能有变量，程序只能有一个入口

#### 第二次提交 解决锯齿问题

重构代码，定义 \_\_main 唯一入口

```JavaScript
setInterval(function(){
  // update x
  if (leftDown) {
    paddle.moveLeft()
    // paddle.x -= paddle.speed
  } else if (rightDown) {
    paddle.moveRight()
    // paddle.x += paddle.speed
  }
  // draw
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(paddle.image, paddle.x, paddle.y)
}, 1000/30)
```
paddle 的逻辑应该放在 Paddle 里面，不要放出来污染

一个函数，不返回任何值，执行一个动作，应该用动词