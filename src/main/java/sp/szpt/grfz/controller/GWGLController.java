package sp.szpt.grfz.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import sp.szpt.common.Controller;
import sp.szpt.common.SPJsonResult;
import sp.szpt.excel.ExcelReader;
import sp.szpt.grfz.model.GRFZ_JCDAModels;
import sp.szpt.grfz.model.GRFZ_PXDAModels;
import sp.szpt.grfz.model.GWGLDB;
import sp.szpt.grfz.model.GRFZ_GWDAModels;
import sp.szpt.grfz.model.GWXXSearchInfo;
import sp.szpt.grfz.model.JCGLDB;
import sp.szpt.grfz.model.PXGLDB;



@RestController
@RequestMapping("GWGL")
public class GWGLController extends Controller {
	@RequestMapping(value="getGWGLLists")
	public  Object getJCGLLists(GWXXSearchInfo GWXXSearchInfo){ 
		GWGLDB db =new GWGLDB();
		 return db.getGWGLLists(GWXXSearchInfo);
    }
	
	@RequestMapping(value = "importGWXX")	
	public Object importGWXX(GRFZ_GWDAModels GWGLModels ) throws Exception {
			GWGLDB db=new GWGLDB();
			return db.importGWXX(GWGLModels);
		}
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_GWDAModels> list = reader.GetList(1, GRFZ_GWDAModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_GWDAModels model : list)
	        {   	    		
	    		GWGLDB db = new GWGLDB();
	    		SPJsonResult spresult1 = db.exportGWGLXX(model);
	            if (spresult1.success)
	            {
	            }
	            else
	            {
	                errorBuilder.append( "导入失败" + spresult1.msg);
	                errorBuilder.append("\n");
	            }
	        }     
	        spresult.success = true;
	        spresult.msg = errorBuilder.toString();
	        return spresult;
	    }
	
	@RequestMapping(value="deleteGWXX")
	public Object deleteGWXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        GWGLDB db = new GWGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteGWXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
	
	@RequestMapping(value = "editGWXX", method = RequestMethod.POST)
	public Object editPXXX(GRFZ_GWDAModels GRFZ_GWDAModels){
		GWGLDB db=new GWGLDB();
		 return db.editGWXX(GRFZ_GWDAModels);
	}
	
	@RequestMapping(value = "getGWXXdetail", method = RequestMethod.POST)
	public Object getPXXXdetail(String GWDABH){
		GWGLDB db=new GWGLDB();
		 return db.getGWXXdetail(GWDABH);
	}
}
