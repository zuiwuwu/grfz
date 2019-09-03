package sp.szpt.grfz.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import sp.szpt.common.Controller;
import sp.szpt.common.SPJsonResult;
import sp.szpt.common.string;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.excel.ExcelReader;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.model.BMEJKHInfo;
import sp.szpt.grfz.model.DWXJKHInfo;
import sp.szpt.grfz.model.FJBMEJKHModels;
import sp.szpt.grfz.model.KHGL_FJBMTXKHModels;
import sp.szpt.grfz.model.GRFZ_GWDAModels;
import sp.szpt.grfz.model.GRFZ_TSDAModels;
import sp.szpt.grfz.model.GWYNDKHDCInfo;
import sp.szpt.grfz.model.KHGL_BMEJKHModels;
import sp.szpt.grfz.model.KHGL_GWYNDKHModels;
import sp.szpt.grfz.model.KHGLDB;
import sp.szpt.grfz.model.KHGLSearchInfo;
import sp.szpt.grfz.model.KHGL_QYYKHModels;
import sp.szpt.grfz.model.KHGL_TXKHModels;
import sp.szpt.grfz.model.QYNKHModels;
import sp.szpt.grfz.model.QYYKHModels;
import sp.szpt.grfz.model.SJQYJXKHDJInfo;
import sp.szpt.grfz.model.KHGL_SJQYJXKHModels;
import sp.szpt.grfz.model.TSGLDB;
import sp.szpt.grfz.model.TXKHInfo;

@RestController
@RequestMapping("KHGL")
public class KHGLController extends Controller{
	
	private IDbHelper dbHelper  = DbHelperAccess.GetDbHelper();
	
	@RequestMapping(value="getGWYNDKHLists")
	public  Object getGWYNDKHLists(GWYNDKHDCInfo GWYNDKHDCInfo){ 
		KHGLDB db =new KHGLDB();
		return db.getGWYNDKHDCLists(GWYNDKHDCInfo);
    }
	
