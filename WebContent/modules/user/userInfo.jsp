<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- <meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content=”webkit|ie-comp|ie-stand”>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta http-equiv="Expires" content="-1" /> -->
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet" style="text/css" href="${pageContext.request.contextPath}/modules/user/css/userInfo.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/passstrength.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/modules/user/js/userInfo.js"></script>
<title>Insert title here</title>
</head>
<body>
	<input hidden="hidden" name="userId" value="${blogUser.id }">
	<input hidden="hidden" id="hidden_gender" value="${blogUser.gender }">
	<input hidden="hidden" id="hidden_homeTown_province" value="${blogUser.hometownProvince }">
	<input hidden="hidden" id="hidden_homeTown_city" value="${blogUser.hometownCity }">
	<input hidden="hidden" id="hidden_homeTown_country" value="${blogUser.hometownCountry}">
	<input hidden="hidden" id="hidden_nowLoc_province" value="${blogUser.nowlocProvince }">
	<input hidden="hidden" id="hidden_nowLoc_city" value="${blogUser.nowlocCity}">
	<input hidden="hidden" id="hidden_nowLoc_country" value="${blogUser.nowlocCountry}">
	<input hidden="hidden" id="hidden_marriage" value="${blogUser.marriage}">
	<input hidden="hidden" id="hidden_job_status" value="${blogUser.jobStatus}">
	<input hidden="hidden" id="hidden_figure_old" value="${blogUser.figure}">
	
	<div class="list-group" id="lmenu">
		<span href="javascript:;" class="list-group-item">个人信息管理</span>
	</div>

	<div>
		<ul class="nav nav-tabs" id="userInfoNav">
			<li class="active"><a data-toggle="tab" href="#menu0" id="info1">基本资料</a></li>
			<li><a data-toggle="tab" href="#menu1" id="info2">个人信息</a></li>
			<li><a data-toggle="tab" href="#menu2" id="info3">头像设置</a></li>
			<li><a data-toggle="tab" href="#menu3" id="info4">密码设置</a></li>
			<li><a data-toggle="tab" href="#menu4" id="info5">联系方式</a></li>
		</ul>

		<div class="tab-content">
			<!--基本资料  -->
			<div id="menu0" class="tab-pane fade in active">
				<div class="containers">
					<form class="form-horizontal" role="form" id="basicInfoFrom">
						<div class="form-group">
							<label class="control-label col-sm-2" for="userName">用户名:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="userName"
									placeholder="输入姓名" name="blogUser.userName" value="${blogUser.userName}" disabled="disabled">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="nickName">昵称:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="nickName"
									placeholder="输入昵称" name="blogUser.nickName" value="${blogUser.nickName}">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">性别:</label>
							<div class="col-sm-4">
								<!--  实现raido互斥的方法：将name设置成同一个值-->
								<label class="gender label_man" for="male"></label><input
									type="radio" value="male" name="blogUser.gender" id="male"> <label
									class="gender label_woman" for="female"></label><input
									type="radio" value="female" name="blogUser.gender" id="female">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="userBirth">出生日期:</label>
							<div class="col-sm-4">
								<input size="16" type="text" value="2012-06-15 14:45" readonly
									class="form_datetime" id="userBirth" name="blogUser.userBirth"
									value="${blogUser.userBirth}">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="homeTown_province">家乡:</label>
							<div class="col-sm-4">
								<select id="homeTown_province" name="blogUser.hometownProvince">
									<option>省份</option>
								</select>--- <select id="homeTown_city" name="blogUser.hometownCity">
									<option>地级市</option>
								</select>---<select id="homeTown_country" name="blogUser.hometownCountry">
									<option>市、县级市、县</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="nowLoc_province">现居住地:</label>
							<div class="col-sm-4">
								<select id="nowLoc_province" name="blogUser.nowlocProvince">
									<option>省份</option>
								</select>--- <select id="nowLoc_city" name="blogUser.nowlocCity">
									<option>地级市</option>
								</select>---<select id="nowLoc_country" name="blogUser.nowlocCountry">
									<option>市、县级市、县</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="marriage">婚姻:</label>
							<div class="col-sm-4">
								<select id="marriage" name="blogUser.marriage">
									<option value="单身">单身</option>
									<option value="热恋">热恋</option>
									<option value="订婚">订婚</option>
									<option value="已婚">已婚</option>
									<option value="离异">离异</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="job">职位:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="job"
									placeholder="输入职位" name="blogUser.userJob" value="${blogUser.userJob}">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="company">所在单位:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="company"
									placeholder="输入所在公司或企业" name="blogUser.userCompany"
									value="${blogUser.userCompany}">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="job_status">工作状况:</label>
							<div class="col-sm-4">
								<select id="job_status" name="blogUser.jobStatus">
									<option value="学生">学生</option>
									<option value="已工作">已工作</option>
									<option value="待业中">待业中</option>
									<option value="其他">其他</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" class="btn btn-info"  id="saveBasicInfo">保存</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- 个人信息 -->
			<div id="menu1" class="tab-pane fade">
				<div class="container1">
					<form class="form-horizontal" role="form" id="personalInfoForm">
						<table class="table">
							<thead>
								<tr>
									<th><span style="margin-left: 60px;">个人信息</span></th>
									<th>谁可以看</th>
									<th>是否显示在首页</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="userTechnology">感兴趣的技术:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="userTechnology"
													name="blogUser.userTechnology" placeholder="输入感兴趣的技术，用逗号（,）隔开" value="${blogUser.userTechnology}"> 
											</div>
										</div></td>
									<td><select name="blogUser.tecAccessAuthority" id="tecAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" name="blogUser.isTecShow" id="isTecShow" value="1"/>
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="target">最近目标:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="userTarget"
													name="blogUser.userTarget" placeholder="输入最近目标"
													value="${blogUser.userTarget }">
											</div>
										</div></td>
									<td><select name="blogUser.targetAccessAuthority" id="targetAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox"  name="blogUser.isTargetShow" id="isTargetShow" value="1"/>
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="userMotto">座右铭:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="userMotto"
													name="blogUser.userMotto" placeholder="输入座右铭"
													value="${blogUser.userMotto}">
											</div>
										</div></td>
									<td><select name="blogUser.mottoAccessAuthority" id="mottoAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" name="blogUser.isMottoShow" id="isMottoShow" value="1"/>
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="selfIntroduce">自我介绍:</label>
											<div class="col-sm-8">
												<textarea class="form-control" id="selfIntroduce"
													name="blogUser.selfIntroduce" placeholder="介绍自己">${blogUser.selfIntroduce }</textarea>
											</div>
										</div></td>
									<td><select name="blogUser.selfIntroAccessAuthority" id="selfIntroAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" checked name="blogUser.isSelfAccessShow" id="isSelfAccessShow" value="1"/>
										</div></td>
								</tr>
							</tbody>
						</table>
						<div class="form-group">
							<div style="margin-left: 180px;">
								<input type="button" class="btn btn-info" id="savePersonalInfo" value="保存">
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--头像设置  -->
			<div id="menu2" class="tab-pane fade">
				<div class="container2">
					<form class="form-horizontal" role="form" enctype="multipart/form-data" id="uploadFigureForm">
						<div class="form-group">
							<span class="control-label col-sm-2" for="motto">当前头像:</span>
							<div class="ge_pic_icon_Infor"></div>
							<div class="selectFile"><input type="file" name="figure" id="figure"
								class="projectfile" onchange="getPhoto(this)"/><input type="text" name="figure1"
								class="projectfile" value="${blogUser.figure}" hidden="hidden"  id="hidden_figure"  /></div>	
								
						</div>
						<div class="saveBtn"><input class="btn btn-md btn-info" type="submit" id="uploadFigure" value="上传" ></div>
					</form>
				</div>
			</div>
			<!-- 密码设置 -->
			<div id="menu3" class="tab-pane fade">
				<div class="container1">
					<form class="form-horizontal" role="form" id="editPassForm">
						<div class="form-group">
							<label class="control-label col-sm-1" for="oldpass">旧密码:</label>
							<div class="col-sm-4">
								<input type="password" class="form-control" id="oldpass"
									placeholder="输入原密码" name="oldpass"
									value="${blogUser.passsword }">
							</div>
						</div>
						<div class="form-group">
							<div class="strength_user_password" id="strength_user_password">
								<ul>
									<li class="veryweak"><span>风险</span></li>
									<li class="weak"><span>弱</span></li>
									<li class="medium"><span>中</span></li>
									<li class="strong"><span>强</span></li>
								</ul>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-1" for="password">新密码:</label>
							<div class="col-sm-4">
								<input type="password" class="form-control" id="password"
									placeholder="输入新密码" name="newpass">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-1" for="password1">确认新密码:</label>
							<div class="col-sm-4">
								<input type="password" class="form-control" id="password1"
									placeholder="确认新密码" name="newpassconfirm">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-1" for="accountEmail">邮箱:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="accountEmail"
									placeholder="输入验证邮箱" name="accountEmail"
									value="${blogUser.accountEmail }">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-1" for="randomCode">验证码:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="randomCode" name="randomCode"
									placeholder="输入验证码">
							</div>
							<div class="col-sm-4">
								<input type="button" class="btn btn-info" id="getValicodeBtn"
									value="点击获取验证码">
							</div>
						</div>
						<div class="form-group">
							<div style="margin-left: 150px;">
								<button type="submit" class="btn btn-info" id="editPassBtn">保存</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--联系方式  -->
			<div id="menu4" class="tab-pane fade">
				<div class="container1">
					<form class="form-horizontal" role="form" id="setAccountForm">
						<table class="table">
							<thead>
								<tr>
									<th><span style="margin-left: 60px;">账号信息</span></th>
									<th>谁可以看</th>
									<th>是否显示在首页</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="account_sina">新浪微博:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="account_sina"
													name="blogUser.accountSina" placeholder="输入新浪微博账号"
													value="${blogUser.accountSina}">
											</div>
										</div></td>
									<td><select name="blogUser.accountSinaAccessAuthority" id="accountSinaAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" checked name="blogUser.accountSinaShow"  id="accountSinaShow" value="1"/>
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="account_zhihu">知乎:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="account_zhihu"
													name="blogUser.accountZhihu" placeholder="输入知乎账号"
													value="${blogUser.accountZhihu}">
											</div>
										</div></td>
									<td><select name="blogUser.accountZhihuAccessAuthority" id="accountZhihuAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" checked name="blogUser.accountZhihuShow" id="accountZhihuShow" value="1" />
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="account_email">邮箱:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="account_email"
													name="blogUser.accountEmail" placeholder="输入邮箱"
													value="${blogUser.accountEmail}">
											</div>
										</div></td>
									<td><select name="blogUser.accountEmailAccessAuthority" id="accountEmailAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" checked name="blogUser.accountEmailShow" id="accountEmailShow" value="1"/>
										</div></td>
								</tr>
								<tr>
									<td><div class="form-group">
											<label class="control-label col-sm-2" for="account_blog">博客:</label>
											<div class="col-sm-8">
												<input type="text" class="form-control" id="account_blog"
													name="blogUser.accountBlog" placeholder="输入博客账号" value="${blogUser.accountBlog}">
											</div>
										</div></td>
									<td><select name="blogUser.accountBlogAccessAuthority" id="accountBlogAccessAuthority">
											<option value="任何人">任何人</option>
											<option value="仅好友">仅好友</option>
											<option value="仅自己">仅自己</option>
									</select></td>
									<td><div class="switch" data-on="warning"
											data-off="danger">
											<input type="checkbox" checked name="blogUser.accountBlogShow" id="accountBlogShow" value="1"/>
										</div></td>
								</tr>
							</tbody>
						</table>
						<div class="form-group">
							<div style="margin-left: 180px;">
								<button type="button" class="btn btn-info" id="setAccountBtn">保存</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	</div>
