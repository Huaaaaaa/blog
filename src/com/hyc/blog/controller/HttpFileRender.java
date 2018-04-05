package com.hyc.blog.controller;

import java.io.File;

import javax.servlet.http.HttpServletResponse;

import com.hyc.blog.render.MyRenderFactory;
import com.jfinal.core.Controller;
import com.jfinal.render.Render;

public class HttpFileRender extends Controller{
	
	private static final MyRenderFactory renderFactory = MyRenderFactory.me();
	private Render render;
	public HttpServletResponse response = getResponse();
	
	public Render getRender() {
		return render;
	}
	public void renderHttpFileRender(File file,HttpServletResponse response){
		render = renderFactory.getHttpFileRender(file,response);
	}

}
