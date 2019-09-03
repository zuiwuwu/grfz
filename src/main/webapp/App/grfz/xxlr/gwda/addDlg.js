

//定义编辑对话框
Ext.define('App.grfz.xxlr.gwda.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '岗位信息',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
        
        this.XM=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'XM',
              emptyText: '',
              allowBlank: true,
              fieldLabel: '姓名',
              width: 240,
             
        });
        
        this.GWLB=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'GWLB',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '岗位类别',
           width: 240,
          
      });
        
       this.ZRQ=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'ZRQ',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '责任区',
            width: 240,
           
       });
       

      
      this.QSSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '起始时间',
			width : 240,
			anchor: '100%',
		    name: 'QSSJ',	       
		    format: 'Y-m-d', 		    
           
       });
      
      this.JZSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '截止时间',
			width : 240,
			anchor: '100%',
		    name: 'JZSJ',	       
		    format: 'Y-m-d', 		    
           
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
      
      this.SJGWMC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SJGWMC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '实际岗位名称',
          width: 240,
         
     });
      this.XTNGWMC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'XTNGWMC',
          emptyText: '',
          allowBlank: true,
          fieldLabel: '系统内岗位名称',
          width: 240,
         
     });

      this.NDCJPMQK=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'NDCJPMQK',
          emptyText: '',
          allowBlank: true,
          fieldLabel: '年度成绩排名情况',
          width: 240,
         
     });

      this.JH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JH',
          emptyText: '',
          allowBlank: true,
          fieldLabel: '警号',
          width: 240,
         
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
                       items: [ this.XM,
                                this.GWLB ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.ZRQ,
                                
                                this.JH  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.QSSJ ,
                                this.JZSJ,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.SJGWMC,
                                this.XTNGWMC           
                       ]
                   },
                   {
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.NDCJPMQK,
//                                this.imagerul
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
   
});

