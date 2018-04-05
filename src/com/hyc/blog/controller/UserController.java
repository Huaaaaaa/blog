package com.hyc.blog.controller;

import java.util.HashMap;
import java.util.Map;

import com.hyc.blog.common.DictKeys;
import com.hyc.blog.model.BlogUser;
import com.hyc.blog.service.UserService;
import com.hyc.blog.tools.EmailTool;
import com.hyc.blog.tools.StringTool;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

/**
 * 用户操作类
 *
 * @Copyright:Copyright(c) 2012-2016 Company:
 * @company Hikvision(http://www.hikvision.com)
 * @author 作者：huayingcao
 * @time 创建时间：2016年9月28日 下午5:17:40
 * @description
 */
public class UserController extends Controller {
	private String userName;// 用户名
	private String nickName;// 昵称
	private String accountEmail;// 邮箱
	private String accountPhone;// 手机号
	private String password;// 密码
	private String randomCode = "";

	/**
	 * 获取用户列表
	 */
	public void getUserInfo() {

	}

	public void toRegedit() {
		render("regedit.jsp");
	}

	/**
	 * 用户注册
	 */
	public void regedit() {
		userName = getPara("userName");
		nickName = getPara("nickName");
		password = getPara("password");
		accountEmail = getPara("accountEmail");
		accountPhone = getPara("accountPhone");
		boolean isReg = UserService.service.regedit(userName, nickName,
				password, accountEmail, accountPhone);
		renderJson(isReg);
	}

	/**
	 * 检查用户密码是否正确
	 */
	public void checkUser() {
		userName = StringTool.isNull(getPara("username"));
		password = StringTool.isNull(getPara("password"));
		if(null!=userName && null!=password){
			Map<String, Boolean> resMap = new HashMap<String, Boolean>();
			String loginInfo = getCookie(DictKeys.COOKIE_USER_ID);
			String result = UserService.service.checkName(userName, password,loginInfo);
			if ("".equals(password)) {
				if (result.endsWith("1")) {
					resMap.put("valid", true);
				} else if (result.endsWith("0")) {
					resMap.put("valid", false);
				}
			} else {
				if (result.endsWith("4")) {
					resMap.put("valid", true);
				} else if (result.endsWith("3")) {
					resMap.put("valid", false);
				}
			}

			renderJson(resMap);
		}
		
	}

	/**
	 * 根据用户名或邮箱或手机号确定用户的唯一性吧
	 */
	public void checkUserUnique() {
		userName = getPara("userName");
		accountEmail = getPara("accountEmail");
		accountPhone = getPara("accountPhone");
		Map<String, String> resMap = UserService.service.checkUserUnique(
				userName, accountEmail, accountPhone);
		renderJson(resMap);
	}

	/**
	 * 获取用户的所有信息
	 */
	public void userMsgs() {
		String userName = getPara("userName");
		String userId = BlogUser.dao.getUserId(userName);
		BlogUser blogUser = UserService.service.getUserAllInfo(userId);
		setAttr("blogUser", blogUser);
		render("userInfo.jsp");
	}

	/**
	 * 设置用户基本信息
	 */
	public void saveBasicInfo() {
		BlogUser blogUser = getModel(BlogUser.class);
		String userId = getPara("userId");
		boolean save = UserService.service.saveBasicInfo(userId, blogUser);
		if (save) {
			renderText("1");
		} else {
			renderText("0");
		}
	}

	/**
	 * 设置用户个人资料
	 */
	public void savePersonalInfo() {
		BlogUser blogUser = getModel(BlogUser.class);
		String userId = getPara("userId");
		boolean save = UserService.service.savePersonalInfo(userId, blogUser);
		if (save) {
			renderText("1");
		} else {
			renderText("0");
		}
	}

	/**
	 * 获取用户头像
	 */
	public void getUserFigure() {
		String userId = getPara("userId");
		BlogUser user = BlogUser.dao.findById(userId);
		if (null != user) {
			String figuerPath = user.getStr("figure");
			renderText(figuerPath != null ? figuerPath : "error");
		} else {
			renderText("error");
		}
	}

	/**
	 * 设置用户头像
	 */
	public void saveUserFigure() {
		String userId = getPara("userId");
		UploadFile uploadFile = this.getFile();
		boolean setFeature = UserService.service.saveUserFigure(userId,
				uploadFile);
		if (setFeature) {
			renderText("1");
		} else {
			renderText("0");
		}
	}

	/**
	 * 修改密码
	 */
	public void editUserPassword() {
		String userId = getPara("userId");
		String newpass = getPara("newpass");
		boolean res = UserService.service.editUserPassword(userId, newpass);
		renderText(res==true?"1":"0");
		
	}

	/**
	 * 验证旧密码是否正确
	 */
	public void validateOldPass() {
		String userId = getPara("userId");
		String oldPass = getPara("oldPass");
		Map<String, Boolean> res = new HashMap<String, Boolean>();
		boolean isEqual = UserService.service.validateOldPass(userId, oldPass);
		res.put("valid", isEqual);
		renderJson(res);
	}

	/**
	 * 给邮箱发送验证码
	 */
	public void sendEmailValicode() {
		String toEmail = getPara("email");
		randomCode = StringTool.getRandomNum(4);
		String res = EmailTool.senEmail(toEmail, randomCode);
		renderText(res);
	}

	/**
	 * 检查验证码是否正确
	 */
	public void checkRandomCode() {
		String valicode = getPara("randomCode");
		Map<String, Boolean> resMap = new HashMap<String, Boolean>();
		if (valicode.equals(randomCode)) {
			resMap.put("valid", true);
		} else {
			resMap.put("valid", false);
		}
		renderJson(resMap);
	}
	
	/**
	 * 验证邮箱是否正确
	 */
	public void checkEmail(){
		String email = getPara("accountEmail");
		String userId = getPara("userId");
		Map<String,Boolean> resMap = new HashMap<String, Boolean>();
		boolean res = UserService.service.checkEmail(userId, email);
		resMap.put("valid", res);
		
	}
	
	/**
	 * 设置用户的账户信息
	 */
	public void setAccountInfo(){
		String userId = getPara("userId");
		BlogUser blogUser = getModel(BlogUser.class);
		boolean res = UserService.service.setAccountInfo(userId,blogUser);
		renderText(res?"1":"0");
	}
}
