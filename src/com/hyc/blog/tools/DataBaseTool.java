package com.hyc.blog.tools;

import com.hyc.blog.common.DataBase;
import com.hyc.blog.common.DictKeys;
import com.jfinal.kit.PropKit;

/**
 * 数据库操作工具
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2017年1月4日 上午10:53:18
 *@description
 */
public class DataBaseTool {

	/**
	 * 获取数据库连接信息
	 * @return
	 */
	public static DataBase getDbInfo(String dbType){
		
		String driverClass = null;
		String jdbcUrl = null;
		String userName = null;
		String password =null;
		String ip = null;
		String port = null;
		String dbName = null;
		
		if(dbType.equals(DictKeys.db_type_postgresql)){
			
			driverClass = PropKit.get(DictKeys.db_connection_postgresql_driverClass);
			jdbcUrl = PropKit.get(DictKeys.db_connection_postgresql_jdbcUrl);
			userName = PropKit.get(DictKeys.db_connection_postgresql_userName);
			password = PropKit.get(DictKeys.db_connection_postgresql_password);
			
			dbName = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			dbName = dbName.substring(dbName.indexOf("/")+1);
			
			ip = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			ip = ip.substring(0, ip.indexOf(":"));
			
			port = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			port = port.substring(port.indexOf(":")+1,port.indexOf("/"));
			
		}else if(dbType.equals(DictKeys.db_type_mysql)){
			
			driverClass = PropKit.get(DictKeys.db_connection_mysql_driverClass);
			jdbcUrl = PropKit.get(DictKeys.db_connection_mysql_jdbcUrl);
			userName = PropKit.get(DictKeys.db_connection_mysql_userName);
			password = PropKit.get(DictKeys.db_connection_mysql_password);
			
			//解析数据库连接URL，获取数据库名称
			dbName = jdbcUrl.substring(jdbcUrl.indexOf("//")+2,jdbcUrl.indexOf("?"));
			dbName = dbName.substring(dbName.indexOf("/")+1);
			
			//解析数据库连接URL，获取数据库服务器IP
			ip = jdbcUrl.substring(jdbcUrl.indexOf("//")+2,jdbcUrl.indexOf("?"));
			ip = ip.substring(0, ip.indexOf(":"));
			
			//解析数据库连接URL，获取数据库服务器端口号
			port = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			port = port.substring(port.indexOf(":")+1,port.indexOf("/"));
			
		}else if(dbType.equals(DictKeys.db_type_oracle)){
			
			driverClass = PropKit.get(DictKeys.db_connection_oracle_driverClass);
			jdbcUrl = PropKit.get(DictKeys.db_connection_oracle_jdbcUrl);
			userName = PropKit.get(DictKeys.db_connection_oracle_userName);
			password = PropKit.get(DictKeys.db_connection_oracle_password);
			
			
			//解析数据库连接URL，获取数据库名称
			String[] prop = jdbcUrl.substring(jdbcUrl.indexOf("@")+1).split(":");
			dbName = prop[2];
			
			//解析数据库连接URL，获取数据库服务器IP
			ip = prop[0];
			
			//解析数据库连接URL，获取数据库服务器端口号
			port = prop[1];
			
		}else if(dbType.equals(DictKeys.db_type_sqlserver)){
			
			driverClass = PropKit.get(DictKeys.db_connection_sqlserver_driverClass);
			jdbcUrl = PropKit.get(DictKeys.db_connection_sqlserver_jdbcUrl);
			userName = PropKit.get(DictKeys.db_connection_sqlserver_userName);
			password = PropKit.get(DictKeys.db_connection_sqlserver_password);
			
			//解析数据库连接URL，获取数据库名称
			dbName = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			dbName = dbName.substring(dbName.indexOf("/")+1);
			
			//解析数据库连接URL，获取数据库服务器IP
			ip = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			ip = ip.substring(0, ip.indexOf(":"));
			
			//解析数据库连接URL，获取数据库服务器端口号
			port = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			port = port.substring(port.indexOf(":")+1,port.indexOf("/"));
			
		}else if(dbType.equals(DictKeys.db_type_db2)){
			
			driverClass = PropKit.get(DictKeys.db_connection_db2_driverClass);
			jdbcUrl = PropKit.get(DictKeys.db_connection_db2_jdbcUrl);
			userName = PropKit.get(DictKeys.db_connection_db2_userName);
			password = PropKit.get(DictKeys.db_connection_db2_password);
			
			dbName = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			dbName = dbName.substring(dbName.indexOf("/")+1);
			
			ip = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			ip = ip.substring(0, ip.indexOf(":"));
			
			port = jdbcUrl.substring(jdbcUrl.indexOf("//")+2);
			port = port.substring(port.indexOf(":")+1,port.indexOf("/"));
		}
		
		DataBase db = new DataBase();
		db.setDriverClass(driverClass);
		db.setJdbcUrl(jdbcUrl);
		db.setUserName(userName);
		db.setPassword(password);
		db.setIp(ip);
		db.setPort(port);
		
		return db;
	}

}
