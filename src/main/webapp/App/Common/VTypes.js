// custom Vtype for vtype:'IPAddress'
Ext.apply(Ext.form.field.VTypes, {
    IPAddress: function (v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    IPAddressText: '必须输入IP地址（如：192.168.1.1）',
    IPAddressMask: /[\d\.]/i
});

// custom Vtype for vtype:'IPSection'
Ext.apply(Ext.form.field.VTypes, {
    IPSection: function (v) {
        return /^(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)$/.test(v);
    },
    IPSectionText: '必须输入IP地址段（如：192.168.1.*）',
    IPSectionMask: /[\d\.\*]/i
});

// 号牌号码输入控制
Ext.apply(Ext.form.field.VTypes, {
    HPHM: function (v) {
        var matchFlag = /[ABCDEFGHJKLMNPQRSTUVWXYZ0123456789%警消林\*\?\.\-]*/i.test(v);
        return matchFlag;
    },
    HPHMText: '请输入正确的号牌号码',
    HPHMMask: /[ABCDEFGHJKLMNPQRSTUVWXYZ0123456789%警消林\*\?\.\-]/i
});

//自定义的password验证函数
Ext.apply(Ext.form.VTypes, {
    password: function (val, field) {               //val指这里的文本框值，field指这个文本框组件，  
        if (field.confirmTo) {                      //confirmTo保存另外的组件的id值  
            var pwd = Ext.get(field.confirmTo);     //取得confirmTo的那个id的值  
            var confirmToVal = pwd.getValue();
            return (val == confirmToVal);
        }
        return true;
    }
});

// custom Vtype for vtype:'BH'
Ext.apply(Ext.form.field.VTypes, {
    BH: function (v, field) {
        if (field.textlength) {
            if (v.length != field.textlength)
                return false;
        }

        return /[0123456789]*/i.test(v);
    },
    BHText: '必须输入数字编号',
    BHMask: /[\d]/i
});

Ext.apply(Ext.Date, {
    trafficTimeToDate: function (value) {
    		if(!Ext.isString(value))
    			return ;
    		if(value.length != 14)
    			return ;
    		return new Date(Ext.String.format('{0}-{1}-{2} {3}:{4}:{5}',
                        value.substr(0, 4),
                        value.substr(4, 2),
                        value.substr(6, 2),
                        value.substr(8, 2),
                        value.substr(10, 2),
                        value.substr(12, 2)));
    },
    dateToTrafficTime:function(value)
    {
    	return Ext.Date.format(value,'YmdHis');
    }
});


Ext.listOCXCtrlMsgfun = new Array();
function OnOCXCtrlMsg(id, msg) {
    
    var vfun = Ext.listOCXCtrlMsgfun[id];
    if (vfun
        && vfun.pfun)
        vfun.pfun.call(vfun.scope, msg);
    else {
        
        }
}
