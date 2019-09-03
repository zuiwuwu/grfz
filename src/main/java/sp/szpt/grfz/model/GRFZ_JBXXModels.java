package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;
public class GRFZ_JBXXModels extends BaseDBObject {
	
	@Key 
	@Required 
	public String JBXXDABH;
	public String getJBXXDABH() {
		return this.JBXXDABH; 
		} 
	public void setJBXXDABH(String value) { 
		ReportPropertyChanging("JBXXDABH");
		this.JBXXDABH = value;
		ReportPropertyChanged("JBXXDABH");
		} 
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "姓名")
	public String XM;
	public String getXM() {
		return this.XM;
	}
	public void setXM(String value) {
		ReportPropertyChanging("XM");
		this.XM = value;
		ReportPropertyChanged("XM");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "曾姓名")
	public String CXM;
	public String getCXM() {
		return this.CXM;
	}
	public void setCXM(String value) {
		ReportPropertyChanging("CXM");
		this.CXM = value;
		ReportPropertyChanged("CXM");
	}     
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "照片路径")
	public String ZPURL;
	public String getZPURL() {
		return this.ZPURL;
	}
	public void setZPURL(String value) {
		ReportPropertyChanging("ZPURL");
		this.ZPURL = value;
		ReportPropertyChanged("ZPURL");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "性别")
	public String SEX;
	public String getSEX() {
		return this.SEX;
	}
	public void setSEX(String value) {
		ReportPropertyChanging("SEX");
		this.SEX = value;
		ReportPropertyChanged("SEX");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "公民身份证号码")
	public String GMSFZHM;
	public String getGMSFZHM() {
		return this.GMSFZHM;
	}
	public void setGMSFZHM(String value) {
		ReportPropertyChanging("GMSFZHM");
		this.GMSFZHM = value;
		ReportPropertyChanged("GMSFZHM");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "出生日期")
	public String CSRQ;
	
	public String getCSRQ() {
		return this.CSRQ;
	}
	public void setCSRQ(String value) {
		ReportPropertyChanging("CSRQ");
		this.CSRQ = value;
		System.out.println(CSRQ+"---");
		ReportPropertyChanged("CSRQ");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "年龄")
	public int NL;
	public int getNL() {
		return this.NL;
	}
	public void setNL(int value) {
		ReportPropertyChanging("NL");
		this.NL = value;
		ReportPropertyChanged("NL");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "籍贯")
	public String JG;
	public String getJG() {
		return this.JG;
	}
	public void setJG(String value) {
		ReportPropertyChanging("JG");
		this.JG = value;
		ReportPropertyChanged("JG");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "出生地")
	public String CSD;
	public String getCSD() {
		return this.CSD;
	}
	public void setCSD(String value) {
		ReportPropertyChanging("CSD");
		this.CSD = value;
		ReportPropertyChanged("CSD");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "民族")
	public String MZ;
	public String getMZ() {
		return this.MZ;
	}
	public void setMZ(String value) {
		ReportPropertyChanging("MZ");
		this.MZ = value;
		ReportPropertyChanged("MZ");
	}  
	@Required
	@StringLength(length = 26)
	@Display(Name = "政治身份")
	public String ZZSF;
	public String getZZSF() {
		return this.ZZSF;
	}
	public void setZZSF(String value) {
		ReportPropertyChanging("ZZSF");
		this.ZZSF = value;
		ReportPropertyChanged("ZZSF");
	}     
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "参加党派时间")
	public String CJDPSJ;
	public String getCJDPSJ() {
		return this.CJDPSJ;
	}
	public void setCJDPSJ(String value) {
		ReportPropertyChanging("CJDPSJ");
		this.CJDPSJ = value;
		ReportPropertyChanged("CJDPSJ");
	}    
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "血型")
	public String XX;
	public String getXX() {
		return this.XX;
	}
	public void setXX(String value) {
		ReportPropertyChanging("XX");
		this.XX = value;
		ReportPropertyChanged("XX");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "身高")
	public double SG;
	public double getSG() {
		return this.SG;
	}
	public void setSG(double value) {
		ReportPropertyChanging("SG");
		this.SG = value;
		ReportPropertyChanged("SG");
	}     
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "体重")
	public double TZ;
	public double getTZ() {
		return this.TZ;
	}
	public void setTZ(double value) {
		ReportPropertyChanging("TZ");
		this.TZ = value;
		ReportPropertyChanged("TZ");
	}     
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "手机号")
	public String PHONE;
	public String getPHONE() {
		return this.PHONE;
	}
	public void setPHONE(String value) {
		ReportPropertyChanging("PHONE");
		this.PHONE = value;
		ReportPropertyChanged("PHONE");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "微信号")
	public String WXH;
	public String getWXH() {
		return this.WXH;
	}
	public void setWXH(String value) {
		ReportPropertyChanging("WXH");
		this.WXH = value;
		ReportPropertyChanged("WXH");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "电子邮箱")
	public String EMAL;
	public String getEMAL() {
		return this.EMAL;
	}
	public void setEMAL(String value) {
		ReportPropertyChanging("EMAL");
		this.EMAL = value;
		ReportPropertyChanged("EMAL");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "健康状况")
	public String JKZK;
	public String getJKZK() {
		return this.JKZK;
	}
	public void setJKZK(String value) {
		ReportPropertyChanging("JKZK");
		this.JKZK = value;
		ReportPropertyChanged("JKZK");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "婚姻状况")
	public String HYZK;
	public String getHYZK() {
		return this.HYZK;
	}
	public void setHYZK(String value) {
		ReportPropertyChanging("HYZK");
		this.HYZK = value;
		ReportPropertyChanged("HYZK");
	}      
	@Required
	@StringLength(length = 26)
	@Display(Name = "户口性质")
	public String HKXZ;
	public String getHKXZ() {
		return this.HKXZ;
	}
	public void setHKXZ(String value) {
		ReportPropertyChanging("HKXZ");
		this.HKXZ = value;
		ReportPropertyChanged("HKXZ");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "户口所在地")
	public String HKSZD;
	public String getHKSZD() {
		return this.HKSZD;
	}
	public void setHKSZD(String value) {
		ReportPropertyChanging("HKSZD");
		this.HKSZD = value;
		ReportPropertyChanged("HKSZD");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "毕业学校及专业")
	public String BYXXJZY;
	public String getBYXXJZY() {
		return this.BYXXJZY;
	}
	public void setBYXXJZY(String value) {
		ReportPropertyChanging("BYXXJZY");
		this.BYXXJZY = value;
		ReportPropertyChanged("BYXXJZY");
	}  
	@Required
	@StringLength(length = 26)
	@Display(Name = "最后学历")
	public String ZHXL;
	public String getZHXL() {
		return this.ZHXL;
	}
	public void setZHXL(String value) {
		ReportPropertyChanging("ZHXL");
		this.ZHXL = value;
		ReportPropertyChanged("ZHXL");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "警种")
	public String JZ;
	public String getJZ() {
		return this.JZ;
	}
	public void setJZ(String value) {
		ReportPropertyChanging("JZ");
		this.JZ = value;
		ReportPropertyChanged("JZ");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "警号")
	public String JH;
	public String getJH() {
		return this.JH;
	}
	public void setJH(String value) {
		ReportPropertyChanging("JH");
		this.JH = value;
		ReportPropertyChanged("JH");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "大部门")
	public String DBM;
	public String getDBM() {
		return this.DBM;
	}
	public void setDBM(String value) {
		ReportPropertyChanging("DBM");
		this.DBM = value;
		ReportPropertyChanged("DBM");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "现工作单位")
	public String XGZDW;
	public String getXGZDW() {
		return this.XGZDW;
	}
	public void setXGZDW(String value) {
		ReportPropertyChanging("XGZDW");
		this.XGZDW = value;
		ReportPropertyChanged("XGZDW");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "单位简称")
	public String DWJC;
	public String getDWJC() {
		return this.DWJC;
	}
	public void setDWJC(String value) {
		ReportPropertyChanging("DWJC");
		this.DWJC = value;
		ReportPropertyChanged("DWJC");
	}     
	@Required
	@StringLength(length = 26)
	@Display(Name = "科室简称")
	public String KSJC;
	public String getKSJC() {
		return this.KSJC;
	}
	public void setKSJC(String value) {
		ReportPropertyChanging("KSJC");
		this.KSJC = value;
		ReportPropertyChanged("KSJC");
	}  
	@Required
	@StringLength(length = 26)
	@Display(Name = "进入现单位时间")
	public String JRXDWSJ;
	public String getJRXDWSJ() {
		return this.JRXDWSJ;
	}
	public void setJRXDWSJ(String value) {
		ReportPropertyChanging("JRXDWSJ");
		this.JRXDWSJ = value;
		ReportPropertyChanged("JRXDWSJ");
	} 
	@Required
	@StringLength(length = 26)
	@Display(Name = "进入来源")
	public String JRLY;
	public String getJRLY() {
		return this.JRLY;
	}
	public void setJRLY(String value) {
		ReportPropertyChanging("JRLY");
		this.JRLY = value;
		ReportPropertyChanged("JRLY");
	} 
	@Required
	@StringLength(length = 26)
	@Display(Name = "进入方式")
	public String JRFS;
	public String getJRFS() {
		return this.JRFS;
	}
	public void setJRFS(String value) {
		ReportPropertyChanging("JRFS");
		this.JRFS = value;
		ReportPropertyChanged("JRFS");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "岗位")
	public String GW;
	public String getGW() {
		return this.GW;
	}
	public void setGW(String value) {
		ReportPropertyChanging("GW");
		this.GW = value;
		ReportPropertyChanged("GW");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "职务")
	public String ZW;
	public String getZW() {
		return this.ZW;
	}
	public void setZW(String value) {
		ReportPropertyChanging("ZW");
		this.ZW = value;
		ReportPropertyChanged("ZW");
	}       
	@Required
	@StringLength(length = 26)
	@Display(Name = "现职务任职时间")
	public String XZWRZSJ;
	public String getXZWRZSJ() {
		return this.XZWRZSJ;
	}
	public void setXZWRZSJ(String value) {
		ReportPropertyChanging("XZWRZSJ");
		this.XZWRZSJ = value;
		ReportPropertyChanged("XZWRZSJ");
	}     
	@Required
	@StringLength(length = 26)
	@Display(Name = "在职状况")
	public String ZZZK;
	public String getZZZK() {
		return this.ZZZK;
	}
	public void setZZZK(String value) {
		ReportPropertyChanging("ZZZK");
		this.ZZZK = value;
		ReportPropertyChanged("ZZZK");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "公安专线号")
	public String GAZXH;
	public String getGAZXH() {
		return this.GAZXH;
	}
	public void setGAZXH(String value) {
		ReportPropertyChanging("GAZXH");
		this.GAZXH = value;
		ReportPropertyChanged("GAZXH");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "办公电话")
	public String BGDH;
	public String getBGDH() {
		return this.BGDH;
	}
	public void setBGDH(String value) {
		ReportPropertyChanging("BGDH");
		this.BGDH = value;
		ReportPropertyChanged("BGDH");
	}     
	@Required
	@StringLength(length = 26)
	@Display(Name = "公务员录用时间")
	public String GWYLYSJ;
	public String getGWYLYSJ() {
		return this.GWYLYSJ;
	}
	public void setGWYLYSJ(String value) {
		ReportPropertyChanging("GWYLYSJ");
		this.GWYLYSJ = value;
		ReportPropertyChanged("GWYLYSJ");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "参加工作时间")
	public String CJGZSJ;
	public String getCJGZSJ() {
		return this.CJGZSJ;
	}
	public void setCJGZSJ(String value) {
		ReportPropertyChanging("CJGZSJ");
		this.CJGZSJ = value;
		ReportPropertyChanged("CJGZSJ");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "参加公安工作时间")
	public String CJGAGZSJ;
	public String getCJGAGZSJ() {
		return this.CJGAGZSJ;
	}
	public void setCJGAGZSJ(String value) {
		ReportPropertyChanging("CJGAGZSJ");
		this.CJGAGZSJ = value;
		ReportPropertyChanged("CJGAGZSJ");
	}  
	@Required
	@StringLength(length = 26)
	@Display(Name = "人员编制性质")
	public String RYBZXZ;
	public String getRYBZXZ() {
		return this.RYBZXZ;
	}
	public void setRYBZXZ(String value) {
		ReportPropertyChanging("RYBZXZ");
		this.RYBZXZ = value;
		ReportPropertyChanged("RYBZXZ");
	}  
	@Required
	@StringLength(length = 26)
	@Display(Name = "首授警衔种类")
	public String SSJXZL;
	public String getSSJJZL() {
		return this.SSJXZL;
	}
	public void setSSJXZL(String value) {
		ReportPropertyChanging("SSJXZL");
		this.SSJXZL = value;
		ReportPropertyChanged("SSJXZL");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "工龄")
	public int GL;
	public int getGL() {
		return this.GL;
	}
	public void setGL(int value) {
		ReportPropertyChanging("GL");
		this.GL = value;
		ReportPropertyChanged("GL");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "享受待遇级别")
	public String XSDYJB;
	public String getXSDYJB() {
		return this.XSDYJB;
	}
	public void setXSDYJB(String value) {
		ReportPropertyChanging("XSDYJB");
		this.XSDYJB = value;
		ReportPropertyChanged("XSDYJB");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "假期类别")
	public String JQLB;
	public String getJQLB() {
		return this.JQLB;
	}
	public void setJQLB(String value) {
		ReportPropertyChanging("JQLB");
		this.JQLB = value;
		ReportPropertyChanged("JQLB");
	}   
	@Required
	@StringLength(length = 26)
	@Display(Name = "应休天数")
	public int YXTS;
	public int getYXTS() {
		return this.YXTS;
	}
	public void setYXTS(int value) {
		ReportPropertyChanging("YXTS");
		this.YXTS = value;
		ReportPropertyChanged("YXTS");
	}       
	@Required
	@StringLength(length = 26)
	@Display(Name = "起始时间")
	public String QSSJ;
	public String getQSSJ() {
		return this.QSSJ;
	}
	public void setQSSJ(String value) {
		ReportPropertyChanging("QSSJ");
		this.QSSJ = value;
		ReportPropertyChanged("QSSJ");
	}         
	@Required
	@StringLength(length = 26)
	@Display(Name = "终止时间")
	public String ZZSJ;
	public String getZZSJ() {
		return this.ZZSJ;
	}
	public void setZZSJ(String value) {
		ReportPropertyChanging("ZZSJ");
		this.ZZSJ = value;
		ReportPropertyChanged("ZZSJ");
	}         
	@Required
	@StringLength(length = 26)
	@Display(Name = "实休天数")
	public int SXTS;
	public int getSXTS() {
		return this.SXTS;
	}
	public void setSXTS(int value) {
		ReportPropertyChanging("SXTS");
		this.SXTS = value;
		ReportPropertyChanged("SXTS");
	}       
	@Required
	@StringLength(length = 26)
	@Display(Name = "休假完成情况")
	public String XJWCQK;
	public String getXJWCQK() {
		return this.XJWCQK;
	}
	public void setXJWCQK(String value) {
		ReportPropertyChanging("XJWCQK");
		this.XJWCQK = value;
		ReportPropertyChanged("XJWCQK");
	}       
	@Required
	@StringLength(length = 26)
	@Display(Name = "出境证件种类")
	public String CJZJZL;
	public String getCJZJZL() {
		return this.CJZJZL;
	}
	public void setCJZJZL(String value) {
		ReportPropertyChanging("CJZJZL");
		this.CJZJZL = value;
		ReportPropertyChanged("CJZJZL");
	}      
	@Required
	@StringLength(length = 26)
	@Display(Name = "证件号码")
	public String ZJHM;
	public String getZJHM() {
		return this.ZJHM;
	}
	public void setZJHM(String value) {
		ReportPropertyChanging("ZJHM");
		this.ZJHM = value;
		ReportPropertyChanged("ZJHM");
	}     
	@Required
	@StringLength(length = 26)
	@Display(Name = "签发时间")
	public String QFSJ;
	public String getQFSJ() {
		return this.QFSJ;
	}
	public void setQFSJ(String value) {
		ReportPropertyChanging("QFSJ");
		this.QFSJ = value;
		ReportPropertyChanged("QFSJ");
	} 
	@Required
	@StringLength(length = 26)
	@Display(Name = "证件有效期")
	public String ZJYXQ;
	public String getZJYXQ() {
		return this.ZJYXQ;
	}
	public void setZJYXQ(String value) {
		ReportPropertyChanging("ZJYXQ");
		this.ZJYXQ = value;
		ReportPropertyChanged("ZJYXQ");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "签发地")
	public String QFD;
	public String getQFD() {
		return this.QFD;
	}
	public void setQFD(String value) {
		ReportPropertyChanging("QFD");
		this.QFD = value;
		ReportPropertyChanged("QFD");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "证件保管单位")
	public String ZJBGDW;
	public String getZJBGDW() {
		return this.ZJBGDW;
	}
	public void setZJBGDW(String value) {
		ReportPropertyChanging("ZJBGDW");
		this.ZJBGDW = value;
		ReportPropertyChanged("ZJBGDW");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "证件保管记录")
	public String ZJBGJL;
	public String getZJBGJL() {
		return this.ZJBGJL;
	}
	public void setZJBGJL(String value) {
		ReportPropertyChanging("ZJBGJL");
		this.ZJBGJL = value;
		ReportPropertyChanged("ZJBGJL");
	}
	@Required
	@StringLength(length = 26)
	@Display(Name = "最后专业")
	public String ZHZY;
	public String getZHZY() {
		return this.ZHZY;
	}
	public void setZHZY(String value) {
		ReportPropertyChanging("ZHZY");
		this.ZHZY = value;
		ReportPropertyChanged("ZHZY");
	}
	 
}
