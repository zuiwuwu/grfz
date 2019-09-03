package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class QTJKFXXSearchInfo  extends SPExtSearchInfo{
	public String XM;

	public  String ToString(){
		 StringBuilder strOther = new StringBuilder(200);
    if (!string.IsNullOrEmpty(XM)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.XM ='%s'", XM));
    }
        return strOther.toString(); 
	}
}
