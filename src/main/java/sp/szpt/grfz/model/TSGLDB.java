package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class TSGLDB {
	
            private IDbHelper dbHelper ;
			private  static String  tsxxsql="INSERT INTO GRFZ_TSDA(XM,BTSSJ,LX,NR,SFSS,CZQK,WJZL,JH)VALUES(?,?,?,?,?,?,?,?)";
			public TSGLDB(){
				dbHelper = DbHelperAccess.GetDbHelper();
			}
			public Object getTSGLLists(TSXXSerachInfo tsxxSerachInfo){
				return dbHelper.QuerySPList("select * from GRFZ_TSDA",tsxxSerachInfo);
				
		    }
			
			public SPJsonResult exportTSGLXX(GRFZ_TSDAModels TSGLModels ){
		 	  SPJsonResult spResult = new SPJsonResult();	
		 	 if( dbHelper.update(tsxxsql,
		 			TSGLModels.getXM(),
		 			TSGLModels.getBTSSJ(),
		 			TSGLModels.getLX(),
		 			TSGLModels.getNR(),
		 			TSGLModels.getSFSS(),
		 			TSGLModels.getCZQK(),
		 			TSGLModels.getWJZL(),
		 			TSGLModels.getJH()
		 			 )>0){
		 		 spResult.success=true;
		  	     spResult.msg="导入成功";
		 	  
		       }else{
		      	 spResult.success=false;
		      	 spResult.msg="导入失败";
		       } 
		      return spResult;	
			}
			
			public SPJsonResult  deleteTSXX(String TSDABH){
				SPJsonResult spresult= new SPJsonResult();
				int i=dbHelper.update("delete from GRFZ_TSDA where TSDABH=?",TSDABH);
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
			
			public SPJsonResult importTSXX(GRFZ_TSDAModels GRFZ_TSDAModels){
		    	 SPJsonResult SPJsonResult=new SPJsonResult();
		    	if( dbHelper.CommonAdd(GRFZ_TSDAModels)>0){
		    		SPJsonResult.success=true;
		    		SPJsonResult.msg="添加成功";
		    	}else{
		    		SPJsonResult.success=true;
		    		SPJsonResult.msg="添加失败";
		    	}
		    	return SPJsonResult;
		     }
			
			 public SPJsonResult editTSXX(GRFZ_TSDAModels GRFZ_TSDAModels){
			   	  SPJsonResult SPJsonResult=new SPJsonResult();
			     	if( dbHelper.CommonUpdate(GRFZ_TSDAModels)>0){
			     		SPJsonResult.success=true;
			     		SPJsonResult.msg="编辑成功";
			     	}else{
			     		SPJsonResult.success=true;
			     		SPJsonResult.msg="编辑失败";
			     	}
			     	return SPJsonResult;
			     }
			 
			 public Object getTSXXdetail(String TSDABH){
					return dbHelper.queryForList("select * from grfz_tsda  where TSDABH=?",TSDABH);
				}
}
