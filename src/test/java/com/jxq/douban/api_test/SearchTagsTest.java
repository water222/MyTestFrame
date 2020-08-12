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
 * @Description: 豆瓣首页接口测试
 */
public class SearchTagsTest {
    private static Properties properties;
    private static HttpSearch implSearch; //搜索的实例？
    private static String SCHEMA_PATH = "parameters/search/schema/SearchTagsMovie.json";

    @BeforeSuite
    // 本部分的作用是？
    public void beforeSuite() throws IOException {
        InputStream stream = this.getClass().getClassLoader().getResourceAsStream("env.properties");
        properties = new Properties();
        properties.load(stream);
        String host = properties.getProperty("douban.host");
        implSearch = new HttpSearch(host);
        stream = this.getClass().getClassLoader().getResourceAsStream("parameters/search/SearchTagsParams.properties");
        properties.load(stream);
        stream = this.getClass().getClassLoader().getResourceAsStream("");
        stream.close();
    }

    @Test(description = "电影首页。类别:type=movie source=index")
    public void testcase1() throws IOException {
        String type = properties.getProperty("testcase1.req.type");
        String source = properties.getProperty("testcase1.req.source");

        //发起http请求
        Response<MovieResponseVO> response = implSearch.searchTags(type, source);
        // 得到请求响应体
        MovieResponseVO body = response.body();
        //检测响应体是否非空
        Assert.assertNotNull(body, "response.body()");
//        响应返回内容想通过schema标准校验
        JsonSchemaUtils.assertResponseJsonSchema(SCHEMA_PATH, JSONObject.toJSONString(body));
//        再Json化成对象
        Assert.assertNotNull(body.getTags(), "tags");
    }

    @Test(description = "Tv首页。类别:type=tv source=index")
    public void testcase2() throws IOException {
        String type = properties.getProperty("testcase2.req.type");
        String source = properties.getProperty("testcase2.req.source");
        Response<MovieResponseVO> response = implSearch.searchTags(type, source);
        MovieResponseVO body = response.body();
//        System.out.println("tags:"+body.getTags());
//        System.out.println("count:"+body.getCount());
        Assert.assertNotNull(body, "response.body()");
        JsonSchemaUtils.assertResponseJsonSchema(SCHEMA_PATH, JSONObject.toJSONString(body));
        Assert.assertNotNull(body.getTags(), "tags");
    }
}
