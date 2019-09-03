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
import sp.szpt.grfz.model.GRFZ_MZPCDAModels;
import sp.szpt.grfz.model.GRFZ_PXDAModels;
import sp.szpt.grfz.model.MZPCGLDB;
import sp.szpt.grfz.model.PXGLDB;
import sp.szpt.grfz.model.TSGLDB;
import sp.szpt.grfz.model.GRFZ_TSDAModels;
import sp.szpt.grfz.model.TSXXSerachInfo;
@RestController
@RequestMapping("TSGL")
public class TSGLController extends Controller{
		@RequestMapping(value="getTSGLLists")
		public  Object getTSGLLists(TSXXSerachInfo tsxxSerachInfo){ 
			TSGLDB db =new TSGLDB();
			 return db.getTSGLLists(tsxxSerachInfo);
	    }
	
		@RequestMapping(value = "importExcel", method = RequestMethod.POST)
		public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
			 SPJsonResult spresult = new SPJsonResult();
		        if (myfiles == null)
		        	return null;
		        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
		        reader.Open();	
		    	List<GRFZ_TSDAModels> list = reader.GetList(1, GRFZ_TSDAModels.class);
		    	StringBuilder errorBuilder = new StringBuilder();
		    	for (GRFZ_TSDAModels model : list)
		        {   	    		
		    		TSGLDB db = new TSGLDB();
		    		SPJsonResult spresult1 = db.exportTSGLXX(model);
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
		
		@RequestMapping(value = "importTSXX")	
		public Object importMZXX(GRFZ_TSDAModels GRFZ_TSDAModels ) throws Exception {
				TSGLDB db=new TSGLDB();
				return db.importTSXX(GRFZ_TSDAModels);
			}
		
		@RequestMapping(value = "editTSXX", method = RequestMethod.POST)
		public Object editTSXX(GRFZ_TSDAModels GRFZ_TSDAModels){
			TSGLDB db=new TSGLDB();
			 return db.editTSXX(GRFZ_TSDAModels);
		}
		
		@RequestMapping(value = "getTSXXdetail", method = RequestMethod.POST)
		public Object getTSXXdetail(String TSDABH){
			TSGLDB db=new TSGLDB();
			 return db.getTSXXdetail(TSDABH);
		}
}
