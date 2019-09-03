package sp.szpt.grfz.controller;

import java.text.DateFormat;
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
import sp.szpt.common.ExtTreeNodeInfoModel;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.TreeInfo;
import sp.szpt.grfz.common.UserRoles;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.common.ZuZhiTree;
import sp.szpt.grfz.model.RoleUserSearchInfo;
import sp.szpt.grfz.model.UserRoleSearchInfo;



@RestController
@RequestMapping("roleuser")
public class RoleUserController {
	
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper();
	@RequestMapping(value="getLists")
	 public Object getLists(/*RoleUserSearchInfo searchInfo*/String ROLEID){  
		System.out.println(ROLEID);
      return dbHelper.QuerySPList("select * from ROLEUSER where ROLEID = ?",ROLEID/*,searchInfo*/);
		
  } 
	
	
	
	@RequestMapping(value="getUsersLists")
	 public Object getUsersLists(RoleUserSearchInfo searchInfo){  
		
     return dbHelper.QuerySPList("select * from GRFZ_JBXX ",searchInfo);
 } 
	
	
	
	@RequestMapping(value="textrole")
	 public Object textrole(UserRoleSearchInfo searchInfo){  
		
    return dbHelper.QuerySPList("select * from grfz_qx ",searchInfo);
} 
	
