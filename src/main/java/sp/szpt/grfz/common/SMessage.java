package sp.szpt.grfz.common;

public class SMessage {
	// ID
	public String ID;
	// 发送人
	public String SENDPP;
	// 内容
	public String CONTEXT;
	// 接收人
	public String RECEIVER;
	// 已读
	public int READ;

	public String TIME;
	public String getTIME() {
		return TIME;
	}

	public void setTIME(String tIME) {
		TIME = tIME;
	}

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
	}

	public String getSENDPP() {
		return SENDPP;
	}

	public void setSENDPP(String sENDPP) {
		SENDPP = sENDPP;
	}

	public String getCONTEXT() {
		return CONTEXT;
	}

	public void setCONTEXT(String cONTEXT) {
		CONTEXT = cONTEXT;
	}

	public String getRECEIVER() {
		return RECEIVER;
	}

	public void setRECEIVER(String rECEIVER) {
		RECEIVER = rECEIVER;
	}

	public int getREAD() {
		return READ;
	}

	public void setREAD(int rEAD) {
		READ = rEAD;
	}
}
