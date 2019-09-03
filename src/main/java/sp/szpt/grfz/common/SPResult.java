package sp.szpt.grfz.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SPResult {
	private int errcode;
	private String errmsg;
	public SPResult()
	{
		
	}
	public SPResult(int errorcode,String errmsg)
	{
		this.errcode = errorcode;
		this.errmsg = errmsg;
	}
	public SPResult(boolean b,String errmsg)
	{
		this.errcode = b?0:1;
		this.errmsg = errmsg;
	}
	public int getErrcode() {
		return errcode;
	}
	public void setErrcode(int errcode) {
		this.errcode = errcode;
	}
	public String getErrmsg() {
		return errmsg;
	}
	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}
}
