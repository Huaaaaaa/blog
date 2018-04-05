/**
 * Created by huayingcao on 2016/7/14.
 * 鼠标事件
 */

/*onclick()事件：单击按钮时复制文本*/
function copyText() {
    var pValue = document.getElementById("p1").innerHTML;
    alert(pValue);
    document.getElementById("in").value = pValue;
}

/*ondbclick()事件:双击按钮时清空复制的文本*/
function clearText() {
    alert("清空文本");
    document.getElementById("in").value = "";
}

/*ondrage()事件：拖动元素时触发的事件*/
function dragColor(id) {
    var ele = document.getElementById(id);
    ele.style.color = "red";
    ele.style.backgroundColor = "blue";
}

/*ondragend()事件：在拖动末尾触发的事件*/
function changeBg(id) {
    var ele = document.getElementById(id);
    ele.style.fontFamily = "楷体";
    ele.style.fontSize = "big";
    ele.style.backgroundColor = "pink";
    ele.style.color = "#00ffff";
}

/*onmousedown():当鼠标按下个时触发此事件*/
function mouseDown(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = " #FAFAD2 ";
    text.style.color = "#FF00FF";
}

/*onmouseup()事件：当鼠标放开是触发此事件*/
function mouseUp(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = " ##FFC0CB ";
    text.style.color = "#6A5ACD";
    text.style.fontFamily = "华文行楷";
    ;
}

/*onmousemove()事件：当鼠标指针移动到元素上时触发的事件*/
function mouseMove(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = "#00FF7F";
    text.style.color = "#4682B4";
}

/*onmouseout()事件：当鼠标指针从元素上移开时触发改事件*/
function mouseOut(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = "#FFFF00";
    text.style.color = "#black";
    text.style.fontFamily = "楷体";
}

/*onmouseover()事件：当鼠标指针移动到元素上时触发的事件*/
function mouseOver(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = "black";
    text.style.color = "white";
}

