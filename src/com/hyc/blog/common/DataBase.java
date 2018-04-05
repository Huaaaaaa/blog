package com.hyc.blog.common;

import java.io.Serializable;

/**
 * 数据库类
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2017年1月4日 上午10:37:05
 *@description
 */
public class DataBase implements Serializable{

	/**
	 * 自动生成的ID：对象的序列化是将对象转化为一种二进制数据流的方式
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 数据库连接参数：驱动名称
	 */
	
	public String driverClass;
	
	/**
	 * 数据库连接参数：连接Url
	 */
	
	public String jdbcUrl;
	
	/**
	 * 数据库连接参数：用户名
	 */
	
	public String userName;

	/**
	 * 数据库连接参数：密码
	 */
	
	public String password;

	/**
	 * 数据库连接参数：数据库服务器ip
	 */
	
	public String ip;

	/**
	 * 数据库连接参数：数据库服务器端口
	 */
	
	public String port;
	
	/**
	 * 数据库连接参数：数据库名称
	 */

	public String dbName;

	public String getDriverClass() {
		return driverClass;
	}

	public void setDriverClass(String driverClass) {
		this.driverClass = driverClass;
	}

	public String getJdbcUrl() {
		return jdbcUrl;
	}

	public void setJdbcUrl(String jdbcUrl) {
		this.jdbcUrl = jdbcUrl;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	
	
}
