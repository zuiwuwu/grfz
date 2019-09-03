package  sp.szpt.grfz.model;

public class DWAttr {
	public int TYPE = 0;
	public String INDEXID = "";
	public DWAttr(int TYPE)
	{
		this.TYPE = TYPE;
	}
	public DWAttr(int TYPE,String INDEXID)
	{
		this.TYPE = TYPE;
		this.INDEXID = INDEXID;
	}
}
