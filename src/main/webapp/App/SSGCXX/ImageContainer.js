Ext.define('App.SSGCXX.ImageContainer', {
    extend: 'Ext.container.Container',
    border: 2,
    layout: 'card',
    style: {
    },
    initComponent: function () {
        var vme = this;
        this.image = Ext.create('Ext.Img', {
            width: '100%',
            height:'100%',
            border: 0,
            src: '../images/test/11.jpg'
        });
        this.items = [this.image];
        this.callParent(arguments);
    },
    setSrc: function (selected) {
        this.image.setSrc(selected[0].get("TPLJ"));
        
    }
});