	@RequestMapping(value="terole")
	 public Object terole(UserRoleSearchInfo searchInfo){  
		
   return dbHelper.QuerySPList("select * from grfz_qx ",searchInfo);
} 
	//设置用户登录权限
	@RequestMapping(value="useroles")
	 public Object useroles(UserRoleSearchInfo searchInfo,String ID,String param){	
		 String strTemp = null ;
		if(param != null && !"".equals(param)){
		int count=0;//双引号个数
	    for(int i=0;i<param.length();i++){
	        String s=param.substring(i,i+1);
	        if("\"".equals(s)){
	            count++;
	        }
	    }
		   
	    List<String> list=new ArrayList<String>();
	    for(int i=0;i<count;i=i+2){
	    	param=param.substring(param.indexOf("\"")+1,param.length());
	         strTemp=param.substring(0,param.indexOf("\""));
	         param=param.substring(strTemp.length()+1) ;
	         list.add(strTemp);
	        
	    }
	    System.out.println("结果"+strTemp);
		}
		Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
		List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
		
		SPListModel <ZuZhiTree> rightslist1 = dbHelper.QuerySPList("select id,name from textrole WHERE PARENTID is null",ZuZhiTree.class);
		SPListModel <ZuZhiTree> rightslist2 = dbHelper.QuerySPList("select id,name,parentid from textrole WHERE PARENTID is not null",ZuZhiTree.class);
//		SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
		String ss = "";
		String[] ssd = null ;
		
			List<UserSession>  list3= dbHelper.queryForObjectList("select * from grfz_user where USERID = '"+strTemp+"'", UserSession.class);
			ss = list3.get(0).shuzhi;
			if (ss != null && !"".equals(ss)) {
				System.out.println(ss+"aac");
				
				ssd = ss.split(",");
			}
		
		
			
		
		// 遍历节点
		for (ZuZhiTree tree : rightslist1.rows) {
			ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
			model.id = tree.ID; 
			model.text = tree.NAME; 
//			model.parentId = tree.PARENTID;
			model.checked = false;
			if (ssd != null) {
				for (int i = 0; i < ssd.length; i++) {
					if(tree.ID.equals(ssd[i])){
						System.out.println(tree.ID);
						model.checked = true;
					}
				}
			}
									
			mapunits.put(model.id , model);
			groupList.add(model);
		}
		
		// 遍历节点
			for (ZuZhiTree tree : rightslist2.rows) {
				ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
				model2.id = tree.ID; 
				model2.text = tree.NAME; 
				model2.checked = false;
				//model.parentId = tree.PARENTID;
				if (ssd != null) {
				for (int i = 0; i < ssd.length; i++) {
					if(tree.ID.equals(ssd[i])){
						
						model2.checked = true;
					}
				}
				}
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
	
	@RequestMapping(value="adduseroles")
	 public Object adduseroles(String value,String ID,String NAME,String PASSWORD1,String PASSWORD2,String USERNAME, RoleUserSearchInfo searchInfo){  
//		String[] id = ID.split(",");
		SPResult results = new SPResult();
//		List<UserSession>  list= dbHelper.queryForObjectList("select * from grfz_user where USERID = '"+USERID+"'", UserSession.class);
//		for (int i = 0; i < list.size(); i++) {
			
			/*for (int j = 0; j < id.length; j++) {
				if(list.get(i).role.equals(id[j])) {
					System.out.println("已存在");
				}else{*/
		
			results.setErrcode(dbHelper
					.update("update grfz_user set SHUZHI =?,NAME = ?,PASSWORD = ?,USERNAME=? where userid = ? ",
							value,NAME,CommonMethod.MD5(PASSWORD1),USERNAME,ID));
		
					
		/*		}
			}*/
			return results;
} 
	
	//设置角色权限
	@RequestMapping(value="textroles")
	 public Object textroles(UserRoleSearchInfo searchInfo,String ID,String param){	
		
		System.out.println(ID+"ABCD");
		Map<String, ExtTreeNodeInfoModel> mapunits = new HashMap<String, ExtTreeNodeInfoModel>(100);
		List<ExtTreeNodeInfoModel> groupList = new ArrayList<ExtTreeNodeInfoModel>();
		
		SPListModel <ZuZhiTree> rightslist1 = dbHelper.QuerySPList("select id,name from textrole WHERE PARENTID is null",ZuZhiTree.class);
		SPListModel <ZuZhiTree> rightslist2 = dbHelper.QuerySPList("select id,name,parentid from textrole WHERE PARENTID is not null",ZuZhiTree.class);
//		SPListModel <TreeInfo3> rightslist3 = dbHelper.QuerySPList("select id,name,WDTID from WJW_DIC_THIRD",TreeInfo3.class);
	
		String ss = "";
		String[] ssd = null ;
		if (ID != null && !"".equals(ID)) {
			List<UserSession>  list3= dbHelper.queryForObjectList("select * from grfz_qx where ID = '"+ID+"'", UserSession.class);
			ss = list3.get(0).shuzhi;
			if (ss != null && !"".equals(ss)) {
				System.out.println(ss+"233");
				
				ssd = ss.split(",");
			}
			
		}	 
		
					
		
		// 遍历节点
		for (ZuZhiTree tree : rightslist1.rows) {
			ExtTreeNodeInfoModel model = new ExtTreeNodeInfoModel();
			model.id = tree.ID; 
			model.text = tree.NAME; 
//			model.parentId = tree.PARENTID;
			model.checked = false;
			if (ssd != null) {
				for (int i = 0; i < ssd.length; i++) {
					if(tree.ID.equals(ssd[i])){
						System.out.println(tree.ID);
						model.checked = true;
					}
				}
			}
									
			mapunits.put(model.id , model);
			groupList.add(model);
		}
		
		// 遍历节点
			for (ZuZhiTree tree : rightslist2.rows) {
				ExtTreeNodeInfoModel model2 = new ExtTreeNodeInfoModel();
				model2.id = tree.ID; 
				model2.text = tree.NAME; 
				model2.checked = false;
				//model.parentId = tree.PARENTID;
				if (ssd != null) {
				for (int i = 0; i < ssd.length; i++) {
					if(tree.ID.equals(ssd[i])){
						
						model2.checked = true;
					}
				}
				}
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
	
	@RequestMapping(value="addtextrole")
	 public Object addtextrole(String value,String ID, RoleUserSearchInfo searchInfo){  
//		String[] id = ID.split(",");
		SPResult results = new SPResult();
//		List<UserSession>  list= dbHelper.queryForObjectList("select * from grfz_user where USERID = '"+USERID+"'", UserSession.class);
//		for (int i = 0; i < list.size(); i++) {
			
			/*for (int j = 0; j < id.length; j++) {
				if(list.get(i).role.equals(id[j])) {
					System.out.println("已存在");
				}else{*/
					results.setErrcode(dbHelper
							.update("update grfz_qx set SHUZHI =? where id = ? ",
									value,ID));
		/*		}
			}*/
			return results;
} 
	
	@RequestMapping(value="addtextroleS")
	 public Object addtextroleS(String ROLENAME,String ID, RoleUserSearchInfo searchInfo){  
//		String[] id = ID.split(",");
		SPResult results = new SPResult();
//		List<UserSession>  list= dbHelper.queryForObjectList("select * from grfz_user where USERID = '"+USERID+"'", UserSession.class);
//		for (int i = 0; i < list.size(); i++) {
			
			/*for (int j = 0; j < id.length; j++) {
				if(list.get(i).role.equals(id[j])) {
					System.out.println("已存在");
				}else{*/
					results.setErrcode(dbHelper
							.update("update grfz_user set role =? where USERID = ? ",
									ROLENAME,ID));
		/*		}
			}*/
			return results;
} 
	
	
	@RequestMapping(value="addField")
	public Object addField(String ID,String NAME,String REMOVID,String ROLEID){ 
		System.out.println(ID+"..."+REMOVID+ROLEID);
		SPResult results = new SPResult();
		String[] id = REMOVID.split(",");
		System.out.println(id[0]);
		for (int i = 0; i < id.length; i++) {
			int result = dbHelper.update("select * from ROLEUSER WHERE USERID = ? and ROLEID = ?",id[i],ROLEID);
			System.out.println(result);
			if(result > 0){
				
				dbHelper.update("delete from ROLEUSER WHERE USERID = ? and ROLEID = ?",id[i],ROLEID);
				System.out.println("已删除");
			}else{
				System.out.println("没有找到该字段 无需删除");
			}
		}
		
		
		if(!ID.equals("") && !NAME.equals("") ){
			String[] ids = ID.split(",");
			String[] name = NAME.split(",");
			
			for (int i = 0; i < ids.length; i++) {
				int result = dbHelper.update("select * from ROLEUSER WHERE USERID = ? and ROLEID = ?",
						ids[i],ROLEID);
				String idSS =UUID.randomUUID().toString().replace("-", "");
				if(result > 0){
			
					System.out.println("已存在 无需添加");
				}else{
					
					results.setErrcode(dbHelper
							.update("INSERT INTO ROLEUSER (ID,USERID,USERNAME,ROLEID) VALUES(?,?,?,?)",
									idSS,ids[i],name[i],ROLEID));
				}
							
			}
		}
				
	return results;
	}
	
	@RequestMapping(value="delLists")
	 public Object delLists(String ID){  
     return dbHelper.update("delete from NEWS WHERE ID = ?",ID);
 } 

}
