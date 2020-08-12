package com.jxq.douban.data;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.sql.*;
import java.util.*;

// 数据库操作工具

public class Mysql {

    static Connection conn = null;

    public static String driverClassName = "com.mysql.cj.jdbc.Driver";
    public static String url = "jdbc:mysql://localhost:3306/douban?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=False";
    public static String username = "root";
    public static String password = "bing1996";


    /**
     * 执行sql
     *
     * @param jdbcUrl 数据库配置连接
     * @param sql     sql语句
     * @return
     */
    public static List<Map<String, String>> getDataList(String jdbcUrl, String sql) throws ClassNotFoundException, SQLException {
        List<Map<String, String>> paramList = new ArrayList<Map<String, String>>();
        Map<String, String> param = new HashMap<>();
        Statement stmt = null;
        // 注册 JDBC 驱动, 利用反射机制间接加载数据库驱动(共有两种数据库驱动方式),该驱动方式有固定六步骤
        Class.forName(driverClassName);
        // 打开链接
        conn = DriverManager.getConnection(jdbcUrl, username, password);
        // 执行查询，使用PreparedStatement是为了防止sql注入
        stmt = conn.createStatement();
        ResultSet rs;
        rs = stmt.executeQuery(sql);
        String columns[] = {"username", "passWord", "remark"};
        // 展开结果集数据库，这段操作不是很清楚？
        while (rs.next()) {
            Map<String, String> map = new LinkedHashMap<String, String>();
            for (int i = 0; i < columns.length; i++) {
//                System.out.println("length:"+columns.length);
//                System.out.println("columns[i]:"+columns[i]);
                String cellData = rs.getString(columns[i]);//columns[i]表示的是列名，即字段
                map.put(columns[i], cellData);
            }
            paramList.add(map);
        }
        // 完成后关闭
        rs.close();
        stmt.close();
        conn.close();
        return paramList;
    }

    @DataProvider
    public static Object[][] dbDataMethod() throws SQLException, ClassNotFoundException {
        String sql = "SELECT * FROM `account`;";
        List<Map<String, String>> result = getDataList(url, sql);
        Object[][] files = new Object[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            files[i] = new Object[]{result.get(i)};
        }
        return files;
    }

//    @Test(dataProvider = "dbDataMethod")
//    public  void testcase1(Map<?, ?> param) throws Exception {
//        System.out.println(param.get("username") + "\t" + param.get("passWord") + "\t" + param.get("remark"));
//    }
}
