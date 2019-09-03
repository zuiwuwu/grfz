package sp.szpt.grfz.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import sp.szpt.common.Controller;
import sp.szpt.common.OutputCache;
import sp.szpt.common.SPJsonResult;
import sp.szpt.excel.ExcelReader;
import sp.szpt.grfz.model.FAJJXGLModels;
import sp.szpt.grfz.model.GRFZ_KSDFModels;
import sp.szpt.grfz.model.GRFZ_QTJKFModels;
import sp.szpt.grfz.model.GRFZ_ZFZGModels;
import sp.szpt.grfz.model.JXGLDB;
import sp.szpt.grfz.model.JXGLModels;
import sp.szpt.grfz.model.JXXXSerachInfo;
import sp.szpt.grfz.model.KSDFSSSearchInfo;
import sp.szpt.grfz.model.QTJKFXXSearchInfo;
import sp.szpt.grfz.model.SLDJXGLModels;
import sp.szpt.grfz.model.ZFZGSearchInfo;

@RestController
@RequestMapping("JXGL")
public class JXGLController extends Controller{
	
		public static String SmallPicPath = "~/Content/images/smallpic.jpg";
		@RequestMapping(value="getAJJXGLLists")
		public  Object getJXGLLists(JXXXSerachInfo JXXXSerachInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getJXGLLists(JXXXSerachInfo);
	    }
		
		@RequestMapping(value="getFAJJXGLLists")
		public  Object getFAJJXGLLists(JXXXSerachInfo JXXXSerachInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getFAJJXGLLists(JXXXSerachInfo);
	    }
		
		@RequestMapping(value="getSLDJXGLLists")
		public  Object getSLDJXGLLists(JXXXSerachInfo JXXXSerachInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getSLDJXGLLists(JXXXSerachInfo);
	    }
		
		
		@RequestMapping(value="getZFZGLists")
		public  Object getZFZGLists(ZFZGSearchInfo ZFZGSearchInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getZFZGLists(ZFZGSearchInfo);
	    }
		
		@RequestMapping(value="getQTJKFLists")
		public  Object getQTJKFLists(QTJKFXXSearchInfo QTJKFXXSearchInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getQTJKFLists(QTJKFXXSearchInfo);
	    }
		
		@RequestMapping(value="getKSDFLists")
		public  Object getKSDFLists(KSDFSSSearchInfo KSDFSSSearchInfo){ 
			JXGLDB db =new JXGLDB();		
			 return db.getKSDFLists(KSDFSSSearchInfo);
	    }
		
		@RequestMapping(value="getsearchJXGLLists")
		public  Object getsearchJXGLLists(String searchtext){ 
			
			if(searchtext!=null&&!searchtext.equals("")){
			JXGLDB db =new JXGLDB();
		     return db.getsearchJXGLLists(searchtext);
			}else{
				return  null;
			}
		
	    }
			
		@RequestMapping(value ="ShowNullSmallPic", method = RequestMethod.GET)
		@OutputCache(Duration =86400)
		public ResponseEntity<byte[]> ShowNullSmallPic() {
			return File(SmallPicPath, "image/jpeg");
		}
		@RequestMapping(value="deleteJXXX")
		public Object deleteJXXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteJXXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		@RequestMapping(value="deleteFAJJXXX")
		public Object deleteFAJJXXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteFAJJXXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		
		@RequestMapping(value="deleteSLDJXXX")
		public Object deleteSLDJXXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteSLDJXXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		@RequestMapping(value="deleteZFZGXX")
		public Object deleteZFZGXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteZFZGXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		
		@RequestMapping(value="deleteQTJKFXX")
		public Object deleteQTJKFXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteQTJKFXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
		
		@RequestMapping(value="deleteKSDFXX")
		public Object deleteKSDFXX(String IDS){
	        SPJsonResult spresult = new SPJsonResult();
	        spresult.success = false;
	        JXGLDB db = new JXGLDB();
	        String []arrayID = IDS.split(",");
	        for (int i = 0; i < arrayID.length; i++)
	        {
	            spresult = db.deleteKSDFXX(arrayID[i]);
	            if (spresult.success)
	            {
	            }
	          }   
	        return spresult;
	    }
	    @RequestMapping(value = "importExcel", method = RequestMethod.POST)
	    public Object importJXGLExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<JXGLModels> list = reader.GetList(1, JXGLModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (JXGLModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportJXGLXX(model);
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
	    
	    @RequestMapping(value = "importFAJJXGLExcel", method = RequestMethod.POST)
	    public Object importFAJJXGLExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<FAJJXGLModels> list = reader.GetList(1, FAJJXGLModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (FAJJXGLModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportFAJJXGL(model);
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
	    
	    @RequestMapping(value = "importSLDJXGLExcel", method = RequestMethod.POST)
	    public Object importSLDJXGLExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<SLDJXGLModels> list = reader.GetList(1, SLDJXGLModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (SLDJXGLModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportSLDJXGLXX(model);
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
	    @RequestMapping(value = "importZFZGExcel", method = RequestMethod.POST)
	    public Object UploadZFZGExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_ZFZGModels> list = reader.GetList(1, GRFZ_ZFZGModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_ZFZGModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportZFZGXX(model);
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
	    
	    @RequestMapping(value = "importQTJKFExcel", method = RequestMethod.POST)
	    public Object UploadQTJKFExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_QTJKFModels> list = reader.GetList(1, GRFZ_QTJKFModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_QTJKFModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportQTJKFXX(model);
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
	    
	    @RequestMapping(value = "importKSDFExcel", method = RequestMethod.POST)
	    public Object UploadKSDFExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_KSDFModels> list = reader.GetList(1, GRFZ_KSDFModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_KSDFModels model : list)
	        {   	    		
	    		JXGLDB db = new JXGLDB();
	    		SPJsonResult spresult1 = db.exportKSDFXX(model);
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
}
