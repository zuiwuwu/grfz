package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class PXGLDB {
	 private IDbHelper dbHelper ;
		private  static String  pxxxsql="INSERT INTO GRFZ_PXDA(XM,SJ,DD,PXMC,PXNR,PXDW,PXTS,PXWCQK,PXCJ,SFYZS,ZSMC,BFJG,JH)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		public PXGLDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		public Object getPXGLLists(PXXXSerachInfo PXXXSerachInfo){
			return dbHelper.QuerySPList("GRFZ_PXDA",PXXXSerachInfo);
			
	    }
		
		public SPJsonResult exportPXGLXX(GRFZ_PXDAModels PXGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(pxxxsql,
	 			PXGLModels.getXM(),
	 			PXGLModels.getSJ(),
	 			PXGLModels.getDD(),
	 			PXGLModels.getPXMC(),
	 			PXGLModels.getPXNR(),
	 			PXGLModels.getPXDW(),
	 			PXGLModels.getPXTS(),
	 			PXGLModels.getPXWCQK(),
	 			PXGLModels.getPXCJ(),
	 			PXGLModels.getSFYZS(),
	 			PXGLModels.getZSMC(),
	 			PXGLModels.getBFJG(),
	 			PXGLModels.getJH()
	 					
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
		
		public SPJsonResult  deletePXXX(String PXDABH){
			SPJsonResult spresult= new SPJsonResult();
			int i=dbHelper.update("delete from GRFZ_PXDA where PXDABH=?",PXDABH);
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
		
		public SPJsonResult importPXXX(GRFZ_PXDAModels GRFZ_PXDAModels){
	    	 SPJsonResult SPJsonResult=new SPJsonResult();
	    	if( dbHelper.CommonAdd(GRFZ_PXDAModels)>0){
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加成功";
	    	}else{
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加失败";
	    	}
	    	return SPJsonResult;
	     }
		
		 public SPJsonResult editPXXX(GRFZ_PXDAModels GRFZ_PXDAModels){
		   	  SPJsonResult SPJsonResult=new SPJsonResult();
		     	if( dbHelper.CommonUpdate(GRFZ_PXDAModels)>0){
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑成功";
		     	}else{
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑失败";
		     	}
		     	return SPJsonResult;
		     }
		 
		 public Object getPXXXdetail(String PXDABH){
				return dbHelper.queryForList("select * from grfz_pxda  where PXDABH=?",PXDABH);
			}
}
