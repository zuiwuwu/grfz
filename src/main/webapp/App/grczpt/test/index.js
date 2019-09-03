Ext.define('App.grczpt.test.index', {
	extend : 'Ext.container.Container',
	border : false,
	layout : 'vbox',
	autoScroll:true,
	width : '100%',
	style:{
		 background:'#f6faff'
	 },

	initComponent : function() {
        var vme = this;
        var urls = '';

        
        
        //时间选择
        this.TIME1=Ext.create('Ext.form.field.Date', {
        	labelWidth : 10,
  	       margin : '0 0 0 10',   	        
     			width : 160,
     			height : 25,		
  			anchor: '100%',
  		  
  		  id:'TIME1',
  		  format: 'Y-m-d',  
  		                
         });
       
        //今日布控数量
        var num=798;
        
        //分割
		var baiwei=parseInt(num/100);  
		var shiwei=parseInt((num%100)/10);  
		var gewei=parseInt(num%10);        
        var bksl = [];
    	var tjsjlxitems = [baiwei, shiwei, gewei];
		this.tbtjlxitems = [];
		for (var i = 0; i < tjsjlxitems.length; i++) {
			var item = Ext.create('App.Common.ImageButtonEx', {
						text : tjsjlxitems[i],						
						width : 36,
						height : 62,
						margin : '50 0 0 20',
						btnCls : 'x-test-search',
						tbtjlx : i,
						
					});
			this.tbtjlxitems.push(item);
			bksl.push(item)
		}
        this.TIME2=Ext.create('Ext.form.field.Date', {
 	        labelWidth : 10,   	        
    			width : 160,
    			height : 25,
    			anchor: '100%',
    		 
    		    id:'TIME2',
    		    format: 'Y-m-d',    
    		    listeners: {
             	    select: function(){ 
             	    	var a = new Date(Ext.getCmp('TIME1').getValue());  
             	    	var d = new Date(Ext.getCmp('TIME2').getValue());
             	    	var mon = a.getMonth() + 1;
             	    	var mon1 = d.getMonth() + 1;
             	    	var day = a.getDate();
             	    	var day1 = d.getDate();
             	    	if(a!==''||d!==''){
             	    		starttime=a.getFullYear() + '-' + (mon<10?"0"+mon:mon) + '-' + (day<10?"0"+day:day);  
                 	    	endtime=d.getFullYear() + '-' + (mon1<10?"0"+mon1:mon1) + '-' + (day1<10?"0"+day1:day1);  
                 	    	
                 	    	console.log(starttime+endtime)
                 	    	if((new Date(starttime.replace(/-/g,"\/"))) > (new Date(endtime.replace(/-/g,"\/")))){
                 	    		console.log('开始时间不能大于结束时间')
                 	    		alert('开始时间不能大于结束时间')
                 	    		return;
                 	    	}
                 	    	

                 	    	Ext.create('App.grczpt.test.clcjxx', {
                 	    		endtime:endtime,	
                 	    		starttime : starttime
     								}).show();
             	    	}else{
             	    		alert('请选择完整时间段')
             	    	}
             	    	
             	    }}
           });
 
        
        
		vme.items = [ 
		    		        
		    {

				xtype : 'container',
				style: 'background-color:transparent',
				width : '100%',
				height : 360,
				layout:'hbox',
				margin : '30 0 0 0',
				items : [
				         
				         
				         {
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 40',
				 			style:{
				 				 background:'url(../images/1.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q1',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         }, {
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 20',
				 			style:{
				 				 background:'url(../images/2.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q2',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         },{
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 20',
				 			style:{
				 				 background:'url(../images/3.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q3',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         },{
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 20',
				 			style:{
				 				 background:'url(../images/4.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q4',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         },{
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 20',
				 			style:{
				 				 background:'url(../images/5.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q5',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         },{
				        	 xtype:'container',
				        	 cls:'',
				        	 width : 290,
				        	
				 			 height : 360,
				 			 layout:'vbox',
				 			 margin : '0 0 0 20',
				 			style:{
				 				 background:'url(../images/6.svg)',
				 			     
				 			 },
				 			 items:[
									{},Ext.create('App.grczpt.test.q6',{
										width : 290,
										margin : '0 0 0 0',
										height : 360,
//										height : '70%',
									
									})
				 			        ]
				         }
				         ]
			
			}, {

			xtype : 'container',
			style: 'background-color:transparent',
			width : '100%',
			height : 340,
			layout:'hbox',
			margin : '40 0 0 40',
			items : [
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 820,
			        
			 			 height : 340,
			 			 layout:'vbox',
			 			 
			 			style:{
			 				 background:'white',
			 			   
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 10',
									cls : 'wsw',
									html : '车辆采集信息'
								},{xtype:'container',
									  margin : '-28 0 0 390',
									 layout:'hbox',
									 items:[{ xtype:'container',html:'<span style="color:#707070">时间</span>'},this.TIME1,{ xtype:'container',html:'<span style="color:white">--</span>'},this.TIME2]
								},Ext.create('App.grczpt.test.clcjxx', {
									width : '100%',
									flex : 1,					
								})
			 			        ]
			         },
			         
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 520,
			        
			 			 height : 340,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			style:{
			 				 background:'white',
			 			     
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 10',
									cls : 'wsw',
									html : '车辆违法类型统计'
								},{},Ext.create('App.grczpt.test.clwflxtj', {
									width : '100%',
									flex : 1,	
//								
								})
			 			        ]
			         },{
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 460,
			        	 
			 			 height : 340,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			
			 			 items:[
								{
						        	 xtype:'container',
						        	 cls:'',
						        	 width : 460,
						        	 style:{
						 				 background:'white',
						 			  
						 			 },
						 			 height : 160,
						 			 layout:'hbox',
						 			 margin : '0 0 0 0',
						 			
						 			 items:[{xtype : 'container',
						 				 margin : '0 0 0 80',
							             width: 200,
							             layout:'hbox',
											items : bksl},
											{
												xtype : 'component',
												width : '100%',
												height : 30,
												margin : '70 0 0 10',
												
												html : '<span style="color:#0D263F;font-weight:100;font-family:MicrosoftYaHei;font-size:16px;">今日布控数量</span>'
											}
						 			 ]
						         },{
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 460,
			        	 style:{
			 				 background:'white',
			 			  
			 			 },
			 			 height : 160,
			 			 layout:'vbox',
			 			 margin : '20 0 0 0',
			 			
			 			 items:[
								{},Ext.create('App.grczpt.test.bjzs', {
									width : 460,
									
									flex : 1,	
								})
			 			        ]
			         }
			 			        ]
			         }
			         ]
		
		},{

			xtype : 'container',
			style: 'background-color:transparent',
			width : '100%',
			height : 396,
			layout:'hbox',
			margin : '30 0 0 0',
			items : [
			         
			         
			         {
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 910,
			        	
			 			 height : 396,
			 			 layout:'vbox',
			 			 margin : '0 0 0 40',
			 			style:{
			 				 background:'white',
			 			       
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 10',
									cls : 'wsw',
									html : '布控类型'
								},this.GRADE,
								{},Ext.create('App.grczpt.test.bklx', {
									width : '100%',
									flex : 1
								})
			 			        ]
			         },{
			        	 xtype:'container',
			        	 cls:'',
			        	 width : 910,
			        
			 			 height : 396,
			 			 layout:'vbox',
			 			 margin : '0 0 0 20',
			 			style:{
			 				 background:'white',
			 			      
			 			 },
			 			 items:[
								{
									xtype : 'component',
									width : '100%',
									height : 30,
									margin : '0 0 0 0',
									cls : 'wsw',
									margin:'0 0 0 10',
									html : '布控原因'
								},Ext.create('App.grczpt.test.bkyy', {
									width : '100%',
									flex : 1,							
								})
			 			        ]
			         }
			         ]
		
		}]
		             ;

		this.callParent(arguments);
	}
});