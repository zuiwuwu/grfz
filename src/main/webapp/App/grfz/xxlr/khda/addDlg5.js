

//定义编辑对话框
Ext.define('App.grfz.xxlr.khda.addDlg5', {
    extend: 'App.Common.EditDlg',
    title: '考核信息',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
        
        this.DWNAME=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'DWNAME',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '单位名称',
              width: 240,
             
        });
        
      
        
        this.SCORE=  Ext.create('Ext.form.field.Text', {
  	      labelWidth: 100,   
            name: 'SCORE',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '成绩',
            width: 240,
           
      });
        
        this.TIME=  Ext.create('Ext.form.field.Date', {
    	   labelWidth: 100,
           name: 'TIME',
           format: 'Y年', 
           fieldLabel: '时间',
           width: 240,
           anchor: '100%',
      });
        
        this.RANK=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'RANK',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '排名等级',
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
                       items: [ this.DWNAME,
                                this.TIME ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.SCORE,
                                this.RANK
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

