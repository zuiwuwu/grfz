

//定义编辑对话框
Ext.define('App.grfz.xxlr.jcda.detailDlg', {
    extend: 'App.Common.EditDlg',
    title: '奖惩详情',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	

        this.imagerul = Ext.create('Ext.form.field.Text', {
            name: 'FILEURL',
            allowBlank: true,
            hidden: true,
            readOnly: true
        });
        
        this.GRHDW=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'GRHDW',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '个人或单位',
              width: 240,
              readOnly:true
             
        });
        
        this.BH=  Ext.create('Ext.form.field.Text', {
   	      labelWidth: 100,   
             name: 'JCDABH',
             allowBlank: true,
             hidden: true,
             value:this.JCDABH,
             width: 240,
             readOnly:true
       });
        
        this.JLMC=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'JLMC',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '奖励名称',
           width: 240,
           readOnly:true
      });
        
       this.CFMC=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'CFMC',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '惩罚名称',
            width: 240,
            readOnly:true
       });
       

      
      this.JCSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '奖惩时间',
			width : 240,
			anchor: '100%',
		    name: 'JCSJ',	       
		    format: 'Y-m-d', 
		    readOnly:true
           
       });
      this.SSDW = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '所属单位',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getDBMList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'SSDW',
          value:'',
          noCache: false
      });
      
     /* this.CSRQ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
    	    fieldLabel: '出生日期',
			width : 240,
			name:'CSRQ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});*/
      
      this.SJCSZW=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SJCSZW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '受奖惩时职务',
          width: 240,
          readOnly:true
     });
      this.JCYY=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JCYY',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '奖惩原因',
          width: 240,
          readOnly:true
     });

      this.PZJGMC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PZJGMC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '批准机关名称',
          width: 240,
          readOnly:true
     });

      this.WJZM=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'WJZM',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '文件证明',
          width: 240,
          readOnly:true
     });

      this.JH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '警号',
          width: 240,
          readOnly:true
     });


        this.leftContain=Ext.create('Ext.container.Container',{
        	width:600,
        	height:190,
        	layout:'absolute',
        	items:[
        	       {
                       x:20,
                       y:20,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.GRHDW,
                                this.JLMC ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.CFMC,
                                
                                this.JCSJ  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.SJCSZW ,
                                this.WJZM,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JCYY,
                                this.PZJGMC           
                       ]
                   },
                   {
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JH,
                                this.SSDW,
                                this.imagerul
                       ]
                   },
                   {
                	   x:20,
                       y:170,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.BH,
{
    xtype: 'button',
    text: '附件下载',
    height: 20,
    width: 60,
    scope: this,
    handler: function(){
    	
    	var vme = this;
    	var form = vme.down('form');
    	var values =  form.getValues();
    	console.log(values.FILEURL)
    	 Ext.Ajax.request({
                url: '../JCGL/ShowFilePreview',
                method: 'POST', //方法  
                params: { ID: values.FILEURL},
                scope: this,
                callback: function (options, success, response) {
//                    myMask.hide();
                    if (success) {
                        var v = response.responseText;                      
                       var url = v;
                       var s= url.split("\\");
                       console.log(s[2])
                      
                   		window.open('/file/'+s[2])
                    }
                    else {
                        alert('操作失败！');
                        vme.close();
                    }
                }
            });
    }
},
/*{
    xtype: 'button',
    text: '下载附件',
    height: 20,
    width: 60,
    scope: this,
    handler: this.onUploadBckImage
}*/
                       ]
                   }
        	       
        	       ]
        })
        
  
        this.items = [  
               {
                xtype: 'container',
                layout: 'hbox',
                items: [ this.leftContain,
                         
                ]
            }
            ],           
      
        this.callParent(arguments);
    },
    
    afterRender: function () {
        var vme = this;
        vme.callParent(arguments);
        if (vme.modifyMod) {
            var myMask = new Ext.LoadMask(vme, { msg: "正在获取信息，请稍候！" });
            myMask.show();
            var form = vme.down('form');
            Ext.Ajax.request({
                url: '../JCGL/getJCXXdetail',
                method: 'post', //方法  
                params: { JCDABH: vme.JCDABH },
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);                      
                        this.setValues(v[0]);                
//                        vme.image.setSrc('../JBXXGL/ShowFilePreview?ID=' + v[0].ZPURL);
                        console.log(v[0])
                    }
                    else {
                        alert('操作失败！');
                        vme.close();
                    }
                }
            });
        }

    },
   
});

