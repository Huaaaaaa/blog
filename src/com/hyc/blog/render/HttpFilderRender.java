package com.hyc.blog.render;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.hyc.blog.service.BlogService;
import com.jfinal.render.Render;
/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2017年2月23日 上午9:40:42
 *@description 为了写文件下载，但是未能成功，最后还是用了renderFile(File)方法
 */
public class HttpFilderRender extends Render {

	private File  file;
	public HttpServletResponse response;

	public HttpFilderRender(File file,HttpServletResponse response) {
		this.file = file;
		this.response = response;
		render();
	}

	public void render() {
		String fileExtension = BlogService.sevice.getFileType(file);
		String fileName = file.getName();
		InputStream is  = null;
		ServletOutputStream sos = null;
		try {
			response.setContentType(fileExtension);
			fileName = new String(fileName.getBytes("UTF-8"),"UTF-8");
			response.setContentType("application/x-msdownload");
			response.setHeader("Content-Disposition","attachment;filename="+file.getName());
			response.addHeader("Cache-Control", "no-cache");
			is = new FileInputStream(file);
			sos = response.getOutputStream();
			byte buffer[] = new byte[1024];
			int n = 0;
			while((n=is.read(buffer))!= -1){
				sos.write(buffer, 0, n);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try {
				sos.flush();
				sos.close();
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
