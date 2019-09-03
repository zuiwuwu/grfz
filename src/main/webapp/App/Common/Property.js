//定义编辑对话框
Ext.define('App.Common.Property', {
    extend: 'Ext.grid.property.Grid',
    url: '',
    params: null,
    jsonData: null,
    sortableColumns: false,
    initComponent: function () {
        var vme = this;
        this.callParent(arguments);
    },
    refresh: function (params, maskparent) {
        var vme = this;
        if (typeof vme.url != 'undefined'
                && vme.url != '') {
            vme.isloading = true;
            var myMask = new Ext.LoadMask(maskparent ? maskparent : vme, { msg: "正在属性，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: vme.url,
                method: 'post', //方法  
                params: vme.params,
                jsonData: vme.jsonData,
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.isloading = false;
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        
                        if (v.success) {
                            var vsource = {};
                            var vsourceConfig = {};
                            var voldsource = vme.getSource();
                            if (params) {
                                voldsource = params;
                            }

                            for (var i = 0; i < v.rows.length; i++) {
                                var vrow = v.rows[i];
                                if (typeof voldsource[vrow.id] != 'undefined') {
                                    vsource[vrow.id] = voldsource[vrow.id];
                                }
                                else
                                    vsource[vrow.id] = vrow.value;
                                var vtype = 'string';
                                var veditor = null;
                                var venable = true;
                                if (Ext.isString(vrow.editor)) {
                                    if (vrow.editor == 'numberbox')
                                        vtype = 'number';
                                    else if (vrow.editor == 'checkbox') {
                                        vtype = 'boolean';
                                        veditor = new Ext.grid.CellEditor({ field: new Ext.form.field.ComboBox({
                                            editable: false,
                                            store: [['True', 'True'], ['False', 'False']]
                                        })
                                        });
                                    }
                                    else if (vrow.editor == 'datebox')
                                        vtype = 'date';
                                }
                                else if (typeof vrow.editor != 'undefined') {
                                    if (vrow.editor.type == 'numberbox')
                                        vtype = 'number';
                                    else if (vrow.editor.type == 'checkbox') {
                                        vtype = 'boolean';
                                        veditor = new Ext.grid.CellEditor({ field: new Ext.form.field.ComboBox({
                                            editable: false,
                                            store: [['True', 'True'], ['False', 'False']]
                                        })
                                        });
                                    }
                                    else if (vrow.editor.type == 'datebox')
                                        vtype = 'date';
                                    else if (vrow.editor.type == 'combobox') {
                                        vtype = null;
                                        var vstore = new Array();
                                        var vdata = vrow.editor.options.data;
                                        for (var j = 0; j < vdata.length; j++) {
                                            vstore.push([vdata[j].value, vdata[j].text]);
                                        }

                                        veditor = new Ext.grid.CellEditor({ field: new Ext.form.field.ComboBox({
                                            editable: false,
                                            store: vstore
                                        })
                                        });
                                    }
                                }
                                else {
                                    venable = false;
                                }

                                vsourceConfig[vrow.id] = { displayName: vrow.name, type: vtype, editor: veditor, enable: venable };
                            }
                            vme.setSource(vsource, vsourceConfig);
                        }
                        else {
                            alert(v.msg);
                        }
                    }
                    else {
                        alert('网络错误！');
                    }
                }
            });
        }
    },

    // @private
    // Returns the correct editor type for the property type, or a custom one keyed by the property name
    getCellEditor: function (record, column) {
        var me = this,
            propName = record.get(me.nameField),
            val = record.get(me.valueField),
            editor = me.getConfig(propName, 'editor'),
            type = me.getConfig(propName, 'type'),
            enable = me.getConfig(propName, 'enable'),
            editors = me.editors;
        if (!enable)
            return null;
        // A custom editor was found. If not already wrapped with a CellEditor, wrap it, and stash it back
        // If it's not even a Field, just a config object, instantiate it before wrapping it.
        if (editor) {
            if (!(editor instanceof Ext.grid.CellEditor)) {
                if (!(editor instanceof Ext.form.field.Base)) {
                    editor = Ext.ComponentManager.create(editor, 'textfield');
                }
                editor = me.setConfig(propName, 'editor', new Ext.grid.CellEditor({ field: editor }));
            }
        } else if (type) {
            switch (type) {
                case 'date':
                    editor = editors.date;
                    break;
                case 'number':
                    editor = editors.number;
                    break;
                case 'boolean':
                    editor = me.editors['boolean'];
                    break;
                default:
                    editor = editors.string;
            }
        } else if (Ext.isDate(val)) {
            editor = editors.date;
        } else if (Ext.isNumber(val)) {
            editor = editors.number;
        } else if (Ext.isBoolean(val)) {
            editor = editors['boolean'];
        } else {
            editor = editors.string;
        }

        // Give the editor a unique ID because the CellEditing plugin caches them
        editor.editorId = propName;
        return editor;
    }
});
