/**
 * 项目管理入口
 */
define(['app/manage/requestManage'],function(requestManage){
	var tempParamDataTable =  new HashMap();
	var containerIdUrlTable = new HashMap();
	var containerTable = new HashMap();
	var containerUrlTable = new HashMap();
	var resizeHandlers = new HashMap();
	var sammy = $.sammy(function(){
		this.bind("run",function(event,config){
			if(config.start_url!=undefined){
				location.href=config.start_url
			}else{
				return false;
			}
		},
		this.bind("error",function(msg,error){
			
		}))
	});
	var _self ={
			init:function(){
				/*_self.repaint();
				window.onresize = function(){
					_self.repaint();
				}*/
				_self.jump("#main");
			},
			/*获取可视高度范围*/
			getPageHeight : function(){
				var pageHeigth;
				if(window.self&&self.innerHeight){
					pageHeigth = self.innerHeight;
				}else if(document.documentElement&&document.documentElement.clientHeight){
					pageHeigth = document.documentElement.clientHeight;
				}
				return pageHeight;
			},
			/*获取可视宽度范围*/
			getPageWidth : function(){
				var pageHeigth;
				if(window.self&&self.innerWidth){
					pageHeigth = self.innerWidth;
				}else if(document.documentElement&&document.documentElement.clientWidth){
					pageHeigth = document.documentElement.clientWidth;
				}
				return pageWidth;
			},
			/*重绘页面*/
			repaint:function(isInit){
				$("#main").height(_self.getPageHeight);
				var resizeArray = resizeHandlers.values();
				for(var i = 0 ;i<resizeArray.length;i++){
					resizeArray[i].call(this,isInit);
				}
			},
			/*事件绑定*/
			bind : function(eventName,eventKey,callback){
				if(eventName=="resize"){
					resizeHandlers.put(eventKey,callback);
				}
			},
			/*事件解绑*/
			unbind : function(eventName,eventKey){
				if(eventName=="resize"){
					if(resizeHandlers.containsKey(eventKey)){
						resizeHandlers.remove(eventKey);
					}
				}
			},
			/*页面跳转开始*/
			jump:function(url,data,callback){
				var samUrl = url;
				var tempUrl =(url.indexOf("?")!=-1)?url.substr(0,url.indexOf("?")):url;
				var _url = tempUrl.replaceAll("#","").replaceAll("_","/");
				var detailTag = url.substr(url.indexOf("?")+1,url.length);
				tempParamDataTable.put(url,data);
				var containerId = tempUrl;
				require(["presenter/"+_url],function(presenter){
					/*if(!sammy.has(samUrl)){
						alert(_url);
						sammy.get(samUrl,function(context){
							alert("context是："+context);
							if(presenter.getContainerId&&presenter.getContainerId()){
								containerId =presenter.getContainerId();
								var tpl = "static/tpl/"+_url+"ejs";
								if(containerId=="home_page"){
									$("#home_page").html("");
								}
								var datas = tempParamDataTabel.get(url);
								
								//需要调用ejs_template_adapter.js进行ejs模板匹配，这里不需要
								if(presenter.getData&&presenter.getData()){
									_self.update(tpl,presenter.getData(),containerId);
								}else if(datas=="warn"||datas=="fatal"){
									_self.update(tpl,null,containerId);
								}else{
									_self.update(tpl,datas,containerId);
								}
							}
							
							_self.register(tempUrl,containerId,presenter);//注册当前模块
							if(detailTag.indexOf("#")!=-1){
								presenter.execute(detailTag,datas);
							}else{
								presenter.execute(context.params);
							}
						});
					}*/
					
					/*_self.register(tempUrl,containerId,presenter);*///注册当前模块
					
					
					if(data!==undefined){
						if(detailTag.indexOf("#")==-1){
							presenter.execute(detailTag,data);
						}else{
							presenter.execute(data);
						}
					}else{
						presenter.execute("");
					}
					
					
					/*if(sammy.isRunning()){
						location.href=samUrl+(samUrl.indexOf("?")>-1?"&":"?")+"s="+Math.random();
					}else{
						sammy.run(samUrl+(samUrl.indexOf("?")>-1?"&":"?")+"s="+Math.random());
					}*/
					
					/*if(callback){
						callback(true);
					}
					*/
				},function(err){
					if(callback){
						callback(false);
					}
				});
			return false;	
			},
			/*页面跳转结束*/
			/*注册模块*/
			register : function(url,containerId,presenter){
				if(url.indexOf("?")>-1){
					url = ur.substr(0,url.indexOf("?"));
				}
				//销毁当前容器关联的功能模块
				var _presenter = containerTable.get(containerId);
				if(_presenter&&_presenter.destroy){
					_presenter.destroy();
				}
				if(containerIdUrlTable.get(containerId)){
					_self.unbind("resize",containerIdUrlTable.get(containerId));
				}
				containerIdUrlTable.remove(containerId);
				containerTable.remove(containerId);
				containerUrlTable.remove(url);
				
				containerUrlTable.put(url,containerId);
				containerTable.put(containerId,presenter);
				containerIdUrlTable.put(containerId,url);
				if(presenter&&presenter.repaint){
					_self.bind("resize",url,presenter.repaint);
				}
			}
			
	}
	return _self;
});