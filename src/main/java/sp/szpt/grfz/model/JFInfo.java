package sp.szpt.grfz.model;

import org.springframework.util.StringUtils;



import sp.szpt.common.SPExtSearchInfoNew;




public class JFInfo extends SPExtSearchInfoNew{

public String fuzzy;
public String fuzzys;
	
	@Override
	protected void onAnalyzeCondition() {
		// TODO Auto-generated method stub
		if(!StringUtils.isEmpty(fuzzy))
		{
			String[] arrayStrings = fuzzy.split(" ");
			for (int i = 0; i < arrayStrings.length; i++) {
				if(!StringUtils.isEmpty(arrayStrings[i].trim()))
				{
					String filter = String.format("%%%s%%", arrayStrings[i]);
					String buffer = String.format("(USERNAME LIKE '%s' "
							+ "OR NAME LIKE '%s' )" , filter, filter);
					this.AddCondition(buffer);
							
				}
			}
		}		
		
	
	
	if(!StringUtils.isEmpty(fuzzys))
	{
		String[] arrayStrings = fuzzys.split(" ");
		for (int i = 0; i < arrayStrings.length; i++) {
			if(!StringUtils.isEmpty(arrayStrings[i].trim()))
			{
				String filter = String.format("%%%s%%", arrayStrings[i]);
				String buffer = String.format("(EVENTNAME LIKE '%s' "
						+ "OR USERNAME LIKE '%s' )" , filter, filter);
				this.AddCondition(buffer);
						
			}
		}
	}		
	
}
}
	
	

