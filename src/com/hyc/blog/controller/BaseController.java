package com.hyc.blog.controller;

import java.security.Key;

import com.hyc.blog.common.DictKeys;
import com.hyc.blog.model.Blog;
import com.hyc.blog.model.BlogUser;
import com.hyc.blog.tools.CookieTool;
import com.hyc.blog.tools.SessionTool;
import com.jfinal.core.Controller;

/**
 * 基本控制类，包含全局变量和方法
 * @createtime 2017年3月23日 下午3:10:57
 * @description
 */
public class BaseController extends Controller{
	
	/**
	 * 判断cookie用户是否存在
	 * @return
	 */
	public boolean getUser(){
		boolean isUser = false;
		Key key = getSessionAttr(DictKeys.KEY);
		String userInfo = getSessionAttr(DictKeys.SESSION_USER_ID);
		if(key!=null && userInfo!=null){
			BlogUser user = SessionTool.getDecSessionUser(userInfo, key);
			if(user!=null){
				isUser = true;
			}
		}
		return isUser;
	}
	
	/**
	 * 获取cookie用户
	 * @return
	 */
	public BlogUser getCookieUser(){
		Key key = getSessionAttr("key");
		BlogUser user = SessionTool.getDecSessionUser(DictKeys.SESSION_USER_ID, key);
		if(user==null){
			redirect("/jsp/login.jsp");
		}
		return user;
	}
	/**
	 * true 返回1；false 返回0
	 * @param res
	 */
    public void renderText(boolean res){
    	renderText(res?"1":"0");
    }
}
