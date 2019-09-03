

//定义编辑对话框
Ext.define('App.grfz.xxlr.mzpcda.editDlg', {
    extend: 'App.Common.EditDlg',
    title: '民主评测信息',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
    	this.BH=  Ext.create('Ext.form.field.Text', {
     	      labelWidth: 100,   
               name: 'MZPCDABH',
               allowBlank: true,
               hidden: true,
               value:this.MZPCDABH,
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
        
        this.ND=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'ND',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '年度',
           width: 240,
          
      });
        
       this.SZDW=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'SZDW',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '所在单位',
            width: 240,
           
       });
       

      
      this.CPQK=Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
	        fieldLabel: '评测情况',
			width : 240,
			 allowBlank: false,
		    name: 'CPQK',	       
		    emptyText: '',
		    
           
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
        	height:190,
        	layout:'absolute',
        	items:[
        	       {
                       x:20,
                       y:20,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.XM,
                                this.ND ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.SZDW,
                                
                                this.CPQK  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JH ,
                                this.BH
                       ]
                   },
        	       
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
                url: '../MZPCGL/getMZXXdetail',
                method: 'post', //方法  
                params: { MZPCDABH: vme.MZPCDABH },
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

