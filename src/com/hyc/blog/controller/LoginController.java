package com.hyc.blog.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.Key;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hyc.blog.common.DictKeys;
import com.hyc.blog.model.BlogUser;
import com.hyc.blog.tools.CookieTool;
import com.hyc.blog.tools.EncodeAndDecodeTool;
import com.hyc.blog.tools.SessionTool;
import com.hyc.blog.tools.StringTool;
import com.hyc.blog.tools.ValicodeTool;
import com.jfinal.ext.render.CaptchaRender;

/**
 * 用户登陆
 *
 * @Copyright:Copyright(c) 2012-2016 Company:
 * @company Hikvision(http://www.hikvision.com)
 * @author 作者：huayingcao
 * @time 创建时间：2016年9月24日 下午2:41:12
 * @description
 */
public class LoginController extends BaseController {

	private static final String RANDOM_CODE_KEY = "1";

	public void index() {

		String flag = getCookie("flag");
		if (flag != null && flag.equals("true")) {
			String cookiesStr = getCookie(DictKeys.COOKIE_USER_ID);
			setAttr("loginInfo", cookiesStr);
		}
		
		Locale local = getSessionAttr("local");
		if(null==local){
			local = Locale.getDefault();
		}
		setAttr("flag", flag);

		render("login.jsp");

	}

	/**
	 * 用户登录，已经完成用户名和密码的校验
	 */
	public void login() {
		String userName = getPara("username");
		String password = getPara("password");
		String flag = getPara("flag");
		// 根据用户名获取key
		Key key = EncodeAndDecodeTool.generateKey(StringTool.getMultiple8String(userName));
		setSessionAttr(DictKeys.KEY,key);

		// 给用户信息加密
		String loginInfoEns = SessionTool.getEncSessionValue(StringTool.getMultiple8String(userName),StringTool.getMultiple8String(StringTool.isNull(password)), key);
		setSessionAttr(DictKeys.SESSION_USER_ID, loginInfoEns);// session.userinfo

		// 将加密的登录信息设置到cookie中，最长保存时间为1天
		if (null != flag && flag.equals("true")) {
			String cookie = loginInfoEns+":"+EncodeAndDecodeTool.encString(userName);
			setCookie(DictKeys.COOKIE_USER_ID,cookie,30*24*60*60);
			setCookie("flag",flag, 30*24 * 60 * 60);
		}else{
			//如果前端不选择记住密码，则需要删除cookie
			removeCookie("flag");
			removeCookie(DictKeys.COOKIE_USER_ID);
		}
		// 将是否记住密码保存在cookie中
		
		// 将用户id、名称设置在session中
		setSessionAttr("userName", EncodeAndDecodeTool.encString(userName));// 用户名用base64加密
		String userId = BlogUser.dao.getUserId(userName);
		setSessionAttr("uId", userId);

		renderText("success");
	}

	/**
	 * 用户注销
	 */
	public void logout() {
		// setCookie(DictKeys.COOKIE_USER_ID, "", 0);
		removeSessionAttr("uId");
		redirect("/login");
	}

	/**
	 * 获取验证码
	 * 
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	public void valiCode() throws Exception {
		// 图像的三原色red, green, blue;
		// 验证码图片的宽度
		int width = 100;
		// 验证码图片的高度
		int height = 30;
		// 验证码字体
		Font font = new Font("楷体", Font.ITALIC, 25);
		// 随机数对象
		Random random = new Random();
		// 预定义一个图像：包括宽度、高度和类型
		BufferedImage buffImg = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_BGR);
		// 创建对图像的几何形状、坐标变换、颜色管理和文本控制的图像操作类,本类中用来绘制矩形
		Graphics2D g = buffImg.createGraphics();
		// 设置图形背景色
		g.setColor(Color.white);
		// 填充背景色
		g.fillRect(0, 0, width, height);

		// 创建字体，包括主题类型，线条类型(普通，粗体，斜体)和字体大小。字体的大小应该根据图片的高度来定
		g.setFont(font);

		// 画边框
		g.setColor(Color.BLACK);
		g.drawRect(0, 0, width - 1, height - 1);

		String randomCode = ValicodeTool.getRanCode(g, width, height, 4, font);
		// 将四个数字的验证码保存到session中
		HttpSession session = getSession();
		session.setAttribute("valiCode", randomCode);
		HttpServletResponse response = getResponse();
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		response.setContentType("image/jpeg");

		// 将图像输出到servlet输出流中
		OutputStream sos = new FileOutputStream(response.getOutputStream()
				.toString());
		// ImageIO.write()方法包含了验证码的图像数据输出到客户端，也可以使用JPEGImageEncoder输出图像
		ImageIO.write(buffImg, "jpeg", sos);
		sos.close();
	}

	/**
	 * jfinal自带的验证码
	 */
	public void img() {
		CaptchaRender img = new CaptchaRender(RANDOM_CODE_KEY);
		render(img);
	}

	/**
	 * 判断验证码输入是否正确
	 */
	public void validateImg() {
		Map<String, Boolean> resMap = new HashMap<String, Boolean>();
		String valicode = getPara("valicode");
		boolean isTrue = CaptchaRender
				.validate(this, valicode, RANDOM_CODE_KEY);
		if (isTrue) {
			resMap.put("valid", true);
		} else {
			resMap.put("valid", false);
		}
		renderJson(resMap);
	}

	/*
	 * 判断用户登录是否失效
	 */
	public void checkLogin() {
		Key key = getSessionAttr("key");
		BlogUser user = CookieTool.getDecCookieUser(DictKeys.SESSION_USER_ID,
				key);
		if (user != null) {
			renderText("success");
		} else {
			renderText("fail");
		}
	}
}
