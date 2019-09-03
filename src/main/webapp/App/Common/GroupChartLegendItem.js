//定义编辑对话框
Ext.define('App.Common.GroupChartLegendItem', {
    extend: 'Ext.chart.LegendItem',
    initComponent: function () {
        var me = this;
        me.callParent();

    },
    getLabelText: function () {
        var me = this,
            series = me.series,
            idx = me.yFieldIndex;

        function getSeriesProp(name) {
            var val = series[name];
            return (Ext.isArray(val) ? val[idx] : val);
        }

        return getSeriesProp('title') || getSeriesProp('yFieldName') || getSeriesProp('yField');
    }
});
