Ext.define('App.grfz.tjfx.bmdbtj', {
    extend: 'Ext.panel.Panel',
    layout: 'hbox',
    url: '../TJFX/BMDB',
    TJTYPE: 3, //统计类型
    initComponent: function () {
        var me = this;

        me.chart = Ext.create('App.Common.Chart.FusionCharts', {
            flex: 1,
            height: '100%',
            title: this.title,
            url: this.url,
            contrast: true,
            seriesTipsWidth: 250,
            autoloaddata: false
        });
        me.items = [me.chart];

        if (!me.listeners) {
            me.listeners = {};
        }
        Ext.apply(me.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                me.changeSize();
            }
        });

        var nowTime = new Date();
        //对比时间
        me.endDate = Ext.create('Ext.form.field.Date', {
            width: 178,
            value: nowTime,
            format:  'Y年m月d日',
            fieldLabel: '结束日期',
            labelWidth: 56,
					cls : 'x-sp-toolbar-left'
        }
        );
        nowTime.setHours(nowTime.getHours() - 1);
        //开始时间
        me.beginDate = Ext.create('Ext.form.field.Date', {
            width: 178,
            value: nowTime,
            format:  'Y年m月d日',
            fieldLabel: '开始日期',
            labelWidth: 56,
					cls : 'x-sp-toolbar-left'
        });

     
        me.searchBtn = {
            xtype: 'button',
            text: '统计',
            tooltip:  '统计',
            iconCls: 'icon-find',
            scope: me,
            handler: me.onSearch,
			cls : 'x-sp-toolbar-left'
        };

        var vdata = [];
        for (var i = 0; i < 24; i++) {
            vdata.push({ "value": i, "name": i });
        }


        me.sjqjstart = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '时间区间',
            labelWidth: 56,
            value: '0',
            editable: false,
            width: 104,
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: vdata
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        });


        me.sjqjstop = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '至',
            labelWidth: 20,
            value: '0',
            editable: false,
            width: 60,
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: vdata
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        });


        me.bbys = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '报表样式',
            labelWidth: 56,
            value: '0',
            editable: false,
            width: 128,
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: [
                { "value": "0", "name": "柱图" },
                { "value": "1", "name": "线图" },
                { "value": "2", "name": "饼图"}]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            listeners:
            {
                scope: this,
                select: this.onBBYS
            },
					cls : 'x-sp-toolbar-left'

        });


        me.tbar = [
        {
			xtype : 'container',
			width : '100%',
			layout : 'hbox',
            items: [
                me.beginDate, me.endDate,
                me.searchBtn
                   ]
        }
        ];

        me.callParent(arguments);

    },
    afterRender: function () {
        this.callParent(arguments);
        var vme = this;
        vme.changeSize();
    },
    changeSize: function () {
        var vme = this;
        //vme.chart.updateLayout();
    },
    onSearch: function () {
    	
        var vme = this;
        vme.chart.refresh([{
            property: 'BeginDate',
            value: vme.beginDate.getValue()
        }, {
            property: 'EndDate',
            value: vme.endDate.getValue()
        }]);
    },
    onBBYS: function (combo, records, eOpts) {
        var me = this;
				if (records.length > 0) {
					if (records[0].get('value') == '0')
						me.chart.changeChartType("Column3D");
					else if (records[0].get('value') == '1')
						me.chart.changeChartType("Line");
					else if (records[0].get('value') == '2')
						me.chart.changeChartType("Pie3D");
				}
    }
});



