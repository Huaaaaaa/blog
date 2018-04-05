package com.hyc.blog.interceptor;


import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;



public class LoginInterceptor implements Interceptor{


	@Override
	public void intercept(Invocation ai) {
		Controller controller = ai.getController();
		String uid = controller.getSessionAttr("uId");
		if(uid!=null){
			ai.invoke();
		}else{
			controller.redirect("/login");
			return;
		}
	}
}
