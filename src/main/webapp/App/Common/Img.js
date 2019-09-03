Ext.define('App.Common.Img.zoom', {
    extend: 'Ext.panel.Panel',
    src: '',
    layout: 'absolute',
    floating: true,
    border: 0,
    initComponent: function () {
        var vme = this;
        this.addEvents('imgload');
        this.vimage = Ext.create('Ext.Img', {
            src: this.src,
            flex: 1
        });
        this.items = [this.vimage];
        this.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var el = me.vimage.imgEl;
        var btnListeners = {
            scope: this,
            load: this.onImgLoad
        };
        me.mon(el, btnListeners);
    },
    onImgLoad: function (e) {
        if (e.target) {
            this.loadimg = e.target.complete;
            this.fireEvent('imgload', e.target.complete);
        }
    },
    showPos: function (x, y) {
        var vme = this;
        x = -(x - (this.getWidth() / 2));
        y = -(y - (this.getHeight() / 2));

        if (x < -(vme.getImageWidth() - (this.getWidth()))) {
            x = -(vme.getImageWidth() - (this.getWidth()));
        }
        else if (x > 0) {
            x = 0;
        }
        if (y < -(vme.getImageHeight() - (this.getHeight()))) {
            y = -(vme.getImageHeight() - (this.getHeight()));
        }
        else if (y > 0) {
            y = 0;
        }
        vme.vimage.setXY([x + this.getX(), y + this.getY()]);
    },
    getImageWidth: function () {
        var vme = this;
        return vme.vimage.getWidth();
    },
    getImageHeight: function () {
        var vme = this;
        return vme.vimage.getHeight();
    },
    isImgLoad: function () {
        return this.loadimg;
    },
    setSrc: function (url) {
        var vme = this;
        this.loadimg = false;
        vme.src = url;
        vme.vimage.setSrc(url);
    }
});

Ext.define('App.Common.Img.Mask', {
    extend: 'Ext.Component',
    initComponent: function () {
        this.border = 1;
        if (Ext.isIE8m) {
            this.style = {
                borderColor: '#ffc',
                borderStyle: 'solid',
                //background: '#ffc',
                opacity: '0.4'
            };

        }
        else {
            this.style = {
                //borderColor: 'red',
                //borderStyle: 'solid',
                background: '#ffc',
                opacity: '0.4'
            };
        }
        this.callParent(arguments);
    }
});

