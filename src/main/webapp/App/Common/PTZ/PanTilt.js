Ext.define('App.Common.PTZ.PanTilt', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.feedpanel',
    border: false,
    autoScroll: false,
    lastPTZCmd: '',
    initComponent: function () {
        this.addEvents(
            'ptzcmdmsg'
        );
        this.html = '<img name="n4" src="../images/ptz/normal.gif" width="110" height="101" border="0" id="n4" usemap="#m_4" alt="" /><map name="m_4" id="m_4">'
        this.html += '<area shape="circle" coords="56,51, 9" href="javascript:;" alt="" id="home"/>';
        this.html += '<area shape="poly" coords="71,42,80,34,85,37,91,19,71,22,74,27,65,36,71,42" href="javascript:;" alt="左" id="rightup"/>';
        this.html += '<area shape="poly" coords="73,54,86,54,86,61,107,50,88,36,86,43,73,44,73,54" href="javascript:;" alt="" id="right" />';
        this.html += '<area shape="poly" coords="67,66,75,75,71,80,92,85,87,65,81,68,73,61,67,66" href="javascript:;" alt=""  id="rightdown"/>';
        this.html += '<area shape="poly" coords="43,80,55,100,68,81,61,78,60,66,50,65,50,79,43,80" href="javascript:;" alt="" id="down"/>';
        this.html += '<area shape="poly" coords="19,83,25,62,30,67,38,59,44,65,37,75,40,79,19,83" href="javascript:;" alt="" id="leftdown"/>';
        this.html += '<area shape="poly" coords="3,49,24,37,25,43,38,44,38,53,25,54,24,61,3,49" href="javascript:;" alt="" id="left"/>';
        this.html += '<area shape="poly" coords="22,15,42,20,39,27,47,35,40,42,31,34,26,38,22,15" href="javascript:;" alt="" id="leftup"/>';
        this.html += '<area shape="poly" coords="52,37,59,37,61,35,61,23,67,23,69,22,69,18,57,1,55,0,42,19,43,21,44,23,48,24,49,36,52,37" href="javascript:;" alt="" id="up"/>';
        this.html += '</map>';
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

        var vme = this;
        var v = Ext.query("#m_4 area");
        for (var i = 0; i < v.length; i++) {
            v[i].onmousedown = function () {
                Ext.getDom("n4").src = '../images/ptz/normal.gif';
                vme.lastPTZCmd = this.id;
                vme.onPTZCmd.call(vme, this.id, true);
            };
            v[i].onmouseup = function () {
                var v = Ext.getDom("n4");
                v.src = '../images/ptz/' + this.id + 'hover.gif';
                vme.lastPTZCmd = '';
                vme.onPTZCmd.call(vme, this.id, false);
            };
            v[i].onmouseover = function () {
                var v = Ext.getDom("n4");
                v.src = '../images/ptz/' + this.id + 'hover.gif';
            };
            v[i].onmouseout = function () {
                Ext.getDom("n4").src = '../images/ptz/normal.gif';
                if (vme.lastPTZCmd != '') {
                    vme.onPTZCmd.call(vme, vme.lastPTZCmd, false);
                    vme.lastPTZCmd = '';
                }
            };
        }
    },
    onPTZCmd: function (cmd, down) {
        this.fireEvent('ptzcmdmsg', cmd, down);
    }
});