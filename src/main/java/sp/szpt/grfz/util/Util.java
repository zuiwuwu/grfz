package sp.szpt.grfz.util;

import java.util.HashMap;
import java.util.Map;

public class Util {
		
	   private static Map<String, SearchConditionInterface> map = new HashMap<String, SearchConditionInterface>();  
       public Util(){
    	   setmap();
       }         
	/*  public String  getsqlString (String [] testarray) {			  
	       StringBuilder conditions = new StringBuilder();
	       for(int i=0;i<testarray.length;i++){ 	    	   
	       for(int j=0;j<testarray[i].length();j ++){  
	    	 
	        	SearchConditionInterface inconditio=map.get(testarray[i].substring(0, 1+j));	        	
	        	if(inconditio !=null){        		 
	        		  conditions.append(inconditio.getCondition(testarray[i].substring(j+1,testarray[i].length())));
	        		  if(i<testarray.length-1){
	        		  conditions.append(" and ");
	        		  }
	        		break;
	        	}
	        }	        	
	       }
	       System.out.println(conditions.toString());
	       return 	conditions.toString();
	    }
	    private void setmap(){
		  map.put("年龄",new NormalConditionInterface("age"));
	      map.put("性别",new NormalConditionInterface("sex"));
	      map.put("工龄",new NormalConditionInterface("GL"));
	      map.put("身高",new NormalConditionInterface("SG"));
	  }*/
       
       
			public String getsqlString(String[] testarray) {
				StringBuilder conditions = new StringBuilder();
				for (int i = 0; i < testarray.length; i++) {
					
					String[] secondtarray = null;
					if (testarray[i].contains(":")) {
						secondtarray = testarray[i].split(":");
					} else if(testarray[i].contains("：")){
						secondtarray = testarray[i].split("：");
					}
					SearchConditionInterface inconditio = map.get(secondtarray[0]);
					System.out.println(inconditio.toString());
					System.out.println(map.get(secondtarray[0]));
					System.out.println(inconditio.getCondition(secondtarray[1]));
					if (inconditio != null) {
						conditions.append(inconditio.getCondition(secondtarray[1]));
					}
		
					if (i < testarray.length - 1) {
						conditions.append(" and ");
					}
				}
		
				System.out.println(conditions.toString());
				return conditions.toString();
			}
		
			private void setmap() {
				map.put("姓名", new NormalConditionInterface("name"));
				map.put("性别", new NormalConditionInterface("sex"));
				map.put("年龄", new NormalConditionInterface("age"));
				map.put("部门", new NormalConditionInterface("department"));
				map.put("培训名称", new NormalConditionInterface("PXMC"));
				map.put("事件名称", new NormalConditionInterface("EVENTNAME"));
				map.put("爱好", new NormalConditionInterface("AH"));
				map.put("培训地点", new NormalConditionInterface("DD"));
				map.put("比赛名称", new NormalConditionInterface("BSMC"));
				map.put("培训情况", new NormalConditionInterface("PXQK"));
				map.put("公务员年度考核成绩", new NormalConditionInterface("GWYGRADE"));
				map.put("工龄", new NormalConditionInterface("GLS"));
				map.put("健康状况", new NormalConditionInterface("JKZK"));
				map.put("岗位", new NormalConditionInterface("GW"));
				map.put("职务", new NormalConditionInterface("ZW"));
				
			}
			    	
    
    
    
	    public String  getmhsqlString (String searchtext) {	
	    	  StringBuilder conditions = new StringBuilder();
	    	  conditions.append(String.format("T.XM like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.SEX like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.NL like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.DBM like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXMC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXDW like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.DD like '%%%s%%' ",searchtext));
	    	  /*conditions.append(String.format("OR  T.GWYGRADE like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.GRADE like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.FJBMEJKHSCORE like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.DEPTNAME like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.SCORE like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.JYSX like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.XTNGWMC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.SJGWMC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.ZRQ like '%%%s%%' ",searchtext));*/
//	    	  conditions.append(String.format("OR  T.GWLB like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.CJST like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.TC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.AH like '%%%s%%' ",searchtext));
//	    	  conditions.append(String.format("OR  T.EVENTDESC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.EVENTNAME like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.BFJG like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.ZSMC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.SFYZS like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXCJ like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXWCQK like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXTS like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXNR like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.SJ like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.BSMC like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.PXWCQK like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.GWYGRADE like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.GLS like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.JKZK like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.GW like '%%%s%%' ",searchtext));
	    	  conditions.append(String.format("OR  T.ZW like '%%%s%%' ",searchtext));
	    	  
	    	
	    	  System.out.println(conditions.toString());
		       return 	conditions.toString();
		    }
}
