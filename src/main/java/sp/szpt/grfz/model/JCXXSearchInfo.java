package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class JCXXSearchInfo extends SPExtSearchInfo{
	public String GRHDW;

	public  String ToString(){
		 StringBuilder strOther = new StringBuilder(200);
    if (!string.IsNullOrEmpty(GRHDW)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.GRHDW ='%s'", GRHDW));
    }
        return strOther.toString(); 
	}
}
