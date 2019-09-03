package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class SLDJXGLModels  extends BaseDBObject {

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
	@Display(Name = "个人等次绩效")
	public float GRDCJX;
	public float getGRDCJX() {
		return this.GRDCJX;
	}
	public void setGRDCJX(float value) {
		ReportPropertyChanging("GRDCJX");
		this.GRDCJX = value;
		ReportPropertyChanged("GRDCJX");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "所在单位等次绩效")
	public float SZDWDCJX;
	public float getSZDWDCJX() {
		return this.SZDWDCJX;
	}
	public void setSZDWDCJX(float value) {
		ReportPropertyChanging("SZDWDCJX");
		this.SZDWDCJX = value;
		ReportPropertyChanged("SZDWDCJX");
	}
    
	@Required
	@StringLength(length = 26)
	@Display(Name = "所在单位执法质量")
	public float SZDWZFZL;
	public float getSZDWZFZL() {
		return this.SZDWZFZL;
	}
	public void setSZDWZFZL(float value) {
		ReportPropertyChanging("SZDWZFZL");
		this.SZDWZFZL = value;
		ReportPropertyChanged("SZDWZFZL");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "合成作战")
	public float HCZZ;
	public float getHCZZ() {
		return this.HCZZ;
	}
	public void setHCZZ(float value) {
		ReportPropertyChanging("HCZZ");
		this.HCZZ = value;
		ReportPropertyChanged("HCZZ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "合计")
	public float HJ;
	public float getHJ() {
		return this.HJ;
	}
	public void setHJ(float value) {
		ReportPropertyChanging("HJ");
		this.HJ = value;
		ReportPropertyChanged("HJ");
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
}
