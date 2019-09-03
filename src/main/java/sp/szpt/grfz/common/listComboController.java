package sp.szpt.grfz.common;

import org.springframework.web.bind.annotation.RequestMapping;
import sp.szpt.grfz.model.JFPMSearchInfo;
import org.springframework.web.bind.annotation.RestController;

import sp.szpt.common.Controller;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

@RestController
@RequestMapping("listCombo")
public class listComboController extends Controller{

	private IDbHelper dbHelper  = DbHelperAccess.GetDbHelper();
	
	/**
	 * 大部门列表
	 * @return
	 */
	@RequestMapping(value="listDept")
	public  Object listDept(){ 
		//return dbHelper.QuerySPList("SELECT DBM DEPTNAME FROM GRFZ_KHDA GROUP BY DBM");
		return dbHelper.QuerySPList("SELECT DBM DEPTNAME FROM GRFZ_JBXX where DBM IS NOT NULL GROUP BY DBM");
    }
	
	/** 
	 * 警员属性列表
	 * @return
	 */
	@RequestMapping(value="listJYSX")
	public  Object listJYSX(){ 
		//return dbHelper.QuerySPList("SELECT JYSX FROM GRFZ_KHDA GROUP BY JYSX");
		return dbHelper.QuerySPList("SELECT JZ JYSX  FROM GRFZ_JBXX where JZ IS NOT NULL GROUP BY JZ");
    }
	
	
	@RequestMapping(value="listEvent")
	public  Object listEvent(){ 
		return dbHelper.QuerySPList("SELECT EVENTNAME EVENT FROM GROWEVENTS GROUP BY EVENTNAME");
    }
	
	
	@RequestMapping(value="listDimensionality")
	public  Object listDimensionality(){ 
		return dbHelper.QuerySPList("SELECT NAME  DIMENSIONNAME  FROM DIMENSION GROUP BY NAME");
    }
	
	@RequestMapping(value="listUser")
	public  Object listUser(){ 
		return dbHelper.QuerySPList("select B.XM from grfz_user A LEFT JOIN GRFZ_JBXX B ON A.USERNAME = B.JH where B.XM IS NOT NULL");
    }
	
	
	@RequestMapping(value="getLists")
	public  Object getLists(JFPMSearchInfo  JFPMSearchInfo ){ 
		return dbHelper.QuerySPList("SELECT a.XM,a.DBM,a.JZ ,B.EVENTNAME,B.NAME,B.ZHDF FROM GRFZ_JBXX a left join (SELECT D.USERNAME,K.NAME,SUM(K.ZHDF) AS ZHDF,WM_CONCAT (DISTINCT C.EVENTNAME) AS EVENTNAME FROM ROLEUSER D LEFT JOIN GROWEVENTS C ON D.ROLEID = C.GROWID left join (SELECT * FROM GUANLIAN WHERE to_char(sysdate,'yyyymmdd')-TO_CHAR (TO_DATE (updatetime, 'yyyy-mm-dd hh24:mi:ss'), 'yyyymmdd') < ZQ) K on K.GROWID = D.ROLEID  GROUP BY  D.USERNAME,K.NAME) B ON B.USERNAME = A .XM",JFPMSearchInfo);
    }
	
	
}
