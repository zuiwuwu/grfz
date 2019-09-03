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
import sp.szpt.grfz.model.JTGLDB;
import sp.szpt.grfz.model.JTGLModels;
import sp.szpt.grfz.model.JTXXSerachInfo;
@RestController
@RequestMapping("JTGL")
public class JTGLController extends Controller {
	@RequestMapping(value="getJTGLLists")
	public  Object getJTGLLists(JTXXSerachInfo JTXXSerachInfo){ 
		JTGLDB db =new JTGLDB();
		 return db.getJTGLLists(JTXXSerachInfo);
    }
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<JTGLModels> list = reader.GetList(1, JTGLModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (JTGLModels model : list)
	        {   	    		
	    		JTGLDB db = new JTGLDB();
	    		SPJsonResult spresult1 = db.exportJTGLXX(model);
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
	
	@RequestMapping(value="deleteJTXX")
	public Object deleteJTXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        JTGLDB db = new JTGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteJTXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
}
