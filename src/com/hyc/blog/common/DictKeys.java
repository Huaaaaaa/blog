package com.hyc.blog.common;
/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年9月28日 下午3:33:43
 *@description 数据字典，常量配置
 */
public abstract class DictKeys {
	
	public static final String db_type = "db.type";
	public static final String db_type_postgresql = "postgresql";
	public static final String db_type_mysql = "mysql";
	public static final String db_type_oracle = "oracle";
	public static final String db_type_sqlserver = "sqlserver";
	public static final String db_type_db2 = "db2";
	
	/**
	 * 开发模式
	 */
	public static final String config_devMode = "config.devMode";
	/**
	 * postgresql数据库连接信息
	 */
	public static final String db_connection_postgresql_driverClass = "postgresql.driverClass";
	
	public static final String db_connection_postgresql_jdbcUrl = "postgresql.jdbcUrl";
	
	public static final String db_connection_postgresql_userName = "postgresql.userName"; 
	
	public static final String db_connection_postgresql_password = "postgresql.password"; 
	
	
	/**
	 * mysql数据库连接信息
	 */
	public static final String db_connection_mysql_driverClass = "mysql.driverClass"; 
	
	public static final String db_connection_mysql_jdbcUrl = "mysql.jdbcUrl"; 
	
	public static final String db_connection_mysql_userName = "mysql.userName"; 
	
	public static final String db_connection_mysql_password = "mysql.password"; 
	
	/**
	 * Oracle数据库连接信息
	 */
	public static final String db_connection_oracle_driverClass = "oracle.driverClass"; 
	
	public static final String db_connection_oracle_jdbcUrl = "oracle.jdbcUrl"; 
	
	public static final String db_connection_oracle_userName = "oracle.userName"; 
	
	public static final String db_connection_oracle_password = "oracle.passWord";
	
	/**
	 * sqlserver数据库连接信息
	 */
	public static final String db_connection_sqlserver_driverClass = "sqlserver.driverClass"; 
	
	public static final String db_connection_sqlserver_jdbcUrl = "sqlserver.jdbcUrl"; 
	
	public static final String db_connection_sqlserver_userName = "sqlserver.userName"; 
	
	public static final String db_connection_sqlserver_password = "sqlserver.passWord";
	
	/**
	 * db2数据库连接信息
	 */
	public static final String db_connection_db2_driverClass = "db2.driverClass"; 
	
	public static final String db_connection_db2_jdbcUrl = "db2.jdbcUrl"; 
	
	public static final String db_connection_db2_userName = "db2.userName"; 
	
	public static final String db_connection_db2_password = "db2.passWord"; 
	
	public static final String db_initialSize= "db.initialSize";
	public static final String db_minIdle= "db.minIdle";
	public static final String db_maxActive= "db.maxActive";
	/**
	 *  主数据源名称：系统主数据源
	 */
	public static final String ds_mysql = "dataSource.mysql";
	public static final String ds_postgresql = "dataSource.postgresql";
	public static final String ds_oracle = "dataSource.oracle";
	public static final String ds_sqlserver = "dataSource.sqlserver";
	public static final String ds_db2 = "dataSource.db2";
	
	/**
	 * 基本常量
	 */
	public static final String SESSION_USER_ID = "session.userinfo";
	public static final String COOKIE_USER_ID = "cookie.userinfo";
	public static final String KEY = "key";
	public static final int TIME_OUT = 60*60*1;
}
