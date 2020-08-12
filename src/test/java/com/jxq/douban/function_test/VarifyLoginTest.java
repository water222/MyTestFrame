package com.jxq.douban.function_test;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.*;
import java.sql.SQLException;
import java.util.*;

import static com.jxq.douban.data.Mysql.getDataList;
import com.jxq.douban.function_test.page.common.LoginDouban_co;
import com.jxq.douban.function_test.page.IsLoginBtnClickable;
import com.jxq.douban.function_test.common.Getparam;
// 登录功能测试：1.账户密码均正确是否登录成功；2.什么都不输入是否登录失败；3.账户密码错误登录是否失败


public class VarifyLoginTest extends Getparam{

    // java继承时如何获得父类的方法和参数
    @Test(priority = 0, dataProvider = "mysqlMethod", description = "username, passWord" )
    public void testLogin_noNUll(Map<String,String> param) throws Exception {
        //username,passWord一定要与数据表中的字段完全一致
        LoginDouban_co douban = new LoginDouban_co(driver);
        // 进入登录界面
        douban.goToLoginPage(host);
        //输入账户密码
        douban.inputUserPwd(param.get("username"), param.get("passWord"));
        //点击登录按钮
        douban.clickLoginButton();
        // 有验证码的情况如何处理验证码呢？
        //验证登录是否成功，不成功的话是否获得了相关的提示
        douban.varifyIsLoginSuccess();
        // 如果成功登录，退出登录
        if(douban.isSuccess){
            douban.logout();
        }
    }

    @Test(priority = 1, description = "什么都不输入" )
    public void testLogin_null(){
        //username,passWord一定要与数据表中的字段完全一致
        LoginDouban_co douban = new LoginDouban_co(driver);
        // 进入登录界面
        douban.goToLoginPage(host);
        // 清空输入框
        douban.clearupInput();
        // 判断登录按钮是否可以被点击（期望不可以）
        new IsLoginBtnClickable(driver);
    }


    @DataProvider
    public Object[][] getCSVData() throws IOException {
        String csvfile = properties.getProperty("LoginTest.csvfile.testcaseFailed");
        System.out.println("csvfile:"+csvfile);
        List<Map<String, String>> result = getData(csvfile);
        Object[][] files = new Object[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            files[i] = new Object[]{result.get(i)};
        }
        return files;
    }

    @DataProvider
    public static Object[][] mysqlMethod() throws SQLException, ClassNotFoundException {
        String sql = properties.getProperty("LoginTest.mySql.testcaseFailed");
        String url = properties.getProperty("LoginTest.JdbcUrl.testcaseFailed");
        List<Map<String, String>> result = getDataList(url, sql);
        Object[][] files = new Object[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            files[i] = new Object[]{result.get(i)};
        }
        return files;
    }

    public List<Map<String, String>> getData(String filePath){
        List<Map<String, String>> list=new ArrayList<Map<String, String>>();;
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(filePath);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream);
            BufferedReader br = new BufferedReader(inputStreamReader);
            // 读取csv文件中的值然后存储到一个map中，这样不会占用空间吗
            for (String line = br.readLine(); line != null; line = br.readLine()) {
                Map<String, String> map = new HashMap<>();
                String key=line.split(",")[0];
                String value=line.split(",")[1];
                map.put("username",key);
                map.put("passWord",value);
                list.add(map);
            }
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;

    }
}
