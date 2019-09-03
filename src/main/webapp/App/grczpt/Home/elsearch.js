Ext.define('App.grczpt.Home.elsearch', {
	extend : 'Ext.container.Container',
	border : false,
	layout : 'vbox',	
	width : '100%',
//	height : '100%',
	 style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	cls : 'x-sp-zhdd-container',
	initComponent : function() {
	      var str = new Array(); 
	        var sts = new Array();
	        var ss = '';
	        var sq = [];
	        var sc = [];
		Ext.Ajax.request({
    		url : '../dictionary/getSearchLists',
   			method : 'post', 
   			params : {
   				serachtext:this.inf
   			},
   			async: false,//是否异步请求
   			scope:this,
   			callback : function(options, success, response) {/*
   				if (success) {
   				
   					ss = response.responseText.split('$');
   					sts = ss[0].split('~');
   					str=ss[1].split(',');
   			
   					for ( var i = 1; i < str.length; i++) {
						sq.push(
								{
									title : str[i],
									text : sts[i]
									
								}
						)	
   						}

							
   				} else {
   				}
   			*/
   				ss = response.responseText;
   				
   			}
   		});
		
		
		var ts;
		var timer = null; //定义一个定时器
		this.items = [{
			xtype:'container',
		
//			html : Ext.String.format('<iframe id="sun" src="../jsp/index/search.jsp?param1='+this.inf+'"  width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="auto" ></iframe>'),
			html: ss ,
			height : 900,
			width : '100%',
			margin : '0 0 0 650',
			autoScroll:true,
			listeners: {
		        render: function(p){
		          p.getEl().on('scroll', function(){
		            // do stuff + this.dom.offsetHeight >= this.dom.scrollHeight
		        	  var btn = document.getElementById('top');
		   
		        	  
		        	//获取滚动条的滚动高度
		              var osTop = p.getEl().dom.scrollTop ; 

		              if(osTop >= 200){  //如果滚动高度大于可视区域高度，则显示回到顶部按钮
		            	  btn.style.display = 'block';	  		        
			        		btn.onclick = function(){
			        			/*console.log(12)
			        			p.getEl().dom.scrollTop = 0;*/
			        			//设置一个定时器
			        	        timer = setInterval(function(){
			        	            //获取滚动条的滚动高度
			        	            var osTop = p.getEl().dom.scrollTop;
			        	            //用于设置速度差，产生缓动的效果
			        	            var speed = Math.floor(-osTop / 6);
			        	            p.getEl().dom.scrollTop = osTop + speed;
			        	            isTop =true;  //用于阻止滚动事件清除定时器
			        	            if(osTop == 0){
			        	                clearInterval(timer);
			        	            }
			        	        },30);
			        		}
			          
		            	  
		              }else{         //否则隐藏
		            	  btn.style.display = 'none';
		              }
		        	  //底部
//		        	  if(p.getEl().dom.scrollTop + p.getEl().dom.offsetHeight >= p.getEl().dom.scrollHeight){}		          
		        	  
		          }, p);
		        }
		      },
		},{
			xtype:'container',
			html: '<div id="full" style="width:0px; height:0px; position:fixed; right:80px; bottom:150px; z-index:100; text-align:center; background-color:transparent; cursor:pointer;"><a href="javascript:;" class="top" id="top" style="display:none"><img src="../images/up.png" width="32px;" height="32px;" border=0 alt="回到顶部"></a></div>',
			/*listeners:{
				render : function(p1) {
					// Append the Panel to the click handler's argument
					// list.
					p1.getEl().on('click', function(p) {
						console.log(ts)
						ts = 0;
						console.log(ts)
					});
				}
			
			}*/
		}]

		
		 this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    }
    
});
