package com.hyc.blog.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;




import com.hyc.blog.service.UserService;
import com.hyc.blog.tools.ValicodeTool;
import com.jfinal.core.Controller;
import com.jfinal.ext.render.CaptchaRender;

/**
 * 用户登陆
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年9月24日 下午2:41:12
 *@description
 */
public class FitController extends Controller{
		
		public void index(){
			render("fit_index.jsp");
		}
		
		
		

}
