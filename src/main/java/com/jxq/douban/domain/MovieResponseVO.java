package com.jxq.douban.domain;

import java.util.List;

/**
 * @Auther: jx
 * @Date: 2018/7/13 18:01
 * @Description:
 */

// 定义的是返回数据的响应体格式以及定义接收响应数据的方法
public class MovieResponseVO {
    // 普通豆瓣搜素返回数据的响应体
    private List<String> tags;
    public List<String> getTags() {
        return tags;
    }
    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    // 豆瓣音乐搜索返回数据的响应体
    private int count;
    private int total;
    private int start;
    private List<String> musics;
    public  int getCount(){return count;}
    public void setCount(int count){this.count = count;}//这个步骤绝对不能省！虽然我不知道它是怎么调用的，但是！！如果省了就取不到count的值了
    public int getTotal(){return total;}
    public void setTotal(int total){this.total = total;}
    public int getStart(){return start;}
    public void setStart(int start){this.start = start;}
    public List<String> getMusics() {
        return musics;
    }
    public void setMusics(List<String> musics) {this.musics = musics;}

    // 有道翻译响应体
    private String type;
    private int errorCode;
    private int elapsedTime;
    private List<List> translateResult;
    public String getType(){return type;}
    public void setType(String type){this.type = type;}
    public int getErrorCode(){return errorCode;}
    public void setErrorCode(int errorCode){this.errorCode = errorCode;}
    public int getElapsedTime(){return elapsedTime;}
    public void setElapsedTime(int elapsedTime){this.elapsedTime = elapsedTime;}
    public List<List> getTranslateResult(){return translateResult;}
    public void setTranslateResult(List<List> translateResult){this.translateResult = translateResult;}

}
