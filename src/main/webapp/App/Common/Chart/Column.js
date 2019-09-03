Ext.define('App.Common.Chart.Column', {
    extend: 'Ext.Component',
    chartType: 'Column3D',
    formatnumberscale: '0',
    showborder: '0', //是否显示边框,
    showlegend: '1', //是否显示
    showyaxisvalues: '1', //是否显示刻度
    showcanvasbg: '1', //是否显示背景
    showLabels: '1', //是否显示标签
    showvalues: '1', //是否显示值,
    divLineAlpha: '100', //刻度线透明度
    bgalpha: '100', //背景透明度
    bktransparent: false,
    autoloaddata: true,
    colors: [],
    groupcolumn: false,
    childEls: [
        'chartEl'
    ],
    renderTpl: [
        '<div id="{id}-chartEl" style="width:0px;height:0px;position:relative;">',
        '</div>'
    ],
    url: '../YWE/GetBXTJ',
    loading: false,
    showmarsk: true,
    initComponent: function () {
        var vme = this;
        this.addEvents('itemclick');
        if (!this.listeners) {
            this.listeners = {};
        }
        Ext.apply(this.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                vme.myChart.resizeTo(width.toString(), height.toString());
            }
        });
        this.callParent(arguments);
    },
    afterRender: function () {
        var vme = this;
        this.callParent(arguments);
        Ext.listFusionChartsMsgfun[this.getId()] = { pfun: this.onLink, scope: this };
        this.init();
    },
    init: function () {
        var vme = this;
        var v = this.getId() + '-chartEl';
        var height = this.getHeight();
        //         this.myChart = new FusionCharts("/Charts/" + this.chartType + ".swf", "chart_" + v,
        //         '100%',
        //        '100%'); 
        if (this.myChart) {
            this.myChart.dispose();
        }
        this.myChart = null;
        this.myChart = new FusionCharts({ swfUrl: "/Charts/" + this.chartType + ".swf",
            id: "chart_" + v,
            width: '100%',
            height: '100%',
            bgColor: 'FFFF00'
        });
        this.myChart.setXMLData("<chart></chart>");
        this.myChart.setTransparent(this.bktransparent);

        //this.myChart.setXMLUrl("/Charts/Data.xml");
        this.myChart.addEventListener("Rendered", function (e, p) {
            vme.myChart.resizeTo(vme.getWidth().toString(),
            vme.getHeight().toString());
            vme.InitChart();
        });
        this.myChart.render(v);
    },
    onDestroy: function () {
        var v = Ext.listFusionChartsMsgfun[this.getId()];
        if (v)
            delete v;
        this.callParent(arguments);
    },
    loadColumn3DData: function (result) {
        var data = result.rows;
        var vdata =
        {
            chart:
            {
                "caption": this.title,
                "xAxisName": this.xAxisName,
                "yAxisName": this.yAxisName,
                "numberPrefix": this.numberPrefix,
                "formatnumberscale": this.formatnumberscale,
                "showborder": this.showborder,
                "showlegend": this.showlegend,
                "showyaxisvalues": this.showyaxisvalues,
                //"divlinecolor": "FFFFFF",
                "divLineAlpha": this.divLineAlpha,
                //"canvasbasedepth": "0",
                "showcanvasbg": this.showcanvasbg, //是否显示背景
                //"canvasbgalpha": "0",
                //"canvasbgratio": "0",
                //"canvasbasecolor": "CFCFCF",
                "showvalues": this.showvalues,
                "showLabels": this.showLabels,
                "bgalpha": this.divLineAlpha
            },
            data: []
        };

        if (data) {
            for (var i = 0; i < data.length; i++) {
                vdata.data.push({
                    "label": data[i].NAME,
                    "value": data[i].TCOUNT,
                    "color": data[i].color,
                    "link": this.canlink ? ('j-myFusionChartsJS-' + Ext.JSON.encode({ id: this.getId(), dataIndex: i, fieldIndex: 0 })) : undefined,
                    data: data[i]
                });
            }
            for (var i = 0; i < this.colors.length; i++) {
                if (i < vdata.data.length) {
                    vdata.data[i].color = this.colors[i];
                }
            }
        }
        this.data = vdata;
    },
    getDataByIndex: function (index) {
        if (!this.data
        || !this.data.data)
            return null;
        return this.data.data[index].data;
    },
    loadMSColumn3DData: function (result) {
        var data = result.rows;
        var vdata =
        {
            chart:
            {
                "caption": this.title,
                "xAxisName": this.xAxisName,
                "yAxisName": this.yAxisName,
                "numberPrefix": this.numberPrefix,
                "formatnumberscale": this.formatnumberscale,
                "showborder": this.showborder,
                "showlegend": this.showlegend,
                "showyaxisvalues": this.showyaxisvalues,
                //"divlinecolor": "FFFFFF",
                "divLineAlpha": this.divLineAlpha,
                //"canvasbasedepth": "0",
                "showcanvasbg": this.showcanvasbg, //是否显示背景
                //"canvasbgalpha": "0",
                //"canvasbgratio": "0",
                //"canvasbasecolor": "CFCFCF",
                "showvalues": this.showvalues,
                "showLabels": this.showLabels,
                "bgalpha": this.divLineAlpha,
                "yaxisminvalue": this.yaxisminvalue,
                "yaxismaxvalue": this.yaxismaxvalue
            },
            "categories": result.categories,
            "dataset": result.dataset
        };

        if (vdata.dataset) {
            for (var i = 0; i < vdata.dataset.length; i++) {
                var dataset = vdata.dataset[i];
                for (var j = 0; j < dataset.data.length; j++) {
                    var dataitem = dataset.data[j];
                    dataitem.link = this.canlink ? ('j-myFusionChartsJS-' + Ext.JSON.encode({ id: this.getId(), dataIndex: i, fieldIndex: j })) : undefined;
                }
            }
        }
        this.data = vdata;
    },
    loadData: function (result) {

        if (this.chartType == 'Column3D') {
            this.loadColumn3DData(result);
        }
        else if (this.chartType == 'MSColumn3D') {
            this.loadMSColumn3DData(result);
        }
        if (this.myChart.hasRendered()
        && this.data)
            this.myChart.setJSONData(this.data);
    },
    changeChartType: function (chartType, data) {
        if (this.chartType != chartType) {
            this.chartType = chartType;
            if (data)
                this.data = null;
            this.init();
        }
        if (data)
            this.loadData(data);
    },
    hansChartRendered: function () {
        if (!this.myChart)
            return false;
        return this.myChart.hasRendered();
    },
    refresh: function (filter, sort) {
        this.filters = filter;
        this.sorters = sort;
        if (!this.hansChartRendered())
            return;
        if (this.loading)
            return;
        if (this.url) {
            if (filter)
                this.filters = filter;
            else
                filter = this.filters;
            if (sort)
                this.sorters = sort;
            else
                sort = this.sorters;
            var vparams = {
                page: 1,
                start: 0,
                limit: 25,
                sort: Ext.JSON.encode(sort), //[{ "property": "DEVICENAME", "direction": "ASC"}],
                filter: Ext.JSON.encode(filter)//[{ "property": "devname", "value": "1" }, { "property": "DWBH", "value": "" }, { "property": "DEVTYPEID", "value": ""}]
            };
            this.loading = true;
            var vme = this;
            var myMask;
            if (this.showmarsk) {
                myMask = new Ext.LoadMask(vme, { msg: "正在加载数据，请稍候！" });
                myMask.show();
            }
            Ext.Ajax.request({
                url: this.url, //请求地址  
                params: vparams,
                method: 'post', //方法  
                callback: function (options, success, response) {
                    if (myMask)
                        myMask.hide();
                    vme.loading = false;
                    if (success) {
                        if (response.responseText
                    && response.responseText != '') {
                            var result = Ext.JSON.decode(response.responseText);
                            vme.loadData(result);
                        }
                    }
                    else {
                    }
                }
            });
        }
        else if (this.data) {
            this.myChart.setJSONData(this.data);
        }

    },
    onLink: function (params) {
        this.fireEvent('itemclick', params);
    },
    InitChart: function () {
        var vme = this;
        if (!vme.myChart.jsVars.isResizing) {
            vme.OnInitChart();
        }
        else {
            setTimeout(function () {
                vme.InitChart();
            },
            10);
        }
    },
    OnInitChart: function () {
        var vme = this;
        if (vme.autoloaddata)
            vme.refresh(vme.filters, vme.sorters);
    }
});

