/**
 * data:2017年11月30日 上午10:46:07 user:cyhua name:coding_blog.js description:
 */

$(function() {
    var uid = '${uid}', language_type = '${language_type}';

    $(".fixed-table-container").css({
	"margin-left" : "10px",
	"margin-right" : "10px",
	"height" : "80%"
    });
    $(".btn-default").css("height", "34px");
    $(".fixed-table-toolbar .columns").css("margin-right", "10px");
    $(".fixed-table-footer").find("table").remove();
    $("span.page-list").show();
});
var $body = $("body");
var $table;
function getBlogList(uid, language_type) {
    $.ajax({
	url : JSU("/coding/getBlogList"),
	type : "GET",
	dataType : "JSON",
	data : {
	    "uId" : uid,
	    "language_type" : language_type
	},
	success : function(data) {
	    if (data) {
	    }
	}
    });
}
/**
 * 创建blog
 */
function newBlog(uid) {
    $(".btn-add").click(function() {
	$(getRightFrame()).attr("src", "/blog/toAdd?uid=" + uid);
    });
}

/**
 * 修改blog
 */
function editBlog(uid, blogId) {
    $(".btn-edit").click(function() {
	var data = $("#coding").bootstrapTable('getSelections');
	if (data.length == 0) {
	    showAlert($body, "请选择一行数据");
	    return;
	}
	if (data.length > 1) {
	    showAlert($body, "只能选择一条数据");
	    return;
	}

	var blogId = data[0].id;
	window.location.href = "/blog/toEditBlog?blogId=" + blogId;
    });
}

/**
 * 删除blog
 */
function deleteBlog(uid, tableId, languageType) {
    $(".btn-delete").click(function() {
	var data = $("#coding").bootstrapTable('getSelections');
	if (data.length == 0) {
	    showAlert($body, "请选择一行或多行数据");
	    return;
	}
	for (var i = 0; i < data.length; i++) {
	    var blogId = data[i].id;
	    $.ajax({
		url : JSU("/blog/deleteBlog"),
		type : "POST",
		data : {
		    "blogId" : blogId,
		},
		success : function(msg) {
		    if (msg == "success") {
			showAlert($body, "blog删除成功！");
			$(".btn-yes").click(function() {
			    location.reload();
			});
		    } else {
			showAlert($body, "blog删除失败！");
			$(".btn-yes").click(function() {
			    location.reload();
			});
		    }
		}
	    });
	}
    });
}

// 初始化bootstrap-table的内容
function InitMainTable(tableId, uid, type) {
    // 记录页面bootstrap-table全局变量$table，方便应用
    $('#' + tableId).bootstrapTable("destroy");
    var queryUrl = JSU("/coding/blogPage?uId=" + uid + "&language_type=" + type), $table = $(
	    '#' + tableId)
	    .bootstrapTable(
		    {
			url : queryUrl, // 请求后台的URL（*）
			method : 'GET', // 请求方式（*）
			dataType : "JSON",
			toolbar : '#toolbar', // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : true, // 是否显示分页（*）
			sortable : true, // 是否启用排序
			sortOrder : "asc", // 排序方式
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页,并记录
			pageSize : 5, // 每页的记录行数（*)
			pageList : [ 10, 30, 50, 100 ], // 可供选择的每页的行数（*）
			showFooter : true,
			search : true, // 是否显示表格搜索
			strictSearch : true,
			showColumns : false, // 是否显示所有的列（选择显示的列）
			showRefresh : true, // 是否显示刷新按钮
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : false, // 是否启用点击选中行
			// height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "id", // 每一行的唯一标识，一般为主键列
			showToggle : true, // 是否显示详细视图和列表视图的切换按钮
			cardView : false, // 是否显示详细视图
			detailView : false, // 是否显示父子表
			// 得到查询的参数
			queryParams : function(params) {
			    // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			    var temp = {
				pageSize : params.limit, // 页面大小
				rowOffset : params.offset, // 页码
				sort : params.sort, // 排序列名
				sortOrder : params.sortOrder
			    // 排位命令（desc，asc）
			    };
			    return temp;
			},

			columns : [
				{
				    fidle : 'id',
				    checkbox : true,
				    visible : true
				// 是否显示复选框
				},
				{
				    field : 'Number',
				    align : 'center',
				    title : '序号',
				    formatter : function(value, row, index) {
					var page = $("#" + tableId).bootstrapTable.prototype.getPage;
					if (page) {
					    return page.pageSize
						    * (page.pageNumber - 1)
						    + index + 1;
					} else {
					    return index + 1;
					}

				    }
				},
				{
				    field : 'blog_title',
				    title : '标题',
				    sortable : false
				},
				{
				    field : 'blog_key',
				    title : '关键字',
				    sortable : false
				},
				{
				    field : 'blog_writer',
				    title : '作者',
				    sortable : false,
				},
				{
				    field : "blog_language_type",
				    title : '语言类型',
				    sortable : false,
				    formatter : blogLanguagType
				},
				{
				    field : 'blog_create_time',
				    title : '创建时间',
				    sortable : true,
				},
				{
				    field : 'id',
				    title : '操作',
				    width : 120,
				    align : 'center',
				    valign : 'middle',
				    formatter : function(value, row, index) {
					return '<a href="/blog/viewBlog?blogId='
						+ value
						+ '" class="btn btn-sm btn-default">详情</a>';
				    }
				}, ],
			onLoadSuccess : function(data) {
			},
			onLoadError : function() {
			},
			onDblClickRow : function(row, $element) {
			    var id = row.id;
			    EditViewById(id, 'view');
			},
		    });
}
/**
 * 语言类型展示
 * 
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function blogLanguagType(value, row, index) {
    if (value) {
	var languageType = value;
	// 语言类型的拼接方式为 pre:htmi,css;back:java,php;db:mysql
	var typeArray = languageType.split(";");
	var pre = typeArray[0].split(":")[1];
	var back = typeArray[1].split(":")[1];
	var db = typeArray[2].split(":")[1];
	var typeHtml = "";
	if (pre) {
	    typeHtml += "<span>前端：" + pre + "</span></br>";
	}
	if (back) {
	    typeHtml += "<span>服务端：" + back + "</span></br>";
	}
	if (db) {
	    typeHtml += "<span>数据库：" + db + "</span>";
	}

	return typeHtml;
    }
}
