

//定义编辑对话框
Ext.define('App.grfz.xxlr.xqahda.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '兴趣爱好信息',
	width:650,
	height:320,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
        
        this.XM=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'XM',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '姓名',
              width: 240,
             
        });
        
        this.AH=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'AH',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '爱好',
           width: 240,
          
      });
        
       this.CJST=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'CJST',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '参加社团',
            width: 240,
           
       });
       

      
      this.BSHJSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '比赛获奖时间',
			width : 240,
			anchor: '100%',
		    name: 'BSHJSJ',	       
		    format: 'Y-m-d', 		    
           
       });
      
      this.HDZSSJ=Ext.create('Ext.form.field.Date', {
    	  labelWidth: 100,
	        fieldLabel: '获得证书时间',
			width : 240,
			anchor: '100%',
		    name: 'HDZSSJ',	       
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
      
      this.TC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'TC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '特长',
          width: 240,
         
     });
      this.HDZSLB=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'HDZSLB',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '获得证书类别',
          width: 240,
         
     });

      this.FZDW=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'FZDW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '发证单位',
          width: 240,
         
     });
      
      this.BSMC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'BSMC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '比赛名称',
          width: 240,
         
     });
      
      this.JBDW=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JBDW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '举办单位',
          width: 240,
         
     });
      
      this.HJQK=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'HJQK',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '获奖情况',
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
                                this.AH ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.CJST,
                                
                                this.TC  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.HDZSSJ ,
                                this.HDZSLB,
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.FZDW,
                                this.BSHJSJ           
                       ]
                   },
                   {
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.BSMC,   
                                this.JBDW, 
                       ]
                   },
                   {
                	   x:20,
                       y:170,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.HJQK,   
                                this.JH, 
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

