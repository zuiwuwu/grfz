Ext.define('App.SSGCXX.CarInfo.SmallPic', {
    extend: 'Ext.container.Container',
    width: 337,
    height: 68,
    border: 0,
    layout: 'absolute',
    style: {
        background: 'url(../images/traffic/smallpic.png) no-repeat 0px 0px;'
    },
    initComponent: function () {
        var vme = this;
        this.image = Ext.create('Ext.Img', {
            x: 38,
            y: 10,
            width: 300,
            height: 63,
            border: 0,
            src: '../images/traffic/hp.png'
        });
        this.items = [this.image];
        this.callParent(arguments);
    },
    setSrc: function (src) {
        this.image.setSrc(src);
    }
});

Ext.define('App.SSGCXX.CarInfo',{
	extend: 'Ext.container.Container',
    width: 400,
    border: 0,
    layout: 'vbox',
    initComponent: function () {
    	var vme = this;
        this.vinfonitem = new Array();
        
        //第一排
        this.vinfonitem.push({
            xtype: 'container',
            layout: 'absolute',
            style: {
                background: '#1B2D53 url(../images/traffic/currentb_up_title.png) no-repeat 0px 0px;'
            },
            width: 378,
            height: 35,
            border: 0,
            items: [Ext.create('App.Common.ImageButton', {
                y: 0,
                x: 350,
                height: 30,
                width: 28,
                tooltip: '详细',
                hasImage: [{ name: 'normal', src: '' },
                { name: 'hover', src: ''}],
                scope: this,
                handler: function () {
                }
            })]
        });
        
        //剩下的行
        this.varraytext = new Array();
        var vInfo = [{ name:'通行时刻', text: '', id: 'JGSJ' },
                     { name:'经过道路名称', text: '', id: 'TXDD' },
                     { name:'车道号', text: '', id: 'CDBH' },
                     { name:'行驶方向', text: '', id: 'XSFX' },
                     { name:'行驶速度', text: '', id: 'XSSD' },
                     { name:'有无车牌', text: '', id: 'YWCP' },
                     { name:'车牌颜色', text: '', id: 'HPYS' },
                     { name:'号牌种类', text: '', id: 'HPZY' },
                     { name:'车身颜色', text: '', id: 'CSYS' },
                     { name:'车辆类型', text: '', id: 'CLLX' },
                     { name:'车辆品牌', text: '', id: 'CLPP' },
                     { name:'车辆年款', text: '', id: 'CLNK' },
                    // { name:'行驶状态', text: '', id: 'XSZT' },
                     ];
        
        for (var i = 0; i <12; i++) {
            var url = '../images/traffic/currentb_up_btn01.gif';
            if (i == 12 - 1) {
                url = '../images/traffic/currentb_up_btn02.png';
            }
            
            var vtext = Ext.create('Ext.Component', {
                cls: 'x-carinfo-text',
                x: 150,
                y: 0,
                width: 186,
                height: 25,
                html: vInfo[i].text,
                showInfoID: vInfo[i].id
            });
            this.varraytext.push(vtext);
            this.vinfonitem.push({
                xtype: 'container',
                layout: 'absolute',
                style: {
                    background: '#1B2D53 url(' + url + ') no-repeat 0px 0px;'
                },
                width: 378,
                height: 30,
                border: 0,
                items: [{
                    cls: 'x-carinfo-text-header',
                    xtype: 'component',
                    x: 32,
                    y: 4,
                    width: 80,
                    height: 25,
                    html: vInfo[i].name
                },
                vtext]
            });
        }
        
        this.vinfonitem.push({
            xtype: 'text',
            width: 319,
            height: 10,
            border: 0
        });
        
        this.vinfonitem.push({
            xtype: 'container',
            layout: 'absolute',
            style: {
                background: '#1B2D53 url(../images/traffic/currentb_down_title.png) no-repeat 0px 0px;'
            },
            width: 319,
            height: 29,
            border: 0,
            items: [Ext.create('App.Common.ImageButton', {
                y: 0,
                x: 296,
                height: 23,
                width: 28,
                tooltip: '详细',
                hasImage: [{ name: 'normal', src: '' },
                { name: 'hover', src: ''}],
                scope: this,
                handler: function () {
                }
            })]
        });
        
        vInfo = [{ name: '布控原因', text: '', id: 'BKYY' },
                 { name: '处警措施', text: '', id: 'CJCS' },
                 { name: '布控人', text: '', id: 'BKR' },
                 { name: '联系方式', text: '', id: 'LXFS'}];
        for (var i = 0; i < 4; i++) {
            var cls = 'x-carinfo-text';
            if (i < 2)
                cls = 'x-carinfo-text-alarm';
            var url = '../images/traffic/currentb_up_btn01.gif';
            if (i == 4 - 1) {
                url = '../images/traffic/currentb_up_btn02.png';
            }
            var vtext = Ext.create('Ext.Component', {
                cls: 'x-carinfo-text',
                x: 132,
                y: 0,
                width: 186,
                height: 25,
                html: vInfo[i].text,
                showInfoID: vInfo[i].id
            });
            this.varraytext.push(vtext);
            this.vinfonitem.push({
                xtype: 'container',
                layout: 'absolute',
                style: {
                    background: '#1B2D53 url(' + url + ') no-repeat 0px 0px;'
                },
                width: 319,
                height: 25,
                border: 0,
                items: [{
                    cls: 'x-carinfo-text-header',
                    xtype: 'component',
                    x: 32,
                    y: 4,
                    width: 80,
                    height: 25,
                    html: vInfo[i].name
                }, vtext]
            });
        }
        
        this.vinfonitem.push({
            xtype: 'text',
            width: 319,
            flex: 1,
            border: 0
        });
        

        this.smallimage = Ext.create('App.SSGCXX.CarInfo.SmallPic', {
        });
       
        this.LJSL=Ext.create('Ext.container.Container',{
             width: 300,
             height:20,
             margin : '0 20 10 40',
             layout: 'hbox',
             items: [{
                 xtype: 'component',
                 flex: 1,
                 html:'今日拦截车辆:'

             },
             {
                 xtype: 'component',
                 flex: 1,
                 html:'0'

             }]
        });
        this.BKSL=Ext.create('Ext.container.Container',{
         width: 300,
         height:20,
         margin : '0 20 10 40',
         layout: 'hbox',
         items: [{
             xtype: 'component',
             flex: 1,
             html:'今日布控车辆:'

         },
         {
             xtype: 'component',
             flex: 1,
             html:'0'

         }]
       });
        this.ZPSL=Ext.create('Ext.container.Container',{
            width: 300,
            height:20,
            margin : '0 20 10 40',
            layout: 'hbox',
            items: [{
                xtype: 'component',
                flex: 1,
                html:'今日抓拍车辆:'

            },
            {
                xtype: 'component',
                flex: 1,
                html:'0'

            }]
         });
        this.vinfonitem.push(this.LJSL);
        this.vinfonitem.push(this.BKSL);
        this.vinfonitem.push(this.ZPSL);
        this.items = [this.smallimage,
        {
            xtype: 'container',
            layout: 'vbox',
            style: {
                background: '#1B2D53 url(../images/traffic/trafficinfo.png) no-repeat 0px 0px;'
            },
            width: '100%',
            flex: 1,
            border: 0,
            padding: '9 9 0 9',
            items: this.vinfonitem
        },
      
        ];
        this.getSL();
    	this.callParent(arguments);
    },
    
    getSL:function(){
      Ext.Ajax.request({
          url: '../SSGC/getLJSL',
          method: 'post', //方法  
          scope: this,
          callback: function (options, success, response) {
              if (success) {
                  var v = Ext.JSON.decode(response.responseText);
               
                  this.BKSL.items.items[1].update(v.BKRM);
                  
                  this.LJSL.items.items[1].update(v.LJRM);
                  
                  this.ZPSL.items.items[1].update(v.ZPRM);
              }
              else {
               
              }
          }
      });
  },
  updateTrafficInfo: function (vtrafficinfo) {
    var vme = this;
    for (var i = 0; i < vtrafficinfo.length; i++) {
        var vrec = vtrafficinfo[i];
        for (var j = 0; j < vme.varraytext.length; j++) {
            var v = vrec.get(vme.varraytext[j].showInfoID);
            if (typeof v != 'undefined') {
                vme.varraytext[j].update(v);
            }
            else {
                vme.varraytext[j].update('');
            }
        }
        this.carinfo = vrec;
        vme.smallimage.setSrc(vrec.get('HPTPLJ'));
    }
},   
});