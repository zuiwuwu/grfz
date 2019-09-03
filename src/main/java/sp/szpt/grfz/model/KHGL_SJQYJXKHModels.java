package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;

public class KHGL_SJQYJXKHModels extends BaseDBObject {
	
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
	@Display(Name = "排名")
	public Integer RANK;
	public Integer getRANK() {
		return this.RANK; 
		} 
	public void setYEAR(Integer value) { 
		ReportPropertyChanging("RANK");
		this.RANK = value;
		ReportPropertyChanged("RANK");
		} 
	
	
	@Required 
	@Display(Name = "等次")
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
