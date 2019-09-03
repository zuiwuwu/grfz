Ext.define('App.grczpt.cllsxx', {
	extend:'App.framework.listfrm',
	url:'../GRFZ/getSearchLists',
	urlSmallPic : '../CLLSXX/ShowSmallPic',
	urlShowNullSmallPic : '../CLLSXX/ShowNullSmallPic',
	requires : ['App.Common.HyperLinkColumn'],
	title:'搜索信息',
	gridautoLoad: false,
	pageitemselectkey:'clxxbh',
	width :'100%',
	flex:1,
	oldStyle :true,
	flag:0,
	total:0,
	initComponent : function() {
		
			
	var me = this;	
	
	
	me.tbitems = [this.frontButton , this.versoButton , this.setting];
	
	
	this.frontButton = Ext.create('Ext.button.Button', {
		id : 'frontButton',
		margin : '0 0 0 10',
		text : '正选',
		iconCls : 'icon-add',
		scope : this,
		width : 100,
	} ),
	
	this.versoButton = Ext.create('Ext.button.Button', {
		id : 'versoButton',
		margin : '0 0 0 10',
		text : '反选',
		iconCls : 'icon-del',
		scope : this,
		width : 100,
	}),
	
	this.setting = Ext.create('Ext.button.Button', {
		id : 'setting',
		margin : '0 0 0 10',
		text : '设置积分',
		iconCls : 'icon-del',
		scope : this,
		width : 100,
	}),
	
	
	
	me.dataviewShowImageTpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="imagepreview-thumb-wrap"  id="{name:stripTags}">',
				Ext.String
						.format('<div class="imagepreview-thumb"><img src="../JBXXGL/ShowFilePreview?ID={ZPURL:htmlEncode}" title="{XM:htmlEncode}"></div>'),
				Ext.String
						.format('<div class="imagepreview-grade">ssssss</div>'),
			    Ext.String
						.format('<div class="imagepreview-jbxx"><span class="x-editable">姓名:{XM:htmlEncode}</span>'),
				Ext.String
						.format('<span class="x-editable">性别:{SEX:htmlEncode}</span>'),
				Ext.String
						.format('<span class="x-editable">年龄:{NL:htmlEncode}</span>'),
			    Ext.String
						.format('<span class="x-editable">执法综合能力排名:{MC:htmlEncode}</span></div>'),
				'</div>', '</tpl>', '<div class="x-clear"></div>');
		
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
	
	//计总数
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
                       alert('操作失败！');
                     
                   }
               }
           });
	
	},	
	
	
	
	//个人详情
	itemdblclick:function (grid, record, item, index, e, eOpts) {
		var XM=record.get('XM');
		var ZPURL=record.get('ZPURL');
		var SEX=record.get('SEX');
		var jbxx=Ext.create('App.grfz.xxlr.jbxxda.jbxx',{
			  width:'100%',
	 		  height:'100%',
		})
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
		jbxx.getStore().filter(filter)
		showContain.gridContian.removeAll();
		showContain.gridContian.add(jbxx);
		//this.index.bottomcontain.removeAll();
		this.index.bottomcontain.add(showContain);
		this.index.bottomcontain.getLayout().setActiveItem(1+this.flag);
		this.index.topcontain.getLayout().setActiveItem(1);
		this.flag++;
    },
	
	
});
