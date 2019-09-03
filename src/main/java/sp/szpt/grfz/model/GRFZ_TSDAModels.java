package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_TSDAModels extends BaseDBObject {
	
	@Key 
	@Required 
	public String TSDABH;
	public String getTSDABH() {
		return this.TSDABH; 
		} 
	public void setTSDABH(String value) { 
		ReportPropertyChanging("TSDABH");
		this.TSDABH = value;
		ReportPropertyChanged("TSDABH");
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
	@Display(Name = "被投诉时间")
	public String BTSSJ;
	public String getBTSSJ() {
		return this.BTSSJ;
	}
	public void setBTSSJ(String value) {
		ReportPropertyChanging("BTSSJ");
		this.BTSSJ = value;
		ReportPropertyChanged("BTSSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "类型")
	public String LX;
	public String getLX() {
		return this.LX;
	}
	public void setLX(String value) {
		ReportPropertyChanging("LX");
		this.LX = value;
		ReportPropertyChanged("LX");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "内容")
	public String NR;
	public String getNR() {
		return this.NR;
	}
	public void setNR(String value) {
		ReportPropertyChanging("NR");
		this.NR = value;
		ReportPropertyChanged("NR");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "是否属实")
	public String SFSS;
	public String getSFSS() {
		return this.SFSS;
	}
	public void setSFSS(String value) {
		ReportPropertyChanging("SFSS");
		this.SFSS = value;
		ReportPropertyChanged("SFSS");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "查证情况")
	public String CZQK;
	public String getCZQK() {
		return this.CZQK;
	}
	public void setCZQK(String value) {
		ReportPropertyChanging("CZQK");
		this.CZQK = value;
		ReportPropertyChanged("CZQK");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "文件资料")
	public String WJZL;
	public String getWJZL() {
		return this.WJZL;
	}
	public void setWJZL(String value) {
		ReportPropertyChanging("WJZL");
		this.WJZL = value;
		ReportPropertyChanged("WJZL");
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
