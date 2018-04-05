package com.hyc.blog.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.hyc.blog.model.Blog;
import com.jfinal.aop.Enhancer;
import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;

/**
 * 
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月10日 下午4:21:06
 *@description  日志业务逻辑处理类
 */
public class BlogService {

	public static final BlogService sevice = Enhancer.enhance(BlogService.class);
	
	/**
	 * 创建blog
	 * @param blog
	 * @return
	 */
	public  boolean createBlog(Blog blog){
		boolean cResult =blog.save();
		return cResult;
	}
	
	/**
	 * 修改blog
	 * @param blog
	 * @return
	 */
	public boolean updateBlog(Blog blog){
		boolean update = blog.update();
		return update;
	}
	
	
	/**
	 * 上传文件
	 * @param uploadFile
	 * @return
	 */
	public JSONObject uploadFile(UploadFile uploadFile){
		JSONObject jsonObj = new JSONObject();
		File file = uploadFile.getFile();
		String fileName = uploadFile.getFileName();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if(extension.equals(".jpg")||extension.equals(".png")||extension.equals(".gif")){
			prefix = "images";
		}else{
			prefix = "docs";
		}
		String filePath = file.getPath();
		File targetDir = new File(filePath.substring(0, filePath.indexOf(fileName))+prefix);
		if(!targetDir.exists()){
			targetDir.mkdir();
		}
		File targetFile = new File(targetDir.getPath()+"/"+fileName);
		/**
		 * 使用字节流的方式上传文件
		 */
		jsonObj = uploadByByte(filePath, fileName, file, targetFile);
		return jsonObj;
	}
	
	/**
	 * 上传文件的第二种方式
	 * @param uploadFile
	 * @return
	 */
	public JSONObject uploadFile2(UploadFile uploadFile){
		JSONObject jsonObj = new JSONObject();
		String fileName = uploadFile.getFileName();
		File file = uploadFile.getFile();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if(extension.equals(".jpg")||extension.equals(".png")||extension.equals(".gif")){
			prefix = "images";
		}else{
			prefix = "docs";
		}
		String filePath = file.getAbsolutePath();
		File targetDir = new File(filePath.substring(0,filePath.indexOf(fileName))+prefix);
		File targetFile = new File(targetDir.getPath()+"/"+fileName);
		if(!targetDir.exists()){
			targetDir.mkdir();
		}
		jsonObj = uploadByChanel(filePath, fileName, file, targetFile);
		return jsonObj;
	}
	
	/**
	 * 删除默认路径下的文件
	 * @param file
	 */
	public void deleteAllFile(File file){
			File[] files = file.listFiles();
			for(int i=0;i<files.length;i++){
				File filei = files[i];
				if(filei.isFile()){
					filei.delete();
				}
			}
	}
	