	@RequestMapping(value="delGWYNDKH")
	public  Object delGWYNDKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_GWYNDKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importGWYNDKH",method = RequestMethod.POST)
	public Object importGWYNDKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<KHGL_GWYNDKHModels> list = reader.GetList(1, KHGL_GWYNDKHModels.class);
		 System.out.println(list.size());
		for (KHGL_GWYNDKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			 
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_GWYNDKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_GWYNDKH (USERNAME,TIME,GRADE) VALUES (?,?,?)",model.USERNAME,model.TIME,model.GRADE) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_GWYNDKH SET TIME = ?,GRADE = ? WHERE USERNAME = ?" ,model.TIME,model.GRADE,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	@RequestMapping(value = "importGWYXX")	
	public Object importKHGWYXX(KHGL_GWYNDKHModels KHGL_GWYNDKHModels ) throws Exception {
			KHGLDB db=new KHGLDB();
			return db.importKHGWYXX(KHGL_GWYNDKHModels);
		}
	
	@RequestMapping(value = "importSJQYXX")	
	public Object importSJQYYXX(KHGL_SJQYJXKHModels KHGL_SJQYJXKHModels ) throws Exception {
		System.out.println(KHGL_SJQYJXKHModels.TIME+KHGL_SJQYJXKHModels.USERNAME);
			KHGLDB db=new KHGLDB();
			return db.importSJQYXX(KHGL_SJQYJXKHModels);
		}
	
	@RequestMapping(value = "importTXXX")	
	public Object importTXXX(KHGL_FJBMTXKHModels KHGL_FJBMTXKHModels ) throws Exception {
	
			KHGLDB db=new KHGLDB();
			return db.importTXXX(KHGL_FJBMTXKHModels);
		}
	
	@RequestMapping(value = "importEJKHXX")	
	public Object importEJKHXX(KHGL_BMEJKHModels KHGL_BMEJKHModels ) throws Exception {
	
			KHGLDB db=new KHGLDB();
			return db.importBMEJXX(KHGL_BMEJKHModels);
		}
	
	@RequestMapping(value = "importDWXX")	
	public Object importDWXX(KHGL_QYYKHModels KHGL_QYYKHModels ) throws Exception {
	
			KHGLDB db=new KHGLDB();
			return db.importDWXX(KHGL_QYYKHModels);
		}
	

	@RequestMapping(value="getSJQYJXKHLists")
	public  Object getSJQYJXKHLists(SJQYJXKHDJInfo SJQYJXKHDJInfo){ 
		KHGLDB db =new KHGLDB();
		return db.getSJQYJXKHDJLists(SJQYJXKHDJInfo);
    }
	
	@RequestMapping(value="delSJQYJXKH")
	public  Object delSJQYJXKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_SJQYJXKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importSJQYJXKH",method = RequestMethod.POST)
	public Object importSJQYJXKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<KHGL_SJQYJXKHModels> list = reader.GetList(1, KHGL_SJQYJXKHModels.class);
		
		for (KHGL_SJQYJXKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_SJQYJXKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_SJQYJXKH (USERNAME,DEPTNAME,TIME,RANK,GRADE) VALUES (?,?,?,?,?)",model.USERNAME,model.DEPTNAME,model.TIME,model.RANK,model.GRADE) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_SJQYJXKH SET DEPTNAME = ?,TIME = ?,RANK = ?,GRADE = ? WHERE USERNAME = ?" ,model.DEPTNAME,model.TIME,model.RANK,model.GRADE,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	
	@RequestMapping(value="getBMEJKHLists")
	public  Object getBMEJKHLists(BMEJKHInfo BMEJKHInfo){ 
		KHGLDB db =new KHGLDB();
		return db.getBMEJKHLists(BMEJKHInfo);
    }
	
	@RequestMapping(value="getDWXJKHLists")
	public  Object getDWXJKHLists(DWXJKHInfo DWXJKHInfo){ 
		KHGLDB db =new KHGLDB();
		return db.getBMEJKHLists(DWXJKHInfo);
    }
	
	@RequestMapping(value = "importDWKH",method = RequestMethod.POST)
	public Object importDWKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<KHGL_QYYKHModels> list = reader.GetList(1, KHGL_QYYKHModels.class);
		 System.out.println(list.size());
		for (KHGL_QYYKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.DWNAME)){
			 
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_QYYKH WHERE DWNAME = ?", model.DWNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_QYYKH (DWNAME,SCORE,TIME,RANK) VALUES (?,?,?,?)",model.DWNAME,model.SCORE,model.TIME,model.RANK) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_QYYKH SET TIME = ?,RANK = ?,SCORE = ?WHERE DWNAME = ?" ,model.TIME,model.RANK,model.SCORE,model.DWNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	
	@RequestMapping(value="delDWKH")
	public  Object delDWKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_QYYKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	
	@RequestMapping(value = "importEJKH",method = RequestMethod.POST)
	public Object importEJKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<KHGL_BMEJKHModels> list = reader.GetList(1, KHGL_BMEJKHModels.class);
		 System.out.println(list.size());
		for (KHGL_BMEJKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			 
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_BMEJKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_BMEJKH (USERNAME,DEPTNAME,SCORE,TIME,GRADE,JZ) VALUES (?,?,?,?,?,?)",model.USERNAME,model.DEPTNAME,model.SCORE,model.TIME,model.GRADE,model.JZ) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_BMEJKH SET TIME = ?,GRADE = ?,DEPTNAME = ?,SCORE = ?,JZ=? WHERE USERNAME = ?" ,model.TIME,model.GRADE,model.DEPTNAME,model.SCORE,model.JZ,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	

	@RequestMapping(value="getFJBMEJKHLists")
	public  Object getFJBMEJKHLists(KHGLSearchInfo searchInfo){
		String sqlString = "";
		if(!string.IsNullOrEmpty(searchInfo.YEAR)){
			if(!string.IsNullOrEmpty(searchInfo.MONTH)){
				String SJ= searchInfo.YEAR+searchInfo.MONTH;
				if(!string.IsNullOrEmpty(searchInfo.DEPTNAME)){
					if(!string.IsNullOrEmpty(searchInfo.JYSX)){
						sqlString = String.format("select B.*,C.DBM,C.JYSX,rownum RANK FROM (select A.*  from (select  XM,substr(SJ,1,6) as TIME ,sum(SCORE) DF  from  grfz_khda where DBM = '%s' and JYSX = '%s' and SJ = '%s' "
								+ "group by XM,substr(SJ,1,6) order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.XM "
								+ "where C.DBM = '%s'  and C.jysx = '%s'", searchInfo.DEPTNAME,searchInfo.JYSX,SJ,searchInfo.DEPTNAME,searchInfo.JYSX);
					}else {
						
					}
				}else{
					
				}
			}else{
				
		 }
			
		}else{
			if(!string.IsNullOrEmpty(searchInfo.MONTH)){
							
						}else{
							
						}
		}
		
		return null;
    }
	
	@RequestMapping(value="delBMEJKH")
	public  Object delFJBMEJKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_BMEJKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importFJBMEJKH",method = RequestMethod.POST)
	public Object importFJBMEJKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<FJBMEJKHModels> list = reader.GetList(1, FJBMEJKHModels.class);
		
		for (FJBMEJKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_FJBMEJKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_FJBMEJKH (USERNAME,DEPTNAME,SCORE,RANK,GRADE,TIME) VALUES (?,?,?,?,?,?)",model.USERNAME,
						  model.DEPTNAME,model.SCORE,model.RANK,model.GRADE,model.TIME) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_FJBMEJKH SET DEPTNAME = ?,SCORE= ?,RANK = ?,GRADE = ?,TIME = ? WHERE USERNAME = ?" ,model.DEPTNAME,model.SCORE,model.RANK,model.RANK,model.GRADE,model.TIME,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	

	@RequestMapping(value="getFJBMTXKHLists")
	public  Object getFJBMTXKHLists(KHGLSearchInfo searchInfo){
		String sqlString = "";
		if(!string.IsNullOrEmpty(searchInfo.YEAR)){
			if(!string.IsNullOrEmpty(searchInfo.MONTH)){
				String SJ= searchInfo.YEAR+searchInfo.MONTH;
				if(!string.IsNullOrEmpty(searchInfo.DEPTNAME)){
					if(!string.IsNullOrEmpty(searchInfo.JYSX)){
						sqlString = String.format("select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.*,rownum RANK  from (select  XM USERNAME,substr(SJ,1,6) as TIME ,sum(SCORE) DF  from  grfz_khda where DBM = '%s' and JYSX = '%s' and SJ = '%s' "
								+ "group by XM,substr(SJ,1,6) order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME "
								+ "where C.DBM = '%s'  and C.jysx = '%s' "
								+ "order by DF desc", searchInfo.DEPTNAME,searchInfo.JYSX,SJ,searchInfo.DEPTNAME,searchInfo.JYSX);
					}else {
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM,RANK FROM (select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.*,rownum RANK  from (select  XM USERNAME,substr(SJ,1,6) as TIME ,sum(SCORE) DF  from  grfz_khda where DBM = '%s'   and  SJ = '%s' "
								+ "group by XM,substr(SJ,1,6)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM,RANK  order by DF desc ", searchInfo.DEPTNAME,SJ);
					}
				}else{
					if(!string.IsNullOrEmpty(searchInfo.JYSX)){
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM,RANK FROM (select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.* ,rownum RANK from (select  XM USERNAME,substr(SJ,1,6) as TIME ,sum(SCORE) DF  from  grfz_khda where JYSX = '%s'   and  SJ = '%s' "
								+ "group by XM,substr(SJ,1,6)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM,RANK  order by DF desc", searchInfo.JYSX,SJ);
					}else {
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM,RANK FROM (select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.* ,rownum RANK from (select  XM USERNAME,substr(SJ,1,6) as TIME ,sum(SCORE) DF  from  grfz_khda where   SJ = '%s' "
								+ "group by XM,substr(SJ,1,6)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM,RANK  order by DF desc", SJ);
					}
					
				}
			}else{
				String SJ= searchInfo.YEAR;
				if(!string.IsNullOrEmpty(searchInfo.DEPTNAME)){
					if(!string.IsNullOrEmpty(searchInfo.JYSX)){
						sqlString = String.format("select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.*,rownum RANK  from (select  XM USERNAME,substr(SJ,1,4) as TIME ,sum(SCORE) DF  from  grfz_khda where DBM = '%s' and JYSX = '%s' and substr(SJ,1,4) = '%s' "
								+ "group by XM,substr(SJ,1,4) order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME "
								+ "where C.DBM = '%s'  and C.jysx = '%s' "
								+ "order by DF desc", searchInfo.DEPTNAME,searchInfo.JYSX,SJ,searchInfo.DEPTNAME,searchInfo.JYSX);
					}else {
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM FROM (select B.*,C.DBM,C.JYSX USERTYPE,rownum RANK FROM (select A.*  from (select  XM USERNAME,substr(SJ,1,4) as TIME ,sum(SCORE) DF  from  grfz_khda where DBM = '%s'   and  substr(SJ,1,4) = '%s' "
								+ "group by XM,substr(SJ,1,4)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM  order by DF desc ", searchInfo.DEPTNAME,SJ);
					}
				}else{
					if(!string.IsNullOrEmpty(searchInfo.JYSX)){
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM,RANK FROM (select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.* ,rownum RANK from (select  XM USERNAME,substr(SJ,1,4) as TIME ,sum(SCORE) DF  from  grfz_khda where JYSX = '%s'   and  substr(SJ,1,4) = '%s' "
								+ "group by XM,substr(SJ,1,4)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM,RANK  order by DF desc", searchInfo.JYSX,SJ);
					}else {
						sqlString = String.format("select USERNAME,TIME,DF,USERTYPE,DBM,RANK FROM (select B.*,C.DBM,C.JYSX USERTYPE FROM (select A.* ,rownum RANK from (select  XM USERNAME,substr(SJ,1,4) as TIME ,sum(SCORE) DF  from  grfz_khda where   substr(SJ,1,4) = '%s' "
								+ "group by XM,substr(SJ,1,4)  order by sum(SCORE) desc) A ) B "
								+ "left join (select XM,DBM,JYSX from grfz_khda group by XM,DBM,JYSX) C on C.XM = B.USERNAME) "
								+ "group by USERNAME,TIME,DF,USERTYPE,DBM,RANK  order by DF desc", SJ);
					}
					
				}
		 }
			
		}else{
			
		}
		
		SPListModel<Map<String,Object>> splist = new SPListModel<Map<String,Object>>();
		if(sqlString!="")
			splist= dbHelper.QuerySPList(sqlString);
		else {
			
		}
		return splist;
    }
	
	@RequestMapping(value="delTXKH")
	public  Object delFJBMTXKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_FJBMTXKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importFJBMTXKH",method = RequestMethod.POST)
	public Object importFJBMTXKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<KHGL_FJBMTXKHModels> list = reader.GetList(1, KHGL_FJBMTXKHModels.class);
		
		for (KHGL_FJBMTXKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_FJBMTXKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_FJBMTXKH (USERNAME,USERTYPE,SCORE,RANK,GRADE,TIME,DEPTNAME) VALUES (?,?,?,?,?,?,?)",model.USERNAME,model.USERTYPE,model.SCORE,model.RANK,model.GRADE,model.TIME,model.DEPTNAME) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_FJBMTXKH SET USERTYPE = ?,SCORE = ?,RANK = ?,GRADE = ?,TIME = ?,DEPTNAME = ? WHERE USERNAME = ?" ,model.USERTYPE,model.SCORE,model.RANK,model.GRADE,model.TIME,model.DEPTNAME,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	

	@RequestMapping(value="getQYYKHLists")
	public  Object getQYYKHLists(){ 
		return dbHelper.QuerySPList("SELECT * FROM KHGL_QYYKH");
    }
	
	@RequestMapping(value="delQYYKH")
	public  Object delQYYKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_QYYKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importQYYKH",method = RequestMethod.POST)
	public Object importQYYKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<QYYKHModels> list = reader.GetList(1, QYYKHModels.class);
		
		for (QYYKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_QYYKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_QYYKH (USERNAME,USERTYPE,SCORE,RANK,TIME) VALUES (?,?,?,?,?)",model.USERNAME,model.USERTYPE,model.SCORE,model.RANK,model.TIME) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_QYYKH SET USERTYPE = ?,SCORE = ?,RANK = ?,TIME = ? WHERE USERNAME = ?" ,model.USERTYPE,model.SCORE,model.RANK,model.TIME,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	

	@RequestMapping(value="getQYNKHLists")
	public  Object getQYNKHLists(){ 
		return dbHelper.QuerySPList("SELECT * FROM KHGL_QYNKH");
    }
	
	@RequestMapping(value="delQYNKH")
	public  Object delQYNKH(String IDS){ 
		SPResult result = new SPResult();
		String idString2[] = IDS.split(",");
		Object[] args = new Object[idString2.length];
		StringBuilder string = new StringBuilder();
		string.append("(");
		for(int i = 0;i <idString2.length;i ++){
			args[i] = idString2[i];
			if(string.length() != 1)
				string.append(",");
			string.append("?");
		}
		string.append(")");
		String sqlString = String.format("DELETE FROM KHGL_QYNKH WHERE ID IN %s",string);
		result.setErrcode(dbHelper.update(sqlString, args));
		if(result.getErrcode() != 0){
			result.setErrmsg("删除成功！");
		}else 
			result.setErrmsg("删除失败！");
		return result;		
		
    }
	
	@RequestMapping(value = "importQYNKH",method = RequestMethod.POST)
	public Object importQYNKH(@RequestParam(value = "FILE") MultipartFile myfiles) throws IOException {

		SPJsonResult spresult = new SPJsonResult();
		spresult.success = false;
		if (myfiles == null)
			return null;
		ExcelReader reader = new ExcelReader(new ByteArrayInputStream(
				myfiles.getBytes()), myfiles.getOriginalFilename());
		reader.Open();
		List<QYNKHModels> list = reader.GetList(1, QYNKHModels.class);
		
		for (QYNKHModels model : list) {
			
		  if(!StringUtils.isEmpty(model.USERNAME)){
			  List<Map<String, Object>> list2= dbHelper.queryForList("SELECT * FROM KHGL_QYNKH WHERE USERNAME = ?", model.USERNAME);
			  if(list2.size() ==0){
				  spresult.success = dbHelper.update("INSERT INTO KHGL_QYNKH (USERNAME,USERTYPE,SCORE,RANK,TIME) VALUES (?,?,?,?,?)",model.USERNAME,model.USERTYPE,model.SCORE,model.RANK,model.TIME) !=0;
			  }else{
				  spresult.success = dbHelper.update("UPDATE KHGL_QYNKH SET USERTYPE = ?,SCORE = ?,RANK = ?,TIME = ? WHERE USERNAME = ?" ,model.USERTYPE,model.SCORE,model.RANK,model.TIME,model.USERNAME) !=0;
			  }
		  }	
		 }
		if(spresult.success=true){
			spresult.msg = "导入成功!";
		}else {
			spresult.msg = "导入失败!";
		}
		return spresult;

	
	}
	
	@RequestMapping(value="getTXKHLists")
	public  Object getTXKHLists(TXKHInfo TXKHInfo){ 
		KHGLDB db =new KHGLDB();
		return db.getTXKHLists(TXKHInfo);
    }
	
}
