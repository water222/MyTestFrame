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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9583333333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/ip/-64"], "isController": false}, {"data": [0.0, 500, 1500, ""], "isController": true}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-62"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-63"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-66"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/selectCityBtnCur.png-46"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2017/cx_new.png-50"], "isController": false}, {"data": [0.0, 500, 1500, "/gsorganizationvalsha2g2-65"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-74"], "isController": false}, {"data": [1.0, 500, 1500, "/m2/i/favicon.ico-69"], "isController": false}, {"data": [1.0, 500, 1500, "/-15"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/loading.gif-47"], "isController": false}, {"data": [1.0, 500, 1500, "/travel_rank/3A10104.html-71"], "isController": false}, {"data": [1.0, 500, 1500, "/-13"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42"], "isController": false}, {"data": [0.0, 500, 1500, "/1.gif-54"], "isController": false}, {"data": [1.0, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/-14"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/weixin.png-49"], "isController": false}, {"data": [1.0, 500, 1500, "/-7"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28"], "isController": false}, {"data": [1.0, 500, 1500, "/ip/-61"], "isController": false}, {"data": [1.0, 500, 1500, "/c/weather2015/index/main_0814.css-6"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/publicHead.js-55"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/my-head.png-22"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37"], "isController": false}, {"data": [1.0, 500, 1500, "/webdig.js-53"], "isController": false}, {"data": [1.0, 500, 1500, "/j/jquery-1.8.2.js-57"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2014/rili.js-9"], "isController": false}, {"data": [1.0, 500, 1500, "/i/news/right-d13.png-60"], "isController": false}, {"data": [1.0, 500, 1500, "/gsorganizationvalsha2g2-17"], "isController": false}, {"data": [1.0, 500, 1500, "/chinasosearch/chinaso-weather1.html-51"], "isController": false}, {"data": [1.0, 500, 1500, "/ma.gif-68"], "isController": false}, {"data": [1.0, 500, 1500, "/weather2018/cy/pc/index/1.png-75"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26"], "isController": false}, {"data": [1.0, 500, 1500, "/index_around_2017/101040100.html-70"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0"], "isController": false}, {"data": [1.0, 500, 1500, "/j/m_event.js-56"], "isController": false}, {"data": [1.0, 500, 1500, "/j/version.js-16"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30"], "isController": false}, {"data": [1.0, 500, 1500, "/i/ucenter/pc/email.png-20"], "isController": false}, {"data": [1.0, 500, 1500, "/j/weather2015/index/main_0814.js-12"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23"], "isController": false}, {"data": [1.0, 500, 1500, "/dingzhi/101040100.html-72"], "isController": false}, {"data": [1.0, 500, 1500, "/js/v1/wa.js-58"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2020/06/29/1593388736823054275.jpg-27"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/page_flip.png-48"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/index/slhx.png-52"], "isController": false}, {"data": [1.0, 500, 1500, "/i/weather2015/user/icon-hui.png-67"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35"], "isController": false}, {"data": [1.0, 500, 1500, "/weather_index/101040100.html-73"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39"], "isController": false}, {"data": [1.0, 500, 1500, "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19"], "isController": false}, {"data": [1.0, 500, 1500, "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 71, 1, 1.408450704225352, 105.9718309859155, 0, 1799, 159.6, 214.19999999999942, 1799.0, 9.687542638832037, 266.45992162982674, 3.7430232211079275], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/ip/-64", 1, 0, 0.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 21.27659574468085, 8.456615691489361, 7.064494680851064], "isController": false}, {"data": ["", 1, 1, 100.0, 7278.0, 7278, 7278, 7278.0, 7278.0, 7278.0, 0.1374003847210772, 267.1727670290602, 3.538999167010168], "isController": true}, {"data": ["/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 6.802721088435374, 672.320099914966, 2.7104591836734695], "isController": false}, {"data": ["/ip/-62", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 20.0, 7.94921875, 6.640625], "isController": false}, {"data": ["/ip/-63", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 8.111447704081632, 6.776147959183673], "isController": false}, {"data": ["/ip/-66", 1, 0, 0.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 21.27659574468085, 8.456615691489361, 7.064494680851064], "isController": false}, {"data": ["/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 6.25, 476.611328125, 2.471923828125], "isController": false}, {"data": ["/i/weather2017/selectCityBtnCur.png-46", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 12.048192771084338, 21.849115210843372, 4.247458584337349], "isController": false}, {"data": ["/i/weather2017/cx_new.png-50", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 52.63157894736842, 506.6303453947369, 18.040707236842106], "isController": false}, {"data": ["/gsorganizationvalsha2g2-65", 1, 0, 0.0, 1799.0, 1799, 1799, 1799.0, 1799.0, 1799.0, 0.5558643690939411, 1.310949659533074, 0.24319066147859922], "isController": false}, {"data": ["/travel_rank/3A10104.html-74", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 19.607843137254903, 16.410079656862745, 6.874234068627452], "isController": false}, {"data": ["/m2/i/favicon.ico-69", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 11.363636363636363, 32.17107599431819, 3.484552556818182], "isController": false}, {"data": ["/-15", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 84.9609375, 31.775841346153847], "isController": false}, {"data": ["/i/weather2015/index/loading.gif-47", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 15.873015873015872, 32.83110119047619, 5.549355158730159], "isController": false}, {"data": ["/travel_rank/3A10104.html-71", 1, 0, 0.0, 47.0, 47, 47, 47.0, 47.0, 47.0, 21.27659574468085, 17.806682180851062, 7.459275265957447], "isController": false}, {"data": ["/-13", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 166.66666666666666, 176.59505208333334, 68.84765625], "isController": false}, {"data": ["/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", 1, 0, 0.0, 90.0, 90, 90, 90.0, 90.0, 90.0, 11.11111111111111, 766.1892361111111, 4.427083333333334], "isController": false}, {"data": ["/1.gif-54", 1, 1, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["/-5", 1, 0, 0.0, 89.0, 89, 89, 89.0, 89.0, 89.0, 11.235955056179774, 243.21892556179776, 4.213483146067416], "isController": false}, {"data": ["/-14", 1, 0, 0.0, 22.0, 22, 22, 22.0, 22.0, 22.0, 45.45454545454545, 48.33984375, 18.776633522727273], "isController": false}, {"data": ["/i/weather2015/index/weixin.png-49", 1, 0, 0.0, 135.0, 135, 135, 135.0, 135.0, 135.0, 7.407407407407407, 156.76359953703704, 2.5824652777777777], "isController": false}, {"data": ["/-7", 1, 0, 0.0, 13.0, 13, 13, 13.0, 13.0, 13.0, 76.92307692307693, 81.80588942307692, 31.775841346153847], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 9.433962264150942, 39.66133549528302, 7.913841391509434], "isController": false}, {"data": ["/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", 1, 0, 0.0, 104.0, 104, 104, 104.0, 104.0, 104.0, 9.615384615384617, 658.7007962740385, 3.831129807692308], "isController": false}, {"data": ["/ip/-61", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 16.129032258064516, 6.410660282258065, 5.355342741935484], "isController": false}, {"data": ["/c/weather2015/index/main_0814.css-6", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 8.771929824561402, 102.79605263157895, 3.212376644736842], "isController": false}, {"data": ["/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 8.196721311475411, 517.3139728483607, 3.2418673155737707], "isController": false}, {"data": ["/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 8.064516129032258, 775.6505166330645, 3.189579133064516], "isController": false}, {"data": ["/j/weather2015/publicHead.js-55", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 312.06597222222223, 18.880208333333336], "isController": false}, {"data": ["/i/weather2015/user/my-head.png-22", 1, 0, 0.0, 23.0, 23, 23, 23.0, 23.0, 23.0, 43.47826086956522, 81.56419836956522, 15.157948369565217], "isController": false}, {"data": ["/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", 1, 0, 0.0, 165.0, 165, 165, 165.0, 165.0, 165.0, 6.0606060606060606, 446.92234848484844, 2.3970170454545454], "isController": false}, {"data": ["/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 13.513513513513514, 686.9721283783784, 5.344700168918919], "isController": false}, {"data": ["/webdig.js-53", 1, 0, 0.0, 255.0, 255, 255, 255.0, 255.0, 255.0, 3.9215686274509802, 18.26363357843137, 1.4131433823529411], "isController": false}, {"data": ["/j/jquery-1.8.2.js-57", 1, 0, 0.0, 183.0, 183, 183, 183.0, 183.0, 183.0, 5.46448087431694, 179.89028346994536, 1.8624060792349728], "isController": false}, {"data": ["/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 10.752688172043012, 283.65465389784947, 4.315776209677419], "isController": false}, {"data": ["/j/weather2014/rili.js-9", 1, 0, 0.0, 69.0, 69, 69, 69.0, 69.0, 69.0, 14.492753623188406, 31.943500905797098, 4.8828125], "isController": false}, {"data": ["/i/news/right-d13.png-60", 1, 0, 0.0, 18.0, 18, 18, 18.0, 18.0, 18.0, 55.55555555555555, 50.94401041666667, 18.825954861111114], "isController": false}, {"data": ["/gsorganizationvalsha2g2-17", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 40.76306573275862, 7.543103448275862], "isController": false}, {"data": ["/chinasosearch/chinaso-weather1.html-51", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 38.698111007462686, 6.690181902985074], "isController": false}, {"data": ["/ma.gif-68", 1, 0, 0.0, 42.0, 42, 42, 42.0, 42.0, 42.0, 23.809523809523807, 15.36923363095238, 12.625558035714285], "isController": false}, {"data": ["/weather2018/cy/pc/index/1.png-75", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 10.204081632653061, 18.584582270408163, 3.99593431122449], "isController": false}, {"data": ["/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", 1, 0, 0.0, 376.0, 376, 376, 376.0, 376.0, 376.0, 2.6595744680851063, 848.7990359042553, 1.0544797207446808], "isController": false}, {"data": ["/index_around_2017/101040100.html-70", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 19.230769230769234, 16.132061298076923, 6.892277644230769], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", 1, 0, 0.0, 17.0, 17, 17, 17.0, 17.0, 17.0, 58.8235294117647, 209.61626838235293, 26.079963235294116], "isController": false}, {"data": ["/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", 1, 0, 0.0, 89.0, 89, 89, 89.0, 89.0, 89.0, 11.235955056179774, 7.198033707865169, 4.443908005617978], "isController": false}, {"data": ["/j/m_event.js-56", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 13.157894736842104, 10.857833059210527, 4.420230263157895], "isController": false}, {"data": ["/j/version.js-16", 1, 0, 0.0, 43.0, 43, 43, 43.0, 43.0, 43.0, 23.25581395348837, 8.51653343023256, 7.903343023255815], "isController": false}, {"data": ["/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 17.241379310344826, 962.6549030172413, 6.869612068965517], "isController": false}, {"data": ["/i/ucenter/pc/email.png-20", 1, 0, 0.0, 16.0, 16, 16, 16.0, 16.0, 16.0, 62.5, 218.1396484375, 21.30126953125], "isController": false}, {"data": ["/j/weather2015/index/main_0814.js-12", 1, 0, 0.0, 142.0, 142, 142, 142.0, 142.0, 142.0, 7.042253521126761, 298.42237015845075, 2.420774647887324], "isController": false}, {"data": ["/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 8.928571428571429, 568.0716378348214, 3.5400390625], "isController": false}, {"data": ["/dingzhi/101040100.html-72", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 13.888888888888888, 7.283528645833334, 4.842122395833334], "isController": false}, {"data": ["/js/v1/wa.js-58", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 12.987012987012989, 127.30823863636364, 4.375507305194805], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", 1, 0, 0.0, 91.0, 91, 91, 91.0, 91.0, 91.0, 10.989010989010989, 6.964714972527473, 4.335508241758242], "isController": false}, {"data": ["/images/cn/index/2020/06/29/1593388736823054275.jpg-27", 1, 0, 0.0, 63.0, 63, 63, 63.0, 63.0, 63.0, 15.873015873015872, 289.60503472222223, 5.874875992063492], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", 1, 0, 0.0, 93.0, 93, 93, 93.0, 93.0, 93.0, 10.752688172043012, 985.2675571236559, 4.284274193548387], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 72.72401147959184, 9.028220663265305], "isController": false}, {"data": ["/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", 1, 0, 0.0, 61.0, 61, 61, 61.0, 61.0, 61.0, 16.393442622950822, 536.9012551229508, 6.4837346311475414], "isController": false}, {"data": ["/i/weather2015/index/page_flip.png-48", 1, 0, 0.0, 104.0, 104, 104, 104.0, 104.0, 104.0, 9.615384615384617, 19.052358774038463, 3.380408653846154], "isController": false}, {"data": ["/i/weather2015/index/slhx.png-52", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 12.345679012345679, 36.26543209876543, 4.2799961419753085], "isController": false}, {"data": ["/i/weather2015/user/icon-hui.png-67", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 100.0, 151.171875, 34.9609375], "isController": false}, {"data": ["/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", 1, 0, 0.0, 49.0, 49, 49, 49.0, 49.0, 49.0, 20.408163265306122, 560.188137755102, 8.071588010204081], "isController": false}, {"data": ["/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 10.0, 477.119140625, 3.984375], "isController": false}, {"data": ["/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 18.867924528301884, 830.8151533018868, 7.517688679245283], "isController": false}, {"data": ["/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", 1, 0, 0.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 10.869565217391305, 669.5928158967391, 4.2989979619565215], "isController": false}, {"data": ["/weather_index/101040100.html-73", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 14.925373134328359, 36.84701492537313, 5.290928171641791], "isController": false}, {"data": ["/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", 1, 0, 0.0, 60.0, 60, 60, 60.0, 60.0, 60.0, 16.666666666666668, 774.5930989583334, 6.640625], "isController": false}, {"data": ["/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 6.329113924050633, 501.3659513449367, 2.521756329113924], "isController": false}, {"data": ["/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", 1, 0, 0.0, 187.0, 187, 187, 187.0, 187.0, 187.0, 5.347593582887701, 748.44376671123, 2.1202372994652405], "isController": false}, {"data": ["/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 12.658227848101266, 613.6520965189874, 5.043512658227848], "isController": false}, {"data": ["/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 7.092198581560283, 29.767841312056742, 5.935560726950355], "isController": false}, {"data": ["/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", 1, 0, 0.0, 43.0, 43, 43, 43.0, 43.0, 43.0, 23.25581395348837, 734.6475290697675, 9.288699127906977], "isController": false}]}, function(index, item){
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
