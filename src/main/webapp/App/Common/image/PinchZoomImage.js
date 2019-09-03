Ext.define('Smallimage', {
    config: {
        image: null,
        zoom: null
    },
    node: null,
    constructor: function (el) {
        this.initConfig(el);
        var me = this;
        if (me.getImage()) {
            me.node = me.getImage();
            me.node.afterRender = function () {
                Ext.log({ msg: 'Smallimage.afterRender' });
                me.fetchdata();
                me.getZoom().fireEvent('smallloaded');
            }
        }
    },
    findborder: function () {
        var me = this;
        var bordertop = 0;
        bordertop = me.getImage().el.getStyle('border-left-width');
        btop = '';
        var borderleft = 0;
        borderleft = me.getImage().el.getStyle('border-left-width');
        bleft = '';
        if (bordertop) {
            for (i = 0; i < 3; i++) {
                var x = [];
                x = bordertop.substr(i, 1);
                if (isNaN(x) == false) {
                    btop = btop + '' + bordertop.substr(i, 1);
                } else {
                    break;
                }
            }
        }
        if (borderleft) {
            for (i = 0; i < 3; i++) {
                if (!isNaN(borderleft.substr(i, 1))) {
                    bleft = bleft + borderleft.substr(i, 1)
                } else {
                    break;
                }
            }
        }
        me.btop = (btop.length > 0) ? eval(btop) : 0;
        me.bleft = (bleft.length > 0) ? eval(bleft) : 0;
    },
    fetchdata: function () {
        var me = this;
        var image = me.getImage();
        var size = image.getSize();
        var outerSize = image.getOuterSize();
        var offsetArray = image.getXY();
        me.findborder();
        me.w = size.width;
        me.h = size.height;
        me.ow = outerSize.width;
        me.oh = outerSize.height;
        me.pos = { left: offsetArray[0], top: offsetArray[1] };
        me.pos.l = offsetArray[0] + me.bleft;
        me.pos.t = offsetArray[1] + me.btop;
        me.pos.r = me.w + me.pos.l;
        me.pos.b = me.h + me.pos.t;
        me.rightlimit = offsetArray[0] + me.ow;
        me.bottomlimit = offsetArray[1] + me.oh;
    }
});
Ext.define('Loader', {
    config: {
        zoom: null
    },
    el: null,
    node: null,
    constructor: function (el) {
        this.initConfig(el);
        var me = this;
        me.el = me.getZoom();
        me.node = Ext.get(Ext.DomHelper.createDom({ tag: 'div', cls: 'zoomPreload' }));
        me.node.update(me.el.preloadText).setStyle('visibility', 'hidden').appendTo(me.el.getEl());
    },
    show: function () {
        var me = this;
        var smallimage = me.el.smallimage;
        me.node.top = (smallimage.oh - me.node.getHeight()) / 2;
        me.node.left = (smallimage.ow - me.node.getWidth()) / 2;
        me.node.setStyle({
            top: me.node.top + 'px',
            left: me.node.left + 'px',
            position: 'absolute',
            visibility: 'visible'
        });
    },
    hide: function () {
        var me = this;
        me.node.setStyle('visibility', 'hidden');
    }
});
Ext.define('Lens', {
    config: {
        zoom: null
    },
    node: null,
    image: null,
    el: null, //整个缩放元素
    constructor: function (el) {
        this.initConfig(el);
        var me = this;
        var smallimage = me.getZoom().smallimage;
        me.el = me.getZoom();
        me.node = Ext.DomHelper.append(me.el.getEl(), { tag: 'div', cls: 'zoomPup' }, true);
        me.node.hide();
        if (me.el.zoomType == 'reverse') {
            var tImage = Ext.DomHelper.createDom({ tag: 'img', src: smallimage.node.src });
            me.image = Ext.get(tImage);
            me.node.innerHtml = '';
            me.node.appendChild(me.image);
        }
    },
    setdimensions: function () {
        var me = this;
        var settings = me.el;
        var smallimage = me.el.smallimage;
        me.node.w = (parseInt((me.el.zoomWidth) / me.el.scale.x) > me.el.smallimage.w) ? me.el.smallimage.w : (parseInt(me.el.zoomWidth / me.el.scale.x));
        me.node.h = (parseInt((me.el.zoomHeight) / me.el.scale.y) > me.el.smallimage.h) ? me.el.smallimage.h : (parseInt(me.el.zoomHeight / me.el.scale.y));
        me.node.top = (me.el.smallimage.oh - me.node.h - 2) / 2;
        me.node.left = (me.el.smallimage.ow - me.node.w - 2) / 2;
        //centering lens
        me.node.applyStyles({
            top: '0px',
            left: '0px',
            width: me.node.w + 'px',
            height: me.node.h + 'px',
            position: 'absolute',
            display: 'none',
            borderWidth: 1 + 'px'
        });

        if (settings.zoomType == 'reverse') {
            me.image.el.src = smallimage.node.src;
            me.node.applyStyles({
                'opacity': 1
            });
            me.image.applyStyles({
                position: 'absolute',
                display: 'block',
                left: -(me.node.left + 1 - smallimage.bleft) + 'px',
                top: -(me.node.top + 1 - smallimage.btop) + 'px'
            });
        }
    },
    setcenter: function () {
        var me = this;
        var settings = me.el;
        var smallimage = me.el.smallimage;
        var largeimage = me.el.largeimage;
        //calculating center position
        me.node.top = (smallimage.oh - me.node.h - 2) / 2;
        me.node.left = (smallimage.ow - me.node.w - 2) / 2;
        //centering lens
        me.node.applyStyles({
            top: me.node.top + 'px',
            left: me.node.left + 'px'
        });
        if (settings.zoomType == 'reverse') {
            me.image.applyStyles({
                position: 'absolute',
                display: 'block',
                left: -(me.node.left + 1 - smallimage.bleft) + 'px',
                top: -(me.node.top + 1 - smallimage.btop) + 'px'
            });

        }
        //centering large image
        largeimage.setposition();
    },
    setposition: function (e) {
        var me = this;
        var lens = me.el.lens;
        var smallimage = me.el.smallimage;
        var settings = me.el;
        var largeimage = me.el.largeimage;
        me.el.mousepos.x = e.xy[0];
        me.el.mousepos.y = e.xy[1];
        var lensleft = 0;
        var lenstop = 0;

        function overleft(vlens) {
            return me.el.mousepos.x - (vlens.w) / 2 < smallimage.pos.l;
        }

        function overright(vlens) {
            return me.el.mousepos.x + (vlens.w) / 2 > smallimage.pos.r;

        }

        function overtop(vlens) {
            return me.el.mousepos.y - (vlens.h) / 2 < smallimage.pos.t;
        }

        function overbottom(vlens) {
            return me.el.mousepos.y + (vlens.h) / 2 > smallimage.pos.b;
        }

        lensleft = me.el.mousepos.x + smallimage.bleft - smallimage.pos.l - (me.node.w + 2) / 2;
        lenstop = me.el.mousepos.y + smallimage.btop - smallimage.pos.t - (me.node.h + 2) / 2;
        if (overleft(me.node)) {
            lensleft = smallimage.bleft - 1;
        } else if (overright(me.node)) {
            lensleft = smallimage.w + smallimage.bleft - me.node.w - 1;
        }
        if (overtop(me.node)) {
            lenstop = smallimage.btop - 1;
        } else if (overbottom(me.node)) {
            lenstop = smallimage.h + smallimage.btop - me.node.h - 1;
        }

        me.node.left = lensleft;
        me.node.top = lenstop;
        me.node.applyStyles({
            'left': lensleft + 'px',
            'top': lenstop + 'px'
        });
        if (settings.zoomType == 'reverse') {
            if (Ext.isVersion > 7) {
                me.node.innerHtml = '';
                Ext.DomHelper.append(me.node.el, me.image);
            }

            me.image.applyStyles({
                position: 'absolute',
                display: 'block',
                left: -(me.node.left + 1 - smallimage.bleft) + 'px',
                top: -(me.node.top + 1 - smallimage.btop) + 'px'
            });
        }

        largeimage.setposition();
    },
    hide: function () {
        var me = this;
        var settings = me.el;
        settings.image.getEl().applyStyles({
            'opacity': 1
        });
        me.node.hide();
    },
    show: function () {
        var me = this;
        var settings = me.el;
        if (settings.zoomType != 'innerzoom' && (settings.showLens || settings.zoomType == 'drag')) {
            me.node.show();
        }

        if (settings.zoomType == 'reverse') {
            settings.image.getEl().applyStyles({
                'opacity': settings.imageOpacity
            });
        }
    },
    getoffset: function () {
        var me = this;
        var o = {};
        o.left = me.node.left;
        o.top = me.node.top;
        return o;
    }
});
Ext.define('Stage', {
    config: {
        zoom: null
    },
    node: null,
    ieframe: null,
    el: null, //整个缩放元素
    constructor: function (el) {
        this.initConfig(el);
        var me = this;
        me.el = me.getZoom();
        var settings = me.el;
        var smallimage = me.el.smallimage;
        me.node = Ext.DomHelper.createDom({ tag: 'div', cls: 'zoomWindow', cn: [{ tag: 'div', cls: 'zoomWrapper', cn: [{ tag: 'div', cls: 'zoomWrapperTitle' }, { tag: 'div', cls: 'zoomWrapperImage'}]}] });
        me.node = Ext.get(me.node);
        me.ieframe = Ext.DomHelper.createDom({ tag: 'iframe', cls: 'zoomIframe', src: 'javascript:\'\';"', marginwidth: '0', marginheight: '0', scrolling: 'no', align: 'bottom', frameborder: '0' });
        me.ieframe = Ext.get(me.ieframe);
        me.el.getEl().appendChild(me.node);
        me.node.applyStyles({
            position: 'absolute',
            display: 'none',
            zIndex: 5001
        });
        if (settings.zoomType == 'innerzoom') {
            me.node.applyStyles({
                cursor: 'default'
            });
            var thickness = (smallimage.bleft == 0) ? 1 : smallimage.bleft;
            me.node.select('.zoomWrapper').applyStyles({
                borderWidth: thickness + 'px'
            });
        }
        me.node.select('.zoomWrapper').applyStyles({
            width: Math.round(settings.zoomWidth) + 'px',
            borderWidth: thickness + 'px'
        });
        me.node.select('.zoomWrapperImage').applyStyles({
            width: '100%',
            height: Math.round(settings.zoomHeight) + 'px'
        });
        me.node.select('.zoomWrapperTitle').applyStyles({
            width: '100%',
            position: 'absolute'
        });
        me.node.select('.zoomWrapperTitle').hide();
        if (settings.showTitle && settings.zoomtitle.length > 0) {
            me.node.select('.zoomWrapperTitle').update(settings.zoomtitle).show();
        }
        me.setposition();
    },
    setposition: function () {
        var me = this;
        var settings = me.el;
        var smallimage = me.el.smallimage;
        me.node.leftpos = 0;
        me.node.toppos = 0;
        if (settings.zoomType != 'innerzoom') {
            //positioning
            switch (settings.position) {
                case "left":
                    me.node.leftpos = (smallimage.pos.l - smallimage.bleft - Math.abs(settings.xOffset) - settings.zoomWidth > 0) ? (0 - settings.zoomWidth - Math.abs(settings.xOffset)) : (smallimage.ow + Math.abs(settings.xOffset));
                    me.node.toppos = Math.abs(settings.yOffset);
                    break;
                case "top":
                    me.node.leftpos = Math.abs(settings.xOffset);
                    me.node.toppos = (smallimage.pos.t - smallimage.btop - Math.abs(settings.yOffset) - settings.zoomHeight > 0) ? (0 - settings.zoomHeight - Math.abs(settings.yOffset)) : (smallimage.oh + Math.abs(settings.yOffset));
                    break;
                case "bottom":
                    me.node.leftpos = Math.abs(settings.xOffset);
                    me.node.toppos = (smallimage.pos.t - smallimage.btop + smallimage.oh + Math.abs(settings.yOffset) + settings.zoomHeight < screen.height) ? (smallimage.oh + Math.abs(settings.yOffset)) : (0 - settings.zoomHeight - Math.abs(settings.yOffset));
                    break;
                default:
                    me.node.leftpos = (smallimage.rightlimit + Math.abs(settings.xOffset) + settings.zoomWidth < screen.width) ? (smallimage.ow + Math.abs(settings.xOffset)) : (0 - settings.zoomWidth - Math.abs(settings.xOffset));
                    me.node.toppos = Math.abs(settings.yOffset);
                    break;
            }
        }
        me.node.applyStyles({
            'left': me.node.leftpos + 'px',
            'top': me.node.toppos + 'px'
        });
    },
    hide: function () {
        var me = this;
        var settings = me.el;
        switch (settings.hideEffect) {
            case 'fadeout':
                me.node.hide(true);
                break;
            default:
                me.node.hide();
                break;
        }
        me.ieframe.hide();
    },
    show: function () {
        var me = this;
        var settings = me.el;
        switch (settings.showEffect) {
            case 'fadeout':
                me.node.show(true);
                break;
            default:
                me.node.show();
                break;
        }
        if (Ext.isIE6 && settings.zoomType != 'innerzoom') {
            me.ieframe.width = me.node.width();
            me.ieframe.height = me.node.height();
            me.ieframe.left = me.node.leftpos;
            me.ieframe.top = me.node.toppos;
            me.ieframe.applyStyles({
                display: 'block',
                position: "absolute",
                left: me.ieframe.left + 'px',
                top: me.ieframe.top + 'px',
                zIndex: 99,
                width: me.ieframe.width + 'px',
                height: me.ieframe.height + 'px'
            });
            me.el.select('.zoomPad').appendChild(me.ieframe);
            me.ieframe.show();
        };
    },
    setZoomTitle: function (zoomtitle) {
        var me = this;
        me.node.select('.zoomWrapperTitle').update(zoomtitle);
    }
});
Ext.define('Largeimage', {
    config: {
        zoom: null
    },
    el: null,
    node: null,
    loader: null,
    url: '',
    constructor: function (el) {
        this.initConfig(el);
        var me = this;
        me.el = me.getZoom();
        me.loader = me.getZoom().loader;
        me.node = Ext.create('Ext.Img', {
            src: '',
            listeners: {
                load: {
                    element: 'el',
                    fn: function () {
                        var me = this;
                        Ext.log({ msg: 'Largeimage.afterrender' });
                        me.node.getEl().applyStyles({
                            position: 'absolute',
                            border: '0px',
                            left: '-5000px',
                            top: '0px'
                        }).appendTo(Ext.getBody());
                        me.fetchdata();
                        me.loader.hide();
                        me.el.largeimageloading = false;
                        me.el.largeimageloaded = true;
                        if (me.el.zoomType == 'drag' || me.el.alwaysOn) {
                            me.el.lens.show();
                            me.el.stage.show();
                            me.el.lens.setcenter();
                        }
                    },
                    scope: me
                }
            }
        });
    },
    loadimage: function (url) {
        var me = this;
        me.loader.show();
        me.url = url;
        me.node.setSrc(url);
        me.node.doAutoRender();
    },
    fetchdata: function () {
        var me = this;
        var image = me.node.getEl();
        var scale = {};
        me.w = image.getWidth();
        me.h = image.getHeight();
        me.pos = { left: image.getX(), top: image.getY() };
        me.pos.l = me.pos.left;
        me.pos.t = me.pos.top;
        me.pos.r = me.w + me.pos.l;
        me.pos.b = me.h + me.pos.t;
        scale.x = (me.w / me.el.smallimage.w);
        scale.y = (me.h / me.el.smallimage.h);
        me.el.scale = scale;
        document.body.removeChild(me.node.el.dom);
        var zoomWrap = me.el.getEl().select('.zoomWrapperImage');
        zoomWrap.setHTML('').appendChild(me.node.getEl());
        me.el.lens.setdimensions();
    },
    setposition: function () {
        var me = this;
        var el = me.el;
        var lens = me.el.lens;
        var smallimage = me.el.smallimage;
        var left = -el.scale.x * (lens.getoffset().left - smallimage.bleft + 1);
        var top = -el.scale.y * (lens.getoffset().top - smallimage.btop + 1);
        me.node.getEl().applyStyles({
            'left': left + 'px',
            'top': top + 'px'
        });
    }
});
Ext.define('App.Common.image.PinchZoomImage', {
    extend: 'Ext.container.Container',
    xtype: 'pinchzoomimage',
    alias: 'widget.pinchzoomimage',
    layout: 'fit',
    src: '',
    title: '',
    height: 0,
    width: 0,
    scrollable: true,
    cls: 'zoomPad',
    zoomType: 'standard',
    zoomWidth: 300,
    zoomHeight: 300,
    xOffset: 10,
    yOffset: 0,
    position: "right",
    preloadImages: false,
    preloadText: 'Loading zoom',
    showTitle: true,
    showLens: true,
    imageOpacity: 0.4,
    alwaysOn: false,
    showEffect: 'show',
    hideEffect: 'hide',
    fadeinSpeed: 'fast',
    fadeoutSpeed: 'fast',
    zoomtitle: '',
    initComponent: function () {
        var me = this;
        me.zoomtitle = Ext.String.trim(me.title).length > 0 ? me.title : '';
        me.addEvents('smallloaded');
        if (!me.listeners) {
            me.listeners = {};
        }
        me.listeners = Ext.apply(me.listeners, {
            mousedown: {
                element: 'el',
                fn: function (e) {
                    me.mouseDown = true;
                },
                scope: me
            },
            mouseup: {
                element: 'el',
                fn: function (e) {
                    me.mouseDown = false;
                },
                scope: me
            },
            mouseenter: {
                element: 'el',
                fn: me.onZoomIn,
                scope: me
            },
            mouseover: {
                element: 'el',
                fn: me.onZoomIn,
                scope: me
            },
            mouseleave: {
                element: 'el',
                fn: function () {
                    me.deactivate();
                },
                scope: me
            },
            mousemove: {
                element: 'el',
                fn: function (e) {
                    if (e.getX() > me.smallimage.pos.r || e.getX() < me.smallimage.pos.l || e.getY() < me.smallimage.pos.t || e.getY() > me.smallimage.pos.b) {
                        me.deactivate();
                        return false;
                    }
                    me.zoom_active = true;
                    if (me.largeimageloaded && !me.getEl().select('.zoomWindow').isDisplayed()) {
                        me.activate(e);
                    }
                    if (me.largeimageloaded && (me.zoomType != 'drag' || (me.zoomType == 'drag' && me.mouseDown))) {
                        me.lens.setposition(e);
                    }
                },
                scope: me
            },
            smallloaded: function () {
                me.initWrap();
            }
        });
        me.callParent(arguments);
    },
    afterRender: function () {
        Ext.log({ msg: 'main.afterRender' });
        var me = this;
        me.callParent();
        //////////////////////////////////////////////////////////////////////////
        me.initImage(me.src);
        me.smallimage = new Smallimage({ 'zoom': me, 'image': me.image });
        if (me.zoomType == 'innerzoom') {
            me.zoomWidth = me.smallimage.w;
            me.zoomHeight = me.smallimage.h;
        }
        if (me.preloadImages || me.zoomType == 'drag' || me.alwaysOn) {
            me.load();
        }
        me.getEl().applyStyles({
            'outline-style': 'none',
            'text-decoration': 'none'
        });

        me.initZoom();
    },
    initImage: function () {
        var me = this;
        var zoomtypes = ['standard', 'drag', 'innerzoom', 'reverse'];
        if (!Ext.Array.contains(zoomtypes, me.zoomType)) {
            me.zoomType = 'standard';
        }
        if (Ext.isArray(me.src)) {
        }
        me.image = Ext.create('Ext.Img', {
            src: me.src,
            title: me.title
        });
        me.add(me.image);
        me.zoom_active = false;
        me.zoom_disabled = false; //to disable single zoom instance
        me.largeimageloading = false; //tell us if large image is loading
        me.largeimageloaded = false; //tell us if large image is loaded
        me.scale = {};
        me.timer = null;
        me.mousepos = {};
        me.mouseDown = false;
    },
    initWrap: function () {
        var me = this;
        me.lens = new Lens({ 'zoom': me });
        me.stage = new Stage({ 'zoom': me });
        me.loader = new Loader({ 'zoom': me });
        me.largeimage = new Largeimage({ 'zoom': me });
        me.load();
    },
    initZoom: function () {
        var me = this;
        var el = me.getEl();
        if (me.zoomType == 'drag') {
            document.body.ondragstart = function () {
                return false;
            };
            el.select('.zoomPad').applyStyles({
                cursor: 'default'
            });
            el.select('.zoomPup').applyStyles({
                cursor: 'move'
            });
        }
        if (me.zoomType == 'innerzoom') {
            el.select('.zoomWrapper').applyStyles({
                cursor: 'crosshair'
            });
        }

        var thumb_preload = new Array();
        var i = 0;
        //binding click event on thumbnails
        var thumblist = new Array();
        thumblist = Ext.select('a').filter(function (vel, index) {
            var rel = vel.getAttribute('rel');
            if (rel) {
                var regex = new RegExp("gallery[\\s]*:[\\s]*'" + Ext.String.trim(rel) + "'", "i");
                if (regex.test(rel)) {
                    return vel;
                }
            }
        });
        Ext.Array.each(thumblist, function (item, index, thumblist) {
            if (me.preloadImages) {
                var thumb_options = Ext.apply({}, eval("(" + Ext.String.trim(item.getAttribute('rel')) + ")"));
                thumb_preload[i] = new Image();
                thumb_preload[i].src = thumb_options.largeimage;
                i++;
            }
            item.on('click', function (e) {
                var aObjt = Ext.get(this);
                if (aObjt.hasCls('zoomThumbActive')) {
                    return false;
                }
                Ext.Array.each(thumblist, function (tItem) {
                    Ext.get(tItem).removeCls('zoomThumbActive');
                });
                e.preventDefault();
                me.swapimage(aObjt);
                return false;
            });
        });
    },
    load: function () {
        Ext.log({ msg: 'main.load' });
        var el = this;
        if (el.largeimageloaded == false && el.largeimageloading == false) {
            var url = el.src;
            el.largeimageloading = true;
            el.largeimage.loadimage(url);
        }
    },
    activate: function (e) {
        var me = this;
        clearTimeout(me.timer);
        //show lens and zoomWindow
        me.lens.show();
        me.stage.show();
    },
    deactivate: function (e) {
        var me = this;
        switch (me.zoomType) {
            case 'drag':
                //nothing or lens.setcenter();
                break;
            default:
                me.image.getEl().set({ 'title': me.imagetitle });
                me.getEl().set({ 'title': me.title });
                if (me.alwaysOn) {
                    me.lens.setcenter();
                } else {
                    me.stage.hide();
                    me.lens.hide();
                }
                break;
        }
        me.zoom_active = false;
    },
    swapimage: function (link) {
        var el = this;
        el.largeimageloading = false;
        el.largeimageloaded = false;
        var options = new Object();
        options = Ext.apply({}, eval("(" + Ext.String.trim(link.getAttribute('rel')) + ")"));
        var smallimage = options.smallimage;
        var largeimage = options.largeimage;
        if (options.smallimage && options.largeimage && largeimage !== el.src) {
            link.addCls('zoomThumbActive');
            el.src = largeimage;
            el.image.setSrc(smallimage);
            el.lens.hide();
            el.stage.hide();
            el.load();
        } else {
            //alert('ERROR :: Missing parameter for largeimage or smallimage.');
            //throw 'ERROR :: Missing parameter for largeimage or smallimage.';
        }
        return false;
    },
    swapBigImage: function (options) {
        var el = this;
        el.largeimageloading = false;
        el.largeimageloaded = false;
        if (options.largeimage && options.zoomtitle) {
            var smallimage = options.largeimage;
            var largeimage = options.largeimage;
            if (options.smallimage) {
                smallimage = options.smallimage;
            }
            el.getEl().set('href', largeimage);
            el.image.getEl().set('src', smallimage);
            el.lens.hide();
            el.stage.hide();
            el.stage.setZoomTitle(options.zoomtitle);
            el.load();
        } else {
            //alert('ERROR :: jzoom.swapbigimage 缺少变量.');
            // throw 'ERROR :: jzoom.swapbigimage 缺少变量.';
        }
        return false;
    },
    onZoomIn: function () {
        var me = this;
        var img = me.image.getEl();
        img.set({ 'title': '' });
        me.getEl().set({ 'title': '' });
        me.zoom_active = true;
        //if loaded then activate else load large image
        me.smallimage.fetchdata();
        if (me.largeimageloaded) {
            me.activate(event);
        } else {
            me.load();
        }
    },
    setSrc: function (src) {
        var me = this;
        me.src = src;
        me.image.setSrc(src);
        me.lens.hide();
        me.stage.hide();
        me.load();
    }
});