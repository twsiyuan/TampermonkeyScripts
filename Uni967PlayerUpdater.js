// ==UserScript==
// @name         Uni FM96.7 Player Updater
// @name:zh-TW   FM96.7 環宇廣播電台線上收聽播放器調整
// @namespace    http://www.twsiyuan.com/
// @version      0.1
// @description:zh-TW  產生下載連結，修改 Flash Player 為 HTML5 內鍵撥放器
// @author       Siyuan
// @match        http://www.uni967.com/newweb/AOD2_no.php*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    var embed = $("embed");
    
    // 音源位置
    var audioUrl = getUrlParameterFromString(embed.attr("flashvars"), "son");
    
    // 節目資料網頁位置
    var id = getUrlParameterFromString(window.location.search.substring(1), "ID");
    var dataUrl = "http://www.uni967.com/newweb/index.php?menu=2&page=2_1&ID=" + id;

    $.get(dataUrl, function(data) {
        // 分析資料網頁，抓取節目名稱
        var title = $(data).find("span.news_title_blue").text();
        var parent = embed.parent();
        
        // 產生下載連結
        var download = $('<a href="' + audioUrl + '" download="' + title + '">Download</a>');
        
        // 產生音源播放 (HTML5 標準)
        var player = $('<audio controls autoplay src="' + audioUrl + '">Your browser does not support the audio tag.</audio>');
        
        parent.append(player);
        parent.append(download);
        
        embed.remove();
    });
});

var getUrlParameterFromString = function getUrlParameter(sUrl, sParam) {
    var sPageURL = decodeURIComponent(sUrl);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam && sParameterName.length >= 2) {
            return sParameterName[1] === undefined ? '' : sParameterName[1];
        }
    }
};
