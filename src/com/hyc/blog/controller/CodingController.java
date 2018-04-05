package com.hyc.blog.controller;

import java.util.List;

import com.hyc.blog.interceptor.LoginInterceptor;
import com.hyc.blog.model.Blog;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
@Before(LoginInterceptor.class)
public class CodingController extends Controller {
	public String uid;
	public String language_type;

	public void index() {
		uid = getSessionAttr("uId");
		String dir = getPara("dir");
		if (dir != null) {
			if (dir.equals("h5")) {
				render("h5/h5_index.jsp");
			} else if (dir.equals("css")) {
				render("css/css_index.jsp");
			} else if (dir.equals("js")) {
				render("js/js_index.jsp");
			} else if (dir.equals("php")) {
				render("php/php_index.jsp");
			} else if (dir.equals("sql")) {
				render("sql/sql_index.jsp");
			} else if (dir.equals("java")) {
				render("java/java_index.jsp");
			} else if (dir.equals("c")) {
				render("c/c_index.jsp");
			} else if (dir.equals("python")) {
				render("python/python_index.jsp");
			}
		} else {
			setAttr("uId", uid);
			render("coding_newIndex.jsp");
		}
	}

	/**
	 * 跳转到日志列表页
	 */
	public void toBlogList() {
		uid = getSessionAttr("uId");
		language_type = getPara("language_type");
		setAttr("uid", uid);
		setAttr("language_type", language_type);
		render("coding_blog.jsp");

	}

	/**
	 * 获取日志列表
	 */
	public void blogPage() {
		uid = getPara("uId");
		language_type = getPara("language_type");
		int pageSize = Integer.parseInt(getPara("pageSize"));
		int rowOffset = Integer.parseInt(getPara("rowOffset"));
		int pageNumber = (rowOffset / pageSize) + 1;
		Page<Blog> pageBlogs = Blog.dao.getBlogsByPage(pageNumber, pageSize,
				language_type, uid);
		List<Blog> blogs = Blog.dao.getBlogList(language_type, uid);
		int num = 0;
		if (pageBlogs != null) {
			num = blogs.size();
			this.setAttr("total", num);
			this.setAttr("rows", pageBlogs.getList());
		} else {
			this.setAttr("status", 0);
			this.setAttr("msg", "分页列表获取失败");
		}
		this.renderJson();
		return;
	}
}
