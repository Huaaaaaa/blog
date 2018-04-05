package com.hyc.blog.handler;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;

public class ContextPathHandler extends Handler{


	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		request.setAttribute("base",request.getContextPath());
		request.setAttribute("version", "20161108");
		next.handle(target, request, response, isHandled);
	}
	
	
	
	/**
	 * 获取cookie
	 * @param request
	 * @param name
	 * @return
	 */
	public String getCookie(HttpServletRequest request,String name){
		String cookiev = "";
		Cookie[] cookies = request.getCookies();
		if(cookies!=null){
			for (Cookie cookie : cookies) {
				if(cookie.getName().equals(name)){
					cookiev =  cookie.getValue();
				}
			}
		}
		return cookiev;
	}

	 
}
