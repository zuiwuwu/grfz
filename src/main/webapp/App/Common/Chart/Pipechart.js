Ext.define('App.Common.Chart.Pipechart', {
    extend: 'Ext.Window',
    width: 500,
    height: 350,
    animate: true,
    theme: 'Base:gradients',
    initComponent: function () {
        Ext.apply(this, {
            store: Ext.create('Ext.data.JsonStore',
         {
             fields: ['name', 'value'],
             data: [
             { 'name': 'metric one', 'value': 10 }
              ]
         })
        })
    },

 items: [{ 
    xtype:'chart',
    manageresize: "1",
        origw: "240",
        origh: "250",
        upperlimit: "100",
        lowerlimit: "0",
        numbersuffix: "%", //单位
        majortmnumber: "11",
        majortmcolor: "646F8F",
        majortmheight: "9",
        minortmnumber: "2",
        minortmcolor: "646F8F",
        minortmheight: "3",
        majortmthickness: "1",
        decmials: "0",
        ledgap: "2",
        ledsize: "2",
        annrenderdelay: "1.7",

        colorrange: {
            color: [
                  {
                      minvalue: "0",
                      maxvalue: "20",
                      code: "00dd00"
                  }
                ]
        },
        annotations: {
            groups: [
                  {
                      id: "GRP1",
                      showbelow: "0",
                      x: "$gaugeCenterX",
                      constrainedscale: "0",
                      items: [
                      {
                          type: "line",
                          y: "$gaugeStartY+1",
                          toy: "$gaugeEndY-1",
                          color: "000000",
                          linethickness: "3"
                      }
                    ]
                  }
                ]
        },
        value: "16",
        styles: {
            definition: [
                  {
                      type: "animation",
                      name: "lineAnim",
                      param: "_yscale",
                      duration: "0.7",
                      start: "0"
                  }
                ],
            application: [
                  {
                      toobject: "GRP1",
                      styles: "lineAnim"
                  }

                ]
        }
          }
    ]


});