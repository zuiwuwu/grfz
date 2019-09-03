Ext.define('App.Common.Chart.Pipe', {
    extend: 'Ext.Component',
    chartType: 'Pie3D',
    formatnumberscale: '0',
    showborder: '0',//是否显示边框,
    showlegend: '0', //是否显示
    showyaxisvalues: '0', //是否显示刻度
    showcanvasbg: '0', //是否显示背景
    showLabels: '1', //是否显示标签
    showvalues: '1', //是否显示值,
    divLineAlpha: '0',//刻度线透明度
    bgalpha: '0',//背景透明度
    bktransparent: false,
    colors: ["FBAB35", "DA3608"],
    autoloaddata: true,
    childEls: [
        'chartEl'
    ],
    renderTpl: [
        '<div id="{id}-chartEl" style="width:0px;height:0px;position:relative;">',
        '</div>'
    ],
    url: '../YWE/GetDBTJ',
    loading: false,
    showmarsk: true,
    //     sorters: null,
    //     filters: null,
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
    loadData: function (data) {

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
            },
            data: []
        };

        if (data) {
            for (var i = 0; i < data.length; i++) {
                vdata.data.push({
                    "label": data[i].NAME,
                    "value": data[i].TCOUNT,
                    "color": data[i].color
                });
            }

            for (var i = 0; i < this.colors.length; i++) {
                if (i < vdata.data.length) {
                    vdata.data[i].color = this.colors[i];
                }
            }
        }
        this.myChart.setJSONData(vdata);
        this.data = vdata;
    },
    hansChartRendered: function () {
            if (!this.myChart)
            return false;
        return this.myChart.hasRendered();
    },
    refresh: function (filter, sort) {
        this.filters = filter;
        this.sorters = sort;
        if(!this.hansChartRendered())
            return;
        if (this.loading)
            return;
        if(!this.url)
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
                if(myMask)
                    myMask.hide();
                vme.loading = false;
                if (success) {
                   if (response.responseText
                    && response.responseText != '') {
                        var result = Ext.JSON.decode(response.responseText);
                        vme.loadData(result.rows);
                    }
                }
                else {
                }
            }
        });
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


