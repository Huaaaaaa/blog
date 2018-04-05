/*(function($) {
    // 自定义表单验证规则
	var hikValidators = {
        'numericRange' : {
            *//**
			 * @param {BootstrapValidator}
			 *            表单验证实例对象
			 * @param {jQuery}
			 *            $field jQuery 对象
			 * @param {Object}
			 *            表单验证配置项值
			 * @returns {boolean}
			 *//*
            validate: function(validator, $field, options) {
                // 表单输入的值
                var value = $field.val();

                // options为<validatorOptions>对象，直接.获取需要的值

                // 返回true/false
                // 也可返回{ valid : true/false, message: 'XXXX'}
                return {
                	valid : value >= parseFloat(options.min) && value <= parseFloat(options.max),
                	message :　'数字取值范围要求在'　+　options.min　+　'与'+options.max+'之间'
                }

            }
        },
    };
	$.extend(true,$.fn.bootstrapValidator.validators, hikValidators);
}(window.jQuery));*/

/*自定义密码两次输入项目密码的校验规则*/
;(function($) {
    // 自定义表单验证规则
	
	var passEqualValidate = {
			"toEqual":{
				 validate: function(validator, $field, options) {
			            var pass = $("#password").val();
			            var pass1 = $("#password1").val()
			            return pass===pass1;
			        }
			}
	}
	$.extend(true,$.fn.bootstrapValidator.validators, passEqualValidate);
}(window.jQuery));


/*自定义新密码和旧密码不能相同*/
;(function($) {
    // 自定义表单验证规则
	
	var passNotEqualValidate = {
			"notEqual":{
				 validate: function(validator, $field, options) {
			            var newpass = $("#password").val();
			            var oldpass = $("#oldpass").val()
			            if(newpass===oldpass){
			            	return false;
			            }else{
			            	return true;
			            }
			        }
			}
	}
	$.extend(true,$.fn.bootstrapValidator.validators, passNotEqualValidate);
}(window.jQuery));

;(function($) {
    // 自定义表单验证规则
	
	var fileTypeValidate = {
			"bePicture":{
				 validate: function(validator, $field, options) {
			            var figureName = $("#hidden_figure").val();
			            console.info("figureName:"+figureName);
			            var splidPos = figureName.lastIndexOf(".");
			            var isPic = false;
			            if(figureName && splidPos>-1){
			            	figureName = figureName.substr(splidPos);
			            	if(figureName==".jpg" || figureName==".png" || figureName==".jpeg"){
			            		isPic = true;
			            	}
			            }
			            return isPic;
			        }
			}
	}
	$.extend(true,$.fn.bootstrapValidator.validators, fileTypeValidate);
}(window.jQuery));