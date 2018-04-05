package com.hyc.extendsJfinal;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.jfinal.plugin.activerecord.IContainerFactory;
/**
 * @description 将驼峰式属性转换为数据库的下划线格式
 * @createtime 2017年11月20日 下午5:28:20
 * @email cyhua_csu@163.com
 * @song 平凡之路
 */
public class AddUnderlineToPropertyName implements IContainerFactory {
	private static Boolean addUnderLine = null;

	public AddUnderlineToPropertyName() {

	}

	public AddUnderlineToPropertyName(boolean addUnderLine) {
		AddUnderlineToPropertyName.addUnderLine = addUnderLine;
	}

	public Object convert(Object key) {
		if (null != addUnderLine) {
			String keyStr = key.toString();
			String keyName = keyStr;
			if (keyStr.indexOf(".") > -1) {
				keyName = keyStr.split("\\.")[1];
			}
			StringBuffer sb = new StringBuffer(keyName);
			for (int i = 0, length = sb.length(); i < length; i++) {
				if (Character.isUpperCase(sb.charAt(i))) {
					sb.insert(i, "_");
					i++;
				}
			}
			return sb.toString().toLowerCase();
		} else {
			return key;
		}

	}

	@Override
	public Map getAttrsMap() {
		return new PropertyNameMap();
	}

	@Override
	public Map getColumnsMap() {
		return new PropertyNameMap();
	}

	@Override
	public Set getModifyFlagSet() {
		return new PropertyNameSet();
	}

	/**
	 * @createtime 2017年11月20日 下午4:57:54
	 * @description
	 * 1、非静态成员内部类拥有对外部类中所有成员的完全访问权限，包括成员变量和方法：调用convert()方法
	 * 2、当成员内部类拥有和外部类同名的方法或变量时，优先访问内部类中的成员
	 * 3、外部类的多继承可以通过内部类来实现，例：外部类实现序列化的方法可以通过内部类来实现，这样外部类就不需要实现Serializable接口
	 */
	public class PropertyNameSet extends HashSet {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public boolean add(Object o) {
			return super.add(convert(o));
		}

		public boolean remove(Object o) {
			return super.remove(convert(o));
		}

		public boolean contains(Object o) {
			return super.contains(convert(o));
		}

		public boolean addAll(Collection c) {
			boolean isModified = false;
			for (Object object : c) {
				if (super.add(convert(object))) {
					isModified = true;
				}
			}
			return isModified;
		}

	}

	public class PropertyNameMap extends HashMap {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public Object get(Object key) {
			return super.get(convert(key));
		}

		public boolean containsKey(Object key) {
			return super.containsKey(convert(key));
		}

		public Object put(Object key, Object value) {
			return super.put(convert(key), value);
		}

		public void putAll(Map m) {
			for (Map.Entry e : (Set<Map.Entry>) m.entrySet()) {
				super.put(convert(e.getKey()), e.getValue());
			}
		}

		public Object remove(Object key) {
			return super.remove(convert(key));
		}

	}

}
