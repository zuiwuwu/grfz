package sp.szpt.grfz.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class JfModels {
	 
	public String ID;
	public String USERNAME;
	public String NAME;
	public String ZHDF;
	public Double WEIDUSUM;
	public Double getWEIDUSUM() {
		return WEIDUSUM;
	}
	public void setWEIDUSUM(Double wEIDUSUM) {
		WEIDUSUM = wEIDUSUM;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getUSERNAME() {
		return USERNAME;
	}
	public void setUSERNAME(String uSERNAME) {
		USERNAME = uSERNAME;
	}
	public String getNAME() {
		return NAME;
	}
	public void setNAME(String nAME) {
		NAME = nAME;
	}
	public String getZHDF() {
		return ZHDF;
	}
	public void setZHDF(String zHDF) {
		ZHDF = zHDF;
	} 

	 
}
