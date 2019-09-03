Ext.define('App.grczpt.dbmjgt.testpicture', {
	extend : 'Ext.Container',
	oldStyle : true,
	showchntype : false,
	
	initComponent : function() {
		
		var JH= this.JH;
		console.log(JH)
		
		this.items = Ext.create('Ext.Container',{
			 width:'100%',
			 height:'100%',
			 layout : {
					type : 'hbox',
					align : 'middle ',
					pack : 'center'
				},
			 autoScroll:true,
			 style:{
				 background:'url(../images/grczpt/grczpt_bg.png)',
			       padding: '10px'
			 },
			 items:[
			         

			{

				xtype : 'form',
				hidden : true,

			}, {
				xtype : 'container',
				border : false,
				margin : '0 -30 0 0',
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [ 
				          {
					xtype : 'container',
					id:'ss',
					hidden:false,
					items : [ {
						
						margin : '160 0 0 -140',
						xtype : 'radiogroup',
						width : 120,
						height : 70,
						
						 
					}, ]
				},{
					xtype : 'container',
					id:'left',
					hidden:true,
					items : [ {
						
						margin : '160 0 0 -140',
						xtype : 'form',
						width : 120,
						height : 70,
						style : 'border:1px solid blue;',
						layout : {
							type : 'vbox',
							align : 'center',
							pack : 'center'
						},

						items : [ {
							xtype : 'label',
							text : this.AH,

						} ]
					}, ]
				}, {
					xtype : 'radiogroup',// 单选分组
					fieldLabel : '兴趣爱好及特长',

					margin : '-55 -220 0 0',
				}, {
					xtype : 'box',
					width : 550,
					listeners : {
						render : function(p) {
							// Append the Panel to the click handler's argument
							// list.
							p.getEl().on('click', function(p) {
								// 处理点击事件代码
								var flag = true;
								var sss = Ext.getCmp('ss');
								var win = Ext.getCmp('left');
								if(win.hidden){
									win.show();
									sss.hide();
								}else{
									win.hide();
									sss.show();
								}
								console.log(win.hidden)
							});
						}
					},
					margin : '0 -220 0 0',
					height : 30,

					autoEl : {
						tag : 'img', // 指定为img标签
						src : '../images/icon/line.svg', // 指定url路径

					}
				}, {
					xtype : 'radiogroup',// 单选分组
					fieldLabel : '个人档案',
					margin : '180 -220 0 0',
				}, {
					xtype : 'box',
					width : 550,
					margin : '0 -200 0 0',
					height : 30,
					autoEl : {
						tag : 'img', // 指定为img标签
						src : '../images/icon/line.svg',// 指定url路径

					},
					listeners : {
						render : function(p) {
							// Append the Panel to the click handler's argument
							// list.
							
							var url = 'http://192.168.1.200:8080/grfz/grfz/xinxi?JH='+JH;
							p.getEl().on('click', function(p) {
								// 处理点击事件代码
								window.open(url);
								
							});
						}
					},
				} ]

			},

			{
				xtype : 'box',
				width : 300,
				id : 'imagebox',
				name : 'imagebox',

				height : 730,
				autoEl : {
					tag : 'img',
					id : 'imagebox',
					src : '../images/icon/'+ this.XM + '.gif'
				},
			/*	listeners : {
					render : function(p) {
						// Append the Panel to the click handler's argument
						// list.
						var imgs =['案件侦办队缪庆海正面.jpg', '案件侦办队缪庆海右侧.jpg', '案件侦办队缪庆海左侧.jpg'];    //（设定想要显示的图片）
						var x = 0;   
						
						        function time1(){
						               x++;    
						                       //         超过2则取余数，保证循环在0、1、2之间
//						               document.getElementById("div_first").src ="./image/"+imgs[x];
						               p.getEl().dom.src = '../images/icon/'+imgs[x];
						        }setInterval("time1()",3000);
						        time1();
						        
						     
					}
				},*/
			},

			{
				xtype : 'container',
				border : false,

				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [ {
					xtype : 'container',
					items : [ {
						xtype : 'radiogroup',
						fieldLabel : '警衔',
						margin : '230 0 0 -90',
					} ]
				}, {
					xtype : 'box',
					width : 550,
					margin : '-18 0 0 -200',
					height : 30,
					autoEl : {
						tag : 'img',
						src : '../images/icon/line2.svg'
					},
					listeners : {
						render : function(p) {
							// Append the Panel to the click handler's argument
							// list.
							p.getEl().on('click', function(p) {
								// 处理点击事件代码
								var flag = true;
								var ss = Ext.getCmp('right11')
								var win = Ext.getCmp('right1');
								if(win.hidden){
									win.show();
									ss.hide();
								}else{
									win.hide();
									ss.show();
								}
								console.log(win.hidden)
							});
						}
					},
				}, {
					xtype : 'container',
					items : [ {
						xtype : 'radiogroup',
						fieldLabel : '警号',
						margin : '40 0 0 -90',
					} ]
				}, {
					xtype : 'box',
					width : 550,
					margin : '-20 0 0 -220',
					height : 30,
					autoEl : {
						tag : 'img',
						src : '../images/icon/line2.svg'
					},
					listeners : {
						render : function(p) {
							// Append the Panel to the click handler's argument
							// list.
							p.getEl().on('click', function(p) {
								// 处理点击事件代码
								var flag = true;
								var ss = Ext.getCmp('right22')
								var win = Ext.getCmp('right2');
								if(win.hidden){
									win.show();
									ss.hide();
								}else{
									win.hide();
									ss.show();
								}
								console.log(win.hidden)
							});
						}
					},
				}, {
					xtype : 'container',
					items : [ {
						xtype : 'radiogroup',
						fieldLabel : '心理健康档案',
						margin : '100 0 0 -120',
					} ]
				}, {
					xtype : 'box',
					width : 550,
					margin : '-20 0 0 -220',
					height : 30,
					autoEl : {
						tag : 'img',
						src : '../images/icon/line2.svg '
					},
					listeners : {
						render : function(p) {
							// Append the Panel to the click handler's argument
							// list.
							p.getEl().on('click', function(p) {
								// 处理点击事件代码
								var flag = true;
								var ss = Ext.getCmp('right33')
								var win = Ext.getCmp('right3');
								if(win.hidden){
									win.show();
									ss.hide();
								}else{
									win.hide();
									ss.show();
								}
								console.log(win.hidden)
							});
						}
					},
				} ]

			}, 
			{
				hidden:false,
				id: 'right11',					
				margin : '210 0 0 -150',
					xtype : 'radiogroup',
					width : 120,
					height : 70,
				
			},{
				hidden:true,
				id: 'right1',
				xtype : 'form',
				width : 120,
				height : 70,
				style : 'border:1px solid blue;',
				layout : {
					type : 'vbox',
					align : 'center',
					pack : 'center'
				},
				margin : '210 0 0 -150',
				items : [ {
					xtype : 'label',
					text : this.ZW,

				} ]
			},{
				hidden:false,
				id: 'right22',					
				margin : '290 0 0 -140',
					xtype : 'radiogroup',
					width : 120,
					height : 70,
				
			}, {
				hidden:true,
				id: 'right2',
				xtype : 'form',
				width : 120,
				height : 70,
				style : 'border:1px solid blue;',
				layout : {
					type : 'vbox',
					align : 'center',
					pack : 'center'
				},
				margin : '290 0 0 -140',
				items : [ {
					xtype : 'label',
					text : this.JH

				} ]
			}, {
				hidden:false,
				id: 'right33',					
				margin : '420 0 0 -110',
					xtype : 'radiogroup',
					width : 120,
					height : 70,
				
			},{
				hidden:true,
				id: 'right3',
				xtype : 'form',
				width : 120,
				height : 70,
				style : 'border:1px solid blue;',
				layout : {
					type : 'vbox',
					align : 'center',
					pack : 'center'
				},
				margin : '420 0 0 -110',
				items : [ {
					xtype : 'label',
					text : '健康',

				} ]
			} ],

		}) ;

/*//		Ext.getCmp("imagebox").getEl().dom.src = '../images/icon/line2.svg ';
		var imgs =['案件侦办队缪庆海正面.jpg', '案件侦办队缪庆海右侧.jpg', '案件侦办队缪庆海左侧.jpg'];    //（设定想要显示的图片）
		var x = 0;   
		
		        function time1(){
		               x++;    
		                       //         超过2则取余数，保证循环在0、1、2之间
//		               document.getElementById("div_first").src ="./image/"+imgs[x];
		               p.getEl().dom.src = '../images/icon/'+imgs[x];
		        }setInterval("time1()",3000);
		        time1();*/
		
		this.callParent(arguments);
	},

});