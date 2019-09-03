package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class XQAHGLDB {
	
	
	    private IDbHelper dbHelper ;
		
	    private  static String  xqahxxsql="INSERT INTO GRFZ_AHTCDA(XM,AH,CJST,TC,HDZSSJ,HDZSLB,FZDW,BSHJSJ,BSMC,JBDW,HJQK,JH)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";		
		
	    public XQAHGLDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		
		public Object getXQAHGLLists(XQAHSearchInfo XQAHSearchInfo){
			//return dbHelper.queryForList("select * from GRFZ_AHTCDA",XQAHSearchInfo);
			return dbHelper.QuerySPList("GRFZ_AHTCDA",XQAHSearchInfo);
	    }
		
		public SPJsonResult exportXQAHGLXX(GRFZ_AHTCDAModels XQAHGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(xqahxxsql,
	 			XQAHGLModels.getXM(),
	 			XQAHGLModels.getAH(),
	 			XQAHGLModels.getCJST(),
	 			XQAHGLModels.getTC(),
	 			XQAHGLModels.getHDZSSJ(),
	 			XQAHGLModels.getHDZSLB(),
	 			XQAHGLModels.getFZDW(),
	 			XQAHGLModels.getBSHJSJ(),
	 			XQAHGLModels.getBSMC(),
	 			XQAHGLModels.getJBDW(),
	 			XQAHGLModels.getHJQK(),
	 			XQAHGLModels.getJH()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
		
		public SPJsonResult  deleteXQAHXX(String AHTCDABH){
			SPJsonResult spresult= new SPJsonResult();
			int i=dbHelper.update("delete from GRFZ_AHTCDA where AHTCDABH=?",AHTCDABH);
			if(i>0){
				spresult.success=true;
				spresult.msg="删除成功";
			}
			else{
				spresult.success=false;
				spresult.msg="删除失败";
			}
			return spresult;
		}
		
		public SPJsonResult importAHXX(GRFZ_AHTCDAModels GRFZ_AHTCDAModels){
	    	 SPJsonResult SPJsonResult=new SPJsonResult();
	    	if( dbHelper.CommonAdd(GRFZ_AHTCDAModels)>0){
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加成功";
	    	}else{
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加失败";
	    	}
	    	return SPJsonResult;
	     }
		
		public SPJsonResult editAHXX(GRFZ_AHTCDAModels GRFZ_AHTCDAModels){
		   	  SPJsonResult SPJsonResult=new SPJsonResult();
		     	if( dbHelper.CommonUpdate(GRFZ_AHTCDAModels)>0){
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑成功";
		     	}else{
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑失败";
		     	}
		     	return SPJsonResult;
		     }
		 
		 public Object getAHXXdetail(String AHTCDABH){
				return dbHelper.queryForList("select * from grfz_ahtcda  where AHTCDABH=?",AHTCDABH);
			}
}
