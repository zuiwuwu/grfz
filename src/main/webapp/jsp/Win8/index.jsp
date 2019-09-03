<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>${commparams.get("Title")}</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.ico" />
    <link href="<%=request.getContextPath()%>/App/Common/calendar/resources/css/calendar.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/Extjs/ext/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/win8.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/Extjs/ext/bootstrap.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/GetLanguage"></script>
</head>
<script type="text/javascript">
    Ext.Loader.setPath('App', '<%=request.getContextPath()%>/App');
    Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/Extjs/ext/resources/themes/images/default/tree/s.gif';
    //Ext.tip.QuickTipManager.init();
    Ext.QuickTips.init();


    Ext.saveConfig = function(section,key,value)
    {
        var vtext = encodeURIComponent(JSON.stringify(value));
        if (window.localStorage) {
            window.localStorage['sunpanel.' + section + '.' + key] = vtext;
        }
        else {
            Ext.log('浏览器不支持localStorage');
        }
    };

    
    Ext.getConfig = function(section,key)
    {
        if (window.localStorage) {
            var vtext = window.localStorage['sunpanel.' + section + '.' + key];
            if (typeof vtext == 'undefined')
                return null;
            return Ext.JSON.decode(decodeURIComponent(vtext));
        }
        else {
            Ext.log('浏览器不支持localStorage');
            return null;
        }
    };
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
  
    
  
    Ext.Loader.setConfig({
 		disableCaching: true
    });

  

    Ext.define('View.Main.CommonView', {
        extend: 'Ext.Viewport',
        renderTo: Ext.getBody(),
        //autoScroll:true,
        layout: {
            type: 'fit'
        },
        initComponent: function () {
            this.vloglist = Ext.create('App.WIN8Main.Main', {
            });
            this.items = [this.vloglist];

            this.vminViewWidth = this.vloglist.vminViewWidth;
            this.vminViewHeight = this.vloglist.vminViewHeight;
            this.callParent(arguments);
        },
        afterRender: function () {
            this.callParent();
            var vbody = Ext.getBody();
            var me = this;
            vbody.on('mousemove',function(e)
            {
                var x = e.getX();
                var y = e.getX();

                if(me.lastx != x
                ||me.lasty != y)
                {
                    me.lastx = x;
                    me.lasty = y;
                    if(!me.movetimerid)
                    {
                        me.movetimerid =setTimeout(function()
                        {
                            me.movetimerid = null;

                            Ext.Ajax.request({
                                url: '<%=request.getContextPath()%>/Main/Check', 
                                method: 'post', //方法  
                                callback: function (options, success, response) {
                                }
                            });
                        },30000);
                    }
                }
            });
        },
        onMouseChange:function()
        {
        	var me = this;
            if(!me.movetimerid)
            {
                me.movetimerid =setTimeout(function()
                {
                    me.movetimerid = null;

                    Ext.Ajax.request({
                        url: '<%=request.getContextPath()%>/Main/Check', 
                        method: 'post', //方法  
                        callback: function (options, success, response) {
                        }
                    });
                },30000);
            }
        }
    });
    Ext.onReady(function () {
       
        var app = Ext.create('View.Main.CommonView', {
        });
        Ext.mainapp = app;
        app.changeSize = function () {
            var vViewWidth = Ext.Element.getViewWidth(); //窗口大小
            var vViewHeight = Ext.Element.getViewHeight(); //窗口大小

            var vw = vViewWidth; //
            var vh = vViewHeight;

//             if(Ext.notifywnd)
//             {
//                 if(Ext.notifywnd.rendered)
//                     Ext.notifywnd.setXY([vViewWidth - Ext.notifywnd.getWidth() - 10,vViewHeight - Ext.notifywnd.getHeight() - 32]);
//             }
//             if(app.notifyicon)
//             {
//                 app.notifyicon.setXY([vViewWidth - app.notifyicon.getWidth(),vViewHeight - app.notifyicon.getHeight()]);
//             }

            if (app.vminViewWidth) {
                if (vw < app.vminViewWidth) {
                    vw = app.vminViewWidth;
                }
            }
            if (app.vminViewHeight) {
                if (vh < app.vminViewHeight)
                    vh = app.vminViewHeight;
            }

            var vvscroll = 0;
            if (vw != vViewWidth) {
                Ext.getBody().setStyle('overflow-x', 'scroll');
                vhscroll = Ext.getBody().el.dom.scrollHeight - Ext.getBody().el.dom.clientHeight;

                //横向滚动条导致高减少
                vViewHeight = Ext.getBody().el.dom.clientHeight;
                vh = vViewHeight;
                if (typeof app.vminViewHeight != 'undefined') {
                    if (vh < app.vminViewHeight)
                        vh = app.vminViewHeight;
                }
            }
            else {
                Ext.getBody().setStyle('overflow-x', 'hidden');
            }

            var vvscroll = 0;
            if (vh != vViewHeight) {
                Ext.getBody().setStyle('overflow-y', 'scroll');
                vvscroll = Ext.getBody().el.dom.scrollWidth - Ext.getBody().el.dom.clientWidth;
                //纵向滚动条导致宽减少
                vViewWidth = Ext.getBody().el.dom.clientWidth;

                if (vvscroll != 0) {
                    vw = vViewWidth;
                    if (typeof app.vminViewWidth != 'undefined') {
                        if (vw < app.vminViewWidth)
                            vw = app.vminViewWidth;
                    }
                    if (vw != vViewWidth)
                        Ext.getBody().setStyle('overflow-x', 'scroll');
                }
            }
            else {
                Ext.getBody().setStyle('overflow-y', 'hidden');
            }
            app.fireResize(vw, vh);
        };

        app.changeSize();
        var vsizeing = false;
        window.onresize = function () {
            if (vsizeing)
                return;
            vsizeing = true;
            app.changeSize();
            vsizeing = false;
        };
    });
    
</script>
<body class="x-unselectable">
</body>
</html>
