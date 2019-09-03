package sp.szpt.grfz.model;



import sp.szpt.common.db.DbHelperAccess;

import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.SPJsonResult;

public class JBXXGLDB {

		  private IDbHelper dbHelper ;
		  private  static String  filesql="INSERT INTO GRFZ_FILE(FILEID,FILEURL)VALUES(?,?)";
		/*  private  static String  jbxxsql="INSERT INTO GRFZ_JBXX(XM,CXM,ZPURL,SEX,GMSFZHM,CSRQ,NL,JG,CSD,MZ,"
		  		+ "ZZSF,CJDPSJ,XX,SG,TZ,PHONE,WXH,EMAL,JKZK,HYZK,"
		  		+ "HKXZ,HKSZD,BYXXJZY,ZHXL,JZ,JH,DBM,XGZDW,DWJC,KSJC,"		  		
		  		+ "JRXDWSJ,JRLY,JRFS,GW,ZW,XZWRZSJ,ZZZK,GAZXH,BGDH,GWYLYSJ, "		  		
		  		+ "CJGZSJ,CJGAGZSJ,RYBZXZ,SSJXZL,GL,XSDYJB,JQLB,YXTS,QSSJ,ZZSJ,"  		
		  		+ "SXTS,XJWCQK,CJZJZL,ZJHM,QFSJ,ZJYXQ,QFD,ZJBGDW,ZJBGJL,ZHZY)VALUES"
		  		+ "(?,?,?,GRFZ_GETID('SEX',?),?,?,?,?,?,GRFZ_GETID('MZ',?),"
		  		+ "GRFZ_GETID('ZZSF',?),?,GRFZ_GETID('XYXH',?),?,?,?,?,?,GRFZ_GETID('JKZK',?),GRFZ_GETID('HYZK',?),"
		  		+ "GRFZ_GETID('HKXZ',?),?,?,GRFZ_GETID('ZHXL',?),GRFZ_GETID('JZ',?),?,GRFZ_GETID('DBM',?),GRFZ_GETID('DBM',?),?,?,"
		  		+ "?,GRFZ_GETID('JRLY',?),GRFZ_GETID('JRFS',?),GRFZ_GETID('GW',?),?,?,?,?,?,?,"
		  		+ "?,?,?,GRFZ_GETID('SSJXZL',?),?,?,?,?,?,?,"
		  		+ "?,?,?,?,?,?,?,?,?,?)";*/
		  private  static String  jbxxsql="INSERT INTO GRFZ_JBXX(XM,CXM,ZPURL,SEX,GMSFZHM,CSRQ,NL,JG,CSD,MZ,"
			  		+ "ZZSF,CJDPSJ,XX,SG,TZ,PHONE,WXH,EMAL,JKZK,HYZK,"
			  		+ "HKXZ,HKSZD,BYXXJZY,ZHXL,JZ,JH,DBM,XGZDW,DWJC,KSJC,"		  		
			  		+ "JRXDWSJ,JRLY,JRFS,GW,ZW,XZWRZSJ,ZZZK,GAZXH,BGDH,GWYLYSJ, "		  		
			  		+ "CJGZSJ,CJGAGZSJ,RYBZXZ,SSJXZL,GL,XSDYJB,JQLB,YXTS,QSSJ,ZZSJ,"  		
			  		+ "SXTS,XJWCQK,CJZJZL,ZJHM,QFSJ,ZJYXQ,QFD,ZJBGDW,ZJBGJL,ZHZY)VALUES"
			  		+ "(?,?,?,?,?,?,?,?,?,?,"
			  		+ "?,?,?,?,?,?,?,?,?,?,"
			  		+ "?,?,?,?,?,?,?,?,?,?,"
			  		+ "?,?,?,?,?,?,?,?,?,?,"
			  		+ "?,?,?,?,?,?,?,?,?,?,"
			  		+ "?,?,?,?,?,?,?,?,?,?)";
		  public JBXXGLDB(){
					dbHelper = DbHelperAccess.GetDbHelper();
				}
		  public Object getJBGLLists(JBXXSearchInfo JBXXSearchInfo){
			  return   dbHelper.QuerySPList("grfz_jbxx", JBXXSearchInfo);
			 // return dbHelper.queryForList("select * from grfz_jbxx");
		  }	
		  public SPJsonResult   inserttpxx(String fileId,String fileurl){
			 SPJsonResult spJsonResult=new SPJsonResult();
			 if(dbHelper.update(filesql,
			    		fileId,
			    		fileurl
			    		)>0){	 
				 spJsonResult.success=true;
				 spJsonResult.msg="上传成功";
			 }else{
				 spJsonResult.success=false;
				 spJsonResult.msg="上传失败";
			 }
			    return spJsonResult;
		 } 
		  
