package com.hyc.blog.model;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

/**
 * 
 * @Copyright:Copyright(c) 2012-2016 Company:
 * @company Hikvision(http://www.hikvision.com)
 * @author 作者：huayingcao
 * @time 创建时间：2016年11月10日 下午4:17:54
 * @description 日志类model
 */
public class Blog extends Model<Blog> {

	public static final Blog dao = new Blog();

	/**
	 * 获取日志列表
	 */
	public List<Blog> getBlogList() {
		List<Blog> blogList = new ArrayList<Blog>();
		String sql = "select * from blog where 1=1 order by blog_create_time desc";
		blogList = Blog.dao.find(sql);
		if (blogList != null) {
			return blogList;
		} else {
			return null;
		}
	}

	/**
	 * 获取日志列表
	 */
	public List<Blog> getBlogList(String blog_type, String uId) {
		List<Blog> blogList = new ArrayList<Blog>();
		String sql = "select * from blog where blog_type = ? and user_id = ? order by blog_create_time desc";
		blogList = Blog.dao.find(sql, blog_type, uId);
		if (blogList != null) {
			return blogList;
		} else {
			return null;
		}
	}

	/**
	 * 分页获取日志
	 * @param pageNumber
	 * @param pageSize
	 * @param blogType
	 * @param uid
	 * @return
	 */
	public Page<Blog> getBlogsByPage(int pageNumber, int pageSize,String blogType, String uid) {
		String sql = "from blog where blog_type = ? and user_id = ? order by blog_create_time desc";
		return Blog.dao.paginate(pageNumber, pageSize, "select * ", sql,blogType, uid);
	}

}
