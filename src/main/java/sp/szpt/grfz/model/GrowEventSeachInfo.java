package sp.szpt.grfz.model;

import org.springframework.util.StringUtils;


import sp.szpt.common.SPExtSearchInfoNew;

public class GrowEventSeachInfo extends SPExtSearchInfoNew{

	
public String fuzzy;
public String EVENTTYPE;
	
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
					String buffer = String.format("(EVENTNAME LIKE '%s' "
							+ "OR EVENTTYPE LIKE '%s' )", filter, filter);
					this.AddCondition(buffer);
							
				}
			}
		}
		
		if(!StringUtils.isEmpty(EVENTTYPE))
		{
			
			if(EVENTTYPE.equals("所有事件")){
				String buffer = String.format("(GROWID is not null)"); ;
//				String buffer = String.format("(EVENTTYPE = '%s')", EVENTTYPE);
				this.AddCondition(buffer);
			}else{
				String buffer = String.format("(EVENTTYPE = '%s')", EVENTTYPE);
				this.AddCondition(buffer);
			}
					
							
				
			
		}
		
		
	}
	
	
	
	
	
	
}