		  public String getFileUrl(String fileId){
			return dbHelper.queryForMap("SELECT FILEURL FROM GRFZ_FILE WHERE FILEID=?", fileId).get("FILEURL").toString();
		  }
		  
		  
          public SPJsonResult importJBXX(GRFZ_JBXXModels GRFZ_JBXXModels){
            	 SPJsonResult SPJsonResult=new SPJsonResult();
            	if( dbHelper.CommonAdd(GRFZ_JBXXModels)>0){
            		SPJsonResult.success=true;
            		SPJsonResult.msg="添加成功";
            	}else{
            		SPJsonResult.success=true;
            		SPJsonResult.msg="添加失败";
            	}
            	return SPJsonResult;
             }
          public SPJsonResult editJBXX(GRFZ_JBXXModels GRFZ_JBXXModels){
        	  SPJsonResult SPJsonResult=new SPJsonResult();
          	if( dbHelper.CommonUpdate(GRFZ_JBXXModels)>0){
          		SPJsonResult.success=true;
          		SPJsonResult.msg="编辑成功";
          	}else{
          		SPJsonResult.success=true;
          		SPJsonResult.msg="编辑失败";
          	}
          	return SPJsonResult;
          }
          
    
          public SPJsonResult exportJBXX(GRFZ_JBXXModels GRFZ_JBXXModels ){
         	  SPJsonResult spResult = new SPJsonResult();	
         	 if( dbHelper.update(jbxxsql ,
         			GRFZ_JBXXModels.getXM(),
         			GRFZ_JBXXModels.getCXM(),
         			GRFZ_JBXXModels.getZPURL(),
         			GRFZ_JBXXModels.getSEX(),
         			GRFZ_JBXXModels.getGMSFZHM(),
         			GRFZ_JBXXModels.getCSRQ(),
         			GRFZ_JBXXModels.getNL(),
         			GRFZ_JBXXModels.getJG(),
         			GRFZ_JBXXModels.getCSD(),
         			GRFZ_JBXXModels.getMZ(),
         			GRFZ_JBXXModels.getZZSF(),        			
         			GRFZ_JBXXModels.getCJDPSJ(),
         			GRFZ_JBXXModels.getXX(),
         			GRFZ_JBXXModels.getSG(),
         			GRFZ_JBXXModels.getTZ(),
         			GRFZ_JBXXModels.getPHONE(),
         			GRFZ_JBXXModels.getWXH(),
         			GRFZ_JBXXModels.getEMAL(),
         			GRFZ_JBXXModels.getJKZK(),
         			GRFZ_JBXXModels.getHYZK(),
         			GRFZ_JBXXModels.getHKXZ(),       			
         			GRFZ_JBXXModels.getHKSZD(),
         			GRFZ_JBXXModels.getBYXXJZY(),
         			GRFZ_JBXXModels.getZHXL(),
         			GRFZ_JBXXModels.getJZ(),
         			GRFZ_JBXXModels.getJH(),
         			GRFZ_JBXXModels.getDBM(),
         			GRFZ_JBXXModels.getXGZDW(),
         			GRFZ_JBXXModels.getDWJC(),
         			GRFZ_JBXXModels.getKSJC(),
         			GRFZ_JBXXModels.getJRXDWSJ(),         			
         			GRFZ_JBXXModels.getJRLY(),
         			GRFZ_JBXXModels.getJRFS(),
         			GRFZ_JBXXModels.getGW(),
         			GRFZ_JBXXModels.getZW(),
         			GRFZ_JBXXModels.getXZWRZSJ(),
         			GRFZ_JBXXModels.getZZZK(),
         			GRFZ_JBXXModels.getGAZXH(),
         			GRFZ_JBXXModels.getBGDH(),
         			GRFZ_JBXXModels.getGWYLYSJ(),
         			GRFZ_JBXXModels.getCJGZSJ(),         			
         			GRFZ_JBXXModels.getCJGAGZSJ(),
         			GRFZ_JBXXModels.getRYBZXZ(),
         			GRFZ_JBXXModels.getSSJJZL(),
         			GRFZ_JBXXModels.getGL(),
         			GRFZ_JBXXModels.getXSDYJB(),
         			GRFZ_JBXXModels.getJQLB(),
         			GRFZ_JBXXModels.getYXTS(),
         			GRFZ_JBXXModels.getQSSJ(),
         			GRFZ_JBXXModels.getZZSJ(),
         			GRFZ_JBXXModels.getSXTS(),        			
         			GRFZ_JBXXModels.getXJWCQK(),
         			GRFZ_JBXXModels.getCJZJZL(),
         			GRFZ_JBXXModels.getZJHM(),
         			GRFZ_JBXXModels.getQFSJ(),
         			GRFZ_JBXXModels.getZJYXQ(),
         			GRFZ_JBXXModels.getQFD(),
         			GRFZ_JBXXModels.getZJBGDW(),
         			GRFZ_JBXXModels.getZJBGJL(),
         			GRFZ_JBXXModels.getZHZY()        
         			 )>0){
         		 spResult.success=true;
          	     spResult.msg="导入成功";
         	  
               }else{
              	 spResult.success=false;
              	 spResult.msg="导入失败";
               } 
              return spResult;	
        	}
        	
        	public SPJsonResult  deleteJBXX(String JBXXDABH){
        		SPJsonResult spresult= new SPJsonResult();
        		int i=dbHelper.update("delete from GRFZ_JBXX where JBXXDABH=?",JBXXDABH);
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
        	public Object getJBXXdetail(String JBXXDABH){
        		return dbHelper.queryForList("select * from grfz_jbxx  where jbxxdabh=?",JBXXDABH);
        	}
}
