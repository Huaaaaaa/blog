/**
 * JS配置
 */
$(function() {
	$.ajax({
		url: JSU('Index/header'),
		success: function(m) {
			$("#top").html(m);
			
			$("#g_menu a").click(function() {
				var id = $(this).attr("id");
				id = id.replace("menu_","");
				$(".a_menu").css("display","none");
				$("#amenu_"+id).css("display","block");
				$("#g_menu a").removeClass("menu_item_selected");
				$(this).addClass("menu_item_selected");
				var left = $(this).position().left;
                var width = ($("#amenu_"+id).width() - $(this).width() - 42) / 2;
                
				if (left > 0) {
                    var ml = left - width;
					$("#amenu_"+id).css("margin-left",ml > 0 ? ml : 0 );
				}
				
				$("#amenu_"+id+" a:eq(0)").trigger("click");
			});
			
			$(".a_menu a").click(function(e, p){
				var contenturl = $(this).attr("rel");
				$(".a_menu a").removeClass("a_menuhover");
				$(this).addClass("a_menuhover");
				$("body").data("levelId", $(this).attr("id"));
				
				if (contenturl != "") {
					shadeDiv("show");
					$.ajax({
						url: contenturl,
						cache: false,
						success: function(m) {	 
							$("#center").html(m);
						}
					});	
				} else {
					$("body").bodytip("无当前操作权限！", 'w');
				}
			});
			
			$("#g_menu a:eq(0)").trigger("click");
		}
	}); // end调用header
	
	var w = $(window).width();
	var nw = w > 998 ? 2 : 2;
	$("#center").css("height",$(window).height()-$("#top").height()-$("#bottom").height()-nw);
	
	$(window).resize(function() {
		var w = $(window).width();
		var nw = w > 998 ? 2 : 2;
		$("#center").css("height",$(window).height()-$("#top").height()-$("#bottom").height()-nw);
	});
}); // end $(document)

// 错误监测
function stopError(sMsg,sUrl,sLine) {
	
	var oErrorLog = "\n\n错误原因如下：\n";
	oErrorLog += "Error: " + sMsg + "\n";
	oErrorLog += "Line: " + sLine + "\n";
	oErrorLog += "URL: " + sUrl + "\n";

	return true;
}

//window.onerror = stopError;

/**
 * 窗口自适应
 */
$(window).resize(function() {
	resizeHeight();
});

// 根据按钮ID设置权限
function AC_by_ID(btn_perform) {
	if (checkNull(btn_perform)) return;
	
	 // 微视云
	if (MY.Think.cloud_type == "2") {
	
	}
	
	// 标准云
	if (MY.Think.cloud_type == "1") {
	
	}
	
	// 超级管理员权限
	if (MY.Think.uid != "Administrator") {
			
	}
}

// 隐藏遮罩
function shadeDiv(act) {
	if ($("#shadeDiv").length <= 0) {
		var div = '<div id="shadeDiv" style="top:0px;left:0px;right:-35px;bottom:-215px;position:absolute; z-index: 1011;background: #aaaaaa url(' 
			+ MY.Think.static + '/css/images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x;opacity:.0;filter:Alpha(Opacity=0);"></div><div id="loadingFullDiv" class="loading-full"><span class="loading-img"></span>'+lang._is_loading_+'</div>';
		$("body").append(div);
	}
	
	if (act == "show") {
		$("#loadingFullDiv").show();
		$("#shadeDiv").show();
	} else {
		$("#loadingFullDiv").fadeOut(200);
		$("#shadeDiv").hide();
	}
}

// 是否为空F
function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
	
    return true;
}

// 检测data-tables选中
function checkGridChoose(tableId, name, len, max) {
	var len = len || 1;
	var ckb =  [];
	$("input[name='ckb_"+tableId+"']:checked", $("#"+tableId)).each(function(){
		ckb.push( $("#"+tableId).dataTable().fnGetData( this.parentNode.parentNode ) );
	});
    var oT = $("#"+tableId).dataTable();
    var oSet = oT.fnSettings();
    var chooseData = oSet.chooseData;

    if (chooseData && !isEmpty(chooseData)) {
        for (var page in chooseData) {
            var length = chooseData[page].length;
        }
    }

	if (ckb.length == 0) {
		return lang._js_select_ + name;
	}
	if(len != -1){
		if(ckb.length == len) {
			return ckb;
		} else if(ckb.length != len){
			return lang._js_select1_ + name;
		}
	} else {
        if(max) {
            if(ckb.length > max) {
                return lang._js_select_ + name;
            }
        }
		return  ckb;
	}
}

// 添加按钮
function addButton(PlankId, text, btnIcon, action, btnID) {
	if (!btnID) {
		$('<button class="btn" type="button"><span class="btn-icon '+btnIcon+'"></span><span class="btn-text">'+text+'</span></button>')
			.appendTo($('#t_'+PlankId))
			.bind('click', action);
	} else {
		$('<button id="'+btnID+'" class="btn" type="button"><span class="btn-icon '+btnIcon+'"></span><span class="btn-text">'+text+'</span></button>')
			.appendTo($('#t_'+PlankId))
			.bind('click', action);
	}
}

// 判断超时
function checkExpire() {
	$.ajax({
		url: JSU('Index/checkexpire'),
		cache: false,
		dataType: 'JSON',
		async: false, // 同步
		success: function(m) {
			if (m && m.status == 0) {
				window.location.href = MY.Think.root + '/';
			}
		}
	});
}

