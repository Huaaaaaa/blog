package com.hyc.blog.tools;


import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.apache.commons.codec.binary.Base64;

import sun.misc.BASE64Encoder;

import com.mysql.jdbc.util.Base64Decoder;



/**
 * @time 创建时间：2016年5月17日 上午11:48:58
 * @description 
 *              使用des加密算法进行加密解密工具类：可对String和byte[]类型进行加密解密，相应的密文也可用String或byte[]进行存储
 */
public class EncodeAndDecodeTool {
	
	 private final static char[] HEX = "0123456789abcdef".toCharArray();  

	/**
	 * 根据参数生成密钥key
	 * 
	 * @param msg
	 * @throws NoSuchAlgorithmException
	 */
	public static Key generateKey(String msg) {
		Key key = null;
		KeyGenerator generater;
		try {
			generater = KeyGenerator.getInstance("DES");
			// 防止linux下随机生成key
			// SecureRandom secureRandom =
			// SecureRandom.getInstance("NativePRNG");//NativePRNG SecureRandom
			// not available
			// SecureRandom secureRandom =
			// SecureRandom.getInstance("SHA1PRNG");//指定随机数生成器算法
			SecureRandom secureRandom = new SecureRandom();
			// System.out.println("默认安全随机数生成器算法是："+secureRandom.getAlgorithm());//默认随机岁生成器算法是：SHA1PRNG
			secureRandom.setSeed(msg.getBytes());
			generater.init(56, secureRandom);
			key = generater.generateKey();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} finally {
			generater = null;
		}
		return key;
	}

	/**
	 * 生成密码盐(安全随机数)
	 * 
	 * @param msg
	 * @return
	 */
	public static byte[] generateSalt(String msg) {
		// 按照指定算法生成随机数生成器(RNG)
		SecureRandom random;
		byte[] salt = new byte[8];
		try {
			random = SecureRandom.getInstance("SHA1PRNG");// 返回实现指定随机数生成器算法的SecureRandom对象
			random.nextBytes(salt);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return salt;
	}

	/**
	 * 获取用密码盐加密过的密码
	 * 
	 * @param password
	 * @param salt
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 */
	public static byte[] getCryptedPwd(String password, byte[] salt)
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		byte[] cryptedPwd = null;
		String algorithm = "PBKDF2WithHmacSHA1";
		// 生成固定大小的密钥：SHA1产生的是160位的hash值，所以在这里设为160
		int keyLength = 160;
		// 迭代计数
		int iterations = 20000;

		KeySpec ks = new PBEKeySpec(password.toCharArray(), salt, iterations,
				keyLength);
		SecretKeyFactory factory = SecretKeyFactory.getInstance(algorithm);

		cryptedPwd = factory.generateSecret(ks).getEncoded();

		return cryptedPwd;
	}

	/**
	 * 加密以String明文输入，以String密文输出
	 * 
	 * @param mingStr
	 * @return
	 */
	public static String getEncString(String mingStr, Key key) {
		byte[] mingByte;
		byte[] miByte;
		String miStr = "";
		Base64 encoder = new Base64();
		try {
			mingByte = mingStr.getBytes("UTF8");
			miByte = EncodeAndDecodeTool.getEncByte(mingByte, key);
			miStr = encoder.encode(miByte).toString();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} finally {
			encoder = null;
			mingByte = null;
			miByte = null;
		}
		return miStr;
	}

	/**
	 * 解密以String密文输入，以String明文输出
	 * 
	 * @param miStr
	 * @return
	 */
	public static String getDecString(String miStr, Key key) {
		byte[] miByte;
		byte[] mingByte;
		String mingStr = "";
		Base64 decoder = new Base64();
		try {
			miByte = decoder.decode(miStr.getBytes());
			miByte = EncodeAndDecodeTool.set8Byte(miByte);
//			mingByte = EncodeAndDecodeTool.getDecByte(miByte, key);
//			mingStr = new String(mingByte, "UTF8");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			decoder = null;
			miByte = null;
			mingByte = null;
		}

		return mingStr;
	}

