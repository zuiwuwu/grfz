package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_MZPCDAModels extends BaseDBObject{
	
	@Key 
	@Required 
	public String MZPCDABH;
	public String getMZPCDABH() {
		return this.MZPCDABH; 
		} 
	public void setMZPCDABH(String value) { 
		ReportPropertyChanging("MZPCDABH");
		this.MZPCDABH = value;
		ReportPropertyChanged("MZPCDABH");
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
	@Display(Name = "年度")
	public String ND;
	public String getND() {
		return this.ND;
	}
	public void setND(String value) {
		ReportPropertyChanging("ND");
		this.ND = value;
		ReportPropertyChanged("ND");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "所在单位")
	public String SZDW;
	public String getSZDW() {
		return this.SZDW;
	}
	public void setSZDW(String value) {
		ReportPropertyChanging("SZDW");
		this.SZDW = value;
		ReportPropertyChanged("SZDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "测评情况")
	public String CPQK;
	public String getCPQK() {
		return this.CPQK;
	}
	public void setCPQK(String value) {
		ReportPropertyChanging("CPQK");
		this.CPQK = value;
		ReportPropertyChanged("CPQK");
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
