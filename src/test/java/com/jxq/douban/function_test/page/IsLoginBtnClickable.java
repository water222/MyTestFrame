package com.jxq.douban.function_test.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

public class IsLoginBtnClickable {
    public IsLoginBtnClickable(WebDriver driver){
        // 延时判断“豆瓣登录是否可以被点击”
        WebElement btn = driver.findElement(By.cssSelector("body > div.account-body.login-wrap.login-start.account-anonymous > " +
                "div.account-tabcon-start > div.account-form > div.account-form-field-submit > a"));
        Assert.assertEquals(btn.isEnabled(), true);
    }

}
