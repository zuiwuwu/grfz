package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_JCDAModels extends BaseDBObject {
	
	@Key 
	@Required 
	public String JCDABH;
	public String getJCDABH() {
		return this.JCDABH; 
		} 
	public void setJCDABH(String value) { 
		ReportPropertyChanging("JCDABH");
		this.JCDABH = value;
		ReportPropertyChanged("JCDABH");
		} 
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "个人或单位")
	public String GRHDW;
	public String getGRHDW() {
		return this.GRHDW;
	}
	public void setGRHDW(String value) {
		ReportPropertyChanging("GRHDW");
		this.GRHDW = value;
		ReportPropertyChanged("GRHDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "所属单位")
	public String SSDW;
	public String getSSDW() {
		return this.GRHDW;
	}
	public void setSSDW(String value) {
		ReportPropertyChanging("SSDW");
		this.SSDW = value;
		ReportPropertyChanged("SSDW");
	}

	@Required
	@StringLength(length = 26)
	@Display(Name = "奖励名称")
	public String JLMC;
	public String getJLMC() {
		return this.JLMC;
	}
	public void setJLMC(String value) {
		ReportPropertyChanging("JLMC");		
		this.JLMC = value;
		ReportPropertyChanged("JLMC");
	}
	@Required
	@StringLength(length = 26)
	@Display(Name = "惩罚名称")
	public String CFMC;
	public String getCFMC() {
		return this.CFMC;
	}
	public void setCFMC(String value) {
		ReportPropertyChanging("CFMC");
		this.CFMC = value;
		ReportPropertyChanged("CFMC");
	}
	@Required
	@StringLength(length = 26)
	@Display(Name = "奖惩时间")
	public String JCSJ;
	public String getJCSJ() {
		return this.JCSJ;
	}
	public void setJCSJ(String value) {
		
		ReportPropertyChanging("JCSJ");
		String d = value;
        if (value.indexOf("/") > 0) {
            d = value.replace("/", "-");
        }
        System.out.println(d);
		this.JCSJ = d;
		ReportPropertyChanged("JCSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "受奖惩时职务")
	public String SJCSZW;
	public String getSJCSZW() {
		return this.SJCSZW;
	}
	public void setSJCSZW(String value) {
		ReportPropertyChanging("SJCSZW");
		this.SJCSZW = value;
		ReportPropertyChanged("SJCSZW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "奖惩原因")
	public String JCYY;
	public String getJCYY() {
		return this.JCYY;
	}
	public void setJCYY(String value) {
		ReportPropertyChanging("JCYY");
		this.JCYY = value;
		ReportPropertyChanged("JCYY");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "批准机关名称")
	public String PZJGMC;
	public String getPZJGMC() {
		return this.PZJGMC;
	}
	public void setPZJGMC(String value) {
		ReportPropertyChanging("PZJGMC");
		this.PZJGMC = value;
		ReportPropertyChanged("PZJGMC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "文件证明")
	public String WJZM;
	public String getWJZM() {
		return this.WJZM;
	}
	public void setWJZM(String value) {
		ReportPropertyChanging("WJZM");
		this.WJZM = value;
		ReportPropertyChanged("WJZM");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "附件路径")
	public String FILEURL;
	public String getFILEURL() {
		return this.FILEURL;
	}
	public void setFILEURL(String value) {
		ReportPropertyChanging("FILEURL");
		this.FILEURL = value;
		ReportPropertyChanged("FILEURL");
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
