

//定义编辑对话框
Ext.define('App.grfz.xxlr.tsda.editDlg', {
    extend: 'App.Common.EditDlg',
    title: '投诉信息',
	width:650,
	height:280,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
    	 this.BH=  Ext.create('Ext.form.field.Text', {
      	      labelWidth: 100,   
                name: 'TSDABH',
                allowBlank: true,
                hidden: true,
                value:this.TSDABH,
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
        
        this.LX=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'LX',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '类型',
           width: 240,
          
      });
        
       this.NR=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'NR',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '内容',
            width: 240,
           
       });
       

      
      this.BTSSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '被投诉时间',
			width : 240,
			anchor: '100%',
		    name: 'BTSSJ',	       
		    format: 'Y-m-d', 		    
		    allowBlank: false,
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
      
      this.SFSS=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SFSS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '是否属实',
          width: 240,
         
     });
      this.CZQK=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'CZQK',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '查证情况',
          width: 240,
         
     });

      this.WJZL=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'WJZL',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '文件资料',
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
                                this.BTSSJ ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.LX,
                                
                                this.NR  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.SFSS ,
                                this.CZQK,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.WJZL,
                                this.JH           
                       ]
                   },
                   {
                	   x:20,
                       y:130,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
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
                url: '../TSGL/getTSXXdetail',
                method: 'post', //方法  
                params: { TSDABH: vme.TSDABH },
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

