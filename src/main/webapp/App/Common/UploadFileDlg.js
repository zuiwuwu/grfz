//定义编辑对话框
Ext.define('App.Common.UploadFileDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '上传图片',
    modurl: null,
    hidden:true,
    initComponent: function () {
        this.addEvents('saveok');


       /* if (this.modurl) {
            this.moddownload = Ext.create('Ext.Component',
        {
            html: '<a href="' + this.modurl + '" target="_blank">模板下载</a>'
        });
        }*/
        
        
        var flag = this.flag;
        if(flag == "jbxx"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/基本信息模板.xlsx">模板下载</a>'});
        }
        if(flag == "gwy"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/公务员年度考核等次模板.xlsx">模板下载</a>'});
        }
        if(flag == "sjqy"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/市局全员绩效考核等级模板.xlsx">模板下载</a>'});
        }
        if(flag == "jcxx"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/奖励档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "gw"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/岗位档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "jtda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/家庭档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "mzpc"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/民主评测档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "pxda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/培训档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "tsda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/投诉档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "xljkda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/心理健康档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "ahda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/兴趣爱好档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "ahda"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/兴趣爱好档案模板.xlsx">模板下载</a>'});
        }
        if(flag == "ejkh"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/部门二级考核模板.xlsx">模板下载</a>'});
        }
        if(flag == "txkh"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/全警条线考核模板.xlsx">模板下载</a>'});
        }
        if(flag == "dwkh"){
        	this.moddownload = Ext.create('Ext.Component',{html: '<a href="../../../download/单位绩效考核模板.xlsx">模板下载</a>'});
        }
        this.fileBZ = Ext.create('Ext.form.field.Text',{
                        id: 'BZ',
                        name: 'BZ',
                        hidden: this.hidden,
                        fieldLabel: '备注信息',
                        value: this.BZ,
        	            labelWidth: 50
        });
        this.items = [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    width: 320,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                    {
                        xtype: 'textfield',
                        id: 'ID',
                        name: 'ID',
                        hidden: true,
                        value: this.ID
                    },
                    {
                        allowBlank: false,
                        labelWidth: 50,
                        xtype: 'filefield',
                        id: 'FILE',
                       
                        emptyText: '请选择文件',
                        fieldLabel: '文件',
                        name: 'FILE',
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'upload-icon'
                        }
                    },this.fileBZ,
                    this.moddownload]
                }];

        this.buttons = [
                {
                    text: '确定',
                    action: 'save',
                    scope: this,
                    handler: this.onSave
                },
                {
                    text: '关闭',
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    onSave: function (button) {
        var vme = this;
        var form = this.down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: vme.url,
                waitMsg: '正在' + this.title + '...',
                success: function (fp, o) {
                    var result = Ext.JSON.decode(this.response.responseText);
                    if (result.success) {
                        vme.fireEvent('saveok', result);
                        vme.close();
                    }
                    else {
                        alert(result.msg);
                    }
                },
                failure: function () {
                    alert('上传文件失败！');
                }
            });
        }
    }
});