// 弹出框
function showDialog(action, dialogId, dialogAjax, actionClick, dialogSize, dialogPercent, cancelAction) {
	// 2015-10-26(解决集群组建，修改主机名后JS错误)
	if (dialogId != "dialogModifyHostname") {
		$(".ui-dialog").each(function(){
			if ($(this).is(":hidden")){
				$(this).remove();
			}			
		});	
	}

	$("#" + dialogId).remove();
	
	var w = $(window).width();
	var h = $(window).height();
	
	// 弹出框标题
	if (dialogAjax.title && dialogAjax.title != undefined) {
		var dialogTitle = dialogAjax.title;
		dialogAjax.title = null;
		delete dialogAjax.title;
	} else {
		var dialogTitle = $(this).html();
	}
	
	var settings = {
	    width: w > 520 ? 520 : w - 20,
		title : dialogTitle,
		resizable: false,
		modal: true,
		buttons: {},
		close: function() {
			cancelAction && cancelAction();
		}
	}
	
	// 弹出框宽高自定义
	if (typeof dialogSize == 'object') {
		if (dialogSize.width) {
			settings.width = dialogSize.width;
		}
	
		if (dialogSize.height) {
			settings.height = dialogSize.height;
		}	
	} else if (typeof dialogSize == 'number') {
		settings.width = dialogSize;
	}

	// 弹出框宽百分百，特殊定制
	if (dialogId == "dialogCreateDevice"
		|| dialogId == "dialogCreateRp"
		|| dialogId == "dialogModifyRecordplan"
		|| dialogId == "dialogFormat"
		|| dialogId == "dialogEditBucket") {
		
		if (dialogPercent) {
			settings.width = w > (150 * dialogPercent + 120) ? (150 * dialogPercent + 120) : (w - 20);
		}
	}
	
	// 弹出框操作配置
	if (action) {
		settings.buttons[action] = actionClick;
		settings.buttons[lang._btn_cancle_] = function() {
			cancelAction && cancelAction();
			$(this).dialog("close");
		}
	} else {
		settings.buttons[lang._btn_close_] = actionClick;
	}
	
	dialogAjax.type = 'POST';
	dialogAjax.success = function(m) {

		if(!m){
			return ;
		}
		
		if ($('#'+dialogId).length > 0) {
			$('#'+dialogId).html(m).dialog(settings).css("min-height", "");
		} else {
			$('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
		}
		
		// 重置弹出框配置
		delete settings;
		
		if (dialogAjax.formId) {
			var v = dialogAjax.validate || function() {};
			var vv = $("#"+dialogAjax.formId).validate({
				submitHandler: function() {
					var check = v(vv);
					if (!!check || check == undefined) dialogAjax.validateSuccess()
				}
			});	
		}
		
		if(dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
				dialogAjax.afterAjax();
		}
		
		if (!action) {

		} else {
			$("#"+dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonBlue");
		}
	}
	
	$.ajax(dialogAjax);
}

// 提示框
function showAlert(m, alertType, action) {
	if (typeof m == "undefined") {
		m = lang._undefined_;	
	}
	
	var ml = m.replace(/[^\x00-\xff]/g, "aa").length;
	var w = $(window).width();
	var h = $(window).height();
	var btnText = lang._btn_close_;
	var alertTitle = lang._com_prompting_;
	var dialogId = 'alertid';
	
	var settings = {
		title : alertTitle,
		resizable : false,
		modal : true,
		buttons : {}
	}
	
	if (alertType == 'relogin') {
		btnText = lang._btn_relogin_;
		var at = 'alert';
	} else {
		var at = !!alertType ? alertType : "info";
	}

	m = '<div class="alert alert-' + at + '">' + m + '</div>';
	settings.buttons[btnText] = function () {
		$(this).dialog("close");
		if (action) {
			action.apply($('#' + dialogId));
		}
	}
	
	if ($('#' + dialogId).length > 0) {
		$('#' + dialogId).html(m).dialog(settings).css("min-height", "");
	} else {
		$('<div id="' + dialogId + '" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
	}
	
	$('#' + dialogId + " .text-alert").width($('#' + dialogId).width() - 70).css({
		"display" : "inline-block",
		"margin-top" : "3px"
	});
	
	delete settings;
}

// 确定框
function showConfirm(m, ok, confirmSize, cancel) {
	var ml = m.replace(/[^\x00-\xff]/g,"aa").length;
	var w = $(window).width();
	var h = $(window).height();
	m = '<div class="alert  alert-info">'+m+'</div>';
	var confirmTitle = lang._com_confirm_;
	var dialogId = 'confirmid';
	var settings = {
		title: confirmTitle,
		resizable: false,
		modal: true,
		buttons: {}
	}
	settings.width = w > ml*7 + 70 ? ml*7 + 70 : w-20;
	if(settings.width >= 450) {
		settings.width = w > 450 ? 450 : w-20;
	} else if(settings.width < 280) {
		settings.width = w > 280 ? 280 : w-20;
	}
    var cancel = cancel;
	if(!cancel) {
        cancel = function() {
			$( this ).dialog( "close" );
		}
	}
    settings.buttons[lang._com_yes_] = ok;
    settings.buttons[lang._com_no_] = cancel;
	if ($('#'+dialogId).length > 0) {
		$('#'+dialogId).html(m).dialog(settings).css("min-height", "");;
	} else {
		$('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");;
	}
	$("#"+dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonBlue").blur();
	
	$( "#"+dialogId ).prev("div").children("a.ui-dialog-titlebar-close").unbind("click").bind("click", function() {
		cancel.apply($( "#"+dialogId ));
	});
	$( "#"+dialogId ).parent().unbind("keydown").bind("keydown", function(e) {
		if(e.keyCode == 27) {
			cancel.apply($( "#"+dialogId ));
		}
	});
	delete settings;
}

// 集群组建弹出框
function showClusterSettings(clusterText, dialogIN, dialogAjax, buttonSettings) {
	var w = $(window).width();
	var h = $(window).height();
	var dTitle = clusterText;
	var dialogIdText = 'dClusterSettings';

	if (dialogIN && typeof dialogIN != 'object') {
		var dialogId = dialogIdText + dialogIN;
	} else {
		buttonSettings = dialogAjax;
		dialogAjax = dialogIN;
		var dialogId = dialogIdText + parseInt(Math.random() * (100 - 11) + 11);
	}
	var settings = {
		width : w > 950 ? 950 : w - 20,
		height : h > 480 ? 480 : h - 20,
		title : dTitle,
		resizable : false,
		modal : true,
		//closeOnEscape: false,
		buttons : {}
	}
	if (buttonSettings) {
		for (var i = 0; i < buttonSettings.length; i++) {
			settings.buttons[buttonSettings[i].name] = buttonSettings[i].method;
		}
	}

	showClusterSettings.closed = function (id) {
		if (!id) {
			var id = ""
		}

		$(".cluster-settings-dialog").each(function () {
			var dId = $(this).attr("id");
			$(this).dialog("close");

			if (id != "#" + dId && "#dClusterSettings1" != "#" + dId) {
				$(this).remove();
			}
		});

		$(id).dialog("open");
	}

	dialogAjax.type = 'POST';
	dialogAjax.cathe = false;
	dialogAjax.success = function (m) {
		if ($('#' + dialogId).length > 0) {
			$('#' + dialogId).html(m).dialog(settings);
		} else {
			$('<div id="' + dialogId + '" class="dialog-div"></div>').html(m).dialog(settings);
		}
		
		// 2015-10-26
		if ($(".cluster-settings-dialog").length > 0) {
			$(".cluster-settings-dialog").each(function () {
				var dId = $(this).attr("id");
				if (dialogId != dId) {
					$(this).dialog("close");
				}
			});
		}

		$("#" + dialogId).nextAll("div.ui-widget-content").children("div").children("button").addClass("buttonBlue");
		
		if (dialogIN == "_expand_node_1") {
			$("#" + dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(1)").removeClass("buttonBlue");
		} else {
			$("#" + dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").removeClass("buttonBlue");
		}
		
		$("#" + dialogId).addClass("cluster-settings-dialog");
		
		delete settings;
		
		if (dialogAjax.formId) {
			var v = dialogAjax.validate || function () {};
			$("#" + dialogAjax.formId).validate({
				submitHandler : function () {
					var check = v($("#" + dialogAjax.formId));
					if (!!check || check == undefined)
						dialogAjax.validateSuccess.apply($("#" + dialogId));
				}
			});
		}
		
		if (dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
			dialogAjax.afterAjax.apply($("#" + dialogId));
			$("#" + dialogId).prev("div").children("a.ui-dialog-titlebar-close").unbind("click").bind("click", function () {
				$(".cluster-settings-dialog").each(function () {
					$(this).dialog("close").remove();
				});
			});
			$("#" + dialogId).parent().unbind("keydown").bind("keydown", function (e) {
				if (e.keyCode == 27) {
					$(".cluster-settings-dialog").each(function () {
						$(this).dialog("close").remove();
					});
				}
			});
		}
	}
	
	if (dialogAjax.Cookie && dialogAjax.Cookie != "") {
		$('<div id="' + dialogId + '" class="dialog-div"></div>').html(dialogAjax.Cookie).dialog(settings);
	} else {
		$.ajax(dialogAjax);
	}
}

// 日期选择框
function showDialogPicker(action, dialogId, dialogAjax, actionClick, dialogSize, dialogPercent) {
    var w = $(window).width();
    var h = $(window).height();
    if(dialogAjax.title && dialogAjax.title != undefined) {
        var dialogTitle = dialogAjax.title;
        dialogAjax.title = null;
        delete dialogAjax.title;
    } else {
        var dialogTitle = $(this).html();
    }
    var settings = {
        width: w > 540 ? 540 : w-20,
        title : dialogTitle,
        resizable: false,
        modal: false,
        closeOnEscape: false,
        draggable: false,
        stack: false,
        buttons: {}
    };
    if (action) {
        settings.buttons[action] = actionClick;
        settings.buttons[lang._btn_cancle_] = function() {
            $( this ).dialog( "close" );
        }
    } else {
        settings.buttons[lang._btn_close_] = actionClick;
    }


    dialogAjax.type = 'POST';
    dialogAjax.success = function(m) {
        if($('#'+dialogId).length > 0) {
            $('#'+dialogId).dialog("open");
            $('#'+dialogId).prev('div.ui-dialog-titlebar').children('span.ui-dialog-title').html(dialogTitle);
        } else {
            $('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings);
        }
        delete settings;
        if(dialogAjax.formId) {
            var v = dialogAjax.validate || function() {
            };
            var vv = $("#"+dialogAjax.formId).validate({
                submitHandler: function() {
                    var check = v(vv);
                    if(!!check || check == undefined) dialogAjax.validateSuccess()
                }
            });
        }
        if(dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
            $('#'+dialogId).parent().css({top:"150px","left":"20px"});
            dialogAjax.afterAjax();
        }
        $( "#"+dialogId ).prev("div.ui-dialog-titlebar").css({"visibility": "hidden", "display": "none"});
        $( "#"+dialogId ).next("div.ui-dialog-buttonpane").css({"visibility": "hidden", "display": "none"});
        $( "#"+dialogId ).parent("div").css("border", "1px solid #cccccc");
    };
    $.ajax(dialogAjax);
}

// 定制增加节点框
function showDialogAddCluster(action, dialogId, dialogAjax, actionClick) {
    var w = $(window).width();
    var h = $(window).height();
    if(dialogAjax.title && dialogAjax.title != undefined) {
        var dialogTitle = dialogAjax.title;
        dialogAjax.title = null;
        delete dialogAjax.title;
    } else {
        var dialogTitle = $(this).html();
    }
    var settings = {
        width: w > 950 ? 950 : w-20,
        height: h > 480 ? 480 : h-20,
        title : dialogTitle,
        resizable: false,
        modal: true,
        //closeOnEscape: false,
        buttons: {}
    };
    settings.buttons[action] = actionClick;
    settings.buttons[lang._btn_cancle_] = function() {
        $( this ).dialog( "close" );
    };

    dialogAjax.type = 'POST';
    dialogAjax.success = function(m) {
        if($('#'+dialogId).length > 0) {
            $('#'+dialogId).html(m).dialog(settings).css("min-height", "");
        } else {
            $('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
        }
        delete settings;
        if(dialogAjax.formId) {
            var v = dialogAjax.validate || function() {
            };
            var vv = $("#"+dialogAjax.formId).validate({
                submitHandler: function() {
                    var check = v(vv);
                    if(!!check || check == undefined) dialogAjax.validateSuccess()
                }
            });
        }
        if(dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
            dialogAjax.afterAjax();
        }
        $("#"+dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonBlue");
    }
    $.ajax(dialogAjax);
}

// 针对大的弹出框
function showBigDialog(action, dialogId, dialogAjax, actionClick, dialogSize, dialogPercent) {
	var w = $(window).width();
	var h = $(window).height();
	if(dialogAjax.title && dialogAjax.title != undefined) {
		var dialogTitle = dialogAjax.title;
		dialogAjax.title = null;
		delete dialogAjax.title;
	} else {
		var dialogTitle = $(this).html();
	}
	var settings = {
	    width: w > 820 ? 820 : w-20,
		height: h > 410 ? 410 : h-20,
		title : dialogTitle,
		resizable: false,
		modal: true,
		buttons: {}
	}
	if (action) {
		settings.buttons[action] = actionClick;
		settings.buttons[lang._btn_cancle_] = function() {
			$( this ).dialog( "close" );
		}
	} else {
		settings.buttons[lang._btn_close_] = actionClick;
	}
	
	dialogAjax.type = 'POST';
	dialogAjax.success = function(m) {
		if($('#'+dialogId).length > 0) {
			$('#'+dialogId).html(m).dialog(settings).css("min-height", "");
		} else {
			$('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
		}
		delete settings;
		if(dialogAjax.formId) {
			var v = dialogAjax.validate || function() {
			};
			var vv = $("#"+dialogAjax.formId).validate({
				submitHandler: function() {
					var check = v(vv);
					if(!!check || check == undefined) dialogAjax.validateSuccess()
				}
			});	
		}
		if(dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
				dialogAjax.afterAjax();
		}
		if (!action) {
		} else {
			$("#"+dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonBlue");
		}
	}
	$.ajax(dialogAjax);
}

// 获取当前节点信息
function getNodeInfo(divId, nodeip) {
	if (!checkNull(nodeip)) {
		var islocal = 'n';
	} else {
		var islocal = 'y';
	}
	
	$.ajax({
		url : JSU('Config/getnodeinfo'),
		type : 'POST',
		dataType : 'json',
		data : {
			'islocal' : islocal,
			"nodeip" : nodeip
		},
		success : function (m) {
			if (m.status == 1) {
				var data = m.data,
					$isadded = false;
				
				$("#"+divId+" table.search_table tbody tr").each(function () {
					var tempIp = $(this).find('td:eq(1)').attr("rel");
					if (data['ip'] == tempIp) {
						$isadded = true;
						return;
					}
				});
				
				if (!$isadded) {
					var trData = '<tr><td class="tdlabel1"><span class="icontf-choose"></span></td><td class="tdlabel" rel="' + data.ip + '">' + data.ip 
						+ '<input type="hidden" name="nodeip[]" value="' + data.ip + '" /></td><td class="tdlabel2" rel="' + data.hostname + '">' + data.hostname 
						+ '<input type="hidden" name="nodehostname[]" value="' + data.hostname + '" /></td><td class="tdlabel3" rel="' + data.systime + '">' + data.systime 
						+ '</td><td class="tdlabel3">' + lang._org_online_ + '</td><td class="tdbtn2" style="text-align:center;"><button class="btn btnRefresh">'+lang._btn_refresh_
						+ '</button></td></tr>';
					
					$(trData).appendTo($("#"+divId+" table.search_table tbody"));
					
					$("#"+divId+" .btnRefresh").on("click", function() {
						var t = $(this);
						var nodeip = t.parent().parent().children("td:eq(1)").children("input").val();

						if (isIp(nodeip)) {
							$.ajax({
								url : JSU('Config/getnodeinfo'),
								type : 'POST',
								dataType : 'json',
								data : {"nodeip" : nodeip},
								success : function (m2) {
									if (m2.status == 0) {
										showAlert(m2.info);
										return;
									}
									
									var data2 = m2.data;
									t.parent().parent().children("td:eq(3)").html(data2.systime).attr("rel", data2.systime);
								}
							});	
						}
					}); // end 刷新
					
					$("#"+divId+" .btnHost").on("click", function() {
						var t = $(this);
						var nodeip = t.parent().parent().children("td:eq(1)").children("input").val();
						var hostname = t.parent().parent().children("td:eq(2)").children("input").val();
						
						showDialog.call(this, lang._confirm_, 'dialogModifyHostname', {
							data : {nodeip : nodeip, nodehostname : hostname},
							url : JSU('Cluster/modifyhostnamedlg'),
							formId : "formModifyHostname",
							validateSuccess : function () {
								$("#formModifyHostname").ajaxSubmit({
									url : JSU('Cluster/modifyhostnamedlg'),
									data : {"exec_mode" : "ajax"},
									type : 'POST',
									dataType : 'json',
									success : function (m) {
										if (m.status == 0) {
											showAlert(m.info);
											return;
										}
										
										$('#dialogModifyHostname').dialog('close');
										t.parent().parent().children("td:eq(2)").html(m.data + '<input type="hidden" name="nodehostname[]" value="' + m.data + '" />').attr("rel", m.data);
										showAlert(m.info);
									}
								});
							}
						}, function () {
							$("#formModifyHostname").submit();
						});
					}); // 修改主机
				} else {
					showAlert(lang._org_server_added_);		
				}	
			} else {
				showAlert(m.info);	
			}
		}
	});
}

// 错误码
function errorEodeFocus(code, t) {
	var ecode = {
		"20106" : "pool_name",
		"20107" : "pool_name"
	}, n = '';
	
	for(var i in ecode) {
		if(code == i) {
			n = ecode[i];	
			break;
		}	
	}
	
	if(t) {
		$('input[name="'+n+'"]', t).focus();
	} else {
		$('input[name="'+n+'"]').focus();	
	}
}

// 阻止冒泡
function preventBubble(e) {
	if (window.event) {
        e.cancelBubble = true; // ie
    } else {
        e.preventDefault();
        e.stopPropagation(); // 其它浏览器下阻止冒泡
    }
}

// 自适应
function resizeHeight() {
	var config = {
		top : $("#top").outerHeight(),
		title : $("#center").find(".infoTitle").outerHeight(),
		foot : $("#bottom").outerHeight(),
		height : $(window).height()
	}

	$("#formManageConfig").height(config.height - config.top - config.title - config.foot - 30);
}

// in_array
function isExistInArr(_array, _element) {
	if (!_array || !_element) return false;
	
	if (!_array.length) {
		return (_array == _element);
	}
	
	for (var i = 0; i < _array.length; i++) {
		if (_element == _array[i]) return true;
	}
	
	return false;
}

// 数组去重
function distinct(_array) {
	if (!_array || !_array.length) return _array;
	
	var newArray = new Array();
	
	for (var i = 0; i < _array.length; i++) {
		var oEl = _array[i];
		
		// 强制成小写
		oEl = oEl.toLowerCase();
		
		if (!oEl || this.isExistInArr(newArray, oEl)) continue;
		
		newArray[newArray.length] = oEl;
	}
	
	return newArray;
}

function isIp(v) {
	if (v == '') return false;
	
	return /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(v);
}

// 数字判断
function isNumber(v) {
	if (v == '') return false;
	
	return /^-?\d+$/i.test(v);
}

// 判断空
function checkNull(v) {
	if (v === null || v === undefined || v === "" || v === "0" || v === 0) return true;
	
	return false;
}

// 字符串工具
function string1Utils(v) {
	if (v == '') return false;
	
	return /^[0-9a-zA-Z_.]+$/.test(v);
}

function string2Utils(v) {
	if (v == '') return false;
	
	return /^[0-9a-zA-Z\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\;\|\<\>\,\.\?\/\:\s]+$/.test(v);
}

// 补零
function StringPad(num, n) {
	if (typeof n == "undefined") n = 2;
	
	var len = num.toString().length;
	while(len < n) {
		num = "0" + num;
		len++;
	}
	
	return num;
}

// 计算字节
function MbStringLength(s) {
	var totalLength = 0;
	var i;
	var charCode;
	
	for (i = 0; i < s.length; i++) {
		charCode = s.charCodeAt(i);
		
		if (charCode < 0x007f) {
			totalLength = totalLength + 1;
		} else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
			totalLength += 2;
		} else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
			totalLength += 3;
		}
	}

	return totalLength;
}

function getRandom() {
	var random_value = Math.floor(1000 + Math.random() * (9999 - 1000));
	var date_value   = new Date().getTime();
	
	return date_value + random_value;
}

// ============================================ 模板JS函数 ============================================

function Mb2Gb(data, digit) {
	if (typeof digit == "undefined") {
		digit = 2;
	}
	
	if (!isNumber(data)) return '0';
	if (checkNull(data)) return '0'; 
	
	var v  = parseInt(data);
	var v1 = data / 1024;
	
	return v1.toFixed(digit);
}

function tplDoNull(data, def) {
	if (typeof def == "undefined") {
		def = '-';
	}
	
	if (checkNull(data)) return def;
	
	return data;
}

// 前端设备类型
function tplFrontDeviceType(data) {
	if (data == "0") {
		return 'HIKVISION';
	} else if (data == "1") {
		return 'PANASONIC';
	} else if (data == "2") {
		return 'SONY';
	} else if (data == "3") {
		return 'DAHUA';
	} else if (data == "4") {
		return 'ONVIF';
	} else if (data == "5") {
		return 'PSIA';
	} else if (data == "6") {
		return 'AXIS';
	} else if (data == "7") {
		return 'SAMSUNG';
	} else if (data == "8") {
		return 'PELCO';
	} else if (data == "9") {
		return 'ARECONT';
	} else if (data == "10") {
		return 'VIVOTEK';
	} else if (data == "11") {
		return 'BOSCH';
	} else if (data == "12") {
		return 'CANON';
	} else if (data == "13") {
		return 'ACTi';
	} else if (data == "14") {
		return 'INFINOVA';
	} else if (data == "15") {
		return 'SANYO';
	} else if (data == "16") {
		return 'PROVIDEO';
	} else if (data == "17") {
		return 'DYNACOLOR';
	} else if (data == "18") {
		return 'GRANDEYE';
	} else if (data == "19") {
		return 'NATURE';
	} else if (data == "20") {
		return 'GE105E';
	} else if (data == "21") {
		return 'XUNMEI';
	} else if (data == "100") {
		return 'GB28181';
	} else if (data == "200") {
		return 'ONVIF';
	} else if (data == "300") {
		return 'PSIA';
	} else if (data == "400") {
		return 'EHOME';
	} else if (data == "500") {
		return 'RTSPSTD';
	} else {
		return '-';
	}
}

function tplAccessStatus(data) {
	if (data == "0") {
		return '<span class="s-error"><i></i>'+lang._cva_access0_+'</span>';
	} else if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cva_access1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-warning"><i></i>'+lang._paused_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}
}

function tplRecordStatus(data) {
	if (data == "0") {
		return '<span class="s-warning"><i></i>'+lang._cva_record0_+'</span>';
	} else if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cva_record1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-error"><i></i>'+lang._cva_record2_+'</span>';
	} else if (data == "3") {
		return '<span class="s-error"><i></i>'+lang._cva_record3_+'</span>';
	} else if (data == "4") {
		return '<span class="s-error"><i></i>'+lang._cva_record4_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}
}

function tplCVAStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cva_status1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-error"><i></i>'+lang._cva_status2_+'</span>';
	} else if (data == "3") {
		return '<span class="s-error"><i></i>'+lang._cva_status3_+'</span>';
	} else if (data == "4") {
		return '<span class="s-error"><i></i>'+lang._cva_status4_+'</span>';
	} else if (data == "6") {
		return '<span class="s-error"><i></i>'+lang._cva_status6_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}	
}

function tplInCluster(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cva_incluster1_+'</span>';
	} else {
		return '<span class="s-error"><i></i>'+lang._cva_incluster0_+'</span>';
	}
}

// 集群管理 集群列表 集群状态
function tplClusterStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._ct_inited_+'</span>';
	} else if (data == "2") {
		return '<span class="s-warning"><i></i>'+lang._initializing_+'</span>';
	} else if (data == "0") {
		return '<span class="s-warning"><i></i>'+lang._uninitialized_+'</span>';
	} else if (data == "100") {
		return '<span class="s-warning"><i></i>'+lang._ct_synching_+'</span>';
	} else if (data == "3") {
		return '<span class="s-warning"><i></i>'+lang._ct_adding_+'</span>';
	} else if (data == "4") {
		return '<span class="s-error"><i></i>'+lang._ct_add_failed_+'</span>';
	} else {
		return '<span class="s-error"><i></i>'+lang._ct_init_failed_+'</span>';
	}	
}

// 云类型
function tplCloudType(data) {
	if (data == "1") {
		return lang._ct_cloudtype1_;
	} else if (data == "2") {
		return lang._ct_cloudtype2_;
	} else {
		return '-';
	}	
}

function tplCloudStatus(data) {
	if (data == "0") {
		return '<span class="s-error"><i></i>'+lang._uninitialized_+'</span>';
	} else if (data == "1") {
		return '<span class="s-warning"><i></i>'+lang._initializing_+'</span>';
	} else if (data == "2") {
		return '<span class="s-success"><i></i>'+lang._ct_cloudstatus2_+'</span>';
	} else if (data == "9") {
		return '<span class="s-error"><i></i>'+lang._ct_cloudstatus9_+'</span>';
	} else if (data == "100") {
		return '<span class="s-warning"><i></i>'+lang._reforming_+'</span>';
	} else if (data == "101") {
		return '<span class="s-error"><i></i>'+lang._reform_0_+'</span>';
	} else {
		return '-';
	}	
}

// CVM/CVS节点 在线状态
function tplNodeOnline(data) {
	if (data == '0') {
		return '<span class="s-error"><i></i>'+lang._ct_offline_+'</span>';
	} else if (data == '1') {
		return '<span class="s-success"><i></i>'+lang._ct_online_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}	
}

// 存储节点管理 存储节点 节点状态
function tplCVSNodeStatus(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._ct_normal_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-warning"><i></i>' + lang._ct_abnormal_ + '</span>';
	} else if (data == '3') {
		return '<span class="s-error"><i></i>' + lang._ct_unused_ + '</span>';
	} else if (data == '0') {
		return '<span class="s-error"><i></i>' + lang._uninitialized_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}


// 集群管理 管理节点 运行状态
function tplNodeStatus(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._ct_normal_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-error"><i></i>' + lang._ct_abnormal_ + '</span>';
	} else if (data == '3') {
		return '<span class="s-error"><i></i>' + lang._ct_unused_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

// 集群管理 管理节点 服务状态
function tplServiceStatus(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>'+lang._ct_work_+'</span>';
	} else if (data == '2') {
		return '<span class="s-warning"><i></i>'+lang._ct_sleep_+'</span>';
	} else if (data == '0') {
		return '<span class="s-warning"><i></i>'+lang._ct_unha_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}	
}

// 集群管理 管理节点 HA状态
function tplHaActive(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>'+lang._cluster_haactive1_+'</span>';
	} else if (data == '2') {
		return '<span class="s-warning"><i></i>'+lang._cluster_haactive2_+'</span>';
	} else if (data == '3') {
		return '<span class="s-success"><i></i>'+lang._cluster_haactive3_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._ct_unknown_+'</span>';
	}	
}

// 集群管理 管理节点 节点角色
function tplHaRole(data) {
	if (data == '1') {
		return lang._ct_master_;
	} else if (data == '2') {
		return lang._ct_slaver_;
	} else if (data == '0') {
		return lang._ct_unha_;
	} else {
		return lang._ct_unknown_;
	}	
}

// 集群管理 管理节点 节点角色
function tplNodeRole(data) {
	if (data == '1') {
		return lang._cluster_noderole1_;
	} else if (data == '2') {
		return lang._cluster_noderole2_;
	} else {
		return lang._ct_unknown_;
	}	
}

function tplUserRole(data) {
	if (data == 'admin') {
		return lang._admin_;
	} else if (data == 'Administrator') {
		return lang._administrator_;
	} else if (data == 'guest') {
		return lang._guest_;
	} else {
		return '-';
	}	
}

// 存储节点管理 存储节点 设备类型/磁盘类型
function tplBlockDevType(data) {
	if (data == '0') {
		return 'Unknown';
	} else if (data == '1') {
		return 'RAID';
	} else if (data == '2') {
		return 'iRAID';
	} else if (data == '3') {
		return 'iSCSI';
	} else if (data == '4') {
		return 'DISK';
	} else if (data == '5') {
		return 'FC';
	} else if (data == '6') {
		return lang._ssd_cache_;
	} else if (data == '7') {
		return 'IP';
	} else if (data == '8') {
		return 'NAS';
	} else {
		return 'Unknown';
	}	
}

// 存储节点管理 存储节点 设备类型
function tplBlockInitStatus(data) {
	if (data == "1") {
		return '<span class="s-error"><i></i>'+lang._cvs_initstatus1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-warning"><i></i>'+lang._cvs_initstatus2_+'</span>';
	} else if (data == "3") {
		return '<span class="s-warning"><i></i>'+lang._cvs_initstatus3_+'</span>';
	} else if (data == "4") {
		return '<span class="s-warning"><i></i>'+lang._cvs_initstatus4_+'</span>';
	} else if (data == "5") {
		return '<span class="s-error"><i></i>'+lang._cvs_initstatus5_+'</span>';
	} else if (data == "6") {
		return '<span class="s-warning"><i></i>'+lang._cvs_initstatus6_+'</span>';
	} else if (data == "7") {
		return '<span class="s-success"><i></i>'+lang._cvs_initstatus7_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._cvs_unknown_+'</span>';
	}	
}

// 存储节点管理 存储节点 设备状态
function tplBlockDevStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cvs_devicestatus1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus2_+'</span>';
	} else if (data == "3") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus3_+'</span>';
	} else if (data == "4") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus4_+'</span>';
	} else if (data == "5") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus5_+'</span>';
	} else if (data == "6") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus6_+'</span>';
	} else if (data == "7") {
		return '<span class="s-warning"><i></i>'+lang._cvs_devicestatus7_+'</span>';
	} else if (data == "8") {
		return '<span class="s-error"><i></i>'+lang._cvs_devicestatus8_+'</span>';
	} else if (data == "10") {
		return '<span class="s-error"><i></i>'+lang._cvs_devicestatus10_+'</span>';
	} else if (data == "11") {
		return '<span class="s-error"><i></i>'+lang._cvs_devicestatus11_+'</span>';
	} else if (data == "16") {
		return '<span class="s-error"><i></i>'+lang._cvs_devicestatus16_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._cvs_unknown_+'</span>';
	}
}

