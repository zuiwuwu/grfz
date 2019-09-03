
Ext.define('App.SystemSetting.ZD.dmzdBaseDlg', {
	extend : 'App.Common.EditDlg',
	title : '店名信息',
	readOnly:true,
	showaddButton:true,
	requires: ['App.Common.ComboBoxDropList','SZPT.view.ui.DateTimeBox'],
	initComponent : function() {
		
		var labelWidth = 120;
		var width = 300;
		
		this.SQMJ = Ext.create('App.Common.AutoComplete',{
                                                    name : 'SQMJ',
                                                    id:'MJ',
										            hideLabel: false,
										            editable:true,
										            fieldLabel : '社区民警',
										            width : width ,
										            readOnly:!this.readOnly,
			                                        labelWidth : labelWidth,
										            allowBlank : false,
										            url: '../SJZD/SQMJ',
										            displayField: 'DESCRIPTION',
										            valueField: 'USERNAME',
										            hideTrigger: false,
										             queryPageSize: 10000,
										            value: '',
										            fields: [{
												                name: 'USERID'
												            },
												            {
												                name: 'USERNAME'
												            }, {
												                name: 'DESCRIPTION'
												            }]
										          
										        });
		var vitems = [
		
		{
			xtype :'textfield',
			allowBlank : false,
			fieldLabel : '收购店名',
			name : 'SGDM',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '地址',
			name : 'DZ',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '业主姓名',
			name : 'YZXM',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '身份证号码',
			name : 'SFZHM',
			regex: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            regexText: '请输入正确的18位身份证号码',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '户籍地',
			name : 'HJD',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '联系电话',
			name : 'LXDH',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : 'QQ号码',
			name : 'QQ',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : '微信号码',
			name : 'WX',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
			//maxValue: 99,
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : '车辆',
			name : 'CL',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:!this.readOnly
			//maxValue: 99,
		}
		,
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '管辖单位',
			name : 'GXDW',
			value : '',
			width : width ,
			labelWidth : labelWidth,
			readOnly:true
		},this.SQMJ,Ext.create('App.Common.ComboBoxDropList', {
							fieldLabel : '经营状态',
							allowBlank : false,
							width:width,
			                readOnly:!this.readOnly,
							labelWidth : labelWidth,
							name : 'JYZT',
							value : '',
							data : [{
										ID : '开业',
										NAME:'开业'
									}, {
										ID : '歇业',
										NAME:'歇业'
									}, {
										ID : '注销',
										NAME:'注销'
									}]
									}),{
			xtype :'textfield',
			allowBlank : false,
			name : 'SGDMLX',
			value : this.SGDMLX,
			hidden: true
		},{
			xtype :'textfield',
			allowBlank : false,
			name : 'DMID',
			value : this.DMID,
			hidden: true
		}];
		
		var v = [{
								xtype : 'container',
								layout : 'anchor',
								padding : '0 10 0 0',
								items : []
		},
		{
								xtype : 'container',
								layout : 'anchor',
								padding : '0 10 0 0',
								items : []
		}];
		
		
	
       
		this.items = [
		
		{
								xtype : 'container',
								layout : 'hbox',
								items : v
		}
		
		];
		
		for(var i = 0;i < vitems.length;i ++)
		{
			var vcon = v[i%v.length];
			vcon.items.push(vitems[i]);
		}


		this.callParent(arguments);
	}, 
	afterRender:function()    //前后台AJAX交互，使得数据库的值显示在面板上
    {
     	this.callParent(arguments);
     	var myMask = new Ext.LoadMask(this, {
			msg : '正在查询信息！'
		});
     	Ext.Ajax.request({
			url : '../SJZD/getInfo',
			params : {
				ID : this.DMID,
				SGDMLX:this.SGDMLX
			},
			method : 'post',
			scope : this,
			callback : function(options, success, response) {
				myMask.hide();
				if (success) {
					var v = Ext.JSON.decode(response.responseText);
					this.setValues(v);
					/*Ext.getCmp('MJ').setRawValue(222);
					Ext.getCmp('MJ').setValue(22);*/
					/*var obj = [{"USERID":636,"USERNAME":"129308","DESCRIPTION":"徐锴"}];
					this.SQMJ.setValue(obj);*/
					
					/*this.SQMJ.getStore().reload({
					       callback: function(records, options, success){ 
                            this.SQMJ.setRawValue(v.QQ);
                    }
					 });*/
				} else {

				}
			}
		});
		
    },
	getValues:function()
	{
		 var form = this.down('form');
         var values =  form.getValues();
         return values;
	}
    
});
