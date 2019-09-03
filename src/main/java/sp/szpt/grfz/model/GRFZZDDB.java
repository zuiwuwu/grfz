package sp.szpt.grfz.model;

import java.util.HashMap;
import java.util.Map;

import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.common.db.SPListModel;

public class GRFZZDDB {
	
    private IDbHelper dbHelper ;
	
	public GRFZZDDB(){
		dbHelper = DbHelperAccess.GetDbHelper();
	}
	
	public   Object getZZSFList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='ZZSF' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
    }
	public   Object getXYXHList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='XYXH' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
    }
	public   Object getJKZKList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='JKZK' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
 }
	public   Object getHYZKList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='HYZK' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;	
	}
	public   Object getTXLBList(){ 
			   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='TXLB' ORDER BY ID");
			   Map<String, Object> map = new HashMap<String, Object>();
			   map.put("id", "");
			   map.put("name", "全部");
			   spListModel.rows.add(0, map);
			   return spListModel;	
}
	public   Object getHKXZList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='HKXZ' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getJZList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='JZ' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getDBMList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='DBM' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   System.out.println(spListModel.toString());
		   return spListModel;		
}
	public   Object getJRLYList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='JRLY' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getJRFSList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='JRFS' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getGWList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='GW' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getZZZKList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='ZZZK' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getRYBZSXList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='RYBZSX' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getSSJXZLList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='SSJXZL' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getJQLBList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='JQLB' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getXJWCQKList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='XJWCQK' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getCJZJZLList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='CJZJZL' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getXLList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='XL' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getGWLBList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='GWLB' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getMZList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='MZ' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
}
	public   Object getCJPMList(){ 
	   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='CJPM' ORDER BY ID");
	   Map<String, Object> map = new HashMap<String, Object>();
	   map.put("id", "");
	   map.put("name", "全部");
	   spListModel.rows.add(0, map);
	   return spListModel;		
}
	public   Object getDJPDList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='DJPD' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
	}
	
	public   Object getSJKHDCList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='SJKHDC' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
	}
	
	public   Object getGWYKHDCList(){ 
		   SPListModel<Map<String, Object>> spListModel = dbHelper.QuerySPList("SELECT ID,NAME FROM GRFZ_ZD where ZDTYPE='GWYKHDC' ORDER BY ID");
		   Map<String, Object> map = new HashMap<String, Object>();
		   map.put("id", "");
		   map.put("name", "全部");
		   spListModel.rows.add(0, map);
		   return spListModel;		
	}
	
}
