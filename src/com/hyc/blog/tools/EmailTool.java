package com.hyc.blog.tools;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * 邮箱工具类
 * 
 * @createtime 2017年11月15日 下午2:14:13
 * @description
 */
public class EmailTool {
	/**
	 * 发送邮件方法
	 * 
	 * @param to
	 *            发给谁？
	 * @param message
	 *            发的啥？
	 * @throws AddressException
	 */
	public static String senEmail(String to, String message) {
		String res = "";
		// 创建连接对象，连接到服务器
		Properties properties = new Properties();
		// 设置发送邮件的基本参数
		// 1、发送邮件服务器
		properties.put("mail.smtp.host", "smtp.qq.com");
		// 2、发送端口
		properties.put("mail.smtp.port", "25");
		// 3、是否进行身份验证
		properties.put("mail.smtp.auth", "true");
		// 4、发件方
		properties.put("mail.user", "1543877228@qq.com");
		// 5、如果开启权限验证，则需要配置密码
		properties.put("mail.password", "2010hyc976548");
		// 6、构建授权信息，用于进行smtp身份验证
		Authenticator authenticator = new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				String userName = properties.getProperty("mail.user");
				String password = properties.getProperty("mail.password");
				return new PasswordAuthentication(userName, password);
			}
		};
		// 7、使用环境属性和授权信息，创建邮件会话
		Session mailSession = Session.getInstance(properties, authenticator);
		// Session mailSession = Session.getInstance(properties);
		// 8、创建邮件消息
		MimeMessage mimeMessage = new MimeMessage(mailSession);
		// 9、设置发件人
		InternetAddress fromAddress;
		try {
			fromAddress = new InternetAddress(
					properties.getProperty("mail.user"));
			mimeMessage.setFrom(fromAddress);
			// 10、设置收件人
			InternetAddress toAddress = new InternetAddress(to);
			mimeMessage.setRecipient(RecipientType.TO, toAddress);
			// 11、设置邮件标题
			mimeMessage.setSubject("修改密码验证码");
			// 12、设置邮件的内容
			mimeMessage.setContentID(message);
			// 13、发送邮件
			Transport.send(mimeMessage);
		} catch (Exception e) {
			e.printStackTrace();
			res = e.getMessage();
		}
		return res;
	}

	public static void main(String[] args) {
		EmailTool.senEmail("1543877225@qq.com", "89786");
	}
}
