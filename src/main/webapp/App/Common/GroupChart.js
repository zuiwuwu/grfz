//定义编辑对话框
Ext.define('App.Common.GroupChart', {
    extend: 'Ext.chart.Chart',
    alias: ['widget.groupchart'],
    requires: ['App.Common.GroupChartLegend'],
    initComponent: function () {
        var me = this;
        var vlegend = me.legend;
        me.legend = false;
        me.callParent();
        if (vlegend !== false) {
            me.legend = new App.Common.GroupChartLegend(Ext.applyIf({ chart: me }, vlegend));
        }
    }
});
