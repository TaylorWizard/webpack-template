/*!

@author: Gu
@software: WebStorm
@file: index.js
@time: 2019-02-18 23:02
@desc:
*/
import './style/layout.less'
import './style/reset.css'
// import './a.js'

const a = 'Hello world'
document.body.innerHTML = a
console.log('我是高级前端工程师')

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    module.hot.accept()
}