
//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.labelInfoDlg', {
    extend: 'App.Common.EditDlg',
    title: '属性',
    initComponent: function () {
        this.items = [{
            hidden: true,
            allowBlank: true,
            fieldLabel: 'ID',
            name: 'ID'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '名称',
            name: 'NM',
            value: this.NM,
            width: 300,
            labelWidth: 70
        },
        {
            xtype: 'textarea',
            allowBlank: true,
            fieldLabel: '备注',
            name: 'COMMENT',
            value: this.COMMENT,
            width: 300,
            labelWidth: 70
        }];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onSave: function (button) {
        var vme = this;
        //var win = button.up('window');
        if (!this.isValid())
            return;
        var values = vme.getValues();
        vme.fireEvent('saveok', values);
        vme.close();
    }
});


Ext.define('App.SystemSetting.Dlg.labelMarker', {
    extend: 'App.GIS.Marker',
    label: '',
    isMarker: true,
    centerx: 6, //图标中心点偏移
    centery: 21, //图标中心点偏移
    iconSrc: '../images/map/caselabel.png', //点位正常状态图标
    iconHoverSrc: '../images/map/caselabel.png', //点位鼠标放上去的图标,
    ShapeType: 'marker',
    initComponent: function () {
        var me = this;
        this.point = { longitude: this.lng, latitude: this.lat };
        if (this.icontext
        && this.icontext != '') {
            this.text = [{ text: '<div style="background-color: White; border: 1px solid Black;cursor:pointer;padding: 2px 4px 2px 4px;">' + Ext.htmlEncode(this.icontext) + '</div>',
                y: '-44px', x: '10px'
            }];
        }
        var baseMap = me.baseMap;
        this.callParent(arguments);
    },
    destroy: function () {
        this.callParent(arguments);
    },
    onTextClick: function (index, data, textindex, text, target, e) {
        if (textindex == 0) {
            Ext.create('App.SystemSetting.Dlg.labelInfoDlg',
            {
                COMMENT: this.label,
                NM: this.icontext,
                listeners:
                {
                    scope: this,
                    saveok: function (value) {
                        this.label = value.COMMENT;
                        this.icontext = value.NM;
                        this.update();
                    }
                }
            }).show();
        }
    },
    onImgClick: function (index, data, textindex, text, target, e) {
        Ext.create('App.SystemSetting.Dlg.labelInfoDlg',
            {
                COMMENT: this.label,
                NM: this.icontext,
                listeners:
                {
                    scope: this,
                    saveok: function (value) {
                        this.label = value.COMMENT;
                        this.icontext = value.NM;
                        this.update();
                    }
                }
            }).show();
    },
    getValue: function () {
        if (this.point)
            return { ShapeType: this.ShapeType,
                lng: this.point.longitude,
                lat: this.point.latitude,
                centerx: this.centerx,
                centery: this.centery,
                iconSrc: this.iconSrc,
                iconHoverSrc: this.iconHoverSrc,
                label: this.label,
                icontext: this.icontext
            };
        return {};
    },
    update: function () {
        var me = this;
        this.text = [];
        if (this.icontext
        && this.icontext != '') {
            this.text = [{ text: '<div style="background-color: White; border: 1px solid Black;cursor:pointer;padding: 2px 4px 2px 4px;">' + Ext.htmlEncode(this.icontext) + '</div>',
                y: '-44px', x: '10px'
            }];
        }
        var vtext = this.text;
        delete this.text;
        this.text = [];
        var vtemp;
        for (var i = 0; i < vtext.length; i++) {
            vtemp = Ext.apply({ x: '0px',
                y: '0px',
                textCls: ''
            }, vtext[i]);
            if (!Ext.isString(vtemp.x))
                vtemp.x = vtemp.x + 'px';
            if (!Ext.isString(vtemp.y))
                vtemp.y = vtemp.y + 'px';
            var index = this.text.push(vtemp);
            vtemp.textCls += ' x-map-marker-text-' + index;
        }
        me.icony = -me.centery;
        me.iconx = -me.centerx;
        var el = this.el;
        if (el) {
            el.tooltip = this.label;
            var dom = Ext.get(el);
            dom.update(me.markerlayer.getItemHtml(this));
        }
    },
    setValue: function (value) {
        var me = this;
        this.point = { longitude: value.lng, latitude: value.lat };
        this.centerx = value.centerx;
        this.centery = value.centery;
        this.iconSrc = value.iconSrc;
        this.iconHoverSrc = value.iconHoverSrc;
        this.label = value.label;
        this.icontext = value.icontext;
        

        this.update();
    }
});
