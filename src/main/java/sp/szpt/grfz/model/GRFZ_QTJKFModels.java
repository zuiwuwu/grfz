package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_QTJKFModels extends BaseDBObject {
	
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
	@Display(Name ="加扣分项目")
	public String JKFXM;
	public String getJKFXM() {
		return this.JKFXM;
	}
	
	public void setJKFXM(String value) {
		ReportPropertyChanging("JKFXM");
		this.JKFXM = value;
		ReportPropertyChanged("JKFXM");
	}  
	
	@Required
	@StringLength(length = 26)
	@Display(Name ="分数")
	public String SCORE;
	public String getSCORE() {
		return this.SCORE;
	}
	public void setSCORE(String value) {
		ReportPropertyChanging("SCORE");
		this.SCORE = value;
		ReportPropertyChanged("SCORE");
	}    

	@Required
	@StringLength(length = 26)
	@Display(Name ="分数明细")
	public String FSMX;
	public String getFSMX() {
		return this.FSMX;
	}
	public void setFSMX(String value) {
		ReportPropertyChanging("FSMX");
		this.FSMX = value;
		ReportPropertyChanged("FSMX");
	}    
	
	@Required
	@StringLength(length = 26)
	@Display(Name ="时间")
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
