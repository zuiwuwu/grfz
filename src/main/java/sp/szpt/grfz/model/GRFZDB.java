package sp.szpt.grfz.model;

import sp.szpt.common.CommonMethod;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;




public class GRFZDB {
	 private IDbHelper dbHelper ;
		
		public GRFZDB(){
			dbHelper = DbHelperAccess.GetDbHelper();
		}
		
		public int login(String username,String password){
			String sql = String.format("select count(*) from grfz_user where username = '%s' and password = '%s'",username,CommonMethod.MD5(password));
			return dbHelper.queryForObject(sql, Integer.class);
		}
		
		public String selectNAME(String username){
			 System.out.println(username);
			 return dbHelper.queryForMap("select XM from GRFZ_JBXX where JH = ? ",username).get("XM").toString();
			/*String sql = String.format("select XM from grfz_user where JH = '%s' '",username);
			return dbHelper.queryForObject(sql);*/
		}
		
		public Object myAppraise(String TEXT){
			
			String sql = String.format("INSERT INTO MYAPPRAISE(ID,APPRAISETEXT,USERID)VALUES(?,?,?)",null,TEXT,null);
			
			return dbHelper.update(sql);
		}
		
		public Object getSearchLists(SerachInfo SerachInfo){

			return dbHelper.QuerySPList("VIEW_GRFZ_SEARCH2", SerachInfo);
		}
		

		
	   public Object getTotal(){		
			return dbHelper.QuerySPList("SELECT COUNT(*) RUM FROM VIEW_GRFZ_SEARCH ");
		}
}
