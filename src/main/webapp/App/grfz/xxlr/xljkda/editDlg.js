

//定义编辑对话框
Ext.define('App.grfz.xxlr.xljkda.editDlg', {
    extend: 'App.Common.EditDlg',
    title: '心理健康信息',
	width:650,
	height:280,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
    	 this.BH=  Ext.create('Ext.form.field.Text', {
     	      labelWidth: 100,   
               name: 'XLJKDABH',
               allowBlank: true,
               hidden: true,
               value:this.XLJKDABH,
               width: 240,
              
         });
        
        this.XM=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'XM',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '姓名',
              width: 240,
             
        });
        
        this.ZZDW=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'ZZDW',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '组织单位',
           width: 240,
          
      });
        
       this.CSXM=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'CSXM',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '测试项目',
            width: 240,
           
       });
       

      
      this.CSSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '测试时间',
			width : 240,
			anchor: '100%',
		    name: 'CSSJ',	       
		    format: 'Y-m-d', 		    
           
       });
      
/*      this.JZSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '截止时间',
			width : 240,
			anchor: '100%',
		    name: 'JZSJ',	       
		    format: 'Y-m-d', 		    
           
       });*/
      
     /* this.CSRQ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
    	    fieldLabel: '出生日期',
			width : 240,
			name:'CSRQ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});*/
      
      this.CJ=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'CJ',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '成绩',
          width: 240,
         
     });
      this.PJ=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PJ',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '评价',
          width: 240,
         
     });

      this.FDLS=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'FDLS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '辅导老师',
          width: 240,
         
     });
      
      this.FDSJ=  Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '辅导时间',
			width : 240,
			anchor: '100%',
		    name: 'FDSJ',	       
		    format: 'Y-m-d', 	
         
     });


      this.JH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '警号',
          width: 240,
         
     });


        this.leftContain=Ext.create('Ext.container.Container',{
        	width:600,
        	height:280,
        	layout:'absolute',
        	items:[
        	       {
                       x:20,
                       y:20,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.XM,
                                this.ZZDW ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.CSSJ,
                                
                                this.CSXM  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.CJ ,
                                this.PJ,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.FDLS,
                                this.FDSJ           
                       ]
                   },
                   {
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JH    ,
                                this.BH
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
                url: '../XLJKGL/getJKXXdetail',
                method: 'post', //方法  
                params: { XLJKDABH: vme.XLJKDABH },
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);                      
                        this.setValues(v[0]);                
//                        vme.image.setSrc('../JBXXGL/ShowFilePreview?ID=' + v[0].ZPURL);
//                        console.log(v[0])
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

