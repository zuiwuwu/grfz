Ext.define('App.Common.Chart.MinePipe', {
    extend: 'Ext.Window',
    width: 800,
    height: 250,
    minWidth: 650,
    minHeight: 225,
    title: '',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: {
                easing: 'elasticIn',
                duration: 1000
            },
//          store:store,
            insetPadding: 25,
            flex: 1,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: -10
            }],
            series: [{
                type: 'gauge',
                field: 'data',
                donut: false,
                colorSet: ['#F49D10', '#ddd']
       
            }]
        }]
})