// 存储节点管理 存储节点 设备在线状态
function tplBlockDevOnline(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cvs_deviceonline1_+'</span>';
	} else {
		return '<span class="s-error"><i></i>'+lang._cvs_deviceonline0_+'</span>';
	}
}

// 虚拟化管理 资源池管理 类型
function tplPoolType(data) {
	if (data == '0') {
		return lang._pool_pooltype0_;
	} else if (data == '1') {
		return lang._pool_pooltype1_;
	} else if (data == '2') {
		return '-';
	} else if (data == '3') {
		return lang._pool_pooltype3_;
	} else if (data == '4') {
		return lang._pool_pooltype4_;
	} else {
		return '-';
	}	
}

// 虚拟化管理 资源池管理 分散策略
function tplPooldisperseType(data) {
	if (data == '0') {
		return lang._pool_disperse0_;
	} else if (data == '1') {
		return lang._pool_disperse1_;
	} else {
		return '-';
	}	
}

// 虚拟化管理 资源池管理 覆盖策略
function tplPoolcoverType(data) {
	if (data == '0') {
		return lang._pool_cover0_;
	} else if (data == '1') {
		return lang._pool_cover1_;
	} else if (data == '2') {
		return lang._pool_cover2_;
	} else {
		return '-';
	}	
}

