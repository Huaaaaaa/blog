package com.hyc.blog.tools;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * 创建一个验证码类
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年8月22日 上午11:43:07
 *@description
 */
public class ValicodeTool {

	 /**
	  * 随机获取颜色
	  * @param height
	  * @param width
	  * @return
	  */
	public static Color getBgColor(int height,int width){

		if(width>255){
			width=255;
		}
		if(width<1){
			width=1;
		}
		if(height>255){
			height=255;
		}
		if(height<1){
			height=1;
		}

		Random ran = new Random();
		int r =width+ran.nextInt(width-height);
		int g =width+ran.nextInt(width-height);
		int b =width+ran.nextInt(width-height);
		if(r>255){
			r=255;
		}
		if(g>255){
			g=255;
		}
		if(b>255){
			b=255;
		}
		return new Color(r, g, b);
	}
	
	/**
	 * 随机n条产生干扰线
	 * @param g       Graphics2D对象
	 * @param n		    干扰线个数
	 * @param width   图片宽度
	 * @param heigth  图片高度
	 * @param ran	  Random对象
	 */
	public static void getDisturbLine(Graphics g,int n,int width,int height,Random ran){
		for(int i=0;i<n;i++){
			int x1 =ran.nextInt(width);
			int y1= ran.nextInt(height);
			int x2 = ran.nextInt(width);
			int y2 = ran.nextInt(height);
			Color color = ValicodeTool.getBgColor(height, width);
			g.setColor(color);
			g.drawLine(x1, y1, x1+x2, y1+y2);
		}
	}
	
	
	/**
	 * 随机n条产生干扰线
	 * @param g       Graphics2D对象
	 * @param n		    干扰点个数
	 * @param width   图片宽度
	 * @param heigth  图片高度
	 * @param ran	  Random对象
	 */
	public static void getDisturbPoint(Graphics g,int n,int width,int height,Random ran){
		Color color = ValicodeTool.getBgColor(height, width);
		g.setColor(color);
		for(int i=0;i<n;i++){
			int x = ran.nextInt(width);
			int y = ran.nextInt(height);
			g.drawLine(x, y, x, y);
		}
	}


	/**
	 * 生成验证码
	 * @param g       Graphics2D对象
	 * @param n		    验证码长度
	 * @param width   图片宽度
	 * @param heigth  图片高度
	 * @param ran	  Random对象
	 */
	public static String getValicode(Graphics g,int n,int width,int height,Random ran){
		String chars = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,"
				+ "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
		String[] charsArray = chars.split(",");
		StringBuffer valicode  = new StringBuffer();
		for(int i=0;i<n;i++){
			int random = ran.nextInt(charsArray.length);
			String codeStr = String.valueOf(charsArray[random]);
			Color color = ValicodeTool.getBgColor(height, width);
			g.setColor(color);
			g.drawString(codeStr, 13 * i + 10, 26);
			valicode.append(codeStr);
		}
		return valicode.toString();
	}
	
	/**
	 * 生成验证码图片
	 * @param width     宽度
	 * @param height    高度
	 * @param font      字体
	 * @param bgColor   背景色
	 * @param bdColor   边框色
	 */
	public static Graphics2D getGraphic(int width,int height,Font font){
		//预定义一个图片，包括长度、高度和类型
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		//创建对图片的几何形状、坐标变换、颜色管理和文本控制的操作类
		Graphics2D g =image.createGraphics();
		//设置字体
		g.setFont(font);
		//随机产生
		return g;
	}
	
	
	/**
	 * 生成验证码
	 * @param g
	 * @param width
	 * @param height
	 * @param n
	 * @param font
	 * @return
	 */
	public static String  getRanCode(Graphics2D g,int width,int height,int n,Font font){
		Random ran = new Random();
		g.setFont(font);
		//填充背景色
		g.setColor(Color.white);
		g.fillRect(0, 0, width, height);
		//画边框
		g.setColor(Color.black);
		g.drawRect(0, 0, width-1, height-1);
		//
		//生成干扰线
		ValicodeTool.getDisturbLine(g,100, width+50, height, ran);
		//生成干扰点
		ValicodeTool.getDisturbPoint(g, 600, width, height, ran);
		//填充随机码
		String ranCode = ValicodeTool.getValicode(g,n, width-30, height, ran);

		return ranCode;
	}       

	
}
