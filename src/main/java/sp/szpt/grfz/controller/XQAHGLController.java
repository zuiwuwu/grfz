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
import sp.szpt.grfz.model.GRFZ_PXDAModels;
import sp.szpt.grfz.model.GRFZ_TSDAModels;
import sp.szpt.grfz.model.GRFZ_XLJKDAModels;
import sp.szpt.grfz.model.PXGLDB;
import sp.szpt.grfz.model.TSGLDB;
import sp.szpt.grfz.model.XQAHGLDB;
import sp.szpt.grfz.model.GRFZ_AHTCDAModels;
import sp.szpt.grfz.model.XQAHSearchInfo;
@RestController
@RequestMapping("XQAHGL")
public class XQAHGLController extends Controller {
	
	@RequestMapping(value="getXQAHGLLists")
	public  Object getXQAHGLLists(XQAHSearchInfo XQAHSearchInfo){ 
		XQAHGLDB db =new XQAHGLDB();
		 return db.getXQAHGLLists(XQAHSearchInfo);
    }

	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_AHTCDAModels> list = reader.GetList(1, GRFZ_AHTCDAModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_AHTCDAModels model : list)
	        {   	    		
	    		XQAHGLDB db = new XQAHGLDB();
	    		SPJsonResult spresult1 = db.exportXQAHGLXX(model);
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

	@RequestMapping(value="deleteXQAHXX")
	public Object deleteXQAHXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        XQAHGLDB db = new XQAHGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteXQAHXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
	
	@RequestMapping(value = "importAHXX")	
	public Object importAHXX(GRFZ_AHTCDAModels GRFZ_AHTCDAModels ) throws Exception {
			XQAHGLDB db=new XQAHGLDB();
			return db.importAHXX(GRFZ_AHTCDAModels);
		}
	
	@RequestMapping(value = "editAHXX", method = RequestMethod.POST)
	public Object editAHXX(GRFZ_AHTCDAModels GRFZ_AHTCDAModels){
		XQAHGLDB db=new XQAHGLDB();
		 return db.editAHXX(GRFZ_AHTCDAModels);
	}
	
	@RequestMapping(value = "getAHXXdetail", method = RequestMethod.POST)
	public Object getAHXXdetail(String AHTCDABH){
		XQAHGLDB db=new XQAHGLDB();
		 return db.getAHXXdetail(AHTCDABH);
	}

}
