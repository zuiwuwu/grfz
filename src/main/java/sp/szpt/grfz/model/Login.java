package sp.szpt.grfz.model;

import sp.szpt.common.db.BaseDBObject;

public class Login extends BaseDBObject{
  
   public String USERNAME;
   public String PASSWORD;
   
   public String getUSERNAME() {
		return USERNAME;
	}
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}
	public String getPASSWORD() {
		return PASSWORD;
	}
	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}
}
