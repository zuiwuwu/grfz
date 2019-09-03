Ext.define('App.SystemSetting.Dlg.showRealTrafficDlg', {
    extend: 'Ext.window.Window',
    layout: 'border',
    modal: false,
    title: '实时过车',
    maximizable: true,
    //minimizable: true,
    width: 800,
    height: 500,
    requires: ['App.Common.ImageButtonEx'],
    initComponent: function () {
        var vme = this;
        this.vocx = Ext.create('App.Common.OCX', {
            DownLoad: '0',
            WebType: 'TrafficRealEx',
            listeners:
            {
                scope: this,
                OCXMsg: this.OCXMsg
            }
        });


        this.newrec = [];

        this.chnlist = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            selType: 'rowmodel',
            border: 0,
            columns: [
            {
                name: 'XXBH',
                type: 'string'
            },
            {
                name: 'PlateNum',
                type: 'string',
                gridcol: {
                    sortable: false,
                    header: SPLanguage.getMessage("HPHM"),
                    width: 80,
                    align: 'center'
                }
            },
            {
                name: 'Time',
                type: 'string',
                gridcol: {
                    sortable: false,
                    header: SPLanguage.getMessage("JGSJ"),
                    flex: 1
                }
            }],
            listeners:
            {
                scope: this,
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    //this.vocx.CtrlCmd('cmd=ShowChn&index=-1&chnid=' + record.get('GLOBALID') + '&stream=1');
                }
            }
        });
        this.items = [{
            xtype: 'panel',
            layout: 'fit',
            region: 'center',
            border: 0,
            items: [this.vocx]
        },
        {
            xtype: 'panel',
            layout: 'fit',
            region: 'east',
            width: 228,
            maxWidth: 228,
            minWidth: 228,
            border: 0,
            split: true,
            collapsible: true,
            //header: false,
            //collapsed: true,
            collapseMode: 'mini',
            height: '100%',
            title: SPLanguage.getMessage("GCJV"),
            items: [this.chnlist]
        }];
        
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
       var task = {
            run: this.onShowTrafficInfo,
            interval: 1000,
            scope: this
        }
       this.runner = new Ext.util.TaskRunner();
        this.runner.start(task);
    },
    beforeDestroy: function(){
        var me = this;
        if(me.runner)
        	me.runner.stopAll();
       me.runner = null;
        me.callParent();
    },
    onShowTrafficInfo: function () {
        var me = this;
         var v = me.newrec;
         var store = this.chnlist.store;
         if(v.length == 0)
         	return ;
        me.newrec = [];
        var vdel = [];
        for(var i = 0;i < v.length + store.getCount() - 100;i ++)
        {
        	vdel.push(store.getAt(i));
        }
        store.remove(vdel,true,true);
       store.loadData(v,true);
    },
    OCXMsg: function (vcmd, values, ocx) {
        var vme = this;
        if (vcmd == 'realtraffic') {
            var vtrafficinfo = values["info"];
            //vtrafficinfo = decodeURIComponent(vtrafficinfo);
            vtrafficinfo = Ext.JSON.decode(vtrafficinfo);
            if(Ext.isArray(vtrafficinfo))
            {
            	for(var i = 0;i < vtrafficinfo.length;i ++)
            	{
            		this.newrec.push(vtrafficinfo[i]);
		            if (this.newrec.length > 100) {
		                this.newrec.splice(0, 1);
		            }
            	}
            }
            else
            {
            	this.newrec.push(vtrafficinfo);
	            if (this.newrec.length > 100) {
	                this.newrec.splice(0, 1);
	            }
            }
        }
        else if (vcmd == 'TrafficRealViewInitOK') {
            vme.vocx.CtrlCmd('cmd=setToken&token=' + Ext.commonparams.token);
            var path = window.location.pathname;
        	var n = path.lastIndexOf('/');
        	if(n != -1)
        		path = path.substring(0,n);
        		n = path.lastIndexOf('/');
        	if(n != -1)
        		path = path.substring(0,n);
        	path += '/';
         	vme.vocx.CtrlCmd('cmd=WebUrl&token=' + Ext.commonparams.token + '&url=' + encodeURIComponent('http://' + window.location.hostname + ':' + (window.location.port||'80') + path + 'CLCXPIC/ShowBigPic'));

            if (vme.svrinfo)
                 vme.centerocx.CtrlCmd('cmd=SetTrafficRcvSvr&SVR=' + vme.svrinfo);
            vme.getServer();
            vme.getDirects();
            vme.getPlateNumColor();
            vme.getXSZT();

            vme.getDWDev();
        }
    },
    getDWDev: function () {
    	if(this.JKSBBH)
    	{
    		 this.vocx.CtrlCmd('cmd=ChangeDevices&Devices=' + this.JKSBBH);
    	}
    	else
    	{
    		Ext.Ajax.request({
            url: '../GISDW/GetDWTrafficChn', //请求地址  
            method: 'post', //方法  
            scope: this,
            params: { dws: this.DWBH },
            callback: function (options, success, response) {
                var v = Ext.JSON.decode(response.responseText);
                var vchntext = '';
                for (var i = 0; i < v.rows.length; i++) {
                    if (vchntext != '')
                        vchntext += ',';
                    vchntext += v.rows[i].JKSBBH;
                }
                this.vocx.CtrlCmd('cmd=ChangeDevices&Devices=' + vchntext);
            }
        });
    	}
        
    },
    getServer: function () {
    	 Ext.Ajax.request({
            url: '../JKXTXX/GetTrafficRcvSvr',
            method: 'post', //方法  
            params: {},
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    this.svrinfo = response.responseText;
                    this.vocx.CtrlCmd('cmd=SetTrafficRcvSvr&SVR=' + this.svrinfo);
                    
                    this.getDWDev();
                }
            }
        });
        
    },
    getDirects: function () {
        var vme = this;
        Ext.Ajax.request({
            url: '../TrafficReal/GetDirects', //请求地址  
            method: 'post', //方法  
            callback: function (options, success, response) {
                var v = Ext.JSON.decode(response.responseText);
                var strfx = "";
                for (var i = 0; i < v.length; i++) {
                    strfx += v[i].JSFXID + ":" + v[i].JSFXNAME + ",";
                }

                vme.vocx.CtrlCmd('cmd=SetTrafficDirects&Directs=' + encodeURIComponent(strfx));
            }
        });
    },
    getPlateNumColor: function () {
        var vme = this;
        Ext.Ajax.request({
            url: '../TrafficReal/GetPlateNumColor', //请求地址  
            method: 'post', //方法  
            callback: function (options, success, response) {
                var v = Ext.JSON.decode(response.responseText);
                var strfx = "";
                for (var i = 0; i < v.length; i++) {
                    strfx += v[i].HPYSID + ":" + v[i].HPYSNAME + ",";
                }
                vme.vocx.CtrlCmd('cmd=SetTrafficPlateNumColor&Colors=' + encodeURIComponent(strfx));
            }
        });
    },
    getXSZT: function () {
        var vme = this;
        Ext.Ajax.request({
            url: '../TrafficReal/GetXSZT', //请求地址  
            method: 'post', //方法  
            callback: function (options, success, response) {
                var v = Ext.JSON.decode(response.responseText);
                var strfx = "";
                for (var i = 0; i < v.length; i++) {
                    strfx += v[i].XSZTID + ":" + v[i].XSZTNAME + ",";
                }
                vme.vocx.CtrlCmd('cmd=SetTrafficXSZT&XSZT=' + encodeURIComponent(strfx));
            }
        });
    }
});


