package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_AHTCDAModels extends BaseDBObject {
	
	@Key 
	@Required 
	public String AHTCDABH;
	public String getAHTCDABH() {
		return this.AHTCDABH; 
		} 
	public void setAHTCDABH(String value) { 
		ReportPropertyChanging("AHTCDABH");
		this.AHTCDABH = value;
		ReportPropertyChanged("AHTCDABH");
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
	@Display(Name = "爱好")
	public String AH;
	public String getAH() {
		return this.AH;
	}
	public void setAH(String value) {
		ReportPropertyChanging("AH");
		this.AH = value;
		ReportPropertyChanged("AH");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "参加社团")
	public String CJST;
	public String getCJST() {
		return this.CJST;
	}
	public void setCJST(String value) {
		ReportPropertyChanging("CJST");
		this.CJST = value;
		ReportPropertyChanged("CJST");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "特长")
	public String TC;
	public String getTC() {
		return this.TC;
	}
	public void setTC(String value) {
		ReportPropertyChanging("TC");
		this.TC = value;
		ReportPropertyChanged("TC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "获得证书时间")
	public String HDZSSJ;
	public String getHDZSSJ() {
		return this.HDZSSJ;
	}
	public void setHDZSSJ(String value) {
		ReportPropertyChanging("HDZSSJ");
		this.HDZSSJ = value;
		ReportPropertyChanged("HDZSSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "获得证书类别")
	public String HDZSLB;
	public String getHDZSLB() {
		return this.HDZSLB;
	}
	public void setHDZSLB(String value) {
		ReportPropertyChanging("HDZSLB");
		this.HDZSLB = value;
		ReportPropertyChanged("HDZSLB");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "发证单位")
	public String FZDW;
	public String getFZDW() {
		return this.FZDW;
	}
	public void setFZDW(String value) {
		ReportPropertyChanging("FZDW");
		this.FZDW = value;
		ReportPropertyChanged("FZDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "比赛获奖时间")
	public String BSHJSJ;
	public String getBSHJSJ() {
		return this.BSHJSJ;
	}
	public void setBSHJSJ(String value) {
		ReportPropertyChanging("BSHJSJ");
		this.BSHJSJ = value;
		ReportPropertyChanged("BSHJSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "比赛名称")
	public String BSMC;
	public String getBSMC() {
		return this.BSMC;
	}
	public void setBSMC(String value) {
		ReportPropertyChanging("BSMC");
		this.BSMC = value;
		ReportPropertyChanged("BSMC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "举办单位")
	public String JBDW;
	public String getJBDW() {
		return this.JBDW;
	}
	public void setJBDW(String value) {
		ReportPropertyChanging("JBDW");
		this.JBDW = value;
		ReportPropertyChanged("JBDW");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "获奖情况")
	public String HJQK;
	public String getHJQK() {
		return this.HJQK;
	}
	public void setHJQK(String value) {
		ReportPropertyChanging("HJQK");
		this.HJQK = value;
		ReportPropertyChanged("HJQK");
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
