package com.jxq.douban.function_test.common;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;


// 豆瓣测试过程中公共用到的豆瓣URL、以及测试用例中每次都需要的beforeSuite、afterSuite!
public class Getparam {
    // 设置参数
    protected static Properties properties;
    protected String host; //在登录操作中不管是哪种情况都要用到host，因此提取它为类中的全局变量。
    protected WebDriver driver;

    @BeforeSuite(description = "打开一次浏览器后可批量执行测试用例套件")
    public void beforeSuite() throws IOException {
        // 获得测试所需的环境、访问的主机地址以及一些测试所需的参数
        InputStream stream = this.getClass().getClassLoader().getResourceAsStream("env.properties");
        properties = new Properties();
        properties.load(stream);
        this.host = properties.getProperty("douban_login.host");
        System.out.println("douban_login host:"+host);
        Assert.assertNotNull(this.host);
        stream = this.getClass().getClassLoader().getResourceAsStream("parameters/search/SearchTagsParams.properties");
        //使用bufferReader解决中文乱码问题(没有解决)
        BufferedReader bf = new BufferedReader(new InputStreamReader(stream));
        properties.load(bf);
//        properties.load(stream);
//        stream = this.getClass().getClassLoader().getResourceAsStream("");
        stream.close();
        System.setProperty("webdriver.chrome.driver",
                "C:\\Users\\boom\\AppData\\Local\\Google\\Chrome\\Application\\chromedriver.exe");//要写在上面！
        driver = new ChromeDriver();

    }

    @AfterSuite
    public void afterSuite(){
        driver.close();
    }

}
