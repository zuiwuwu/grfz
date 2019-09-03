Ext.define('App.grczpt.Home.jbxx', {
	extend : 'Ext.Container',
	
	width:'100%',
	height:500,
	autoScroll:true,
	initComponent : function() {
    	
    	var nowTime = new Date();
    	this.imagerul = Ext.create('Ext.form.field.Text', {
               name: 'CLZPURL',
               allowBlank: true,
               hidden: true,
               readOnly: true
           });
    	
        this.image = Ext.create('Ext.Img', {
            src: '',
            
            height: 140
        });

        this.imagerul = Ext.create('Ext.form.field.Text', {
            name: 'ZPURL',
            allowBlank: true,
            hidden: true,
            readOnly: true
        });
       this.XM=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'XM',
              emptyText: '',
              //allowBlank: false,
              fieldLabel: '姓名',
              width: 240,
             
        });
       this.jbxx=  Ext.create('Ext.form.field.Text', {
 	      labelWidth: 100,   
           name: 'JBXXDABH',
           allowBlank: true,
           hidden: true,
           value:this.JBXXDABH,
           width: 240,
          
     });

       this.NL=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'NL',
            emptyText: '',
          //  allowBlank: false,
            fieldLabel: '年龄',
            width: 240,
           
       });
       
      this.SXE=Ext.create('Ext.form.RadioGroup',{
    	  fieldLabel: '性别',
          width: 240,
          name:'SEX',
          items: [
                  {
        	         name: 'SEX',
        	         inputValue: '男',
        	         boxLabel: '男',
        	         checked: true
        	        },{
        	         name: 'SEX',
        	         inputValue: '女',
        	         boxLabel: '女'
        	                  }]
      });
      this.GMSFZHM=Ext.create('Ext.form.field.Text', {
      	    labelWidth: 100,
            name: 'GMSFZHM',
            emptyText: '',
            //allowBlank: false,
            fieldLabel: '公民身份证号码',
            width: 480,
           
       });
      
      this.CSRQ = Ext.create('Ext.form.field.Date', {
    	    labelWidth: 100,
    	    fieldLabel: '出生日期',
			width : 240,
			name:'CSRQ',
			value : nowTime,
			format : 'Y-m-d',
			cls : 'x-sp-toolbar-left'
		});
      this.CSD=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'CSD',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '出生地',
          width: 240,
         
     });
      this.JG=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JG',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '籍贯',
          width: 240,
         
     });
      
      this.ZZSF = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '政治身份',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getZZSFList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'ZZSF',
          value:'',
          noCache: false
      });
      this.MZ = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '民族',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getMZList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'MZ',
          value:'NAME',
          noCache: false
      });
      this.XYXH = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '血型',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getXYXHList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'XX',
          value:'',
          noCache: false
      });
      this.EMAL=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'EMAL',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '电子邮箱',
          width: 240,
         
     });

      this.TZ=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'TZ',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '体重',
          width: 240,
         
     });

      this.SG=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SG',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '身高',
          width: 240,
         
     });
      this.WXH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'WXH',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '微信号',
          width: 240,
         
     });
      this.JKZK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '健康状况',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getJKZKList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'JKZK',
          value:'',
          noCache: false
      });
      this.PHONE=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PHONE',
          emptyText: '',
          //allowBlank: false,
          fieldLabel: '手机号',
          width: 240,
         
     });
      this.HYZK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '婚姻状况',
          width: 240,
          labelWidth: 100,
          //allowBlank: false,
          url: '../GRFZZD/getHYZKList',
          valueField: 'NAME',
          displayField:'NAME',
          name:'HYZK',
          value:'',
          noCache: false
      });


        this.leftContain=Ext.create('Ext.container.Container',{
        	width:600,
        	height:180,
        	layout:'absolute',
        	items:[
        	       {
                       x:40,
                       y:40,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.XM,
                                this.PHONE  
                       ]
                   },
                   {
                	   x:40,
                       y:70,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.NL,
                                this.SXE  
                       ]
                   },
                   {
                	   x:40,
                       y:100,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.HYZK,
                                this.JKZK
                       ]
                   },
                   {
                	   x:40,
                       y:130,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.SG,
                                this.TZ           
                       ]
                   },{}
        	       
        	       ]
        })
        
        this.rightContain=Ext.create('Ext.container.Container',{
        	width:150,
        	height:180,
        	items:[
        	       this.imagerul,
        	       this.image,
        	       {
                       xtype: 'container',
                       layout: 'hbox',
                       width: '100%',
                       height:180,
                       items: [
                     
                       {
                           xtype: 'button',
                           text: '上传图片',
                           height: 20,
                           width: 60,
                          
                           scope: this,
                           handler: this.onUploadBckImage
                       }
                       ]
                   }
        	       ]
        })
        this.items = [  
                      newForm = Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   
		            	   buttonAlign: 'center',
		            	   items: [ {xtype:'container',
		            	            layout:'hbox',
		            	            items:[this.leftContain,this.rightContain]
		            	   } 
		                            
		                   ],
			               
			            
                      }),{xtype:'button',
                      	text: "确认",
                        scope : this,
                        margin:'70 0 0 290',
                        handler: this.getValues
                    },{xtype:'button',
                      	text: "取消",
                        scope : this,
                        margin:'70 0 0 60',
                        
                    }
               /*{
                xtype: 'container',
                layout: 'hbox',
                items: [ this.leftContain,
                         this.rightContain 
                ]
            },{xtype:'button',
            	text: "确认保存",
                scope : this,
                handler: this.getValues
            }*/
            
            ],           
      
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    },
    getValues:function()
	{
	var form = this.down('form');
	var vme = this;
	var values =  form.getValues();
	
	console.log(values);
	},
    onUploadBckImage: function () {
        var vme = this;
        console.log(vme.imagerul.getValue())
        Ext.create('App.Common.UploadFileDlg', {
            url: '../JBXXGL/UploadFile',
            ID: vme.imagerul.getValue(),
            listeners: {
                scope: this,
                saveok: function (result) {
                	
                	console.log(result);
                    vme.image.setSrc('../JBXXGL/ShowFilePreview?ID=' + result.fileid);
                    vme.imagerul.setValue(result.fileid);
                }
            }
        }).show();
    },
    
});
