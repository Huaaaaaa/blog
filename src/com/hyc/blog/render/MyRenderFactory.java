package com.hyc.blog.render;

import java.io.File;
import javax.servlet.http.HttpServletResponse;
import com.jfinal.render.Render;

public class MyRenderFactory{

	private static final MyRenderFactory me = me();

	public static MyRenderFactory me() {
		return me;
	}

	public MyRenderFactory(){
		
	}
	
	public Render getHttpFileRender(File file,HttpServletResponse response) {
		return new HttpFilderRender(file,response);
	}

}
