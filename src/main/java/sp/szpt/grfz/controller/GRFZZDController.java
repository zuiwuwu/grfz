package sp.szpt.grfz.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sp.szpt.common.Controller;
import sp.szpt.grfz.model.GRFZZDDB;

@RestController
@RequestMapping("GRFZZD")
public class GRFZZDController  extends Controller{
	
	@RequestMapping(value="getZZSFList")	
	public  Object getCLLXList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getZZSFList();
    }
	
	@RequestMapping(value="getXYXHList")	
	public  Object getXYXHList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getXYXHList();
    }
	
	@RequestMapping(value="getJKZKList")	
	public  Object getJKZKList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getJKZKList();
    }
	
	@RequestMapping(value="getHYZKList")	
	public  Object getHYZKList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getHYZKList();
    }
	
	@RequestMapping(value="getTXLBList")	
	public  Object getTXLBList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getTXLBList();
    }
	
	@RequestMapping(value="getHKXZList")	
	public  Object getHKXZList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getHKXZList();
    }
	
	@RequestMapping(value="getJZList")	
	public  Object getJZList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getJZList();
    }
	
	@RequestMapping(value="getDBMList")	
	public  Object getDBMList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getDBMList();
    }
	
	@RequestMapping(value="getJRLYList")	
	public  Object getJRLYList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getJRLYList();
    }
	
	@RequestMapping(value="getJRFSList")	
	public  Object getJRFSList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getJRFSList();
    }
	
	@RequestMapping(value="getGWList")	
	public  Object getGWList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getGWList();
    }
	
	@RequestMapping(value="getZZZKList")	
	public  Object getZZZKList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getZZZKList();
    }
	
	@RequestMapping(value="getRYBZSXList")	
	public  Object getRYBZSXList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getRYBZSXList();
    }
	
	@RequestMapping(value="getSSJXZLList")	
	public  Object getSSJXZLList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getSSJXZLList();
    }
	
	@RequestMapping(value="getJQLBList")	
	public  Object getJQLBList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getJQLBList();
    }
	
	@RequestMapping(value="getXJWCQKList")	
	public  Object getXJWCQKList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getXJWCQKList();
    }
	
	@RequestMapping(value="getCJZJZLList")	
	public  Object getCJZJZLList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getCJZJZLList();
    }
	
	@RequestMapping(value="getXLList")	
	public  Object getXLList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getXLList();
    }
	
	@RequestMapping(value="getGWLBList")	
	public  Object getGWLBList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getGWLBList();
    }
	
	@RequestMapping(value="getMZList")	
	public  Object getMZList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getMZList();
    }
	@RequestMapping(value="getCJPMList")	
	public  Object getCJPMList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getCJPMList();
    }
	@RequestMapping(value="getDJPDList")	
	public  Object getDJPDList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getDJPDList();
    }
	@RequestMapping(value="getSJKHDCList")	
	public  Object getSJKHDCList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getSJKHDCList();
    }
	@RequestMapping(value="getGWYKHDCList")	
	public  Object getGWYKHDCList(){ 		
		GRFZZDDB db =new GRFZZDDB();
		 return db.getGWYKHDCList();
    }

}
