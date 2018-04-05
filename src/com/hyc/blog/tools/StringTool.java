package com.hyc.blog.tools;

import java.util.Random;
import java.util.UUID;

public class StringTool {

	/**
	 * 获取长度是8的倍数的字符串
	 * @param input
	 * @return
	 */
	public static String getMultiple8String(String input){
		StringBuffer multiple8String = new StringBuffer();
		int len = input.trim().length();
		int mod = len%8;
		
		if(mod==0){
			multiple8String = multiple8String.append(input.trim());
		}else{
			multiple8String = multiple8String.append(input.trim());
			//如果不是8的倍数，就在原字符串后面添加（8-余数）为字符串，从0开始
			for(int i=0;i<(8-mod);i++){
				multiple8String = multiple8String.append("*");
			}
		}
		return multiple8String.toString();
	}
	
	
	/**
	 * 获取原字符串
	 * @param input
	 * @return
	 */
	public static String getOriginalString(String input){
		String originalString = "";
		int len = input.length();
		int mod = len%8;
		if(mod==0){
			//因为添加的字符都是从0开始，所以只要截取从第一个字符到从后往前起第一个0之间的字符串即可
			int char0 = input.indexOf("*");
			if(char0!=-1){
				originalString = input.substring(0,input.lastIndexOf("*"));
			}
			
		}
		return originalString;
	}
	
	/**
	 * 判断字符串是否为空
	 * @param str
	 * @return
	 */
	public static String isNull(String str){
		if(null==str || "null".equals(str)){
			str = "";
		}
		return str;
	}
	
	/**
	 * 生成len为随机数
	 * @param len
	 * @return
	 */
	public static String getRandomNum(int len){
		String str = "0123456789";
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<len;i++){
			char cha = str.charAt(new Random().nextInt(str.length()));
			sb.append(cha);
		}
		return sb.toString();
	}
	
	/**
	 * 将空值转化为0，用于页面单选框未选中时设置
	 * @param str
	 * @return
	 */
	public static String convertNull(String str){
		if(null==str || "".equals(str)){
			str = "0";
		}
		return str;
	}
	
	/**
	 * 生成UUID
	 * @return
	 */
	public static String getUUID(){
		return UUID.randomUUID().toString().replaceAll("-","");
	}
	
	public static void main(String[] args) {
		System.out.println(getOriginalString("hello11555501234"));
		System.out.println(getRandomNum(5));
	}
}
