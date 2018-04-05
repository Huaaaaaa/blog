package com.hyc.blog.tools;

import java.security.Key;

import com.hyc.blog.model.BlogUser;

public class SessionTool {
	/**
	 * 给用户名和密码加密，用来保存在Session中
	 * @param userid
	 * @param password
	 * @param key
	 * @return 返回加密后的字符串
	 */
	public static String getEncSessionValue(String userid,String password,Key key){
		String encSession = "";
		String userinfo = userid+","+password;
		encSession = EncodeAndDecodeTool.getEncString(userinfo, key);
		return encSession;
	}
	
	/**
	 * 从Session中获取解密后的用户信息
	 * @param SessionName
	 * @return
	 */
	public static String getDecSessionValue(String sessionName,Key key){
		String userInfo = null;
		if(sessionName!=null){
			userInfo = EncodeAndDecodeTool.getDecString(sessionName, key);
		}
		return userInfo;
	}
	
	/**
	 * 解密用户信息并返回用户
	 * @param SessionName
	 * @param key
	 * @return
	 */
	public static BlogUser getDecSessionUser(String sessionInfo,Key key){
		BlogUser blogUser = null;
		String userId = "";
		String pwd = "";
		if(key!=null){
			String userInfo = EncodeAndDecodeTool.getDecString(sessionInfo, key);
			if(userInfo!=null && userInfo.length()>1){
				String[] info = userInfo.split(",");
				if(info.length==2){
					blogUser = new BlogUser();
					userId = info[0];
					pwd = info[1];
					blogUser.set("user_name",StringTool.getOriginalString(userId));
					blogUser.set("password",StringTool.getOriginalString(pwd));
				}
			}
		}
		return blogUser;
	}
	
	
	public static void main(String[] args) {
		
		String userId = "admin";
		String password ="admin";
		Key key = EncodeAndDecodeTool.generateKey(userId);
		String encStr = getEncSessionValue(userId, password, key);
		System.out.println("加密字符串是："+encStr);
		String decStr = getDecSessionValue(encStr, key);
		System.out.println("解密字符串是："+decStr);
		
	}
	
}
