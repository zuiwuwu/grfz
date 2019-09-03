package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;

public class KHGL_BMEJKHModels extends BaseDBObject {
	
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
	@Display(Name = "部门")
	public String DEPTNAME;
	public String getDEPTNAME() {
		return this.DEPTNAME; 
		} 
	public void setDEPTNAME(String value) { 
		ReportPropertyChanging("DEPTNAME");
		this.DEPTNAME = value;
		ReportPropertyChanged("DEPTNAME");
		} 
	
	@Required 
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
	@Display(Name = "成绩")
	public Integer SCORE;
	public Integer getSCORE() {
		return this.SCORE; 
		} 
	public void setSCORE(Integer value) { 
		ReportPropertyChanging("SCORE");
		this.SCORE = value;
		ReportPropertyChanged("SCORE");
		} 
	
	
	@Required 
	@Display(Name = "等级")
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
