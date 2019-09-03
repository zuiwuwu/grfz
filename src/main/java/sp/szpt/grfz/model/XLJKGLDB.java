package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class XLJKGLDB {
	    private IDbHelper dbHelper ;
		private  static String  xljkxxsql="INSERT INTO GRFZ_XLJKDA(XM,ZZDW,CSSJ,CSXM,CJ,PJ,FDLS,FDSJ,JH)VALUES(?,?,?,?,?,?,?,?,?)";
		
		public XLJKGLDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		
		public Object getXLJKGLLists(XLJKXXSerachInfo xljkxxSerachInfo){
			return dbHelper.QuerySPList("select * from GRFZ_XLJKDA",xljkxxSerachInfo);			
	    }
		
		public SPJsonResult exportXLJKGLXX(GRFZ_XLJKDAModels XLJKGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(xljkxxsql,
	 			XLJKGLModels.getXM(),
	 			XLJKGLModels.getZZDW(),
	 			XLJKGLModels.getCSSJ(),
	 			XLJKGLModels.getCSXM(),
	 			XLJKGLModels.getCJ(),
	 			XLJKGLModels.getPJ(),
	 			XLJKGLModels.getFDLS(),
	 			XLJKGLModels.getFDSJ(),
	 			XLJKGLModels.getJH()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
		
		public SPJsonResult  deleteXLJKXX(String XLJKDABH){
			SPJsonResult spresult= new SPJsonResult();
			int i=dbHelper.update("delete from GRFZ_XLJKDA where XLJKDABH=?",XLJKDABH);
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
		
		public SPJsonResult importJKXX(GRFZ_XLJKDAModels GRFZ_XLJKDAModels){
	    	 SPJsonResult SPJsonResult=new SPJsonResult();
	    	if( dbHelper.CommonAdd(GRFZ_XLJKDAModels)>0){
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加成功";
	    	}else{
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加失败";
	    	}
	    	return SPJsonResult;
	     }
		
		 public SPJsonResult editJKXX(GRFZ_XLJKDAModels GRFZ_XLJKDAModels){
		   	  SPJsonResult SPJsonResult=new SPJsonResult();
		     	if( dbHelper.CommonUpdate(GRFZ_XLJKDAModels)>0){
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑成功";
		     	}else{
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑失败";
		     	}
		     	return SPJsonResult;
		     }
		 
		 public Object getJKXXdetail(String XLJKDABH){
				return dbHelper.queryForList("select * from GRFZ_XLJKDA  where XLJKDABH=?",XLJKDABH);
			}
}
