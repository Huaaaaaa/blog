package com.hyc.blog.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.hyc.blog.model.BlogUser;
import com.hyc.blog.tools.EncodeAndDecodeTool;
import com.hyc.blog.tools.FileTool;
import com.hyc.blog.tools.StringTool;
import com.jfinal.aop.Enhancer;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;

public class UserService {
	private static final Logger log = Logger.getLogger(UserService.class);
	public static final UserService service = Enhancer
			.enhance(UserService.class);
	private static final String USER_WRONG = "0";// 用户名错误或不存在
	private static final String USER_RIGHT = "1";// 用户名正确
	private static final String PASSWORD_WRONG = "3";// 密码错误
	private static final String PASSWORD_RIGHT = "4";// 正确

	/**
	 * 获取用户列表
	 * 
	 * @return
	 */
	public List<BlogUser> getUsers() {
		List<BlogUser> userList = BlogUser.dao.find("select * from blog_user");
		if (userList != null) {
			return userList;
		} else {
			return null;
		}
	}

	/**
	 * 检查用户名密码是否正确
	 * 
	 * @param userName
	 * @return
	 */
	public String checkName(String userName, String password, String loginInfo) {
		String userInfo = "";
		String nameInfo = "";
		if (loginInfo!=null && loginInfo.indexOf(":") != -1) {
			String[] loginInfoArr = loginInfo.split(":");
			userInfo = loginInfoArr[0];
			nameInfo = loginInfoArr[1];
			nameInfo = EncodeAndDecodeTool.decString(nameInfo);
		}
		if (userName.equals(nameInfo)) {
			if (userInfo.equals(password)) {
				return PASSWORD_RIGHT;
			}else{
				return PASSWORD_WRONG;
			}
		} else {
			BlogUser user = BlogUser.dao.getUserByName(userName);
			if ("".equals(password)) {
				if (user == null) {
					return USER_WRONG;
				} else {
					return USER_RIGHT;
				}
			}

			if (null != user) {
				String pwd = user.getStr("password");
				if (pwd.equals(password)) {
					return PASSWORD_RIGHT;
				} else {
					return PASSWORD_WRONG;
				}
			} else {
				return USER_WRONG;
			}
		}

	}

	/**
	 * 用户注册
	 * 
	 * @param userName
	 * @param nickName
	 * @param password
	 * @param email
	 * @param phone
	 * @return
	 */
	public boolean regedit(String userName, String nickName, String password,
			String email, String phone) {
		// 保存方法一：DB+Record模式
		Record user = new Record().set("id", StringTool.getUUID())
				.set("user_name", userName).set("nick_name", nickName)
				.set("password", password).set("account_email", email)
				.set("account_phone", phone);
		boolean result = Db.save("blog_user", user);
		// 保存方法二：Model模式（当然，后台也可以以model方式接受参数，直接使用blogUser.save方法）
		// BlogUser user = new BlogUser().set("id",
		// StringTool.getUUID()).set("user_name", userName).set("nick_name",
		// nickName).set("password", password).set("account_email",
		// email).set("account_phone", phone);
		// boolean result= user.save();
		return result;
	}

	/**
	 * 根据用户id获取用户信息
	 * 
	 * @param userId
	 * @return
	 */
	public BlogUser getUserAllInfo(String userId) {
		BlogUser bloguser = BlogUser.dao.findById(userId);
		String figure = bloguser.getStr("figure").replace("\\", "/");
		bloguser.set("figure", figure);
		return bloguser;
	}

	/**
	 * 根据用户名/邮箱/手机号确定唯一性
	 * 
	 * @param userName
	 * @param userEmail
	 * @param userPhone
	 * @return
	 */
	public Map<String, String> checkUserUnique(String userName,
			String userEmail, String userPhone) {
		Map<String, String> resMap = new HashMap<String, String>();
		String nameSql = "SELECT id FROM blog_user WHERE user_name = ?";
		String emailSql = "SELECT id FROM blog_user WHERE account_email = ?";
		String phoneSql = "SELECT id FROM blog_user WHERE account_phone = ?";
		BlogUser blogUserByName = BlogUser.dao.findFirst(nameSql, userName);
		BlogUser blogUserByEmail = BlogUser.dao.findFirst(emailSql, userEmail);
		BlogUser blogUserByPhone = BlogUser.dao.findFirst(phoneSql, userPhone);
		if (null != blogUserByName) {
			resMap.put("userName", "false");
		} else {
			resMap.put("userName", "true");
		}
		if (null != blogUserByEmail) {
			resMap.put("userEmail", "false");
		} else {
			resMap.put("userEmail", "true");
		}
		if (null != blogUserByPhone) {
			resMap.put("userPhone", "false");
		} else {
			resMap.put("userPhone", "true");
		}
		return resMap;
	}

