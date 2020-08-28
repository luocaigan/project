function animate(dom, targetObject, duration, callback) {
    // 参数默认值
    duration = duration || 1000;
    // 1 定义起点 
    var nowObject = {};
    // 获取计算后样式对象
    var styleObject = window.getComputedStyle(dom);
    // 因为targetObject是对象 所以通过循环得到该对象的每一个属性名
    for (var i in targetObject) {
        // 获取对应的属性
        var prop = styleObject[i];
        // 为了确保能够计算 需要转为数字
        nowObject[i] = parseInt(prop);
    }
    // nowObject在循环之后就拥有了targetObjet的所有属性 并且属性值为运动之前的值
    console.log(nowObject);
    // 2 定义总距离
    var distanceObject = {};
    for (var i in targetObject) {
        // 总距离 = 终点值 - 初始值
        distanceObject[i] = targetObject[i] - nowObject[i];
    }
    // 3 定义间隔
    var interval = 20;
    // 4 定义总次数
    var allCount = duration / interval;
    // 5 定义计数器
    var count = 0;
    // 开启定时器
    var timer = setInterval(function() {
        // 计数器累加
        count++;
        // 改变每一条属性 
        for (var i in targetObject) {
            if (i === "opacity") {
                dom.style[i] = (nowObject[i] + count * distanceObject[i] / allCount);
            } else {
                dom.style[i] = (nowObject[i] + count * distanceObject[i] / allCount) + "px";
            }
        }
        // 判定是否停止
        if (count >= allCount) {
            // 停止定时器
            clearInterval(timer);

            // if (callback) {
            //     callback();
            // }
            // 短路语法：且运算 有假就假 都真才真
            // 当不传递callback时 为undefined  则&&后面的语句不会被执行 
            // 当传递callback时  为函数 函数为真 就执行了
           

            // 强行拉到终点去
            for (var i in targetObject) {
                if (i === "opacity") {
                    dom.style[i] = targetObject[i];
                } else {
                    dom.style[i] = targetObject[i] + "px";
                }
            }

            callback && callback();
        }
    }, interval);
}