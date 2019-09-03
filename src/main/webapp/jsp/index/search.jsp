<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false" %>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="free icons, icon search, iconfinder, market place"/>
    <meta name="description" content="elasticsearch jest"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <style>
        .bs-docs-footer {
            padding-top: 40px;
            padding-bottom: 40px;
            margin-top: 420px;
            color: #767676;
            text-align: center;
            border-top: 1px solid #e5e5e5;
        }
        .search{
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 50px;
        }
        .content{
        	width:500px;
        }
        em{
            font-style: normal;
            color: red;
        }
        p{
            color : white;
            text-align: left;
            font-size:14px;
        }
        span{
         	font-size:14px;
         	color : white;
        }
    </style>
</head>
<body>
<div>
<%-- <div  class="container">
    	<c:if test="${!empty count}">
                <h2><span >搜索关键字<em>${queryString}</em>共检索到<em>${count}</em>条记录.</span></h2>
            </c:if>
	</div> --%>

<div class="content" >
    
 
        <c:if test="${empty articles}">
            <h2><span class="label label-success">没有查询到内容</span></h2>
        </c:if>     
         <c:if test="${!empty count}">
                <h2><span >搜索关键字<em>${queryString}</em>共检索到<em>${count}</em>条记录.</span></h2>
            </c:if>  
        <c:forEach   items="${articles}" var="article">
        <br>
            <div>
                <h3><a href="${article.url}" target="_blank">${article.jbxxdabh}</a></h3>
                <span>${article.xm}</span>
                <p>性别：${article.sex} 年龄：${article.nl} 民族：${article.mz} 出生地：${article.csd}  警号：${article.jh}  手机号：${article.phone}  邮箱：${article.emal} 身份证：${article.gmsfzhm} 工作时间："${article.cjgzsj} 职务："${article.zw} 大部门："${article.dbm} 现工作单位："${article.xgzdw}" </p>
            </div>            
            <br>
        </c:forEach>
    </div>
</div>

<!--返回顶部开始-->
<!-- <div id="full" style="width:0px; height:0px; position:fixed; right:70px; bottom:150px; z-index:100; text-align:center; background-color:transparent; cursor:pointer;">
    <a href="javascript:;" class="top" id="top"><img src="/images/top.png" width="70px;" height="70px;" border=0 alt="回到顶部"></a>
</div>
<script src="/js/top.js" type="text/javascript"></script> -->

<!--返回顶部结束-->
<!-- <script type="text/javascript">
$(function() {
		
	
/*     var dk = $(window.parent.document).find("#sun").attr("src"); 

    var s;
    if (dk.indexOf("?") != -1) {
    	var str = dk.substr(1);
    	strs = str.split("?")[1];
    	
    	s=strs.split("=")[1]
    	
    	}

    console.log(s) */
/*  	$.ajax({
 		async: false,//是否异步请求
 		cache:false,
	    type: 'get',

	    url: "http://localhost:8080/grfz/dictionary/getSearchLists",
		data:{
			serachtext:s
		},
		dataType:'json',

	    success: function(data){
	    	console.log(data)
	    }
	}); */ 

    });

</script> -->
</body>
</html>
