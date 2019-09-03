package sp.szpt.grfz.model;


import java.util.List;
import java.util.Map;
import sp.szpt.common.Convert;
import sp.szpt.common.DateTime;
import sp.szpt.common.SPExtSearchInfo;
import sp.szpt.common.object;
import sp.szpt.common.chart.SingleSeries;
import sp.szpt.common.db.DbHelperAccess;
import sp.szpt.common.db.IDbHelper;

public class JTLLDBSearchInfo extends SPExtSearchInfo {
	
    /// <summary>
    /// 统计开始时间
    /// </summary>
    public DateTime BeginDate;
    /// <summary>
    /// 统计结束时间
    /// </summary>
    public DateTime EndDate;


      List<Map<String,Object>> GetList(){
   		IDbHelper db = DbHelperAccess.GetDbHelper();
   		String startTime=BeginDate.ToString("yyyyMMddHHmmss");
   		String endtTime=EndDate.ToString("yyyyMMddHHmmss");	
   	    List<Map<String,Object>> list=db.queryForList("select count(*) TM ,BADW from view_grfz_jxgl where BASJ >= ?  and BASJ <= ? GROUP BY BADW ",startTime,endtTime);
    	return list ;
    }
    protected DateTime GetEndTime(){
    	return DateTime.CreateDate(DateTime.GetDateYear(EndDate), 
    				DateTime.GetDateMonth(EndDate), 
    				DateTime.GetDateDay(EndDate), 
    				23, 59, 59);
    }

    protected DateTime GetStartTime()
    {
    	return DateTime.CreateDate(DateTime.GetDateYear(BeginDate), 
				DateTime.GetDateMonth(BeginDate), 
				DateTime.GetDateDay(BeginDate), 
				0, 0, 0);
    }
  
   
    protected Object BuildDataList(List<Map<String,Object>> ds)
    {
    	DateTime begin = this.GetStartTime();
        DateTime end = this.GetEndTime();
        SingleSeries chartdata = new SingleSeries("部门对比统计",String.format("%s至%s", begin.toString(), end.toString()));
        for (Map<String,Object> dr : ds)
        {   
            chartdata.AddData(object.toString(dr.get("BADW")), Convert.ToInt32(dr.get("TM")));
        }
        return chartdata;
    }

    public Object GetTJ()
    {
    	return BuildDataList(this.GetList());
    }
}
