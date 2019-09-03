package sp.szpt.grfz.model;

import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class JTGLDB {
	        private IDbHelper dbHelper ;
			private  static String  jtxxsql="INSERT INTO GRFZ_JTDA(XM,GXRXM,GXRCW,GXRCSRQ,GZDWMC,BGDH,RYZW,RYXZ,MZ,XL,ZZMM,XQAH,YHTC,JTZZ,JTDH,PHONE,WXH,EMAL,JH)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			public JTGLDB(){
				dbHelper = DbHelperAccess.GetDbHelper();
			}
			public Object getJTGLLists(JTXXSerachInfo JTXXSerachInfo){
				
				return dbHelper.QuerySPList("GRFZ_JTDA", JTXXSerachInfo);
		    }
			
			public SPJsonResult exportJTGLXX(JTGLModels JTGLModels ){
		 	  SPJsonResult spResult = new SPJsonResult();	
		 	 if( dbHelper.update(jtxxsql,
		 			JTGLModels.getXM(),
		 			JTGLModels.getGXRXM(),
		 			JTGLModels.getGXRCW(),
		 			JTGLModels.getGXRCSRQ(),
		 			JTGLModels.getGZDWMC(),
		 			JTGLModels.getBGDH(),
		 			JTGLModels.getRYZW(),
		 			JTGLModels.getRYXZ(),
		 			JTGLModels.getMZ(),
		 			JTGLModels.getXL(),
		 			JTGLModels.getZZMM(),
		 			JTGLModels.getXQAH(),
		 			JTGLModels.getYHTC(),
		 			JTGLModels.getJTZZ(),
		 			JTGLModels.getJTDH(),
		 			JTGLModels.getPHONE(),
		 			JTGLModels.getWXH(),
		 			JTGLModels.getEMAL(),
		 			JTGLModels.getJH()	 				
		 			 )>0){
		 		 spResult.success=true;
		  	     spResult.msg="导入成功";
		 	  
		       }else{
		      	 spResult.success=false;
		      	 spResult.msg="导入失败";
		       } 
		      return spResult;	
			}
			
			public SPJsonResult  deleteJTXX(String JTDABH){
				SPJsonResult spresult= new SPJsonResult();
				int i=dbHelper.update("delete from GRFZ_JTDA where JTDABH=?",JTDABH);
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
}
