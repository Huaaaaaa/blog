<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<jsp:include page="../common.jsp"></jsp:include>
<title>outdoor-page</title>
<style type="text/css">
.form-control {
	width: 200px;
}
</style>
</head>
<body>
	<div style="margin-left: 30px; margin-top: 10px;">
		测试输入框事件监听：<input name="test" value="" class="form-control">
	</div>
</body>
<script type="text/javascript">
	var test = document.getElementsByName("test")[0];
	var result = new Array();
	if (test) {
		//绑定focus事件
		test.addEventListener("focus", function(event) {
			result.push({
				event : 'focus',
				value : this.value,
				keyCode : event.keyCode,
				message:"获取焦点时",
				url:this.validators.remote.url
			});
			console.table(result);
		});
		//绑定keydown事件
		test.addEventListener("keydown", function(event) {
			result.push({
				event : 'keydown',
				value : this.value,
				keyCode : event.keyCode,
				message:"按下键盘时",
				url:this.validators.remote.url
			});
			console.table(result);
		});

		//绑定input事件
		test.addEventListener("input", function(event) {
			result.push({
				event : 'input',
				value : this.value,
				keyCode : event.keyCode,
				message:"键盘输入时",
				url:this.validators.remote.url
			});
			console.table(result);
		});

		//绑定keyup事件
		test.addEventListener("keyup", function(event) {
			result.push({
				event : 'keyup',
				value : this.value,
				keyCode : event.keyCode,
				message:"键入结束时",
				url:this.validators.remote.url
			});
			console.table(result);
		});

		//绑定change事件
		test.addEventListener("change", function(event) {
			result.push({
				event : 'change',
				value : this.value,
				keyCode : event.keyCode,
				message:"输入改变时",
			});
			console.table(result);
		});

		//绑定blur事件
		test.addEventListener("blur", function(event) {
			result.push({
				event : 'blur',
				value : this.value,
				keyCode : event.keyCode,
				message:"失去焦点时"
			});
			console.table(result);
		});
	}
</script>
</html>