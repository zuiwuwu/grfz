package sp.szpt.grfz.model;

import org.springframework.util.StringUtils;

import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.SPExtSearchInfoNew;

public class JFPMSearchInfo extends SPExtSearchInfo{

public String YEAR;
public String YEAR1;
public String NAME;
public String DEPT;
public String EVENT;
public String DIMENSIONALITY;
public String JYSX;
public String DECIDE;

public  String ToString(){
	StringBuilder strOther = new StringBuilder(200);
	if (!StringUtils.isEmpty(YEAR)){
		System.out.println(YEAR);
			if (strOther.length() > 0)
				strOther.append(" AND ");
			strOther.append(String.format(" T.YEAR like '%%%s%%'", YEAR));
	 }
	if (!StringUtils.isEmpty(YEAR1)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.xzjbname like '%%%s%%'", YEAR1));
	}
	if (!StringUtils.isEmpty(NAME)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.XM like '%s'", NAME));
	}
	if (!StringUtils.isEmpty(DEPT)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.DBM like '%s'", DEPT));
	}
	if (!StringUtils.isEmpty(EVENT)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.EVENTNAME like '%%%s%%'", EVENT));
	}
	if (!StringUtils.isEmpty(DIMENSIONALITY)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.NAME like '%%%s%%'", DIMENSIONALITY));
	}
	if (!StringUtils.isEmpty(JYSX)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.JZ like '%%%s%%'", JYSX));
	}
	if (!StringUtils.isEmpty(DECIDE)){
		if (strOther.length() > 0)
			strOther.append(" AND ");
		strOther.append(String.format(" T.ms like '%%%s%%'", DECIDE));
	}
	return strOther.toString();
}



















	/*@Override
	protected void onAnalyzeCondition() {
		// TODO Auto-generated method stub
		if(!StringUtils.isEmpty(fuzzy))
		{
			String[] arrayStrings = fuzzy.split(" ");
			for (int i = 0; i < arrayStrings.length; i++) {
				if(!StringUtils.isEmpty(arrayStrings[i].trim()))
				{
					String filter = String.format("%%%s%%", arrayStrings[i]);
					String buffer = String.format("(NAME LIKE '%s' "
							+ "OR DESCRIBE LIKE '%s' "
							+ "OR UPDATEMAN LIKE '%s' " 
							+ "OR CREATETIEM LIKE '%s' " 
							+ "OR UPDATETIME LIKE '%s' )" , filter, filter,filter,filter,filter);
					this.AddCondition(buffer);
							
				}
			}
		}
		
		
		
		
	}*/
	
	


	
	
}
