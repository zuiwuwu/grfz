package sp.szpt.grfz.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;
import java.util.Set;

import org.elasticsearch.action.admin.indices.analyze.AnalyzeResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.cluster.metadata.MappingMetaData;
import org.elasticsearch.common.collect.ImmutableOpenMap;

import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.elasticsearch.xpack.client.PreBuiltXPackTransportClient;

public class TestEsClient {
	
/*	 public static void main(String[] args) {
	        ss();
	    }*/
	 
		private static Client createTransportClient() {
		      //设置集群名称
            Settings settings = Settings.builder().put("cluster.name", "elasticsearch")
            		.put("xpack.security.transport.ssl.enabled", false)
                    .put("xpack.security.user", "elastic:changeme")
                    .put("transport.type","security3")
	                    .put("http.type","security3")
                    .put("client.transport.sniff", true).build();
            TransportClient client = null;
			try {
				client = new PreBuiltXPackTransportClient(settings)
                .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("192.168.0.100"), 9300));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return client;
		}
	 
	 public static String getMapping(String indexname, String typename) {
	
	        String mapping="";
	        try {
	            //设置集群名称
	            Settings settings = Settings.builder().put("cluster.name", "elasticsearch")
	            		.put("xpack.security.transport.ssl.enabled", false)
	                    .put("xpack.security.user", "elastic:changeme")
	                    
	                    .put("client.transport.sniff", true).build();
	            //创建client
	            TransportClient client = new PreBuiltXPackTransportClient(settings)
	                    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("192.168.0.100"), 9300));

	            ImmutableOpenMap<String, MappingMetaData> mappings = client.admin().cluster().prepareState().execute()
	                    .actionGet().getState().getMetaData().getIndices().get(indexname).getMappings();
	            mapping = mappings.get(typename).source().toString();


	            client.close();
	        } catch (UnknownHostException e) {
	            e.printStackTrace();
	        }

	        return mapping;
	    }

    public static  SearchHits ss(String serachtext) {

/*        try {

            //设置集群名称
            Settings settings = Settings.builder().put("cluster.name", "elasticsearch")
            		.put("xpack.security.transport.ssl.enabled", false)
                    .put("xpack.security.user", "elastic:changeme")
                    .put("transport.type","security3")
	                    .put("http.type","security3")
                    .put("client.transport.sniff", true).build();
            //创建client
            TransportClient client = new PreBuiltXPackTransportClient(settings)
                    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("192.168.0.100"), 9300));*/
    	
    	
    	TransportClient client = (TransportClient) createTransportClient();
            //搜索单行数据
//            GetResponse response = client.prepareGet("megacorp", "employee", "_search").execute().actionGet();
            //搜索数据
//            SearchResponse searchresponse = client.prepareSearch("megacorp").execute().actionGet();
            /*JSONObject jsonObject = JSONObject.fromObject(searchresponse.toString());  
            JSONObject hites = (JSONObject) jsonObject.get("hits");  
          	System.out.println(hites.get("hits").toString());  */
            //输出结果
//            System.out.println(response.getSourceAsString());
//            System.out.println(searchresponse.toString());
            //关闭client
    	String preTag = "<font color='#dd4b39'>";//google的色值
        String postTag = "</font>";    
    	
            HighlightBuilder hiBuilder=new HighlightBuilder();
            hiBuilder.preTags(preTag);
            hiBuilder.postTags(postTag);
            hiBuilder.field("*");
       
            hiBuilder.requireFieldMatch(false);
    		
           
            
    		SearchResponse searchResponse = client.prepareSearch("tsuser")
//    				.setQuery(QueryBuilders.matchQuery("about", "我是"))
    				.setQuery(QueryBuilders.queryStringQuery(serachtext))
    				.setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
    				
    		        .highlighter(hiBuilder)
    		       
//    		        .setHighlighterFragmentSize(250)//设置高亮内容长度
    		        // 设置查询数据的位�?,分页�?
    				.setFrom(0)
    				// 设置查询结果集的�?大条�?
    				.setSize(60)
    				// 设置是否按查询匹配度排序
    				.setExplain(true)
    				.execute()
    				.actionGet();
    		SearchHits searchHits = searchResponse.getHits();
    		System.out.println("-----------------queryString---------------------");
//    		System.out.println("共匹配到:"+searchHits.getTotalHits()+"条记�?!");
    		/*SearchHit[] hits = searchHits.getHits();
    		for (SearchHit searchHit : hits) {
    			//获取高亮的字�?
    			Map<String, HighlightField> highlightFields = searchHit.getHighlightFields();
    			HighlightField highlightField = highlightFields.get("about");
    			System.out.println("高亮字段:"+highlightField.getName()+"\n高亮部分内容:"+highlightField.getFragments()[0].string());
    			Map<String, Object> sourceAsMap = searchHit.sourceAsMap();
    			Set<String> keySet = sourceAsMap.keySet();
    			for (String string : keySet) {
    				System.out.println(string+":"+sourceAsMap.get(string));
    			}
    			System.out.println();
    		}*/
    		 //遍历结果
          /*  for(SearchHit hit:searchHits){
                System.out.println("String方式打印文档搜索内容:");
                System.out.println(hit.getSourceAsString()+hit.getId());
                System.out.println("Map方式打印高亮内容");
                System.out.println(hit.getHighlightFields());

                System.out.println("遍历高亮集合，打印高亮片�?:");
                Text[] text = hit.getHighlightFields().get("_all").getFragments();
                for (Text str : text) {
                    System.out.println(str.string());
                }
            }*/
			return searchHits;
    	
            
/*            client.close();

        } catch (Exception e) {
            e.printStackTrace();
        }*/
	

    }

}
