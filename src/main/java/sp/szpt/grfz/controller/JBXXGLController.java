package sp.szpt.grfz.controller;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import sp.szpt.common.Controller;
import sp.szpt.common.OutputCache;
import sp.szpt.common.SPJsonResult;
import sp.szpt.excel.ExcelReader;
import sp.szpt.grfz.model.AddJBXX;
import sp.szpt.grfz.model.JBXXGLDB;
import sp.szpt.grfz.model.GRFZ_JBXXModels;
import sp.szpt.grfz.model.JBXXSearchInfo;


@RestController
@RequestMapping("JBXXGL")
public class JBXXGLController  extends Controller {
	
	@RequestMapping("getJBGLLists")
	public Object getJBGLLists(JBXXSearchInfo JBXXSearchInfo){
		 JBXXGLDB db=new JBXXGLDB();
		 return db.getJBGLLists(JBXXSearchInfo);
	}
	@RequestMapping(value = "UploadFile", method = RequestMethod.POST)
	@ResponseBody()
    public Object UploadFile(String ID, @RequestParam(value="FILE") MultipartFile FILE) throws IllegalStateException, IOException{
		Map<String,Object> map = new HashMap<String,Object>();
		System.out.println(ID+"233");
		SPJsonResult spJsonResult=new SPJsonResult();
		String imgurl;
		String oldFileName=new String(FILE.getOriginalFilename().getBytes("ISO-8859-1"),"UTF-8");
		String fileName = UUID.randomUUID().toString().replace("-", "")+oldFileName;
		String fileid=UUID.randomUUID().toString().replace("-", "");
		java.io.File tagurl = new java.io.File("D:\\grfz");
		//如果文件夹不存在，新建文件夹
		if(!tagurl.exists()){
			tagurl.mkdir();
		}
		java.io.File file = new java.io.File("D:\\grfz\\" + fileName);
		imgurl = "D:\\grfz\\" + fileName;
		if (!file.exists()) {
			file.mkdir();
		}
		 FILE.transferTo(file);
		 JBXXGLDB db=new JBXXGLDB();
		 spJsonResult= db.inserttpxx(fileid, imgurl);
		 if(spJsonResult.success==true){
			 map.put("success", true);
			 map.put("msg", "上传成功");
			 map.put("fileid", fileid);
		 }else{
			 map.put("success", false);
			 map.put("msg", "上传失败");
			 map.put("fileid", fileid);
		 }		 
		  return  map;
	}
    
	        @RequestMapping(value = "ShowFilePreview", method = RequestMethod.GET)
			@OutputCache()
			public ResponseEntity<byte[]> ShowFilePreview(String ID) throws Exception {
				JBXXGLDB db=new JBXXGLDB();
				return File(db.getFileUrl(ID), "image/jpeg");
			}
			
			
			
			
			@RequestMapping(value = "importJBXX")	
			public Object importJBXX(GRFZ_JBXXModels GRFZ_JBXXModels ) throws Exception {
					JBXXGLDB db=new JBXXGLDB();
					return db.importJBXX(GRFZ_JBXXModels);
				}
			@RequestMapping(value = "deleteJBXX")	
			public Object deleteJBXX(String IDS){
		        SPJsonResult spresult = new SPJsonResult();
		        spresult.success = false;
		        JBXXGLDB db = new JBXXGLDB();
		        String []arrayID = IDS.split(",");
		        for (int i = 0; i < arrayID.length; i++)
		        {
		            spresult = db.deleteJBXX(arrayID[i]);
		            if (spresult.success){
		            }
		          }   
		        return spresult;
		    }
		
			@RequestMapping(value = "importExcel", method = RequestMethod.POST)
			public Object UploadExcel(String ID, @RequestParam(value="FILE") MultipartFile myfiles) throws IOException{
				 SPJsonResult spresult = new SPJsonResult();
			        if (myfiles == null)
			        	return null;
			        ExcelReader reader = new ExcelReader(new ByteArrayInputStream(myfiles.getBytes()),myfiles.getOriginalFilename());
			        reader.Open();	
			    	List<GRFZ_JBXXModels> list = reader.GetList(1, GRFZ_JBXXModels.class);
			    	StringBuilder errorBuilder = new StringBuilder();
			    	for (GRFZ_JBXXModels model : list)
			        {   	    		
			    		JBXXGLDB db = new JBXXGLDB();
			    		SPJsonResult spresult1 = db.exportJBXX(model);
			            if (spresult1.success){
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
			@RequestMapping(value = "getJBXXdetail", method = RequestMethod.POST)
			public Object getJBXXdetail(String JBXXDABH){
				 JBXXGLDB db=new JBXXGLDB();
				 return db.getJBXXdetail(JBXXDABH);
			}
			
			@RequestMapping(value = "editJBXX", method = RequestMethod.POST)
			public Object editJBXX(GRFZ_JBXXModels GRFZ_JBXXModels){
				 JBXXGLDB db=new JBXXGLDB();
				 return db.editJBXX(GRFZ_JBXXModels);
			}	
}
