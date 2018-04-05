/**
 * 
 */

require.config({
    baseUrl:ctx+'/static/js',
    waitSeconds:0,
    urlArgs: 'v='+random,
    paths:{
    	'jquery':'lib/jquery/jquery-3.1.0.min',
        'jquery-form': 'lib/jquery/jquery.form',
        'jquery-sammy': 'lib/jquery/jquery.sammy',
        'jquery-cookie':'lib/jquery/jquery.cookie',
        'jquery-json': 'lib/jquery/jquery.json-2.4',
        'jquery-validate': 'lib/jquery/jquery.validate',
        'jquery-metadata': 'lib/jquery/jquery.metadata',
        'jquery-easyui': 'lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min',
        'jquery-upload': 'lib/jquery/webuploader',
    	'bootstrap':'lib/bootstrap/js/bootstrap.min',
    	'bootstrapswitch':'lib/bootstrap/js/bootstrapSwitch',
/*    	'common':'common/common',
    	'hashmap':'common/hashmap',
    	'config':'common/config',
    	'browser':'common/browser',
    	'block':'common/block',*/
    },
    /*配置非模块化的外部文件，deps:指定该模块的依赖性；exports:指定模块数出名，表明这个模块外部调用时的名称*/
    shim:{
    	'jquery':{
    		exports:'jquery'
    	},
    	'jquery-form':{
    		deps:['jquery'],
    		exports:'jquery-form'
    	},
    	'jquery-sammy':{
    		deps:['jquery'],
    		exports:'jquery-sammy'
    	},
    	'jquery-cookie':{
    		deps:['jquery'],
    		exports:'jquery-cookie'
    	},
    	'jquery-json':{
    		deps:['jquery'],
    		exports:'jquery-json'
    	},
    	'jquery-validate':{
    		deps:['jquery'],
    		exports:'jquery-validate'
    	},
    	'jquery-metadata':{
    		deps:['jquery','jquery-validate'],
    		exports:'jquery-metadata'
    	},
    	'jquery-easyui':{
    		deps:['jquery'],
    		exports:'jquery-easyui'
    	},
    	'jquery-upload':{
    		deps:['jquery'],
    		exports:'jquery-upload'
    	},
    	'bootstrap':{
    		deps:['jquery'],
    		exports:'bootstrap'
    	},
    	'bootstrapswitch':{
    		deps:['jquery','bootstrap'],
    		exports:'bootstrapswitch'
    	}
    }
    
});

require(['jquery',
         'jquery-form',
         'jquery-sammy',
         'jquery-cookie',
         'jquery-json',
         'jquery-validate',
         'jquery-metadata',
         'jquery-easyui',
         'jquery-upload',
         'bootstrap',
         'bootstrapswitch',
         ],
         function(){
	     require(['app/presenter/login'],function(login){
	    		/*$.get("/login");*/
	     })
});

get_gloable_css(ctx+"/static/js/lib/bootstrap/css/bootstrap.min.css?v="+random);
get_gloable_css(ctx+"/static/js/lib/bootstrap/css/bootstrap-theme.min.css?v="+random);
get_gloable_css(ctx+"/static/css/block.css?v="+random);
get_gloable_css(ctx+"/static/css/blog.css?v="+random);


/**
 * 获取css文件
 * @param url
 */
function get_gloable_css(url){
	if(document.createStyleSheet){
		document.createStyleSheet(url);
	}else{
		var style = document.createElement("link");
		style.rel="stylesheet";
		style.type="text/css";
		style.href=url;
		document.getElementsByTagName("head")[0].appendChild(style);
	}
}