Ext.define('App.Common.Img', {
    extend: 'Ext.panel.Panel',
    src: '',
    layout: 'absolute',
    showZoom: false,
    xOffset: 4,
    yOffset: 0,
    position: "right",
    zoomWidth: 300,
    zoomHeight: 300,
    hottrack: false,
    initComponent: function () {
        var vme = this;
        vme.vimage = Ext.create('Ext.Img', {
            src: this.src,
            width: '100%',
            height: '100%'
        });

        if (vme.showZoom) {
            vme.vmaskimage = Ext.create('App.Common.Img.Mask', {
                width: 0,
                height: 0
            });
            vme.vzoomimage = Ext.create('App.Common.Img.zoom', {
                src: vme.src,
                x: 0,
                y: 0
            });
            vme.items = [vme.vimage, vme.vmaskimage];
        }
        else {
            vme.items = [this.vimage];
        }
		this.imageloaded = false;
        this.listeners = {
            scope: this,
            click: {
                element: 'body',
                fn: function () {
                    Ext.callback(this.onImageItemClick, this.scope || this, [this]);
                    //this.onImageItemClick(this);
                }
            },
            dblclick: {
                element: 'body',
                fn: function () {
                    console.log('dblclick body');
                }
            },
            mouseover: {
                element: 'body',
                fn: function () {
                    if (this.hottrack) {
                        if (!vme.vSel)
                            vme.setBodyStyle('borderColor', 'red');
                    }
                }
            },
            mouseleave: {
                element: 'body',
                fn: function () {
                    if (this.vzoomimage) {
                        this.vzoomimage.hide();
                    }
                    if (this.vmaskimage)
                        this.vmaskimage.setVisible(false);
                    if (this.hottrack)
                        if (!vme.vSel)
                            vme.setBodyStyle('borderColor', null);
                }
            },
            mousemove: {
                element: 'body',
                fn: this.onMouseMove
            }
        };

        this.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.setBodyStyle('cursor', 'pointer');
        if(this.vimage
        &&this.vimage.imgEl)
        {
        	var dom = Ext.getDom(this.vimage.imgEl);
		 	if(dom)
		 	{
		 		dom.onload = function(e)
		 		{
		 			 if (e.target
	                      && e.target.complete) {
	                      	me.imageloaded = true;
	                      	me.onImageLoad();
	                      }
		 		}
		 	}
        }
        
        if (me.vmaskimage) {
            me.vmaskimage.setVisible(false);
        }
    },
    onImageLoad:function()
    {
    	 if (this.vzoomimage)
            this.vzoomimage.setSrc(this.src);
    },
    setSrc: function (url) {
        this.src = url;
        this.imageloaded = false;
        if (this.vmaskimage)
            this.vmaskimage.setVisible(false);
        this.vimage.setSrc(url);
    },
    setSel: function (sel) {
        if (this.vSel != sel) {
            this.vSel = sel;
            if (this.vSel) {
                this.setBodyStyle('borderColor', 'red');
            }
            else {
                this.setBodyStyle('borderColor', null);
            }
        }
    },
    onImageItemClick: function (imageitem) {
        //console.log('onMouseOutCur body');
    },
    onMouseMove: function (e) {
        var me = this;
        if (me.showZoom) {
			if(!me.imageloaded)
				return ;
            if (!me.vmaskimage.isVisible()) {
                me.vmaskimage.setVisible(true);
            }
             if (!me.vzoomimage.isVisible()) {
                me.vzoomimage.show();
            }
            if (me.vzoomimage) {
                //if (!me.vzoomimage.isImgLoad())
                //    return; 
               
                var imgX = me.vimage.getX();
                var imgY = me.vimage.getY();
                var imgWidth = me.vimage.getWidth();
                if ('right' == me.position) {
                    me.vzoomimage.setXY([imgX + imgWidth + me.xOffset, imgY + me.yOffset]);
                } else if ('left' == me.position) {
                    me.vzoomimage.setXY([imgX - me.zoomWidth - me.xOffset, imgY + me.yOffset]);
                }

                me.vzoomimage.setWidth(me.zoomWidth);
                me.vzoomimage.setHeight(me.zoomHeight);
                var vx = (e.getX() - me.vimage.getX()) * me.vzoomimage.getImageWidth() / me.vimage.getWidth();
                var vy = (e.getY() - me.vimage.getY()) * me.vzoomimage.getImageHeight() / me.vimage.getHeight();
                me.vzoomimage.showPos(vx, vy);
            }
            if (this.vzoomimage.getImageWidth() > 0 && this.vzoomimage.getImageHeight() > 0) {
                var vmaskwidth = this.vimage.getWidth() * this.vzoomimage.getWidth() / this.vzoomimage.getImageWidth();
                var vmaskheight = this.vimage.getHeight() * this.vzoomimage.getHeight() / this.vzoomimage.getImageHeight();
                var vx = e.getX() - vmaskwidth / 2;
                if (vx < this.vimage.getX())
                    vx = this.vimage.getX();
                if (vx + vmaskwidth > this.vimage.getWidth() + this.vimage.getX())
                    vx = this.vimage.getWidth() - vmaskwidth + this.vimage.getX();
                var vy = e.getY() - vmaskheight / 2;
                if (vy < this.vimage.getY())
                    vy = this.vimage.getY();
                if (vy + vmaskheight > this.vimage.getHeight() + this.vimage.getY())
                    vy = this.vimage.getHeight() - vmaskheight + this.vimage.getY();
                this.vmaskimage.setXY([vx, vy]);
                this.vmaskimage.setSize(vmaskwidth, vmaskheight);
            }
        }
    },

    // private, inherit docs
    beforeDestroy: function () {
        if (this.vzoomimage) {
            this.vzoomimage.close();
            this.vzoomimage.destroy();
            this.vzoomimage = null;
        }
        this.callParent(arguments);
    }
});


