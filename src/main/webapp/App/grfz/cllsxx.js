Ext.define('App.grfz.cllsxx', {
	extend:'App.framework.frm.listfrm',
	url:'../GRFZ/getSearchLists',
/*	urlSmallPic : '../CLLSXX/ShowSmallPic',
	urlShowNullSmallPic : '../CLLSXX/ShowNullSmallPic',*/
	style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	requires : ['App.Common.HyperLinkColumn'],
	title:'搜索信息',
	gridautoLoad: false,
	pageitemselectkey:'',
	width :'100%',
	flex:1,
	oldStyle :true,
	flag:0,
	total:0,
	initComponent : function() {
	
	var me = this;		
		
	this.frontButton = Ext.create('Ext.button.Button', {
		id : 'frontButton',
		margin : '0 0 0 10',
		text : '全选',		
		scope : this,
		width : 100,
		handler : this.front
	} ),
	this.versoButton = Ext.create('Ext.button.Button', {
		id : 'versoButton',
		margin : '0 0 0 10',
		text : '反选',
		scope : this,
		width : 100,
		handler : this.verso
	}),
	this.setting = Ext.create('Ext.button.Button', {
		id : 'setting',
		margin : '0 0 0 10',
		text : '设置积分',
		scope : this,
		width : 100,
		handler : this.set
	}),
	this.tbitems = [this.frontButton , this.versoButton , this.setting];
	
	me.dataviewShowImageTpl = new Ext.XTemplate(
			
			
			
			
			'<tpl for=".">',
			'<div class="imagepreview-thumb-wrap"  id="{name:stripTags}">',
			Ext.String
			.format('<div class="imagepreview-check"><form action="javascript：void(0)"><input type="checkbox" name="boxes" value="{XM:htmlEncode}"></form></div>'),
			
			Ext.String
					.format('<div class="imagepreview-thumb"><img src="../JBXXGL/ShowFilePreview?ID={ZPURL:htmlEncode}" title="{XM:htmlEncode}"><span class="x-editable">ssssss</span></div>'),
			/*Ext.String
					.format('<div class="imagepreview-grade">ssssss</div>'),*/
			Ext.String
					.format('<div class="imagepreview-jbxxss">'),	
		    Ext.String
					.format('<span class="x-editable">姓名:{XM:htmlEncode}</span>'),
			Ext.String
					.format('<span class="x-editable">性别:{SEX:htmlEncode}</span>'),
			Ext.String
					.format('<span class="x-editable">年龄:{NL:htmlEncode}</span>'),
			Ext.String
					.format('<span class="x-editable">身高:{SG:htmlEncode}</span>'),
			Ext.String
					.format('<span class="x-editable">体重:{TZ:htmlEncode}</span>'),
			Ext.String
					.format('<span class="x-editable">警号:{JH:htmlEncode}</span>'),			
			Ext.String
					.format('<span class="x-editable">手机号:{PHONE:htmlEncode}</span>'),			
		    Ext.String
					.format('<span class="x-editable">大部门:{DBM:htmlEncode}</span>'),
			Ext.String
					.format('</div>'),
					
		    Ext.String
					.format('<div class="hr"><hr size="169" width="3"></div>'),	
/*					Ext.create('App.grczpt.zhpg.leidatu', {
						width : '100%',
						url : '../dimension/getListss?USERNAME='+vme.result[0].XM,
						flex : 1
					})*/
			Ext.String
					.format('<div class="">{[this.check(values)]}</div>'),'</div>', '</tpl>', 
					{
		                check : function (values) {
		                	Ext.create('App.grczpt.zhpg.leidatu', {
								width : '100%',
								url : '../dimension/getListss?',
								flex : 1
							})
		                }
		            }
					);
	 
	
		 this.columns = [
	  			          {
	  						name : '',
	  						type : 'string',
	  						gridcol : {						
	  							sortable : false,
	  							//autoSizable : true,
	  							xtype : 'rownumberer',
	  							header : '序号',
	  							width : 60
	  						}
	  					},{
	  						name:"ID",
	  						type : 'string', 
	  					},{
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},{	  					
	  						name : 'ZPURL',
	  						type : 'string', 					
	  					},
	  					{	  					
	  						name : 'MC',
	  						type : 'string', 					
	  					},{
	  						name : 'SEX',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '性别',
	  							width : 100
	  						}
	  					}, {
	  						name : 'NL',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '年龄',
	  							width : 100
	  						}
	  					},{
	  						name : 'ZW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '职位',
	  							width : 100
	  						}
	  					},{
	  						name : 'SG',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '身高',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'TZ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '体重',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'JH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '警号',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'PHONE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '手机号',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'DBM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '大部门',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'AH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '爱好',
	  							width : 100,
	  					
	  						}
	  					},
	  						  					
	  					{
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							header : '操作',
	  							sortable : false,
	  							xtype : 'actioncolumn',
	  							flex : 1,
	  							minWidth : 160,
	  							items : [{
	  								        iconCls:'icon-grfz-Look-icon',
	  										tooltip : '查看详情',	
	  										text:'查看详情',	
	  										scope : this,
	  										width:50,
	  										handler : this.onDetails
	  									}, {
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										width:50,
	  										scope : this,
	  										handler : this.onQuickDeploy
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										width:50,
	  										scope : this,
	  										handler : this.onQuickDeploy
	  									}
	  									]
	  						}
	  					}];	
		me.callParent(arguments);

	},
	
	
	front:function(){
		var box=document.getElementsByName("boxes");
		check_val = [];	
		for (var int = 0; int < box.length; int++) {
			box[int].checked=true;
			check_val.push(box[int].value);
		}
		alert(check_val.length);
	},
	
	verso:function(){
		var box=document.getElementsByName("boxes");
		
		for (var int = 0; int < box.length; int++) {
			box[int].checked=false;
			check_val.splice(0,check_val.length)
			
		}
		alert(check_val.length);
	},
	
	set:function(){
		
		var box=document.getElementsByName("boxes");
		check_val = [];	
		for (var int = 0; int < box.length; int++) {
			if(box[int].checked){
				check_val.push(box[int].value);
			}			
		}
		console.log(check_val)
		if(check_val.length > 0){
			var url = 'http://localhost:8080/grfz/grfz/jifen1?check_val='+check_val;
			window.open(url);			
		}else{
			alert("请选择用户")
		}				
	},
	
	afterRender : function() {
		
		this.callParent(arguments);
		this.list.showListType('dataview');
		   Ext.Ajax.request({
               url: '../GRFZ/getTotal',
               method: 'post', //方法          
               scope: this,
               callback: function (options, success, response) {                 
                   if (success) {
                       var v = Ext.JSON.decode(response.responseText);                      
                        console.log(v.rows[0].RUM);
                        this.total=v.rows[0].RUM;               
                   }
                   else {
                      // alert('操作失败！');
                     
                   }
               }
           });
	
	},	
	
	
	itemdblclick:function (grid, record, item, index, e, eOpts) {
	    console.log(record)
		var XM=record.get('XM');
		var AH = record.get('AH');
		var ZW = record.get('ZW');
		var JH = record.get('JH');
		var ZPURL=record.get('ZPURL');
		var SEX=record.get('SEX');
		var jbxx=Ext.create('App.grfz.xxlr.jbxxda.jbxx',{
			  width:'100%',
	 		  height:'100%',
		})
		
		var jbxx = Ext.create('App.grczpt.dbmjgt.testpicture',{
			  AH:AH,
			  JH:JH,
			  XM:XM,
			  ZW:ZW,
			  width:'100%',
	 		  height:'100%',
		});
		
		var showContain=Ext.create('App.grfz.xxlr.showContain',{
			index:this.index,
			XM:  XM,
			ZPURL:ZPURL,
			SEX:SEX,
			
		});
		
		var filter=[{
						property : 'XM',
						value : XM
					}];
		//jbxx.getStore().filter(filter)
		showContain.gridContian.removeAll();
		showContain.gridContian.add(jbxx);
		//this.index.bottomcontain.removeAll();
		this.index.add(showContain);
		this.index.getLayout().setActiveItem(showContain);
    },
	
	
});
