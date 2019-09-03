package sp.szpt.grfz.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import sp.szpt.common.ExtTreeNodeInfoModel;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.EventTree;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.TreeInfo;
import sp.szpt.grfz.common.TreeInfo2;
import sp.szpt.grfz.common.TreeInfo3;


@RestController
@RequestMapping("dictionarys")
public class EventTreeController {
	
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper();
	
	
	@RequestMapping(value = "listsyjbTree")
	public Object listsyjbTree() {	
	Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
	List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
	
	SPListModel <EventTree> rightslist1 = dbHelper.QuerySPList("select id,text from EVENTTREE WHERE PARENTID is null",EventTree.class);
	SPListModel <EventTree> rightslist2 = dbHelper.QuerySPList("select id,text,parentid from EVENTTREE WHERE PARENTID is not null",EventTree.class);
//	SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
	
	//SPListModel <EventTree> rightslist1 = dbHelper.QuerySPList("select a.XM,a.ZW,a.jh, b.JGCC from GRFZ_JBXX  a left join JHANDJG  b on a.jh= B.JH whe",EventTree.class);	
	
	
	// 遍历节点
	for (EventTree tree : rightslist1.rows) {
		ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
		model.id = tree.ID; 
		model.text = tree.TEXT; 
		//model.parentId = tree.PARENTID;
		mapunits.put(model.id , model);
		groupList.add(model);
	}
	
	// 遍历节点
		for (EventTree tree : rightslist2.rows) {
			ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
			model2.id = tree.ID; 
			model2.text = tree.TEXT; 
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
	
/*	// 遍历节点
			for (TreeInfo3 tree : rightslist3.rows) {
				ExtTreeNodeInfoModel model3 = new ExtTreeNodeInfoModel();
				model3.id = tree.ID; 
				model3.text = tree.NAME; 
				//model.parentId = tree.PARENTID;
				model3.parentId = tree.WDTID;
				mapunits.put(model3.id , model3);
				groupList.add(model3);
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
		*/
		
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
	
		
		
		@RequestMapping(value = "zuzhi")
		public Object test() {	
		Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
		List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
		
		SPListModel <EventTree> rightslist1 = dbHelper.QuerySPList("select id,text from EVENTTREE WHERE PARENTID is null",EventTree.class);
		SPListModel <EventTree> rightslist2 = dbHelper.QuerySPList("select id,text,parentid from EVENTTREE WHERE PARENTID is not null",EventTree.class);
//		SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
		
		// 遍历节点
		for (EventTree tree : rightslist1.rows) {
			ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
			model.id = tree.ID; 
			model.name = tree.TEXT; 
			//model.parentId = tree.PARENTID;
			mapunits.put(model.id , model);
			groupList.add(model);
		}
		
		// 遍历节点
			for (EventTree tree : rightslist2.rows) {
				ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
				model2.id = tree.ID; 
				model2.name = tree.TEXT; 
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
		ExtTreeNodeInfoModel js = rootnodes.get(0);
		Gson gson=new Gson();
		String obj=gson.toJson(js);
		System.out.println(obj);
		
		
		return obj;
	}
	
	@RequestMapping(value="addsyjb")
	 public Object getLists(String PARENTID, String TEXT){  
		System.out.println(PARENTID+TEXT);
		SPResult result = new SPResult();
		String id=UUID.randomUUID().toString().replace("-", "");
		
		if("".equals(PARENTID)){
			System.out.println('1');
			result.setErrcode(dbHelper.update("INSERT INTO EVENTTREE (ID,TEXT) VALUES(?,?)",id,TEXT));
			return result;
		}else{
		
		System.out.println('2');
       	result.setErrcode(dbHelper.update("INSERT INTO EVENTTREE (ID,TEXT,PARENTID) VALUES(?,?,?)",id,TEXT,PARENTID));
       	return result;
		}
	} 
	
	@RequestMapping(value="editsyjb")
	 public Object editLists(String ID, String TEXT){  
		
		SPResult result = new SPResult();

			result.setErrcode(dbHelper.update("UPDATE EVENTTREE SET TEXT = ? WHERE ID = ?",TEXT,ID));
			return result;
		
	} 
	
	@RequestMapping(value="delsyjb")
	 public Object delLists(String ID){  
		SPResult result = new SPResult();
			String [] id = ID.split(",");
			for (int i = 1; i < id.length; i++) {
			result.setErrcode(dbHelper.update("delete from EVENTTREE WHERE ID = ?",id[i]));
			}
			return result;
	} 
	
}