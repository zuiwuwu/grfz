Ext.define('App.Public.TreeFilter', {
    filterByText: function(text) {
        this.filterBy(text, 'text');
    },
   
    filterBy: function(text, by) {
        //debugger;
        this.clearFilter();

        var view = this.getView(),
            me = this,
            nodesAndParents = [];

        
        this.getRootNode().cascadeBy(function(tree, view) {
            var currNode = this;
            if (currNode && currNode.data[by] && currNode.data[by].toString().toLowerCase().indexOf(text.toLowerCase()) > -1) {
                me.expandPath(currNode.getPath());

                while (currNode.parentNode) {
                    nodesAndParents.push(currNode.id);
                    currNode = currNode.parentNode;
                }
            }
        }, null, [me, view]);

       
        this.getRootNode().cascadeBy(function(tree, view) {
            var uiNode = view.getNodeByRecord(this);
           
            if (uiNode && !Ext.Array.contains(nodesAndParents, this.id)) {
                Ext.get(uiNode).setDisplayed('none');
            }
        }, null, [me, view]);
    },


    clearFilter: function() {
        var view = this.getView();
        this.getRootNode().cascadeBy(function(tree, view) {
            var uiNode = view.getNodeByRecord(this);

            if (uiNode) {
                Ext.get(uiNode).setDisplayed('table-row');
            }
        }, null, [this, view]);
    }
});