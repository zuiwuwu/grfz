package sp.szpt.grfz.util;



public class NormalConditionInterface implements SearchConditionInterface {

	private String  type;
	
	public NormalConditionInterface(String test){
		type=test;
	}
	@Override
	public String getCondition(String text) {
	    StringBuilder conditions = new StringBuilder();
/*		if(type.equals("age")){
		if(text.substring(0,2).equals(">=")){	
		  conditions.append(String.format("T.NL>=%s ", Integer.parseInt(text.substring(2,text.length()))));
		}
		else if(text.substring(0,4).equals("大于等于")){
		  conditions.append(String.format("T.NL>=%s ", Integer.parseInt(text.substring(4,text.length()))));
		}
		 return conditions.toString();
	    }else if(type.equals("sex")){    	
	    	if(text.substring(0,1).equals(":")||text.substring(0,1).equals("：")){	    		
	          conditions.append(String.format("T.SEX ='%s' ", text.substring(1,text.length())));          
	    	}
		}else if(type.equals("GL")){    	
	    	if(text.substring(0,1).equals("满")){	    		
		          conditions.append(String.format("T.GL >=%s", text.substring(1,text.length())));          
		    	}
		}else if(type.equals("SG")){    	
	    	if(text.substring(0,4).equals("大于等于")){	    		
		          conditions.append(String.format("T.SG >=%s", text.substring(4,text.length())));          
		    	}else if(text.substring(0,2).equals(">=")){	    		
			          conditions.append(String.format("T.SG >=%s", text.substring(2,text.length())));          
			    }else{
			    	  conditions.append(String.format("T.SG >=%s and T.SG<=%S", text.substring(0,3),text.substring(4,text.length())));          
			    }
			}*/
	    
	    if(type.equals("name")){
	    	conditions.append(String.format(" T.XM = '%s' ", text));
	    	return conditions.toString();
		} 
	    if(type.equals("sex")){
	    	conditions.append(String.format(" T.SEX = '%s' ",text));
	    	return conditions.toString();
		}
	    if(type.equals("department")){
	    	conditions.append(String.format(" T.DBM = '%s' ",text));
	    	return conditions.toString();
		} 
	    if(type.equals("PXMC")){
	    	conditions.append(String.format(" T.PXMC = '%s' ",text));
	    	return conditions.toString();
		} 
	    if(type.equals("PXDW")){
	    	conditions.append(String.format(" T.PXDW = '%s' ",text));
	    	return conditions.toString();
		} 
	    if(type.equals("age")){
	    	System.out.println(text);
	    	if(text.substring(0,2).equals("大于")){
	    		conditions.append( String.format (" T.NL > %s ",Integer.parseInt( text.substring( 2,text.length() ) ) ) );
		    	return conditions.toString();
	    	}
	    	if(text.substring(0,2).equals("小于")){
	    		conditions.append( String.format (" T.NL < %s ",Integer.parseInt( text.substring( 2,text.length() ) ) ) );
		    	return conditions.toString();
	    	}
	    	conditions.append( String.format (" T.NL = %s ",Integer.parseInt( text ) ) );
	    	return conditions.toString();
	    
		}  
	    if (type.equals("EVENTNAME")) {
			conditions.append(String .format( "T.EVENTNAME like '%%%s%%'", text));
			return conditions.toString();
		}
	    if (type.equals("AH")) {
			conditions.append(String .format( "T.AH like '%%%s%%'", text));
			return conditions.toString();
		}
	    if (type.equals("DD")) {
			conditions.append(String .format( "T.DD like '%%%s%%'", text));
			return conditions.toString();
		}
	    if (type.equals("BSMC")) {
			conditions.append(String .format( "T.BSMC = %s", text));
			return conditions.toString();
		}
	    if (type.equals("PXQK")) {
			conditions.append(String .format( "T.PXQK = %s", text));
			return conditions.toString();
		}
	    if (type.equals("GWYGRADE")) {
			conditions.append(String .format( "T.GWYGRADE = %s", text));
			return conditions.toString();
		}
	    if (type.equals("GLS")) {
	    	if(text.substring(0,2).equals("大于")){
	    		conditions.append( String.format (" T.GLS > %s ",Integer.parseInt( text.substring( 2,text.length() ) ) ) );
		    	return conditions.toString();
	    	}
	    	if(text.substring(0,2).equals("小于")){
	    		conditions.append( String.format (" T.GLS < %s ",Integer.parseInt( text.substring( 2,text.length() ) ) ) );
		    	return conditions.toString();
	    	}
			conditions.append(String .format( "T.GLS = %s", Integer.parseInt(text)));
			return conditions.toString();
		}
	    if (type.equals("JKZK")) {
			conditions.append(String .format( "T.JKZK = %s", text));
			return conditions.toString();
		}
	    if (type.equals("GW")) {
			conditions.append(String .format( "T.GW = %s", text));
			return conditions.toString();
		}
	    if (type.equals("ZW")) {
			conditions.append(String .format( "T.ZW = %s", text));
			return conditions.toString();
		}
	    
	    return conditions.toString();
	}

		
	@Override
	public boolean isValid(String text) {
		
		// TODO Auto-generated method stub
		return false;
	}
	

}
