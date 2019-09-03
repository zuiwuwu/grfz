package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class JTGLModels extends BaseDBObject {

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
	@Display(Name = "关系人姓名")
	public String GXRXM;
	public String getGXRXM() {
		return this.GXRXM;
	}
	public void setGXRXM(String value) {
		ReportPropertyChanging("GXRXM");
		this.GXRXM = value;
		ReportPropertyChanged("GXRXM");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "关系人与该人关系名称")
	public String GXRCW;
	public String getGXRCW() {
		return this.GXRCW;
	}
	public void setGXRCW(String value) {
		ReportPropertyChanging("GXRCW");
		this.GXRCW = value;
		ReportPropertyChanged("GXRCW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "关系人出生日期")
	public String GXRCSRQ;
	public String getGXRCSRQ() {
		return this.GXRCSRQ;
	}
	public void setGXRCSRQ(String value) {
		ReportPropertyChanging("GXRCSRQ");
		this.GXRCSRQ = value;
		ReportPropertyChanged("GXRCSRQ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "工作单位名称")
	public String GZDWMC;
	public String getGZDWMC() {
		return this.GZDWMC;
	}
	public void setGZDWMC(String value) {
		ReportPropertyChanging("GZDWMC");
		this.GZDWMC = value;
		ReportPropertyChanged("GZDWMC");
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
	@Display(Name = "人员职务")
	public String RYZW;
	public String getRYZW() {
		return this.RYZW;
	}
	public void setRYZW(String value) {
		ReportPropertyChanging("RYZW");
		this.RYZW = value;
		ReportPropertyChanged("RYZW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "人员现状")
	public String RYXZ;
	public String getRYXZ() {
		return this.RYXZ;
	}
	public void setRYXZ(String value) {
		ReportPropertyChanging("RYXZ");
		this.RYXZ = value;
		ReportPropertyChanged("RYXZ");
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
	@Display(Name = "学历")
	public String XL;
	public String getXL() {
		return this.XL;
	}
	public void setXL(String value) {
		ReportPropertyChanging("XL");
		this.XL = value;
		ReportPropertyChanged("XL");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "政治面貌")
	public String ZZMM;
	public String getZZMM() {
		return this.ZZMM;
	}
	public void setZZMM(String value) {
		ReportPropertyChanging("ZZMM");
		this.ZZMM = value;
		ReportPropertyChanged("ZZMM");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "兴趣爱好")
	public String XQAH;
	public String getXQAH() {
		return this.XQAH;
	}
	public void setXQAH(String value) {
		ReportPropertyChanging("XQAH");
		this.XQAH = value;
		ReportPropertyChanged("XQAH");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "有何特长")
	public String YHTC;
	public String getYHTC() {
		return this.YHTC;
	}
	public void setYHTC(String value) {
		ReportPropertyChanging("YHTC");
		this.YHTC = value;
		ReportPropertyChanged("YHTC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "家庭住址")
	public String JTZZ;
	public String getJTZZ() {
		return this.JTZZ;
	}
	public void setJTZZ(String value) {
		ReportPropertyChanging("JTZZ");
		this.JTZZ = value;
		ReportPropertyChanged("JTZZ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "家庭电话")
	public String JTDH;
	public String getJTDH() {
		return this.JTDH;
	}
	public void setJTDH(String value) {
		ReportPropertyChanging("JTDH");
		this.JTDH = value;
		ReportPropertyChanged("JTDH");
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
	
}
