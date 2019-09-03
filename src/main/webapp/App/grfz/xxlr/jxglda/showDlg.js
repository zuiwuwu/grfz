

//定义编辑对话框
Ext.define('App.grfz.xxlr.jxglda.addDlg', {
    extend: 'App.Common.ExEditDlg',
    title: '基本信息',
	width:850,
	height:950,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	this.imagerul = Ext.create('Ext.form.field.Text', {
               name: 'CLZPURL',
               allowBlank: true,
               hidden: true,
               readOnly: true
           });
    	
        this.image = Ext.create('Ext.Img', {
            src: '',
            width: '100%',
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
              allowBlank: false,
              fieldLabel: '姓名',
              width: 240,
             
        });
       this.CXM=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'CXM',
           emptyText: '',
           allowBlank: false,
           fieldLabel: '曾姓名',
           width: 240,
          
      });
       this.NL=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'NL',
            emptyText: '',
            allowBlank: false,
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
        	         inputValue: '0',
        	         boxLabel: '男',
        	         checked: true
        	        },{
        	         name: 'SEX',
        	         inputValue: '1',
        	         boxLabel: '女'
        	                  }]
      });
      this.GMSFZHM=Ext.create('Ext.form.field.Text', {
      	    labelWidth: 100,
            name: 'GMSFZHM',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '公民身份证号码',
            width: 480,
           
       });
      
      this.CSRQ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
    	    fieldLabel: '出生日期',
			width : 240,
			name:'CSRQ',
			value : nowTime,
			format : 'yyyyMMddHHmmss',
			cls : 'x-sp-toolbar-left'
		});
      this.CSD=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'CSD',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '出生地',
          width: 240,
         
     });
      this.JG=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JG',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '籍贯',
          width: 240,
         
     });
      
      this.ZZSF = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '政治身份',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getZZSFList',
          valueField: 'ID',
          displayField:'NAME',
          name:'ZZSF',
          value:'',
          noCache: false
      });
      this.MZ = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '民族',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getMZList',
          valueField: 'ID',
          displayField:'NAME',
          name:'MZ',
          value:'',
          noCache: false
      });
      this.XYXH = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '血型',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getXYXHList',
          valueField: 'ID',
          displayField:'NAME',
          name:'XX',
          value:'',
          noCache: false
      });
      this.EMAL=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'EMAL',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '电子邮箱',
          width: 240,
         
     });
      this.CJDPSJ = Ext.create('App.Public.DateTimeBox', {
    	   labelWidth: 100,
  	        fieldLabel: '参加党派时间',
			width : 240,
			name:'CJDPSJ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.TZ=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'TZ',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '体重',
          width: 240,
         
     });
      this.HKXZ = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '户口性质',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getHKXZList',
          valueField: 'ID',
          displayField:'NAME',
          name:'HKXZ',
          value:'',
          noCache: false
      });
      this.SG=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SG',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '身高',
          width: 240,
         
     });
      this.WXH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'WXH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '微信号',
          width: 240,
         
     });
      this.JKZK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '健康状况',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getXYXHList',
          valueField: 'ID',
          displayField:'NAME',
          name:'JKZK',
          value:'',
          noCache: false
      });
      this.PHONE=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'PHONE',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '手机号',
          width: 240,
         
     });
      this.HYZK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '婚姻状况',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getHYZKList',
          valueField: 'ID',
          displayField:'NAME',
          name:'HYZK',
          value:'',
          noCache: false
      });
      this.HKSZD=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'HKSZD',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '户口所在地',
          width: 240,
         
     });
      this.BYYXJZY=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'BYXXJZY',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '毕业院校及专业',
          width: 480,
         
     });
      this.XL = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '最后学历',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getXLList',
          valueField: 'ID',
          displayField:'NAME',
          name:'ZHXL',
          value:'',
          noCache: false
      });
      this.ZHZY=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZHZY',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '最后专业',
          width: 240,
         
     });
      this.JZ = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '警种',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getJZList',
          valueField: 'ID',
          displayField:'NAME',
          name:'JZ',
          value:'',
          noCache: false
      });
      this.JH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '警号',
          width: 240,
         
     });
      this.DWJC = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '单位简称',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getDBMList',
          valueField: 'ID',
          displayField:'NAME',
          name:'DWJC',
          value:'',
          noCache: false
      });
      this.DBM = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '大部门',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getDBMList',
          valueField: 'ID',
          displayField:'NAME',
          name:'DBM',
          value:'',
          noCache: false
      });
      this.XGZDW = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '现工作单位',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getDBMList',
          valueField: 'ID',
          displayField:'NAME',
          name:'XGZDW',
          value:'',
          noCache: false
      });
      this.JRLY = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '进入来源',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getJRLYList',
          valueField: 'ID',
          displayField:'NAME',
          name:'JRLY',
          value:'',
          noCache: false
      });
      this.JRDWSJ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
	        fieldLabel: '进入现单位时间',
			width : 240,
			name:'JRXDWSJ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.KSJC=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'KSJC',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '科室简称',
          width: 240,
         
     });
      this.ZW=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '职务',
          width: 240,
         
     });
      this.JRFS = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '进入方式',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getJRFSList',
          valueField: 'ID',
          displayField:'NAME',
          name:'JRFS',
          value:'',
          noCache: false
      });
      this.GW = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '岗位',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getGWList',
          valueField: 'ID',
          displayField:'NAME',
          name:'GW',
          value:'',
          noCache: false
      });
      this.ZZZK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '在职状况',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getZZZKList',
          valueField: 'ID',
          displayField:'NAME',
          name:'ZZZK',
          value:'',
          noCache: false
      });
      this.XZWRZSJ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
	        fieldLabel: '现职务任职时间',
			width : 240,
			name:'XZWRZSJ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.GAZXH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'GAZXH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '公安专线号',
          width: 240,
         
     });
      this.BGDH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'BGDH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '办公电话',
          width: 240,
         
     });
      this.GWYLYSJ = Ext.create('App.Public.DateTimeBox', {
  	    labelWidth: 100,
	        fieldLabel: '公务员录用时间',
			width : 240,
			name:'GWYLYSJ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.CJGZSJ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
  	        fieldLabel: '参加工作时间',
  			width : 240,
  			name:'CJGZSJ',
  			value : nowTime,
  			format : 'Y年m月d日',
  			cls : 'x-sp-toolbar-left'
  		});
    
      this.SSJXZL = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '首授警衔种类',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getSSJXZLList',
          valueField: 'ID',
          displayField:'NAME',
          name:'SSJXZL',
          value:'',
          noCache: false
      });
      this.CJGAGZSJ = Ext.create('App.Public.DateTimeBox', {
  	        labelWidth: 100,
	        fieldLabel: '参加公安时间',
			width : 240,
			value : nowTime,
			name:'CJGAGZSJ',
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.RYBZXX=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'RYBZXZ',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '人员编制性质',
          width: 240,
         
     });
      this.XSDYJB=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'XSDYJB',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '享受待遇级别',
          width: 240,
         
     });
      this.GL= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'GL',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '工龄',
          width: 240,
         
     });
      this.JQLB = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '假期类别',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getJQLBList',
          valueField: 'ID',
          displayField:'NAME',
          name:'JQLB',
          value:'',
          noCache: false
      });
      this.YXTS= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'YXTS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '应休天数',
          width: 240,
         
     });
      this.QSSJ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
  	        fieldLabel: '起始时间',
  			width : 240,
            name:'QSSJ',
  			value : nowTime,
  			format : 'Y年m月d日',
  			cls : 'x-sp-toolbar-left'
  		});
      this.ZZSJ = Ext.create('App.Public.DateTimeBox', {
  	    labelWidth: 100,
	        fieldLabel: '终止时间',
			width : 240,
			value : nowTime,
			name:'ZZSJ',
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.SXTS= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'SXTS',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '实修天数',
          width: 240,
         
     });
      this.XJWCQK = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '休假完成情况',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getXJWCQKList',
          valueField: 'ID',
          displayField:'NAME',
          name:'XJWCQK',
          value:'',
          noCache: false
      });
      this.CJZJZL = Ext.create('App.Common.ComboBoxDropList', {
          fieldLabel: '出境证件种类',
          width: 240,
          labelWidth: 100,
          allowBlank: false,
          url: '../GRFZZD/getCJZJZLList',
          valueField: 'ID',
          displayField:'NAME',
          name:'CJZJZL',
          value:'',
          noCache: false
      });
      this.QFRJ = Ext.create('App.Public.DateTimeBox', {
    	    labelWidth: 100,
  	        fieldLabel: '签发日期',
  			width : 240,
  			value : nowTime,
  			name:'QFSJ',
  			format : 'Y年m月d日',
  			cls : 'x-sp-toolbar-left'
  		});
      this.ZJYXQ = Ext.create('App.Public.DateTimeBox', {
  	    labelWidth: 100,
	        fieldLabel: '证件有效期',
			width : 240,
			 name:'ZJYXQ',
			value : nowTime,
			format : 'Y年m月d日',
			cls : 'x-sp-toolbar-left'
		});
      this.ZJHM= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZJHM',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '证件号码',
          width: 480,
         
     });
      this.QFD= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'QFD',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '签发地',
          width: 240,
         
     });
      this.ZJBGDW= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZJBGDW',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '证件保管单位',
          width: 240,
         
     });
      this.ZJBGJL= Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'ZJBGJL',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '证件保管记录',
          width: 240,
         
     });
        this.leftContain=Ext.create('Ext.container.Container',{
        	width:600,
        	height:180,
        	layout:'absolute',
        	items:[
        	       {
                       x:20,
                       y:20,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.XM,
                                this.CXM  
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.NL,
                                this.SXE  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.GMSFZHM           
                       ]
                   },
                   {
                	   x:20,
                       y:110,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.CSRQ,
                                this.CSD           
                       ]
                   },{
                	   x:20,
                       y:140,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JG,
                                this.ZZSF           
                       ]
                   }
        	       
        	       ]
        })
        
        this.rightContain=Ext.create('Ext.container.Container',{
        	width:100,
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
                           xtype: 'component',
                           flex: 1
                       },
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
               {
                xtype: 'container',
                layout: 'hbox',
                items: [ this.leftContain,
                         this.rightContain 
                ]
            }, {
                xtype: 'container',
                layout: 'absolute',
                items: [ {
             	   x:20,
                   y:0,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.MZ,
                            this.XYXH, 
                            this.EMAL
                           ]
                },{
             	   x:20,
                   y:30,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.CJDPSJ,
                            this.TZ, 
                            this.HKXZ
                           ]
                },{
             	   x:20,
                   y:60,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.SG,
                            this.WXH, 
                            this.JKZK
                           ]
                },{
             	   x:20,
                   y:90,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.PHONE,
                            this.HYZK, 
                            this.HKSZD
                           ]
                },{
             	   x:20,
                   y:120,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.BYYXJZY,
                            this.XL, 
                           
                           ]
                },{
              	   x:20,
                    y:150,
                    xtype: 'container',
                    layout: 'hbox',
                    items: [ 
                             this.XL,
                             this.ZHZY
                            
                            ]
                 }/*,{
                	 xtype:'component',
                	 x:20,
                     y:170,
                	 cls:'.grfz-fgx',
                     html:'-----------------------------------------------------------------------------------------------------------------------------'
                 }*/,{
             	   x:20,
                   y:180,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.JZ,
                            this.JH, 
                            this.DWJC,
                           ]
                },{
             	   x:20,
                   y:210,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.DBM,
                            this.XGZDW, 
                            this.JRLY
                           ]
                },{
             	   x:20,
                   y:240,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.JRDWSJ,
                            this.KSJC, 
                            this.ZW
                           ]
                },{
             	   x:20,
                   y:270,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.JRFS,
                            this.GW, 
                            this.ZZZK
                           ]
                },{
             	   x:20,
                   y:300,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.XZWRZSJ,
                            this.GAZXH, 
                            this.BGDH
                           ]
                },{
             	   x:20,
                   y:330,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.GWYLYSJ,
                            this.CJGZSJ, 
                            this.SSJXZL
                           ]
                },{
             	   x:20,
                   y:360,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.CJGAGZSJ,
                            this.RYBZXX, 
                            this.XSDYJB
                           ]
                },{
             	   x:20,
                   y:390,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.GL,
                            
                           ]
                },{
             	   x:20,
                   y:420,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.JQLB,
                            this.YXTS,
                            this.QSSJ
                            
                           ]
                },{
             	   x:20,
                   y:450,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.ZZSJ,
                            this.SXTS,
                            this.XJWCQK
                            
                           ]
                },{
             	   x:20,
                   y:480,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.CJZJZL,
                            this.ZJHM, 
                           ]
                },{
             	   x:20,
                   y:510,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.QFRJ,
                            this.ZJYXQ,
                            this.QFD
                            
                           ]
                },{
             	   x:20,
                   y:540,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.ZJBGDW,  
                           ]
                },{
             	   x:20,
                   y:570,
                   xtype: 'container',
                   layout: 'hbox',
                   items: [ 
                            this.ZJBGJL,  
                           ]
                }
                ]
            }
            ],           
      
        this.callParent(arguments);
    },
   
    onUploadBckImage: function () {
        var vme = this;
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

