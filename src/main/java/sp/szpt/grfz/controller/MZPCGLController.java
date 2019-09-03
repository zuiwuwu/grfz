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
import sp.szpt.grfz.model.MZPCGLDB;
import sp.szpt.grfz.model.GRFZ_MZPCDAModels;
import sp.szpt.grfz.model.MZPCSearchInfo;
import sp.szpt.grfz.model.PXGLDB;

@RestController
@RequestMapping("MZPCGL")
public class MZPCGLController  extends Controller {

	@RequestMapping(value="getMZPCGLLists")
	public  Object getMZPCGLLists(MZPCSearchInfo MZPCSearchInfo){ 
		MZPCGLDB db =new MZPCGLDB();
		 return db.getMZPCGLLists(MZPCSearchInfo);
    }
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_MZPCDAModels> list = reader.GetList(1, GRFZ_MZPCDAModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_MZPCDAModels model : list)
	        {   	    		
	    		MZPCGLDB db = new MZPCGLDB();
	    		SPJsonResult spresult1 = db.exportMZPCGLXX(model);
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
	
	@RequestMapping(value="deleteMZPCXX")
	public Object deleteMZPCXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        MZPCGLDB db = new MZPCGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteMZPCXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
	
	@RequestMapping(value = "importMZXX")	
	public Object importMZXX(GRFZ_MZPCDAModels GRFZ_MZPCDAModels ) throws Exception {
			MZPCGLDB db=new MZPCGLDB();
			return db.importMZXX(GRFZ_MZPCDAModels);
		}
	@RequestMapping(value = "editMZXX", method = RequestMethod.POST)
	public Object editMZXX(GRFZ_MZPCDAModels GRFZ_MZPCDAModels){
		MZPCGLDB db=new MZPCGLDB();
		 return db.editMZXX(GRFZ_MZPCDAModels);
	}
	
	@RequestMapping(value = "getMZXXdetail", method = RequestMethod.POST)
	public Object getMZXXdetail(String MZPCDABH){
		MZPCGLDB db=new MZPCGLDB();
		 return db.getMZXXdetail(MZPCDABH);
	}
}
