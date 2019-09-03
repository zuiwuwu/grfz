package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_KSDFModels extends BaseDBObject{
	 
	
	
	
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
	@Display(Name = "考试时间")
	public String KSSJ;
	public String getKSSJ() {
		return this.KSSJ;
	}
	public void setKSSJ(String value) {
		ReportPropertyChanging("KSSJ");
		this.KSSJ = value;
		ReportPropertyChanged("KSSJ");
	}    
	@Required
	@StringLength(length = 26)
	@Display(Name = "考试类别")
	public String KSLB;
	public String getKSLB() {
		return this.KSLB;
	}
	public void setKSLB(String value) {
		ReportPropertyChanging("KSLB");
		this.KSLB = value;
		ReportPropertyChanged("KSLB");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "考试成绩")
	public String KSCJ;
	public String getKSCJ() {
		return this.KSCJ;
	}
	public void setKSCJ(String value) {
		ReportPropertyChanging("KSCJ");
		this.KSCJ = value;
		ReportPropertyChanged("KSCJ");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "部门平均成绩")
	public String BMPJCJ;
	public String getBMPJCJ() {
		return this.BMPJCJ;
	}
	public void setBMPJCJ(String value) {
		ReportPropertyChanging("BMPJCJ");
		this.BMPJCJ = value;
		ReportPropertyChanged("BMPJCJ");
	}   
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "个人平均成绩")
	public String GRPJCJ;
	public String getGRPJCJ() {
		return this.GRPJCJ;
	}
	public void setGRPJCJ(String value) {
		ReportPropertyChanging("GRPJCJ");
		this.GRPJCJ = value;
		ReportPropertyChanged("GRPJCJ");
	}   
}
