Ext.define('App.grczpt.zhpg.index', {
	extend : 'Ext.container.Container',
	border : false,
	layout : 'vbox',
	
	width : '100%',
	

	initComponent : function() {
        var vme = this;
        var urls = '';
        var urlss = '';
//        console.log(Ext.getCmp('home').fieldClass('x-form-text'))
        this.GRADE=  Ext.create('App.Common.ComboBoxDropList', {
     	   labelWidth: 100,
             name: 'GRADE',
             margin : '-28 0 0 850',
             width: 100,
             id : 'home',
             
            cls:Ext.baseCSSPrefix + 'form-text-d',
             url: '../GRFZZD/getDBMList',
             valueField: 'NAME',
             displayField:'NAME',
             value:'',
             noCache: false,
             listeners: {
            	    select: function(){ 
            	    	urls = Ext.getCmp('home').getValue();
            	    
            	 
            	    	Ext.create('App.grczpt.zhpg.jlzypb', {
									
									ss : urls
								}).show();
            	    }
            	}
        });
        
        
        this.GRADE1=  Ext.create('App.Common.ComboBoxDropList', {
      	   labelWidth: 100,
              name: 'GRADE1',
              margin : '-28 0 0 670',
              width: 100,
              id : 'home1',
              
             cls:Ext.baseCSSPrefix + 'form-text-d',
              url: '../GRFZZD/getDBMList',
              valueField: 'NAME',
              displayField:'NAME',
              value:'',
              noCache: false,
              listeners: {
             	    select: function(){ 
             	    	urlss = Ext.getCmp('home1').getValue();
             	 console.log(urlss)
             	    	Ext.create('App.grczpt.zhpg.qjxjqk', { 									
 							ss : urlss
 						}).show();             	    	
             	    	Ext.create('App.grczpt.zhpg.gbmxjxq',{
             	    		url :'../zhpg/getbjqk?bm='+urlss,
             	    		ssd : urlss
						}).show();
             	    	Ext.create('App.grczpt.zhpg.gbmxjxq1',{
             	    		url :'../zhpg/getsjqk?bm='+urlss,
             	    		ssd : urlss
						}).show();
             	    	Ext.create('App.grczpt.zhpg.gbmxjxq3',{
             	    		url :'../zhpg/getnjqk?bm='+urlss,
             	    		ssd : urlss
						}).show();
             	    }
             	}
         });
        
		vme.items = [ 
		             /*{xtype : 'container',
		             width:'100%',
		    		 layout:'vbox', 
//		    		 autoScroll:true,
		    		 items:[*/
		    		        
		    {
			xtype : 'container',
			style: 'background-color:transparent',
			width : '100%',
			height : 400,
			layout:'hbox',
			margin : '25 0 0 0',
			items : [
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 500,
			 			 height : 380,
			 			 layout:'vbox',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/11.png)',
			 			       padding: '10px'
			 			 },
			 			 margin : '0 0 0 40',
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '月度先进个人'
								},
								{
									xtype : 'component',
									width : '100%',
									margin : '0 0 0 0',
									cls : '',
									html : '<div style="width:450px;height:40px;" >'+ 
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:30px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">姓名</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:95px;height:40px;">部门</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:105px;height:40px;">警种</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:75px;height:40px;">成绩</span>'+
									' </div>'
								},
								Ext.create('App.grczpt.zhpg.ydzx1', {
									width : '100%',
									
									cls : 'scroll-1',
									url:'../zhpg/getydzx',
									flex : 1
								})
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 420,
			 			 height : 380,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/22.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '月度后进个人'
								},{
									xtype : 'component',
									width : '100%',
									margin : '0 0 0 0',
									cls : '',
									html : '<div style="width:450px;height:40px;" >'+ 
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:30px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">姓名</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:75px;height:40px;">部门</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:90px;height:40px;">警种</span>'+
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:65px;height:40px;">成绩</span>'+
									' </div>'
								},Ext.create('App.grczpt.zhpg.ydzx2', {
									width : '100%',
									
									cls : 'scroll-1',
									url:'../zhpg/getydhj',
									flex : 1
								})
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 410,
			 			 height : 380,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/33.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '月度先进单位'
								},{
									xtype : 'component',
									width : '100%',
									margin : '0 0 0 0',
									cls : '',
									html : '<div style="width:450px;height:40px;" >'+ 
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:80px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">单位</span>'+

									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:140px;height:40px;">成绩</span>'+
									' </div>'
								}
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 410,
			 			 height : 380,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/44.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '月度后进单位'
								},{
									xtype : 'component',
									width : '100%',
									margin : '0 0 0 0',
									cls : '',
									html : '<div style="width:450px;height:40px;" >'+ 
									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:80px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">单位</span>'+

									'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:140px;height:40px;">成绩</span>'+
									' </div>'
								}
			 			        ]
			         }
			         ]
		}, {

			xtype : 'container',
			style: 'background-color:transparent',
			width : '100%',
			height : 400,
			layout:'hbox',
			margin : '25 0 0 0',
			items : [
			         
			         
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 980,
			        	 id : 'homes',
			 			 height : 400,
			 			 layout:'vbox',
			 			 margin : '0 0 0 30',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/55.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '警力资源配比'
								},this.GRADE,
								{/*  xtype:"combo",
						            blankText:'请选择模块',
						              emptyText:'选择模块',   
						             valueField: 'NAME',
						                  displayField:'NAME',
						            lazyRender:true,
						            triggerAction:"all",
						            typeAhead: true,
						            store:new Ext.data.JsonStore({  						          						               
						               proxy: 
						                       {
						                    	   type: 'ajax',
						                    	   url: '../GRFZZD/getDBMList',  
						                    	   reader: {
						                               type: 'json',
						                               root: 'rows',
						                               successProperty: 'success',
						                               totalProperty: 'total'
						                           }
						                       }
						                   ,
						                   fields: [{
						                       name: 'NAME',
						                       type: 'string'
						                   }, {
						                       name: 'ID',
						                       type: 'string'
						                   }],
						                   
						               })
						        */},Ext.create('App.grczpt.zhpg.jlzypb', {
									width : '100%',
									flex : 1,
//									url : '../zhpg/getjlzydb?ss='+urls
								})
			 			        ]
			         }, {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 800,
			        
			 			 height : 400,
			 			 layout:'vbox',
			 			 margin : '0 0 0 30',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/66.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '全局警员休假完成情况'
								}/*,this.GRADE1,Ext.create('App.grczpt.zhpg.qjxjqk',{
									width : '100%',
									margin : '0 0 0 0',
									height : 150,
//									height : '70%',
									flex : 1,
								})*//*,{
									xtype : 'container',
									width : '100%',
									margin : '-20 0 0 0',
									 layout:'hbox',
									cls : '',
									items : [{
										xtype : 'component',
										
										cls : 'grczpt-zhpg-title',
										
									},Ext.create('App.grczpt.zhpg.gbmxjxq',{
										width : 200,
										height : 125,
										cls : 'scroll-1',
										
										margin : '0 0 0 35',
										flex : 1,
									}),Ext.create('App.grczpt.zhpg.gbmxjxq1',{
										width : 200,
										height : 125,
										cls : 'scroll-1',
										
										margin : '0 0 0 10',
										flex : 1,
									}),Ext.create('App.grczpt.zhpg.gbmxjxq3',{
										width : 200,
										height : 125,
										cls : 'scroll-1',
										
										margin : '0 0 0 5',
										flex : 1,
									})]
								}*/,Ext.create('App.grczpt.zhpg.callpolicecount', {
									width : '100%',
									flex : 1,
//									url : '../zhpg/getjlzydb?ss='+urls
								})
			 			        ]
			         }
			         ]
		
		},{
			xtype : 'container',
			style: 'background-color:transparent',
			width : '100%',
			height : 360,
			layout:'hbox',
			margin : '25 0 0 0',
			items : [
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 500,
			 			 height : 360,
			 			 layout:'vbox',
			 			 margin : '0 0 0 40',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/4.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
			 			       {
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '荣誉榜'
								},Ext.create('App.grczpt.zhpg.qjjyxjwcqktj', {
									width : '100%',
									flex : 1
								})
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 420,
			 			 height : 360,
			 			 layout:'vbox',
			 			 margin : '0 0 0 30',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/5.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
			 			       {
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '全局警员工龄统计'
								},Ext.create('App.grczpt.zhpg.qjjygntj', {
									width : '100%',
									flex : 1
								})
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 420,
			 			 height : 360,
			 			 layout:'vbox',
			 			 margin : '0 0 0 30',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/5.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
			 			       {
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '公务员年度考核等次情况'
								},Ext.create('App.grczpt.zhpg.gwyndkhdcqk', {
									width : '100%',
									flex : 1
								})
			 			        ]
			         },
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 370,
			 			 height : 360,
			 			 layout:'vbox',
			 			 margin : '0 0 0 30',
			 			style:{
			 				 background:'url(../images/grczpt/zhpg/6.png)',
			 			       padding: '10px'
			 			 },
			 			 items:[
			 			       {
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'grczpt-zhpg-title',
									html : '全局警员进入方式统计'
								},Ext.create('App.grczpt.zhpg.qjjyjrfstj', {
									width : '100%',
									flex : 1
								})
			 			        ]
			         }
			         ]
		} ]
		             ;

		this.callParent(arguments);
	}
});