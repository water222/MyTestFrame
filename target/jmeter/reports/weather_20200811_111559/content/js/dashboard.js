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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9444444444444444, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/ip/-64"], "isController": false}, {"data": [0.0, 500, 1500, ""], "isController": true}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-62"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-63"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-66"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/selectCityBtnCur.png-46"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/cx_new.png-50"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-65"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-74"], "isController": false}, {"data": [1.0, 500, 1500, "/m2/i/favicon.ico-69"], "isController": false}, {"data": [1.0, 500, 1500, "/-15"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/loading.gif-47"], "isController": false}, {"data": [0.0, 500, 1500, "/travel_rank/3A10104.html-71"], "isController": false}, {"data": [1.0, 500, 1500, "/-13"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42"], "isController": false}, {"data": [0.0, 500, 1500, "/1.gif-54"], "isController": false}, {"data": [1.0, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/-14"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/weixin.png-49"], "isController": false}, {"data": [1.0, 500, 1500, "/-7"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-61"], "isController": false}, {"data": [1.0, 500, 1500, "/c/weather2015/index/main_0814.css-6"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/publicHead.js-55"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/my-head.png-22"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37"], "isController": false}, {"data": [1.0, 500, 1500, "/webdig.js-53"], "isController": false}, {"data": [1.0, 500, 1500, "/j/jquery-1.8.2.js-57"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2014/rili.js-9"], "isController": false}, {"data": [1.0, 500, 1500, "/i/news/right-d13.png-60"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-17"], "isController": false}, {"data": [1.0, 500, 1500, "/chinasosearch/chinaso-weather1.html-51"], "isController": false}, {"data": [1.0, 500, 1500, "/ma.gif-68"], "isController": false}, {"data": [1.0, 500, 1500, "/weather2018/cy/pc/index/1.png-75"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26"], "isController": false}, {"data": [0.5, 500, 1500, "/index_around_2017/101040100.html-70"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0"], "isController": false}, {"data": [1.0, 500, 1500, "/j/m_event.js-56"], "isController": false}, {"data": [1.0, 500, 1500, "/j/version.js-16"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30"], "isController": false}, {"data": [1.0, 500, 1500, "/i/ucenter/pc/email.png-20"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/index/main_0814.js-12"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23"], "isController": false}, {"data": [1.0, 500, 1500, "/dingzhi/101040100.html-72"], "isController": false}, {"data": [1.0, 500, 1500, "/js/v1/wa.js-58"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/29/1593388736823054275.jpg-27"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/page_flip.png-48"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/slhx.png-52"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/icon-hui.png-67"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35"], "isController": false}, {"data": [0.5, 500, 1500, "/weather_index/101040100.html-73"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 71, 1, 1.408450704225352, 104.63380281690141, 0, 1799, 217.0, 433.3999999999977, 1799.0, 9.821552081892378, 270.141449586734, 3.794801104924609], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/ip/-64", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 6.8359375, 6.264740566037736], "isController": false}, {"data": ["", 1, 1, 100.0, 7132.0, 7132, 7132, 7132.0, 7132.0, 7132.0, 0.14021312394840157, 272.629083707235, 3.6114464298233315], "isController": true}, {"data": ["/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 9.25925925925926, 915.0571469907408, 3.689236111111111], "isController": false}, {"data": ["/ip/-62", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 9.0576171875, 8.30078125], "isController": false}, {"data": ["/ip/-63", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 8.854166666666668, 7.378472222222222], "isController": false}, {"data": ["/ip/-66", 1, 0, 0.0, 43.0, 43, 43, 43.0, 43.0, 43.0, 23.25581395348837, 9.265988372093023, 7.721656976744186], "isController": false}, {"data": ["/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 1270.8333333333335, 6.591796875], "isController": false}, {"data": ["/i/weather2017/selectCityBtnCur.png-46", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 140.39963942307693, 27.118389423076923], "isController": false}, {"data": ["/i/weather2017/cx_new.png-50", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 1377.0926339285713, 48.96763392857143], "isController": false}, {"data": ["/gsorganizationvalsha2g2-65", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 18.51851851851852, 44.0357349537037, 8.101851851851851], "isController": false}, {"data": ["/travel_rank/3A10104.html-74", 1, 0, 0.0, 253.0, 253, 253, 253.0, 253.0, 253.0, 3.952569169960474, 3.2114624505928853, 1.3857151679841897], "isController": false}, {"data": ["/m2/i/favicon.ico-69", 1, 0, 0.0, 66.0, 66, 66, 66.0, 66.0, 66.0, 15.151515151515152, 43.249881628787875, 4.646070075757575], "isController": false}, {"data": ["/-15", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 176.43229166666666, 68.84765625], "isController": false}, {"data": ["/i/weather2015/index/loading.gif-47", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 297.01450892857144, 49.94419642857143], "isController": false}, {"data": ["/travel_rank/3A10104.html-71", 1, 0, 0.0, 1799.0, 1799, 1799, 1799.0, 1799.0, 1799.0, 0.5558643690939411, 0.45163979988882713, 0.19487823096164536], "isController": false}, {"data": ["/-13", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 177.08333333333334, 68.84765625], "isController": false}, {"data": ["/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 13.698630136986301, 944.5232234589041, 5.45804794520548], "isController": false}, {"data": ["/1.gif-54", 1, 1, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["/-5", 1, 0, 0.0, 325.0, 325, 325, 325.0, 325.0, 325.0, 3.076923076923077, 66.72776442307692, 1.1538461538461537], "isController": false}, {"data": ["/-14", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 41.666666666666664, 44.148763020833336, 17.2119140625], "isController": false}, {"data": ["/i/weather2015/index/weixin.png-49", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 1176.5407986111113, 19.368489583333336], "isController": false}, {"data": ["/-7", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 333.3333333333333, 354.1666666666667, 137.6953125], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", 1, 0, 0.0, 84.0, 84, 84, 84.0, 84.0, 84.0, 11.904761904761903, 50.37434895833333, 9.986514136904761], "isController": false}, {"data": ["/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 845.5705054012345, 4.918981481481481], "isController": false}, {"data": ["/ip/-61", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 5.250792572463768, 4.812047101449275], "isController": false}, {"data": ["/c/weather2015/index/main_0814.css-6", 1, 0, 0.0, 29.0, 29, 29, 29.0, 29.0, 29.0, 34.48275862068965, 404.0274784482758, 12.627963362068964], "isController": false}, {"data": ["/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", 1, 0, 0.0, 15.0, 15, 15, 15.0, 15.0, 15.0, 66.66666666666667, 4206.705729166667, 26.3671875], "isController": false}, {"data": ["/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 41.666666666666664, 4008.504231770833, 16.4794921875], "isController": false}, {"data": ["/j/weather2015/publicHead.js-55", 1, 0, 0.0, 41.0, 41, 41, 41.0, 41.0, 41.0, 24.390243902439025, 136.8854801829268, 8.288871951219512], "isController": false}, {"data": ["/i/weather2015/user/my-head.png-22", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 208.55034722222223, 38.73697916666667], "isController": false}, {"data": ["/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 8.333333333333334, 614.4694010416667, 3.2958984375], "isController": false}, {"data": ["/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", 1, 0, 0.0, 97.0, 97, 97, 97.0, 97.0, 97.0, 10.309278350515465, 523.9912210051547, 4.077400128865979], "isController": false}, {"data": ["/webdig.js-53", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 7.936507936507936, 36.96211557539682, 2.8599330357142856], "isController": false}, {"data": ["/j/jquery-1.8.2.js-57", 1, 0, 0.0, 154.0, 154, 154, 154.0, 154.0, 154.0, 6.493506493506494, 213.8164569805195, 2.2131189123376624], "isController": false}, {"data": ["/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", 1, 0, 0.0, 11.0, 11, 11, 11.0, 11.0, 11.0, 90.9090909090909, 2398.526278409091, 36.48792613636364], "isController": false}, {"data": ["/j/weather2014/rili.js-9", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 4.608294930875576, 10.170650921658986, 1.552599366359447], "isController": false}, {"data": ["/i/news/right-d13.png-60", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 153.3203125, 56.477864583333336], "isController": false}, {"data": ["/gsorganizationvalsha2g2-17", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 125.61677631578948, 23.026315789473685], "isController": false}, {"data": ["/chinasosearch/chinaso-weather1.html-51", 1, 0, 0.0, 21.0, 21, 21, 21.0, 21.0, 21.0, 47.61904761904761, 123.13988095238095, 21.34486607142857], "isController": false}, {"data": ["/ma.gif-68", 1, 0, 0.0, 40.0, 40, 40, 40.0, 40.0, 40.0, 25.0, 16.2109375, 13.2568359375], "isController": false}, {"data": ["/weather2018/cy/pc/index/1.png-75", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 25.404188368055557, 5.438910590277779], "isController": false}, {"data": ["/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 12.5, 3989.19677734375, 4.9560546875], "isController": false}, {"data": ["/index_around_2017/101040100.html-70", 1, 0, 0.0, 716.0, 716, 716, 716.0, 716.0, 716.0, 1.3966480446927374, 1.177057873603352, 0.5005564769553073], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 513.671875, 63.33705357142857], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 8.365028782894736, 5.204050164473684], "isController": false}, {"data": ["/j/m_event.js-56", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 10.78023538961039, 4.362824675324675], "isController": false}, {"data": ["/j/version.js-16", 1, 0, 0.0, 42.0, 42, 42, 42.0, 42.0, 42.0, 23.809523809523807, 8.7890625, 8.091517857142856], "isController": false}, {"data": ["/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 689.2481674382716, 4.918981481481481], "isController": false}, {"data": ["/i/ucenter/pc/email.png-20", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 125.0, 435.6689453125, 42.6025390625], "isController": false}, {"data": ["/j/weather2015/index/main_0814.js-12", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 2650.0244140625, 21.484375], "isController": false}, {"data": ["/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 785.4335455246913, 4.894868827160494], "isController": false}, {"data": ["/dingzhi/101040100.html-72", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 3.4482758620689653, 1.7679148706896552, 1.2021821120689655], "isController": false}, {"data": ["/js/v1/wa.js-58", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 200.31489158163265, 6.875797193877551], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 9.25925925925926, 5.8774594907407405, 3.6530671296296298], "isController": false}, {"data": ["/images/cn/index/2020/06/29/1593388736823054275.jpg-27", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 405.1432291666667, 8.22482638888889], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 5090.115017361111, 22.135416666666668], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 33.92172759433962, 4.173422759433962], "isController": false}, {"data": ["/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 474.53860960144925, 5.731997282608695], "isController": false}, {"data": ["/i/weather2015/index/page_flip.png-48", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 142.85714285714286, 284.5982142857143, 50.223214285714285], "isController": false}, {"data": ["/i/weather2015/index/slhx.png-52", 1, 0, 0.0, 14.0, 14, 14, 14.0, 14.0, 14.0, 71.42857142857143, 210.58872767857142, 24.76283482142857], "isController": false}, {"data": ["/i/weather2015/user/icon-hui.png-67", 1, 0, 0.0, 9.0, 9, 9, 9.0, 9.0, 9.0, 111.1111111111111, 167.2092013888889, 38.845486111111114], "isController": false}, {"data": ["/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 41.666666666666664, 1144.1243489583333, 16.4794921875], "isController": false}, {"data": ["/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", 1, 0, 0.0, 42.0, 42, 42, 42.0, 42.0, 42.0, 23.809523809523807, 1136.2769717261904, 9.486607142857142], "isController": false}, {"data": ["/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 579.2043585526316, 5.2425986842105265], "isController": false}, {"data": ["/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", 1, 0, 0.0, 45.0, 45, 45, 45.0, 45.0, 45.0, 22.22222222222222, 1368.6848958333335, 8.7890625], "isController": false}, {"data": ["/weather_index/101040100.html-73", 1, 0, 0.0, 596.0, 596, 596, 596.0, 596.0, 596.0, 1.6778523489932886, 4.0438863255033555, 0.5947855494966443], "isController": false}, {"data": ["/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 603.5029423701299, 5.174512987012987], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", 1, 0, 0.0, 70.0, 70, 70, 70.0, 70.0, 70.0, 14.285714285714285, 1131.556919642857, 5.691964285714286], "isController": false}, {"data": ["/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 7366.313733552632, 20.867598684210527], "isController": false}, {"data": ["/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 13.698630136986301, 664.0357448630137, 5.45804794520548], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", 1, 0, 0.0, 217.0, 217, 217, 217.0, 217.0, 217.0, 4.608294930875576, 19.495247695852534, 3.856746831797235], "isController": false}, {"data": ["/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 595.9058077830189, 7.536114386792453], "isController": false}]}, function(index, item){
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
