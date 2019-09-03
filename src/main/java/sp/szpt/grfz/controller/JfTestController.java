package sp.szpt.grfz.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
import sp.szpt.grfz.model.JFInfo;
import sp.szpt.grfz.model.JbxxModels;
import sp.szpt.grfz.model.JfModels;
import sp.szpt.grfz.model.LoginUserInfo;





@RequestMapping("jf")
@RestController
public class JfTestController {
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper() ;
	
	String name = "";
	@RequestMapping(value = "getLists")
	public Object getLists(JFInfo searchInfo) {
		
		return dbHelper.QuerySPList("select a.USERNAME,b.NAME,sum(b.ZHDF) as weidusum from roleuser a , guanlian b where A.ROLEID = B.GROWID group by a.USERNAME,b.NAME",searchInfo);
	}
	
	@RequestMapping(value = "getListss")
	public Object getListss(JFInfo searchInfo) {
		
		return null;
//		return dbHelper.QuerySPList("select a.USERNAME,b.NAME,b.ZHDF from roleuser a , guanlian b where A.ROLEID = B.GROWID group by a.USERNAME,b.NAME",searchInfo);
	}
	
	@RequestMapping(value = "xiangqing")
	public Object xiangqing(JFInfo searchInfo,String USERNAME,String NAME) {
		System.out.println(USERNAME+NAME);
		SPListModel<Map<String, Object>> querySPList = dbHelper.QuerySPList("select a.USERNAME,b.ZHDF,C.EVENTNAME from roleuser a , guanlian b , growevents c where A.ROLEID = B.GROWID and A.USERNAME = '"+USERNAME+"' and B.NAME = '"+NAME+"'  and C.GROWID = A.ROLEID and to_char(sysdate,'yyyymmdd')-TO_CHAR (TO_DATE (b.updatetime, 'yyyy-mm-dd hh24:mi:ss'), 'yyyymmdd') < ZQ group by a.USERNAME,b.ZHDF,C.EVENTNAME",searchInfo);
		return querySPList;
	}

}
