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
import sp.szpt.grfz.model.PXGLDB;
import sp.szpt.grfz.model.TSGLDB;
import sp.szpt.grfz.model.XLJKGLDB;
import sp.szpt.grfz.model.GRFZ_XLJKDAModels;
import sp.szpt.grfz.model.XLJKXXSerachInfo;
@RestController
@RequestMapping("XLJKGL")
public class XLJKGLController extends Controller{
		@RequestMapping(value="getXLJKGLLists")
		public  Object getXLJKGLLists(XLJKXXSerachInfo xljkxxSerachInfo){ 
			XLJKGLDB db =new XLJKGLDB();
			 return db.getXLJKGLLists(xljkxxSerachInfo);
	    }
	
		
		@RequestMapping(value = "importExcel", method = RequestMethod.POST)
		public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
			 SPJsonResult spresult = new SPJsonResult();
		        if (myfiles == null)
		        	return null;
		        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
		        reader.Open();	
		    	List<GRFZ_XLJKDAModels> list = reader.GetList(1, GRFZ_XLJKDAModels.class);
		    	StringBuilder errorBuilder = new StringBuilder();
		    	for (GRFZ_XLJKDAModels model : list)
		        {   	    		
		    		XLJKGLDB db = new XLJKGLDB();
		    		SPJsonResult spresult1 = db.exportXLJKGLXX(model);
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

		@RequestMapping(value="deleteXLJKXX")
		public Object deleteXLJKXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        XLJKGLDB db = new XLJKGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteXLJKXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		
		@RequestMapping(value = "importJKXX")	
		public Object importJKXX(GRFZ_XLJKDAModels GRFZ_XLJKDAModels ) throws Exception {
				XLJKGLDB db=new XLJKGLDB();
				return db.importJKXX(GRFZ_XLJKDAModels);
			}
		
		@RequestMapping(value = "editJKXX", method = RequestMethod.POST)
		public Object editJKXX(GRFZ_XLJKDAModels GRFZ_XLJKDAModels){
			XLJKGLDB db=new XLJKGLDB();
			 return db.editJKXX(GRFZ_XLJKDAModels);
		}
		
		@RequestMapping(value = "getJKXXdetail", method = RequestMethod.POST)
		public Object getJKXXdetail(String XLJKDABH){
			XLJKGLDB db=new XLJKGLDB();
			 return db.getJKXXdetail(XLJKDABH);
		}
}
