package com.jxq.douban;

import com.jxq.douban.domain.MovieResponseVO;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * @Auther: jx
 * @Date: 2018/7/13 17:44
 * @Description: 豆瓣查询电影分类接口
 */
// 创建用于描述网络请求的接口
public interface ISearch {
//    采用 ‘注解’描述网络请求参数 和配置网络请求参数
    // 请求方法 + Url。这里为什么使用j不太明白？应该是这个接口所对应的网址吧
    @GET("j/search_tags")
    // 调用处理响应体的方法
    Call<MovieResponseVO> searchTags(@Query("type") String type, @Query("source") String source);
}

