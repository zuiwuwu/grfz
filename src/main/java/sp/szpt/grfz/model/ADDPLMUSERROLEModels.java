package sp.szpt.grfz.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ADDPLMUSERROLEModels {
	public String ROLEID;
    public String ROLENM;
    public String INITVIEWNUM;
    public String MAXVIEWNUM;
    public String ULVL;
    public Integer PARENTID;
    public String MENUPERMISSION;

    public String PERMISSIONXML;
    public String righttypesel;
    public List<CHNRIGHTSModels> CHNRIGHTS;
    public String MAPRIGHTS;
    public String TVWALLRIGHTS;
    public String MENURIGHTS;
    public List<RIGHTMODSModels> RIGHTMODS;
    public String DWRIGHTS;
	public String getROLEID() {
		return ROLEID;
	}
	public void setROLEID(String rOLEID) {
		ROLEID = rOLEID;
	}
	public String getROLENM() {
		return ROLENM;
	}
	public void setROLENM(String rOLENM) {
		ROLENM = rOLENM;
	}
	public String getINITVIEWNUM() {
		return INITVIEWNUM;
	}
	public void setINITVIEWNUM(String iNITVIEWNUM) {
		INITVIEWNUM = iNITVIEWNUM;
	}
	public String getMAXVIEWNUM() {
		return MAXVIEWNUM;
	}
	public void setMAXVIEWNUM(String mAXVIEWNUM) {
		MAXVIEWNUM = mAXVIEWNUM;
	}
	public String getULVL() {
		return ULVL;
	}
	public void setULVL(String uLVL) {
		ULVL = uLVL;
	}
	public Integer getPARENTID() {
		return PARENTID;
	}
	public void setPARENTID(Integer pARENTID) {
		PARENTID = pARENTID;
	}
	public String getMENUPERMISSION() {
		return MENUPERMISSION;
	}
	public void setMENUPERMISSION(String mENUPERMISSION) {
		MENUPERMISSION = mENUPERMISSION;
	}
	public String getPERMISSIONXML() {
		return PERMISSIONXML;
	}
	public void setPERMISSIONXML(String pERMISSIONXML) {
		PERMISSIONXML = pERMISSIONXML;
	}
	public String getRighttypesel() {
		return righttypesel;
	}
	public void setRighttypesel(String righttypesel) {
		this.righttypesel = righttypesel;
	}
	public List<CHNRIGHTSModels> getCHNRIGHTS() {
		return CHNRIGHTS;
	}
	public void setCHNRIGHTS(List<CHNRIGHTSModels> cHNRIGHTS) {
		CHNRIGHTS = cHNRIGHTS;
	}
	public String getMAPRIGHTS() {
		return MAPRIGHTS;
	}
	public void setMAPRIGHTS(String mAPRIGHTS) {
		MAPRIGHTS = mAPRIGHTS;
	}
	public String getTVWALLRIGHTS() {
		return TVWALLRIGHTS;
	}
	public void setTVWALLRIGHTS(String tVWALLRIGHTS) {
		TVWALLRIGHTS = tVWALLRIGHTS;
	}
	public String getMENURIGHTS() {
		return MENURIGHTS;
	}
	public void setMENURIGHTS(String mENURIGHTS) {
		MENURIGHTS = mENURIGHTS;
	}
	public List<RIGHTMODSModels> getRIGHTMODS() {
		return RIGHTMODS;
	}
	public void setRIGHTMODS(List<RIGHTMODSModels> rIGHTMODS) {
		RIGHTMODS = rIGHTMODS;
	}
	public String getDWRIGHTS() {
		return DWRIGHTS;
	}
	public void setDWRIGHTS(String dWRIGHTS) {
		DWRIGHTS = dWRIGHTS;
	}
    
    
}
