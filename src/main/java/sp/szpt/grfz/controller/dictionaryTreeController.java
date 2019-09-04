/*package sp.szpt.grfz.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import sp.szpt.common.ExtTreeNodeInfoModel;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.ElsearchModels;
import sp.szpt.grfz.common.EventTree;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.TreeInfo;
import sp.szpt.grfz.common.TreeInfo2;
import sp.szpt.grfz.common.TreeInfo3;
import sp.szpt.grfz.common.ZuZhiTree;
import sp.szpt.grfz.model.GRFZ_JBXXModels;
import sp.szpt.grfz.model.GRFZ_JLModels;
import sp.szpt.grfz.model.GrowEventSeachInfo;
import sp.szpt.grfz.model.JFInfo;

@RestController
@RequestMapping("dictionary")
public class dictionaryTreeController {
	
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper();
	
	//全文检索
	@RequestMapping(value="getSearchLists")
	public  Object getsearchLists(HttpServletRequest request, HttpServletResponse response,String serachtext){ 
		
		if(serachtext!=null&&!serachtext.equals("")){
			System.out.println(serachtext);
			sp.szpt.grfz.controller.TestEsClient client = new sp.szpt.grfz.controller.TestEsClient();
			SearchHits searchHits = client.ss(serachtext);
			System.out.println("共匹配到:"+searchHits.getTotalHits()+"条记数据");
			String ss = "";
			String dd = "";
		
			List<ElsearchModels> list = new ArrayList<ElsearchModels>();
			for (SearchHit hit:searchHits) {
				System.out.println(hit.getSourceAsString());
				Gson gs = new Gson();
				String json = hit.getSourceAsString();
				ElsearchModels els = gs.fromJson(json, ElsearchModels.class);
				HighlightField name = hit.getHighlightFields().get("xm");
				if(name != null){
					els.setXm(name.fragments()[0].toString());
				}
				HighlightField sex = hit.getHighlightFields().get("sex");
				if(sex != null){
					els.setSex(sex.fragments()[0].toString());
				}
				HighlightField nl = hit.getHighlightFields().get("nl");
				if(nl != null){
					els.setNl(nl.fragments()[0].toString());
				}
				HighlightField mz = hit.getHighlightFields().get("mz");
				if(mz != null){
					els.setMz(mz.fragments()[0].toString());
				}
				HighlightField csd = hit.getHighlightFields().get("csd");
				if(csd != null){
					els.setCsd(csd.fragments()[0].toString());
				}
				HighlightField zw = hit.getHighlightFields().get("zw");
				if(zw != null){
					els.setZw(zw.fragments()[0].toString());
				}
				HighlightField dbm = hit.getHighlightFields().get("dbm");
				if(dbm != null){
					els.setDbm(dbm.fragments()[0].toString());
				}
				HighlightField xgzdw = hit.getHighlightFields().get("xgzdw");
				if(xgzdw != null){
					els.setXgzdw(xgzdw.fragments()[0].toString());
				}
				els.setUrl("http://192.168.1.200:8080/grfz/grfz/xinxi?JH="+els.getJh());
				list.add(els);				
			}
			ModelAndView modelAndView = new ModelAndView();
	        modelAndView.setViewName("search");
	        modelAndView.addObject("articles", list);
			String classnameString = request.getParameter("class");
			if(StringUtils.isEmpty(classnameString))
				classnameString = "App.grczpt.Home.elsearch";
			Map<String, Object> mapparams = new HashMap<String, Object>(10);
			mapparams.put("class", classnameString);
	        mapparams.put("articles",list);
	        ModelAndView mv1 = new ModelAndView("/index/search", "commparams",
					mapparams);
	        mv1.setViewName("/index/search");
	        mv1.addObject("articles",list);
	        mv1.addObject("count",searchHits.getTotalHits());
	        mv1.addObject("queryString",serachtext);
			return  mv1;
			for(SearchHit hit:searchHits){
                System.out.println("String方式打印文档搜索内容:");
//                System.out.println(hit.getSourceAsString()+hit.getId());
                ss+=hit.getSourceAsString()+"~";
                dd+=hit.getId()+",";
            }
			System.out.println(ss);
			return ss+"$"+dd;

		}else{
			System.out.println("没有值");
			return  null;
		}
    }
	

	//组织架构管理树
	@RequestMapping(value = "zuzhi")
	public Object test() {	
	Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
	List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
	
	SPListModel <ZuZhiTree> rightslist1 = dbHelper.QuerySPList("select id,title from TESTZUZHI WHERE PARENTID is null",ZuZhiTree.class);
	SPListModel <ZuZhiTree> rightslist2 = dbHelper.QuerySPList("select id,title,parentid from TESTZUZHI WHERE PARENTID is not null",ZuZhiTree.class);
//	SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
	// 遍历节点
	for (ZuZhiTree tree : rightslist1.rows) {
		ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
		model.id = tree.ID; 
		model.text = tree.TITLE; 
		//model.parentId = tree.PARENTID;
		mapunits.put(model.id , model);
		groupList.add(model);
	}
	
	// 遍历节点
		for (ZuZhiTree tree : rightslist2.rows) {
			ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
			model2.id = tree.ID; 
			model2.text = tree.TITLE; 
			//model.parentId = tree.PARENTID;
			model2.parentId = tree.PARENTID;
			mapunits.put(model2.id , model2);
			groupList.add(model2);
		}
		
	// 节点加入父节点
	for (ExtTreeNodeInfoModel node : groupList) {
		ExtTreeNodeInfoModel model = mapunits.get(node.parentId);
		if (model != null) {
			model.AddChild(node);
		} else {
			node.parentId = null;
		}
	}
	
		
	List<ExtTreeNodeInfoModel> rootnodes = new ArrayList<ExtTreeNodeInfoModel>();
	
	String GID = "";
	if ("".equals(GID) || GID == null || "0".equals(GID)) {
		// 查找顶节点
		for (ExtTreeNodeInfoModel node : groupList) {
			if ("".equals(node.parentId) || node.parentId == null) {
				rootnodes.add(node);
			}
		}
	} else {
		ExtTreeNodeInfoModel node = mapunits.get(GID);
		if (node != null) {
			
			if (node.children != null) 
				rootnodes = node.children;
		}
	}		
	return rootnodes;
}
	
	//生成组织架构图
	@RequestMapping(value = "zuzhis")
	public Object test1(String s) {	
		
	Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
	List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
	
	System.out.println(s);
	String table = "";
	if (s.equals("局领导")) {
		table = "ZZ_GRFZ_LD";
	}else if(s.equals("滨江派出所")){
		table = "TESTZUZHI";
	}else if(s.equals("政工纪检室")){
		table = "ZZ_GRFZ_ZG";
	}else if(s.equals("综合保障室")){
		table = "ZZ_GRFZ_ZHBZS";
	}else if(s.equals("情报指挥室")){
		table = "ZZ_GRFZ_QBZHS";
	}else if(s.equals("执法监督室")){
		table = "ZZ_GRFZ_ZFJDS";
	}else if(s.equals("寺港派出所")){
		table = "ZZ_GRFZ_SXDW";
	}else if(s.equals("案件侦办队")){
		table = "ZZ_GRFZ_AJZBD";
	}else if(s.equals("治安防控队")){
		table = "ZZ_GRFZ_ZAFKD";
	}else if(s.equals("明珠派出所")){
		table = "ZZ_GRFZ_MZDW";
	}else if(s.equals("维稳服务队")){
		table = "ZZ_GRFZ_WMFW";
	}else if(s.equals("周山河街区派出所")){
		table = "ZZ_GRFZ_ZSDW";
	}else if(s.equals("野徐派出所")){
		table = "ZZ_GRFZ_TXPCS";
	}else if(s.equals("医药城派出所")){
		table = "ZZ_GRFZ_YYCPCS";
	}
	
	SPListModel <ZuZhiTree> rightslist1 = dbHelper.QuerySPList("select id,title,name from "+table+" WHERE PARENTID is null",ZuZhiTree.class);
	SPListModel <ZuZhiTree> rightslist2 = dbHelper.QuerySPList("select id,title,name,parentid from "+table+" WHERE PARENTID is not null",ZuZhiTree.class);
//	SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
	// 遍历节点
	for (ZuZhiTree tree : rightslist1.rows) {
		ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
		model.id = tree.ID; 
		model.name = tree.TITLE;
		model.title = tree.NAME;
		//model.parentId = tree.PARENTID;
		mapunits.put(model.id , model);
		groupList.add(model);
	}
	
	// 遍历节点
		for (ZuZhiTree tree : rightslist2.rows) {
			ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
			model2.id = tree.ID; 
			model2.name = tree.TITLE; 
			model2.title = tree.NAME;
			//model.parentId = tree.PARENTID;
			model2.parentId = tree.PARENTID;
			mapunits.put(model2.id , model2);
			groupList.add(model2);
		}
		
	// 节点加入父节点
	for (ExtTreeNodeInfoModel node : groupList) {
		ExtTreeNodeInfoModel model = mapunits.get(node.parentId);
		if (model != null) {
			model.AddChild(node);
		} else {
			node.parentId = null;
		}
	}
	
		
	List<ExtTreeNodeInfoModel> rootnodes = new ArrayList<ExtTreeNodeInfoModel>();
	
	String GID = "";
	if ("".equals(GID) || GID == null || "0".equals(GID)) {
		// 查找顶节点
		for (ExtTreeNodeInfoModel node : groupList) {
			if ("".equals(node.parentId) || node.parentId == null) {
				rootnodes.add(node);
			}
		}
	} else {
		ExtTreeNodeInfoModel node = mapunits.get(GID);
		if (node != null) {
			
			if (node.children != null) 
				rootnodes = node.children;
		}
	}
	String obj = "";
	String a = "滨江派出所";
	for (int i = 0; i < rootnodes.size(); i++) {
		if(s.equals(rootnodes.get(i).name)){
			
			ExtTreeNodeInfoModel js = rootnodes.get(i);
			Gson gson=new Gson();
			obj=gson.toJson(js);
			
			System.out.println(obj);
		}
	}
	
	return obj;
}
	
	//获取部门成员奖励信息
	@RequestMapping(value = "getListsss")
	public Object getListsss(String s ,GRFZ_JLModels searchInfo) {
	
		return dbHelper.QuerySPList("select * from GRFZ_JCDA where SSDW = '"+s+"' and GRHDW != '"+s+"'", searchInfo);
	}
	
	
	//获取部门奖励信息
	@RequestMapping(value = "getLists")
	public Object getLists(String s ,GRFZ_JLModels searchInfo) {
	
		return dbHelper.QuerySPList("select * from GRFZ_JCDA where GRHDW = '"+s+"'", searchInfo);
	}
	
	@RequestMapping(value = "getListss")
	public Object getListss(String s ,GRFZ_JLModels searchInfo) {
	
		return dbHelper.QuerySPList("select * from KHGL_QYYKH where DWNAME = '"+s+"'", searchInfo);
	}
	
	
	
	@RequestMapping(value = "getListsS")
	public Object getLists(JFInfo searchInfo , String grade,String deptname) {
		//百分比取值
		if (grade.equals("1")) {
			return dbHelper.QuerySPList("select * from (select id,name,score,rownum rn from ERJIKAOHE where grade != '无等级')  where rownum <= (select max(rownum)*0.2 from ERJIKAOHE)",searchInfo);
		}else if(grade.equals("2")){
			return dbHelper.QuerySPList("select * from (select id,name,score,rownum rn from ERJIKAOHE where grade != '无等级' ) where rn >= (select max(rownum)*0.2 from ERJIKAOHE) and rn <= (select max(rownum)*0.6 from ERJIKAOHE)",searchInfo);
		}else if(grade.equals("3")){
			return dbHelper.QuerySPList("select * from (select id,name,score,rownum rn from ERJIKAOHE where grade != '无等级') where rn >= (select max(rownum)*0.6 from ERJIKAOHE) and rn <= (select max(rownum)*0.9 from ERJIKAOHE)",searchInfo);
		}else if(grade.equals("4")){
			return dbHelper.QuerySPList("select * from (select id,name,score,rownum rn from ERJIKAOHE where grade != '无等级') where rn >= (select max(rownum)*0.9 from ERJIKAOHE)",searchInfo);
		}else if(grade.equals("5")){
			return dbHelper.QuerySPList("select * from ERJIKAOHE where grade = '无等级' order by score desc",searchInfo);
		}
		
		//直接按照等级取值
		System.out.println(grade+deptname);
		if (grade.equals("1")) {
			return dbHelper.QuerySPList("select * from KHGL_BMEJKH  where GRADE = '一级' AND DEPTNAME = '"+deptname+"'",searchInfo);
		}else if(grade.equals("2")){
			return dbHelper.QuerySPList("select * from KHGL_BMEJKH  where GRADE = '二级' AND DEPTNAME = '"+deptname+"'",searchInfo);
		}else if(grade.equals("3")){
			return dbHelper.QuerySPList("select * from KHGL_BMEJKH  where GRADE = '三级' AND DEPTNAME = '"+deptname+"'",searchInfo);
		}else if(grade.equals("4")){
			return dbHelper.QuerySPList("select * from KHGL_BMEJKH  where GRADE = '四级' AND DEPTNAME = '"+deptname+"'",searchInfo);
		}else if(grade.equals("5")){
			return dbHelper.QuerySPList("select * from KHGL_BMEJKH  where GRADE = '无等级' AND DEPTNAME = '"+deptname+"'",searchInfo);
		}
		return null;
				
	}
}*/