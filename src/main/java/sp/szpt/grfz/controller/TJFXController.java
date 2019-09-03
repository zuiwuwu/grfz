package sp.szpt.grfz.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sp.szpt.common.Controller;
import sp.szpt.common.string;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.grfz.model.JTLLDBSearchInfo;
@RestController
@RequestMapping("TJFX")
public class TJFXController extends Controller {
	
	private IDbHelper dbHelper  = DbHelperAccess.GetDbHelper();
	
	@RequestMapping("BMDB")
	public Object TJ(JTLLDBSearchInfo searchInfo) {
		return searchInfo.GetTJ();
	}
	
	@RequestMapping("getAlldata")
	public Object getAlldata(String DEPTNAME) {
		if("全局".equals(DEPTNAME)){
			DEPTNAME = "";
		}
		Map<String, Object> Allmap = new HashMap<String, Object>();
		List<Map<String, Object>> mapdatalist = new ArrayList<Map<String,Object>>();
		   mapdatalist = getmapdataMap(DEPTNAME);
		List<Map<String, Object>> funsiondatalist = new ArrayList<Map<String,Object>>();
		   funsiondatalist = getfunsiondataMap(DEPTNAME);
		List<Map<String, Object>> piedatalist = new ArrayList<Map<String,Object>>();
		    piedatalist = getpiedataMap(DEPTNAME);
		List<Map<String, Object>> cyclePiedatalist = new ArrayList<Map<String,Object>>();   
		    cyclePiedatalist = getcyclePiedataMap(DEPTNAME);
		List<Map<String, Object>> barChartdatalist = new ArrayList<Map<String,Object>>();   
		    barChartdatalist = getbarChartdataMap(DEPTNAME);
		List<Map<String, Object>> rosePiedatalist = new ArrayList<Map<String,Object>>();
		    rosePiedatalist = getrosePiedataMap(DEPTNAME);
		List<Map<String, Object>> vfunsiondatalist = new ArrayList<Map<String,Object>>();
		    vfunsiondatalist = getvfunsiondataMap(DEPTNAME);
		Allmap.put("mapdata", mapdatalist);
		Allmap.put("funsiondata", funsiondatalist);
		Allmap.put("piedata", piedatalist);
		Allmap.put("cyclePiedata", cyclePiedatalist);
		Allmap.put("barChartdata", barChartdatalist);
		Allmap.put("rosePiedata", rosePiedatalist);
		Allmap.put("vfunsiondata", vfunsiondatalist);
		
		return Allmap;
	}


	private List<Map<String, Object>> getvfunsiondataMap(String DEPTNAME) {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		if(!string.IsNullOrEmpty(DEPTNAME)){
			list = dbHelper.queryForList("SELECT COUNT(*) COUNT,JRFS FROM GRFZ_JBXX WHERE DWJC = ? GROUP BY JRFS", DEPTNAME);
		}else{
			list = dbHelper.queryForList("SELECT COUNT(*) COUNT,JRFS FROM GRFZ_JBXX  GROUP BY JRFS");
		}
		return list;
	}

	private List<Map<String, Object>> getrosePiedataMap(String DEPTNAME) {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		Map<String, Object> map1 = new HashMap<String, Object>();
		Map<String, Object> map2 = new HashMap<String, Object>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		Map<String, Object> map4 = new HashMap<String, Object>();
		Map<String, Object> map5 = new HashMap<String, Object>();
		Map<String, Object> map6 = new HashMap<String, Object>();
		Integer total1 = 0;
		Integer total2 = 0;
		Integer total3 = 0;
		Integer total4 = 0;
		Integer total5 = 0;
		Integer total6 = 0;
		if(!string.IsNullOrEmpty(DEPTNAME)){
			 total1 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '已销假' and  DWJC = ?", Integer.class,DEPTNAME);
			 total2 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '已续假' and  DWJC = ?", Integer.class,DEPTNAME);
			 total3 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '未销假' and  DWJC = ?", Integer.class,DEPTNAME);
			 total4 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '矿工' and  DWJC = ?", Integer.class,DEPTNAME);
			 total5 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '逾期不归' and  DWJC = ?", Integer.class,DEPTNAME);
			 total6 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '其他' and  DWJC = ?", Integer.class,DEPTNAME);
		}else{
			 total1 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '已销假' ", Integer.class);
			 total2 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '已续假' ", Integer.class);
			 total3 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '未销假' ", Integer.class);
			 total4 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '矿工' ", Integer.class);
			 total5 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '逾期不归' ", Integer.class);
			 total5 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  XJWCQK = '其他' ", Integer.class);
		}
		map1.put("value", total1);
		map1.put("name", "已销假");
		map2.put("value", total2);
		map2.put("name", "已续假");
		map3.put("value", total3);
		map3.put("name", "未销假");
		map4.put("value", total4);
		map4.put("name", "矿工");
		map5.put("value", total5);
		map5.put("name", "逾期不归");
		map5.put("value", total6);
		map5.put("name", "其他");
		list.add(map1);
		list.add(map2);
		list.add(map3);
		list.add(map4);
		list.add(map5);
		list.add(map6);
		return list;
	}

