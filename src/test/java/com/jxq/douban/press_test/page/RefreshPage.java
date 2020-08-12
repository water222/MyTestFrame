package com.jxq.douban.press_test.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.awt.*;
import java.awt.event.KeyEvent;
public class RefreshPage {
    // 参考博客:https://www.cnblogs.com/gyadmin/p/10448825.html
    // 选择右键后的菜单使用Robot来执行

    public RefreshPage(WebDriver driver) throws AWTException, InterruptedException {
        // 如何执行右键点击空白处:无法点击，只能选择一个不是link的元素
        Robot robot = new Robot();
        Actions action = new Actions(driver);
        //使用延时等待，避免该元素无法定位问题
        WebElement click_element = new WebDriverWait(driver, 3).until(
                ExpectedConditions.presenceOfElementLocated(
                        By.cssSelector("#content > div > div.aside > div.notify-mod > h2")
                )
        );
        System.out.println("click_element:"+click_element);
        action.contextClick(click_element).perform();//不输入内容，默认左上角元素
        robot.keyPress(KeyEvent.VK_DOWN);
        Thread.sleep(10);
        robot.keyPress(KeyEvent.VK_DOWN);
        Thread.sleep(10);
        // This is to release the down key, before this enter will not work
        robot.keyRelease(KeyEvent.VK_DOWN);
        Thread.sleep(3);
        robot.keyPress(KeyEvent.VK_ENTER);
    }
}
