package com.jxq.douban;

import com.jxq.common.HttpBase;
import com.jxq.douban.domain.MovieResponseVO;
import com.jxq.douban.domain.Translate;
import retrofit2.Call;
import retrofit2.Response;

import java.io.IOException;

/**
 * @Auther: jx
 * @Date: 2018/7/13 17:47
 * @Description:
 */
public class HttpSearch extends HttpBase {

    private ISearch iSearch; // 普通搜索接口
    private IMusic iMusic;// 电影搜索接口
    private Translate Trans;

    public HttpSearch(String host) {
        super(host);
        iSearch = super.create(ISearch.class); //创建豆瓣普通请求接口实例
        iMusic = super.create(IMusic.class); //创建豆瓣电影请求接口实例
        Trans = super.create(Translate.class);
    }

    // 普通豆瓣搜索接口
    public Response<MovieResponseVO> searchTags(String type, String source) throws IOException {
        // 对发送请求进行封装
        Call<MovieResponseVO> call = iSearch.searchTags(type, source);
        // 发送网络请求
        return call.execute();
    }

    // 电影搜索接口
    public Response<MovieResponseVO> searchMusic(String q, int start, int count) throws IOException {
        // 对发送请求进行封装
        Call<MovieResponseVO> call = iMusic.searchMusic(q, start, count);
        // 发送网络请求
        return call.execute();
    }

    // 有道翻译接口
    public Response<MovieResponseVO> translate(String src) throws IOException {
        // 对发送请求进行封装
        Call<MovieResponseVO> call = Trans.translate(src);
        // 发送网络请求
        return call.execute();
    }


}
