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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9444444444444444, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/ip/-64"], "isController": false}, {"data": [0.0, 500, 1500, ""], "isController": true}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-62"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-63"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-66"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/selectCityBtnCur.png-46"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/cx_new.png-50"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-65"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-74"], "isController": false}, {"data": [1.0, 500, 1500, "/m2/i/favicon.ico-69"], "isController": false}, {"data": [1.0, 500, 1500, "/-15"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/loading.gif-47"], "isController": false}, {"data": [0.0, 500, 1500, "/travel_rank/3A10104.html-71"], "isController": false}, {"data": [1.0, 500, 1500, "/-13"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42"], "isController": false}, {"data": [0.0, 500, 1500, "/1.gif-54"], "isController": false}, {"data": [0.5, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/-14"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/weixin.png-49"], "isController": false}, {"data": [1.0, 500, 1500, "/-7"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-61"], "isController": false}, {"data": [1.0, 500, 1500, "/c/weather2015/index/main_0814.css-6"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/publicHead.js-55"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/my-head.png-22"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37"], "isController": false}, {"data": [1.0, 500, 1500, "/webdig.js-53"], "isController": false}, {"data": [1.0, 500, 1500, "/j/jquery-1.8.2.js-57"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2014/rili.js-9"], "isController": false}, {"data": [1.0, 500, 1500, "/i/news/right-d13.png-60"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-17"], "isController": false}, {"data": [1.0, 500, 1500, "/chinasosearch/chinaso-weather1.html-51"], "isController": false}, {"data": [1.0, 500, 1500, "/ma.gif-68"], "isController": false}, {"data": [1.0, 500, 1500, "/weather2018/cy/pc/index/1.png-75"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26"], "isController": false}, {"data": [1.0, 500, 1500, "/index_around_2017/101040100.html-70"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0"], "isController": false}, {"data": [1.0, 500, 1500, "/j/m_event.js-56"], "isController": false}, {"data": [1.0, 500, 1500, "/j/version.js-16"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30"], "isController": false}, {"data": [1.0, 500, 1500, "/i/ucenter/pc/email.png-20"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/index/main_0814.js-12"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23"], "isController": false}, {"data": [1.0, 500, 1500, "/dingzhi/101040100.html-72"], "isController": false}, {"data": [1.0, 500, 1500, "/js/v1/wa.js-58"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/29/1593388736823054275.jpg-27"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/page_flip.png-48"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/slhx.png-52"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/icon-hui.png-67"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35"], "isController": false}, {"data": [0.5, 500, 1500, "/weather_index/101040100.html-73"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 71, 1, 1.408450704225352, 184.830985915493, 0, 6739, 152.8, 347.79999999999745, 6739.0, 5.46448087431694, 150.31764399580544, 2.1113381965289], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/ip/-64", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 10.216346153846153, 8.513621794871796], "isController": false}, {"data": ["", 1, 1, 100.0, 12926.0, 12926, 12926, 12926.0, 12926.0, 12926.0, 0.07736345350456444, 150.4390527086879, 1.9926377794754757], "isController": true}, {"data": ["/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 8.474576271186441, 837.4354475635594, 3.3765889830508478], "isController": false}, {"data": ["/ip/-62", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 9.534333881578947, 8.73766447368421], "isController": false}, {"data": ["/ip/-63", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 9.717987804878048, 8.098323170731707], "isController": false}, {"data": ["/ip/-66", 1, 0, 0.0, 42.0, 42, 42, 42.0, 42.0, 42.0, 23.809523809523807, 9.486607142857142, 7.905505952380952], "isController": false}, {"data": ["/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", 1, 0, 0.0, 152.0, 152, 152, 152.0, 152.0, 152.0, 6.578947368421052, 501.708984375, 2.602025082236842], "isController": false}, {"data": ["/i/weather2017/selectCityBtnCur.png-46", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 8.064516129032258, 14.656313004032258, 2.8430569556451615], "isController": false}, {"data": ["/i/weather2017/cx_new.png-50", 1, 0, 0.0, 227.0, 227, 227, 227.0, 227.0, 227.0, 4.405286343612335, 42.435297356828194, 1.510015143171806], "isController": false}, {"data": ["/gsorganizationvalsha2g2-65", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 15.625, 36.834716796875, 6.8359375], "isController": false}, {"data": ["/travel_rank/3A10104.html-74", 1, 0, 0.0, 64.0, 64, 64, 64.0, 64.0, 64.0, 15.625, 12.6800537109375, 5.4779052734375], "isController": false}, {"data": ["/m2/i/favicon.ico-69", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 36.1328125, 3.8815268987341773], "isController": false}, {"data": ["/-15", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 217.3828125, 82.6171875], "isController": false}, {"data": ["/i/weather2015/index/loading.gif-47", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 24.95528990963855, 4.212161144578313], "isController": false}, {"data": ["/travel_rank/3A10104.html-71", 1, 0, 0.0, 6739.0, 6739, 6739, 6739.0, 6739.0, 6739.0, 0.14838996883810654, 0.12056684968096157, 0.05202343634070337], "isController": false}, {"data": ["/-13", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 250.0, 275.390625, 103.271484375], "isController": false}, {"data": ["/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 8.547008547008549, 589.3930288461538, 3.4054487179487176], "isController": false}, {"data": ["/1.gif-54", 1, 1, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["/-5", 1, 0, 0.0, 747.0, 747, 747, 747.0, 747.0, 747.0, 1.3386880856760375, 29.004036981258366, 0.5020080321285141], "isController": false}, {"data": ["/-14", 1, 0, 0.0, 12.0, 12, 12, 12.0, 12.0, 12.0, 83.33333333333333, 92.12239583333333, 34.423828125], "isController": false}, {"data": ["/i/weather2015/index/weixin.png-49", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 278.4488075657895, 4.587273848684211], "isController": false}, {"data": ["/-7", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 90.9090909090909, 100.4971590909091, 37.55326704545455], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 53.85927610759494, 10.618571993670885], "isController": false}, {"data": ["/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", 1, 0, 0.0, 105.0, 105, 105, 105.0, 105.0, 105.0, 9.523809523809526, 652.3902529761905, 3.794642857142857], "isController": false}, {"data": ["/ip/-61", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 6.038411458333334, 5.533854166666667], "isController": false}, {"data": ["/c/weather2015/index/main_0814.css-6", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 10.0, 117.08984375, 3.662109375], "isController": false}, {"data": ["/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 788.8671875, 4.94384765625], "isController": false}, {"data": ["/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 7400.465745192308, 30.423677884615387], "isController": false}, {"data": ["/j/weather2015/publicHead.js-55", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 13.333333333333334, 74.7265625, 4.53125], "isController": false}, {"data": ["/i/weather2015/user/my-head.png-22", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 312.8255208333333, 58.10546875], "isController": false}, {"data": ["/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", 1, 0, 0.0, 150.0, 150, 150, 150.0, 150.0, 150.0, 6.666666666666667, 491.5234375, 2.63671875], "isController": false}, {"data": ["/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 7.518796992481203, 382.0929276315789, 2.9737429511278193], "isController": false}, {"data": ["/webdig.js-53", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 8.403361344537815, 39.13635766806723, 3.0281643907563027], "isController": false}, {"data": ["/j/jquery-1.8.2.js-57", 1, 0, 0.0, 176.0, 176, 176, 176.0, 176.0, 176.0, 5.681818181818182, 187.00617009943184, 1.9364790482954546], "isController": false}, {"data": ["/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 4402.180989583333, 66.89453125], "isController": false}, {"data": ["/j/weather2014/rili.js-9", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 12.195121951219512, 26.819740853658537, 4.108708079268292], "isController": false}, {"data": ["/i/news/right-d13.png-60", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 131.41741071428572, 48.409598214285715], "isController": false}, {"data": ["/gsorganizationvalsha2g2-17", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 17.857142857142858, 42.236328125, 7.8125], "isController": false}, {"data": ["/chinasosearch/chinaso-weather1.html-51", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 90.9090909090909, 235.08522727272728, 40.74928977272727], "isController": false}, {"data": ["/ma.gif-68", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 16.626602564102566, 13.596754807692308], "isController": false}, {"data": ["/weather2018/cy/pc/index/1.png-75", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 229.6142578125, 48.9501953125], "isController": false}, {"data": ["/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 5.649717514124294, 1803.0709304378531, 2.2400247175141246], "isController": false}, {"data": ["/index_around_2017/101040100.html-70", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 16.949152542372882, 14.267743644067798, 6.074549788135593], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 361.03515625, 44.3359375], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 9.34103260869565, 5.731997282608695], "isController": false}, {"data": ["/j/m_event.js-56", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 11.528862847222223, 4.665798611111112], "isController": false}, {"data": ["/j/version.js-16", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 9.003429878048781, 8.288871951219512], "isController": false}, {"data": ["/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 465.3238932291667, 3.3203125], "isController": false}, {"data": ["/i/ucenter/pc/email.png-20", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 435.6689453125, 42.6025390625], "isController": false}, {"data": ["/j/weather2015/index/main_0814.js-12", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 504.3480282738095, 4.092261904761904], "isController": false}, {"data": ["/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", 1, 0, 0.0, 153.0, 153, 153, 153.0, 153.0, 153.0, 6.5359477124183005, 415.875204248366, 2.5914011437908497], "isController": false}, {"data": ["/dingzhi/101040100.html-72", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 7.652168843283581, 5.203474813432836], "isController": false}, {"data": ["/js/v1/wa.js-58", 1, 0, 0.0, 44.0, 44, 44, 44.0, 44.0, 44.0, 22.727272727272727, 223.07794744318184, 7.657137784090909], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 13.513513513513514, 8.709881756756758, 5.331503378378379], "isController": false}, {"data": ["/images/cn/index/2020/06/29/1593388736823054275.jpg-27", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 9.174311926605505, 167.17137327981652, 3.3955705275229358], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", 1, 0, 0.0, 37.0, 37, 37, 37.0, 37.0, 37.0, 27.027027027027028, 2476.5625, 10.768581081081082], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", 1, 0, 0.0, 44.0, 44, 44, 44.0, 44.0, 44.0, 22.727272727272727, 81.87588778409092, 10.054154829545455], "isController": false}, {"data": ["/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 9.25925925925926, 303.26786747685185, 3.662109375], "isController": false}, {"data": ["/i/weather2015/index/page_flip.png-48", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 25.032140031645568, 4.450158227848101], "isController": false}, {"data": ["/i/weather2015/index/slhx.png-52", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 11.363636363636363, 33.413973721590914, 3.9395419034090913], "isController": false}, {"data": ["/i/weather2015/user/icon-hui.png-67", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 200.0, 300.9765625, 69.921875], "isController": false}, {"data": ["/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 704.3269230769231, 10.141225961538462], "isController": false}, {"data": ["/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 8.196721311475411, 391.25736424180326, 3.2658811475409837], "isController": false}, {"data": ["/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 415.3707252358491, 3.7588443396226414], "isController": false}, {"data": ["/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 8.264462809917356, 508.92626549586777, 3.2686596074380168], "isController": false}, {"data": ["/weather_index/101040100.html-73", 1, 0, 0.0, 529.0, 529, 529, 529.0, 529.0, 529.0, 1.890359168241966, 4.554214910207939, 0.670117556710775], "isController": false}, {"data": ["/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 7.194244604316547, 334.3778102517985, 2.8664568345323738], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 7.518796992481203, 595.6223566729323, 2.995770676691729], "isController": false}, {"data": ["/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", 1, 0, 0.0, 17.0, 17, 17, 17.0, 17.0, 17.0, 58.8235294117647, 8234.547334558823, 23.322610294117645], "isController": false}, {"data": ["/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", 1, 0, 0.0, 146.0, 146, 146, 146.0, 146.0, 146.0, 6.8493150684931505, 331.9509845890411, 2.72902397260274], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 35.39225260416667, 6.974283854166667], "isController": false}, {"data": ["/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 8.620689655172413, 272.35149515086204, 3.443224676724138], "isController": false}]}, function(index, item){
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
