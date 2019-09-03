package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class GWGLDB {
	    private IDbHelper dbHelper ;
		private  static String  gwxxsql="INSERT INTO GRFZ_GWDA(XM,GWLB,ZRQ,SJGWMC,XTNGWMC,NDCJPMQK,QSSJ,JZSJ,JH)VALUES(?,?,?,?,?,?,?,?,?)";
		public GWGLDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		
		public Object getGWGLLists(GWXXSearchInfo GWXXSearchInfo){
			
			return dbHelper.QuerySPList("GRFZ_GWDA",GWXXSearchInfo);
	    }
		
		public SPJsonResult importGWXX(GRFZ_GWDAModels GWGLModels){
	    	 SPJsonResult SPJsonResult=new SPJsonResult();
	    	if( dbHelper.CommonAdd(GWGLModels)>0){
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加成功";
	    	}else{
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加失败";
	    	}
	    	return SPJsonResult;
	     }
		
		public SPJsonResult exportGWGLXX(GRFZ_GWDAModels GWGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(gwxxsql, 
	 			GWGLModels.getXM(),
	 			GWGLModels.getGWLB(),
	 			GWGLModels.getZRQ(),
	 			GWGLModels.getSJGWMC(),
	 			GWGLModels.getXTNGWMC(),
	 			GWGLModels.getNDCJPMQK(),
	 			GWGLModels.getQSSJ(),
	 			GWGLModels.getJZSJ(),
	 			GWGLModels.getJH() 			
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
		
		public SPJsonResult  deleteGWXX(String GWDABH){
			SPJsonResult spresult= new SPJsonResult();
			int i=dbHelper.update("delete from GRFZ_GWDA where GWDABH=?",GWDABH);
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
		
		 public SPJsonResult editGWXX(GRFZ_GWDAModels GRFZ_GWDAModels){
		   	  SPJsonResult SPJsonResult=new SPJsonResult();
		     	if( dbHelper.CommonUpdate(GRFZ_GWDAModels)>0){
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑成功";
		     	}else{
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑失败";
		     	}
		     	return SPJsonResult;
		     }
		 
		 public Object getGWXXdetail(String GWDABH){
				return dbHelper.queryForList("select * from grfz_gwda  where GWDABH=?",GWDABH);
			}
}
