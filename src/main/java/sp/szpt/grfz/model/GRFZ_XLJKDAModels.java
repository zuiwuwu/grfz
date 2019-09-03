package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_XLJKDAModels extends BaseDBObject{
	
	@Key 
	@Required 
	public String XLJKDABH;
	public String getXLJKDABH() {
		return this.XLJKDABH; 
		} 
	public void setXLJKDABH(String value) { 
		ReportPropertyChanging("XLJKDABH");
		this.XLJKDABH = value;
		ReportPropertyChanged("XLJKDABH");
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
	@Display(Name = "组织单位")
	public String ZZDW;
	public String getZZDW() {
		return this.ZZDW;
	}
	public void setZZDW(String value) {
		ReportPropertyChanging("ZZDW");
		this.ZZDW = value;
		ReportPropertyChanged("ZZDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "测试时间")
	public String CSSJ;
	public String getCSSJ() {
		return this.CSSJ;
	}
	public void setCSSJ(String value) {
		ReportPropertyChanging("CSSJ");
		this.CSSJ = value;
		ReportPropertyChanged("CSSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "测试项目")
	public String CSXM;
	public String getCSXM() {
		return this.CSXM;
	}
	public void setCSXM(String value) {
		ReportPropertyChanging("CSXM");
		this.CSXM = value;
		ReportPropertyChanged("CSXM");
	}
	

	@Required
	@StringLength(length = 26)
	@Display(Name = "成绩")
	public String CJ;
	public String getCJ() {
		return this.CJ;
	}
	public void setCJ(String value) {
		ReportPropertyChanging("CJ");
		this.CJ = value;
		ReportPropertyChanged("CJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "评价")
	public String PJ;
	public String getPJ() {
		return this.PJ;
	}
	public void setPJ(String value) {
		ReportPropertyChanging("PJ");
		this.PJ = value;
		ReportPropertyChanged("PJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "辅导老师")
	public String FDLS;
	public String getFDLS() {
		return this.FDLS;
	}
	public void setFDLS(String value) {
		ReportPropertyChanging("FDLS");
		this.FDLS = value;
		ReportPropertyChanged("FDLS");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "辅导时间")
	public String FDSJ;
	public String getFDSJ() {
		return this.FDSJ;
	}
	public void setFDSJ(String value) {
		ReportPropertyChanging("FDSJ");
		this.FDSJ = value;
		ReportPropertyChanged("FDSJ");
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
