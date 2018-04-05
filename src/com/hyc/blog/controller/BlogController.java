package com.hyc.blog.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.hyc.blog.interceptor.LoginInterceptor;
import com.hyc.blog.model.Blog;
import com.hyc.blog.model.BlogUser;
import com.hyc.blog.service.BlogService;
import com.hyc.blog.tools.EncodeAndDecodeTool;
import com.hyc.blog.tools.StringTool;
import com.jfinal.aop.Before;
import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;

@Before(LoginInterceptor.class)
public class BlogController extends BaseController{

	private String blogId;
	private String blogTitle;
	private String blogKey;
	private String blogHtmlcontent;
	private String blogType;
	private String blogCreateTime;
	private String blogLanguageType;
	private String blogWriter;
	private String userId;
	private Blog blog = new Blog();
	
	
	/**
	 * 跳转到新建博客页面
	 */
	public void toAdd(){
		setAttr("uid",getPara("uid"));
		render("add_blog.jsp");
	}
	/**
	 * 创建博客
	 */
	public void createBlog(){
		blogTitle = getPara("blog_title");
		blogKey = getPara("blog_key");
		blogHtmlcontent = getPara("blog_htmlcontent");
		blogType = getPara("blog_type");
		blogCreateTime = getPara("blog_create_time");
		blogLanguageType = getPara("languageType");
		userId = getPara("uid");
		blogWriter = BlogUser.dao.findById(userId).getStr("userName");
		blog.set("id",StringTool.getUUID()).set("blog_title", blogTitle).set("blog_key", blogKey).set("blog_htmlcontent", blogHtmlcontent).set("blog_type", blogType).set("blog_create_time", blogCreateTime).set("blog_language_type", blogLanguageType).set("blog_writer", blogWriter).set("user_id", userId);
		boolean cResult = BlogService.sevice.createBlog(blog);
		if(cResult){
			renderText("success");
		}else{
			renderText("fail");
		}
	}
	
	/**
	 * 查看博客
	 */
	public void viewBlog(){
		String blogId = getPara("blogId");
		Blog blog = Blog.dao.findById(blogId);
		setAttr("blog", blog);
		setAttr("userMotto",BlogUser.dao.findById(getSessionAttr("uId")).getStr("userMotto"));
		render("view_blog.jsp");
	}
	
	/**
	 * 跳转至修改blog页面
	 */
	public void toEditBlog(){
		String blogId = getPara("blogId");
		Blog blog = Blog.dao.findById(blogId);
		setAttr("blog", blog);
		render("edit_blog.jsp");
	}
	
	/**
	 * 修改
	 */
	public void editBlog(){
		blogTitle = getPara("blog_title");
		blogKey = getPara("blog_key");
		blogHtmlcontent = getPara("blog_htmlcontent");
		blogType = getPara("blog_type");
		blogCreateTime = getPara("blog_create_time");
		blogLanguageType = getPara("languageType");
		blogId = getPara("blogId");
		Blog blog = Blog.dao.findById(blogId);
		blog.set("blogTitle", blogTitle).set("blogKey", blogKey).set("blogHtmlcontent", blogHtmlcontent).
			 set("blogType", blogType).set("blogCreateTime", blogCreateTime).set("blogLanguageType", blogLanguageType);
		boolean update = BlogService.sevice.updateBlog(blog);
		if(update){
			renderText("success");
		}else{
			renderText("fail");
		}
	}
	
	/**
	 * 删除博客
	 */
	public void deleteBlog(){
		String blogId = getPara("blogId");
		boolean del = Blog.dao.deleteById(blogId);
		if(del){
			renderText("success");
		}else{
			renderText("fail");
		}
	}
	
	
	/**
	 * 跳转到首页
	 */
	public void index(){
		
		render("blog_frame.jsp");
//		boolean isUser = getUser();
//		
//		if(isUser){
//			render("blog_frame.jsp");
//		}else{
//			redirect("/login");
//		}
	}

	/**
	 * 跳转到首页
	 */
	public void head(){
		String userName = EncodeAndDecodeTool.decString(getSessionAttr("userName"));
		setAttr("nickName",BlogUser.dao.getUserByName(userName).get("nickName"));
		setAttr("userName",userName);
		render("blog_head.jsp");
	}
	
	
	/**
	 * 左侧导航
	 */
	public void left(){
		String userName = EncodeAndDecodeTool.decString(getSessionAttr("userName"));
		setAttr("nickName",BlogUser.dao.getUserByName(userName).get("nickName"));
		setAttr("figure",BlogUser.dao.getUserByName(userName).get("figure"));
		render("left.jsp");
	}
	
	/**
	 * 右侧正文
	 */
	public void right(){
		/*String isPage = getPara("isPage");
		if(isPage.equals("no")){
			render("blog_right_nopage.jsp");
		}else{
			render("blog_right_page.jsp");
		}*/
		render("welcome_index.jsp");
	}
	
	public void foot(){
		render("blog_foot.jsp");
	}
	
	public void upblog_list(){
		render("blog_upload.jsp");
	}
	/*
	 * 获取博文列表
	 */
	public void getBlogList(){
		String isPage = getPara("isPage");
		if(isPage.equals("no")){
			List<Blog> blogList = Blog.dao.getBlogList();
			if(blogList!=null){
				renderJson("blogList",blogList);
			}else{
				renderJson("blogList", null);
			}
			
		}else{
			renderJson("blogList",Blog.dao.paginate(1, 10, "select * ","from blog where 1=1 order by blog_create_time desc"));
		}
		
	}
	
	
	/**
	 * 上传文件
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	public void uploadFile(){
		/*String fileDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());*/
		UploadFile uploadFile = this.getFile();
		JSONObject jsonObj = new JSONObject();
		String fileName = uploadFile.getFileName();
		File file = uploadFile.getFile();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if(extension.equals(".jpg")||extension.equals(".png")||extension.equals(".gif")){
			prefix = "images";
		}else{
			prefix = "docs";
		}
		String filePath = file.getAbsolutePath();
		File targetDir = new File(filePath.substring(0,filePath.indexOf(fileName))+prefix);
		File targetFile = new File(targetDir.getPath()+"/"+fileName);
		if(!targetDir.exists()){
			targetDir.mkdir();
		}
		//字节数组方式上传文件
		//jsonObj = BlogService.sevice.uploadByByte(filePath, fileName, file, targetFile);
		//通道方式上传文件
		jsonObj = BlogService.sevice.uploadByChanel(filePath, fileName, file, targetFile);
		renderJson(jsonObj.toJSONString());
	}
	
	
	/**
	 * 文件下载
	 * @throws UnsupportedEncodingException 
	 */
	public void downloadFile() throws UnsupportedEncodingException{
		String fileName = getPara("fileName");
		File file = BlogService.sevice.downloadFile(fileName);
		if(file.isFile()){
//			FileController fc = new FileController();
//			fc.renderHttpFileRender(file,getResponse());
//			HttpFilderRender hfr = new HttpFilderRender(file,getResponse());
//			render(hfr);
			renderFile(file);
		}else{
			renderText("fail");
		}
	}
	
	/**
	 * 获取所有的上传文件
	 */
	public void getUploadList(){
		String filePath = PathKit.getWebRootPath()+"/static/upload/";
		File fileDir = new File(filePath);
		List<String> upfiles = new ArrayList<String>();
		upfiles= BlogService.sevice.getFileList(fileDir, upfiles);
		renderJson("upFiles",upfiles);
	}
	
	
}
