Ext.define('App.grczpt.Home.searchResult', {
	extend:'App.framework.listfrm',
	url:'../GRFZ/getSearchLists',
	requires : ['App.Common.HyperLinkColumn'],
	style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	title:'搜索信息',
	gridautoLoad: false,
	pageitemselectkey:'ID',
	width :'100%',
	flex:1,
	oldStyle :true,
	flag:0,
	total:0,
	initComponent : function() {
	var me = this;	
		 me.dataviewShowImageTpl = new Ext.XTemplate(
					'<tpl for=".">',
				 '<div style=" padding:5px;" class="grczpt-home-grid" width:600px;height:265px>'+ 
		                '<div style="padding:5px; float:left;width:133px;height:265px;"> '+
		                '<div style=" width:132px;height:157px;text-align:center;"><img src="../images/4.png"></div>'+
		                '<div style=" width:132px;height:20;text-align:center;">综合评估</div>'+ 
		                '<div class="star-rating" style="margin-top:20px;"> '+
					       ' <div class="star-rating-top" style="width:49%">'+
					           ' <span>★</span>'+
					            '<span>★</span>'+
					           ' <span>★</span>'+
					           ' <span>★</span>'+
					          
					       ' </div>'+
					        '<div class="star-rating-bottom">'+
					          '  <span>★</span>'+
					           ' <span>★</span>'+
					           ' <span>★</span>'+
					           ' <span>★</span>'+
					        '</div>'+
					      '</div>'+
					    '</div>'+
		                '<div style=" padding:5px;width:135px;height:265px;float:left;">'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">姓名:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">性别:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">年龄:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">身高:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">体重:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">警号:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">手机号:某某人</div>'+
					    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">大部门:某某人</div>'+
					    '</div> '+
					    '<div style=" padding:5px;width:295px;height:265px;float:left;text-align:center;">'+
					    '<img src="../images/grczpt/home/ldt.png">'+
					    '</div> '+
						' </div>'+
		                '</tpl>'
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
                       //alert('操作失败！');
                     
                   }
               }
           });
	
	}
	
	
});
