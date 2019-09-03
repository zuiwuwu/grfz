package sp.szpt.grfz.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import sp.szpt.common.AuthPassport;
import sp.szpt.common.AuthPassportReturnType;
import sp.szpt.common.CommonMethod;
import sp.szpt.common.Controller;
import sp.szpt.common.SPJsonResult;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;
import sp.szpt.grfz.common.UserSession;
import sp.szpt.grfz.model.GRFZDB;
import sp.szpt.grfz.model.JfModels;

@RequestMapping("")
@RestController
public class MainController extends Controller{
	private IDbHelper dbHelper = DbHelperAccess.GetDbHelper();
	@Autowired
	public HttpServletRequest request;

	@RequestMapping(value = "/")
	@AuthPassport(returntype=AuthPassportReturnType.VIEW)
	public Object root() {
		ModelAndView mv = new ModelAndView("redirect:/grfz/index");
		return mv;
	}
	
	/**
	 * 进入主页
	 * @return
	 */
	@RequestMapping(value = "/grfz/index")
	public Object index() {
		String classnameString = request.getParameter("class");
		if(StringUtils.isEmpty(classnameString))
			classnameString = "App.grczpt.login.login";
		Map<String, Object> mapparams = new HashMap<String, Object>(10);
		mapparams.put("class", classnameString);
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}
	
	
	@RequestMapping(value ="/grfz/login",method = RequestMethod.POST)
	public Object login(HttpServletRequest request, HttpServletResponse response,String username,String password) {	
		System.out.println(username+password);
		String sql = String.format("select count(*) from grfz_user where username = '%s' and password = '%s'",username,CommonMethod.MD5(password));
		Integer a= dbHelper.queryForObject(sql, Integer.class);
		UserSession user = new UserSession();
		user.setUsername(username);
		user.setPassword(password);
		HttpSession httpSession = request.getSession(false);
		httpSession.setAttribute("USER", user);
		if(a>0){
			/*spResult.success=true;
			spResult.msg="登陆成功";*/
			return "登陆成功";
		}else{
			/*spResult.success=false;
			spResult.msg="登陆失败";*/
			return "登陆失败";
		}		
		
	}
	
	@RequestMapping(value = "/grfz/main")
	public Object index(HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> mapparams = new HashMap<String, Object>(10);		
		mapparams.put("class", "App.grczpt.main.index");
		HttpSession httpSession = request.getSession(false);
		UserSession	model = null;
		if(httpSession != null){
			model = (UserSession) httpSession.getAttribute("USER");
			if(model != null){
				mapparams.put("username", model.username);
				mapparams.put("password", model.password);
				String rights = String.format("select role from grfz_user where username = '%s'",model.username);
				mapparams.put("role", rights);
			}
			
		}

		/*UserSession user = new UserSession();
		user.setPassword(password);*/
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}
	
	@RequestMapping(value = "/grfz/xinxi")
	public Object index1() {
		String classnameString = request.getParameter("class");
		if(StringUtils.isEmpty(classnameString))
			classnameString = "App.grczpt.Home.grxq";
		Map<String, Object> mapparams = new HashMap<String, Object>(10);
		mapparams.put("class", classnameString);
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}
	
	@RequestMapping(value = "/grfz/jifen1")
	public Object index2() {
		String classnameString = request.getParameter("class");
		if(StringUtils.isEmpty(classnameString))
			classnameString = "App.grczpt.yhgl.index";
		Map<String, Object> mapparams = new HashMap<String, Object>(10);
		mapparams.put("class", classnameString);
		
		ModelAndView mv = new ModelAndView("/index/index", "commparams",
				mapparams);
		return mv;
	}

	
}