// 虚拟化管理 资源池管理 转码
function tplPoolcode(data) {
	if (data == '0') {
		return lang._pool_code0_;
	} else if (data == '1') {
		return lang._pool_code1_;
	} else if (data == '2') {
		return lang._pool_code_2_;
	} else if (data == '3') {
		return lang._pool_code_3_;
	} else {
		return '-';
	}	
}

// 虚拟化管理 资源池管理 状态
function tplPoolStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._pool_status1_+'</span>';
	} else if (data == "2") {
		return '<span class="s-error"><i></i>'+lang._pool_status2_+'</span>';
	} else if (data == "3") {
		return '<span class="s-error"><i></i>'+lang._pool_status3_+'</span>';
	} else if (data == "4") {
		return '<span class="s-error"><i></i>'+lang._pool_status4_+'</span>';
	} else {
		return '<span class="s-warning"><i></i>'+lang._cvs_unknown_+'</span>';
	}
}

// 存储节点管理 转发服务器 状态
function tplCdtNodeStatus(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._ct_normal_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-error"><i></i>' + lang._ct_unused_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

function tplCcuNodeStatus(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._ccu_status1_ + '</span>';
	} else if (data == '0') {
		return '<span class="s-error"><i></i>' + lang._ccu_status0_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ccu_status2_ + '</span>';
	}
}

