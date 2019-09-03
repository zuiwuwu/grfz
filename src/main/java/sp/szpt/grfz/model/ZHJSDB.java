package sp.szpt.grfz.model;

import java.util.List;
import java.util.Map;






import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class ZHJSDB {
	
	private IDbHelper dbHelper ;

	public ZHJSDB(){
		dbHelper = DbHelperAccess.GetDbHelper();
	}
	
	

	 /* public List<Map<String, Object>> getJbxx(){		
		  List<Map<String, Object>> list = dbHelper.queryForList("SELECT CJGZSJ  FROM GRFZ_JBXX ");
		  return  list;
		}*/
	
	
	public List<JbxxModels> getJbxx(){
		String sql = String.format("select GLS from VIEW_GRFZ_SEARCH2");
		return dbHelper.queryForObjectList(sql, JbxxModels.class);
	}
	
	public List<JbxxModels> qjjyjrfstj(){ 
		String sql = String.format("select JRFS from GRFZ_JBXX");
		return dbHelper.queryForObjectList(sql, JbxxModels.class);
	}
	
	public List<JbxxModels> gwyndkhdcqk(){
		String sql = String.format("select GRADE from KHGL_GWYNDKH");
		return dbHelper.queryForObjectList(sql, JbxxModels.class);
	}  
	
	public List<JbxxModels> qjjyxjwcqktj(){  
		String sql = String.format("select XJWCQK from GRFZ_JBXX");
		return dbHelper.queryForObjectList(sql, JbxxModels.class);
	}
}
