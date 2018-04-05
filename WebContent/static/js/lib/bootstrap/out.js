/*  关闭alert的方式：
	 1、通过给a添加属性data-dismiss="alert"和aria-label='close'的方式
	 2、通过如下的JS方式 */
$(function() {
	
	/*dropdown();*/
	$(".close").click(function() {
		$("#alert5").alert("close");
	});

	/*iframe的属性、高度、宽度的设置*/
	$("iframe").attr({
		"width" : "100%",
		"scrolling" : "no",
		"frameborder" : "0",
		"marginwidth" : "0",
		"marginheight" : "0"
	});

	/*$("iframe").load(function() {
		$(this).height(0); // 用于每次刷新时控制IFRAME高度初始化
		var height = $(this).contents().height() + 200;
		$(this).height(height < 50 ? 955 : height);

		$(this).width(0); // 用于每次刷新时控制IFRAME高度初始化
		var width = $(this).contents().width() + 100;
		$(this).width(width < 1290 ? 1290 : width);
	});*/
});
function success() {
	if (1 == 1) {
		$("#alert1").attr("class", "alert alert-success fade in");
		$("#alert1").show();
		var a = $("#alert1 a").text();
		if (a == null || a == "") {
			var html = "<a href='' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
			$("#alert1").append(html);
		}
	}
}

function info() {
	if (2 == 2) {
		$("#alert2").attr("class", "alert alert-info fade in");
		$("#alert2").show();
		var a = $("#alert2 a").text();
		if (a == null || a == "") {
			var html = "<a href='' class='close' data-dismiss='alert' aria-label='close''>&times;</a>";
			$("#alert2").append(html);
		}
	}
}

function warning() {
	if (2 != 3) {
		$("#alert3").attr("class", "alert alert-warning fade in");
		$("#alert3").show();
		var a = $("#alert3 a").text();
		if (a == null || a == "") {
			var html = "<a href='' class='close' data-dismiss='alert' aria-label='close''>&times;</a>";
			$("#alert3").append(html);
		}
	}
}

function danger() {
	if (1 != 3) {
		$("#alert4").attr("class", "alert alert-danger fade in");
		$("#alert4").show();
		var a = $("#alert4 a").text();
		if (a == null || a == "") {
			var html = "<a href='' class='close' data-dismiss='alert' aria-label='close''>&times;</a>";
			$("#alert4").append(html);
		}
	}
}
/**
 * 下拉按钮显示和隐藏时触发的事件
 */
function dropdown() {
	$(".dropdown").on("show.bs.dropdown", function() {
		alert("下拉列表即将展开");
	});
	$(".dropdown").on("shown.bs.dropdown", function() {
		alert("下拉已完全展开");
	});
	$(".dropdown").on("hide.bs.dropdown", function() {
		alert("下拉列表即将隐藏");
	});
	$(".dropdown").on("hidden.bs.dropdown", function() {
		alert("下拉列表已全部隐藏");
	});
}

/**
 * 修改collapse隐藏和显示时的图标
 * @param id
 * @param btnId
 */
function changeIcon(id,btnId){
	$("#"+id).on("hide.bs.collapse",function(){
		$("#"+btnId).html("<span class='glyphicon glyphicon-triangle-bottom'></span>咖啡屋");
	});
	
	$("#"+id).on("show.bs.collapse",function(){
		$("#"+btnId).html("<span class='glyphicon glyphicon-triangle-top'></span>咖啡屋");
	});
}
