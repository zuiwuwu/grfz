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
import sp.szpt.grfz.model.JCGLDB;
import sp.szpt.grfz.model.PXGLDB;
import sp.szpt.grfz.model.GRFZ_PXDAModels;
import sp.szpt.grfz.model.PXXXSerachInfo;
@RestController
@RequestMapping("PXGL")
public class PXGLController extends  Controller {
	@RequestMapping(value="getPXGLLists")
	public  Object getPXGLLists(PXXXSerachInfo PXXXSerachInfo){ 
		PXGLDB db =new PXGLDB();
		 return db.getPXGLLists(PXXXSerachInfo);
    }
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_PXDAModels> list = reader.GetList(1, GRFZ_PXDAModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_PXDAModels model : list)
	        {   	    		
	    		PXGLDB db = new PXGLDB();
	    		SPJsonResult spresult1 = db.exportPXGLXX(model);
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
	
	@RequestMapping(value="deletePXXX")
	public Object deletePXXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        PXGLDB db = new PXGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deletePXXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
	
	@RequestMapping(value = "importPXXX")	
	public Object importPXXX(GRFZ_PXDAModels GRFZ_PXDAModels ) throws Exception {
			PXGLDB db=new PXGLDB();
			return db.importPXXX(GRFZ_PXDAModels);
		}
	
	@RequestMapping(value = "editPXXX", method = RequestMethod.POST)
	public Object editPXXX(GRFZ_PXDAModels GRFZ_PXDAModels){
		PXGLDB db=new PXGLDB();
		 return db.editPXXX(GRFZ_PXDAModels);
	}
	
	@RequestMapping(value = "getPXXXdetail", method = RequestMethod.POST)
	public Object getPXXXdetail(String PXDABH){
		PXGLDB db=new PXGLDB();
		 return db.getPXXXdetail(PXDABH);
	}
}