	/**
	 * 加密以byte[]明文输入，以byte[]密文输出 Cipher初始化的操作模式有ENCRYPT_MODE(加密)、
	 * DECRYPT_MODE(解密)、 WRAP_MODE(秘钥解包)或 UNWRAP_MODE(密钥包装)
	 * 初始化方法中的参数是由操作模式、加密密钥、证书(Certificate)安全随机数（随机源）和算法参数组合而成的
	 * 
	 * @param mingByte
	 * @return
	 */
	public static byte[] getEncByte(byte[] mingByte, Key key) {
		byte[] miByte = null;
		Cipher cipher;// 此类为加密和解密提供密码功能
		try {
			// 返回实现指定转换的 Cipher 对象,转换类型为IDEA/ECB/PKCS5Padding，分别指（加密/解密算法
			// /工作模式(即加密模式) /填充模式），转换类型必须包括算法，后两种模式可选
			cipher = Cipher.getInstance("DES");// 转换是为产生某种输出而在输入上进行的操作
			// ENCRYPT_MODE-用于将 Cipher 初始化为加密模式的常量
			cipher.init(Cipher.ENCRYPT_MODE, key);
			// cipher.init(Cipher.ENCRYPT_MODE,
			// key,AlgorithmParameters.getInstance("DES"));
			// cipher.init(Cipher.UNWRAP_MODE,
			// key,SecureRandom.getInstance("SHA1PRNG"));
			// cipher.init(Cipher.WRAP_MODE, key,
			// AlgorithmParameters.getInstance("DES"));
			// mingByte = EncodeAndDecodeTool.set8Byte(mingByte);
			miByte = cipher.doFinal(mingByte);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cipher = null;
		}
		return miByte;
	}

	/**
	 * 解密以byte[]密文输入，以byte[]明文输出
	 * 
	 * @param miByte
	 * @return
	 */
	public static byte[] getDecByte(byte[] miByte, Key key) {
		byte[] mingByte = null;
		Cipher cipher;
		try {
			cipher = Cipher.getInstance("DES");
			// DECRYPT_MODE-用于将 Cipher 初始化为解密模式的常量
			cipher.init(Cipher.DECRYPT_MODE, key);
			miByte = EncodeAndDecodeTool.set8Byte(miByte);
//			mingByte = cipher.doFinal(miByte);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cipher = null;
		}
		return mingByte;
	}

	/**
	 * 将6位字节数组转成8位字节数组
	 * 
	 * @param inByte
	 */
	public static byte[] set8Byte(byte[] inByte) {
		byte[] newByte = null;
		int len = inByte.length;
		if (len < 8) {
			int less = 8 - len;
			if (less != 0) {
				newByte = new byte[8];
				System.arraycopy(inByte, 0, newByte, 0, 6);
				for (int i = 0; i < less; i++) {
					newByte[len + i] = (byte) (i * 20);
				}
			}
		}
		return newByte;
	}
	
	/**
	 * 将字节数组转化成16进制的字符串（用来解决md5乱码问题）
	 * @param bys
	 * @return
	 */
	public static String bytes2Hex(byte[] bys) {
		//每个字节用两个字符来表示
		char[] chs = new char[bys.length * 2];
		for (int i = 0, offset = 0; i < bys.length; i++) {
			chs[offset++] = HEX[bys[i] >> 4 & 0xf];
			chs[offset++] = HEX[bys[i] & 0xf];
		}
		return new String(chs);
	}

	/**
	 * 获取MD5值
	 * 
	 * @param str
	 * @return
	 */
	public static String getMd5(String str) {
		MessageDigest md;
		byte[] md5Byte = null;
		try {
			md = MessageDigest.getInstance("MD5");
			md5Byte = md.digest(str.getBytes());
		} catch (NoSuchAlgorithmException e) {
			System.out.println(e.getMessage());
		}

		return bytes2Hex(md5Byte);
	}

	/**
	 * base64+md5加密
	 * 
	 * @param str
	 * @return
	 */
	public static String encString(String str) {
		BASE64Encoder base64Encoder = new BASE64Encoder();
		return base64Encoder.encode(str.getBytes());
	}


	/**
	 * base64+md5加密
	 * 
	 * @param str
	 * @return
	 */
	public static String decString(String str) {
		Base64Decoder base64Decoder = new Base64Decoder();
		return new String(base64Decoder.decode(str.getBytes(), 0,
				str.length() - 1));
	}

	public static void main(String[] args) {
		String strEnc = encString("user");
		System.out.println("user加密之后是：" + strEnc);

		String strDec = decString(strEnc);
		System.out.println("user解密之后是：" + strDec);

		String md5Dec = getMd5("user");
		System.out.println("user的md5值是：" + md5Dec);
	}

}
