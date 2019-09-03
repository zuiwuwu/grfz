package sp.szpt.grfz.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class JXGLDB {
	
    private IDbHelper dbHelper ;
   // private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	public JXGLDB(){
		dbHelper = DbHelperAccess.GetDbHelper();
	}
		
     /*private  static String  jxxxsql="INSERT INTO GRFZ_JXGL(AJMC,XYRXM,AJLB,BADW,ZBMJ,ZBMJZXF,XBMJ,XBMJZXF,ZBRY,SXRY,JASJ,TJSJ)VALUES(?,?,GRFZ_GETID('AJLB',?),GRFZ_GETID('DBM',?),?,?,?,?,?,?,?,?)";*/
	private  static String  jxxxsql="INSERT INTO GRFZ_JXGL(AJMC,XYRXM,AJLB,BADW,ZBMJ,ZBMJZXF,XBMJ,XBMJZXF,ZBRY,SXRY,JASJ,TJSJ,ZLFZ,AJBLJF,JYSX,AJFLB)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	private  static String  fajjxxxsql="INSERT INTO GRFZ_FAJJXGL(AJMC,XYRXM,AJLB,BADW,ZBMJ,ZBMJZXF,XBMJ,XBMJZXF,ZBRY,SXRY,JASJ,TJSJ,ZLFZ,AJBLJF,JYSX,AJFLB)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	private  static String  zfzgxxsql="INSERT INTO GRFZ_ZFZG(XM,ZSJB,GQSJ,SFGQ)VALUES(?,GRFZ_GETID('ZSJB',?),?,?)";
	private  static String  qtjkfxxsql="INSERT INTO GRFZ_QTJKF(XM,DBM,JKFXM,SCORE,FSMX,SJ)VALUES(?,?,?,?,?,?)";
	private  static String  ksdfxxsql="INSERT INTO GRFZ_KSDF(XM,DBM,KSSJ,KSLB,KSCJ,BMPJCJ,GRPJCJ)VALUES(?,?,?,?,?,?,?)";
	private  static String  sldjxsql="INSERT INTO GRFZ_SLDJXGL(XM,DBM,GRDCJX,SZDWDCJX,SZDWZFZL,HCZZ,HJ,SJ)VALUES(?,?,?,?,?,?,?,?)";
	public SPJsonResult exportJXGLXX(JXGLModels JXGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(jxxxsql, 
	 			JXGLModels.getAJMC(),
	 			JXGLModels.getXYRXM(),
	 			JXGLModels.getAJLB(),
	 			JXGLModels.getBADW(),
	 			JXGLModels.getZBMJ(),
	 			JXGLModels.getZBMJZXF(),
	 			JXGLModels.getXBMJ(),
	 			JXGLModels.getXBMJZXF(),
	 			JXGLModels.getZBRY(),
	 			JXGLModels.getSXRY(),
	 			JXGLModels.getJASJ(),
	 			JXGLModels.getTJSJ() ,
	 			JXGLModels.getZLFZ(),
	 			JXGLModels.getAJBLJF(),
	 			JXGLModels.getJYSX(),
	 			JXGLModels.getAJFLB()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	
	
	public SPJsonResult exportFAJJXGL(FAJJXGLModels FAJJXGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(fajjxxxsql, 
	 			FAJJXGLModels.getAJMC(),
	 			FAJJXGLModels.getXYRXM(),
	 			FAJJXGLModels.getAJLB(),
	 			FAJJXGLModels.getBADW(),
	 			FAJJXGLModels.getZBMJ(),
	 			FAJJXGLModels.getZBMJZXF(),
	 			FAJJXGLModels.getXBMJ(),
	 			FAJJXGLModels.getXBMJZXF(),
	 			FAJJXGLModels.getZBRY(),
	 			FAJJXGLModels.getSXRY(),
	 			FAJJXGLModels.getJASJ(),
	 			FAJJXGLModels.getTJSJ() ,
	 			FAJJXGLModels.getZLFZ(),
	 			FAJJXGLModels.getAJBLJF(),
	 			FAJJXGLModels.getJYSX(),
	 			FAJJXGLModels.getAJFLB()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	
	public SPJsonResult exportSLDJXGLXX(SLDJXGLModels SLDJXGLModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(sldjxsql, 
	 			SLDJXGLModels.getXM(),
	 			SLDJXGLModels.getDBM(),
	 			SLDJXGLModels.getGRDCJX(),
	 			SLDJXGLModels.getSZDWDCJX(),
	 			SLDJXGLModels.getSZDWZFZL(),
	 			SLDJXGLModels.getHCZZ(),
	 			SLDJXGLModels.getHJ(),
	 			SLDJXGLModels.getSJ()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	public SPJsonResult exportZFZGXX(GRFZ_ZFZGModels GRFZ_ZFZGModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(zfzgxxsql, 
	 			GRFZ_ZFZGModels.getXM(),
	 			//GRFZ_ZFZGModels.getZWMC(),
	 			GRFZ_ZFZGModels.getZSJB(),
	 			GRFZ_ZFZGModels.getGQSJ(),
	 			GRFZ_ZFZGModels.getSFGQ()				 			 
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	
	public SPJsonResult exportQTJKFXX(GRFZ_QTJKFModels GRFZ_QTJKFModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(qtjkfxxsql, 
	 			GRFZ_QTJKFModels.getXM(),
	 			GRFZ_QTJKFModels.getDBM(),
	 			GRFZ_QTJKFModels.getJKFXM(),
	 			GRFZ_QTJKFModels.getSCORE(),
	 			GRFZ_QTJKFModels.getFSMX(),
	 			GRFZ_QTJKFModels.getSJ()	 			 
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	
	public SPJsonResult exportKSDFXX(GRFZ_KSDFModels GRFZ_KSDFModels ){
	 	  SPJsonResult spResult = new SPJsonResult();	
	 	 if( dbHelper.update(ksdfxxsql,
	 			GRFZ_KSDFModels.getXM(),
	 			GRFZ_KSDFModels.getDBM(),
	 			GRFZ_KSDFModels.getKSSJ(),
	 			GRFZ_KSDFModels.getKSLB(),
	 			GRFZ_KSDFModels.getKSCJ(),
	 			GRFZ_KSDFModels.getBMPJCJ(),
	 			GRFZ_KSDFModels.getGRPJCJ()
	 			 )>0){
	 		 spResult.success=true;
	  	     spResult.msg="导入成功";
	 	  
	       }else{
	      	 spResult.success=false;
	      	 spResult.msg="导入失败";
	       } 
	      return spResult;	
		}
	public Object getJXGLLists(JXXXSerachInfo JXXXSerachInfo){
		
		return dbHelper.QuerySPList("GRFZ_JXGL",JXXXSerachInfo);
		
    }
	
    public Object getFAJJXGLLists(JXXXSerachInfo JXXXSerachInfo){
		
		return dbHelper.QuerySPList("GRFZ_FAJJXGL",JXXXSerachInfo);
		
    }
    
    public Object getSLDJXGLLists(JXXXSerachInfo JXXXSerachInfo){
		
		return dbHelper.QuerySPList("GRFZ_SLDJXGL",JXXXSerachInfo);
		
    }
	public Object getZFZGLists(ZFZGSearchInfo ZFZGSearchInfo){
		return dbHelper.QuerySPList("VIEW_GRFZ_ZFZG",ZFZGSearchInfo);
		
    }
	public Object getQTJKFLists(QTJKFXXSearchInfo QTJKFXXSearchInfo){
		return dbHelper.QuerySPList("GRFZ_QTJKF",QTJKFXXSearchInfo);
		
    }
	public Object getKSDFLists(KSDFSSSearchInfo KSDFSSSearchInfo){
		return dbHelper.QuerySPList("VIEW_GRFZ_KSDF",KSDFSSSearchInfo);
		
    }
	public SPJsonResult  deleteKSDFXX(String KSDFBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_KSDF where KSDFBH=?",KSDFBH);
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
	public SPJsonResult  deleteZFZGXX(String ZFZGBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_ZFZG where ZFZGBH=?",ZFZGBH);
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
	
	public SPJsonResult  deleteJXXX(String JXGLBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_JXGL where JXGLBH=?",JXGLBH);
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
	public SPJsonResult  deleteFAJJXXX(String FAJJXGLBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_FAJJXGL where FAJJXGLBH=?",FAJJXGLBH);
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
	
	public SPJsonResult  deleteSLDJXXX(String SLDJXGLBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_SLDJXGL where SLDJXGLBH=?",SLDJXGLBH);
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
	public SPJsonResult  deleteQTJKFXX(String QTJKFBH){
		SPJsonResult spresult= new SPJsonResult();
		int i=dbHelper.update("delete from GRFZ_QTJKF where QTJKFBH=?",QTJKFBH);
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
	public Object getsearchJXGLLists(String search){;
		Object object=dbHelper.queryForList("select * from view_grfz_jxgl where ZBMJ like ? or AJLB like ? or BADW  like ?" ,String.format("%%%s%%", search),String.format("%%%s%%", search),String.format("%%%s%%", search));		
		return object;		
    }
}
