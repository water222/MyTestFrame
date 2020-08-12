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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "/ip/-64", "isController": false}, {"data": [[12800.0, 1.0]], "isOverall": false, "label": "", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/ip/-62", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/ip/-63", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/ip/-66", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-13", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/1.gif-54", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/-7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/ip/-61", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/webdig.js-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/news/right-d13.png-60", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/ma.gif-68", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/j/m_event.js-56", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/j/version.js-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/js/v1/wa.js-58", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "/weather_index/101040100.html-73", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 12800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 66.0, "series": [{"data": [[0.0, 66.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.59719586E12, "maxY": 1.0, "series": [{"data": [[1.59719586E12, 1.0]], "isOverall": false, "label": "线程组", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719586E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 12866.0, "series": [{"data": [[1.0, 61.0]], "isOverall": false, "label": "/ip/-64", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "/ip/-64-Aggregated", "isController": false}, {"data": [[1.0, 12866.0]], "isOverall": false, "label": "", "isController": true}, {"data": [[1.0, 12866.0]], "isOverall": false, "label": "-Aggregated", "isController": true}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", "isController": false}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18-Aggregated", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "/ip/-62", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "/ip/-62-Aggregated", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "/ip/-63", "isController": false}, {"data": [[1.0, 64.0]], "isOverall": false, "label": "/ip/-63-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "/ip/-66", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "/ip/-66-Aggregated", "isController": false}, {"data": [[1.0, 1254.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", "isController": false}, {"data": [[1.0, 1254.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33-Aggregated", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50-Aggregated", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65-Aggregated", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "/-15", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "/-15-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47-Aggregated", "isController": false}, {"data": [[1.0, 175.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71", "isController": false}, {"data": [[1.0, 175.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "/-13", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "/-13-Aggregated", "isController": false}, {"data": [[1.0, 350.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", "isController": false}, {"data": [[1.0, 350.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "/1.gif-54", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "/1.gif-54-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "/-5", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "/-5-Aggregated", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "/-14", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "/-14-Aggregated", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49-Aggregated", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "/-7", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "/-7-Aggregated", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", "isController": false}, {"data": [[1.0, 486.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "/ip/-61", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "/ip/-61-Aggregated", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6-Aggregated", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32-Aggregated", "isController": false}, {"data": [[1.0, 876.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", "isController": false}, {"data": [[1.0, 876.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55-Aggregated", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22-Aggregated", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", "isController": false}, {"data": [[1.0, 251.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36-Aggregated", "isController": false}, {"data": [[1.0, 177.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", "isController": false}, {"data": [[1.0, 177.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "/webdig.js-53", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "/webdig.js-53-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38-Aggregated", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "/i/news/right-d13.png-60", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "/i/news/right-d13.png-60-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "/ma.gif-68", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "/ma.gif-68-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75-Aggregated", "isController": false}, {"data": [[1.0, 1441.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", "isController": false}, {"data": [[1.0, 1441.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70-Aggregated", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", "isController": false}, {"data": [[1.0, 297.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1-Aggregated", "isController": false}, {"data": [[1.0, 188.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", "isController": false}, {"data": [[1.0, 188.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "/j/m_event.js-56", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "/j/m_event.js-56-Aggregated", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "/j/version.js-16", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "/j/version.js-16-Aggregated", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30-Aggregated", "isController": false}, {"data": [[1.0, 29.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20", "isController": false}, {"data": [[1.0, 29.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20-Aggregated", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12", "isController": false}, {"data": [[1.0, 121.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12-Aggregated", "isController": false}, {"data": [[1.0, 530.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", "isController": false}, {"data": [[1.0, 530.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23-Aggregated", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72", "isController": false}, {"data": [[1.0, 68.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "/js/v1/wa.js-58", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "/js/v1/wa.js-58-Aggregated", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0-Aggregated", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27-Aggregated", "isController": false}, {"data": [[1.0, 400.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", "isController": false}, {"data": [[1.0, 400.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29-Aggregated", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1-Aggregated", "isController": false}, {"data": [[1.0, 123.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", "isController": false}, {"data": [[1.0, 123.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31-Aggregated", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48-Aggregated", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52", "isController": false}, {"data": [[1.0, 21.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67-Aggregated", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", "isController": false}, {"data": [[1.0, 95.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43-Aggregated", "isController": false}, {"data": [[1.0, 479.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", "isController": false}, {"data": [[1.0, 479.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41-Aggregated", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45-Aggregated", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", "isController": false}, {"data": [[1.0, 207.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "/weather_index/101040100.html-73", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "/weather_index/101040100.html-73-Aggregated", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", "isController": false}, {"data": [[1.0, 211.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44-Aggregated", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21-Aggregated", "isController": false}, {"data": [[1.0, 493.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", "isController": false}, {"data": [[1.0, 493.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25-Aggregated", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", "isController": false}, {"data": [[1.0, 217.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39-Aggregated", "isController": false}, {"data": [[1.0, 454.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", "isController": false}, {"data": [[1.0, 454.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-Aggregated", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", "isController": false}, {"data": [[1.0, 153.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 468.18333333333334, "minX": 1.59719586E12, "maxY": 33329.48333333333, "series": [{"data": [[1.59719586E12, 33329.48333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59719586E12, 468.18333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719586E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59719586E12, "maxY": 12866.0, "series": [{"data": [[1.59719586E12, 61.0]], "isOverall": false, "label": "/ip/-64", "isController": false}, {"data": [[1.59719586E12, 12866.0]], "isOverall": false, "label": "", "isController": true}, {"data": [[1.59719586E12, 433.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", "isController": false}, {"data": [[1.59719586E12, 95.0]], "isOverall": false, "label": "/ip/-62", "isController": false}, {"data": [[1.59719586E12, 64.0]], "isOverall": false, "label": "/ip/-63", "isController": false}, {"data": [[1.59719586E12, 54.0]], "isOverall": false, "label": "/ip/-66", "isController": false}, {"data": [[1.59719586E12, 1254.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", "isController": false}, {"data": [[1.59719586E12, 15.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46", "isController": false}, {"data": [[1.59719586E12, 76.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50", "isController": false}, {"data": [[1.59719586E12, 44.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65", "isController": false}, {"data": [[1.59719586E12, 110.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74", "isController": false}, {"data": [[1.59719586E12, 34.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69", "isController": false}, {"data": [[1.59719586E12, 9.0]], "isOverall": false, "label": "/-15", "isController": false}, {"data": [[1.59719586E12, 121.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47", "isController": false}, {"data": [[1.59719586E12, 175.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71", "isController": false}, {"data": [[1.59719586E12, 37.0]], "isOverall": false, "label": "/-13", "isController": false}, {"data": [[1.59719586E12, 350.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/1.gif-54", "isController": false}, {"data": [[1.59719586E12, 96.0]], "isOverall": false, "label": "/-5", "isController": false}, {"data": [[1.59719586E12, 18.0]], "isOverall": false, "label": "/-14", "isController": false}, {"data": [[1.59719586E12, 52.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49", "isController": false}, {"data": [[1.59719586E12, 15.0]], "isOverall": false, "label": "/-7", "isController": false}, {"data": [[1.59719586E12, 486.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", "isController": false}, {"data": [[1.59719586E12, 214.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", "isController": false}, {"data": [[1.59719586E12, 77.0]], "isOverall": false, "label": "/ip/-61", "isController": false}, {"data": [[1.59719586E12, 48.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6", "isController": false}, {"data": [[1.59719586E12, 187.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", "isController": false}, {"data": [[1.59719586E12, 876.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", "isController": false}, {"data": [[1.59719586E12, 54.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55", "isController": false}, {"data": [[1.59719586E12, 170.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22", "isController": false}, {"data": [[1.59719586E12, 251.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", "isController": false}, {"data": [[1.59719586E12, 177.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", "isController": false}, {"data": [[1.59719586E12, 205.0]], "isOverall": false, "label": "/webdig.js-53", "isController": false}, {"data": [[1.59719586E12, 271.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57", "isController": false}, {"data": [[1.59719586E12, 45.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", "isController": false}, {"data": [[1.59719586E12, 13.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9", "isController": false}, {"data": [[1.59719586E12, 45.0]], "isOverall": false, "label": "/i/news/right-d13.png-60", "isController": false}, {"data": [[1.59719586E12, 83.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17", "isController": false}, {"data": [[1.59719586E12, 49.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51", "isController": false}, {"data": [[1.59719586E12, 46.0]], "isOverall": false, "label": "/ma.gif-68", "isController": false}, {"data": [[1.59719586E12, 40.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75", "isController": false}, {"data": [[1.59719586E12, 1441.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", "isController": false}, {"data": [[1.59719586E12, 136.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70", "isController": false}, {"data": [[1.59719586E12, 297.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", "isController": false}, {"data": [[1.59719586E12, 188.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", "isController": false}, {"data": [[1.59719586E12, 79.0]], "isOverall": false, "label": "/j/m_event.js-56", "isController": false}, {"data": [[1.59719586E12, 105.0]], "isOverall": false, "label": "/j/version.js-16", "isController": false}, {"data": [[1.59719586E12, 199.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", "isController": false}, {"data": [[1.59719586E12, 29.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20", "isController": false}, {"data": [[1.59719586E12, 121.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12", "isController": false}, {"data": [[1.59719586E12, 530.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", "isController": false}, {"data": [[1.59719586E12, 68.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72", "isController": false}, {"data": [[1.59719586E12, 113.0]], "isOverall": false, "label": "/js/v1/wa.js-58", "isController": false}, {"data": [[1.59719586E12, 337.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", "isController": false}, {"data": [[1.59719586E12, 186.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27", "isController": false}, {"data": [[1.59719586E12, 400.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", "isController": false}, {"data": [[1.59719586E12, 115.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", "isController": false}, {"data": [[1.59719586E12, 123.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", "isController": false}, {"data": [[1.59719586E12, 20.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48", "isController": false}, {"data": [[1.59719586E12, 21.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52", "isController": false}, {"data": [[1.59719586E12, 38.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67", "isController": false}, {"data": [[1.59719586E12, 95.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", "isController": false}, {"data": [[1.59719586E12, 479.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", "isController": false}, {"data": [[1.59719586E12, 191.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", "isController": false}, {"data": [[1.59719586E12, 207.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", "isController": false}, {"data": [[1.59719586E12, 71.0]], "isOverall": false, "label": "/weather_index/101040100.html-73", "isController": false}, {"data": [[1.59719586E12, 211.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", "isController": false}, {"data": [[1.59719586E12, 236.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", "isController": false}, {"data": [[1.59719586E12, 493.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", "isController": false}, {"data": [[1.59719586E12, 217.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", "isController": false}, {"data": [[1.59719586E12, 454.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", "isController": false}, {"data": [[1.59719586E12, 153.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719586E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59719586E12, "maxY": 7013.0, "series": [{"data": [[1.59719586E12, 61.0]], "isOverall": false, "label": "/ip/-64", "isController": false}, {"data": [[1.59719586E12, 7013.0]], "isOverall": false, "label": "", "isController": true}, {"data": [[1.59719586E12, 217.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", "isController": false}, {"data": [[1.59719586E12, 87.0]], "isOverall": false, "label": "/ip/-62", "isController": false}, {"data": [[1.59719586E12, 59.0]], "isOverall": false, "label": "/ip/-63", "isController": false}, {"data": [[1.59719586E12, 53.0]], "isOverall": false, "label": "/ip/-66", "isController": false}, {"data": [[1.59719586E12, 886.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", "isController": false}, {"data": [[1.59719586E12, 15.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46", "isController": false}, {"data": [[1.59719586E12, 76.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50", "isController": false}, {"data": [[1.59719586E12, 44.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65", "isController": false}, {"data": [[1.59719586E12, 110.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74", "isController": false}, {"data": [[1.59719586E12, 32.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69", "isController": false}, {"data": [[1.59719586E12, 9.0]], "isOverall": false, "label": "/-15", "isController": false}, {"data": [[1.59719586E12, 121.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47", "isController": false}, {"data": [[1.59719586E12, 175.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71", "isController": false}, {"data": [[1.59719586E12, 37.0]], "isOverall": false, "label": "/-13", "isController": false}, {"data": [[1.59719586E12, 162.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/1.gif-54", "isController": false}, {"data": [[1.59719586E12, 80.0]], "isOverall": false, "label": "/-5", "isController": false}, {"data": [[1.59719586E12, 18.0]], "isOverall": false, "label": "/-14", "isController": false}, {"data": [[1.59719586E12, 31.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49", "isController": false}, {"data": [[1.59719586E12, 15.0]], "isOverall": false, "label": "/-7", "isController": false}, {"data": [[1.59719586E12, 187.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", "isController": false}, {"data": [[1.59719586E12, 43.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", "isController": false}, {"data": [[1.59719586E12, 71.0]], "isOverall": false, "label": "/ip/-61", "isController": false}, {"data": [[1.59719586E12, 39.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6", "isController": false}, {"data": [[1.59719586E12, 101.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", "isController": false}, {"data": [[1.59719586E12, 152.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", "isController": false}, {"data": [[1.59719586E12, 52.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55", "isController": false}, {"data": [[1.59719586E12, 170.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22", "isController": false}, {"data": [[1.59719586E12, 146.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", "isController": false}, {"data": [[1.59719586E12, 102.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", "isController": false}, {"data": [[1.59719586E12, 131.0]], "isOverall": false, "label": "/webdig.js-53", "isController": false}, {"data": [[1.59719586E12, 174.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57", "isController": false}, {"data": [[1.59719586E12, 20.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", "isController": false}, {"data": [[1.59719586E12, 11.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9", "isController": false}, {"data": [[1.59719586E12, 45.0]], "isOverall": false, "label": "/i/news/right-d13.png-60", "isController": false}, {"data": [[1.59719586E12, 83.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17", "isController": false}, {"data": [[1.59719586E12, 46.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51", "isController": false}, {"data": [[1.59719586E12, 46.0]], "isOverall": false, "label": "/ma.gif-68", "isController": false}, {"data": [[1.59719586E12, 40.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75", "isController": false}, {"data": [[1.59719586E12, 227.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", "isController": false}, {"data": [[1.59719586E12, 136.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70", "isController": false}, {"data": [[1.59719586E12, 295.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", "isController": false}, {"data": [[1.59719586E12, 187.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", "isController": false}, {"data": [[1.59719586E12, 79.0]], "isOverall": false, "label": "/j/m_event.js-56", "isController": false}, {"data": [[1.59719586E12, 105.0]], "isOverall": false, "label": "/j/version.js-16", "isController": false}, {"data": [[1.59719586E12, 54.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", "isController": false}, {"data": [[1.59719586E12, 23.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20", "isController": false}, {"data": [[1.59719586E12, 40.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12", "isController": false}, {"data": [[1.59719586E12, 236.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", "isController": false}, {"data": [[1.59719586E12, 67.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72", "isController": false}, {"data": [[1.59719586E12, 109.0]], "isOverall": false, "label": "/js/v1/wa.js-58", "isController": false}, {"data": [[1.59719586E12, 314.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", "isController": false}, {"data": [[1.59719586E12, 167.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27", "isController": false}, {"data": [[1.59719586E12, 95.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", "isController": false}, {"data": [[1.59719586E12, 109.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", "isController": false}, {"data": [[1.59719586E12, 95.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", "isController": false}, {"data": [[1.59719586E12, 11.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48", "isController": false}, {"data": [[1.59719586E12, 21.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52", "isController": false}, {"data": [[1.59719586E12, 38.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67", "isController": false}, {"data": [[1.59719586E12, 52.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", "isController": false}, {"data": [[1.59719586E12, 342.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", "isController": false}, {"data": [[1.59719586E12, 107.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", "isController": false}, {"data": [[1.59719586E12, 104.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", "isController": false}, {"data": [[1.59719586E12, 70.0]], "isOverall": false, "label": "/weather_index/101040100.html-73", "isController": false}, {"data": [[1.59719586E12, 135.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", "isController": false}, {"data": [[1.59719586E12, 56.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", "isController": false}, {"data": [[1.59719586E12, 163.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", "isController": false}, {"data": [[1.59719586E12, 122.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", "isController": false}, {"data": [[1.59719586E12, 314.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", "isController": false}, {"data": [[1.59719586E12, 98.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719586E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59719586E12, "maxY": 1198.0, "series": [{"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/ip/-64", "isController": false}, {"data": [[1.59719586E12, 1198.0]], "isOverall": false, "label": "", "isController": true}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/ip/-62", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/ip/-63", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/ip/-66", "isController": false}, {"data": [[1.59719586E12, 382.0]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50", "isController": false}, {"data": [[1.59719586E12, 7.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-74", "isController": false}, {"data": [[1.59719586E12, 13.0]], "isOverall": false, "label": "/m2/i/favicon.ico-69", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/-15", "isController": false}, {"data": [[1.59719586E12, 94.0]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/travel_rank/3A10104.html-71", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/-13", "isController": false}, {"data": [[1.59719586E12, 23.0]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/1.gif-54", "isController": false}, {"data": [[1.59719586E12, 43.0]], "isOverall": false, "label": "/-5", "isController": false}, {"data": [[1.59719586E12, 12.0]], "isOverall": false, "label": "/-14", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/-7", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24", "isController": false}, {"data": [[1.59719586E12, 14.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28", "isController": false}, {"data": [[1.59719586E12, 8.0]], "isOverall": false, "label": "/ip/-61", "isController": false}, {"data": [[1.59719586E12, 18.0]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40", "isController": false}, {"data": [[1.59719586E12, 9.0]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37", "isController": false}, {"data": [[1.59719586E12, 69.0]], "isOverall": false, "label": "/webdig.js-53", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/j/weather2014/rili.js-9", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/news/right-d13.png-60", "isController": false}, {"data": [[1.59719586E12, 73.0]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17", "isController": false}, {"data": [[1.59719586E12, 22.0]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/ma.gif-68", "isController": false}, {"data": [[1.59719586E12, 30.0]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/index_around_2017/101040100.html-70", "isController": false}, {"data": [[1.59719586E12, 24.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/j/m_event.js-56", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/j/version.js-16", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12", "isController": false}, {"data": [[1.59719586E12, 16.0]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23", "isController": false}, {"data": [[1.59719586E12, 12.0]], "isOverall": false, "label": "/dingzhi/101040100.html-72", "isController": false}, {"data": [[1.59719586E12, 35.0]], "isOverall": false, "label": "/js/v1/wa.js-58", "isController": false}, {"data": [[1.59719586E12, 221.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43", "isController": false}, {"data": [[1.59719586E12, 81.0]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/weather_index/101040100.html-73", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44", "isController": false}, {"data": [[1.59719586E12, 16.0]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39", "isController": false}, {"data": [[1.59719586E12, 221.0]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19", "isController": false}, {"data": [[1.59719586E12, 0.0]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719586E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 9.0, "minX": 1.59719586E12, "maxY": 1441.0, "series": [{"data": [[1.59719586E12, 1441.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59719586E12, 9.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59719586E12, 476.49999999999994]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59719586E12, 1441.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59719586E12, 685.700000000001]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719586E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1000.0, "maxY": 297.0, "series": [{"data": [[1000.0, 105.0], [2000.0, 297.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2000.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1, "maxX": 2000.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.create();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1000.0, "maxY": 187.0, "series": [{"data": [[1000.0, 79.0], [2000.0, 187.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2000.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1, "maxX": 2000.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.1833333333333333, "minX": 1.59719586E12, "maxY": 1.1833333333333333, "series": [{"data": [[1.59719586E12, 1.1833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719586E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59719586E12, "maxY": 1.1333333333333333, "series": [{"data": [[1.59719586E12, 1.1333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59719586E12, 0.03333333333333333]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.URISyntaxException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59719586E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59719586E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/weather_index/101040100.html-73-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/news/2019/10/16/20191016180013A8588A9EB08603B1BABD1198C75E7194.jpg-40-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/dingzhi/101040100.html-72-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/202006301120352B492ADE7C8B8246242A6C222212AA02.jpg-21-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2017/selectCityBtnCur.png-46-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/travel_rank/3A10104.html-71-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/29/20200629152605FDBA4A8C8B73B4075C66154ECC7054AC.jpg-31-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/-5-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ip/-61-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/index/page_flip.png-48-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/-14-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-0-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/weather2015/publicHead.js-55-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ip/-63-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/index_around_2017/101040100.html-70-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/-7-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/climate/2019/12/03/20191203114313ED56810B95D5B15CD51B7C7DA0443CD3.jpg-42-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/22/2020062209212667B20E735FDF691D9FA5D06C72150B10.jpg-37-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/science/2019/01/28/2019012814264980DE46E119A40EF86458E6A64E8EF33D.jpg-39-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/24/20200624094100B20C89A2BABEF3BCA5070460F4BA02FD.jpg-33-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2020/06/29/202006291558495FED4CCE6554F6DEABDCAE608E25D7CF.jpg-30-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/index/2019/09/02/2019090215482837F83D2FD1F0E8AEBFC4C5DE07E1B6DE.jpg-25-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/news/right-d13.png-60-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/m2/i/favicon.ico-69-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/weather2018/cy/pc/index/1.png-75-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630113608C19AD227CC9874180183DF25642DC4BF.jpg-29-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-1-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/science/2019/02/11/201902111445397FDC90E247F8477463582D8C29EBE822.jpg-41-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/c/weather2015/index/main_0814.css-6-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-0-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/news/2019/10/23/20191023173718AE789778E6A8EC1311730736EF7071D2.jpg-43-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2017/cx_new.png-50-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/index/loading.gif-47-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/index/2020/06/29/1593388736823054275.jpg-27-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/16/202006161449513E3BF3077B0E41097965D0789CF03D78.jpg-36-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/index/2020/06/15/2020061510214249B3D90D7A7051CB7A14F2A4B0DF254D.png-26-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2020/06/25/2020062511075499F86EF2F056C1A58C7A2237666A5DB8.jpg-28-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/sjztj/2019/10/29/201910281008514BABD1DE0A34725E596E45D93BD838D0_xm.jpg-34-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/28/20200628125950D2B43EE44DD3B2EA46621AA0E3401FE8.jpg-32-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/webdig.js-53-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/gsorganizationvalsha2g2-65-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/m/sevp_nmc_stfc_sfer_er24_achn_l88_p9_20200630060002400.jpg-19-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/user/icon-hui.png-67-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/index/weixin.png-49-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2020/06/30/20200630101447BD97BBBDBD443F778B1AF6318D1A4E3F.jpg-18-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/user/my-head.png-22-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/climate/2019/01/28/20190128114251E3EC693AB6DFBDECEF88074012C2408C.jpg-45-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/photo/2019/10/28/20191028144048D58023A73C43EC6EEB61610B0AB0AD74_xm.jpg-38-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/gsorganizationvalsha2g2-17-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/jquery-1.8.2.js-57-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/js/v1/wa.js-58-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i//product/pic/s/sevp_nsmc_wxbl_fy4a_etcc_achn_lno_py_20200630073000000.jpg-24-1-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/-15-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/version.js-16-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/m_event.js-56-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "-failure", "isController": true}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/sjztj/2020/06/29/2020062911343196A3808E9B806FE44ABA4DB5E5A695EC.jpg-23-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/weather2015/index/main_0814.js-12-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ip/-62-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ma.gif-68-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ip/-66-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/j/weather2014/rili.js-9-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/ucenter/pc/email.png-20-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/life/2020/06/23/202006231139039CF425AE9F72DE9E8F9D6B8D9363A7A6.jpg-35-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/images/cn/science/2019/01/22/2019012210010705E6325396647C3B3154BAE3949C8C3D.jpg-44-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/1.gif-54-failure", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/ip/-64-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/-13-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/chinasosearch/chinaso-weather1.html-51-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/i/weather2015/index/slhx.png-52-success", "isController": false}, {"data": [[1.59719586E12, 0.016666666666666666]], "isOverall": false, "label": "/travel_rank/3A10104.html-74-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719586E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.59719586E12, "maxY": 1.1666666666666667, "series": [{"data": [[1.59719586E12, 1.1666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.59719586E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59719586E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "responseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    choiceContainer.find("label").each(function(){
        this.style.color = color;
    });
}
