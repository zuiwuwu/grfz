package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.Display;
import sp.szpt.common.db.Required;
import sp.szpt.common.db.StringLength;

public class JXGLModels extends BaseDBObject {

		@Required
		@StringLength(length = 26)
		@Display(Name = "案件名称")
		public String AJMC;
		public String getAJMC() {
			return this.AJMC;
		}
		public void setAJMC(String value) {
			ReportPropertyChanging("AJMC");
			this.AJMC = value;
			ReportPropertyChanged("AJMC");
		}

		@Required
		@StringLength(length = 15)
		@Display(Name = "嫌疑人姓名")
		public String XYRXM;
		public String getXYRXM() {
			return this.XYRXM;
		}
		public void setXYRXM(String value) {
			ReportPropertyChanging("XYRXM");
			this.XYRXM = value;
			ReportPropertyChanged("XYRXM");
		}
		@StringLength(length = 1)
		@Display(Name = "案件类别")
		public String AJLB;
		public String getAJLB() {
			return this.AJLB;
		}
		public void setAJLB(String value) {
			ReportPropertyChanging("AJLB");
			this.AJLB = value;
			ReportPropertyChanged("AJLB");
		}

		
		
		@StringLength(length = 1)
		@Display(Name = "办案单位")
		public String BADW;
		public String getBADW() {
			return this.BADW;
		}
		public void setBADW(String value) {
			ReportPropertyChanging("BADW");
			this.BADW = value;
			ReportPropertyChanged("BADW");
		}
		@StringLength(length = 1)
		@Display(Name = "主办民警")
		public String ZBMJ;
		public String getZBMJ() {
			return this.ZBMJ;
		}
		public void setZBMJ(String value) {
			ReportPropertyChanging("ZBMJ");
			this.ZBMJ = value;
			ReportPropertyChanged("ZBMJ");
		}
		
		@StringLength(length = 1)
		@Display(Name = "主办民警质效分")
		public float ZBMJZXF;
		public float getZBMJZXF() {
			return this.ZBMJZXF;
		}
		public void setZBMJZXF(float value) {
			ReportPropertyChanging("ZBMJZXF");
			this.ZBMJZXF = value;
			ReportPropertyChanged("ZBMJZXF");
		}
		
		@StringLength(length = 1)
		@Display(Name = "协办民警")
		public String XBMJ;
		public String getXBMJ() {
			return this.XBMJ;
		}
		public void setXBMJ(String value) {
			ReportPropertyChanging("XBMJ");
			this.XBMJ = value;
			ReportPropertyChanged("XBMJ");
		}
		@StringLength(length = 1)
		@Display(Name = "协办民警质效分")
		public float XBMJZXF;
		public float getXBMJZXF() {
			return this.XBMJZXF;
		}
		public void setXBMJZXF(float value) {
			ReportPropertyChanging("XBMJZXF");
			this.XBMJZXF = value;
			ReportPropertyChanged("XBMJZXF");
		}
		
		
		
		@StringLength(length = 1)
		@Display(Name = "抓捕人员")
		public String ZBRY;
		public String getZBRY() {
			return this.ZBRY;
		}
		public void setZBRY(String value) {
			ReportPropertyChanging("ZBRY");
			this.ZBRY = value;
			ReportPropertyChanged("ZBRY");
		}
		@StringLength(length = 1)
		@Display(Name = "审讯人员")
		public String SXRY;
		public String getSXRY() {
			return this.SXRY;
		}
		public void setSXRY(String value) {
			ReportPropertyChanging("SXRY");
			this.SXRY = value;
			ReportPropertyChanged("SXRY");
		}
		
		@StringLength(length = 1)
		@Display(Name = "办结时间")
		public String JASJ;
		public String getJASJ() {
			return this.JASJ;
		}
		public void setJASJ(String value) {
			ReportPropertyChanging("JASJ");
			this.JASJ = value;
			ReportPropertyChanged("JASJ");
		}
		
		
		@StringLength(length = 1)
		@Display(Name = "统计时间")
		public String TJSJ;
		public String getTJSJ() {
			return this.TJSJ;
		}
		public void setTJSJ(String value) {
			ReportPropertyChanging("TJSJ");
			this.TJSJ = value;
			ReportPropertyChanged("TJSJ");
		}
		
		@StringLength(length = 1)
		@Display(Name = "质量分值")
		public float ZLFZ;
		public float getZLFZ() {
			return this.ZLFZ;
		}
		public void setZLFZ(float value) {
			ReportPropertyChanging("ZLFZ");
			this.ZLFZ = value;
			ReportPropertyChanged("ZLFZ");
		}
		
		@StringLength(length = 1)
		@Display(Name = "案件办理积分")
		public float AJBLJF;
		public float getAJBLJF() {
			return this.AJBLJF;
		}
		public void setAJBLJF(float value) {
			ReportPropertyChanging("AJBLJF");
			this.AJBLJF = value;
			ReportPropertyChanged("AJBLJF");
		}
		
		@StringLength(length = 1)
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
		
		@StringLength(length = 1)
		@Display(Name = "案件副案别")
		public String AJFLB;
		public String getAJFLB() {
			return this.AJFLB;
		}
		public void setAJFLB(String value) {
			ReportPropertyChanging("AJFLB");
			this.AJFLB = value;
			ReportPropertyChanged("AJFLB");
		}
}
