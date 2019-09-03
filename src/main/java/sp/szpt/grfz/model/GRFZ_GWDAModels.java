package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Key;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_GWDAModels extends BaseDBObject{
	
	@Key 
	@Required 
	public String GWDABH;
	public String getGWDABH() {
		return this.GWDABH; 
		} 
	public void setGWDABH(String value) { 
		ReportPropertyChanging("GWDABH");
		this.GWDABH = value;
		ReportPropertyChanged("GWDABH");
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
	@Display(Name = "岗位类别")
	public String GWLB;
	public String getGWLB() {
		return this.GWLB;
	}
	public void setGWLB(String value) {
		ReportPropertyChanging("GWLB");
		this.GWLB = value;
		ReportPropertyChanged("GWLB");
	}

	@Required
	@StringLength(length = 26)
	@Display(Name = "责任区")
	public String ZRQ;
	public String getZRQ() {
		return this.ZRQ;
	}
	public void setZRQ(String value) {
		ReportPropertyChanging("ZRQ");
		this.ZRQ = value;
		ReportPropertyChanged("ZRQ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "实际岗位名称")
	public String SJGWMC;
	public String getSJGWMC() {
		return this.SJGWMC;
	}
	public void setSJGWMC(String value) {
		ReportPropertyChanging("SJGWMC");
		this.SJGWMC = value;
		ReportPropertyChanged("SJGWMC");
	}
	 
	@Required
	@StringLength(length = 26)
	@Display(Name = "系统内岗位名称")
	public String XTNGWMC;
	public String getXTNGWMC() {
		return this.XTNGWMC;
	}
	public void setXTNGWMC(String value) {
		ReportPropertyChanging("XTNGWMC");
		this.XTNGWMC = value;
		ReportPropertyChanged("XTNGWMC");
	}
 
	@Required
	@StringLength(length = 26)
	@Display(Name = "年度成绩排名情况")
	public String NDCJPMQK;
	public String getNDCJPMQK() {
		return this.NDCJPMQK;
	}
	public void setNDCJPMQK(String value) {
		ReportPropertyChanging("NDCJPMQK");
		this.NDCJPMQK = value;
		ReportPropertyChanged("NDCJPMQK");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "起始时间")
	public String QSSJ;
	public String getQSSJ() {
		return this.QSSJ;
	}
	public void setQSSJ(String value) {
		ReportPropertyChanging("QSSJ");
		this.QSSJ = value;
		ReportPropertyChanged("QSSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "截止时间")
	public String JZSJ;
	public String getJZSJ() {
		return this.JZSJ;
	}
	public void setJZSJ(String value) {
		ReportPropertyChanging("JZSJ");
		this.JZSJ = value;
		ReportPropertyChanged("JZSJ");
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
