Ext.define('App.SSGCXX.BJXXGrid.List.Model', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'JGSJ',
						type : 'string'
					}, {
						name : 'TXDD',
						type : 'string'
					}, {
						name : 'TXDDNAME',
						type : 'string'
					},{
						name : 'XSFX',
						type : 'string'
					}, {
						name : 'XSFXNAME',
						type : 'string'
					}, {
						name : 'XSSD',
						type : 'string'
					}, {
						name : 'CDBH',
						type : 'string'
					}, {
						name : 'HPHM',
						type : 'string'
					}, {
						name : 'CSYS',
						type : 'string'
					}, {
						name : 'CSYSNAME',
						type : 'string'
					}, {
						name : 'CLLX',
						type : 'string'
					}, {
						name : 'BJLX',
						type : 'string'
					}, {
						name : 'WFXW',
						type : 'string'
					},{
						name : 'TPLJ',
						type : 'string'
					},{
						name : 'BKYY',
						type : 'string'
					},{
						name : 'CJCS',
						type : 'string'
					},{
						name : 'BKR',
						type : 'string'
					},{
						name : 'LXFS',
						type : 'string'
					},{
						name : 'CLNK',
						type : 'string'
					},{
						name : 'CLPP',
						type : 'string'
					},{
						name : 'HPYS',
						type : 'string'
					},{
						name : 'HPZL',
						type : 'string'
					},{
						name : 'HPTPLJ',
						type : 'string'
					}]
		});

Ext.define('App.SSGCXX.BJXXGrid.List', {
	extend : 'App.SSGCXX.Grid',
	stripeRows : true,
	autoScroll : false,
	//selType : 'checkboxmodel',
	border : 0,
	columnLines : false, //显示网格竖线
	rowLines : true,
	initComponent : function() {
		var vme = this;
		this.store = Ext.create('Ext.data.Store', {
					model : 'App.SSGCXX.BJXXGrid.List.Model',
					autoLoad : false
				});

		this.columns = [{
					dataIndex : 'JGSJ',
					sortable : false,
					header : '经过时间',
					width : 80,
					
				}, {
					dataIndex : 'TXDD',
					sortable : false,
					header : '通行地点',
					width : 80
				}, {
					dataIndex : 'XSFX',
					sortable : false,
					header : '行驶方向',
					width : 80
				}, {
					dataIndex : 'XSSD',
					sortable : false,
					header :'行驶速度',
					width : 80
				}, {
					dataIndex : 'CDBH',
					sortable : false,
					header : '车道',
					width : 80
				}, {
					dataIndex : 'HPHM',
					sortable : false,
					header : '车辆号牌',
					width : 80
				}, {
					dataIndex : 'CSYS',
					sortable : false,
					header : '车身颜色',
					width : 80
				}, {
					dataIndex : 'CLLX',
					sortable : false,
					header : '车辆类型',
					width : 80
				},{
					dataIndex : 'BJLX',
					sortable : false,
					header : '报警类型',
					width : 80,
					renderer:function(value){
						if(value==0){
							return '布控报警';
						}else if(value==1){
							return '黑名单报警';
						}
					}
				}, {
					dataIndex : 'WFXW',
					sortable : false,
					header : '违法行为',
					width : 80
				}, {
					header : '操作',
					sortable : false,
					xtype : 'actioncolumn',
					flex : 1,
					items : [/*{
								iconCls : 'icon-details',
								tooltip : '',
								text:'快速布控',
								scope: this,
								handler : function(grid, rowIndex, colIndex, item,e) {
									this.KSBK(grid, rowIndex, colIndex, item,e);
								}
							},
							{
								iconCls : 'icon-details',
								tooltip : '下载图片',
								text:'下载图片',	
								scope: this,
								handler : function(grid, rowIndex, colIndex, item,e) {
									this.DownLoadPic(grid, rowIndex, colIndex, item,e);
								}
							}*/
							]
				}];

		this.callParent(arguments);
	},
	
	 KSBK:function(grid, rowIndex, colIndex, item,e){
		 var rec = grid.getStore().getAt(rowIndex);
		 var rec = grid.getStore().getAt(rowIndex);
			Ext.create('App.BKGL.addDlg', {
				        url: '../BKGL/addBKXX',
						modifyMod : false,
						HPHM : rec.get('HPHM'),
						HPYS:rec.get('HPYS'),
						CSYS:rec.get('CSYS'),
						QUICKDETECT : true,
						LX: 0
					}).show();
     },
     
     
	 DownLoadPic:function(grid, rowIndex, colIndex, item,e){
		 var rec = grid.getStore().getAt(rowIndex);
		 Ext.saveframe.src= '../SSGC/downPic?picPath='+rec.get('TPLJ');
     },
	afterRender : function() {
		this.callParent(arguments);
		this.el.setStyle('border-radius', '5px 5px 0px 0px');
	},
    
});

