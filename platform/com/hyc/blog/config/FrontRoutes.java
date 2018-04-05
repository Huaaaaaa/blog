package com.hyc.blog.config;

import com.hyc.blog.controller.BlogController;
import com.hyc.blog.controller.CodingController;
import com.hyc.blog.controller.CoffeeController;
import com.hyc.blog.controller.FitController;
import com.hyc.blog.controller.FunnyController;
import com.hyc.blog.controller.IndexController;
import com.hyc.blog.controller.LanguageController;
import com.hyc.blog.controller.LoginController;
import com.hyc.blog.controller.OutdoorsController;
import com.hyc.blog.controller.PhotoController;
import com.hyc.blog.controller.ReadController;
import com.hyc.blog.controller.RunningController;
import com.hyc.blog.controller.TravelController;
import com.hyc.blog.controller.UserController;
import com.jfinal.config.Routes;

/**
 * 配置前端路由
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年9月24日 下午2:59:39
 *@description
 */
public class FrontRoutes extends Routes{


	@Override
	public void config() {
		add("/login", LoginController.class,"/modules/login");
		add("/",IndexController.class,"/modules");
		add("/blog",BlogController.class,"/modules/blog");
		add("/language",LanguageController.class,"/modules/language");
		add("/coding",CodingController.class,"/modules/coding");
		add("/running",RunningController.class,"/modules/running");
		add("/read",ReadController.class,"/modules/read");
		add("/fit",FitController.class,"/modules/fit");
		add("/outdoors",OutdoorsController.class,"/modules/outdoors");
		add("/travel",TravelController.class,"/modules/travel");
		add("/photo",PhotoController.class,"/modules/photo");
		add("/funny",FunnyController.class,"/modules/funny");
		add("/coffee",CoffeeController.class,"modules/coffee");
		add("/user", UserController.class,"modules/user");
		
	}
}
