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

import sp.szpt.common.CommonMethod;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.model.DimensionInfo;
import sp.szpt.grfz.model.DimensionModels;
import sp.szpt.grfz.model.GRFZDB;
import sp.szpt.grfz.model.JbxxModels;
import sp.szpt.grfz.model.Login;
import sp.szpt.grfz.model.LoginUserInfo;





@RequestMapping("user")
@RestController
public class UserLoginController {
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper() ;
	
	
	@RequestMapping(value = "getLists")
	public Object getLists(LoginUserInfo searchInfo) {
		SPListModel<Map<String, Object>> querySPList = dbHelper.QuerySPList("select * from grfz_user",searchInfo);
		
		return querySPList;
	}
	
	@RequestMapping(value = "upLists")
	public Object upLists(String USERID) {
		SPResult result = new SPResult();
		String new_password = "123456";
		result.setErrcode(dbHelper.update("UPDATE grfz_user SET PASSWORD = ? WHERE USERID = ?",CommonMethod.MD5(new_password),USERID));		
		return result;
	}
	
	@RequestMapping(value = "addLists")
	public Object addLists(String USERNAME, String XM,
			String password1, String password2) {
		SPResult result = new SPResult();
		String id =UUID.randomUUID().toString().replace("-", "");
		if (!password1.equals(password2)) {
			return "2次密码不一致 请重新输入";
		}else{
		result.setErrcode(dbHelper.update("INSERT INTO grfz_user (USERID,USERNAME,NAME,PASSWORD) VALUES (?,?,?,?)",id,USERNAME,XM,CommonMethod.MD5(password1)));		
		return result;
		}
	}

	@RequestMapping(value = "delLists")
	public Object delLists(String ID) {
		SPResult result = new SPResult();
		String[] ids = ID.split(",");
		for (int i = 0; i < ids.length; i++) {
			result.setErrcode(dbHelper.update(
					"delete from grfz_user where USERID = ?", ids[i]));
		}
		return result;
	}
	
	@RequestMapping(value = "addRoleLists")
	public Object addRoleLists(String ROLENAME) {
		SPResult result = new SPResult();
		String id =UUID.randomUUID().toString().replace("-", "");
		
		result.setErrcode(dbHelper.update("INSERT INTO grfz_QX (ID,ROLENAME) VALUES (?,?)",id,ROLENAME));		
		return result;
		
	}

	@RequestMapping(value = "delRoleLists")
	public Object delRoleLists(String ID) {
		SPResult result = new SPResult();
		String[] ids = ID.split(",");
		for (int i = 0; i < ids.length; i++) {
			result.setErrcode(dbHelper.update(
					"delete from grfz_QX where ID = ?", ids[i]));
		}
		return result;
	}
	
}