Ext.define('App.SSGCXX.BJXXGrid', {
	extend : 'Ext.container.Container',
	border : 0,
	height : 200,
	layout : 'hbox',
	myfilter:'',
	flag:true,
	style : {
		background : 'url(../images/traffic/main_r9_c1.png) 0px 0px;'
	},
	padding : '0 0 0 0',
	maxRecCount : 100,
	initComponent : function() {
		this.newrecords = new Array();
		this.records = new Array();
		this.showstartindex = 0;
		this.flag=true;
		var vme = this;
		this.addEvents('trfficinfoselchange');
		this.list = Ext.create('App.SSGCXX.BJXXGrid.List', {
					width : '100%',
					height : '100%',
					listeners : {
						scope : this,
						selectionchange : function(grid, selected,
								eOpts) {
							if (selected.length > 0)
								vme.fireEvent('trfficinfoselchange',
										selected);
						},
					}
				});
		this.items = [this.list];
		this.rabbitmq();
		this.callParent(arguments);
	},
	
	rabbitmq:function(){
		 var vme=this;
		 var store=this.list.store;
		 var mqStompUrl="http://192.168.1.101:15674/stomp";  
		 var ws = new SockJS(mqStompUrl);//使用socket 
		 var client = Stomp.over(ws);  
		 client.heartbeat.incoming = 0;  
		 client.heartbeat.outgoing = 0;  
		   
		 client.debug = function(e) {  
		   // console.log(e);  
		 };  
		   
		 client.onreceive = function(m) {  
			//console.log(m);  
		 }  ;
		   
		 var connectCallback = function(x) { 
			 
			 var  id = client.subscribe("/exchange/BJXXexchange/routingKey",function(m) { 
				 
		    	 vme.insertStore([Ext.JSON.decode(m.body)]);
				 
		  }); 
		   
	     };
		 var errorCallback =  function() {  
		    console.log('error');  
		 };  
		 client.connect('linyuan', '123456', connectCallback, errorCallback, '/');
		 
		 
		 //disconnect()
		 //id.unsubscribe();
	 },
	  
	insertStore:function(msg){
		var vme = this;
		if(this.flag){
		if(this.filterStore(msg[0])){
		for (var i = 0; i < msg.length; i++) {
			vme.newrecords.push(msg[i]);
		}
		if (vme.inserttimerid) {
			return;
		}
		vme.inserttimerid = setTimeout(function() {
					vme.inserttimerid = null;
					var vnewrecords = vme.newrecords;
					vme.newrecords = new Array();
					var vrecords = new Array();
					for (var i = vnewrecords.length - 1; i >= 0; i--) {
						if (vrecords.length >= vme.maxRecCount)
							break;
						var vrec = vnewrecords[i];
						vrecords.push(Ext.create(
								'App.SSGCXX.BJXXGrid.List.Model', {
									JGSJ : vrec.jGSJ,
				 					HPHM : vrec.hPHM,
				 					XSFX : vrec.xSFX,
				 					HPYS : vrec.hPYS,
				 					CLSD : vrec.cLSD,
				 					CDBH : vrec.cDBH,
				 					XSZT : vrec.xSZT,
				 					CLXXBH : vrec.cLXXBH,
				 					TXDD:vrec.hPHM,
				 					XSSD:vrec.cLSD,
				 					BJLX:vrec.aLARMTYPE,
				 					WFXW:vrec.wFXW,
				 					CSYS:vrec.cSYS,
				 					CLLX:vrec.cLLX,
				 					TPLJ:vrec.cLTX,
				 					BKYY:vrec.hPHM,
				 					CJCS:vrec.hPHM,
				 					BKR:vrec.hPHM,
				 					LXFS:vrec.hPHM,
				 					CLNK:vrec.hPHM,
				 					CLPP:vrec.hPHM,
				 					HPZL:vrec.hPHM,
				 					HPTPLJ:vrec.tPLJ,
								}));
					}
					for (var i = 0; i < vme.records.length; i++) {
						if (vrecords.length >= vme.maxRecCount)
							break;
						vrecords.push(vme.records[i]);
					}			
					vme.records = vrecords;
					vme.showstartindex = 0;
					vme.list.store.removeAll();
					vme.list.store.insert(0, vrecords);		
					vme.fireEvent('trfficinfoselchange', [vrecords[0]]);			
				}, 1000);
		}
		}
	},
	
	 filterStore:function(msg){
		 var flag=false;
		 if(this.myfilter!=''){
			 var filter=this.myfilter;
			 for(var i=0;i<filter.length;i++){
				 if(msg.cLSD==filter[i]){
					flag=true;
				 }
			 }
		 }else{
			 flag=true;
		 }
		 return flag;
	 },
	stop:function(){
		var vme = this;
		if(this.flag==true){
		this.flag=false;
		}else{
	    this.flag=true;
		}
	},
	prevPage : function()//上一页
	{
		var vme = this;

		var vselected = vme.list.getSelectionModel().getSelection();

		var index = -1;
		if (vselected.length > 0) {
			index = vme.list.store.indexOf(vselected[0]);
			index--;
			if (index < 0)
				index = 0;
		}
		if (index >= 0)
			vme.list.getSelectionModel().select([vme.list.store
					.getAt(index)]);
	},
	
	nextPage : function()//下一页
	{
		var vme = this;

		var vselected = vme.list.getSelectionModel().getSelection();

		var index = -1;
		if (vselected.length > 0) {
			index = vme.list.store.indexOf(vselected[0]);
			index++;
			if (index >= vme.list.store.getCount())
				index = vme.list.store.getCount() - 1;
		} else if (vme.list.store.getCount() > 0) {
			index = 0;
		}
		if (index >= 0)
			vme.list.getSelectionModel().select([vme.list.store
					.getAt(index)]);
	},
	
});