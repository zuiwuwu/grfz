Ext.define('App.Common.ComboTree', {
    extend: "Ext.form.field.Picker",
    requires: ['App.Common.MultTree'],      //自定义三态树
    alias: 'widget.combotree',
    rootText: 'root',
    rootId: '0',
    rootVisible: false,                     //是否显示根节点
    nodeParam: 'id',
    treeUrl: this.treeUrl,                  //这里是点击树前加号须返回的JSON格式节点数据   
    multiSelect: false,
    multiSelectText: '当前已选择 {0} 项',    //不显示选择节点字符时显示的字符
    panelWidth: 100,
    fieldName: 'combotree',
    useId: true,                            //是否使用id域，如果不选择，则值直接使用Picker的value值  
    selectedIds: '',
    values: null,
    texts: '',
    leafOnly: true,                         //限定是否只能选择叶子节点  
    hiddenField: null,
    showText: false,                        //多选时是否显示选择节点字符    
    searchText: '',                         //查询字符串
    displayText: '',                        //默认显示的字符串
    showSearchButton: false,                 //是否显示查询按钮
    idSpliter: ',',                         //多选ids分隔符
    searchProperty: 'name',                 //查询返回的文件名
    initComponent: function () {
        var self = this;
        var rootNode = {
            expanded: true,
            text: self.rootText,
            id: self.rootId,
            leaf: false
        };
        if (self.multiSelect) {
            rootNode.checked = 'none';
        }
        if (self.useId) {
            //由于Picker本身的value对应的是显示的文本，所以这里我们新建了一个隐藏域，
            //用来保存诸如id等值，而不是直接的文本值，在表单提交的时候，就可以直接使用这个值了 
            self.hiddenField = Ext.create('Ext.form.field.Hidden', {
                //id: self.fieldName + "Id",//多余导致同时出现两个下拉树时出现重复的ID
                name: self.fieldName + "Id"
            });
        }
        if (self.showSearchButton) {
            self.trigger2Cls = 'x-form-search-trigger';
        }
        Ext.apply(self, {
            pickerAlign: "tl",
            name: self.fieldName
        });
        var aurl = self.treeUrl;
        if (self.multiSelect) {
            //这里增加了多选的功能，在后台返回的JSON数据中，应加上checked:true之类的属性    
            if (aurl.indexOf("?") == -1) {
                aurl += "?multiSelect=true&selectedIds=" + self.selectedIds;
            }
            else {
                aurl += "&multiSelect=true&selectedIds=" + self.selectedIds;
            }
        }
        if (self.leafOnly) {
            if (aurl.indexOf("?") == -1) {
                aurl += "?leafOnly=true";
            } else {
                aurl += "&leafOnly=true";
            }
        }
        self.store = Ext.create('Ext.data.TreeStore', {
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: aurl,
                actionMethods: 'post',
                reader: {
                    type: 'json'
                }
            },
            nodeParam: self.nodeParam,
            root: rootNode,
            autoLoad: true
        });

        self.store.on('datachanged', function (store, eOpts) {

        });
        self.callParent();
        if (self.useId) {
            self.on('afterrender', function () {
                self.ownerCt.add(self.hiddenField);
            }, self);
        }
        if (self.editable) {
            self.enableKeyEvents = true;
            self.on('keydown', function (view, e, eOpts) {
                var showText = self.getValue();
                if (e.getKey() == e.BACKSPACE && self.checkText(showText)) {
                    self.setValue('');
                }
            }, self);
        }
    },
    checkText: function (showText) {
        var self = this;
        var multiSelectTextReg = Ext.String.format(self.multiSelectText, '\\d+');
        var multiReg = new RegExp(multiSelectTextReg);
        return multiReg.test(showText);
    },
    createPicker: function () {
        var self = this;
        var clickNode = null;
        self.picker = Ext.create('App.Common.MultTree', {
            width: this.panelWidth,
            height: 300,
            resizable: { handles: 'w e' },
            autoScroll: true,
            floating: true,
            focusOnToFront: false,
            shadow: true,
            ownerCt: this.ownerCt,
            store: self.store,
            rootVisible: self.rootVisible
        });
        self.picker.on({
            beforeShow: function () {
                //                 if (self.value) {
                //                     var vids = self.value.split(',');
                //                     self.value = null;
                //                     var v = [];
                //                     for (var i = 0; i < vids.length; i++) {
                //                         v.push({ id: vids[i] });
                //                     }
                // 
                //                     self.picker.setChecked(v);
                //                 }
            },
            beforehide: function (p) {
                if ('' !== self.texts) {
                    self.setValue(self.texts);
                }
                else {
                    self.setValue(self.searchText);
                }
                if (self.useId) {
                    self.hiddenField.setValue(self.values);
                }
            },
            itemclick: function (view, record) {
                if (!self.multiSelect) {
                    if (self.leafOnly) {
                        //这里限定只有叶子节点可以选择     
                        if (record.get('leaf')) {
                            self.setToValues(record);
                        } else {
                            record.expand();
                        }
                    }
                    else {
                        self.setToValues(record);
                    }
                }
            },
            checkchange: function (record, checked) {
                if (self.multiSelect) {
                    self.setToValues(record);
                }
            }
        });
        return self.picker;
    },
    alignPicker: function () {
        var me = this, picker, isAbove, aboveSfx = '-above';
        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setWidth(me.bodyEl.getWidth());
            }
            else {
                picker.setWidth(me.panelWidth);
            }
            if (picker.isFloating()) {
                picker.alignTo(me.inputEl, "", me.pickerOffset);
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
                picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
            }
        }
    },
    onTrigger1Click: function (e) {
        var self = this;
        if ('' !== self.searchText) {
            self.resetValues();
            var rootNode = self.store.getRootNode();
            self.searchText = '';
            self.store.load();
            rootNode.set('text', self.rootText);
            if (self.multiSelect) {
                rootNode.set('checked', 'none');
            }
            self.store.sync();
        }
        self.onTriggerClick();
    },
    onTrigger2Click: function (e) {
        var self = this;
        if (self.editable) {
            var search = self.getText();
            var rootNode = self.store.getRootNode();
            if ('' !== search && (search !== self.searchText || '' === self.searchText) && !self.checkText(search)) {
                self.resetValues();
                self.searchText = search;
                self.store.load({ filters: [{ property: self.searchProperty, value: self.searchText}] });
                rootNode.set('text', search + ' 查询结果');
                if (self.multiSelect) {
                    rootNode.set('checked', false);
                }
                self.store.sync();
            }
        }
        self.onTriggerClick();
    },
    setToValues: function (record) {
        var self = this;
        //判断是否是多选
        if (!self.multiSelect) {
            self.values = record.get('id');
            self.texts = record.get('text');
            self.collapse();
        }
        else {
            var records = self.picker.getView().getChecked(), ids = [], names = [];
            Ext.Array.each(records, function (rec) {
                var leaf = true;
                if (self.leafOnly) {
                    leaf = rec.get('leaf');
                }
                if (leaf) {
                    ids.push(rec.get('id'));
                    names.push(rec.get('text'));
                }
            });
            self.values = ids.join(self.idSpliter);
            if (!self.showText && self.multiSelectText) {
                self.texts = Ext.String.format(self.multiSelectText, names.length);
            }
            else {
                self.texts = names.join(',');
            }
        }
        if (self.useId) {
            self.hiddenField.setValue(self.values);
        }
        self.setValue(self.texts);
    },
    resetValues: function () {
        if (this.hiddenField) {
            this.hiddenField.setValue('');
        }
        this.values = '';
        this.texts = '';
        this.setValue(this.displayText);
    },
    //取得ID值
    getIdValue: function () {
        var self = this;
        return self.values;
        //return self.callParent();
    },
    //设置显示字符
    setText: function (texts) {
        var self = this;
        self.texts = texts;
        self.setValue(self.texts);
    },
    //取得显示字符
    getText: function () {
        var self = this;
        return self.getValue();
    },
    setIdValue: function (value) {
        var self = this;
        self.values = value;
        var vids = value.split(',');
        self.texts = Ext.String.format(self.multiSelectText, vids.length);
        self.setValue(self.texts);
    }
});