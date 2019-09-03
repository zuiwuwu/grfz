Ext.define('App.Common.Chart.MultiLine', {
    extend: 'Ext.Component',
    chartType: 'MSLine',
    showborder: "0",
    showvalues: "1",
    formatnumberscale: '0',
    linecolor: "BBDA00",
    basefontcolor: "FFFFFF",
    canvasbordercolor: "FFFFFF",
    tooltipbordercolor: "406181",
    tooltipbgcolor: "406181",
    autoloaddata: true,
    childEls: [
        'chartEl'
    ],
    renderTpl: [
        '<div id="{id}-chartEl" style="width:0px;height:0px;position:relative;">',
        '</div>'
    ],
    url: '../YWE/GetCLTJ',
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
        var v = this.getId() + '-chartEl';
        var height = this.getHeight();
        this.myChart = new FusionCharts("/Charts/" + this.chartType + ".swf", "chart_" + v,
        '100%',
       '100%');
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
    loadData: function (data) {

//        var vdata =
//        {
//            chart:
//            {
//                "caption": this.title,
//                "formatnumberscale": this.formatnumberscale,
//                "numberSuffix": this.numberSuffix,
//                "showborder": this.showborder,
//                "showlegend": this.showlegend,
//                "showyaxisvalues": this.showyaxisvalues,
//                //"divlinecolor": "FFFFFF",
//                "divLineAlpha": this.divLineAlpha,
//                //"canvasbasedepth": "0",
//                "showcanvasbg": this.showcanvasbg, //是否显示背景
//                //"canvasbgalpha": "0",
//                //"canvasbgratio": "0",
//                //"canvasbasecolor": "CFCFCF",
//                "showvalues": this.showvalues,
//                "showLabels": this.showLabels,
//                "bgalpha": this.bgalpha,
//                "linecolor": this.linecolor,
//                "basefontcolor": this.basefontcolor,
//                "canvasbordercolor": this.canvasbordercolor,
//                "tooltipbordercolor": this.tooltipbordercolor,
//                "tooltipbgcolor": this.tooltipbgcolor
//                //"anchorbgcolor": "BBDA00",
//                //"bgcolor": "406181, 6DA5DB"
//            },
//            data: []
//        };
//        if (data) {
//            for (var i = 0; i < data.length; i++) {
//                var v = data[i];
//                vdata.data.push({
//                    label: v.Name||v.NAME,
//                    customdata: data[i],
//                    "value": v.Number||v.TCOUNT|0,
//                    "link": this.canlink ? ('j-myFusionChartsJS-' + Ext.JSON.encode({ id: this.getId(), dataIndex: i })) : undefined
//                });
//            }
//        }
        this.myChart.setJSONData(data);
        this.data = data;
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
                        
                        vme.loadData(result);
                    }
                }
                else {
                }
            }
        });
    },
    onLink: function (params) {
        var index = parseInt(params.dataIndex);
        if (this.data
        && index >= 0
        && index < this.data.data.length)
            this.fireEvent('itemclick', this.data.data[index]);
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

