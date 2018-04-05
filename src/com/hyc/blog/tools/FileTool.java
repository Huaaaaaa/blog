package com.hyc.blog.tools;

import java.io.File;

/**
 * 文件类工具
 * @createtime 2017年11月14日 下午2:33:21
 * @description
 */
public class FileTool {
	
	/**
	 * 删除当前目录下的所有文件夹及文件
	 * @param deleteDir
	 */
	public static void deleteDir(String deleteDir){
		File file = new File(deleteDir);
		if(!file.isDirectory()){
			file.delete();
		}else{
			String[] fileNames = file.list();
			for(int i =0 ;i<fileNames.length;i++){
				File subFile = new File(deleteDir+File.separator+fileNames[i]);
				if(!subFile.isDirectory()){
					subFile.delete();
				}else{
					deleteDir(subFile.getName());
				}
			}
		}
	}
}
