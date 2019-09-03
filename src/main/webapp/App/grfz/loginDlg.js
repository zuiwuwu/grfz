

//定义编辑对话框
Ext.define('App.grfz.loginDlg', {
    extend: 'Ext.window.Window',
	width:458,
	height:308,
    QUICKDETECT: false,
    border:false,
    closable:false,
    header:false,
    bodyBorder:false,
    initComponent: function () {
    	    
      this.username=Ext.create('Ext.form.field.Text', {
    	    x:97,
		    y:86,
            name: 'USERNAME',
            emptyText: '',
            allowBlank: false,
            width: 340,
           height:40
       });
      
      this.password=Ext.create('Ext.form.field.Text', {
    	  x:97,
		  y:138,
          name: 'PASSWORD',
          emptyText: '',
          allowBlank: false,
          inputType: 'password',
          width: 340,
          height:40
         
     });
       
 	 this.loginBtn = Ext.create('App.Common.ImageButtonEx',{
					    x:15,
					    y:194,
					    width:420,
					    height:45,
						scope : this,
						btnCls:'grfz-sy-denglu',
						handler :  function(btn){
							this.onSave();
						} 
						});
        this.panel = Ext.create('Ext.Panel',{
        	width:458,
        	height:308,
        	layout:'absolute',
        	bodyStyle:{background:'url(../images/grfz/denglu.png)',
     	       padding: '10px'
     		},
        	items:[this.username,this.password,this.loginBtn]
        });    
        this.items = [  
                this.panel
            ],           
      this.buttons=[];
        this.callParent(arguments);
    },
    
	onSave : function(button) {
		var vme = this;
		//var win = button.up('window');
		var ds = this.username.getValue();
		if (vme.url) {
			var myMask = new Ext.LoadMask(vme, {
						msg : "正在登陆，请稍候！"
					});
			myMask.show();
			Ext.Ajax.request({
						url : vme.url, //请求地址  
						params :{
							username:this.username.getValue(),
							password:this.password.getValue()
						},
						
						method : 'post', //方法  
						callback : function(options, success, response) {
							myMask.hide();
							if (success) {
								var result = Ext.JSON
										.decode(response.responseText);
								if (result.success||result.errcode == 0) {
								/*	var saveOkClose = vme.saveOkClose;
									vme
											.fireEvent('saveok', vme,
													values);*/
									window.open('../GRFZ/index',"_self")
									if (saveOkClose)
										vme.close();
									
								} else {
									alert(result.msg||result.errmsg);
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

