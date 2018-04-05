package com.hyc.blog.controller;

import com.jfinal.core.Controller;

public class LanguageController extends Controller {

	/**
	 * 根据导航选项跳转到左侧对应页面
	 */
	public void navLeft(){
		String dir = getPara("dir");
		if(dir.equals("h5")){
			render("coding/h5/h5_left.jsp");
		}else if(dir.equals("css")){
			render("css/css_left.jsp");
		}else if(dir.equals("js")){
			render("js/js_left.jsp");
		}else if(dir.equals("php")){
			render("php/php_left.jsp");
		}else if(dir.equals("sql")){
			render("sql/sql_left.jsp");
		}else if(dir.equals("java")){
			render("java/java_left.jsp");
		}else if(dir.equals("c")){
			render("c/c_left.jsp");
		}else if(dir.equals("python")){
			render("python/python_left.jsp");
		}
	}
	
	/**
	 * 根据导航选项跳转到右侧对应页面
	 */
	public void navRight(){
		String dir = getPara("dir");
		if(dir.equals("h5")){
			render("coding/h5/h5_index.jsp");
		}else if(dir.equals("css")){
			render("coding/css/css_index.jsp");
		}else if(dir.equals("js")){
			render("coding/js/js_index.jsp");
		}else if(dir.equals("php")){
			render("coding/php/php_index.jsp");
		}else if(dir.equals("sql")){
			render("coding/sql/sql_index.jsp");
		}else if(dir.equals("java")){
			render("coding/java/java_index.jsp");
		}else if(dir.equals("c")){
			render("coding/c/c_index.jsp");
		}else if(dir.equals("python")){
			render("coding/python/python_index.jsp");
		}
	}

}
