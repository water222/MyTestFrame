package com.jxq.douban.api_test;

import com.alibaba.fastjson.JSONObject;
import com.jxq.douban.HttpSearch;
import com.jxq.douban.domain.MovieResponseVO;
import com.jxq.tools.JsonSchemaUtils;
import org.testng.Assert;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;
import retrofit2.Response;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


/**
 * @Auther: jx
 * @Date: 2018/7/5 10:48
 * @Description: 豆瓣电影接口测试
 */
public class SearchMusicTest {
    private static Properties properties;
    private static HttpSearch implSearch; //http请求实例
    private static String MUSIC_SCHEMA = "parameters/search/schema/SearchMusic_2.json";

    @BeforeSuite
    // 本部分的作用是:首先建立一个有baseUrl的retrofit
    public void beforeSuite() throws IOException {
        InputStream stream = this.getClass().getClassLoader().getResourceAsStream("env.properties");
        properties = new Properties();
        properties.load(stream);
        String music = properties.getProperty("douban.music");
        System.out.println("doubanMusic_host:"+music);
        Assert.assertNotNull(music);// 确保获得了url，可能在env_properties和filter_**.properties中没有对应修改好，那样容易出错！
        implSearch = new HttpSearch(music);
        stream = this.getClass().getClassLoader().getResourceAsStream("parameters/search/SearchTagsParams.properties");
        properties.load(stream);
        stream = this.getClass().getClassLoader().getResourceAsStream("");
        stream.close();
    }


    @Test(description = "豆瓣音乐。类别:q=travel light start=1 count=1")
    public void testcase1() throws IOException {
        String q = properties.getProperty("music.testcase1.req.q");
        int start = Integer.parseInt(properties.getProperty("music.testcase1.req.start"));
        int count = Integer.parseInt(properties.getProperty("music.testcase1.req.count"));
        Response<MovieResponseVO> response = implSearch.searchMusic(q, start, count);
        MovieResponseVO body = response.body();//报错显示强行将MovieResponseV0转化成MusicResponseV0,到底是哪里强行转换了？在RespVoConverterFactory.java中固定了MovieResponse
//        System.out.println(response.getClass().getName());//查看变量的类型
        //验证得到的是不是想要的响应体
//        System.out.println(body.getCount());
//        System.out.println(body.getTotal());
//        System.out.println(body.getStart());
//        System.out.println(body.getMusics());
        Assert.assertNotNull(body, "response.body()");
        JsonSchemaUtils.assertResponseJsonSchema(MUSIC_SCHEMA, JSONObject.toJSONString(body));//这里只能保证返回的json为标准化JSON，但是不能保证其正确性
        //与标准化JSON进行匹配验证时，报错：object has missing required properties (["musics","start","total"])
//        Assert.assertNotNull(body.getMusic());
        // 打印出该响应体信息，如何对得到的响应体的信息进行有用信息的提取
//        System.out.println(response["musics"][0]["title"]); // 这个值应该是歌名：travel light
    }
}