function tplCasArchiveType(data) {
	if (data == '0') {
		return '<span class="s-success"><i></i>' + lang._archive_no_ + '</span>';
	} else if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._archive_auto_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-success"><i></i>' + lang._archive_cycle_ + '</span>';
	}else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

function tplCpmRole(data) {
	if (data == '1') {
		return lang._cpm_role1_;
	} else if (data == '2') {
		return lang._cpm_role2_;
	} else {
		return '-';
	}	
}

function tplCpmDeploy(data) {
	if (data == '1') {
		return lang._cpm_deploy1_;
	} else if (data == '2') {
		return lang._cpm_deploy2_;
	} else if (data == '3') {
		return lang._cpm_deploy3_;
	} else {
		return '-';
	}	
}

// CPM HA状态
function TplCpmActive(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._cpm_active1_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-warning"><i></i>' + lang._cpm_active2_ + '</span>';
	} else if (data == '3') {
		return '<span class="s-warning"><i></i>' + lang._cpm_active3_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}	
}

// CPM运行状态
function tplCpmRunning(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._cpm_running1_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-error"><i></i>' + lang._cpm_running2_ + '</span>';
	} else if (data == '3') {
		return '<span class="s-error"><i></i>' + lang._cpm_running3_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

// CPM在线状态
function tplCpmOnline(data) {
	if (data == '1') {
		return '<span class="s-success"><i></i>' + lang._cpm_online1_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-error"><i></i>' + lang._cpm_online2_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

// 资源池单位换算
function poolUnitConversion(data, digit) {
	if (typeof digit == "undefined") {
		digit = 2;
	}
	
	if (!isNumber(data)) return '0';
	if (checkNull(data)) return '0'; 
	
	var v = parseInt(data);
	
	if (v < 1024) return "1";
	
	var v1 = data / 1024;
	
	return v1.toFixed(digit);
}

function tplNetLink(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>'+lang._cvs_linkstatus1_+'</span>';
	} else {
		return '<span class="s-error"><i></i>'+lang._cvs_linkstatus0_+'</span>';
	}
}

// 网卡类型
function tplNetType(data) {
	if (data == "1") {
		return lang._net_type1_;
	} else {
		return lang._net_type0_;
	}
}

// 直连线网口
function tplDirectLinkCard(data) {
	if (data == "1") {
		return lang._net_linkdirectcard1_;
	} else {
		return lang._net_linkdirectcard0_;
	}
}

// RAID状态
function tplRaidState(data) {
	if (data == 'Okay') {
		return '<span class="s-success"><i></i>' + lang._raid_state1_ + '</span>';
	} else if (data == 'Degraded') {
		return '<span class="s-warning"><i></i>' + lang._raid_state2_ + '</span>';
	} else if (data == 'Failed') {
		return '<span class="s-error"><i></i>' + lang._raid_state3_ + '</span>';
	} else if (data == 'Missing') {
		return '<span class="s-error"><i></i>' + lang._raid_state4_ + '</span>';
	} else if (data == 'Initializing') {
		return '<span class="s-warning"><i></i>' + lang._raid_state5_ + '</span>';
	} else if (data == 'Online') {
		return '<span class="s-success"><i></i>' + lang._raid_state6_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

// RAID磁盘状态
function tplRaidDiskState(data) {
	if (data == 'Online') {
		return '<span class="s-success"><i></i>' + lang._raid_status1_ + '</span>';
	} else if (data == 'Hot Spare') {
		return '<span class="s-success"><i></i>' + lang._raid_status2_ + '</span>';
	} else if (data == 'Ready') {
		return '<span class="s-success"><i></i>' + lang._raid_status3_ + '</span>';
	} else if (data == 'Available') {
		return '<span class="s-success"><i></i>' + lang._raid_status4_ + '</span>';
	} else if (data == 'Failed') {
		return '<span class="s-error"><i></i>' + lang._raid_status5_ + '</span>';
	} else if (data == 'Missing') {
		return '<span class="s-error"><i></i>' + lang._raid_status6_ + '</span>';
	} else if (data == 'Standby') {
		return '<span class="s-warning"><i></i>' + lang._raid_status7_ + '</span>';
	} else if (data == 'Out of Sync') {
		return '<span class="s-warning"><i></i>' + lang._raid_status8_ + '</span>';
	} else if (data == 'Degraded') {
		return '<span class="s-warning"><i></i>' + lang._raid_status9_ + '</span>';
	} else if (data == 'Rebuilding') {
		return '<span class="s-warning"><i></i>' + lang._raid_status10_ + '</span>';
	} else if (data == 'Optimal') {
		return '<span class="s-success"><i></i>' + lang._raid_status11_ + '</span>';
	} else {
		return '<span class="s-warning"><i></i>' + lang._ct_unknown_ + '</span>';
	}
}

function tplBucketAcl(data) {
	if (data == "0") {
		return lang._bucketacl0_;
	} else if (data == '1') {
		return lang._bucketacl1_;
	} else if (data == '2') {
		return lang._bucketacl2_;
	} else {
		return "-";
	}
}

// 单位转换
function mb2tb(data, digit) {
	if (typeof digit == "undefined") {
		digit = 2;
	}
	
	if (checkNull(data)) return '0';
	if (!isNumber(data)) return '0';
	
	var v = parseInt(data);
	
	if (v < 1024) return "0";
	
	var v1 = data / (1024*1024);
	
	return v1.toFixed(digit);
}

// 四舍五入
function jsToFixed(data) {
	if (checkNull(data)) {
		return "0.00";	
	}
	
	var num = new Number(data);
	return num.toFixed(2);
}

function tplNet(data) {
	if (!checkNull(data)) {
		var array = data.split(":");
		var a1 = jsToFixed(array[0]);
		var a2 = jsToFixed(array[1]);
		return a1 + "/" + a2;
	} else {
		return "0.00/0.00";
	}
}

// 录像下发状态
function tplAlloc(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>' + lang._alloc1_ + '</span>';
	} else if (data == "6") {
		return '<span class="s-warning"><i></i>' + lang._alloc_paused_ + '</span>';
	} else {
		return '<span class="s-error"><i></i>' + lang._alloc0_ + '</span>';
	}
}

// 是否录像
function TplIsRecord(data) {
	if (data == "1") {
		return lang._com_yes_;
	} else {
		return lang._com_no_;
	}
}

// 码流类型
function TplMainOrSub(data) {
	if (data == "1") {
		return lang._stream_sub_;
	} else {
		return lang._stream_main_;
	}
}

// 取流方式
function TplStreamMode(data) {
	if (data == "0") {
		return lang._stream_mode_device_;
	} else if (data == "1") {
		return lang._stream_mode_url_;
	} else {
		return '-';
	}
}

// 冗余份数
function TplReplication(data) {
	if (data == "0") {
		return lang._replication_0_;
	} else if (data == "1") {
		return lang._replication_1_;
	} else if (data == "2") {
		return lang._replication_2_;
	} else {
		return "-";	
	}
}

// 布防
function TplIsDefence(data) {
	if (data == "0") {
		return lang._is_defence_0_;
	} else if (data == "1") {
		return lang._is_defence_1_;
	} else {
		return "-";	
	}
}

// 存储节点 磁盘状态
function TplDiskStatus(data) {
	if (data == "0") {
		return '<span class="s-success"><i></i>' + lang._disk_status0_ + '</span>';
	} else if (data == '1') {
		return '<span class="s-error"><i></i>' + lang._disk_status1_ + '</span>';
	} else if (data == '2') {
		return '<span class="s-warning"><i></i>' + lang._disk_status2_ + '</span>';
	} else if (data == '3') {
		return '<span class="s-error"><i></i>' + lang._disk_status3_ + '</span>';
	} else if (data == '4') {
		return '<span class="s-warning"><i></i>' + lang._disk_status4_ + '</span>';
	} else if (data == '5') {
		return '<span class="s-warning"><i></i>' + lang._disk_status5_ + '</span>';
	} else if (data == '6') {
		return '<span class="s-error"><i></i>' + lang._disk_status6_ + '</span>';
	} else {
		return "-";
	}
}

// 磁盘属组
function TplDiskGroup(data) {
	if (checkNull(data)) {
		return "-";
	}
	
	var name = $.trim(data);
	
	if (checkNull(name)) {
		return "-";
	}
	
	if (name == "FREE") {
		return lang._disk_group_free_;
	}
	
	if (name == "PV") {
		return lang._disk_group_pv_;
	}
	
	if (name == "KICKED") {
		return lang._disk_group_kicked_;
	}
	
	if (name == "UNINIT") {
		return lang._disk_group_uninit_;
	}
	
	if (name == "UNKNOWN") {
		return lang._disk_group_unknown_;
	}
	
	if (name == "SPARE:-GLOBAL-") {
		return lang._disk_group_spare_global_;
	}
	
	if (name == "SYSTEM_DISK") {
		return lang._disk_group_system_disk_;
	}
	
	if (name == "DATA_DISK") {
		return lang._disk_group_data_disk_;
	}
	
	var splitArr = new Array();
	splitArr = name.split(":");
	var startString = $.trim(splitArr[0]);
	var n = "";
	
	if (splitArr.length == 2) {
		n = $.trim(splitArr[1]);
	}
	
	if (startString == "RAID") {
		return lang._disk_group_raid_  + "(" + n + ")";
	}
	
	if (startString == "SPARE") {
		if (name.indexOf("SPARE:-") != -1) {
			if (n.indexOf("0000") != -1) {
				return lang._disk_group_spare_1_;
			} else if (n.indexOf("00" == -1 && n.length == 6)) {
				n = n.replace(new RegExp(/-/g), "");
				var n1 = n.substring(0, 2);
				var n2 = n.substring(2, 4);
				
				return lang._disk_group_spare_2_ + "(" + lang._disk_group_spare_3_ + n1.replace(/\b(0+)/gi, "") + "/" + n2.replace(/\b(0+)/gi, "") + ")";
			}
			
			return lang._disk_group_spare_2_ + "(" + n + ")";
		} else {
			return lang._disk_group_spare_4_ + "(" + n + ")";
		}
	}
	
	if (startString == "REBUILD") {
		return lang._disk_group_rebuild_ + "(" + n + ")";
	}
	
	if (startString == "FAULTY") {
		return lang._disk_group_faulty_ + "(" + n + ")";
	}
	
	if (startString == "RESHAPE") {
		return lang._disk_group_reshape_ + "(" + n + ")";
	}
	
	if (startString == "SYSTEM_RAID") {
		return lang._disk_group_system_raid_ + "(" + n + ")";
	}
	
	return name;
}

// 用户级别
function TplUserLevel(data) {
	if (data == "0") {
		return lang._user_level_0_;
	} else if (data == "1") {
		return lang._user_level_1_;
	} else if (data == "2") {
		return lang._user_level_2_;
	} else if (data == "3") {
		return lang._user_level_3_;
	} else {
		return "-/-";	
	}
}

// CPG状态
function TplCPGStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>' + lang._com_status_1_ + '</span>';
	} else if (data == "0") {
		return '<span class="s-error"><i></i>' + lang._com_status_2_ + '</span>';
	} else {
		return "-";	
	}
}

// 布防状态
function TplAlarmStatus(data) {
	if (data == "1") {
		return '<span class="s-success"><i></i>' + lang._com_status_1_ + '</span>';
	} else if (data == "0") {
		return '<span class="s-error"><i></i>' + lang._com_status_3_ + '</span>';
	} else if (data == "-1") {
		return '<span class="s-success"><i></i>' + lang._is_defence_0_ + '</span>';
	} else {
		return '-';
	}
}

// 日志级别
function TplLogLevel(data) {
	if (data == "0") {
		return "DEBUG";
	} else if (data == "1") {
		return "INFO";
	} else if (data == "2") {
		return "WARN";
	} else if (data == "3") {
		return "ERROR";
	} else if (data == "4") {
		return "FATAL";
	} else if (data == "5") {
		return "TRACE";
	} else {
		return "-";	
	}
}

//长期归档存储磁带库运行状况
function tplArchiveStatus(data) {
	if (data == "0") {
		return '<span class="s-success"><i></i>' + lang._good_ + '</span>';
	} else if (data == "1") {
		return '<span class="s-error"><i></i>' + lang._failure_ + '</span>';
	} else if (data == "2") {
		return '<span class="s-warning"><i></i>' + lang._a_offline_ + '</span>';
	} else {
		return '-';
	}
}

//长期归档存储任务执行状态
function tplArchiveExecStatus(data) {
	if (data == "0") {
		return '<span class="s-success"><i></i>' + lang._archive_exec_status_0_ + '</span>';
	} else if (data == "1") {
		return '<span class="s-success"><i></i>' + lang._archive_exec_status_1_ + '</span>';
	}else if (data == "2") {
		return '<span class="s-error"><i></i>' + lang._archive_exec_status_2_ + '</span>';
	}else {
		return '-';
	}
}

