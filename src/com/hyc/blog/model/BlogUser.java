package com.hyc.blog.model;

import com.jfinal.plugin.activerecord.Model;

public class BlogUser extends Model<BlogUser>{

	private static final long serialVersionUID = 1L;
	public static final BlogUser dao = new BlogUser();
	
	/**
	 * 检查用户名是否存在
	 * @param name
	 * @return
	 */
	public boolean isNameExist(String name){
		boolean result = true;
		String sql = "select id from blog_user where user_name = ?";
		BlogUser user = BlogUser.dao.findFirst(sql,name);
		if(user==null){
			result = false;
		}
		return result;
	}
	
	/**
	 * 获取用户id
	 * @return
	 */
	public String getUserId(String userName){
		String sql = "select id from blog_user where user_name = ?";
		return BlogUser.dao.findFirst(sql, userName).getStr("id");
	}
	
	public BlogUser getUserByName(String userName){
		String sql = "SELECT * FROM blog_user WHERE user_name = ? OR account_email = ? OR account_phone = ?";
		return BlogUser.dao.findFirst(sql,userName,userName,userName);
	}

}
