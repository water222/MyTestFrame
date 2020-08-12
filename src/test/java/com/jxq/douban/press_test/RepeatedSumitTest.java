package com.jxq.douban.press_test;

import com.jxq.douban.function_test.common.Getparam;
import com.jxq.douban.function_test.page.common.LoginDouban_co;
import com.jxq.douban.press_test.page.RefreshPage;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.Test;

public class RepeatedSumitTest extends Getparam {
    private LoginDouban_co douban;

    @Test(description = "首先成功登录到豆瓣中——多次刷新浏览器" )
    public void testlogin() throws Exception {
        //获取正确的账户、密码
        String user = properties.getProperty("LoginTest.login_user.testcaseSuccess");
        String pwd = properties.getProperty("LoginTest.login_pwd.testcaseSuccess");
        douban = new LoginDouban_co(driver);
        // 进入登录页面
        douban.goToLoginPage(host);
        // 填入正确的信息
        douban.inputUserPwd(user, pwd);
        //点击登录按钮
        douban.clickLoginButton();
        //确认登录是否成功
        douban.varifyIsLoginSuccess();
    }

    //报错①： stale element reference: element is not attached to the page document
    @Test(dependsOnMethods = "testlogin", threadPoolSize = 3, invocationCount = 6, timeOut = 1000, description = "多次刷新页面重复提交表单" )
    public void testRefreshPage() throws Exception {
        //多次刷新页面
        new RefreshPage(driver);
        // 刷新页面之后确定页面元素是否出现了，为了避免刷新太快无法定位元素
        Thread.sleep(5);

    }

    @Override
    @AfterSuite
    public void afterSuite(){
        //确认多次刷新页面后是否还在原页面
        douban.varifyIsLoginSuccess();
        douban.logout();
        driver.close();
    }

}
