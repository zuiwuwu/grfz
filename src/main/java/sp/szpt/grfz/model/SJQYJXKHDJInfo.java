package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class SJQYJXKHDJInfo extends SPExtSearchInfo{

	
	public String USERNAME;
	public String USERGRADE;

	public  String ToString(){
		 StringBuilder strOther = new StringBuilder(200);
    if (!string.IsNullOrEmpty(USERNAME)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.USERNAME ='%s'", USERNAME));
    }
    
    if (!string.IsNullOrEmpty(USERGRADE)){
        if (strOther.length() != 0)
            strOther.append(" AND ");
        strOther.append(String.format(" T.GRADE ='%s'", USERGRADE));
    }
        return strOther.toString(); 
	}
	
	
	
	
}
