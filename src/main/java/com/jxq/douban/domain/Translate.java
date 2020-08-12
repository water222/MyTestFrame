package com.jxq.douban.domain;

import retrofit2.Call;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;
import retrofit2.http.Field;

public interface Translate {
    // 请求方法 + Url
    @POST("translate?doctype=json&jsonversion=&type=&keyfrom=&model=&mid=&imei=&vendor=&screen=&ssid=&network=&abtest=")
    //定义接收响应体的方法@FormUrlEncoded+@Field配合使用在POST提交表单中
    @FormUrlEncoded
    Call<MovieResponseVO> translate(@Field("i") String src);

}
