package sp.szpt.grfz.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.model.DimensionInfo;
import sp.szpt.grfz.model.DimensionModels;
import sp.szpt.grfz.model.GRFZDB;
import sp.szpt.grfz.model.JbxxModels;
import sp.szpt.grfz.model.JfModels;





@RequestMapping("dimension")
@RestController
public class DimensionManage {
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper() ;
	
	String name = "";
	@RequestMapping(value = "getLists")
	public Object getLists(String GROWID , DimensionInfo searchInfo) {
		System.out.println(GROWID);
		SPListModel<Map<String, Object>> querySPList = dbHelper.QuerySPList("select a.*,b.ZQ,B.DF,B.LBQZ from DIMENSION a left join guanlian b on A.ID = B.ID and B.GROWID = '"+GROWID+"' ",searchInfo);
		return querySPList;
	}
	
	@RequestMapping(value = "getListss")
	public Object getListss(DimensionInfo searchInfo,String USERNAME) {
	
		 
		 List<JfModels> querySPList = dbHelper.queryForObjectList("select a.USERNAME,b.NAME,sum(b.ZHDF) as weidusum from roleuser a , guanlian b where A.ROLEID = B.GROWID and A.USERNAME = '"+USERNAME+"' and to_char(sysdate,'yyyymmdd')-TO_CHAR (TO_DATE (b.createtime, 'yyyy-mm-dd hh24:mi:ss'), 'yyyymmdd') < b.ZQ group by a.USERNAME,b.NAME",JfModels.class);
			
			String s = "";
			String d = "";
			for (int i = 0; i < querySPList.size(); i++) {
				s+=","+querySPList.get(i).WEIDUSUM;
			}
			for (int i = 0; i < querySPList.size(); i++) {
				d+=","+querySPList.get(i).NAME;
			}
			
			
				
/*		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		for (int i = 0; i < list.size(); i++) {
			s+=","+list.get(i).getNAME();
		}
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("text", list.get(i).getNAME());
			map.put("max", 100);
			list2.add(map);
		}
		
		Gson gson=new Gson();
		String obj=gson.toJson(list2);*/
		
		return s+"-"+d;
	}

	
	@RequestMapping(value = "deletedimension")
	public Object del(String VCHNS) {
		SPResult result = new SPResult();
		String[] ids = VCHNS.split(",");
		for (int i = 0; i < ids.length; i++) {
			result.setErrcode(dbHelper.update(
					"delete from DIMENSION where ID = ?", ids[i]));
		}
		return result;

	}
	
	
	@RequestMapping(value = "adddimension")
	public Object add(String values,HttpServletRequest request, HttpServletResponse response) {
				
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		GRFZDB  db=new GRFZDB();
		if(httpSession != null){
		model = (UserSession) httpSession.getAttribute("USER");
			if(model != null){
				name = model.username;
				if (!name.equals("admin")) {
					name=db.selectNAME(model.username);
				}
				
			}
			
		}
		SPResult result = new SPResult();
		String id = UUID.randomUUID().toString().replace("-", "");
		String[] info = values.split(",");
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		result.setErrcode(dbHelper.update("INSERT INTO DIMENSION (ID,NAME,DESCRIBE,UPDATEMAN,CREATETIEM) VALUES(?,?,?,?,?)",
						id, info[0], info[1], name, dateString));
		return result;

	}
	
	//淇敼缁村害淇℃伅
		@RequestMapping(value = "updatedimension")
		public Object update(String values,String ID) {
			SPResult result = new SPResult();
			String[] info = values.split(",");
			Date currentTime = new Date();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String dateString = formatter.format(currentTime);
			result.setErrcode(dbHelper
					.update("update DIMENSION set NAME =?,DESCRIBE = ?,UPDATETIME = ? where  ID = ? ",
							info[0], info[1], dateString,ID));
			
			return result;
		}

}
