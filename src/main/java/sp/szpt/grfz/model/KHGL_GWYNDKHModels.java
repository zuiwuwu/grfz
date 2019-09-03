package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;

public class KHGL_GWYNDKHModels extends BaseDBObject {
	
	@Required 
	@Display(Name = "姓名")
	public String USERNAME;
	public String getUSERNAME() {
		return this.USERNAME; 
		} 
	public void setUSERNAME(String value) { 
		ReportPropertyChanging("USERNAME");
		this.USERNAME = value;
		ReportPropertyChanged("USERNAME");
		} 
	
	
	@Required 
	@Display(Name = "时间")
	public String TIME;
	public String getTIME() {
		return this.TIME; 
		} 
	public void setTIME(String value) { 
		ReportPropertyChanging("TIME");
		this.TIME = value;
		ReportPropertyChanged("TIME");
		} 
	
	@Required 
	@Display(Name = "等级评定")
	public String GRADE;
	public String getGRADE() {
		return this.GRADE; 
		} 
	public void setGRADE(String value) { 
		ReportPropertyChanging("GRADE");
		this.GRADE = value;
		ReportPropertyChanged("GRADE");
		} 
}
