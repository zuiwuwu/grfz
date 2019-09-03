package sp.szpt.grfz.model;

import sp.szpt.common.SPExtSearchInfo;

import sp.szpt.grfz.util.Util;

public class SerachInfo extends SPExtSearchInfo{
public String searchtext;
public  String ToString(){
	Util util=new Util();
	if(searchtext.contains(",")){		
	return util.getsqlString(searchtext.split(","));
	}else  if(searchtext.contains("，")){
		return util.getsqlString(searchtext.split("，"));
	}else{		
	return util.getmhsqlString(searchtext);	
	}
}
}
