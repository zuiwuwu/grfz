package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_PXDAModels extends BaseDBObject {
	
	@Key 
	@Required 
	public String PXDABH;
	public String getPXDABH() {
		return this.PXDABH; 
		} 
	public void setPXDABH(String value) { 
		ReportPropertyChanging("PXDABH");
		this.PXDABH = value;
		ReportPropertyChanged("PXDABH");
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
	@Display(Name = "时间")
	public String SJ;
	public String getSJ() {
		return this.SJ;
	}
	public void setSJ(String value) {
		ReportPropertyChanging("SJ");
		this.SJ = value;
		ReportPropertyChanged("SJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "地点")
	public String DD;
	public String getDD() {
		return this.DD;
	}
	public void setDD(String value) {
		ReportPropertyChanging("DD");
		this.DD = value;
		ReportPropertyChanged("DD");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训名称")
	public String PXMC;
	public String getPXMC() {
		return this.PXMC;
	}
	public void setPXMC(String value) {
		ReportPropertyChanging("PXMC");
		this.PXMC = value;
		ReportPropertyChanged("PXMC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训内容")
	public String PXNR;
	public String getPXNR() {
		return this.PXNR;
	}
	public void setPXNR(String value) {
		ReportPropertyChanging("PXNR");
		this.PXNR = value;
		ReportPropertyChanged("PXNR");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训单位")
	public String PXDW;
	public String getPXDW() {
		return this.PXDW;
	}
	public void setPXDW(String value) {
		ReportPropertyChanging("PXDW");
		this.PXDW = value;
		ReportPropertyChanged("PXDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训天数")
	public int PXTS;
	public int getPXTS() {
		return this.PXTS;
	}
	public void setPXTS(int value) {
		ReportPropertyChanging("PXTS");
		this.PXTS = value;
		ReportPropertyChanged("PXTS");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训完成情况")
	public String PXWCQK;
	public String getPXWCQK() {
		return this.PXWCQK;
	}
	public void setPXWCQK(String value) {
		ReportPropertyChanging("PXWCQK");
		this.PXWCQK = value;
		ReportPropertyChanged("PXWCQK");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "培训成绩或得分")
	public String PXCJ;
	public String getPXCJ() {
		return this.PXCJ;
	}
	public void setPXCJ(String value) {
		ReportPropertyChanging("PXCJ");
		this.PXCJ = value;
		ReportPropertyChanged("PXCJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "是否有证书")
	public String SFYZS;
	public String getSFYZS() {
		return this.SFYZS;
	}
	public void setSFYZS(String value) {
		ReportPropertyChanging("SFYZS");
		this.SFYZS = value;
		ReportPropertyChanged("SFYZS");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "证书名称")
	public String ZSMC;
	public String getZSMC() {
		return this.ZSMC;
	}
	public void setZSMC(String value) {
		ReportPropertyChanging("ZSMC");
		this.ZSMC = value;
		ReportPropertyChanged("ZSMC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "颁发机构")
	public String BFJG;
	public String getBFJG() {
		return this.BFJG;
	}
	public void setBFJG(String value) {
		ReportPropertyChanging("BFJG");
		this.BFJG = value;
		ReportPropertyChanged("BFJG");
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