	private List<Map<String, Object>> getbarChartdataMap(String DEPTNAME) {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		if(!string.IsNullOrEmpty(DEPTNAME)){
			list = dbHelper.queryForList("SELECT COUNT(*) COUNT,GRADE FROM VIEW_GRFZ_GWYNDKH WHERE XGZDW = ? GROUP BY GRADE", DEPTNAME);
		}else{
			list = dbHelper.queryForList("SELECT COUNT(*) COUNT,GRADE FROM VIEW_GRFZ_GWYNDKH  GROUP BY GRADE");
		}
		return list;
	}

	private List<Map<String, Object>> getcyclePiedataMap(String DEPTNAME) {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		Map<String, Object> map1 = new HashMap<String, Object>();
		Map<String, Object> map2 = new HashMap<String, Object>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		Map<String, Object> map4 = new HashMap<String, Object>();
		Integer total1 = 0;
		Integer total2 = 0;
		Integer total3 = 0;
		Integer total4 = 0;
		if(!string.IsNullOrEmpty(DEPTNAME)){
			 total1 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1990' ) and  DWJC = ?", Integer.class,DEPTNAME);
			 total2 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1980' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1990') and  DWJC = ?", Integer.class,DEPTNAME);
			 total3 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1970' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1980') and  DWJC = ?", Integer.class,DEPTNAME);
			 total4 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1960' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1970') and  DWJC = ?", Integer.class,DEPTNAME);
		}else{
			 total1 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1990' )", Integer.class);
			 total2 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1980' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1990')", Integer.class);
			 total3 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1970' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1980')", Integer.class);
			 total4 = dbHelper.queryForObject("select COUNT(*) from  GRFZ_JBXX  where  (to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')>='1960' and to_char(to_date(CSRQ,'yyyy-mm-ddhh24:MI:SS'),'yyyy')<'1970')", Integer.class);
		}
		map1.put("value", total1);
		map1.put("name", "90后");
		map2.put("value", total2);
		map2.put("name", "80后");
		map3.put("value", total3);
		map3.put("name", "70后");
		map4.put("value", total4);
		map4.put("name", "60后");
		list.add(map1);
		list.add(map2);
		list.add(map3);
		list.add(map4);
		return list;
	}

	private List<Map<String, Object>> getfunsiondataMap(String dEPTNAME) {
		// TODO Auto-generated method stub
		return null;
	}

	private List<Map<String, Object>> getmapdataMap(String dEPTNAME) {
		// TODO Auto-generated method stub
		return null;
	}

	private List<Map<String, Object>> getpiedataMap(String DEPTNAME) {

		// TODO Auto-generated method stub
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		Map<String, Object> map1 = new HashMap<String, Object>();
		Map<String, Object> map2 = new HashMap<String, Object>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		Map<String, Object> map4 = new HashMap<String, Object>();
		Map<String, Object> map5 = new HashMap<String, Object>();
		Integer total1 = 0;
		Integer total2 = 0;
		Integer total3 = 0;
		Integer total4 = 0;
		Integer total5 = 0;
		if(!string.IsNullOrEmpty(DEPTNAME)){
			 total1 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=0 OR GL <=5) AND DWJC = ?", Integer.class,DEPTNAME);
			 total2 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=6 OR GL <=10) AND DWJC = ?", Integer.class,DEPTNAME);
			 total3 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=11 OR GL <=15) AND DWJC = ?", Integer.class,DEPTNAME);
			 total4 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=16 OR GL <=20) AND DWJC = ?", Integer.class,DEPTNAME);
			 total5 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >20) AND DWJC = ?", Integer.class,DEPTNAME);
		}else{
			 total1 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=0 OR GL <=5)", Integer.class);
			 total2 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=6 OR GL <=10)", Integer.class);
			 total3 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=11 OR GL <=15)", Integer.class);
			 total4 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >=16 OR GL <=20)", Integer.class);
			 total5 = dbHelper.queryForObject("SELECT COUNT(*) FROM VIEW_GRFZ_SEARCH WHERE (GL >20) ", Integer.class);
		}
		map1.put("value", total1);
		map1.put("name", "0-5年");
		map2.put("value", total2);
		map2.put("name", "6-10年");
		map3.put("value", total3);
		map3.put("name", "11-15年");
		map4.put("value", total4);
		map4.put("name", "16-20年");
		map5.put("value", total5);
		map5.put("name", "20年以上");
		list.add(map1);
		list.add(map2);
		list.add(map3);
		list.add(map4);
		list.add(map5);
		return list;
	
	}

}
