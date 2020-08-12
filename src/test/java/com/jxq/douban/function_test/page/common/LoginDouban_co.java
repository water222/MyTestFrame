package com.jxq.douban.function_test.page.common;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginDouban_co {
    protected WebDriver driver;
    protected String host;
    protected String username;
    protected String password;
    public boolean isSuccess = false;

    public LoginDouban_co(WebDriver driver){
        this.driver = driver;
    }

    // 进入豆瓣登录页面，注意需要切换到子框架中
    public void goToLoginPage(String host){
        driver.get(host);
        driver.switchTo().frame(0);//切换到子框架中,有三种切换方法，根据具体情况使用
        driver.findElement(By.xpath("/html/body/div[1]/div[1]/ul[1]/li[2]")).click();// 执行点击密码登录
    }

    //输入用户名和密码（无验证码），输入之前输入框要进行清空。
    public void inputUserPwd(String username, String password){
        //定位账户密码输入框，先清空再填写
        WebElement input1 = driver.findElement(By.xpath("//*[@id=\"username\"]"));
        input1.clear();
        input1.sendKeys(username);
        WebElement input2 = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        input2.clear();
        input2.sendKeys(password);
    }

    // 点击登录按钮
    public void clickLoginButton(){
        // 找到登录按钮并点击
        driver.findElement(By.cssSelector("body > div.account-body.login-wrap.login-start.account-anonymous " +
                "> div.account-tabcon-start >" +
                " div.account-form > div.account-form-field-submit > a")).click();
    }

    // 验证码功能(目前是直接手动...)
    public void varityCode(){

    }

    // 验证是否登录成功，如果失败是否会有错误提醒信息。
    public void varifyIsLoginSuccess(){
        // 此处应该返回一个值以供判断登录操作是否成功:使用等待机制，判断"我的豆瓣"是否可以被点击，如果可以点击则成功，否则失败，失败后再次点击判断是否有错误提示
        // 等待时间的设置一定要合理
        try {
            new WebDriverWait(driver, 3).until(
                    ExpectedConditions.elementToBeClickable(
                            By.cssSelector("#db-nav-sns > div > div > div.nav-items > ul > li:nth-child(2) > a")
                    )
            );
            this.isSuccess = true;
        }catch (Exception e){
            //再点击一次登录，为了获得错误提示信息
            driver.findElement(By.cssSelector("body > div.account-body.login-wrap.login-start.account-anonymous > " +
                    "div.account-tabcon-start > div.account-form > div.account-form-field-submit > a")).click();
            // 获取页面的错误提示信息
            new WebDriverWait(driver, 3).until(
                    ExpectedConditions.textToBe(
                            By.cssSelector("body > div.account-body.login-wrap.login-start.account-anonymous " +
                                    "> div.account-tabcon-start > div.account-form > div.account-form-error > span"),
                            "用户名或密码错误")
            );
        }
    }

    public void clearupInput(){
        //定位账户密码输入框，先清空再填写
        WebElement input1 = driver.findElement(By.xpath("//*[@id=\"username\"]"));
        input1.clear();
        WebElement input2 = driver.findElement(By.xpath("//*[@id=\"password\"]"));
        input2.clear();
    }

    public void logout(){
        // 成功登录之后退出(这里不符合使用下拉框的条件)
        driver.findElement(By.cssSelector("#db-global-nav > div > div.top-nav-info >" +
                " ul > li.nav-user-account > a > span:nth-child(1)")).click(); // 首先找到water的帐户
        driver.findElement(By.cssSelector("#db-global-nav > div > div.top-nav-info > ul > " +
                "li.nav-user-account.more-active > div > table > tbody > tr:nth-child(5) > td > a")).click();
    }
}
