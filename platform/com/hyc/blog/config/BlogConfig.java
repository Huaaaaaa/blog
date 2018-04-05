package com.hyc.blog.config;

import org.apache.log4j.Logger;

import com.hyc.blog.common.DataBase;
import com.hyc.blog.common.DictKeys;
import com.hyc.blog.common.MappingKit;
import com.hyc.blog.tools.DataBaseTool;
import com.hyc.extendsJfinal.AddUnderlineToPropertyName;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.i18n.I18nInterceptor;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.dialect.AnsiSqlDialect;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.dialect.OracleDialect;
import com.jfinal.plugin.activerecord.dialect.PostgreSqlDialect;
import com.jfinal.plugin.activerecord.dialect.SqlServerDialect;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
/**
 * jfinal全局配置
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年9月24日 下午2:30:27
 *@description
 */
public class BlogConfig extends JFinalConfig{

	private static final Logger log = Logger.getLogger(BlogConfig.class);
	@Override
	public void configConstant(Constants me) {
		log.info("配置常量");
		//加载配置文件中的常量
		PropKit.use("database.properties");
		me.setDevMode(false);//开启开发模式，在开发模式下jfinal会输出本次请求的controller、method以及所携带的参数
		me.setViewType(ViewType.JSP);//如果不配置，默认的视图类型是free_marker
		me.setBaseUploadPath(PathKit.getWebRootPath()+"/static/upload");//设置上传文件的默认保存路径
	}

	@Override
	public void configRoute(Routes me) {
		log.info("配置路由");
		me.add(new FrontRoutes());//前端路由
//		me.add(new AdminRoutes());//后端路由
	}
	@Override
	public void configPlugin(Plugins me) {
		log.info("配置c3p0数据库连接池连接属性");
		/*DruidPlugin druidPlugin = new DruidPlugin(db.getJdbcUrl(),db.getUserName(),db.getPassword(),db.getDriverClass());*/
		String dbType = PropKit.get(DictKeys.db_type);
		DataBase db = DataBaseTool.getDbInfo(dbType);
		log.info("配置数据库连接池大小");
		/*druidPlugin.set(PropKit.getInt(DictKeys.db_initialSize),PropKit.getInt(DictKeys.db_minIdle),PropKit.getInt(DictKeys.db_maxActive));*/
		
		log.info("配置ActiveRecord插件");
		// 配置C3p0数据库连接池插件
	    C3p0Plugin c3p0Plugin = new C3p0Plugin(db.getJdbcUrl(),db.getUserName(),db.getPassword(),db.getDriverClass());
	    c3p0Plugin.setInitialPoolSize(PropKit.getInt(DictKeys.db_initialSize));
	    c3p0Plugin.setMaxIdleTime(PropKit.getInt(DictKeys.db_maxActive));
	    c3p0Plugin.setMinPoolSize(PropKit.getInt(DictKeys.db_minIdle));
		me.add(c3p0Plugin);
		ActiveRecordPlugin arp = null;

		
		if(dbType.equals(DictKeys.db_type_mysql)){
			// 配置ActiveRecord插件
			arp = new ActiveRecordPlugin(PropKit.get(DictKeys.ds_mysql),c3p0Plugin);
			arp.setDialect(new MysqlDialect());
		}else if(dbType.equals(DictKeys.db_type_postgresql)){
			arp = new ActiveRecordPlugin(PropKit.get(DictKeys.ds_postgresql),c3p0Plugin);
			arp.setDialect(new PostgreSqlDialect());
		}else if(dbType.equals(DictKeys.db_type_oracle)){
			arp = new ActiveRecordPlugin(PropKit.get(DictKeys.ds_oracle),c3p0Plugin);
			arp.setDialect(new OracleDialect());
		}else if(dbType.equals(DictKeys.db_type_sqlserver)){
			arp = new ActiveRecordPlugin(PropKit.get(DictKeys.ds_sqlserver),c3p0Plugin);
			arp.setDialect(new SqlServerDialect());
		}else if(dbType.equals(DictKeys.db_type_db2)){
			arp = new ActiveRecordPlugin(PropKit.get(DictKeys.ds_db2),c3p0Plugin);
			arp.setDialect(new AnsiSqlDialect());
		}
		//给属性添加下划线
		arp.setContainerFactory(new AddUnderlineToPropertyName(true));
		boolean devmode = Boolean.parseBoolean(PropKit.get(DictKeys.config_devMode));
		arp.setDevMode(devmode);
		me.add(arp);

		//配置表与model的映射
		MappingKit.mapping(arp);
		

	}
                                                                                                                                                                                                                     
	@Override
	public void configInterceptor(Interceptors me) {
		/*me.add(new LoginInterceptor());*/
		me.add(new SessionInViewInterceptor());
		me.add(new I18nInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {
		me.add(new ContextPathHandler("ctx"));
	}
	
	
	public static void main(String[] args) {
		JFinal.start("WebContent", 88, "/", 5);
	}
}
