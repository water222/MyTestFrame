package com.jxq.douban.press_test;

import org.testng.annotations.AfterSuite;


import com.jxq.douban.function_test.common.Getparam;
import com.jxq.douban.function_test.page.common.LoginDouban_co;
import org.testng.annotations.Test;

public class RepeatedClickLoginBtnTest extends Getparam {
    private  LoginDouban_co douban;
    @Test(description = "首先进入登录界面并填写正确的账户密码——多次点击登录按钮")
   public void testlogin(){
       // 首先获得账户名+密码
       String user = properties.getProperty("LoginTest.login_user.testcaseSuccess");
       String pwd = properties.getProperty("LoginTest.login_pwd.testcaseSuccess");
       douban = new LoginDouban_co(driver);
       //进入登录页面
       douban.goToLoginPage(host);
       // 输入正确的登录信息
       douban.inputUserPwd(user, pwd);
   }

   @Test(dependsOnMethods = "testlogin", threadPoolSize = 3, invocationCount = 6, timeOut = 1000, description = "多次点击登录按钮，是否能成功登录")
    public void testRepeatedClick(){
        //点击登录按钮
       douban.clickLoginButton();
   }

   @Override
   @AfterSuite
   public void afterSuite(){
       //验证登录是否正确
       douban.varifyIsLoginSuccess();
       if(douban.isSuccess){
           douban.logout();
       }
       driver.close();
   }
}
