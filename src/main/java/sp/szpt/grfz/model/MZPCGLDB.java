package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class MZPCGLDB {
	 private IDbHelper dbHelper ;
		private  static String  mzpcxxsql="INSERT INTO GRFZ_MZPCDA(XM,ND,SZDW,CPQK,JH)VALUES(?,?,?,?,?)";
		public MZPCGLDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		public Object getMZPCGLLists(MZPCSearchInfo MZPCSearchInfo){
			return dbHelper.QuerySPList("select * from GRFZ_MZPCDA",MZPCSearchInfo);
			
	    }
		public SPJsonResult exportMZPCGLXX(GRFZ_MZPCDAModels MZPCGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(mzpcxxsql,
	 			MZPCGLModels.getXM(),
	 			MZPCGLModels.getND(),
	 			MZPCGLModels.getSZDW(),
	 			MZPCGLModels.getCPQK(),
	 			MZPCGLModels.getJH()
	 						
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
		
		public SPJsonResult  deleteMZPCXX(String MZPCDABH){
			SPJsonResult spresult= new SPJsonResult();
			int i=dbHelper.update("delete from GRFZ_MZPCDA where MZPCDABH=?",MZPCDABH);
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
		
		public SPJsonResult importMZXX(GRFZ_MZPCDAModels GRFZ_MZPCDAModels){
	    	 SPJsonResult SPJsonResult=new SPJsonResult();
	    	if( dbHelper.CommonAdd(GRFZ_MZPCDAModels)>0){
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加成功";
	    	}else{
	    		SPJsonResult.success=true;
	    		SPJsonResult.msg="添加失败";
	    	}
	    	return SPJsonResult;
	     }
		
		public SPJsonResult editMZXX(GRFZ_MZPCDAModels GRFZ_MZPCDAModels){
		   	  SPJsonResult SPJsonResult=new SPJsonResult();
		     	if( dbHelper.CommonUpdate(GRFZ_MZPCDAModels)>0){
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑成功";
		     	}else{
		     		SPJsonResult.success=true;
		     		SPJsonResult.msg="编辑失败";
		     	}
		     	return SPJsonResult;
		     }
		 
		 public Object getMZXXdetail(String MZPCDABH){
				return dbHelper.queryForList("select * from GRFZ_MZPCDA  where MZPCDABH=?",MZPCDABH);
			}
}
