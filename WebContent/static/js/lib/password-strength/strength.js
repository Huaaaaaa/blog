/*
 * strength.js
 * 密码强度
 */
;(function($, window, document, undefined) {

	var pluginName = "strength", 
		defaults   = {
		strengthClass : 'strength',
		strengthMeterClass : 'strength_meter',
		strengthButtonClass : 'button_strength',
		strengthButtonText : '',
		strengthButtonTextToggle : 'Hide Password'
	};

	function Plugin(element, options) {
		this.element = element;
		this.$elem = $(this.element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		
		init: function() {

			// 变量定义
			var characters     = 0;
			var capitalletters = 0;
			var loweletters    = 0;
			var number         = 0;
			var special        = 0;
			var total          = 0;
			var upperCase      = new RegExp('[A-Z]'); // 大写字母
			var lowerCase      = new RegExp('[a-z]'); // 小写字母
			var numbers        = new RegExp('[0-9]'); // 数字
			var specialchars   = new RegExp("[^0-9A-Za-z]"); // 特殊字符([!,%,&,@,#,$,^,*,?,_,-,~,`,+,=,{,},[,],/,|])

			function GetPercentage(a, b) {
				return ((b / a) * 100);
			}
			
			// 密码密度值计算
			function check_strength(thisval, thisid) {
				var len = thisval.length;
				
				// 获取用户名
				if ($("#username").length > 0) {
					var username        = $("#username").val();
					var usernameReverse = username.split("").reverse().join("");
				} else {
					var username = '';
				}
				
				if (len < 8) { // 长度小于8位
					total = 1;
				} else if ((username == thisval) || (usernameReverse == thisval)) { // 与用户名一样，或者密码是用户名的倒写
					total = 1;
				} else {
					// 大写字母匹配
					if (thisval.match(upperCase)) {
						capitalletters = 1
					} else {
						capitalletters = 0;
					}
					
					// 小写字母匹配
					if (thisval.match(lowerCase)) {
						loweletters = 1
					} else {
						loweletters = 0;
					}
					
					// 数字匹配
					if (thisval.match(numbers)) {
						number = 1
					} else {
						number = 0;
					}
					
					// 特殊字符匹配
					if (thisval.match(specialchars)) {
						special = 1
					} else {
						special = 0;
					}
	
					// 强度总值
					// =1风险密码 =2弱密码 =3中密码 =4强密码
					total = capitalletters + loweletters + number + special;
					
					// 判断两两组合
					if (total == 2) {
						// 包含两类字符，且组合为（数字+小写字母）或（数字+大写字母），为弱密码
						if ((number == 1 && capitalletters == 1) || (number == 1 && loweletters == 1)) {
							total = 2;	
						} else { // 其它两两组合为强密码
							total = 3;	
						}
					} else {
						// 三类字符强密码
						if (total == 3) {
							total = 4;	
						}
					}
				} // end if
				
				var totalpercent = GetPercentage(7, total).toFixed(0);

				get_total(total, thisid);
			}

			// 计算总值
			function get_total(total, thisid) {
				var thismeter = $('ul[data-meter="' + thisid + '"]');
				thismeter.parent().show();
				thismeter.find("li").removeClass("testHide").hide();
				
				if (total == 0) {
					thismeter.parent().hide();
				} else if (total <= 1) {
					thismeter.find("li").eq(0).show();
				} else if (total == 2) {
					thismeter.find("li:lt(1)").addClass('testHide');
					thismeter.find("li:lt(2)").show();
				} else if (total == 3) {
					thismeter.find("li:lt(2)").addClass('testHide');
					thismeter.find("li:lt(3)").show();
				} else {
					thismeter.find("li:lt(3)").addClass('testHide');
					thismeter.find("li:lt(4)").show();
				}
				
				// 強度值
				$("#strengthVal_" + thisid).val(total);
			}

			var isShown = false;
			var strengthButtonText = this.options.strengthButtonText;
			var strengthButtonTextToggle = this.options.strengthButtonTextToggle;

			// 初始化HTML
			thisid = this.$elem.attr('id');
			
			this.$elem
				.addClass(this.options.strengthClass)
				.attr('data-password', thisid)
				.after('<input style="display:none" class="' + this.options.strengthClass + '" data-password="' + thisid
						+ '" type="text" name="" value=""><input type="hidden" name="strengthVal" id="strengthVal_' + thisid + '" /><a data-password-button="'
						+ thisid + '" href="" class="' + this.options.strengthButtonClass + '">' + this.options.strengthButtonText + '</a>');
					
			this.$elem.bind('keyup keydown', function(event) {
				thisval = $('#' + thisid).val();
				$('input[type="text"][data-password="' + thisid + '"]').val(thisval);
				check_strength(thisval, thisid);
			});
		}
	}; // end Plugin.prototype

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
