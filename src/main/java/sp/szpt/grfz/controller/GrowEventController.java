package sp.szpt.grfz.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.model.GrowEventSeachInfo;

@RestController
@RequestMapping("growevent")
public class GrowEventController {

	private IDbHelper dbHelper = DbHelperAccess.getDbhelper();

	// 初始化获取全部数据
	@RequestMapping(value = "getLists")
	public Object getLists(GrowEventSeachInfo searchInfo) {
		return dbHelper.QuerySPList("select * from growevents ", searchInfo);
	}
	


	// 删除数据
	@RequestMapping(value = "delLists")
	public Object delLists(String ID) {
		System.out.println(ID);
		int result = 0;
		String[] id = ID.split(",");
		for (int i = 0; i < id.length; i++) {
			result = dbHelper.update("delete from growevents WHERE GROWID = ?",
					id[i]);
		}
		return result;
	}

	// 添加
	@RequestMapping(value = "addField")
	public Object addField(String EVENTTYPE, String EVENTNAME,
			String EVENTDESC, String CREATEPEOPLE) {
		SPResult result = new SPResult();
		DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String formatDate = dFormat.format(new Date());
		String id = UUID.randomUUID().toString().replace("-", "");
		result.setErrcode(dbHelper
				.update("INSERT INTO growevents (GROWID,EVENTNAME,EVENTTYPE ,EVENTDESC,CREATETIME,CREATEPEOPLE) VALUES(?,?,?,?,?,?)",
						id, EVENTNAME, EVENTTYPE, EVENTDESC, formatDate,
						CREATEPEOPLE));
		return result;
	}

	// 编辑
	@RequestMapping(value = "editField")
	public Object editField(String ID,String EVENTTYPE, String EVENTNAME,
			String EVENTDESC, String UPPEOPLE) {
		System.out.println(ID+UPPEOPLE);
		SPResult result = new SPResult();
		DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String formatDate = dFormat.format(new Date());
		result.setErrcode(dbHelper
				.update("UPDATE  growevents SET EVENTNAME = ?,EVENTTYPE = ?,EVENTDESC = ?,UPTIME = ?,UPPEOPLE = ? WHERE GROWID = ?",
						EVENTNAME, EVENTTYPE, EVENTDESC, formatDate,
						UPPEOPLE,ID));
		return result;
	}

}
