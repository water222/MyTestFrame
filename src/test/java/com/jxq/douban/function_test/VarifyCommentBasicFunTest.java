package com.jxq.douban.function_test;

import com.jxq.douban.function_test.common.Getparam;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.jxq.douban.function_test.page.common.LoginDouban_co;
import com.jxq.douban.function_test.page.common.Comments;

public class VarifyCommentBasicFunTest extends Getparam {

    private String content;

    @Test(description = "成功登录到豆瓣中，并发表第一条动态")
    public void addNotesTest(){
        String user = properties.getProperty("LoginTest.login_user.testcaseSuccess");
        String pwd = properties.getProperty("LoginTest.login_pwd.testcaseSuccess");
        LoginDouban_co douban = new LoginDouban_co(driver);
        // 进入登录页面
        douban.goToLoginPage(host);
        // 输入正确的登录信息
        douban.inputUserPwd(user, pwd);
        //点击登录按钮
        douban.clickLoginButton();
        //增加评论
        this.content = "自动化测试中...";
        Comments comment = new Comments(driver);
        comment.addComment(content);
    }

    @Test(dependsOnMethods = "addNotesTest", description = "依赖于上一个方法，删除最新的动态，同时必须保证成功删除以后豆瓣中至少还有两条动态。")
    public void removeNotesTest() throws InterruptedException {
        Comments comment = new Comments(driver);
        // 删除最新的动态（该测试用例成功率不稳定！！！查找原因）
        comment.deleteComment(content);
        // 退出豆瓣登录
        LoginDouban_co douban = new LoginDouban_co(driver);
        douban.logout();
    }

    @AfterSuite
    public void afterSuite(){
        driver.close();
    }
}
