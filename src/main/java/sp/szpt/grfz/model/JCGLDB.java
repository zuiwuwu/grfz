package sp.szpt.grfz.model;



import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class JCGLDB {
	
    private IDbHelper dbHelper ;
   // private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	private  static String  jcxxsql="INSERT INTO GRFZ_JCDA(GRHDW,JLMC,CFMC,JCSJ,SJCSZW,JCYY,PZJGMC,WJZM,JH)VALUES(?,?,?,?,?,?,?,?,?)";
	public JCGLDB(){
		dbHelper = DbHelperAccess.GetDbHelper();
	}
	
/*	public Object getJCGLLists(JCXXSearchInfo JCXXSearchInfo){
		//return dbHelper.queryForList("select * from grfz_jcda");
		return dbHelper.QuerySPList("select * from grfz_jcda t where t.jcsj = (select max(jcsj) from grfz_jcda where t.GRHDW = GRHDW) order by GRHDW", JCXXSearchInfo);
    }*/
	
	public Object getJCGLLists(JCXXSearchInfo JCXXSearchInfo){
		//return dbHelper.queryForList("select * from grfz_jcda");
		return dbHelper.QuerySPList("select GRHDW,  count(JLMC) as JLCS , count(CFMC) as CFCS from grfz_jcda group by GRHDW", JCXXSearchInfo);
    }
	
	 public SPJsonResult importJCXX(GRFZ_JCDAModels JCGLModels){
    	 SPJsonResult SPJsonResult=new SPJsonResult();
    	if( dbHelper.CommonAdd(JCGLModels)>0){
    		SPJsonResult.success=true;
    		SPJsonResult.msg="添加成功";
    	}else{
    		SPJsonResult.success=true;
    		SPJsonResult.msg="添加失败";
    	}
    	return SPJsonResult;
     }
	 
	 public SPJsonResult editJCXX(GRFZ_JCDAModels GRFZ_JCDAModels){
   	  SPJsonResult SPJsonResult=new SPJsonResult();
     	if( dbHelper.CommonUpdate(GRFZ_JCDAModels)>0){
     		SPJsonResult.success=true;
     		SPJsonResult.msg="编辑成功";
     	}else{
     		SPJsonResult.success=true;
     		SPJsonResult.msg="编辑失败";
     	}
     	return SPJsonResult;
     }
	
	public SPJsonResult exportJCGLXX(GRFZ_JCDAModels JCGLModels ){
 	  SPJsonResult spResult = new SPJsonResult();	
 	 if( dbHelper.update(jcxxsql, 
 			JCGLModels.getGRHDW(),
 			JCGLModels.getJLMC(),
 			JCGLModels.getCFMC(),
 			JCGLModels.getJCSJ(),
 			JCGLModels.getSJCSZW(),
 			JCGLModels.getJCYY(),
 			JCGLModels.getPZJGMC(),
 			JCGLModels.getWJZM(),
 			JCGLModels.getJH()	,
 			JCGLModels.getSSDW()
 			 )>0){
 		 spResult.success=true;
  	     spResult.msg="导入成功";
 	  
       }else{
      	 spResult.success=false;
      	 spResult.msg="导入失败";
       } 
      return spResult;	
	}
	
	public SPJsonResult  deleteJCXX(String JCDABH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_JCDA where JCDABH=?",JCDABH);
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
	
	public Object getJCXXdetail(String JCDABH){
		return dbHelper.queryForList("select * from grfz_jcda  where JCDABH=?",JCDABH);
	}
}
