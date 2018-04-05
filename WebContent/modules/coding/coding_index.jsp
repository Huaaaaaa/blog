<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<title>coding</title>
<style type="text/css">
.container {
	margin-left: 5px;
	margin-top: 10px;
}

.main{
	margin-top: 10px;
	margin-left:15px;
	
}
</style>
</head>
<body>

<div class="list-group" id="lmenu">
		<a href="javascript:;" class="list-group-item">个人信息管理</a>
	</div>

	<div>
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href=#h5_tab>HTML</a></li>
			<li><a data-toggle="tab" href="#css_tab">CSS</a></li>
			<li><a data-toggle="tab" href="#js_tab">JavaScript</a></li>
			<li><a data-toggle="tab" href="#php_tab">PHP</a></li>
			<li><a data-toggle="tab" href="#sql_tab">SQL</a></li>
			<li><a data-toggle="tab" href="#java_tab">Java</a></li>
			<li><a data-toggle="tab" href="#c_tab">C++</a></li>
			<li><a data-toggle="tab" href="#python_tab">Python</a></li>
		</ul>

		<div class="tab-content">
			<div id="h5_tab" class="tab-pane fade in active">
				<a href="/language/navRight?dir=h5" target="_blank">h5</a>
			</div>
			<div id="css_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=css">css</a>
			</div>
			</div>
			<div id="js_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=js">js</a>
			</div>
			<div id="php_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=php">php</a>
			</div>
			<div id="sql_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=sql">sql</a>
			</div>
			<div id="java_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=java">java</a>
			</div>
			<div id="c_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=c"></a>
			</div>
			<div id="python_tab" class="tab-pane fade">
				<a href="/language/navRight?dir=python"></a>
			</div>
		</div>

</body>
<!--  <script type="text/javascript">
 $(function(){
	$(".container > ul >li >a").click(function(){
		var aId = $(this).attr("id");
		var tabId = "#"+aId+"_tab";
		$(tabId).find("a").href="<a href='/language/navRight?dir='"+aId+"#main'";
	});
}); 
</script> -->
</html>