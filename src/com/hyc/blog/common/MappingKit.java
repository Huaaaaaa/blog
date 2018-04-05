package com.hyc.blog.common;

import com.hyc.blog.model.Blog;
import com.hyc.blog.model.BlogUser;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;

/**
 * 
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年9月28日 下午5:06:35
 *@description 配置数据库表与model的映射
 */
public class MappingKit {

	public static void mapping(ActiveRecordPlugin arp){
		arp.addMapping("blog_user",BlogUser.class);
		arp.addMapping("blog", Blog.class);
	}

}
