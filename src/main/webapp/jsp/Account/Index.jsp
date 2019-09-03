<!DOCTYPE html>
<html>
<head>
    <title>${commparams.get("Title")}</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/Extjs/ext/resources/css/ext-all.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/CLXX/GetLanguage"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/images/login/login.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/ext/bootstrap.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/App/Common/VTypes.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/App/Common/md5.js"></script>
    

</head>
<script type="text/javascript">
    Ext.Loader.setPath('SZPT', '<%=request.getContextPath()%>/Extjs/app');
    Ext.Loader.setPath('App', '<%=request.getContextPath()%>/App');
    Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/Extjs/ext/resources/themes/images/default/tree/s.gif';
    //Ext.tip.QuickTipManager.init();
    Ext.QuickTips.init();
    Ext.CopyRight = '${commparams.get("CopyRight")}';
    Ext.Version = '${commparams.get("Version")}';
    Ext.login_ariginaldata = '${commparams.get("login_ariginaldata")}';
    Ext.certparams = ${commparams.get("certparams")};
    var loadedCSS = {};
    Ext.loadCSS = function(path)
    {
    	if(loadedCSS[path])
    		return ;
    	loadedCSS[path] = true;
    	  var head = document.getElementsByTagName('head')[0];
    	    var link = document.createElement('link');
    	    link.href = path;
    	    link.rel = 'stylesheet';
    	    link.type = 'text/css';
    	    head.appendChild(link);
    }
    Ext.define('View.Main.CommonView', {
        extend: 'Ext.Viewport',
        renderTo: Ext.getBody(),
        autoScroll: true,
        layout: 'hbox',
        initComponent: function () {
            this.vloglist = Ext.create('${commparams.get("LOGONPAGE")}', {
                flex: 1,
                height: '100%',
                logoCls: '${commparams.get("logoCls")}' 
            });
            this.items = [this.vloglist];
            this.callParent(arguments);
        },
        afterRender: function () {
            this.callParent();
            if (Ext.isIE8m) {
                setTimeout(function () {
                    Ext.MessageBox.alert('警告', '<div><a>浏览器版本过低,将会影响浏览的效率！</a><a href="/download/GoogleChromeframeStandaloneEnterprise.msi" target="_blank">请下载加速插件</a><a>，然后重启浏览器。</a></div>');
                },
                100);
            }
        }
    });
    Ext.onReady(function () {
        var app = Ext.create('View.Main.CommonView', {});

    });
</script>
<body class="x-unselectable">
</body>
</html>
