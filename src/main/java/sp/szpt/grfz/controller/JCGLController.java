package sp.szpt.grfz.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import sp.szpt.common.Controller;
import sp.szpt.common.OutputCache;
import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.SPListModel;
import sp.szpt.excel.ExcelReader;
import sp.szpt.grfz.model.GRFZ_JBXXModels;
import sp.szpt.grfz.model.JBXXGLDB;
import sp.szpt.grfz.model.JCGLDB;
import sp.szpt.grfz.model.GRFZ_JCDAModels;
import sp.szpt.grfz.model.JCXXSearchInfo;

@RestController
@RequestMapping("JCGL")
public class JCGLController extends Controller{
	@RequestMapping(value="getJCGLLists")
	public  Object getJCGLLists(JCXXSearchInfo JCXXSearchInfo){ 
		JCGLDB db =new JCGLDB();
		 return db.getJCGLLists(JCXXSearchInfo);
    }	
	
	@RequestMapping(value="xiangqing")
	public  Object getJCGLListsS(String S,String GRHDW,JCXXSearchInfo JCXXSearchInfo){ 
		 if (S.equals("1")) {
			 return dbhelper.QuerySPList("select JCDABH ,GRHDW ,JLMC,JCSJ,SJCSZW,JCYY,PZJGMC,WJZM,JH,SSDW from grfz_jcda where GRHDW = '"+GRHDW+"' and JLMC is not null",JCXXSearchInfo);
		}else{
			return dbhelper.QuerySPList("select JCDABH ,GRHDW ,CFMC,JCSJ,SJCSZW,JCYY,PZJGMC,WJZM,JH,SSDW from grfz_jcda where GRHDW = '"+GRHDW+"' and CFMC is not null",JCXXSearchInfo);
		}
		
    }
	
	 @RequestMapping(value = "ShowFilePreview", method = RequestMethod.POST)
		@OutputCache()
		public String ShowFilePreview(String ID) throws Exception {
			JBXXGLDB db=new JBXXGLDB();
			return db.getFileUrl(ID);
		}
	
	@RequestMapping(value = "getJCXXdetail", method = RequestMethod.POST)
	public Object getJCXXdetail(String JCDABH){
		JCGLDB db=new JCGLDB();
		 return db.getJCXXdetail(JCDABH);
	}
	
	@RequestMapping(value = "editJCXX", method = RequestMethod.POST)
	public Object editJCXX(GRFZ_JCDAModels GRFZ_JCDAModels){
		JCGLDB db=new JCGLDB();
		 return db.editJCXX(GRFZ_JCDAModels);
	}
	
	@RequestMapping(value = "importExcel", method = RequestMethod.POST)
	public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
		 SPJsonResult spresult = new SPJsonResult();
	        if (myfiles == null)
	        	return null;
	        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
	        reader.Open();	
	    	List<GRFZ_JCDAModels> list = reader.GetList(1, GRFZ_JCDAModels.class);
	    	StringBuilder errorBuilder = new StringBuilder();
	    	for (GRFZ_JCDAModels model : list)
	        {   	    		
	    		JCGLDB db = new JCGLDB();
	    		SPJsonResult spresult1 = db.exportJCGLXX(model);
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
	
	@RequestMapping(value = "importJCXX")	
	public Object importJCXX(GRFZ_JCDAModels JCGLModels ) throws Exception {
			JCGLDB db=new JCGLDB();
			return db.importJCXX(JCGLModels);
		}
	
	@RequestMapping(value="deleteJCXX")
	public Object deleteJCXX(String IDS){
        SPJsonResult spresult = new SPJsonResult();
        spresult.success = false;
        JCGLDB db = new JCGLDB();
        String []arrayID = IDS.split(",");
        for (int i = 0; i < arrayID.length; i++)
        {
            spresult = db.deleteJCXX(arrayID[i]);
            if (spresult.success)
            {
            }
          }   
        return spresult;
    }
}
