Ext.define('App.SSGCXX.WFXXGrid.List.Model', {
			extend : 'Ext.data.Model',
			fields : [{
				name : 'JGSJ',
				type : 'string'
			}, {
				name : 'TXDD',
				type : 'string'
			},{
				name : 'HPHM',
				type : 'string'
			},{
				name : 'XSFX',
				type : 'string'
			}, {
				name : 'XSSD',
				type : 'string'
			}, {
				name : 'CDBH',
				type : 'string'
			}, {
				name : 'CLHP',
				type : 'string'
			}, {
				name : 'CSYS',
				type : 'string'
			}, {
				name : 'CLLX',
				type : 'string'
			}, {
				name : 'CLPP',
				type : 'string'
			},{
				name : 'CLNK',
				type : 'string'
			},{
				name : 'TPLJ',
				type : 'string'
			},{
				name : 'CLXXBH',
				type : 'string'
			},{
				name : 'WFXW',
				type : 'string'
			},{
				name : 'HPTPLJ',
				type : 'string'
			}
			]
});

Ext.define('App.SSGCXX.WFXXGrid.List', {
	extend : 'App.SSGCXX.Grid',
	stripeRows : true,
	autoScroll : true,
	//selType : 'checkboxmodel',
	border : 0,
	columnLines : false, //显示网格竖线
	rowLines : true,
	initComponent : function() {
		var vme = this;
		this.addEvents('uploadkyk',
		'uploadgwk',
		'uploadajk');
		this.store = Ext.create('Ext.data.Store', {
					model : 'App.SSGCXX.WFXXGrid.List.Model',		
					autoLoad : false
				});

		this.columns = [
				{ 
					name : 'CLXXBH',
				    type : 'string'	,
				    hidden:true,
		         },{
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
					dataIndex : 'CLNK',
					sortable : false,
					header : '车辆年款',
					width : 80
				}, {
					dataIndex : 'CLPP',
					sortable : false,
					header : '车辆品牌',
					width : 80
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
					items : [{
								iconCls : 'icon-details',
								tooltip : '',
								text:'快速布控',
								scope: this,
								handler : function(grid, rowIndex, colIndex, item,e) {
									this.KSBK(grid, rowIndex, colIndex, item,e);
								}
							},
							/*{
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

Ext.define('App.SSGCXX.WFXXGrid', {
	extend : 'Ext.container.Container',
	border : 0,
	height : 200,
	layout : 'hbox',
	myfilter:'',
	flag:true,
	test:0,
	style : {
		background : 'url(../images/traffic/main_r9_c1.png) 0px 0px;'
	},
	padding : '0 0 0 0',
	maxRecCount : 100,
	initComponent : function() {
	    this.flag=true;
		this.newrecords = new Array();
		this.records = new Array();
		this.showstartindex = 0;
		var vme = this;
		this.addEvents('trfficinfoselchange');
		this.list = Ext.create('App.SSGCXX.WFXXGrid.List', {
					width : '100%',
					height : '100%',
					listeners : {
						scope : this,
						selectionchange : function(grid, selected,
								eOpts) {
							if (selected.length > 0)
								vme.fireEvent('trfficinfoselchange',selected);
						},
					}
				});
		this.text=Ext.create('Ext.form.field.Text',{
			value:'1',
		})
		this.items = [this.list];
		this.rabbitmq();
		this.callParent(arguments);
	},
	

	 rabbitmq:function(){
		 var vme=this;
		 var store=this.list.store;
		 var mqStompUrl="http://192.168.56.111:15674/stomp";  
		 var ws = new SockJS(mqStompUrl);//使用socket 
		 var client = Stomp.over(ws);  
		 client.heartbeat.incoming = 0;  
		 client.heartbeat.outgoing = 0;  
		   
		 client.debug = function(e) {  
		    //console.log(e);  
		 };  
		   
		 client.onreceive = function(m) {  
			//console.log(m);  
		 }  ;
		   
		 var connectCallback = function(x) { 
			 
			 var  id = client.subscribe("/exchange/CLXXexchange/routingKey",function(m) { 	
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
		this.test=this.test+1;
		var vme = this;
		if(this.flag){
		if(this.filterStore(msg[0])){
		if(this.test%2==0){
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
								'App.SSGCXX.WFXXGrid.List.Model', {
									JGSJ : vrec.jGSJ,
				 					HPHM : vrec.hPHM,
				 					XSFX : vrec.xSFX,
				 					HPYS : vrec.hPYS,
				 					CLSD : vrec.cLSD,
				 					CDBH : vrec.cDBH,
				 					XSZT : vrec.xSZT,
				 					CSYS:vrec.cSYS,
				 					CLLX:vrec.cLLX,
				 					CLPP:vrec.cSYS,
				 					CLNK:vrec.cSYS,
				 					CLXXBH : vrec.cLXXBH,
				 					TXDD:'2',
				 					XSSD:vrec.cLSD,
				 					TPLJ:vrec.tPLJ,
				 					WFXW:vrec.xSZT,
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
		}
	},
	
	 filterStore:function(msg){
		 var flag=false;
		 if(this.myfilter!=''){
			 filter=this.myfilter.split(",");
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
	
	 afterRender: function () {
	      var vme = this;
	      vme.callParent(arguments);
		  //vme.rabbitmq();
	 },
	 
	 
	addTrafficInfo : function(msg) {
	
	},
	
	stop:function(){
		var vme = this;
		if(this.flag==true){
		this.flag=false;
		}else{
	    this.flag=true;
		}
	},
	
	prevPage : function(){
		
		var vme = this;
		
		var vselected = vme.list.getSelectionModel().getSelection();
        console.log(vselected);
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
	
	nextPage : function(){
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
	uploadKYK : function(ajbh) {
		var vme = this;
		var vselected = vme.list.getSelectionModel().getSelection();
		if (vselected.length != 1)
			return;
		this.onuploadKYK(null,vselected[0]);
	},
	uploadgwk : function() {
		var vme = this;
		var vselected = vme.list.getSelectionModel().getSelection();
		if (vselected.length != 1)
			return;
		this.onuploadgwk(vselected[0]);
	},
	uploadajk : function() {
		var vme = this;
		var vselected = vme.list.getSelectionModel().getSelection();
		if (vselected.length != 1)
			return;
		this.onuploadajk(vselected[0]);
	},
	onuploadajk:function(rec)
	{
		Ext.create('App.TXZC.TZJZK.selAJDlg', {
			isIFrameDlg : true,
			width: 400,
			height: 400,
            listeners:
            {
                scope: this,
                saveok: function (dlg, values) {
                    this.onuploadKYK(values.AJBH,rec);
                }
            }
        }).show();
	},
	onuploadgwk : function(rec) {
		Ext.create('App.CLGK.GWDQCLK.addDlg', {
					isIFrameDlg : true,
					HPHM : rec.get('HPHM')
				}).show();
	},
	onuploadKYK : function(ajbh,rec) {
		Ext.create('App.AJZC.AJGL.UploadFileDlg', {
					AJBH : ajbh,
					FILETYPE : 1,
					clxx : rec.raw,
					isIFrameDlg : true,
					listeners : {
						scope : this,
						saveok : function() {

						}
					}
				}).show();
	}
});