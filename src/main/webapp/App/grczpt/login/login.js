Ext.define('App.grczpt.login.login', {
    extend: 'Ext.panel.Panel',
    layout:'absolute',

    autoScroll:true,
    bodyStyle:{
		 background:'url(../images/grczpt/login/denglu_bg.png)',
	       padding: '10px'
    },
    border: 0,
    header:false,
    initComponent: function () {
    	
    	var me = this;
    	
    	this.username=Ext.create('Ext.form.field.Text', {
    		   margin:'0 0 0 103',
	    	   width:304,
	    	   height:56,
	    	   name: 'USERNAME',
	           emptyText: '用户名',
	           allowBlank: false
           
        });
    	this.password=Ext.create('Ext.form.field.Text', {
    		  margin:'0 0 0 103',
	    	   width:304,
	    	   height:56,
	    	   name: 'PASSWORD',
	           emptyText: '密码',
	           inputType : 'password',
	           allowBlank: false
        
       });
        /* this.title = Ext.create('Ext.Component',
                 {
		 	         x:178,
		 	         y:90,
		             width: 320,
		             height: 40,
		             html: '<div style="with:320px;height:40px;color:#00A6FF;font-size:28px; font-family: FZPSZHUNHJW--GB1-0;text-align:center;line-height:40px;letter-spacing: 0.78px;text-shadow: 0 2px 4px #55B1F2;">高新区个人成长大数据库</div>'
		         });*/
    	this.loginContainer = Ext.create('Ext.Container',{
						    		x:1040,
						    		y:389,
						    		width:516,
						    		height:434,
						    		cls:'',
						    		layout:'vbox',
						    		style:{
						    			 background:'url(../images/grczpt/login/login_bg.png)',
						    		       padding: '10px'
						    	    },
						    		items:[/*{
								    			xtype:'container',
								    			width:'100%',
								    			height:35,
								    			margin:'58 0 0 0',
								    			items:[ {
								    		    	   xtype:'component',
								    		    	   margin:'0 0 0 229',
								    		    	   width:70,
								    		    	   height:35,
								    		    	   html:'<div style="width:70px;height:35px;color:#00A6FF;font-size:28px; font-family: FZPSZHUNHJW--GB1-0;text-align:center;line-height:40px;letter-spacing: 0.78px;">登录</div>'
								    		       }]
								    		},*/
						    		       {
								    			xtype:'container',
								    			width:'100%',
								    			height:56,
								    			margin:'135 0 0 0',
								    			items:[this.username]
								    		},
						    		       {
								    			xtype:'container',
								    			width:'100%',
								    			height:56,
								    			margin:'10 0 0 0',
								    			items:[this.password]
								    		},
						    		       {
						    		    	   xtype:'container',
						    		    	   margin:'107 0 0 0',
						    		    	   width:'100%',
						    		    	   height:35,
						    		    	   layout:'hbox',
						    		    	   items:[
														Ext.create('App.Common.ImageButtonEx',{
														    width:100,
														    height:35,
															scope : this,
															margin:'0 0 0 106',
															btnCls:'grfz-main-denglu',
															handler :  function(btn){
																this.onSave();
															} 
															}),
															Ext.create('App.Common.ImageButtonEx',{
															    width:100,
															    height:35,
																scope : this,
																margin:'0 0 0 95',
																btnCls:'grfz-main-zhengshu',
																handler :  function(btn){
																	this.onSave();
																} 
																})		
						    		    	          ]
						    		       }
						    		       ]
						    	});
    	
    	me.items=[this.title,this.loginContainer];
    	
    	me.callParent(arguments);
    },
	onSave : function(button) {
		var vme = this;
		//var win = button.up('window');
		debugger;
		var username = this.username.getValue();
		var password = this.password.getValue();
		if (username != '') {
			var myMask = new Ext.LoadMask(vme, {
						msg : "正在登陆，请稍候！"
					});
			myMask.show();
			Ext.Ajax.request({
			    	url:'../grfz/login', //请求地址  
						params :{
							username:username,
							password:password
						},
						async: false,
						method : 'post', //方法  
						callback : function(options, success, response) {
							myMask.hide();
							console.log(success)
							if (success) {
								var result = response.responseText;
								console.log(result)
								if (result == '登陆成功') {
								/*	var saveOkClose = vme.saveOkClose;
									vme
											.fireEvent('saveok', vme,
													values);*/
									window.open('../grfz/main',"_self")
									if (saveOkClose)
										vme.close();
									
								} else {
									alert('登录失败');
								}
							} else {
								alert("网络错误！");
							}
						}
					});
		} else {
			vme.fireEvent('saveok', vme, values);
			vme.close();
		}

	}
    
    
});