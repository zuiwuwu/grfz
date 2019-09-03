<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Organization Chart Plugin</title>

  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/jquery.orgchart.min.css" />
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/style.css">
</head>
<body >

  <div id="chart-container"></div>
  <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/jquery.min.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/html2canvas.min.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/jquery.orgchart.min.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/jquery.mockjax.min.js"></script>
  
   <script type="text/javascript">
    $(function() {
    	
    var dk = $(window.parent.document).find("#sunPage").attr("src"); 
   /* console.log(window.parent.document.body.scrollTo);   */
  /*  console.log(window.parent.document.body.scrollTo); */
  	
  
  /* $(window.parent.document).find("#sunPage").scrollTop("600");  */
    var s;
    if (dk.indexOf("?") != -1) {
    	var str = dk.substr(1);
    	strs = str.split("?")[1];
    	
    	s=strs.split("=")[1]
    	
    	}
      $('#chart-container').orgchart({
        'data' : '/grfz/dictionary/zuzhis?s='+s,
        'depth': 999,
        'nodeContent': 'title',
        'nodeTitle': 'name',
        'nodeID': 'id',
        'zoom': true ,
        'createNode': function($node, data) {
           
            var secondMenu = '<div class="second-menu"><img style="with:50px;height:160px;" class="avatar" src="/grfz/images/avatar/案件侦办队' + data.name + '半身.jpg"></div>';
           
            $node.prepend(secondMenu);
            
          }
      });

    });
  </script>
  </body>
</html>