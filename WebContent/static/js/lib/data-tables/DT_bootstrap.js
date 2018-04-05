/* Set the defaults for DataTables initialisation */
var width = $(window).width();
var height = $(window).height();
$.extend( true, $.fn.dataTable.defaults, {
	"sDom": "t<'row-fluid table-bottom'<'bottom-l'l><'bottom-m'p><'bottom-r'i>>",
	//"bJQueryUI": true,
	//"aLengthMenu": [[20, 25, 50, -1], [20, 25, 50, "全部"]],
    "percentHeight": 1,
    "percentWidth": 1,
	"bPaginate": true, //翻页功能
	"bFilter": false, //过滤功能
	"bRetrieve": true,
	"bProcessing" : true,
	"bSort": true, //排序功能
	"bSortServer": true,
	//"bInfo": true,//页脚信息
	"iDisplayLength": 15,
	"bAutoWidth": false,//自动宽度
	"bDeferRender": true, // 延迟渲染表格元素，节省时间
	//"bScrollCollapse": true,
	//"bStateSave": true,
	"bServerSide" : true,
	"sScrollX": window.screen.width < 1366 ? "1314px" : window.screen.width-52+"px",//水平宽度
	//"sScrollXInner": ( 1440/width * 100 < 1 ? 1 : 1440/width * 100 )+ "%", //水平宽度
	"sScrollY": Math.abs(height - 170 - 85 ) + "px",//垂直高度
	"fnDrawCallback" : function(oSettings) { 
		var ph = oSettings.percentHeight;
        var pw = oSettings.percentWidth;
        var oT = $(this);
        var tableId = oT.attr("id");
        var toolBox = $("#t_" + tableId);
		var navTab = $("ul.nav-tabs");
        var toolBoxHeight = 0;
		var navTabHeight = 0;
		
        if (toolBox.length > 0) {
            toolBoxHeight = toolBox.height();
        }
	
		if (navTab.length > 0) {
			navTabHeight = navTab.height() + 10;
		}
	
        var width = $(window).width();
        var height = $(window).height();
		if (typeof oSettings.minWidth != 'undefined') {
			var minW = parseInt(oSettings.minWidth) + 20;
		} else {
			var minW = window.screen.width < 1366 ? 1314 * pw : (window.screen.width-52) * pw;
		}
		var minH = (height - 145 ) * ph  - 60 - toolBoxHeight - navTabHeight;
		
		// 额外增加宽度
		var addWidth = 0;
		if (MY.Think.langset == 'en-us') {

		} else {
			if (tableId == 'binduserListDlg') {
				addWidth = 200;
			}	
		}
		minW = minW + addWidth;
		
		if (tableId.indexOf("table_id_dialog_") == 0) {
			minH = 274;
		}
		
		// 弹出框datatable高度重置
		if (tableId == 'planInCloudDlg'|| tableId == 'cvsInCloudDlg' || tableId == 'allCameraDlg' || tableId == 'cameraStrategyDlg'
			|| tableId == 'cloudListDlg3' || tableId == 'get_all_strategy_dlg' || tableId == 'get_cameraid_list_dlg'
			|| tableId == 'selected_cameraid_list' || tableId == 'add_cameraid_to_task_dlg' || tableId == 'delete_cameraid_from_task_dlg'
			|| tableId == 'strategy_edit_add_camera_dlg' || tableId == 'domain_in_cloud') {
			minH = 274;	
		} else if (tableId == 'poolInCloudDlg' || tableId == 'userInCloudDlg') {
			minH = 244;
		} else if (tableId == 'strategy_view_camera_list_dlg' || tableId == 'allCameraDlg2') {
			minH = 234;
		}
		
		oT.width(minW + "px");
        oT.parent("div").height(minH  + "px");
       
	    $(window).unbind("resize.datatable").bind("resize.datatable", function() {
            var height = $(window).height();
			var minH = (height - 145 ) * ph  - 60 - toolBoxHeight - navTabHeight;
             oT.parent("div").height(minH  + "px");
        });
    },
	"fnInitComplete": function(oSettings, json) {
        $(this).dataTable().fnDraw();
		var oT = $(this); 
		var tableId = oT.attr("id");
		$('#'+tableId+'_wrapper input[type="checkbox"][name="ckb_all"]').die("click").live("click", function() {
			if(!$(this).attr("checked")) {
				$(this).removeAttr("checked");
				$("#" + tableId + " tbody tr").removeClass('row_selected').each(function() {
					$(this).children("td:eq(1)").children('input[type="checkbox"]').removeAttr("checked");	
				});	
			} else {
				$("#" + tableId + " tbody tr").addClass('row_selected').each(function() {
					$(this).children("td:eq(1)").children('input[type="checkbox"]').attr("checked", true);	
				});	
			}
		});
		
		$("#" + tableId + " tbody tr").die("click").live("click", function( e ) {
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
				$(this).children("td:eq(1)").children('input[type="checkbox"]').removeAttr("checked");
				$('input[type="checkbox"][name="ckb_all"]').removeAttr("checked");
			} else {
				$(this).children("td:eq(1)").children('input[type="checkbox"]').attr("checked", true);
				$(this).addClass('row_selected');
			}
		});
		
		shadeDiv("hide");
	},
	"fnPageChangingCallback": function( oSettings ) {
		var oT = $(this); 
		$('input[type="checkbox"][name="ckb_all"]', oT).removeAttr("checked");
	},
	"sPaginationType": "bootstrap",
	"oLanguage": {
		"sLengthMenu": "_MENU_ records per page"
	},
	"oLanguage" : {
				"sLengthMenu" : lang._dt_page1_ + " _MENU_ " + lang._dt_page2_,
				"sZeroRecords" : lang._dt_page3_,
				"sEmptyTable" : lang._dt_page3_,
				"sInfo" : lang._dt_page4_,
				"sInfoEmpty" : " ",
				"sInfoFiltered" : "",
				"sProcessing" : lang._dt_page5_,
				"sSearch" : "搜索",
				"sUrl" : "",
				"oPaginate" : {
					"sFirst" : "第一页",
					"sPrevious" : " 上一页 ",
					"sNext" : " 下一页 ",
					"sLast" : " 最后一页 "
				}
	}
} );

