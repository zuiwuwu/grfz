package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;

public class KHGL_QYYKHModels extends BaseDBObject {
	
	@Required 
	@Display(Name = "单位名称")
	public String DWNAME;
	public String getDWNAME() {
		return this.DWNAME; 
		} 
	public void setDWNAME(String value) { 
		ReportPropertyChanging("DWNAME");
		this.DWNAME = value;
		ReportPropertyChanged("DWNAME");
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
	@Display(Name = "排名等级")
	public String RANK;
	public String getRANK() {
		return this.RANK; 
		} 
	public void setRANK(String value) { 
		ReportPropertyChanging("RANK");
		this.RANK = value;
		ReportPropertyChanged("RANK");
		} 
}
