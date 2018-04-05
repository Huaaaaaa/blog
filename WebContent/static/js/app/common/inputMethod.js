/**
 * Created by huayingcao on 2016/7/9.
 */
/*让按钮失去焦点*/
function removeFocus() {
    document.getElementById("butblur").blur();
}

/*页面加载时点击鼠标*/
function clickBut() {
    document.getElementById("butclick").click();
}

/*点击按钮时弹出消息*/
function alertMsg() {
    alert("测试click方法");
}

/*给按钮添加获取焦点事件*/
function setFocus() {
    document.getElementById("butfocus").focus();
}

/*让复选框【读书】获取焦点；让复选框【跑步】选中*/
function setcFocus() {
    document.getElementById("run").click();
    document.getElementById("read").focus();
}

/*让复选框【跑步】失去焦点*/
function losecFocus() {
    document.getElementById("read").blur();
}

/*创建一个color类型的input*/
function createColor() {
    var colorInput = document.createElement("INPUT");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("style", "color:red");
}

/*获取color的值*/
function getColor() {
    var color = document.getElementById("myColor").value;
    document.getElementById("cp").innerHTML = color;
}

/*获取date*/
function getDate() {
    var date = document.getElementById("myDate").value;
    document.getElementById("dp").innerHTML = date;
}

/*获取datetime*/
function getDateTime() {
    var dateTime = document.getElementById("myDateTime").value;
    document.getElementById("dtp").innerHTML = dateTime;
}

/*获取month*/
function getMonth() {
    var month = document.getElementById("month").value;
    document.getElementById("m").innerHTML = month;
}

/*获取week*/
function getWeek() {
    var week = document.getElementById("week").value;
    document.getElementById("w").innerHTML = week;
}
/*获取range*/
function getRange() {
    var range = document.getElementById("range").value;
    document.getElementById("r").innerHTML = range;

}
/*获取search*/
function getSearch() {
    var placeholder = document.getElementById("search").placeholder;
    document.getElementById("s").innerHTML = placeholder;
}