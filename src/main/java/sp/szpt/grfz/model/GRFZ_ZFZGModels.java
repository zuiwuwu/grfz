package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class GRFZ_ZFZGModels extends BaseDBObject {
	
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
	@Display(Name = "职务名称")
	public String ZWMC;
	public String getZWMC() {
		return this.ZWMC;
	}
	public void setZWMC(String value) {
		ReportPropertyChanging("ZWMC");
		this.ZWMC = value;
		ReportPropertyChanged("ZWMC");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "证书级别")
	public String ZSJB;
	public String getZSJB() {
		return this.ZSJB;
	}
	public void setZSJB(String value) {
		ReportPropertyChanging("ZSJB");
		this.ZSJB = value;
		ReportPropertyChanged("ZSJB");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "过期时间")
	public String GQSJ;
	public String getGQSJ() {
		return this.GQSJ;
	}
	public void setGQSJ(String value) {
		ReportPropertyChanging("GQSJ");
		this.GQSJ = value;
		ReportPropertyChanged("GQSJ");
	}
	
	@Required
	@StringLength(length = 26)
	@Display(Name = "是否过期")
	public String SFGQ;
	public String getSFGQ() {
		return this.SFGQ;
	}
	public void setSFGQ(String value) {
		ReportPropertyChanging("SFGQ");
		this.SFGQ = value;
		ReportPropertyChanged("SFGQ");
	}
}
