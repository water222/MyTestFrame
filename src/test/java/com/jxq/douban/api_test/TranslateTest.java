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

// 通过有道翻译使用post方法向有道提交一个英文让其翻译成中文
public class TranslateTest {
    // 属性
    private static Properties properties;
    // http请求实例
    private static HttpSearch implSearch; //http请求实例
    // JSONSchema文件所在目录
    private static String Trans_SCHEMA = "parameters/search/schema/Translate.json";

    @BeforeSuite
    public  void beforeSuite() throws IOException {
//        System.out.println(this.getClass()); //获取当前类所在目录：class com.jxq.douban.api_test.TranslateTest
//        System.out.println(this.getClass().getClassLoader());//取得该Class对象的类装载器实现获取在classpath路径下的资源文件的输入流
//        System.out.println(this.getClass().getClassLoader().getResourceAsStream("env.properties"));//获取在classpath路径下的资源文件的输入流
        InputStream stream = this.getClass().getClassLoader().getResourceAsStream("env.properties");//这里使用到的getResource..其默认读取的资源在src/main/resources中
        properties = new Properties();
        properties.load(stream);
        String host = properties.getProperty("Translate.host");
//        System.out.println("host_youdao:"+host);//没有加载到baseURL，注意检查env、filter对应的属性文件
        Assert.assertNotNull(host);// 确保获得了url，可能在env_properties和filter_**.properties中没有对应修改好，那样容易出错！
        implSearch = new HttpSearch(host);
        stream = this.getClass().getClassLoader().getResourceAsStream("parameters/search/SearchTagsParams.properties");
        properties.load(stream);
        stream = this.getClass().getClassLoader().getResourceAsStream("");
        stream.close();//不管是InputStream还是outpu创建流之后都要关闭流，以免占用过多的内存

    }

    @Test(description = "有道翻译。类别:src=good")
    public void testcase1() throws IOException {
        String src = properties.getProperty("Trans.src");
        Response<MovieResponseVO> response = implSearch.translate(src);
        MovieResponseVO body = response.body();//报错显示强行将MovieResponseV0转化成MusicResponseV0,到底是哪里强行转换了？在RespVoConverterFactory.java中固定了MovieResponse
    //        System.out.println(response.getClass().getName());//查看变量的类型
        //验证得到的是不是想要的响应体
//            System.out.println(body.getErrorCode());
//            System.out.println(body.getType());
//            System.out.println(body.getErrorCode());
//            System.out.println(body.getTranslateResult());
//            System.out.println(body.getElapsedTime());
        Assert.assertNotNull(body, "response.body()");
        JsonSchemaUtils.assertResponseJsonSchema(Trans_SCHEMA, JSONObject.toJSONString(body));//这里只能保证返回的json为标准化JSON，但是不能保证其正确性
        Assert.assertNotNull(body.getTranslateResult());
    }


}
