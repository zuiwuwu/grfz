package sp.szpt.grfz.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sp.szpt.common.Controller;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.model.DAModels;
import sp.szpt.grfz.model.GRFZ_JLModels;
@RestController
@RequestMapping("grxq")
public class grxqController extends Controller {
	
	private IDbHelper dbHelper  = DbHelperAccess.GetDbHelper();
	
	
	@RequestMapping("getName")
	public Object role(HttpServletRequest request, HttpServletResponse response) {	
			
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		String ss ="";
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			if(model != null){
				
				List<Map<String, Object>> list = dbHelper.queryForList("select NAME from grfz_user where USERNAME = '"+model.username+"'");
				if (list.size()>0) {
					return list;
				}else{
					List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("NAME", "admin");
					map.put("SEX","");
					map.put("NL","");
					map.put("SG","");
					map.put("TZ","");
					map.put("JH","");
					map.put("PHONE","");
					map.put("DBM","");
					list2.add(map);
					return list2;
				}
				
			}
			
		}
		List<Map<String, Object>> listS = new ArrayList<Map<String,Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("XM", "");
		map.put("SEX","");
		map.put("NL","");
		map.put("SG","");
		map.put("TZ","");
		map.put("JH","");
		map.put("PHONE","");
		map.put("DBM","");
		listS.add(map);
		return listS;
		
	}
	
	@RequestMapping("getuserinfos")
	public Object getuserinfos(HttpServletRequest request, HttpServletResponse response) {
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		String ss ="";
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			
//			String username = model.username;
			
			List<UserSession>  list= dbHelper.queryForObjectList("select * from grfz_user where username = '"+model.username+"'", UserSession.class);
			System.out.println(list.get(0).role+"123");
			/*for (int i = 0; i < list.size(); i++) {
				ss+= list.get(i).role+",";
			}*/
			for (int i = 0; i < list.size(); i++) {
				ss+= list.get(i).shuzhi;
			}
			/*List<UserSession>  list3= dbHelper.queryForObjectList("select * from grfz_qx where rolename = '"+list.get(0).role+"'", UserSession.class);
			for (int i = 0; i < list3.size(); i++) {
				ss+= list3.get(i).shuzhi+",";
			}*/
			List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("XM", "");
			map.put("SEX","");
			map.put("NL","");
			map.put("SG","");
			map.put("TZ","");
			map.put("JH","");
			map.put("PHONE","");
			map.put("DBM","");
			list2.add(map);
			
		}
		return ss;
	}
	
	@RequestMapping("getuserinfo")
	public Object getuserinfo(String JH,HttpServletRequest request, HttpServletResponse response) {
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		
		
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			
//			String username = model.username;
			if (!JH.equals("")) {

				List<Map<String, Object>> list= dbHelper.queryForList("select XM,SEX,NL,SG,TZ,JH,PHONE,DBM from GRFZ_JBXX where JH = ?", JH);
				System.out.println("233"+list.size());
				if (list.size()>0) {
					return list;
				}else{
					List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("XM", "");
					map.put("SEX","");
					map.put("NL","");
					map.put("SG","");
					map.put("TZ","");
					map.put("JH","");
					map.put("PHONE","");
					map.put("DBM","");
					list2.add(map);
					return list2;
				}
			
			}
			
			List<Map<String, Object>> list= dbHelper.queryForList("select XM,SEX,NL,SG,TZ,JH,PHONE,DBM from GRFZ_JBXX where JH = ?", model.username);
		 if (list.size()>0) {
			return list;
		}else{
			List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("XM", "");
			map.put("SEX","");
			map.put("NL","");
			map.put("SG","");
			map.put("TZ","");
			map.put("JH","");
			map.put("PHONE","");
			map.put("DBM","");
			list2.add(map);
			return list2;
		}
		}
		List<Map<String, Object>> listS = new ArrayList<Map<String,Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("XM", "");
		map.put("SEX","");
		map.put("NL","");
		map.put("SG","");
		map.put("TZ","");
		map.put("JH","");
		map.put("PHONE","");
		map.put("DBM","");
		listS.add(map);
		return listS;
		
	}
	
	//获取个人奖惩信息
	@RequestMapping(value = "getJCLists")
	public Object getLists(String GRHDW) {
		
		return dbHelper.QuerySPList("select * from GRFZ_JCDA WHERE GRHDW = ? order by JCDABH desc", GRHDW);
	}
	
	//获取岗位信息 画图
	@RequestMapping(value = "getDALists")
	public Object getDALists(String XM) {
			
		List<DAModels> list = dbHelper.queryForObjectList("select SJGWMC,NDCJPMQK,QSSJ from GRFZ_GWDA WHERE XM = '"+XM+"' order by QSSJ asc", DAModels.class);
//		System.out.println(list.get(0).getQSSJ());
		String s = "";
		String d = "";
		for (int i = 0; i < list.size(); i++) {
			s+= ","+list.get(i).getQSSJ()+list.get(i).getSJGWMC();
			d+=","+list.get(i).getNDCJPMQK();
		}
		System.out.println("233");
		return s+"|"+d;
	}
	
	
	//获取个人岗位信息
	@RequestMapping(value = "getDAPP")
	public Object getDAPP(String XM) {
			
		return  dbHelper.QuerySPList("select * from GRFZ_GWDA WHERE XM = ? order by QSSJ asc", XM);
		
	}
	
	//获取个人培训信息
		@RequestMapping(value = "getPXPP")
		public Object getPXPP(String XM) {
				
			return  dbHelper.QuerySPList("select * from GRFZ_PXDA WHERE XM = ? order by SJ asc", XM);
			
		}
		
		//获取个人兴趣信息
		@RequestMapping(value = "getXQPP")
		public Object getXQPP(String XM) {
				
			return  dbHelper.QuerySPList("select * from GRFZ_AHTCDA WHERE XM = ? ", XM);
			
		}
	
	//获取档案信息
	@RequestMapping(value = "getPXLists")
	public Object getPXDALists(String XM) {
				
		return dbHelper.QuerySPList("select * from GRFZ_PXDA WHERE XM = ? order by SJ desc", XM);
	}
	
	//获取投诉信息
		@RequestMapping(value = "getTSLists")
		public Object getTSLists(String JH) {
			String s = "123138";		
			return dbHelper.QuerySPList("select * from GRFZ_TSDA WHERE JH = ? order by BTSSJ desc", JH);
		}
		
	//获取投诉信息
				@RequestMapping(value = "getKHLists")
				public Object getKHLists(String XM) {
					String s = "123138";		
					return dbHelper.QuerySPList("select * from KHGL_BMEJKH where USERNAME = ? order by TIME desc", XM);
				}

}
