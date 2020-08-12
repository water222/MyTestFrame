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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9583333333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/ip/-64"], "isController": false}, {"data": [0.0, 500, 1500, ""], "isController": true}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-62"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-63"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-66"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/selectCityBtnCur.png-46"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/cx_new.png-50"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-65"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-74"], "isController": false}, {"data": [1.0, 500, 1500, "/m2/i/favicon.ico-69"], "isController": false}, {"data": [1.0, 500, 1500, "/-15"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/loading.gif-47"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-71"], "isController": false}, {"data": [1.0, 500, 1500, "/-13"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42"], "isController": false}, {"data": [0.0, 500, 1500, "/1.gif-54"], "isController": false}, {"data": [1.0, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/-14"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/weixin.png-49"], "isController": false}, {"data": [1.0, 500, 1500, "/-7"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-61"], "isController": false}, {"data": [1.0, 500, 1500, "/c/weather2015/index/main_0814.css-6"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/publicHead.js-55"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/my-head.png-22"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37"], "isController": false}, {"data": [1.0, 500, 1500, "/webdig.js-53"], "isController": false}, {"data": [1.0, 500, 1500, "/j/jquery-1.8.2.js-57"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2014/rili.js-9"], "isController": false}, {"data": [1.0, 500, 1500, "/i/news/right-d13.png-60"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-17"], "isController": false}, {"data": [1.0, 500, 1500, "/chinasosearch/chinaso-weather1.html-51"], "isController": false}, {"data": [1.0, 500, 1500, "/ma.gif-68"], "isController": false}, {"data": [1.0, 500, 1500, "/weather2018/cy/pc/index/1.png-75"], "isController": false}, {"data": [0.5, 500, 1500, "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26"], "isController": false}, {"data": [1.0, 500, 1500, "/index_around_2017/101040100.html-70"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0"], "isController": false}, {"data": [1.0, 500, 1500, "/j/m_event.js-56"], "isController": false}, {"data": [1.0, 500, 1500, "/j/version.js-16"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30"], "isController": false}, {"data": [1.0, 500, 1500, "/i/ucenter/pc/email.png-20"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/index/main_0814.js-12"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23"], "isController": false}, {"data": [1.0, 500, 1500, "/dingzhi/101040100.html-72"], "isController": false}, {"data": [1.0, 500, 1500, "/js/v1/wa.js-58"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/29/1593388736823054275.jpg-27"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/page_flip.png-48"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/slhx.png-52"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/icon-hui.png-67"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35"], "isController": false}, {"data": [1.0, 500, 1500, "/weather_index/101040100.html-73"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 71, 1, 1.408450704225352, 110.00000000000001, 0, 568, 231.39999999999998, 277.3999999999994, 568.0, 9.39029228937971, 258.28922162247056, 3.6281731500462904], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/ip/-64", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 6.886449353448276, 5.724676724137931], "isController": false}, {"data": ["", 1, 1, 100.0, 7493.0, 7493, 7493, 7493.0, 7493.0, 7493.0, 0.13345789403443215, 259.51291517916724, 3.4374530812091284], "isController": true}, {"data": ["/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 6.289308176100629, 621.5605345911949, 2.505896226415094], "isController": false}, {"data": ["/ip/-62", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 8.151307397959183, 6.776147959183673], "isController": false}, {"data": ["/ip/-63", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 8.151307397959183, 6.776147959183673], "isController": false}, {"data": ["/ip/-66", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 7.536114386792453, 6.264740566037736], "isController": false}, {"data": ["/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", 1, 0, 0.0, 225.0, 225, 225, 225.0, 225.0, 225.0, 4.444444444444445, 338.88888888888886, 1.7578125], "isController": false}, {"data": ["/i/weather2017/selectCityBtnCur.png-46", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 259.765625, 50.362723214285715], "isController": false}, {"data": ["/i/weather2017/cx_new.png-50", 1, 0, 0.0, 31.0, 31, 31, 31.0, 31.0, 31.0, 32.25806451612903, 310.578377016129, 11.057207661290322], "isController": false}, {"data": ["/gsorganizationvalsha2g2-65", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 15.384615384615385, 39.00240384615385, 6.730769230769231], "isController": false}, {"data": ["/travel_rank/3A10104.html-74", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 12.403801305970148, 5.232625932835821], "isController": false}, {"data": ["/m2/i/favicon.ico-69", 1, 0, 0.0, 27.0, 27, 27, 27.0, 27.0, 27.0, 37.03703703703704, 105.03472222222223, 11.357060185185185], "isController": false}, {"data": ["/-15", 1, 0, 0.0, 12.0, 12, 12, 12.0, 12.0, 12.0, 83.33333333333333, 88.29752604166667, 34.423828125], "isController": false}, {"data": ["/i/weather2015/index/loading.gif-47", 1, 0, 0.0, 36.0, 36, 36, 36.0, 36.0, 36.0, 27.777777777777775, 57.59006076388889, 9.711371527777779], "isController": false}, {"data": ["/travel_rank/3A10104.html-71", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 10.259934413580247, 4.328221450617284], "isController": false}, {"data": ["/-13", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 27.418870192307693, 10.591947115384615], "isController": false}, {"data": ["/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", 1, 0, 0.0, 568.0, 568, 568, 568.0, 568.0, 568.0, 1.7605633802816902, 121.39118893045776, 0.701474471830986], "isController": false}, {"data": ["/1.gif-54", 1, 1, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["/-5", 1, 0, 0.0, 251.0, 251, 251, 251.0, 251.0, 251.0, 3.9840637450199203, 86.16705054780877, 1.4940239043824701], "isController": false}, {"data": ["/-14", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 26.938833841463413, 10.075266768292682], "isController": false}, {"data": ["/i/weather2015/index/weixin.png-49", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 16.129032258064516, 341.6393649193548, 5.623109879032258], "isController": false}, {"data": ["/-7", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 70.8984375, 27.5390625], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 11.627906976744185, 48.77134811046512, 9.754269622093023], "isController": false}, {"data": ["/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", 1, 0, 0.0, 191.0, 191, 191, 191.0, 191.0, 191.0, 5.235602094240838, 358.6489692408377, 2.0860602094240837], "isController": false}, {"data": ["/ip/-61", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 6.656901041666667, 5.533854166666667], "isController": false}, {"data": ["/c/weather2015/index/main_0814.css-6", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 154.14268092105263, 4.818564967105264], "isController": false}, {"data": ["/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 5.154639175257732, 325.2607522551546, 2.0387000644329896], "isController": false}, {"data": ["/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", 1, 0, 0.0, 176.0, 176, 176, 176.0, 176.0, 176.0, 5.681818181818182, 546.56982421875, 2.2472034801136367], "isController": false}, {"data": ["/j/weather2015/publicHead.js-55", 1, 0, 0.0, 33.0, 33, 33, 33.0, 33.0, 33.0, 30.303030303030305, 169.921875, 10.298295454545453], "isController": false}, {"data": ["/i/weather2015/user/my-head.png-22", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 45.66025152439024, 8.503239329268292], "isController": false}, {"data": ["/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", 1, 0, 0.0, 241.0, 241, 241, 241.0, 241.0, 241.0, 4.149377593360996, 305.9598677385892, 1.641111255186722], "isController": false}, {"data": ["/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", 1, 0, 0.0, 224.0, 224, 224, 224.0, 224.0, 224.0, 4.464285714285714, 226.90691266741072, 1.7656598772321428], "isController": false}, {"data": ["/webdig.js-53", 1, 0, 0.0, 169.0, 169, 169, 169.0, 169.0, 169.0, 5.9171597633136095, 27.557553624260354, 2.1322577662721893], "isController": false}, {"data": ["/j/jquery-1.8.2.js-57", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 7.6923076923076925, 253.30528846153845, 2.6216947115384612], "isController": false}, {"data": ["/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 19.607843137254903, 517.1951593137255, 7.869944852941177], "isController": false}, {"data": ["/j/weather2014/rili.js-9", 1, 0, 0.0, 27.0, 27, 27, 27.0, 27.0, 27.0, 37.03703703703704, 81.77806712962963, 12.47829861111111], "isController": false}, {"data": ["/i/news/right-d13.png-60", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 70.3125, 26.066706730769234], "isController": false}, {"data": ["/gsorganizationvalsha2g2-17", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 58.06974085365854, 10.670731707317072], "isController": false}, {"data": ["/chinasosearch/chinaso-weather1.html-51", 1, 0, 0.0, 23.0, 23, 23, 23.0, 23.0, 23.0, 43.47826086956522, 112.13485054347827, 19.488790760869566], "isController": false}, {"data": ["/ma.gif-68", 1, 0, 0.0, 38.0, 38, 38, 38.0, 38.0, 38.0, 26.31578947368421, 16.909950657894736, 13.954564144736842], "isController": false}, {"data": ["/weather2018/cy/pc/index/1.png-75", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 11.363636363636363, 20.796342329545457, 4.450017755681818], "isController": false}, {"data": ["/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", 1, 0, 0.0, 503.0, 503, 503, 503.0, 503.0, 503.0, 1.9880715705765406, 634.4646961978132, 0.7882393141153081], "isController": false}, {"data": ["/index_around_2017/101040100.html-70", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 15.384615384615385, 12.965745192307692, 5.513822115384615], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 273.7379807692308, 34.10456730769231], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 8.829752604166668, 5.4931640625], "isController": false}, {"data": ["/j/m_event.js-56", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 10.151427469135802, 4.147376543209877], "isController": false}, {"data": ["/j/version.js-16", 1, 0, 0.0, 39.0, 39, 39, 39.0, 39.0, 39.0, 25.64102564102564, 9.289863782051283, 8.713942307692308], "isController": false}, {"data": ["/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 14.285714285714285, 797.5864955357142, 5.691964285714286], "isController": false}, {"data": ["/i/ucenter/pc/email.png-20", 1, 0, 0.0, 17.0, 17, 17, 17.0, 17.0, 17.0, 58.8235294117647, 205.07812499999997, 20.048253676470587], "isController": false}, {"data": ["/j/weather2015/index/main_0814.js-12", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 10.416666666666666, 441.3045247395833, 3.5807291666666665], "isController": false}, {"data": ["/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", 1, 0, 0.0, 317.0, 317, 317, 317.0, 317.0, 317.0, 3.1545741324921135, 200.6943759858044, 1.2507393533123028], "isController": false}, {"data": ["/dingzhi/101040100.html-72", 1, 0, 0.0, 95.0, 95, 95, 95.0, 95.0, 95.0, 10.526315789473683, 5.4584703947368425, 3.6698190789473686], "isController": false}, {"data": ["/js/v1/wa.js-58", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 12.82051282051282, 125.63852163461539, 4.3194110576923075], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", 1, 0, 0.0, 156.0, 156, 156, 156.0, 156.0, 156.0, 6.41025641025641, 4.069010416666667, 2.5290464743589745], "isController": false}, {"data": ["/images/cn/index/2020/06/29/1593388736823054275.jpg-27", 1, 0, 0.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 5.263157894736842, 95.95497532894737, 1.947985197368421], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 8.928571428571429, 818.0977957589286, 3.5574776785714284], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 46.91354851973684, 5.820826480263158], "isController": false}, {"data": ["/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 6.329113924050633, 207.23521558544303, 2.503214003164557], "isController": false}, {"data": ["/i/weather2015/index/page_flip.png-48", 1, 0, 0.0, 57.0, 57, 57, 57.0, 57.0, 57.0, 17.543859649122805, 34.72793311403509, 6.167763157894736], "isController": false}, {"data": ["/i/weather2015/index/slhx.png-52", 1, 0, 0.0, 46.0, 46, 46, 46.0, 46.0, 46.0, 21.73913043478261, 63.96484375, 7.536514945652174], "isController": false}, {"data": ["/i/weather2015/user/icon-hui.png-67", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 188.5986328125, 43.701171875], "isController": false}, {"data": ["/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 7.8125, 214.4622802734375, 3.08990478515625], "isController": false}, {"data": ["/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 5.154639175257732, 245.99810728092783, 2.0538015463917527], "isController": false}, {"data": ["/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", 1, 0, 0.0, 137.0, 137, 137, 137.0, 137.0, 137.0, 7.299270072992701, 321.31044708029196, 2.908302919708029], "isController": false}, {"data": ["/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", 1, 0, 0.0, 169.0, 169, 169, 169.0, 169.0, 169.0, 5.9171597633136095, 364.4427237426035, 2.3402829142011834], "isController": false}, {"data": ["/weather_index/101040100.html-73", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 14.705882352941176, 36.262063419117645, 5.2131204044117645], "isController": false}, {"data": ["/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", 1, 0, 0.0, 144.0, 144, 144, 144.0, 144.0, 144.0, 6.944444444444444, 322.7064344618056, 2.7669270833333335], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", 1, 0, 0.0, 153.0, 153, 153, 153.0, 153.0, 153.0, 6.5359477124183005, 517.7313112745098, 2.6041666666666665], "isController": false}, {"data": ["/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", 1, 0, 0.0, 245.0, 245, 245, 245.0, 245.0, 245.0, 4.081632653061225, 571.2332589285714, 1.6183035714285714], "isController": false}, {"data": ["/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", 1, 0, 0.0, 154.0, 154, 154, 154.0, 154.0, 154.0, 6.493506493506494, 314.77019074675326, 2.5872564935064934], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 4.291845493562231, 18.026589324034333, 3.591905847639485], "isController": false}, {"data": ["/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 7.194244604316547, 227.21588354316546, 2.873482464028777], "isController": false}]}, function(index, item){
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
