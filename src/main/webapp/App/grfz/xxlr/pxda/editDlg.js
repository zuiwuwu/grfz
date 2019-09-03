

//定义编辑对话框
Ext.define('App.grfz.xxlr.pxda.editDlg', {
    extend: 'App.Common.EditDlg',
    title: '培训信息',
	width:650,
	height:350,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
    	 this.BH=  Ext.create('Ext.form.field.Text', {
      	      labelWidth: 100,   
                name: 'PXDABH',
                allowBlank: true,
                hidden: true,
                value:this.PXDABH,
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
        
        this.DD=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'DD',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '地点',
           width: 240,
          
      });
        
       this.PXMC=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'PXMC',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '培训名称',
            width: 240,
           
       });
       

      
      this.SJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '时间',
			width : 240,
			anchor: '100%',
		    name: 'SJ',	       
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
      
      this.PXNR=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PXNR',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '培训内容',
          width: 240,
         
     });
      this.PXDW=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PXDW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '培训单位',
          width: 240,
         
     });

      this.PXTS=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PXTS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '培训天数',
          width: 240,
         
     });
      
      this.PXWCQK=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PXWCQK',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '培训完成情况',
          width: 240,
         
     });
      
      this.PXCJ=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PXCJ',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '培训成绩',
          width: 240,
         
     });
      
      this.SFYZS=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SFYZS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '是否有证书',
          width: 240,
         
     });
      
      this.ZSMC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZSMC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '证书名称',
          width: 240,
         
     });
      
      this.BFJG=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'BFJG',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '颁发机构',
          width: 240,
         
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
                                this.SJ ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.DD,
                                
                                this.PXMC  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.PXNR ,
                                this.PXTS,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.PXDW,
                                this.PXWCQK           
                       ]
                   },
                   {
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.PXCJ,
                                this.SFYZS
                       ]
                   },
                   {
                	   x:20,
                       y:170,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.ZSMC,
                                this.BFJG
                       ]
                   },
                   {
                	   x:20,
                       y:200,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JH,
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
                url: '../PXGL/getPXXXdetail',
                method: 'post', //方法  
                params: { PXDABH: vme.PXDABH },
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

