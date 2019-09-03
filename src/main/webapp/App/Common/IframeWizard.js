//定义编辑对话框
Ext.define('App.Common.IframeWizard', {
    extend: 'App.Common.IframeBaseDialog',
    layout: 'fit',
    wizardItems: [],
    initComponent: function () {
        var vme = this;
        this.addEvents(
            'finished'
        );
        for (var i = 0; i < this.wizardItems.length; i++) {
            if (Ext.isString(this.wizardItems[i])) {
                this.wizardItems[i] = Ext.create(this.wizardItems[i], { wizard: this });
            }
            else
                this.wizardItems[i].wizard = this;
        }

        this.wizardPanel = Ext.create('Ext.panel.Panel', {
            layout: 'card',
            //width: 400,
            //height: 300,
            border: 0,
            items: this.wizardItems
        });

        this.btnItems = new Array();
        this.btnItems.push(Ext.create('Ext.button.Button', {
            text: '上一步',
            action: 'prev',
            scope: this,
            handler: this.onPrev,
            disabled: true
        }));

        this.btnItems.push(Ext.create('Ext.button.Button', {
            text: '下一步',
            action: 'next',
            scope: this,
            handler: this.onNext
        }));

        this.btnItems.push(Ext.create('Ext.button.Button', {
            text: '完成',
            action: 'finished',
            scope: this,
            handler: this.doFinished
        }));

        this.btnItems.push(Ext.create('Ext.button.Button', {
            text: '取消',
            action: 'cancle',
            scope: this,
            handler: this.close
        }));

        this.items = [this.wizardPanel];

        this.buttons = this.btnItems;

        this.setWizardItemActive = function (vitemID) {
            vme.onSetWizardItemActive.call(vme, vitemID);
        };

        this.setWizardBtnDisabled = function (vbtnID, disable) {
            vme.onSetWizardBtnDisabled.call(vme, vbtnID, disable);
        };

        this.setWizardBtnHide = function (vbtnID, hide) {
            vme.onSetWizardBtnHide.call(vme, vbtnID, hide);
        };
        this.getItemCount = function () {
            return vme.wizardPanel.items.length;
        };

        this.getItemValues = function (vIndex) {
            return vme.wizardPanel.items.get(vIndex).getValues();
        };

        this.getItemRecord = function (vIndex) {
            return vme.wizardPanel.items.get(vIndex).getRecord();
        };

        this.getValues = function () {
            var v = {};
            for (var i = 0; i < this.wizardPanel.items.length; i++) {
                var vItem = this.wizardPanel.items.get(i);
                if (vItem.hasShow) {
                    var vValues = vme.wizardPanel.items.get(i).getValues()
                    if (typeof vValues != 'undefined') {
                        for (var item in vValues) {
                            if (typeof (vValues[item]) != 'function')
                                v[item] = vValues[item];
                        }
                    }
                }
            }
            return v;
        };
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        var v = this.wizardPanel.getLayout();
        var vActive = v.getActiveItem();
        if (vActive) {
            if (!vActive.hasShow) {
                vActive.hasShow = true;
                vActive.onWizardInit.call(vActive);
            }
            vActive.onWizardActive.call(vActive);
            this.setTitle(vActive.title);
        }

    },
    doFinished: function () {
        for (var i = 0; i < this.wizardPanel.items.length; i++) {
            var vItem = this.wizardPanel.items.get(i);
            if (vItem.hasShow) {
                if (!vItem.isValid()) {
                    return;
                }
            }
        }
        this.fireEvent('finished', this);
    },
    onPrev: function () {
        var v = this.wizardPanel.getLayout();
        var vActive = v.getActiveItem();
        if (vActive) {
            vActive.onPrev.call(vActive);
        }
    },
    onNext: function () {
        var v = this.wizardPanel.getLayout();
        var vActive = v.getActiveItem();
        if (vActive) {
            vActive.onNext.call(vActive);
        }
        /*
        var vprev = v.getNext();
        if (vprev) {
        this.btnPrev.setDisabled(false);
        v.setActiveItem(vprev);
        }
        else {
        this.btnNext.setDisabled(true);
        }
        */
    },
    onSetWizardItemActive: function (vitemID) {
        var v = this.wizardPanel.getLayout();
        var vActive = v.getActiveItem();
        if (vActive.wizardId == vitemID)
            return;
        for (var i = 0; i < this.wizardPanel.items.length; i++) {
            vActive = this.wizardPanel.items.get(i);
            if (vActive.wizardId == vitemID) {
                v.setActiveItem(i);
                if (!vActive.hasShow) {
                    vActive.hasShow = true;
                    vActive.onWizardInit.call(vActive);
                }
                vActive.onWizardActive.call(vActive);
                this.setTitle(vActive.title);
                break;
            }
        }
    },
    onSetWizardBtnDisabled: function (vbtnID, disable) {
        for (var i = 0; i < this.btnItems.length; i++) {
            var vBtn = this.btnItems[i];
            if (vBtn.action == vbtnID) {
                vBtn.setDisabled(disable);
                break;
            }
        }
    },
    onSetWizardBtnHide: function (vbtnID, hide) {
        for (var i = 0; i < this.btnItems.length; i++) {
            var vBtn = this.btnItems[i];
            if (vBtn.action == vbtnID) {
                vBtn.setVisible(!hide);
                break;
            }
        }
    }
});
