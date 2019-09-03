
Ext.define('App.grczpt.xtsz.userlogin.UserJf.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
//    gridautoLoad: false,
    arrraySelModID: {},
    checkOnly: false,
    gridpageSize: 14,
   url:this.url,
    oldStyle: true,
    initComponent: function () {
        this.arrraySelModID = {};
        var vme = this;
           	    
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: "序号",
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'EVENTNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '事件名称',
                width: 150,
                
            }
        },
        {
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "用户名",
                width: 150,
                
            }
        },
        {
            name: 'ZHDF',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "得分",
                width: 150,
               
            }
        }
        ];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        
       

        this.refreshChn = function () {
            vme.store.load();
        };

        this.getValues = function () {
            var v = new Array();
            for (var item in vme.arrraySelModID) {
                if (typeof (vme.arrraySelModID[item]) != 'function')
                    v.push(vme.arrraySelModID[item]);
            }
            return v;
        };

        this.callParent(arguments);

    },

    
    
});

Ext.define('App.grczpt.xtsz.userlogin.UserJf', {
    extend: 'Ext.Window',
    flex: 1,
    width: 600,
    title: '该维度得分详情',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'jifen';

        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.UserJf.List', {
            height: 400,
            url: '../jf/xiangqing?USERNAME='+this.USERNAME+'&NAME='+this.NAME,
            border: 1
        });

        this.fuzzys = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 200
		});
		
		this.items = [ {
			xtype : 'panel',			
			border : 1,
			height : 400,
			tbar : ["事件名称", this.fuzzys, {
						iconCls : 'icon-find',
						text : "搜索",
						scope : this,
						handler : this.onSearch
					}],
			items : [this.vchnlist]
			
		}]
        this.callParent(arguments);

    },
    
	onSearch : function() {
		var store = this.vchnlist.store;
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	getFilters : function() {
		return [ {
			property : 'fuzzys',
			value : this.fuzzys.getRawValue()
		} ];
		
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