	public boolean saveBasicInfo(String userId, BlogUser blogUser) {
		// 第一种方式：Model
		blogUser.set("id", userId);
		blogUser.set("isTecShow",
				StringTool.convertNull(blogUser.getStr("isTecShow")));
		blogUser.set("isTargetShow",
				StringTool.convertNull(blogUser.getStr("isTargetShow")));
		blogUser.set("isMottoShow",
				StringTool.convertNull(blogUser.getStr("isMottoShow")));
		blogUser.set("isSelfAccessShow",
				StringTool.convertNull(blogUser.getStr("isSelfAccessShow")));
		return blogUser.update();
		// 第二种方式：Db+Record
		// String sql =
		// "UPDATE blog_user SET nick_name = ?,gender=?,hometown_province =?,hometown_city = ?,"
		// +
		// "hometown_country =?,nowloc_province =?,nowloc_city = ?,nowLoc_country = ?,marriage = ?,"
		// + "user_job = ?,user_company = ?,job_status = ? WHERE id = ?";
		// int update =
		// Db.update(sql,blogUser.get("nickName"),blogUser.get("gender"),blogUser.get("hometownProvince"),
		// blogUser.get("hometownCity"),blogUser.get("hometownCountry"),blogUser.get("nowlocProvince"),
		// blogUser.get("nowlocCity"),blogUser.get("nowlocCountry"),blogUser.get("marriage"),
		// blogUser.get("userJob"),blogUser.get("userCompany"),blogUser.get("jobStatus"),userId);
		//
		// return update==1?true:false;
	}

	public boolean savePersonalInfo(String userId, BlogUser blogUser) {
		// 第一种方式：Model
		blogUser.set("id", userId);
		String isTecShow = blogUser.get("isTecShow");
		String isTargetShow = blogUser.get("isTargetShow");
		String isMottoShow = blogUser.get("isMottoShow");
		String isSelfAccessShow = blogUser.get("isSelfAccessShow");
		blogUser.set("isTecShow", isTecShow == null ? "0" : isTecShow);
		blogUser.set("isTargetShow", isTargetShow == null ? "0" : isTargetShow);
		blogUser.set("isMottoShow", isMottoShow == null ? "0" : isMottoShow);
		blogUser.set("isSelfAccessShow", isSelfAccessShow == null ? "0"
				: isSelfAccessShow);
		return blogUser.update();
	}

	/**
	 * 设置头像
	 * 
	 * @param userId
	 *            用户id
	 * @param figurePath
	 *            用户头像
	 */
	public boolean saveUserFigure(String userId, UploadFile uploadFile) {
		String fileName = uploadFile.getFileName();
		File sourceFile = uploadFile.getFile();
		String tarDirPath = PathKit.getWebRootPath() + File.separator
				+ "modules" + File.separator + "user" + File.separator
				+ "images" + File.separator + "figure";
		FileTool.deleteDir(tarDirPath);// 这个地方是为了删除用户上传的历史头像
		File targetDir = new File(tarDirPath);
		File targetFile = new File(tarDirPath + File.separator + fileName);
		if (!targetDir.exists()) {
			targetDir.mkdir();
		}

		if (!targetFile.exists()) {
			try {
				targetFile.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fis = new FileInputStream(sourceFile);
			fos = new FileOutputStream(targetFile);
			int fileSize = fis.available();
			byte[] fileByte = new byte[fileSize];
			if (fis.read(fileByte, 0, fileSize) != -1) {
				fos.write(fileByte, 0, fileSize);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		BlogUser blogUser = BlogUser.dao.findById(userId);
		// 头像在数据库的保存路径
		blogUser.set("figure", "/modules/user/images/figure/" + fileName);
		return blogUser.update();
	}

	/**
	 * 验证旧密码是否正确
	 * 
	 * @param userId
	 * @param oldPass
	 * @return
	 */
	public boolean validateOldPass(String userId, String oldPass) {
		boolean isEqual = false;
		String orignPass = BlogUser.dao.findById(userId).getStr("password");
		if (null != orignPass) {
			if (oldPass.equals(orignPass)) {
				isEqual = true;
			}
		}

		return isEqual;
	}

	/**
	 * 修改用户密码
	 * 
	 * @param userId
	 * @param newPass
	 * @return
	 */
	public boolean editUserPassword(String userId, String newPass) {
		BlogUser blogUser = BlogUser.dao.findById(userId);
		blogUser.set("password", newPass);
		return blogUser.update();
	}

	/**
	 * 验证邮箱是否正确
	 * 
	 * @param userId
	 * @param email
	 * @return
	 */
	public boolean checkEmail(String userId, String email) {
		boolean res = false;
		BlogUser blogUser = BlogUser.dao.findById(userId);
		if (null != blogUser) {
			String accountEmail = blogUser.getStr("accountEmail");
			if (null != accountEmail && accountEmail.equals(email)) {
				res = true;
			}
		}
		return res;
	}

	/**
	 * 设置用户的账户信息
	 * 
	 * @param userId
	 * @param user
	 * @return
	 */
	public boolean setAccountInfo(String userId, BlogUser user) {
		boolean update = false;
		user.set("id", userId);
		user.set("accountSinaShow",
				StringTool.convertNull(user.get("accountSinaShow")));
		user.set("accountZhihuShow",
				StringTool.convertNull(user.get("accountZhihuShow")));
		user.set("accountEmailShow",
				StringTool.convertNull(user.get("accountEmailShow")));
		user.set("accountBlogShow",
				StringTool.convertNull(user.get("accountBlogShow")));
		update = user.update();
		return update;
	}
}
