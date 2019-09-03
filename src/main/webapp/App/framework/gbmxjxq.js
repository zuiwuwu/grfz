Ext.define('App.framework.gbmxjxq', {
	extend : 'Ext.window.Window',
	layout : 'vbox',
title : '最近3条信息',
	autoHigh:true,
	width : 300,
	height : 800,
	modal : false,
	x: 1602,  
	y: 60, 
	 draggable : false,
	style : {
		border : 'none'
	},
	initComponent : function() {
		var vme = this;
		
		var formatDateTime = function (date) {  
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();  
            h=h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute;  
            var second=date.getSeconds();  
            second=second < 10 ? ('0' + second) : second;  
            return y + '-' + m + '-' + d+' '+h+':'+minute;  
        }; 
		
		var myDate = new Date();
		var sends = this.receiver;
		var recs = this.sendpp;
		console.log(formatDateTime(myDate)+this.receiver)
		this.items=[
		            
		            {/*
			xtype : 'container',
			height : '100%',
			cls : 'x-sp-zhdd-container',
			flex : 1,
			items : [{
				xtype : 'box',

				autoEl : {
					tag : 'div',
					
					html : Ext.String.format('<iframe id="sockets" src="../jsp/index/websockerts.jsp?param1='+this.ss+'"  width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="auto" ></iframe>'),	
//					html : Ext.String.format('<iframe id="sunPage" src="../jsp/index/websockerts.jsp"  width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="auto" ></iframe>'),
					style : 'width:100%;height:800px'
						
				}
			}]			
			
									
		
			
		*/
		            		xtype : 'container',
		            		width : 300,
		            		cls : 'scroll-1',
		            		height:700,
		            		layout : 'vbox',
		            		items:[{},Ext.create('App.framework.qqx', {
		            			width : 150,
		            			
									url : '../GRFZ/recMesXq?user='+this.receiver+'&rec='+this.sendpp,
									flex : 1
								}),{
		            			xtype : 'container',
		            			
		            			width : 150,
		            			height : 300,
		            			id : 'contextss',
		            			margin : '0 0 0 150',
		            		}]
		    			   },{
		    				   xtype : 'container',
		    				   layout : 'hbox',
			            		width : '100%',
			            		height:100,
			            		items: [{
				                       xtype: 'textfield',
				                       width : 250,
					            		
				                       id: 'context',		                       

				                   },{
				                	   xtype: 'button',
					                    text: '提交'  ,
					                    name: 'contextq',		
				                       handler: function(){
				                    	   var context = Ext.getCmp('context').getValue()
				                    	   
				                    	  document.getElementById('contextss').innerHTML = '<div style="width:150px;height:80px; display:block;" >'+ 
				          				'<div style="width:94px;height:1px;margin-top: 15px;margin-left: -149px;border-top:dashed  #979797 2px;"></div>'+
//				        				'<div style=" display:block; z-index:2; margin-left: 20px; width: 10px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{#}</div>'+
				        				'<div style=" display: block;z-index:2;margin-left: -70px;margin-top: -10px;text-align: center;width: 140px;color: #979797;font-size: 10px;font-family: MicrosoftYaHei;">'+formatDateTime(myDate)+'</div>'+
				        				'<div style="width:94px;height:1px;margin-top: -9px;margin-left: 53px;border-top:dashed  #979797 2px;"></div>'+
				        				'<br>'+
//				        				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				        				'<div style=" display:block; z-index:2; margin-left: 86px;margin-top: 1px;text-align: center; width: 56px;color:#979797;font-size:16px; font-family: MicrosoftYaHei;">:'+sends+'</div>'+
				        				
				        				'<div style=" display:block; z-index:2; margin-left: -140px;margin-top: -17px; width: 220px;height:65px;text-align: right;color:#979797;font-size:12px; font-family: MicrosoftYaHei;">'+context+'</div>'+
				        				'<br>'+
				        				
				        				' </div>';
				                    	   
				                    	   Ext.Ajax
				                   		.request({
				                   			params : {
				                   				CONTEXT:context,
				                   				RECEIVER:recs,
				                   				SENDPP:sends
				                   			}
				                   			,
				                   			url : '../GRFZ/sendMes',
				                   			method : 'POST',
				                   			failure : function() {
				                   				Ext.Msg.hide();			
				                   				Ext.Msg.alert("警告","出现异常，请联系管理员！");					
				                   			},
				                   			/*success : function(response) {
				                   				Ext.Msg.alert("成功","提交成功！");
				                   				var win = Ext.getCmp('id');
				                   				win.close();
				                   			}*/	
				                   		});
				                    	 
				                    	   Ext.getCmp('context').setValue('')
				                       }
				                   }]
		    			   },];
		
		
		
		this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    },
   /* add : function(){
    	var context = Ext.getCmp('context')
    	console.log(context)
    }
*/
    
});
