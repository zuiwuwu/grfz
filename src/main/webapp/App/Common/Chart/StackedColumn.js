Ext.define('App.Common.Chart.StackedColumn', {
    extend: 'Ext.Component',
    chartType: 'StackedColumn3D',
    formatnumberscale: '0',
    showpercentvalues: "0",
    stack100percent: "0",
    areaovercolumns: "0",
    showvalues: "1",
    categoryName: 'TYPE',
    autoloaddata: true,
    dataset: [
                {
                    "color": "FBAB35",
                    //"alpha": "80",
                    //"renderas": "Area",
                    "seriesname": "在线",
                    fieldName: 'CONNECT'
                },
                {
                    "color": "DA3608",
                    //"renderas": "Area",
                    "seriesname": "断线",
                    fieldName: 'DISCONNECT'
                }
            ],
    childEls: [
        'chartEl'
    ],
    renderTpl: [
        '<div id="{id}-chartEl" style="width:0px;height:0px;position:relative;">',
        '</div>'
    ],
    url: '../YWE/GetDevTJ_JJ',
    loading: false,
    showmarsk: true,
    initComponent: function () {
        var vme = this;
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
        var v = this.getId() + '-chartEl';
        var height = this.getHeight();
        this.myChart = new FusionCharts("/Charts/" + this.chartType + ".swf", "chart_" + v,
        '100%',
       '100%');
        this.myChart.setXMLData("<chart></chart>");

        //this.myChart.setXMLUrl("/Charts/Data.xml");
        this.myChart.addEventListener("Rendered", function (e, p) {
            vme.myChart.resizeTo(vme.getWidth().toString(),
            vme.getHeight().toString());
            vme.InitChart();

        });
        //        this.myChart.addEventListener("LegendItemClicked", function (e, p) {
        //            alert('');
        //        });
        this.myChart.render(v);
    },
    onDestroy: function () {
        var v = Ext.listFusionChartsMsgfun[this.getId()];
        if (v)
            delete v;
        this.callParent(arguments);
    },
    loadData: function (data, dataset) {

        var vdata =
        {
            chart:
            {
                "showpercentvalues": this.showpercentvalues,
                "stack100percent": this.stack100percent,
                "areaovercolumns": this.areaovercolumns,
                "showvalues": this.showvalues,
                "yaxisname": this.yAxisName,
                "caption": this.title,
                "formatnumberscale": this.formatnumberscale,
                "showLabels": this.showLabels,
                "bgalpha": this.divLineAlpha,
                "showcanvasbg": this.showcanvasbg,
                "showlegend": this.showlegend,
                "showyaxisvalues": this.showyaxisvalues,
                "divLineAlpha": this.divLineAlpha
            },
            categories: [
                {
                    category: []
                }
            ],
            dataset: []
        };

        if (!dataset)
            dataset = this.dataset;
        for (var i = 0; i < dataset.length; i++) {
            vdata.dataset.push({ "color": dataset[i].color,
                "alpha": dataset[i].alpha,
                "renderas": dataset[i].renderas,
                "seriesname": dataset[i].seriesname,
                data: []
            });
        }


        if (data) {
            for (var i = 0; i < data.length; i++) {
                var v = data[i];
                vdata.categories[0].category.push({
                    label: v[this.categoryName],
                    data: v
                });


                for (var j = 0; j < dataset.length; j++) {
                    vdata.dataset[j].data.push({
                        "value": v[dataset[j].fieldName],
                        "link": this.canlink ? ('j-myFusionChartsJS-' + Ext.JSON.encode({ id: this.getId(), dataIndex: i, fieldIndex: j })) : undefined
                    });
                }
            }
        }
        this.myChart.setJSONData(vdata);
        this.data = vdata;
    },
    getDataByIndex: function (index) {
        if (!this.data)
            return null;
        var category = this.data.categories[0].category[index];
        return category.data;
    },
    hansChartRendered: function () {
        return this.myChart.hasRendered();
    },
    refresh: function (filter, sort) {
        if (this.loading)
            return;
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
                        if (vme.myChart.hasRendered())

                            vme.loadData(result.rows, result.dataset);
                    }
                }
                else {
                }
            }
        });
    },
    onLink: function (params) {
        ///alert(params.dataIndex);
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

