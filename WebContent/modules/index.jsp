<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content=”webkit|ie-comp|ie-stand”>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
<meta http-equiv="Expires" content="-1" />

</head>
<script type="text/javascript">
 	var ctx = "";
	var i18n = "zh_CN";
	var i18nDefault = "zh_CN";
	var random = ${version };
	var refUrl = ""; //全局URL
	var vmode = 0;

	//密码强度验证
	var valiType = {
		num: /\d/,                                //数字
		valsCh: /[a-z]+/,						  //小写字母				
		valbCh: /[A-Z]+/,                         //大写字母
		valSpe: /[^a-zA-Z0-9]/                    //特殊字符
	};
	var userInfo = null;
	var uploader = null;
	var blogInfo = null;
	//容错处理
	//window.onerror=function(){return true;} 
</script>
<body style="background-color: #E6E6FA">
	<div id="main"></div>
	<script type="text/javascript" src="../static/js/lib/jquery/jquery-3.1.0.min.js?v=${version}"></script>
	<script type="text/javascript" src="../static/js/lib/bootstrap/js/bootstrap.js?v=${version}"></script>
	<script src="../static/js/lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min.js?v=${version}"></script>
	<script src="../static/js/lib/jquery/jquery.i18n.properties-1.0.9.js?v=${version}"></script>
	<script src="../static/js/lib/require.js?v=${version}" data-main="../static/js/main.js?v=${version}"></script>	
</body>
</html>