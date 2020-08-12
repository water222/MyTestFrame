package com.jxq.douban.function_test.page.common;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

public class Comments {

    private WebDriver driver;

    public Comments(WebDriver driver){
        this.driver = driver;
    }

    //增加动态
    public void addComment(String content){

        // 等待页面加载,注意需要等待加载的元素是要执行文本输入的元素，而不是“分享生活的点滴”对应的id！！
        WebElement in1 = new WebDriverWait(driver, 10).until(
                ExpectedConditions.presenceOfElementLocated(By.id("isay-cont")));
        in1.sendKeys(content);
        //找到发布按钮并点击
        driver.findElement(By.id("isay-submit")).click();
        // 延时等待发布的动态出现在页面中
        WebElement in2 = new WebDriverWait(driver, 5).until(
                ExpectedConditions.presenceOfElementLocated(
                        By.cssSelector("#statuses > div.stream-items > div:nth-child(1)" +
                                " > div > div > div.bd.sns > div.status-saying > blockquote > p")));
        Assert.assertEquals(in2.getText(), content);
    }

    //减少动态，这里依赖于上一条增加动态
    public void deleteComment(String content) throws InterruptedException {
        //找到删除按钮并点击
        driver.findElement(By.cssSelector("#statuses > div.stream-items > div > div > " +
                "div > div.bd.sns > div.actions > a.btn.btn-action-reply-delete")).click();
        // 使用到弹出处理，完成“确认删除”操作
        Alert a = driver.switchTo().alert();
        System.out.println("Alert content:"+a.getText());
        a.accept();
        //刷新一下再查找
        driver.navigate().refresh();
        Thread.sleep(5);
        // 如何判断删除成功
        WebElement text = driver.findElement(By.cssSelector("#statuses > div.stream-items > div:nth-child(1)" +
                " > div > div > div.bd.sns > div.status-saying > blockquote > p"));
        System.out.println("第一条动态的内容："+text.getText());
        System.out.println("第一条动态的内容应该不是："+content);
        Assert.assertNotEquals(text.getText(), content);
    }
}

