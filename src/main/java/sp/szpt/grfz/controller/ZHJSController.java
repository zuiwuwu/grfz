package sp.szpt.grfz.controller;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.RestController;

import com.mysql.fabric.xmlrpc.base.Array;

import sp.szpt.common.Controller;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.model.JbxxModels;
import sp.szpt.grfz.model.ZHJSDB;


/**
 * 用于获取综合评估的数据
 */
@RestController
@RequestMapping("ZHJS")
public class ZHJSController extends Controller{
	private IDbHelper dbHelper = DbHelperAccess.GetDbHelper();
	
		/**
		 * 获取工龄数据
		 */
		@RequestMapping(value ="qjjygntj"/*,method = RequestMethod.POST*/)
		public Object qjjygntjSelect() throws ParseException{   
			 ZHJSDB zhjsdb = new ZHJSDB(); 
			 List<JbxxModels> list = zhjsdb.getJbxx();
			 int  times1 = 0;
			 String s = "'-'";
			 int  times2 = 0;
			 int  times3 = 0;
			 int  times4 = 0;
			 int  times5 = 0;
		     
		     
			 int date1;
//			   SimpleDateFormat simpleDateFormat = new  SimpleDateFormat("yyyyMMdd");
			   for (int i = 0; i < list.size(); i++) {
				
				if(list.get(i).getGLS() != null){
				date1= Integer.parseInt(list.get(i).getGLS());
				 
				System.out.println(date1);
				Date date = new Date();
//				Double   time =  (double) ((date.getTime()-date1.getTime())/1000/60/60/24);
				
				
				if( 0< date1 && date1 <= 5){
					times1= times1+1;
					
				}
				else if(5< date1 && date1 <= 10){
					times2=times2+1;
					
				}else if(10< date1 && date1 <= 15){
					times3=times3+1;					
						
					
				}else if(15< date1 && date1 <= 20){
					times4=times4+1;
					
				}else{
					times5=times5+1;
					
				}
				
				}
				
			}
			 
			
						
			return times1+","+times2+","+times3+","+times4+","+times5;
	    }
	
	
		@RequestMapping(value ="qjjyjrfstj"/*,method = RequestMethod.POST*/)
		public Object qjjyjrfstj(){  
			
			 ZHJSDB zhjsdb = new ZHJSDB(); 
			 List<JbxxModels> list = zhjsdb.qjjyjrfstj();
			 int  times1 = 0;
		     int  times2 = 0;
		     int  times3 = 0;
		     int  times4 = 0;
		     
		     
		     
			 try {
				 
			 
			   for (int i = 0; i < list.size(); i++) {
				
				if(list.get(i).getJRFS()!= null){
				String str = list.get(i).getJRFS();
		          if("考试".equals(str)){
		        	  times1 = times1+1;
		        	  continue;
		          }
		          if("国家统一分配".equals(str)){
		        	  times2 = times2+1;
		        	  continue;
		          }
		          if("招聘".equals(str)){
		        	  times3 = times3+1;
		        	  continue;
		          }
		          if("其他".equals(str)){
		        	  times4 = times4+1;
		        	  continue;
		          }
				
				}
				
			}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
						
			return times1+","+times2+","+times3+","+times4;
	    }
	
		@RequestMapping(value ="gwyndkhdcqk"/*,method = RequestMethod.POST*/)
		public Object gwyndkhdcqk(){  
			
			 ZHJSDB zhjsdb = new ZHJSDB(); 
			 List<JbxxModels> list = zhjsdb.gwyndkhdcqk();
			 int  times1 = 0;
		     int  times2 = 0;
		     int  times3 = 0;
		     int  times4 = 0;
		     int  times5 = 0;
		     
		     
			 try {
				 
			 
			   for (int i = 0; i < list.size(); i++) {
				
				if(list.get(i).getGRADE()!= null){
				String str = list.get(i).getGRADE();
		          if("优秀".equals(str)){
		        	  times1 = times1+1;
		        	  continue;
		          }
		          if("称职".equals(str)){
		        	  times2 = times2+1;
		        	  continue;
		          }
		          if("基本称职".equals(str)){
		        	  times3 = times3+1;
		        	  continue;
		          }
		          if("不称职".equals(str)){
		        	  times4 = times4+1;
		        	  continue;
		          }
		          if("不定等次".equals(str)){
		        	  times5 = times5+1;
		        	  continue;
		          }
		          
		          
				}
				
			}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
						
			return times1+","+times2+","+times3+","+times4+","+times5;
	    }
		
		@RequestMapping(value ="qjjyxjwcqktj"/*,method = RequestMethod.POST*/)
		public Object qjjyxjwcqktj(){  
			SPResult result = new SPResult();

			 int  times1 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '政工纪检室'");
		     int  times2 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '综合保障室'");;
		     int  times3 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '情报指挥室'");;
		     int  times4 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '执法监督室'");;
		     int  times5 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '维稳服从队'");;
		     int  times6 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '案件侦办队'");;
		     int  times7 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '治安防控队'");;
		     int  times8 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '明珠派出所'");;
		     int  times9 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '寺港派出所'");;
		     int  times10 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '滨江派出所'");;
		     int  times11 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '周山河街区派出所'");;
		     int  times12 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '野徐派出所'");;
		     int  times13 = dbHelper.update("select * from grfz_jcda where JLMC IS NOT  NULL AND SSDW = '医药城派出所'");;
		     
	System.out.println(times1+"-------"+times6);
						
			return times1+","+times2+","+times3+","+times4+","+times5+","+times6+","+times7+","+times8+","+times9+","+times10+","+times11+","+times12+","+times13;
	    }
		
		
}
