<%@ page contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%
	String path = request.getContextPath();	
	String basePath = request.getScheme()+"//"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap/bootstrap-3.3.7-dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap/css/message/messenger.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap/css/message/toastr.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap/css/message/messenger-theme-future.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/data-tables/DT_bootstrap.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.structure.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/select2/css/select2.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-multiselect-master/css/bootstrap-multiselect.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-multiselect-master/less/bootstrap-multiselect.less">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-fileinput-master/css/fileinput.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/block.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/picker-date/themes/default.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/picker-date/themes/default.date.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/picker-date/themes/default.time.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/password-strength/progress.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/bootstrap-table/bootstrap-table.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote-bs4.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote-lite.css">

<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap/js/message/messenger.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap/js/message/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap/js/message/messenger-theme-future.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/data-tables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery.form.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app/common/browser.js"></script>
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/nicEdit.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app/common/files.js"></script> --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery.media.js"></script>
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-validation/jquery.validate.js"></script> --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrapvalidator/js/bootstrapValidator.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrapvalidator/js/hikBootValidator.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/select2/js/select2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-multiselect-master/js/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-fileinput-master/js/locales/zh.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/bootstrap-fileinput-master/js/fileinput.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/config.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote-lite.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/summernote-0.8.8/summernote-bs4.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/lib/plugin/jquery.base64.js"></script>
</head>
<body>
</body>
</html>