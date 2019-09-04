package sp.szpt.grfz.controller;



import java.net.InetAddress;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/*import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.xpack.client.PreBuiltXPackTransportClient;*/
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

/*import es5.TestEsClient;*/
import sp.szpt.common.Controller;
import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.grfz.common.ElsearchModels;
import sp.szpt.grfz.common.SMessage;
import sp.szpt.grfz.common.SPResult;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.model.GRFZDB;
import sp.szpt.grfz.model.GRFZSearchInfo;
import sp.szpt.grfz.model.GrowEventSeachInfo;
import sp.szpt.grfz.model.JXGLDB;
import sp.szpt.grfz.model.JbxxModels;
import sp.szpt.grfz.model.Login;
import sp.szpt.grfz.model.SerachInfo;



@RestController
@RequestMapping("GRFZ")
	
public class GRFZController extends Controller {
	private IDbHelper dbHelper = DbHelperAccess.getDbhelper();

	@RequestMapping(value = "index")
	public Object index(HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> mapparams = new HashMap<String, Object>(10);
		mapparams.put("class", "App.index.index");
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			if(model != null){
				mapparams.put("username", model.username);
				mapparams.put("password", model.password);
			}
			
		}
		/*UserSession user = new UserSession();
		user.setPassword(password);*/
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}
	@RequestMapping(value = "reset")
	public Object reset(HttpServletRequest request, HttpServletResponse response) {		 
		Map<String, Object> mapparams = new HashMap<String, Object>(10);
		mapparams.put("class", "App.index.index");
		HttpSession httpSession = request.getSession(false);
		httpSession.removeAttribute("USER");
		UserSession	model = null;
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			if(model != null){
				mapparams.put("username", model.username);
				mapparams.put("password", model.password);
			}
			
		}
		/*UserSession user = new UserSession();
		user.setPassword(password);*/
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}
	
	
	@RequestMapping(value = "getSerachLists", method = RequestMethod.POST)
	public  Object getSerachLists(GRFZSearchInfo GRFZSearchInfo){ 
		
		
		 return null;
    }
	
	
	
	@RequestMapping(value ="login",method = RequestMethod.POST)
	public Object login(HttpServletRequest request, HttpServletResponse response,String username,String password) {	
		SPJsonResult spResult = new SPJsonResult();	
		GRFZDB  db=new GRFZDB();
		if(db.login(username,password)>0){
			spResult.success=true;
			spResult.msg="登陆成功";
		}else{
			spResult.success=false;
			spResult.msg="登陆失败";
		}
		      
		UserSession user = new UserSession();
		user.setUsername(username);
		user.setPassword(password);
		HttpSession httpSession = request.getSession(false);
		httpSession.setAttribute("USER", user);
		
		return spResult;
	}
	
/*	@RequestMapping(value="getSearchLists")
	public  Object getsearchLists(SerachInfo SerachInfo){ 
		
		if(SerachInfo.searchtext!=null&&!SerachInfo.searchtext.equals("")){
			GRFZDB  db=new GRFZDB();
			
	     return db.getSearchLists(SerachInfo);
		}else{
			return  null;
		}
    }*/
	

	@RequestMapping(value ="getTotal",method = RequestMethod.POST)
	public  Object getTotal(){   
         GRFZDB  db=new GRFZDB();
		 return db.getTotal();
    }
	//设置积分
	@RequestMapping(value ="setGrade",method = RequestMethod.POST)
	public  void setGrade(String TEXT){   
		System.out.println(TEXT);
    }
	//提交自我评价
	@RequestMapping(value ="myAppraise",method = RequestMethod.POST)
	public  void myAppraise(String TEXT){  
		GRFZDB  db=new GRFZDB();
		db.myAppraise(TEXT);
		System.out.println(TEXT);
    }
	
	//互动
	@RequestMapping(value ="sendMes",method = RequestMethod.POST)
	public  Object myPassword(String SENDPP,String CONTEXT,String RECEIVER ){ 
		SPResult result = new SPResult();
		
		
		DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String formatDate = dFormat.format(new Date());
		String id = UUID.randomUUID().toString().replace("-", "");
		result.setErrcode(dbHelper
				.update("INSERT INTO MESSAGE (ID,SENDPP,CONTEXT,TIME,RECEIVER,READ) VALUES(?,?,?,?,?,?)",
						id, SENDPP, CONTEXT, formatDate, RECEIVER,
						1));
	
		return result;
		
    }
	
	//消息列表
	@RequestMapping(value ="recMes",method = RequestMethod.POST)
	public  Object recMes(GrowEventSeachInfo searchInfo,String user ){ 
		SPResult result = new SPResult();
		
		
		
		return dbHelper.QuerySPList("select * from MESSAGE t where time=(select max(time) from MESSAGE where sendpp =t.sendpp) and RECEIVER = '"+user+"' ", searchInfo);
	
		
		
    }
	
	//消息提示
		@RequestMapping(value ="recMess",method = RequestMethod.POST)
		public  Object recMess(String NAME){ 
			SPResult result = new SPResult();
			
			List<SMessage>  list= dbHelper.queryForObjectList("select * from MESSAGE where RECEIVER = '"+NAME+"'", SMessage.class);
			String flag = "";
			for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getREAD() == 0) {
					flag = "全部已读";
				}else{
					flag = "有未读信息";
				}
			}
		
			return flag;
						
	    }
	
	//消息详情
		@RequestMapping(value ="recMesXq",method = RequestMethod.POST)
		public  Object recMesXq(GrowEventSeachInfo searchInfo,String user,String rec){ 
			SPResult result = new SPResult();
			
			
			 
			return dbHelper.QuerySPList("select * from (select * from MESSAGE where RECEIVER = '"+user+"' and SENDPP = '"+rec+"'  order by time desc) where rownum<=3 ", searchInfo);
		
			
			
	    }
	
}