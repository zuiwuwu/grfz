package sp.szpt.grfz.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sp.szpt.common.Controller;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
@RestController
@RequestMapping("zhpg")
public class zhpgController extends Controller {
	
	private IDbHelper dbHelper  = DbHelperAccess.GetDbHelper();
	
	
	@RequestMapping("getryb")
	public Object getryb() {
		/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
		SPListModel<Map<String,Object>> splist = new SPListModel<Map<String,Object>>();
		
		for (int i = 0; i < 10; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("NAME", "谷谷"+i);
			map.put("RYMC", "一等奖"+i);
			splist.rows.add(map);
			
			
			
		}
		
		/*Map<String, Object> map = new HashMap<String, Object>();
		map.put("NAME", "谷谷");
		map.put("RYMC", "一等奖");
		splist.rows.add(map);
		
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("NAME", "s谷谷");
		map2.put("RYMC", "s一等奖");
		splist.rows.add(map2);
	
		Map<String, Object> map3 = new HashMap<String, Object>();
		map3.put("NAME", "x谷谷");
		map3.put("RYMC", "x一等奖");
		splist.rows.add(map3);*/
		
		splist.total=10;
		return splist;
	}
	
	
	//月度先进之星
	@RequestMapping("getydzx")
	public Object getydzx(String bm) {
		/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
		System.out.println(bm+"999");
//		return dbHelper.QuerySPList("select * from (SELECT username,usertype ,score, row_number() OVER(PARTITION BY usertype ORDER BY score desc) e FROM  KHGL_FJBMTXKH) t where e <= 2");			
		return dbHelper.QuerySPList("select * from KHGL_FJBMTXKH t where (select count(2) from KHGL_FJBMTXKH where USERTYPE=t.USERTYPE and SCORE>t.SCORE)<=2 and USERTYPE in('社区民警','案件民警') UNION select * from KHGL_FJBMTXKH t where (select count(0) from KHGL_FJBMTXKH where USERTYPE=t.USERTYPE and SCORE>t.SCORE)<=0 and USERTYPE in('内勤民警','机关民警')");
	}
	
	
	//月度后进之星
		@RequestMapping("getydhj")
		public Object getydhj(String bm) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
			System.out.println(bm);
//			return dbHelper.QuerySPList("select * from (SELECT username,usertype ,score, row_number() OVER(PARTITION BY usertype ORDER BY score desc) e FROM  KHGL_FJBMTXKH) t where e <= 2");			
			return dbHelper.QuerySPList("select * from (SELECT username,deptname,usertype ,score, row_number() OVER(PARTITION BY usertype ORDER BY score asc) e FROM  KHGL_FJBMTXKH) t where e <= 1");
		}
	

	//警力资源对比
		@RequestMapping("getjlzydb")
		public Object getjlzydb(String ss) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
			System.out.println(ss+"222");
			int a[]; a = new int[5] ; 

			int b=(int)(Math.random()*10);
			if(ss.equals("局领导")){
				
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("政工纪检室")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("综合保障室")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("情报指挥室")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("执法监督室")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("维稳服从队")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("案件侦办队")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("治安防控队")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("明珠派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("寺港派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("滨江派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("周山河街区派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("野徐派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}else if(ss.equals("医药城派出所")){
				a[0] = b;a[1] = b;a[2]=b;a[3] = b;a[4] = b;
			}
			return a;
		}
	
		//休假情况
		@RequestMapping("getgbmxjqk")
		public Object getgbmxjqk(String ss) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
			System.out.println(ss+"222");
			int a[]; a = new int[3] ; 

			int b=(int)(Math.random()*10);
			if(ss.equals("局领导")){
				
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("政工纪检室")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("综合保障室")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("情报指挥室")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("执法监督室")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("维稳服从队")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("案件侦办队")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("治安防控队")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("明珠派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("寺港派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("滨江派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("周山河街区派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("野徐派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}else if(ss.equals("医药城派出所")){
				a[0] = b;a[1] = b;a[2]=b;
			}
			return a;
		}
		
		@RequestMapping("getbjqk")
		public Object getbjqk(String bm) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
		
			SPListModel<Map<String, Object>> ss = null;
			if(!bm.equals("全局")){
				ss = dbHelper.QuerySPList("select XM,DBM from grfz_jbxx WHERE JQLB = '病假' AND DBM = ?",bm);		
			}else{
				ss = dbHelper.QuerySPList("select count(JQLB) as JQLB,DBM from grfz_jbxx WHERE JQLB = '病假' group by JQLB,DBM");	
			}
			
			return	ss;		
		}
		
		@RequestMapping("getsjqk")
		public Object getsjqk(String bm) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
			
			SPListModel<Map<String, Object>> ss = null;
			if(!bm.equals("全局")){
				ss = dbHelper.QuerySPList("select XM,DBM from grfz_jbxx WHERE JQLB = '事假' AND DBM = ?",bm);		
			}else{
				ss = dbHelper.QuerySPList("select count(JQLB) as JQLB,DBM from grfz_jbxx WHERE JQLB = '事假' group by JQLB,DBM");	
			}
			
			return	ss;
		}
		
		@RequestMapping("getnjqk")
		public Object getnjqk(String bm) {
			/*return dbHelper.QuerySPList("SELECT * FROM VIEW_YJYD_DWINFO WHERE ISDEL = '0'",searchInfo,AddQDDW.class);*/
			SPListModel<Map<String, Object>> ss = null;
			if(!bm.equals("全局")){
				ss = dbHelper.QuerySPList("select XM,DBM from grfz_jbxx WHERE JQLB = '年休假' AND DBM = ?",bm);		
			}else{
				ss = dbHelper.QuerySPList("select count(JQLB) as JQLB,DBM from grfz_jbxx WHERE JQLB = '年休假' group by JQLB,DBM");	
			}
			
			return	ss;		
		}
	
}
