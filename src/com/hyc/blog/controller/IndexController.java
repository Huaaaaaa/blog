package com.hyc.blog.controller;

import com.jfinal.core.Controller;

public class IndexController extends Controller{

	/**
	 * 跳转到登录页
	 */
	public void index(){
		redirect("/login");
	}
	
	
	public void changeLanguage(){
		String local = getPara("lan");
	}
}
