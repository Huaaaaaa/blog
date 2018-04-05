/*
Navicat MySQL Data Transfer

Source Server         : hyc
Source Server Version : 50530
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50530
File Encoding         : 65001

Date: 2017-12-01 17:52:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` smallint(6) NOT NULL,
  `blog_title` varchar(255) DEFAULT NULL COMMENT '博客标题',
  `blog_htmlcontent` longtext COMMENT '博客内容',
  `blog_writer` varchar(30) DEFAULT NULL COMMENT '博客作者',
  `blog_create_time` varchar(30) DEFAULT NULL COMMENT '创建时间',
  `blog_url` varchar(100) DEFAULT NULL COMMENT '博客地址',
  `blog_key` varchar(50) DEFAULT NULL,
  `blog_option` varchar(50) DEFAULT NULL,
  `type_prelanguage` varchar(50) DEFAULT NULL,
  `type_backlanguage` varchar(50) DEFAULT NULL,
  `type_database` varchar(50) DEFAULT NULL,
  `blog_text` longtext,
  `blog_type` varchar(50) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '放大放大放大', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">放大放大放大师傅的</span></div><div style=\"text-align: left;\"><ul><li>打发阿凡达大</li><li>回宿舍收到货</li><li>我要我要我要听五月天</li></ul></div>', 'admin', '2017-01-3 14:16:31', '放大放大撒', '1', '1', null, null, null, '放大放大放大师傅的打发阿凡达大回宿舍收到货我要我要我要听五月天', 'css', 's');
INSERT INTO `blog` VALUES ('2', '放大放大放大撒', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">放大放大放大都是</span></div><div style=\"text-align: center;\"><ol><li style=\"text-align: left;\">放大放大大声</li><li style=\"text-align: left;\">他天天天天天天天天天天天天天天天天天天天天</li><li style=\"text-align: left;\">对方回复个哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</li></ol></div>', 'admin', '2017-01-3 14:17:24', '放大放大放大撒', '1', '1', null, null, null, '放大放大放大都是放大放大大声他天天天天天天天天天天天天天天天天天天天天对方回复个哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', 'css', 's');
INSERT INTO `blog` VALUES ('3', '回宿舍防晒霜', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">官方水水水水水水水水水水水水水水水水水水水水</span></div><div style=\"text-align: left;\"><ul><li><font color=\"#00ff99\">大发啊啊啊啊</font></li><li><font color=\"#00ff99\">接口和姐夫姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐</font></li><li><font color=\"#00ff99\">教育好讨厌呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀</font></li><li><font color=\"#00ff99\">换个地方灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌个或</font></li></ul></div>', 'admin', '2017-01-3 14:18:19', '刚分手分手放松放松', '1', '1', null, null, null, '官方水水水水水水水水水水水水水水水水水水水水大发啊啊啊啊接口和姐夫姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐姐教育好讨厌呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀换个地方灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌灌个或', 'css', 's');
INSERT INTO `blog` VALUES ('4', '各方事故发生股份', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">各方事故发生股份水果放到</span></div><div style=\"text-align: left;\"><ol><li><span style=\"line-height: 1.42857143;\">&nbsp;放大水水水水谁谁谁水水水水水水水水</span></li><li><span style=\"line-height: 1.42857143;\">发的撒啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span></li><li><span style=\"line-height: 1.42857143;\">各方割发代首归档高大哥大哥打闪光灯</span></li><li><span style=\"line-height: 1.42857143;\">&nbsp;大方的撒范德萨发大水&nbsp;</span></li></ol></div>', 'admin', '2017-01-3 14:27:15', '各方施工方双方都', '1', '1', null, null, null, '各方事故发生股份水果放到 放大水水水水谁谁谁水水水水水水水水发的撒啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊各方割发代首归档高大哥大哥打闪光灯 大方的撒范德萨发大水 ', 'css', 's');
INSERT INTO `blog` VALUES ('5', '放大放大', '放大放大撒', 'admin', '2017-01-3 14:28:58', '放大放大师傅', null, null, null, null, null, '放大放大撒', 'css', 's');
INSERT INTO `blog` VALUES ('6', '的撒个广东撒', '放大放大放大撒', 'admin', '2017-01-3 14:32:44', '放大大的', null, null, null, null, null, '放大放大放大撒', 'css', 's');
INSERT INTO `blog` VALUES ('7', '各方施工方第三个', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">官方方法反反复复反反复复反反复复</span></div><div style=\"text-align: center;\"><ul><li style=\"text-align: left;\">广泛覆盖</li><li style=\"text-align: left;\">腹股沟管灌灌灌灌灌灌灌灌灌灌</li><li style=\"text-align: left;\">gfffffffffffffff</li></ul></div>', 'admin', '2017-01-3 16:6:9', '各方第三个发股份', '1', '1', null, null, null, '官方方法反反复复反反复复反反复复广泛覆盖腹股沟管灌灌灌灌灌灌灌灌灌灌gfffffffffffffff', 'css', 's');
INSERT INTO `blog` VALUES ('8', '放水电费', '放大声地', 'admin', '2017-01-3 16:7:2', '官方对双方都', null, null, null, null, null, '放大声地', 'css', 's');
INSERT INTO `blog` VALUES ('9', '各方施工方', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">各方施工方手动各方施工方手动</span></div><div style=\"text-align: center;\"><ul><li style=\"text-align: left;\">官方烦烦烦烦烦烦烦烦烦烦烦</li></ul></div>', 'admin', '2017-01-3 16:8:17', '各方施工方手动', null, null, null, null, null, '各方施工方手动各方施工方手动官方烦烦烦烦烦烦烦烦烦烦烦', 'css', 's');
INSERT INTO `blog` VALUES ('10', '放大放大撒', '放大放大撒', 'admin', '2017-01-3 16:9:52', '发大水发大水', '1', '1', null, null, null, '放大放大撒', 'h5', 's');
INSERT INTO `blog` VALUES ('11', '一万公里的约定', '<div style=\"text-align: center;\"><span style=\"line-height: 1.42857143;\">一万公里的约定</span></div><div style=\"text-align: left;\"><ol><li>主演</li><li>剧情</li><li>导演</li><li>监制</li></ol></div>', 'admin', '2017-01-9 10:51:22', '地方放大幅度', '1', '1', null, null, null, '一万公里的约定主演剧情导演监制', 'h5', 's');

-- ----------------------------
-- Table structure for blog_user
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
  `id` varchar(100) NOT NULL COMMENT '用户id',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名，唯一',
  `nick_name` varchar(50) DEFAULT NULL COMMENT '用户别名',
  `password` varchar(50) DEFAULT NULL COMMENT '用户密码',
  `account_phone` varchar(20) DEFAULT NULL COMMENT '联系方式',
  `figure` varchar(500) DEFAULT NULL COMMENT '头像',
  `gender` varchar(10) DEFAULT NULL COMMENT '性别',
  `user_birth` varchar(255) DEFAULT NULL COMMENT '出生日期',
  `hometown_city` varchar(255) DEFAULT NULL COMMENT '家乡所在的市',
  `hometown_province` varchar(255) DEFAULT NULL COMMENT '家乡所在的省',
  `hometown_country` varchar(255) DEFAULT NULL,
  `nowloc_province` varchar(255) DEFAULT NULL COMMENT '现居地所在省',
  `nowloc_city` varchar(255) DEFAULT NULL COMMENT '现居地所在的市',
  `nowloc_country` varchar(255) DEFAULT NULL,
  `marriage` varchar(20) DEFAULT NULL COMMENT '婚姻状况',
  `user_job` varchar(255) DEFAULT NULL COMMENT '用户职位',
  `user_company` varchar(255) DEFAULT NULL COMMENT '用户所在公司或企业',
  `job_status` varchar(255) DEFAULT NULL COMMENT '工作状况',
  `user_technology` varchar(255) DEFAULT NULL COMMENT '感兴趣的技术',
  `tec_access_authority` varchar(50) DEFAULT NULL COMMENT '访问权限',
  `is_tec_show` varchar(10) DEFAULT NULL COMMENT '是否显示在首页',
  `user_target` varchar(255) DEFAULT NULL COMMENT '近期目标',
  `target_access_authority` varchar(255) DEFAULT NULL,
  `is_target_show` varchar(5) DEFAULT NULL,
  `self_introduce` varchar(255) DEFAULT NULL COMMENT '自我介绍',
  `self_intro_access_authority` varchar(255) DEFAULT NULL,
  `is_self_access_show` varchar(5) DEFAULT NULL,
  `account_sina` varchar(255) DEFAULT NULL COMMENT '新浪微博账号',
  `account_sina_access_authority` varchar(50) DEFAULT NULL,
  `account_sina_show` varchar(5) DEFAULT NULL,
  `account_zhihu` varchar(255) DEFAULT NULL COMMENT '知乎账号',
  `account_zhihu_access_authority` varchar(50) DEFAULT NULL,
  `account_zhihu_show` varchar(255) DEFAULT NULL,
  `account_email` varchar(255) DEFAULT NULL COMMENT '邮箱账号',
  `account_email_access_authority` varchar(255) DEFAULT NULL,
  `account_email_show` varchar(255) DEFAULT NULL,
  `account_blog` varchar(255) DEFAULT NULL COMMENT '博客园账号',
  `account_blog_access_authority` varchar(255) DEFAULT NULL,
  `account_blog_show` varchar(255) DEFAULT NULL,
  `user_motto` varchar(255) DEFAULT '' COMMENT '座右铭',
  `motto_access_authority` varchar(255) DEFAULT NULL,
  `is_motto_show` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_user
-- ----------------------------
INSERT INTO `blog_user` VALUES ('8d3e19c8358540d48d72d9dda5add7f5', 'huayingcao', '小牙刷', 'admin123', '15994237614', null, null, '2012-06-15 14:45', '安庆', '安徽', '安庆市', '北京', '北京', '北京市', 'tomatoes', 'ssddsd', 'ddsafdsa', 'tomatoes', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'cyhua_csu@163.com', null, null, null, null, null, '', null, null);
INSERT INTO `blog_user` VALUES ('s', 'admin', ' 管理员', 'admin', null, '/modules/user/images/figure/camera9.jpg', 'male', '2012-06-15 14:45', '武威', '甘肃', '天祝藏族自治县', '湖北', '武汉', '武汉市', '热恋', ' ', 'hik', '已工作', 'java,php,css,html', '任何人', '0', '跳舞', '任何人', '0', 'hello world!!!', '任何人', '1', 'aaa', '任何人', '1', 'bbb', '任何人', '1', '1543877225@qq.com', '仅好友', '0', 'ccc', '仅自己', '0', 'while(true){i.coding(myLife)}', '任何人', '0');

-- ----------------------------
-- Table structure for coding
-- ----------------------------
DROP TABLE IF EXISTS `coding`;
CREATE TABLE `coding` (
  `id` varchar(255) NOT NULL,
  `blog_title` varchar(255) DEFAULT NULL COMMENT '博客标题',
  `blog_htmlcontent` longtext COMMENT '博客内容',
  `blog_writer` varchar(30) DEFAULT NULL COMMENT '博客作者',
  `blog_create_time` varchar(30) DEFAULT NULL COMMENT '创建时间',
  `blog_url` varchar(100) DEFAULT NULL COMMENT '博客地址',
  `blog_key` varchar(50) DEFAULT NULL,
  `blog_option` varchar(50) DEFAULT NULL,
  `type_prelanguage` varchar(50) DEFAULT NULL,
  `type_backlanguage` varchar(50) DEFAULT NULL,
  `type_database` varchar(50) DEFAULT NULL,
  `blog_text` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coding
-- ----------------------------
