//增加支持iframe对话框，方便两种方式同时使用
Ext.define('App.Common.ExEditDlg', {
	extend : 'Ext.Panel',
	layout : 'fit',
	modal : true,
	formWidth : null,
	saveOkClose : true, //保存完成后退出
	useJsonData : false,
	autoDestroy : true,
	closeAction : 'destroy',
	isIFrameDlg : false,
	frameName : 'iframedlg',
	src : '../Main/DialogEx',
	floating : true,
    baseCls: Ext.baseCSSPrefix + 'window',
    isWindow: true,
    overlapHeader: true,
    ignoreHeaderBorderManagement: true,
	constructor : function(config) {
		this.dialogParams = Ext.apply({}, config);
		this.callParent(arguments);
	},
	initComponent : function() {
		var vme = this;
		this.addEvents('saveok');

		if (this.isIFrameDlg) {
			this.modal = true;
			this.header = false;
			this.frame = false, this.border = 0;
			this.resizable = false;
			this.margin = 0;
			this.padding = '0 0 0 0';
			this.bodyPadding = 0;

			if (Ext.isChrome) {
				//this.width = this.width + 2;
				this.height = this.height + 2;
			} else {
				//this.width = this.width + 2;
				this.height = this.height + 2;
			}

			this.dialogClass = this.$className;
			delete this.items;
			if(this.buttons)
				delete this.buttons;
			this.html = Ext.String
					.format(
							'<iframe src="{0}" name="{1}" width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>',
							this.src, this.frameName);

			Ext.apply(this.renderSelectors, {
						iframeEl : 'iframe'
					});
		} else {

			var vitems = this.items;
			this.items = [{
						xtype : 'form',
						bodyPadding : 10,
						border : 0,
						width : this.formWidth,
						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						items : vitems
					}];

			if (!this.buttons) {
				this.buttons = [{
							text : '确定',
							action : 'save',
							scope : this,
							handler : this.onSave
						}, {
							text : '取消',
							scope : this,
							handler : function() {
								//this.fireEvent('close', this);
								this.close();
							}
						}];
			}


		}

		this.callParent(arguments);
	},
	getValues : function() {
		var form = this.down('form');

		return form.getValues();
	},
	afterRender : function() {
		this.callParent(arguments);
		if (!this.isIFrameDlg) {
			if (this.geturl && this.SAVEID) {
				var myMask = new Ext.LoadMask(this, {
							msg : "正在查询，请稍候！"
						});
				myMask.show();
				Ext.Ajax.request({
					url : this.geturl,
					params : {
						ID : this.SAVEID
					},
					method : 'post',
					scope : this,
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var result = Ext.JSON.decode(response.responseText);
							this.onBeforeLoad(result);
							this.setValues(result);
						} else {
							alert("网络错误！");
						}
					}
				});
			}
		}

	},
	beforeDestroy : function() {
		this.cleanupListeners(true);
		this.callParent();
	},
	initEvents : function() {
		var me = this;
		me.callParent();
		if (me.isIFrameDlg)
			me.iframeEl.on('load', me.onLoad, me);
	},
	cleanupListeners : function(destroying) {
		var doc, prop;

		if (this.rendered) {
			try {
				doc = this.getDoc();
				if (doc) {
					Ext.EventManager.removeAll(doc);
					if (destroying) {
						for (prop in doc) {
							if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
								delete doc[prop];
							}
						}
					}
				}
			} catch (e) {
			}
		}
	},
	getDoc : function() {
		try {
			return this.getWin().document;
		} catch (ex) {
			return null;
		}
	},

	getWin : function() {
		var me = this, name = me.frameName, win = Ext.isIE
				? me.iframeEl.dom.contentWindow
				: window.frames[name];
		return win;
	},

	onLoad : function() {
		var me = this, doc = me.getDoc(), fn = me.onRelayedEvent;
		if (doc) {
			try {
				Ext.EventManager.removeAll(doc);
				Ext.EventManager.on(doc, {
							mousedown : fn, // menu dismisal (MenuManager) and Window onMouseDown (toFront)
							mousemove : fn, // window resize drag detection
							mouseup : fn, // window resize termination
							click : fn, // not sure, but just to be safe
							dblclick : fn, // not sure again
							scope : me
						});
			} catch (e) {
				// cannot do this xss
			}
			Ext.EventManager.on(this.getWin(), 'beforeunload',
					me.cleanupListeners, me);
			this.el.unmask();
			doc.dialogParams = this.dialogParams;
			doc.spDialogScope = this;
			//debugger;
			doc.spFireEvent = function(event, value) {
				//this.close();
				if (event == 'onready') {
					delete this.dialogParams.listeners;
					doc.onspready(this.dialogClass, this.dialogParams);
				} else if (event == 'close') {
					this.close();
				} else if (event == 'saveok') {
					this.fireEvent('saveok', this, value);
				}
			};
		} else if (me.src && me.src != '') {
			this.el.unmask();
		}
	},
	onRelayedEvent : function(event) {
		// relay event from the iframe's document to the document that owns the iframe...

		var iframeEl = this.iframeEl,

		// Get the left-based iframe position
		iframeXY = Ext.Element.getTrueXY(iframeEl), originalEventXY = event
				.getXY(),

		// Get the left-based XY position.
		// This is because the consumer of the injected event (Ext.EventManager) will
		// perform its own RTL normalization.
		eventXY = Ext.EventManager.getPageXY(event.browserEvent);

		// the event from the inner document has XY relative to that document's origin,
		// so adjust it to use the origin of the iframe in the outer document:
		event.xy = [iframeXY[0] + eventXY[0], iframeXY[1] + eventXY[1]];

		event.injectEvent(iframeEl); // blame the iframe for the event...

		event.xy = originalEventXY; // restore the original XY (just for safety)
	},
	onBeforeLoad : function(result) {
	},
	isValid : function() {
		var form = this.down('form');
		return form.isValid();
	},
	setValues : function(values) {
		var form = this.down('form');
		form.getForm().setValues(values);
	},
	loadRecord : function(rec) {
		var form = this.down('form');
		form.getForm().loadRecord(rec);
	},
	onSave : function(button) {
		var vme = this;
		//var win = button.up('window');

		if (!this.isValid())
			return;
		var values = vme.getValues();

		
		if (vme.url) {
			var myMask = new Ext.LoadMask(vme, {
						msg : "正在保存，请稍候！"
					});
			myMask.show();
			Ext.Ajax.request({
						url : vme.url, //请求地址  
						params : vme.useJsonData ? null : values,
						jsonData : vme.useJsonData ? values : null,
						method : 'post', //方法  
						scope: this,
						callback : function(options, success, response) {
							myMask.hide();
							if (success) {
								var result = Ext.JSON
										.decode(response.responseText);
								if (result.success) {
									var saveOkClose = vme.saveOkClose;
									if (this.showiniframe) {
										document.spFireEvent.call(document.spDialogScope, 'saveok',values);
									}
									else
										vme.fireEvent('saveok', vme, values);
									if (saveOkClose)
										vme.close();

								} else {
									alert(result.msg);
								}
							} else {
								alert("网络错误！");
							}
						}
					});
		} else {
			if (this.showiniframe) {
				document.spFireEvent.call(document.spDialogScope, 'saveok',values);
			}
			else
				vme.fireEvent('saveok', vme, values);
			vme.close();
		}

	},
	close : function() {
		if (this.showiniframe)
			document.spFireEvent.call(document.spDialogScope, 'close');
		this.callParent();
	},
	callback:function(name,args)
	{
		var doc = this.getDoc();
		if(doc.dlgcallback)
			return doc.dlgcallback(name,args);
	}
});
