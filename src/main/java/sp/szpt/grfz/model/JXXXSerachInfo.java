package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class JXXXSerachInfo extends SPExtSearchInfo {
	public String ZBMJ;

	public  String ToString(){
		 StringBuilder strOther = new StringBuilder(200);
    if (!string.IsNullOrEmpty(ZBMJ)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.ZBMJ ='%s'", ZBMJ));
    }
        return strOther.toString(); 
	}
}
