package sp.szpt.grfz.model;

import org.springframework.util.StringUtils;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.string;

public class JBXXSearchInfo extends SPExtSearchInfo{
	
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