	/**
	 * 使用字节的方式上传文件
	 * @param filePath
	 * @param fileName
	 * @param sourceFile
	 * @param targetFile
	 * @return
	 */
	public JSONObject uploadByByte(String filePath,String fileName,File sourceFile,File targetFile){
		FileInputStream fis = null;
		FileOutputStream fos = null;
		JSONObject jsonObj = new JSONObject();
		try {
			
			fis = new FileInputStream(sourceFile);
			int fileSize = fis.available();
			fos = new FileOutputStream(targetFile);
			byte[] file_byte = new byte[fileSize];
			if(fis.read(file_byte,0, fileSize)!=-1){
				fos.write(file_byte, 0, fileSize);
			}
			jsonObj.put("error", 0);
			sourceFile.delete();
		} catch (FileNotFoundException e) {
			jsonObj.put("error", 1);
			jsonObj.put("message", "上传出现错误，请稍后再上传");
		}catch (Exception e) {
			jsonObj.put("error", 1);
			jsonObj.put("message", "文件写入服务器出现错误，请稍后再上传");
		}finally{
			try {
				fis.close();
				fos.close();
				deleteAllFile(new File(filePath.substring(0,filePath.indexOf(fileName))));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return jsonObj;
	}
	
	/**
	 * 使用通道的方式上传文件
	 * @param filePath
	 * @param fileName
	 * @param sourceFile
	 * @param targetFile
	 * @return
	 */
	public JSONObject uploadByChanel(String filePath,String fileName,File sourceFile,File targetFile){
		JSONObject jsonObj = new JSONObject();
		FileInputStream fis = null;
		FileOutputStream fos = null;
		FileChannel in = null;
		FileChannel out = null;
		try {
			targetFile.createNewFile();
			fis = new FileInputStream(sourceFile);
			fos = new FileOutputStream(targetFile);
			in = fis.getChannel();//得到对应的文件通道
			out = fos.getChannel();
			in.transferTo(0,in.size(),out);//连接两个通道，并且从in通道读取后写入out通道
			jsonObj.put("error", "0");
		} catch (IOException e) {
			jsonObj.put("error", "1");
			jsonObj.put("message", "文件写入服务器出错，请稍后再传！");
		}finally{
			try {
				fis.close();
				fos.close();
				in.close();
				out.close();
				deleteAllFile(new File(filePath.substring(0,filePath.indexOf(fileName))));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return jsonObj;
	}
	
	
	public File downloadFile(String fileName){
		String extension = fileName.substring(fileName.indexOf(".")+1);
		File fileDir;
		File dirFile = null;
		if(extension.equals("jpg") || extension.equals("gif") || extension.equals("png")){
			fileDir = new File(PathKit.getWebRootPath()+"/static/upload/images");
		}else{
			fileDir = new File(PathKit.getWebRootPath()+"/static/upload/docs");
		}
		 
		File[] files = fileDir.listFiles();
		for(int i = 0;i<files.length;i++){
			String fName = files[i].getName();
			if(fileName.equals(fName)){
				dirFile = files[i];
			}
		}
		return dirFile ;
	}
	
	/**
	 * 获取目录下的所有文件
	 * @param file
	 * @param fileList
	 * @return
	 */
	public List<Map<String,String>> getFile(File file,List<Map<String,String>> fileLists){
		if(file.isDirectory()){
			File[] files = file.listFiles();
			for(int i=0;i<files.length;i++){
				getFile(files[i],fileLists);
			}
		}else{
			String mapFilePath= file.getAbsoluteFile().getName();
			String fileName = file.getName();
			Map<String,String> fileMap = new HashMap<String, String>();
			fileMap.put(fileName, mapFilePath);
			fileLists.add(fileMap);
		}
		return fileLists;
	}
	
	/**
	 * 获取目录下的所有文件
	 * @param file
	 * @param fileList
	 * @return
	 */
	public List<String> getFileList(File file,List<String> fileList){
		if(file.isDirectory()){
			File[] files = file.listFiles();
			for(int i=0;i<files.length;i++){
				getFileList(files[i],fileList);
			}
		}else{
//			String mapFilePath= file.getAbsoluteFile().getPath();
			String filePath = file.getPath();
			fileList.add(filePath);
		}
		return fileList;
	}
	
	/**
	 * 获取文件的类型
	 * @param file
	 * @return
	 */
	public String getFileType(File file){
		String fileName = file.getName();
		String fileExtension =  fileName.substring(fileName.lastIndexOf("."));
		//Excel
		if(fileExtension.equals(".xls")){
			return "application/vnd.ms-excel";
		} 
		//word
		if(fileExtension.equals(".doc")){
			return "application/msword";
		}
		//txt
		if(fileExtension.equals(".txt")){
			return "application/plain";
		}
		//pdf
		if(fileExtension.equals(".pdf")){
			return "application/pdf";
		}
		//image
		if(fileExtension.equals(".jpg") || fileExtension.equals(".jpeg")){
			return "image/jpeg";
		}
		//ppt
		if(fileExtension.equals(".ppt")){
			return "application/vnd.ms-powerpoint";
		}
		//gif
		if(fileExtension.equals(".gif")){
			return "image/gif";
		}
		
		return "text/html";
	}
	
	
}