</body>
<script>
	var hidden_homeTown_province = $("#hidden_homeTown_province").val();
	var hidden_homeTown_city = $("#hidden_homeTown_city").val();
	var hidden_homeTown_country = $("#hidden_homeTown_country").val();
	var hidden_nowLoc_province = $("#hidden_nowLoc_province").val();
	var hidden_nowLoc_city = $("#hidden_nowLoc_city").val();
	var hidden_nowLoc_country = $("#hidden_nowLoc_country").val();
	var hidden_marriage = $("#hidden_marriage").val();
	var hidden_job_status = $("#hidden_job_status").val();
	$(function() {
		
		$("#info1").click(backBasicInfo());
		$("#info2").click(backPersonalInfo());
		$("#info3").click(setPassword());
		$("#info3").click(getFigure());
		$("#info5").click(function(){
			getAccountInfo();
			setAccountInfo();
		});
		$('label.radio-label').click(
				function() {
					var radioId = $(this).attr('name');
					$('label').removeAttr('class')
							&& $(this).attr('class', 'checked');
					$('input[type="radio"]').removeAttr('checked')
							&& $('#' + radioId).attr('checked', 'checked');
				});
	});
	
	//回显基本信息
	function backBasicInfo(){
		//回显性别
		var gender = $("#hidden_gender").val();
		if (gender == "male") {
			$("#male").attr("checked", "checked");
		} else {
			$("#female").attr("checked", "checked");
		}
		//家乡-省
		$("#homeTown_province").find("option[value='"+hidden_homeTown_province+"']").attr("selected",true);//$("#homeTown_province").val(hidden_homeTown_province)
		changeS1(1);//不执行这个方法就无法选中下一级位置的默认值，这是个坑，待研究......
		$("#homeTown_city").find("option[value='"+hidden_homeTown_city+"']").attr("selected",true);
		changeS1(2);
		//家乡-地级市
		$("#homeTown_country").find("option[value='"+hidden_homeTown_country+"']").attr("selected",true);
		//现居地-省
		$("#nowLoc_province").find("option[value='"+hidden_nowLoc_province+"']").attr("selected",true);
		changeS2(1);
		//现居地-地级市
		$("#nowLoc_city").find("option[value='"+hidden_nowLoc_city+"']").attr("selected",true);
		changeS2(2);
		//现居地-县级市
		$("#nowLoc_country").find("option[value='"+hidden_nowLoc_country+"']").attr("selected",true);
		$("#marriage").find("option[value='"+hidden_marriage+"']").attr("selected",true);
		$("#job_status").find("option[value='"+hidden_job_status+"']").attr("selected",true);
	}
	
	//回显个人信息
	function backPersonalInfo(){
		$("#tecAccessAuthority").val("${blogUser.tecAccessAuthority}");
		$("#targetAccessAuthority").val("${blogUser.targetAccessAuthority}");
		$("#mottoAccessAuthority").val("${blogUser.mottoAccessAuthority}");
		$("#selfIntroAccessAuthority").val("${blogUser.selfIntroAccessAuthority}");
		"${blogUser.isTecShow}"=="1"?$("#isTecShow").attr("checked",true):$("#isTecShow").attr("checked",false);
		"${blogUser.isTargetShow}"=="1"?$("#isTargetShow").attr("checked",true):$("#isTargetShow").attr("checked",false);
		"${blogUser.isMottoShow}"=="1"?$("#isMottoShow").attr("checked",true):$("#isMottoShow").attr("checked",false);
		"${blogUser.isSelfAccessShow}"=="1"?$("#isSelfAccessShow").attr("checked",true):$("#isSelfAccessShow").attr("checked",false);
	}
	
	//回显头像
	function getFigure() {
		var figure ="${blogUser.figure}";
		if (null != figure) {
			creatImg(figure);
		}
		
	}
	
	//回显账号信息
	function getAccountInfo(){
		$("#accountSinaAccessAuthority").val("${blogUser.accountSinaAccessAuthority}");
		$("#accountZhihuAccessAuthority").val("${blogUser.accountZhihuAccessAuthority}");
		$("#accountEmailAccessAuthority").val("${blogUser.accountEmailAccessAuthority}");
		$("#accountBlogAccessAuthority").val("${blogUser.accountBlogAccessAuthority}");
		"${blogUser.accountSinaShow}"=="1"?$("#accountSinaShow").attr("checked",true):$("#accountSinaShow").attr("checked",false);
		"${blogUser.accountZhihuShow}"=="1"?$("#accountZhihuShow").attr("checked",true):$("#accountZhihuShow").attr("checked",false);
		"${blogUser.accountEmailShow}"=="1"?$("#accountEmailShow").attr("checked",true):$("#accountEmailShow").attr("checked",false);
		"${blogUser.accountBlogShow}"=="1"?$("#accountBlogShow").attr("checked",true):$("#accountBlogShow").attr("checked",false);
	}
</script>
</html>