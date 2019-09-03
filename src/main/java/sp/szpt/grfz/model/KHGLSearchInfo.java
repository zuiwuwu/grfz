package sp.szpt.grfz.model;

import sp.szpt.common.DateTime;
import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class KHGLSearchInfo extends SPExtSearchInfo {
	public String YEAR;
	public String MONTH;
	public String DEPTNAME;
	public String JYSX;
    @Override
	public String ToString() {
		StringBuilder strOther = new StringBuilder(100);
		if (!string.IsNullOrEmpty(DEPTNAME)) {
			if (strOther.length() > 0)
				strOther.append(" AND ");
			strOther.append(String.format(
					" DEPTNAME LIKE '%%%s%%' ",
					DEPTNAME));
		}
		
		if (!string.IsNullOrEmpty(JYSX)) {
			if (strOther.length() > 0)
				strOther.append(" AND ");
			strOther.append(String.format(
					" JYSX = '%s' ",
					JYSX));
		}
		
		return strOther.toString();
	}

}
