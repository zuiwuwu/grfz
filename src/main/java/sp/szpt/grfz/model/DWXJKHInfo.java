package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class DWXJKHInfo extends SPExtSearchInfo{

	
	public String USERNAME;
	public String USERGRADE;

	public  String ToString(){
		 StringBuilder strOther = new StringBuilder(200);
    if (!string.IsNullOrEmpty(USERNAME)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.DWNAME ='%s'", USERNAME));
    }
    
    if (!string.IsNullOrEmpty(USERGRADE)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.RANK ='%s'", USERGRADE));
    }
        return strOther.toString(); 
	}
	
	
	
	
}
