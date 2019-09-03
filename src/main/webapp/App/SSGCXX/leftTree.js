

function setChildChecked(node,checked){
        node.expand();
        node.set({checked:checked});
        if(node.hasChildNodes()){
            node.eachChild(function(child) {
                setChildChecked(child,checked);
            });
        }
    }

function setParentChecked(node,checked){
        node.set({checked:checked});
        var parentNode = node.parentNode;
        if(parentNode !=null){
            var flag = false;
            parentNode.eachChild(function(child) {
                if(child.data.checked == true){
                    flag = true;
                }
            });
            if(checked == false){
                if(!flag){
                    setParentChecked(parentNode,checked);
                }
            }else{
                if(flag){
                    setParentChecked(parentNode,checked);
                }
            }
         }
    }
//点位树
Ext.define('App.SSGCXX.devTree',{
    extend: 'Ext.tree.Panel',
    rootVisible: false,  //
    flex: 1,
    width: 350,
    url:'../SSGC/getLeftTree',
    mixins:['App.Public.TreeFilter'],
    list:[],
    initComponent: function () { 
    	var me=this;
    	 this.addEvents('checkchange');
         this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: 
            { expanded: true,
              text:'',
              id:'',
            },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                 
                }
            },
        });
       this.listeners={
    		        scope:this,
    		       "checkchange": this.checkchange,          
       };
       
       
       
        this.callParent(arguments);
    },
    
    getFilters:function(){ 	
    	var view=this.sp.devtree.getView();
    	var strArr =this.sp.devtree.getView().getChecked();
    	var str='';
    	for(var i=0;i<strArr.length;i++){	
    		if(strArr[i].raw.isDW){
    			 if (str !== '')
    				 str += ',';
    			     str +=strArr[i].raw.id;
    	}
    	}
    	var filters = [{
			property : 'TXDD',
			value : str
		}]
    	return filters;
    },
    getStr:function(){ 	
    	var view=this.getView();
    	var strArr =this.getView().getChecked();
    	var str='';
    	for(var i=0;i<strArr.length;i++){	
    		if(strArr[i].raw.isDW){
    			 if (str !== '')
    				 str += ',';
    			     str +=strArr[i].raw.id;
    	}
    	}
    	
    	return str;
    },
    checkchange:  function(node,checked,eOpts) {
        setChildChecked(node,checked);
        setParentChecked(node,checked); 
        this.sp.index.CLXXGrid.myfilter=this.getStr();
        this.sp.index.BJXXGrid.myfilter=this.getStr();
        this.sp.index.WFXXGrid.myfilter=this.getStr();
  },
});

			
Ext.define('App.SSGCXX.search',{
	extend : 'Ext.container.Container',
    width: '100%',
    height: 55,
    border: 0,
    layout: 'absolute',
    style : {
    	 background: 'url(../images/cllsxx/leftsearch.png)'
    },
    initComponent: function () {
    	var vme = this;
    	 this.addEvents(
    	            'searchtextchange'
    	        );
    	 this.searchtext = Ext.create('Ext.form.field.Text', {
    		x : 24,
    		y : 15,
            width: 215,
            height: 30,
            fieldStyle: { border: 0 },
            emptyText: '请输入关键字',
            listeners:
            {
                scope: this,
                change: function (textedit, newValue, oldValue, eOpts) {
                    if (oldValue != newValue) {
                        if (vme.searchtimerid) {
                            clearTimeout(vme.searchtimerid);
                            vme.searchtimerid = null;
                        }
                        vme.searchtimerid = setTimeout(function () {
                            vme.searchtimerid = null;
                            vme.fireEvent('searchtextchange', newValue);
                        }, 500);
                    }
                }
            }
        });
    	
		this.searchButton = Ext.create('App.Common.ImageButtonEx', {
			x : 257,
    		y : 10,
    		height : 37,
    		width : 78,		
		    tooltip: '搜索',
		    btnCls: 'icon-leftsearch',
		    scope: this,
		    handler: function (btn) {  
		    	var tree=this.sp.devtree;
		        tree.store.reload({params:{text:this.searchtext.getValue()},callback:function(){
		        	tree.expandAll();	
		        }});
			    
		}}), 
    	
    	this.items = [this.searchtext,this.searchButton];
    	this.callParent(arguments);
    },
    
    getFilters:function(){
    	var view=this.sp.devtree.getView();
    	var strArr =this.sp.devtree.getView().getChecked();
    	var str='';
    	for(var i=0;i<strArr.length;i++){	
    		if(strArr[i].data.leaf&&Ext.get(view.getNodeByRecord(strArr[i])).isDisplayed()){
    			 if (str !== '')
    				 str += ',';
    			     str +=strArr[i].data.id;
    	}
    	}
    	var filters = [{
			property : 'DW',
			value : str
		}]
    	return filters;
    }
});


Ext.define('App.SSGCXX.leftTree', {
    extend: 'Ext.container.Container',
    border: 0,
    width: 350,
    height:'100%',
    //flex : 1,
    layout: 'vbox',
    initComponent: function () {
        var vme = this;
        this.devtree = Ext.create('App.SSGCXX.devTree', { sp:this,
            border: 0,
          
        });
        this.search =  Ext.create('App.SSGCXX.search', { sp:this,
            listeners:
            {
                scope: this,
                searchtextchange: function (value) {
                    if (value == ''|| value == null|| typeof value == 'undifined') {
                    	this.devtree.store.load({params:{text:""}});     
                    }
                    else {       	
                    //	this.devtree.filterBy(value,'text');  
                    }
                }
            }
        }),   
        this.items = [this.search,this.devtree];
        this.callParent(arguments);
    },
    
    
    getcheckList:function(){
 	   var nodes = this.devtree.getRootNode().childNodes;
        for (var j = 0; j < nodes.length; j++) {
            var node = tree.getRootNode().childNodes[j];
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].getUI().checkbox.checked) {
                         alert(node.childNodes[i].id);
                    }
                }
            }
        }

    },
    
   /* onDevSelChanged: function () {
        var vme = this;
        vme.checkchangetimer = null;
        var vchntext = '';
        vchntext = vme.devtree.getFilters();
        console.log(vchntext);
    }*/
});
