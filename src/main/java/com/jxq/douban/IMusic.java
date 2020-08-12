package com.jxq.douban;

import com.jxq.douban.domain.MovieResponseVO;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface IMusic {
    // 请求方法 + Url
    @GET("search")
    //定义接收响应体的方法
    Call<MovieResponseVO> searchMusic(@Query("q") String q,
                                      @Query("start") int start,
                                      @Query("count") int count);
}

