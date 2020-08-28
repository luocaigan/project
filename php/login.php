<?php
    // 获取前端提交的数据
    $username = $_POST["username"];
    $password = $_POST["password"];


    // 连接数据库
    mysql_connect("localhost", "root", "root");

    // 选择数据库
    mysql_select_db("test");

    // 定义查询语句
    $sql = "SELECT * FROM userinfo WHERE username= '$username' and password ='$password'";
    // 执行语句
    $result = mysql_query($sql);

    // 获取条数
    $count = mysql_num_rows($result);

    // 判定
    if ($count == 1) {
        // 说明用户名和密码都对
        $arr = array("error" => 0, "msg" => "登录成功");
        // 设置cookie
        setcookie("islogin", "1", time() + 3 * 1000, "/");
        setcookie("username", $username, time() + 3 * 1000, "/");
        setcookie("password", $password, time() + 3 * 1000, "/");

    /* 
        cookie是HTTP协议中规定的一个字段 用于前端和后端之间传递消息 传递的时候位于请求头和响应头 通常是服务器负责设置  浏览器负责存储 
        cookie会在每一次请求的时候都携带给服务器 
        cookie的大小 每一个cookie4KB左右
        cookie存储于浏览器


        maxAge/ expires  有效期
        domain   域名 
        path     路径
        size     cookie的大小
        HttpOnly  是否仅允许服务器设置cookie
    */
    } else {
        // 说明用户名或密码不正确
        $arr = array("error" => 1, "msg" => "用户名或密码错误");
    }
    
    // 返回数据
    echo json_encode($arr);
    

?>