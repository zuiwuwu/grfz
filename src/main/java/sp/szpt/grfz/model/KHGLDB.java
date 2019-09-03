package sp.szpt.grfz.model;

import org.springframework.web.bind.annotation.RequestMapping;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.BaseDBObject;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class KHGLDB extends BaseDBObject{
    private IDbHelper dbHelper ;
	private  static String  khxxsql="INSERT INTO GRFZ_KHDA(XM,DBM,JYSX,SCORE,SJ)VALUES(?,?,?,?,?)";
	public KHGLDB(){
		dbHelper = DbHelperAccess.GetDbHelper();
	}
	public Object getKHGLLists(KHXXSearchInfo KHXXSearchInfo){
		return dbHelper.QuerySPList("GRFZ_KHDA", KHXXSearchInfo);
    }
	
	public Object getTXKHLists(TXKHInfo TXKHInfo){
		return dbHelper.QuerySPList("KHGL_FJBMTXKH", TXKHInfo);
    }
	
	public Object getGWYNDKHDCLists(GWYNDKHDCInfo GWYNDKHDCInfo){
		return dbHelper.QuerySPList("KHGL_GWYNDKH", GWYNDKHDCInfo);
		
    }
	
	public Object getSJQYJXKHDJLists(SJQYJXKHDJInfo SJQYJXKHDJInfo){
		return dbHelper.QuerySPList("KHGL_SJQYJXKH", SJQYJXKHDJInfo);
	}
	
	public Object getBMEJKHLists(BMEJKHInfo BMEJKHInfo){
		return dbHelper.QuerySPList("KHGL_BMEJKH", BMEJKHInfo);
	}
	
	public Object getBMEJKHLists(DWXJKHInfo DWXJKHInfo){
		return dbHelper.QuerySPList("KHGL_QYYKH", DWXJKHInfo);
	}
	
	public SPJsonResult exportKHGLXX(KHGLModels KHGLModels ){
 	  SPJsonResult spResult = new SPJsonResult();	
 	 if( dbHelper.update(khxxsql,
 			KHGLModels.getXM(),
 			KHGLModels.getDBM(),
 			KHGLModels.getJYSX(),
 			KHGLModels.getSCORE(),
 			KHGLModels.getSJ()
 			 )>0){
 		 spResult.success=true;
  	     spResult.msg="导入成功";
 	  
       }else{
      	 spResult.success=false;
      	 spResult.msg="导入失败";
       } 
      return spResult;	
	}
	
	public SPJsonResult  deleteKHXX(String KHDABH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_KHDA where KHDABH=?",KHDABH);
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
	
	public SPJsonResult importKHGWYXX(KHGL_GWYNDKHModels KHGL_GWYNDKHModels){
   	 SPJsonResult SPJsonResult=new SPJsonResult();
   	if( dbHelper.CommonAdd(KHGL_GWYNDKHModels)>0){
   		SPJsonResult.success=true;
   		SPJsonResult.msg="添加成功";
   	}else{
   		SPJsonResult.success=true;
   		SPJsonResult.msg="添加失败";
   	}
   	return SPJsonResult;
    }
	
	public SPJsonResult importSJQYXX(KHGL_SJQYJXKHModels KHGL_SJQYJXKHModels){
	   	 SPJsonResult SPJsonResult=new SPJsonResult();
	   	if( dbHelper.CommonAdd(KHGL_SJQYJXKHModels)>0){
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加成功";
	   	}else{
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加失败";
	   	}
	   	return SPJsonResult;
	    }
	
	public SPJsonResult importBMEJXX(KHGL_BMEJKHModels KHGL_BMEJKHModels){
	   	 SPJsonResult SPJsonResult=new SPJsonResult();
	   	if( dbHelper.CommonAdd(KHGL_BMEJKHModels)>0){
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加成功";
	   	}else{
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加失败";
	   	}
	   	return SPJsonResult;
	    }
	
	public SPJsonResult importDWXX(KHGL_QYYKHModels KHGL_QYYKHModels){
	   	 SPJsonResult SPJsonResult=new SPJsonResult();
	   	if( dbHelper.CommonAdd(KHGL_QYYKHModels)>0){
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加成功";
	   	}else{
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加失败";
	   	}
	   	return SPJsonResult;
	    }
	
	public SPJsonResult importTXXX(KHGL_FJBMTXKHModels KHGL_FJBMTXKHModels){
	   	 SPJsonResult SPJsonResult=new SPJsonResult();
	   	if( dbHelper.CommonAdd(KHGL_FJBMTXKHModels)>0){
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加成功";
	   	}else{
	   		SPJsonResult.success=true;
	   		SPJsonResult.msg="添加失败";
	   	}
	   	return SPJsonResult;
	    }
}
