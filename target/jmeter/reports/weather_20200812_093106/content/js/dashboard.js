/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.59154929577464, "KoPercent": 1.408450704225352};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9444444444444444, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/ip/-64"], "isController": false}, {"data": [0.0, 500, 1500, ""], "isController": true}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-62"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-63"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-66"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/selectCityBtnCur.png-46"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/cx_new.png-50"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-65"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-74"], "isController": false}, {"data": [1.0, 500, 1500, "/m2/i/favicon.ico-69"], "isController": false}, {"data": [1.0, 500, 1500, "/-15"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/loading.gif-47"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-71"], "isController": false}, {"data": [1.0, 500, 1500, "/-13"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42"], "isController": false}, {"data": [0.0, 500, 1500, "/1.gif-54"], "isController": false}, {"data": [1.0, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/-14"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/weixin.png-49"], "isController": false}, {"data": [1.0, 500, 1500, "/-7"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-61"], "isController": false}, {"data": [1.0, 500, 1500, "/c/weather2015/index/main_0814.css-6"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/publicHead.js-55"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/my-head.png-22"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37"], "isController": false}, {"data": [1.0, 500, 1500, "/webdig.js-53"], "isController": false}, {"data": [1.0, 500, 1500, "/j/jquery-1.8.2.js-57"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2014/rili.js-9"], "isController": false}, {"data": [1.0, 500, 1500, "/i/news/right-d13.png-60"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-17"], "isController": false}, {"data": [1.0, 500, 1500, "/chinasosearch/chinaso-weather1.html-51"], "isController": false}, {"data": [1.0, 500, 1500, "/ma.gif-68"], "isController": false}, {"data": [1.0, 500, 1500, "/weather2018/cy/pc/index/1.png-75"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26"], "isController": false}, {"data": [1.0, 500, 1500, "/index_around_2017/101040100.html-70"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0"], "isController": false}, {"data": [1.0, 500, 1500, "/j/m_event.js-56"], "isController": false}, {"data": [1.0, 500, 1500, "/j/version.js-16"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30"], "isController": false}, {"data": [1.0, 500, 1500, "/i/ucenter/pc/email.png-20"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/index/main_0814.js-12"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23"], "isController": false}, {"data": [1.0, 500, 1500, "/dingzhi/101040100.html-72"], "isController": false}, {"data": [1.0, 500, 1500, "/js/v1/wa.js-58"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/29/1593388736823054275.jpg-27"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/page_flip.png-48"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/slhx.png-52"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/icon-hui.png-67"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35"], "isController": false}, {"data": [1.0, 500, 1500, "/weather_index/101040100.html-73"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 71, 1, 1.408450704225352, 194.4084507042252, 0, 1441, 473.99999999999994, 668.399999999997, 1441.0, 5.49025672749768, 151.01294572088617, 2.1212973389653573], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/ip/-64", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 16.393442622950822, 6.515753073770492, 5.443135245901639], "isController": false}, {"data": ["", 1, 1, 100.0, 12866.0, 12866, 12866, 12866.0, 12866.0, 12866.0, 0.077724234416291, 151.13424250446914, 2.0019303542281985], "isController": true}, {"data": ["/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", 1, 0, 0.0, 433.0, 433, 433, 433.0, 433.0, 433.0, 2.3094688221709005, 228.2427287817552, 0.9201789838337182], "isController": false}, {"data": ["/ip/-62", 1, 0, 0.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 10.526315789473683, 4.183799342105263, 3.495065789473684], "isController": false}, {"data": ["/ip/-63", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 15.625, 6.2103271484375, 5.18798828125], "isController": false}, {"data": ["/ip/-66", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 7.360387731481482, 6.148726851851852], "isController": false}, {"data": ["/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", 1, 0, 0.0, 1254.0, 1254, 1254, 1254.0, 1254.0, 1254.0, 0.7974481658692185, 60.80542264752791, 0.3153969796650718], "isController": false}, {"data": ["/i/weather2017/selectCityBtnCur.png-46", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 121.41927083333334, 23.502604166666668], "isController": false}, {"data": ["/i/weather2017/cx_new.png-50", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 126.65758634868422, 4.5101768092105265], "isController": false}, {"data": ["/gsorganizationvalsha2g2-65", 1, 0, 0.0, 44.0, 44, 44, 44.0, 44.0, 44.0, 22.727272727272727, 53.93288352272727, 9.943181818181818], "isController": false}, {"data": ["/travel_rank/3A10104.html-74", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 9.09090909090909, 7.599431818181818, 3.1871448863636362], "isController": false}, {"data": ["/m2/i/favicon.ico-69", 1, 0, 0.0, 34.0, 34, 34, 34.0, 34.0, 34.0, 29.41176470588235, 83.69715073529412, 9.018841911764705], "isController": false}, {"data": ["/-15", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 118.05555555555557, 45.8984375], "isController": false}, {"data": ["/i/weather2015/index/loading.gif-47", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 8.264462809917356, 17.158445247933884, 2.8893336776859506], "isController": false}, {"data": ["/travel_rank/3A10104.html-71", 1, 0, 0.0, 175.0, 175, 175, 175.0, 175.0, 175.0, 5.714285714285714, 4.776785714285714, 2.0033482142857144], "isController": false}, {"data": ["/-13", 1, 0, 0.0, 37.0, 37, 37, 37.0, 37.0, 37.0, 27.027027027027028, 28.900971283783786, 11.164484797297298], "isController": false}, {"data": ["/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", 1, 0, 0.0, 350.0, 350, 350, 350.0, 350.0, 350.0, 2.857142857142857, 197.0005580357143, 1.1383928571428572], "isController": false}, {"data": ["/1.gif-54", 1, 1, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["/-5", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 10.416666666666666, 225.20955403645834, 3.90625], "isController": false}, {"data": ["/-14", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 59.08203125000001, 22.94921875], "isController": false}, {"data": ["/i/weather2015/index/weixin.png-49", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 19.230769230769234, 407.2829026442308, 6.704477163461539], "isController": false}, {"data": ["/-7", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 70.8984375, 27.5390625], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", 1, 0, 0.0, 486.0, 486, 486, 486.0, 486.0, 486.0, 2.05761316872428, 8.650414737654321, 1.7260641718106997], "isController": false}, {"data": ["/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 4.672897196261682, 320.1162748247664, 1.861857476635514], "isController": false}, {"data": ["/ip/-61", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 5.161830357142858, 4.312094155844156], "isController": false}, {"data": ["/c/weather2015/index/main_0814.css-6", 1, 0, 0.0, 48.0, 48, 48, 48.0, 48.0, 48.0, 20.833333333333332, 244.42545572916666, 7.62939453125], "isController": false}, {"data": ["/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", 1, 0, 0.0, 187.0, 187, 187, 187.0, 187.0, 187.0, 5.347593582887701, 337.4362884358289, 2.115015040106952], "isController": false}, {"data": ["/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", 1, 0, 0.0, 876.0, 876, 876, 876.0, 876.0, 876.0, 1.141552511415525, 109.82203374714612, 0.4514929366438356], "isController": false}, {"data": ["/j/weather2015/publicHead.js-55", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 103.89539930555556, 6.293402777777778], "isController": false}, {"data": ["/i/weather2015/user/my-head.png-22", 1, 0, 0.0, 170.0, 170, 170, 170.0, 170.0, 170.0, 5.88235294117647, 11.03515625, 2.05078125], "isController": false}, {"data": ["/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 3.9840637450199203, 293.7702315737052, 1.5757283366533865], "isController": false}, {"data": ["/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 5.649717514124294, 287.159030720339, 2.2345074152542375], "isController": false}, {"data": ["/webdig.js-53", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 4.878048780487805, 22.718178353658537, 1.7578125], "isController": false}, {"data": ["/j/jquery-1.8.2.js-57", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 3.6900369003690034, 121.55500461254611, 1.2576395295202951], "isController": false}, {"data": ["/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 586.2196180555555, 8.919270833333334], "isController": false}, {"data": ["/j/weather2014/rili.js-9", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 170.67307692307693, 25.916466346153847], "isController": false}, {"data": ["/i/news/right-d13.png-60", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 20.377604166666668, 7.530381944444445], "isController": false}, {"data": ["/gsorganizationvalsha2g2-17", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 28.49679969879518, 5.271084337349397], "isController": false}, {"data": ["/chinasosearch/chinaso-weather1.html-51", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 52.933673469387756, 9.14779974489796], "isController": false}, {"data": ["/ma.gif-68", 1, 0, 0.0, 46.0, 46, 46, 46.0, 46.0, 46.0, 21.73913043478261, 14.032778532608695, 11.527683423913043], "isController": false}, {"data": ["/weather2018/cy/pc/index/1.png-75", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 45.8251953125, 9.7900390625], "isController": false}, {"data": ["/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", 1, 0, 0.0, 1441.0, 1441, 1441, 1441.0, 1441.0, 1441.0, 0.6939625260235947, 221.46824579285217, 0.2751452984038862], "isController": false}, {"data": ["/index_around_2017/101040100.html-70", 1, 0, 0.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 7.352941176470588, 6.160960477941176, 2.6352826286764706], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", 1, 0, 0.0, 297.0, 297, 297, 297.0, 297.0, 297.0, 3.3670033670033668, 12.014678030303031, 1.4927925084175084], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 5.319148936170213, 3.381607380319149, 2.103764960106383], "isController": false}, {"data": ["/j/m_event.js-56", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 10.445510284810126, 4.252373417721519], "isController": false}, {"data": ["/j/version.js-16", 1, 0, 0.0, 105.0, 105, 105, 105.0, 105.0, 105.0, 9.523809523809526, 3.4877232142857144, 3.236607142857143], "isController": false}, {"data": ["/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 5.025125628140704, 280.56297110552765, 2.0021984924623113], "isController": false}, {"data": ["/i/ucenter/pc/email.png-20", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 120.58863146551724, 11.752424568965516], "isController": false}, {"data": ["/j/weather2015/index/main_0814.js-12", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 8.264462809917356, 350.2792484504132, 2.840909090909091], "isController": false}, {"data": ["/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", 1, 0, 0.0, 530.0, 530, 530, 530.0, 530.0, 530.0, 1.8867924528301887, 120.03795695754717, 0.7480837264150944], "isController": false}, {"data": ["/dingzhi/101040100.html-72", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 14.705882352941176, 7.697610294117647, 5.126953125], "isController": false}, {"data": ["/js/v1/wa.js-58", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 8.849557522123893, 86.74986172566372, 2.9815403761061945], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", 1, 0, 0.0, 337.0, 337, 337, 337.0, 337.0, 337.0, 2.967359050445104, 1.8835775222551927, 1.1707158753709197], "isController": false}, {"data": ["/images/cn/index/2020/06/29/1593388736823054275.jpg-27", 1, 0, 0.0, 186.0, 186, 186, 186.0, 186.0, 186.0, 5.376344086021506, 98.01852318548387, 1.9898773521505377], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", 1, 0, 0.0, 400.0, 400, 400, 400.0, 400.0, 400.0, 2.5, 229.072265625, 0.99609375], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 8.695652173913043, 31.020720108695652, 3.846807065217391], "isController": false}, {"data": ["/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 8.130081300813009, 266.2045858739837, 3.215510670731707], "isController": false}, {"data": ["/i/weather2015/index/page_flip.png-48", 1, 0, 0.0, 20.0, 20, 20, 20.0, 20.0, 20.0, 50.0, 99.462890625, 17.578125], "isController": false}, {"data": ["/i/weather2015/index/slhx.png-52", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 140.25297619047618, 16.508556547619047], "isController": false}, {"data": ["/i/weather2015/user/icon-hui.png-67", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 39.782072368421055, 9.200246710526317], "isController": false}, {"data": ["/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", 1, 0, 0.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 10.526315789473683, 289.0419407894737, 4.163240131578947], "isController": false}, {"data": ["/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", 1, 0, 0.0, 479.0, 479, 479, 479.0, 479.0, 479.0, 2.08768267223382, 99.63180127870564, 0.8318110647181629], "isController": false}, {"data": ["/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", 1, 0, 0.0, 191.0, 191, 191, 191.0, 191.0, 191.0, 5.235602094240838, 230.46875, 2.0860602094240837], "isController": false}, {"data": ["/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", 1, 0, 0.0, 207.0, 207, 207, 207.0, 207.0, 207.0, 4.830917874396135, 297.5401947463768, 1.9106657608695654], "isController": false}, {"data": ["/weather_index/101040100.html-73", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 14.084507042253522, 34.771126760563384, 4.992847711267606], "isController": false}, {"data": ["/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", 1, 0, 0.0, 211.0, 211, 211, 211.0, 211.0, 211.0, 4.739336492890995, 220.2356709123223, 1.888329383886256], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 4.237288135593221, 335.6602555614407, 1.6882944915254239], "isController": false}, {"data": ["/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", 1, 0, 0.0, 493.0, 493, 493, 493.0, 493.0, 493.0, 2.028397565922921, 283.8944440922921, 0.8042279411764706], "isController": false}, {"data": ["/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 4.608294930875576, 223.38529665898616, 1.8361175115207373], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", 1, 0, 0.0, 454.0, 454, 454, 454.0, 454.0, 454.0, 2.2026431718061676, 9.25583356277533, 1.8434230451541849], "isController": false}, {"data": ["/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", 1, 0, 0.0, 153.0, 153, 153, 153.0, 153.0, 153.0, 6.5359477124183005, 206.4248876633987, 2.610549428104575], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Malformed escape pair at index 56: http:\/\/stat.chinaso.com\/1.gif?z=1&amp;a=17304382ca8&amp;b=domo8-%u56FD%u641C%u63A8%u5E7F&amp;B=UTF-8&amp;c=http%3A\/\/promotion.chinaso.com\/chinasosearch\/chinaso-weather1.html%3F_wdxid%3D000000000000000000000000000000000000000000%26_wdc%3DC_3310898%26_wdt%3D012%26&amp;d=http%3A\/\/www.weather.com.cn\/&amp;e=0&amp;f=0&amp;H=promotion.chinaso.com&amp;E=1&amp;r=3e3668843cb28554&amp;s=0&amp;t=0&amp;u=1&amp;i=zh-CN&amp;j=0&amp;k=1366x768&amp;l=24&amp;m=32.0%20r0*&amp;n=&amp;o=8", 1, 100.0, 1.408450704225352], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 71, 1, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Malformed escape pair at index 56: http:\/\/stat.chinaso.com\/1.gif?z=1&amp;a=17304382ca8&amp;b=domo8-%u56FD%u641C%u63A8%u5E7F&amp;B=UTF-8&amp;c=http%3A\/\/promotion.chinaso.com\/chinasosearch\/chinaso-weather1.html%3F_wdxid%3D000000000000000000000000000000000000000000%26_wdc%3DC_3310898%26_wdt%3D012%26&amp;d=http%3A\/\/www.weather.com.cn\/&amp;e=0&amp;f=0&amp;H=promotion.chinaso.com&amp;E=1&amp;r=3e3668843cb28554&amp;s=0&amp;t=0&amp;u=1&amp;i=zh-CN&amp;j=0&amp;k=1366x768&amp;l=24&amp;m=32.0%20r0*&amp;n=&amp;o=8", 1, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/1.gif-54", 1, 1, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Malformed escape pair at index 56: http:\/\/stat.chinaso.com\/1.gif?z=1&amp;a=17304382ca8&amp;b=domo8-%u56FD%u641C%u63A8%u5E7F&amp;B=UTF-8&amp;c=http%3A\/\/promotion.chinaso.com\/chinasosearch\/chinaso-weather1.html%3F_wdxid%3D000000000000000000000000000000000000000000%26_wdc%3DC_3310898%26_wdt%3D012%26&amp;d=http%3A\/\/www.weather.com.cn\/&amp;e=0&amp;f=0&amp;H=promotion.chinaso.com&amp;E=1&amp;r=3e3668843cb28554&amp;s=0&amp;t=0&amp;u=1&amp;i=zh-CN&amp;j=0&amp;k=1366x768&amp;l=24&amp;m=32.0%20r0*&amp;n=&amp;o=8", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
