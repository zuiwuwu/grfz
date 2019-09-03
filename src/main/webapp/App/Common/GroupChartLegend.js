//定义编辑对话框
Ext.define('App.Common.GroupChartLegend', {
    extend: 'Ext.chart.Legend',
    requires: ['App.Common.GroupChartLegendItem'],
    initComponent: function () {
        var me = this;
        me.callParent();

    },
    createLegendItem: function (series, yFieldIndex) {
        var me = this;
        return new App.Common.GroupChartLegendItem({
            legend: me,
            series: series,
            surface: me.chart.surface,
            yFieldIndex: yFieldIndex
        });
    }
});
