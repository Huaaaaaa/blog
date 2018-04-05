/**
 * Created by huayingcao on 2016/7/14.
 * 表单事件
 */

/*onblur()事件：失去焦点时验证用户名*/
function checkName() {
    var name = document.getElementById("uname").value;
    var tips1 = document.getElementById("tips1");
    if (name = "".replace(" ", "") || name == null) {
        tips1.innerHTML = "用户名不能为空";
        document.getElementById("uname").focus();
    } else if (name == "admin") {
        tips1.innerHTML = "用户名不能是" + name;
        document.getElementById("uname").focus();
    } else {
        tips1.innerHTML = "用户名正确";
    }
}

/*onblur()事件：失去交单时检查两次输入的密码是否正确*/
function checkPwd() {
    var pwd1 = document.getElementById("pwd1").value;
    var pwd2 = document.getElementById("pwd2").value;
    var tips2 = document.getElementById("tips2");
    /*alert("第一次输入：" + pwd1 + "第二次输入：" + pwd2);*/
    if (pwd2 != pwd1) {
        tips2.innerHTML = "两次密码不一样，请重新输入";
        document.getElementById("pwd1").focus();
    } else {
        tips2.innerHTML = "两次密码相同";
    }
}


/*onblur()事件：失去焦点时检查邮箱格式是否正确*/
function checkEmail() {
    var email = document.getElementById("email").value;
    var tips3 = document.getElementById("tips3");
    var at = "@";
    var point = ".";
    var atIndex = email.indexOf(at);
    var pointIndex = email.indexOf(point);
    if (atIndex > -1 && pointIndex > -1) {
        tips3.innerHTML = "邮箱格式正确";
        document.getElementById("submit").focus();
    } else {
        tips3.innerHTML = "邮箱格式不正确";
        email.focus();
    }
}

/*onsubmit()事件：提交表单时对表单进行验证*/
function checkForm() {
    if (confirm("确认提交吗？")) {
        return true;
    } else {
        return false;
    }
}

/*onchange()事件：当元素的值改变时触发该事件*/
function confirmAge(age) {
    alert("修改后的年龄是：" + age)
    if (confirm("确认修改？")) {
        return true;
    } else {
        return false;
    }
}

/*onfocus()事件：当获取元素焦点时触发改事件*/
function changeType(id) {
    document.getElementById(id).style.backgroundColor = " #FFC0CB ";
}

/*oncontextmenu()事件：用在body中用来设置是否禁用鼠标右键：true为禁用,false为启用*/

/*onformchage()事件：当表单改变时触发该事件*/

/*oninput()事件：当用户获得输入时触发的事件*/
function changeStyle(id) {
    document.getElementById(id).style.backgroundColor = "#FFFF00 ";
}