package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class KHGLModels extends BaseDBObject{
	
	
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
	@Display(Name = "警员属性")
	public String JYSX;
	public String getJYSX() {
		return this.JYSX;
	}
	public void setJYSX(String value) {
		ReportPropertyChanging("JYSX");
		this.JYSX = value;
		ReportPropertyChanged("JYSX");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "得分")
	public float SCORE;
	public float getSCORE() {
		return this.SCORE;
	}
	public void setSCORE(float value) {
		ReportPropertyChanging("SCORE");
		this.SCORE = value;
		ReportPropertyChanged("SCORE");
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
