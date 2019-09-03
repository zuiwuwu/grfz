Ext.define('App.grfz.xxlr.khda.gridButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:30,
	initComponent : function() {
		var me=this;
		var gwy = this.jfpm;
		var sjqy = this.tjfx;
		var ejkh = this.ejkh;
		var txkh = this.txkh;
		var dwkh = this.dwkh;
		var meme =this.me;
		 me.title = Ext.create('Ext.Component',{
		     x:10,
		     y:10,
		     //cls:'compay_right',
             html:''
			});
		 
		 
		 
		 var combostore = new Ext.data.ArrayStore({
		       fields: ['id', 'name'],
		       data: [[1, '公务员年度考核等次'], [2, '市局全员绩效考核等级'], [3, '部门二级考核等级'],[4,'全警条线类别考核'],[5,'单位效绩考核']]
		        });
		 
		 
		 var combobox = new Ext.form.ComboBox({
			                fieldLabel: '考核档案',
			                store: combostore,
			                displayField: 'name',
			                valueField: 'id',
			                triggerAction: 'all',
			                emptyText: '请选择...',
			                allowBlank: false,
			                blankText: '请选择政治面貌',
			                editable: false,
			                mode: 'local'
			              });
		 
		 
		 combobox.on('select', function () {
			 			  var xx = meme;
			 			  
			              var index =  combobox.getValue();
			              
			              if(index == 1){
			            	  /*console.log(index)
			            	  xx.remove(me.items[1])
			            	  
			            	  xx.khxx=Ext.create('App.grfz.xxlr.khda.gwyndkhdc', {
			          			width: '100%',
			          			flex: 1
			          	        });
			            	  xx.items=[ xx.gridButton,
			            	             xx.khxx             
			              	          ] */
			            	  console.log(gwy.hidden)
			            	  gwy.show();
			            	  sjqy.hide();
			            	  ejkh.hide();
			            	  txkh.hide();
			            	  dwkh.hide();
			              };
			              
			              if(index == 2){
			            	  /*xx.remove(me.items[1])
			            	  
			            	  xx.khxx=Ext.create('App.grfz.xxlr.khda.sjqyjxkhdj', {
			          			width: '100%',
			          			flex: 1
			          	        });
			            	  xx.items=[ xx.gridButton,
			            	             xx.khxs             
			              	          ] */
			            	  gwy.hide();
			            	  ejkh.hide();
			            	  sjqy.show();
			            	  txkh.hide();
			            	  dwkh.hide();
			              };
			              if(index == 3){
			            	  
			            	  gwy.hide();
			            	  ejkh.show();
			            	  sjqy.hide();
			            	  txkh.hide();
			            	  dwkh.hide();
			              };
			              if(index == 4){
			            	  
			            	  gwy.hide();
			            	  txkh.show();
			            	  sjqy.hide();
			            	  ejkh.hide();
			            	  dwkh.hide();
			              };
			              if(index == 5){
			            	  
			            	  gwy.hide();
			            	  txkh.hide();
			            	  sjqy.hide();
			            	  ejkh.hide();
			            	  dwkh.show();
			              };
			              
			            /*  if(index == 3){
			            	  xx.remove(items[1])
			            	  
			            	  xx.khxx=Ext.create('App.grfz.xxlr.khda.gwyndkhdc', {
			          			width: '100%',
			          			flex: 1
			          	        });
			            	  xx.items=[ xx.gridButton,
			            	             xx.khxx             
			              	          ] 
			              };
			              
			              if(index == 1){
			            	  xx.remove(items[1])
			            	  
			            	  xx.khxx=Ext.create('App.grfz.xxlr.khda.gwyndkhdc', {
			          			width: '100%',
			          			flex: 1
			          	        });
			            	  xx.items=[ xx.gridButton,
			            	             xx.khxx             
			              	          ] 
			              };*/
			              
			              
			                
			            });
		 
		 me.grade = Ext.create('Ext.form.field.Text', {
				name : 'GRADE',
				x:1100,
			    y:0,
				fieldLabel : '等级',
				labelWidth : 40,
				width : 150,
				height : 22,
				
			});
		 
		 me.name = Ext.create('Ext.form.field.Text', {
				name : 'NAME',
				x:1260,
			    y:0,
				fieldLabel : '姓名',
				labelWidth : 40,
				width : 150,
				height : 22,
				
			});
		 
		 me.query = Ext.create('Ext.button.Button', {				
				x:1420,
			    y:0,
				text : '查询',			
				scope : this,
				width : 50,
				height : 20,
				handler : this.onSearch
			});		 
		 
		 me.addBtn= Ext.create('App.Common.ImageButtonEx',{
			    x:1480,
			    y:0,	
	 		    width:50,
	 		    height:20,		   
	 			scope : this,
	 			tooltip: '添加',
	 			btnCls:  'icon-grfz-Add-icon',
	 			handler :this.addxx
				});
	 	 me.delBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
	 	    	x:1540,
				y:0,
			    width:50,
			    height:20,
			  
				scope : this,
				tooltip: '删除',
				btnCls:  'icon-grfz-Del-icon',
				handler : this.onDelClick
				});
		 me.importBtn= Ext.create('App.Common.ImageButtonEx',{
			 x:1600,
			y:0,
		    width:54,
		    height:20,
		    
			scope : this,
			tooltip: '导入',
			btnCls:  'icon-grfz-Import-icon',
			handler : this.onImportClick
			});
	    me.exportBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
	    	 x:1660,
			y:0,
		    width:54,
		    height:20,
		   
			scope : this,
			tooltip: '导出',
			btnCls:  'icon-grfz-Export-icon',
			handler :this.onexportClick
			});
	    
		me.items=[ me.title,
		           combobox,
		           me.grade,
		           me.name,
	 		        me.query,
		           me.delBtn,
		           me.addBtn,
		           me.importBtn,
		           me.exportBtn
               
 	          ]
 	me.callParent(arguments);
		},
		addxx: function(btn){
	        var vme = this;
	        var s ;
	        
	        if (vme.jfpm.hidden == false) {
				this.url = '../KHGL/importGWYXX';
				
				Ext.create('App.grfz.xxlr.khda.addDlg', {
		            url: this.url,
		         
		        
		            listeners: {
		                saveok: function (result) {
		                	vme.jfpm.reLoad();
		                }
		            }
		        }).show();
				
			}
	        if (vme.tjfx.hidden == false) {
	        	this.url = '../KHGL/importSJQYXX';
	        	
	        	Ext.create('App.grfz.xxlr.khda.addDlg2', {
		            url: this.url,		              		           
		            listeners: {
		                saveok: function (result) {
		                	vme.tjfx.reLoad();
		                }
		            }
		        }).show();
			}
	        if (vme.ejkh.hidden == false) {
	        	this.url = '../KHGL/importEJKHXX';
	        	
	        	Ext.create('App.grfz.xxlr.khda.addDlg3', {
		            url: this.url,		              		           
		            listeners: {
		                saveok: function (result) {
		                	vme.ejkh.reLoad();
		                }
		            }
		        }).show();
			} 
	        if (vme.txkh.hidden == false) {
	        	this.url = '../KHGL/importTXXX';
	        	
	        	Ext.create('App.grfz.xxlr.khda.addDlg4', {
		            url: this.url,		              		           
		            listeners: {
		                saveok: function (result) {
		                	vme.txkh.reLoad();
		                }
		            }
		        }).show();
			}
	        if (vme.dwkh.hidden == false) {
	        	this.url = '../KHGL/importDWXX';
	        	
	        	Ext.create('App.grfz.xxlr.khda.addDlg5', {
		            url: this.url,		              		           
		            listeners: {
		                saveok: function (result) {
		                	vme.dwkh.reLoad();
		                }
		            }
		        }).show();
			}
	        
	    },
		onImportClick: function () {
			        var vme = this;
			        var s ;
			        console.log(vme.jfpm.reLoad())
			        if (vme.jfpm.hidden == false) {
						this.url = '../KHGL/importGWYNDKH';
						 var flag = "gwy";
						Ext.create('App.Common.UploadFileDlg', {
				            url: this.url,
				            title: '导入数据',   
				            flag:flag,
				            listeners: {
				                saveok: function (result) {
				                	vme.jfpm.reLoad();
				                }
				            }
				        }).show();
						
					}
			        if (vme.tjfx.hidden == false) {
			        	this.url = '../KHGL/importSJQYJXKH';
			        	var flag = "sjqy";
			        	Ext.create('App.Common.UploadFileDlg', {
				            url: this.url,
				            title: '导入数据',    
				            flag:flag,
				            listeners: {
				                saveok: function (result) {
				                	vme.tjfx.reLoad();
				                }
				            }
				        }).show();
					}
			        if (vme.ejkh.hidden == false) {
			        	this.url = '../KHGL/importEJKH';
			        	var flag = "ejkh";
			        	Ext.create('App.Common.UploadFileDlg', {
				            url: this.url,
				            title: '导入数据',    
				            flag:flag,
				            listeners: {
				                saveok: function (result) {
				                	vme.ejkh.reLoad();
				                }
				            }
				        }).show();
					}
			        if (vme.dwkh.hidden == false) {
			        	this.url = '../KHGL/importDWKH';
			        	var flag = "dwkh";
			        	Ext.create('App.Common.UploadFileDlg', {
				            url: this.url,
				            title: '导入数据',    
				            flag:flag,
				            listeners: {
				                saveok: function (result) {
				                	vme.dwkh.reLoad();
				                }
				            }
				        }).show();
					}
			        if (vme.txkh.hidden == false) {
			        	this.url = '../KHGL/importFJBMTXKH';
			        	var flag = "txkh";
			        	Ext.create('App.Common.UploadFileDlg', {
				            url: this.url,
				            title: '导入数据',    
				            flag:flag,
				            listeners: {
				                saveok: function (result) {
				                	vme.txkh.reLoad();
				                }
				            }
				        }).show();
					}
			    },
			    
		onDelClick:function(){
			var vme = this;
			if(vme.ejkh.hidden == false){

				vme.ejkh.onDelClick();  	
			}else if(vme.jfpm.hidden == false){
				vme.jfpm.onDelClick();  
			}else if(vme.txkh.hidden == false){
				vme.txkh.onDelClick();  
			}else if(vme.tjfx.hidden == false){
				vme.tjfx.onDelClick();  
			}else if(vme.dwkh.hidden == false){
				vme.dwkh.onDelClick();  
			}
					    },
					    onSearch : function() {
					    	var vme = this;
					    	if(vme.jfpm.hidden == false){
					    		var store = this.jfpm.getStore();
								store.clearFilter(true);
								store.filter(this.getFilters());
					    	}else if(vme.tjfx.hidden == false){
					    		var store = this.tjfx.getStore();
								store.clearFilter(true);
								store.filter(this.getFilters());
					    	}else if(vme.ejkh.hidden == false){
					    		var store = this.ejkh.getStore();
								store.clearFilter(true);
								store.filter(this.getFilters());
					    	}else if(vme.txkh.hidden == false){
					    		var store = this.txkh.getStore();
								store.clearFilter(true);
								store.filter(this.getFilters());
					    	}else if(vme.dwkh.hidden == false){
					    		var store = this.dwkh.getStore();
								store.clearFilter(true);
								store.filter(this.getFilters());
					    	}
							
						},
						
						getFilters : function() {
							return [ {
								property : 'USERNAME',
								value : this.name.getRawValue()
							} , {
								property : 'USERGRADE',
								value : this.grade.getRawValue()
							}];
						},
						
						getfilter : function() {
							var vme = this;
							var filters = this.getFilters();
							filters.push({
								property : 'select',
								value : vme.list.getSelectedString()
							});
							return filters;
						},
});