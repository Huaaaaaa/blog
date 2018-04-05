package com.hyc.blog.tools;

import java.security.Key;

import com.hyc.blog.common.DictKeys;
import com.hyc.blog.model.BlogUser;


/**
 * @createtime 2017年3月22日 上午11:25:44
 * @description Cookie工具类
 */
public class CookieTool {
	
	/**
	 * 给用户名和密码加密，用来保存在cookie中
	 * @param userid
	 * @param password
	 * @param key
	 * @return 返回加密后的字符串
	 */
	public static String getEncCookieValue(String userid,String password,Key key){
		String encCookie = "";
		String userinfo = userid+","+password;
		encCookie = EncodeAndDecodeTool.getEncString(userinfo, key);
		return encCookie;
	}
	
	/**
	 * 从cookie中获取解密后的用户信息
	 * @param cookieName
	 * @return
	 */
	public static BlogUser getDecCookieValue(String cookieName,Key key){
		BlogUser blogUser = null;
		if(cookieName!=null){
			blogUser = CookieTool.getDecCookieUser(cookieName, key);
		}
		return blogUser;
	}
	
	/**
	 * 解密用户信息并返回用户
	 * @param cookieName
	 * @param key
	 * @return
	 */
	public static BlogUser getDecCookieUser(String cookieName,Key key){
		BlogUser blogUser = null;
		String userId = "";
		String pwd = "";
		if(key!=null){
			String userInfo = EncodeAndDecodeTool.getDecString(cookieName, key);
			if(userInfo!=null && userInfo.length()>1){
				String[] info = userInfo.split(",");
				if(userInfo.length()==2){
					blogUser = new BlogUser();
					userId = info[0];
					pwd = info[1];
					blogUser.set("userName",StringTool.getMultiple8String(userId));
					blogUser.set("password",StringTool.getOriginalString(pwd));
				}
			}
		}
		return blogUser;
	}
}
