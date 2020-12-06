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

#### 第三次提交 抽离出Paddle

将 canvas 事件监听 setInterval 抽离合成

将 setInterval 放到 Game 里面，在 Game 里面调用 setInterval
再用一个函数来注册这个事件

actions 是一个对象，存满了它的 key 和 它的函数，我们把函数注册进来
函数和 key 通过另一个函数注册到里面去

window 全局监听哪个键被按下松开，改变 keydowns 对应键的值为 true/false
从而一旦哪个键被按下，keydowns 的 对应键的值为 true
这是执行 actions 的 对应键 的 函数