/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline"
} );

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	if(!oSettings) {
		return {
			"iStart":         0,
			"iEnd":           15,
			"iLength":        15,
			"iTotal":         0,
			"iFilteredTotal": 0,
			"iPage":          0,
			"iTotalPages":    0
		};	
	}
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
};

/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
            var oPaging = oSettings.oInstance.fnPagingInfo();
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
                //oSettings.sTableId = tableId
                //oSettings.chooseData 勾选Data
                var tableId = oSettings.sTableId;
                var chooseData = oSettings.chooseData;
                var currentPage = oSettings._iDisplayStart / oPaging.iLength + 1;
                chooseData[currentPage] = [];
                $("input[name='ckb_"+tableId+"']:checked", $("#"+tableId)).each(function(){
                    chooseData[currentPage].push( $("#"+tableId).dataTable().fnGetData( this.parentNode.parentNode ) );
                });
                //
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			$(nPaging).addClass('pagination  pagination-small').append(
				'<ul>'+
					'<li class="first disabled"><a href="#">&laquo;</a></li>'+
					'<li class="prev disabled"><a href="#">‹</a></li>'+
					'<li class="next disabled"><a href="#">›</a></li>'+
					'<li class="last disabled"><a href="#">&raquo;</a></li>'+//«»‹›
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind( 'click.DT', { action: "first" }, fnClickHandler );
			$(els[1]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			$(els[2]).bind( 'click.DT', { action: "next" }, fnClickHandler );
			$(els[3]).bind( 'click.DT', { action: "last" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, ien=an.length ; i<ien ; i++ ) {
				// Remove the middle elements
				$('li:gt(1)', an[i]).filter(':not(.next):not(.last)').remove();

				// Add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="num active"' : '';
					$('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( $('li.next', an[i])[0] )
						.bind('click', function (e) {
                            //oSettings.sTableId = tableId
                            //oSettings.chooseData 勾选Data
                            var tableId = oSettings.sTableId;
                            var chooseData = oSettings.chooseData;
                            var currentPage = oSettings._iDisplayStart / oPaging.iLength + 1;
                            chooseData[currentPage] = [];
                            $("input[name='ckb_"+tableId+"']:checked", $("#"+tableId)).each(function(){
                                chooseData[currentPage].push( $("#"+tableId).dataTable().fnGetData( this.parentNode.parentNode ) );
                            });
                            //
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// Add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					$('li.first', an[i]).addClass('disabled');
					$('li.prev', an[i]).addClass('disabled');
				} else {
					$('li.first', an[i]).removeClass('disabled');
					$('li.prev', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					$('li.next', an[i]).addClass('disabled');
					$('li.last', an[i]).addClass('disabled');
				} else {
					$('li.next', an[i]).removeClass('disabled');
					$('li.last', an[i]).removeClass('disabled');
				}
			}
		}
	}
} );

/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( $.fn.DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend( true, $.fn.DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}