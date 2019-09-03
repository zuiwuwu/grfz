Ext.define('App.SystemSetting.ZD.addDMZD', {
	extend : 'App.Common.EditDlg',
	title : '添加店名信息',
	requires: ['App.Common.ComboBoxDropList','SZPT.view.ui.DateTimeBox'],
	initComponent : function() {
		
		var labelWidth = 120;
		var width = 300;
		var vitems = [
		{
			xtype :'textfield',
			allowBlank : false,
			fieldLabel : '收购店名',
			name : 'SGDM',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '地址',
			name : 'DZ',
			value : '',
			width : width ,
			labelWidth : labelWidth
		
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '业主姓名',
			name : 'YZXM',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '身份证号码',
			regex: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            regexText: '请输入正确的18位身份证号码',
			name : 'SFZHM',
			id:'SFZHM',
			value : '',
			width : width ,
			labelWidth : labelWidth,
		    listeners : {
								scope : this,
								blur : function() {
								    var vSFZHM =	Ext.getCmp('SFZHM').getValue();
										      Ext.Ajax.request({
												url : '../SJZD/getRYinfo',
												params : {
													SFZHM : vSFZHM
												},
												method : 'post',
												scope : this,
												callback : function(options, success, response) {
													if (success) {
														var v = Ext.JSON
																.decode(response.responseText);
													    
													    v.YZXM = v.XM;
													    v.HJD = v.HJQH;
													    v.SFZHM = v.GMSFHM
														this.setValues(v);
														
													} else {
									
													}
												}
											});
								}
							}
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '户籍地',
			name : 'HJD',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			fieldLabel : '联系电话',
			name : 'LXDH',
			value : '',
			width : width ,
			labelWidth : labelWidth
			//maxValue: 99,
        
        	
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : 'QQ号码',
			name : 'QQ',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : '微信号码',
			name : 'WX',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},
		{
			xtype : 'textfield',
			allowBlank : true,
			fieldLabel : '车辆',
			name : 'CL',
			value : '',
			width : width ,
			labelWidth : labelWidth
		},Ext.create('App.Common.AutoComplete',{
                                                    name : 'SQMJ',
										            hideLabel: false,
										            editable:true,
										            fieldLabel : '社区民警',
										            width : width ,
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
										          
										        }),Ext.create('App.Common.ComboBoxDropList', {
							fieldLabel : '经营状态',
							allowBlank : false,
							width:width,
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
									}) ,{
		 	                xtype :'textfield',
                            allowBlank: false,
                            name: 'SGDMLX',
                            hidden: true,
                            value: this.SGDMLX
                        }
		
		];
		
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
	getValues:function()
	{
		 var form = this.down('form');
         var values =  form.getValues();
         return values;
	}
});
