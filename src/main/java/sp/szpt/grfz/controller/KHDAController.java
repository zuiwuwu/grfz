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
import sp.szpt.grfz.model.GWYNDKHDCInfo;
import sp.szpt.grfz.model.KHGLDB;
import sp.szpt.grfz.model.KHGLModels;
import sp.szpt.grfz.model.KHXXSearchInfo;
import sp.szpt.grfz.model.SJQYJXKHDJInfo;
import sp.szpt.grfz.model.TSGLDB;

@RestController
@RequestMapping("KHDAS")
public class KHDAController extends Controller{
	@RequestMapping(value="getKHGLLists")
	public  Object getKHGLLists(KHXXSearchInfo KHXXSearchInfo){ 
		KHGLDB db =new KHGLDB();
		 return db.getKHGLLists(KHXXSearchInfo);
    }

	@RequestMapping(value="getGWYNDKHDCLists")
	public Object getGWYNDKHDCLists(GWYNDKHDCInfo GWYNDKHDCInfo){
		KHGLDB db =new KHGLDB();
		return db.getGWYNDKHDCLists(GWYNDKHDCInfo);
		
	}
	
	@RequestMapping(value="getSJQYJXKHDJLists")
	public Object getSJQYJXKHDJLists(SJQYJXKHDJInfo SJQYJXKHDJInfo){
		KHGLDB db =new KHGLDB();
		return db.getSJQYJXKHDJLists(SJQYJXKHDJInfo);
	}
	
	
	
	
	
	
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<KHGLModels> list = reader.GetList(1, KHGLModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (KHGLModels model : list)
	        {   	    		
	    		KHGLDB db = new KHGLDB();
	    		SPJsonResult spresult1 = db.exportKHGLXX(model);
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

	@RequestMapping(value="deleteTSXX")
	public Object deleteTSXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        TSGLDB db = new TSGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteTSXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
	
	
}
