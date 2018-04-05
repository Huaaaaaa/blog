<%@ page pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
<meta http-equiv="Expires" content="-1" />
<jsp:include page="../common.jsp"></jsp:include>
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/modules/blog/css/blog_left.css">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
</head>
<body>
	<div class="left" style="background-color: #CCCCCC">
		<div class="uinfo">
			<div class="feature_pic">
				<img src="${figure}" width='130px' height='130px' style='border-radius: 10px' />
			</div>
			<div class="fans_info">
				<ul>
					<li>昵称：${nickName}</li>
					<li>粉丝：</li>
					<li>关注：</li>
				</ul>
			</div>
			<div class="care">
				<a class="btn btn-success">加关注</a>
			</div>
		</div>
		<!-- <div class="form_datetime" style="margin-left: 20px;margin-top: 10px;">
		</div> -->
		<div class="input-group datepicker date" id='date1'>
			<input type="hidden" class="form-control">
		</div>

		<!-- <div class="article_type" id="article_type">
			<div class="list-group">
				<a href="#" class="list-group-item active">日志分类</a> 
				<div class="panel-group">
			    <div class="panel panel-default">
			      <div class="panel-heading">
			        <h4 class="panel-title">
			          <a data-toggle="collapse" href="#collapse1">Java</a>
			        </h4>
			      </div>
			      <div id="collapse1" class="panel-collapse collapse">
			        <ul class="list-group">
			          <li class="list-group-item">One</li>
			          <li class="list-group-item">Two</li>
			          <li class="list-group-item">Three</li>
			        </ul>
			      </div>
			    </div>
			   </div>
			</div>
		</div> -->
	</div>

</body>
<script type="text/javascript">
$(function(){
	$('#date1').datetimepicker({  
        format: 'YYYY-MM-DD',  
        language:"zh-CN",
        todayHighlight:true,
        forceParse:false,
    }); 
    $('#date1').datetimepicker('show');
	/* var $input = $("#datepicker").pickatime({});
	var picker = $input.pickatime("picker");
	picker.open(); */
});
</script>
</html>