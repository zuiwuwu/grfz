package sp.szpt.grfz.controller;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;






















import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;

import sp.szpt.common.ExtTreeNodeInfoModel;



import sp.szpt.grfz.common.PointTree;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.model.ADDPLMUSERROLEModels;
import sp.szpt.grfz.model.CHNRIGHTS;
import sp.szpt.grfz.model.CHNRIGHTSModels;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.common.db.DbHelperAccess;


@RestController
@RequestMapping("point")
public class PointTreeController {
	
	private IDbHelper dbHelper = DbHelperAccess.GetDbHelper();
	
	
	@RequestMapping(value = "listsyjbTree")
	public Object listsyjbTree() {	
	Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
	List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
	
	SPListModel <PointTree> rightslist1 = dbHelper.QuerySPList("select ruleid,rulenm from POINTTREE WHERE PARENTID is null",PointTree.class);
	SPListModel <PointTree> rightslist2 = dbHelper.QuerySPList("select ruleid,rulenm,parentid from POINTTREE WHERE PARENTID is not null",PointTree.class);
//	SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
	// 遍历节点
	for (PointTree tree : rightslist1.rows) {
		ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
		model.id = tree.RULEID; 
		model.text = tree.RULENM; 
		//model.parentId = tree.PARENTID;
		mapunits.put(model.id , model);
		groupList.add(model);
	}
	System.out.println(groupList.toString());
	
	// 遍历节点
		for (PointTree tree : rightslist2.rows) {
			ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
			model2.id = tree.RULEID; 
			model2.text = tree.RULENM; 
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
	
	System.out.println(rootnodes.toString());
	return rootnodes;
}
	
	@RequestMapping(value="addsyjb")
	 public Object getLists(String PARENTID, String TEXT,String check_val,String GROWID){  
		System.out.println(check_val+GROWID);
		SPResult result = new SPResult();
		String id=UUID.randomUUID().toString().replace("-", "");
		String[] ids = GROWID.split(",");
		String[] name = check_val.split(",");
		System.out.println(name[0]+"22"+name[1]);
		for (int i = 1; i < ids.length; i++) {
			for (int j = 1; j < name.length; j++) {
				
				int result1 = dbHelper.update("select * from ROLEUSER WHERE USERNAME = ? and ROLEID = ?",
						name[j],ids[i]);
				String idSS =UUID.randomUUID().toString().replace("-", "");
				if(result1 > 0){
			
					System.out.println("已存在 无需添加");
				}else{
					
					result.setErrcode(dbHelper.update("INSERT INTO ROLEUSER (ID,USERNAME,ROLEID) VALUES(?,?,?)",
									idSS,name[j],ids[i]));
				}
				
			}			
						
		}
		
		if("".equals(PARENTID)){
			System.out.println('1');
			result.setErrcode(dbHelper.update("INSERT INTO POINTTREE (ruleid,rulenm) VALUES(?,?)",id,TEXT));
			return result;
		}else{
		
		System.out.println('2');
       	result.setErrcode(dbHelper.update("INSERT INTO POINTTREE (ruleid,rulenm,PARENTID) VALUES(?,?,?)",id,TEXT,PARENTID));
       	return result;
		}
	} 
	
	//积分单事件 编辑
		@RequestMapping(value="editsyjbs")
		 public Object editListss(String GROWID,String ID,String ZQ,String QZ,String NAME,String DF) {  
			
			SPResult result = new SPResult();

			String[] id = ID.split(",");
			String[] name = NAME.split(",");
			String[] df = DF.split(",");
			String[] qz = QZ.split(",");
			String[] zq = ZQ.split(",");
			
			System.out.println(id.length);
			if(!GROWID.equals(null) && !GROWID.equals("")){
			if(id.length>1){
				
				for (int j = 1; j < id.length; j++) {
					int dfs = Integer.parseInt(df[j]);
					double dd = Double.parseDouble(qz[j]);
					double zfs = dfs*dd;
					double d2=mul(dd,dfs); 
					DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String formatDate = dFormat.format(new Date());
					System.out.println(zfs+""+d2+""+String.valueOf(d2));
					int result1 = dbHelper.update("select * from GUANLIAN WHERE GROWID = ? and ID = ?",
							GROWID,id[j]);
					if (result1>0) {
						System.out.println("已存在 更新积分");
						result.setErrcode(dbHelper.update("UPDATE GUANLIAN SET ZQ=?,DF=?,LBQZ=?,ZHDF=?,UPDATETIME=? WHERE GROWID = ? AND ID = ?",zq[j],df[j],qz[j],String.valueOf(d2),formatDate,GROWID,id[j]));
					}else{
						System.out.println("不存在 添加积分");
						result.setErrcode(dbHelper.update("INSERT INTO GUANLIAN (GROWID,ID,ZQ,DF,LBQZ,NAME,ZHDF,CREATETIME,UPDATETIME) VALUES(?,?,?,?,?,?,?,?,?)",GROWID,id[j],zq[j],df[j],qz[j],name[j],String.valueOf(d2),formatDate,formatDate));
					}
					
					
				}			
			}else{
				System.out.println("未选择维度");
				return "未选择维度";
			}
			}else{
				System.out.println("未选择事件");
				return "未选择事件";
			}
			return result;
			}
			

	
	//积分多事件 编辑
	@RequestMapping(value="editsyjb")
	 public Object editLists(String ROLENM ,String ROLEID,String GROWID,String ID,String ZQ,String QZ,String NAME,String DF) {  
		System.out.println(GROWID);
		SPResult result = new SPResult();
		String[] growid = GROWID.split(",");
		String[] id = ID.split(",");
		String[] name = NAME.split(",");
		String[] df = DF.split(",");
		String[] qz = QZ.split(",");
		String[] zq = ZQ.split(",");
		
		
		if(!"".equals(ROLENM)){
			System.out.println('1');
			result.setErrcode(dbHelper.update("UPDATE POINTTREE SET RULENM = ? WHERE RULEID = ?",ROLENM,ROLEID));
			
		}
		
		if(growid.length>1){
		if(id.length>1){
		for (int i = 1; i < growid.length; i++) {
			
			for (int j = 1; j < id.length; j++) {
				int dfs = Integer.parseInt(df[j]);
				double dd = Double.parseDouble(qz[j]);
				double zfs = dfs*dd;
				double d2=mul(dd,dfs); 
				System.out.println(zfs+""+d2+""+String.valueOf(d2));
				result.setErrcode(dbHelper.update("INSERT INTO GUANLIAN (GROWID,ID,ZQ,DF,LBQZ,NAME,ZHDF) VALUES(?,?,?,?,?,?,?)",growid[i],id[j],zq[j],df[j],qz[j],name[j],String.valueOf(d2)));
			}			
		}
		}else{
			System.out.println("未选择维度");
			return "未选择维度";
		}
		}else{
			System.out.println("未选择事件");
		}
		
		
		return result;
		
	}
	
	private double mul(double dd, int dfs) {
		BigDecimal bd = new BigDecimal(Double.toString(dd));  
        BigDecimal bd2 = new BigDecimal(dfs);  
        return bd.multiply(bd2).doubleValue();  
	}

	@RequestMapping(value="delsyjb")
	 public Object delLists(String ID){  
		System.out.println(ID);
		SPResult result = new SPResult();
			String [] id = ID.split(",");
			for (int i = 1; i < id.length; i++) {
			result.setErrcode(dbHelper.update("delete from POINTTREE WHERE RULEID = ?",id[i]));
			}
			return result;
	} 
	
}