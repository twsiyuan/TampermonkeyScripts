// ==UserScript==
// @name         Uni FM96.7 Player Updater
// @name:zh-TW   FM96.7 環宇廣播電台線上收聽播放器調整
// @namespace    http://www.twsiyuan.com/
// @version      0.3
// @description:zh-TW  產生下載連結，修改 Flash Player 為 HTML5 內鍵撥放器
// @author       Siyuan
// @match        http://www.uni967.com/newweb/AOD2_no.php*
// @match        http://www.uni967.com/newweb/index.php*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @description 產生下載連結，修改 Flash Player 為 HTML5 內鍵撥放器
// ==/UserScript==

$(document).ready(function() {
    if (window.location.pathname.toString().startsWith('/newweb/AOD2_no')) {
        doPlayer();
    } else {
        doTable();
    }
});

var analysisCallback = function(embed, url, callback) {
    if (!embed) {
        return;
    }
    
    var flashvars = embed.attr("flashvars");
    if (!flashvars) {
         return;
    }
        
    // 音源位置
    var vars = /son=([^&]+)/.exec(flashvars);
    if (!vars){
        return;
    }

    var audioUrl = vars[1];

    // 節目資料網頁位置
    var ids = /ID=([0-9]+)$/.exec(url);
    if (!ids){
        return;
    }
    
    var id = ids[1];
    var dataUrl = "http://www.uni967.com/newweb/index.php?menu=2&page=2_1&ID=" + id;

    $.get(dataUrl, function(data) {
        // 分析資料網頁，抓取節目名稱
        var title = $(data).find("span.news_title_blue").text();

        callback(audioUrl, title);
    });
};

var doPlayer = function() {
    var embed = $("embed");
    analysisCallback(embed, window.location.href, function(audioUrl, title) {
         // 產生下載連結
        var download = $('<a href="' + audioUrl + '" download="' + title + '">Download (' + title + ')</a>');

        // 產生音源播放 (HTML5 標準)
        var paramSaveName = "ui967Volume";
        var volumeChanged = "if(typeof(Storage) !== 'undefined'){localStorage.setItem('" + paramSaveName + "', this.volume);}";
        var loadStart = "if(typeof(Storage) !== 'undefined'){this.volume=localStorage.getItem('" + paramSaveName + "');}";

        var player = $('<audio controls autoplay src="' + audioUrl + '" onvolumechange="' + volumeChanged + '" onloadstart="' + loadStart + '" style="width:100%;">Your browser does not support the audio tag.</audio>');
        var parent = embed.parent();
        
        parent.append(player);
        parent.append(download);

        embed.remove();
    });
};

var doTable = function() {
    var links = $("a");
    links.each(function(){
        var link = $(this);
        var onclick = link.attr('onclick');
        if (onclick) {
            var arr = /window.open\('([^']+)'/.exec(onclick);
            if (arr) {
                var uri = arr[1];
                var dataUrl = "http://www.uni967.com/newweb/" + uri;

                $.get(dataUrl, function(data) {
                    var embed = /<embed(.+)<\/embed>/.exec(data);
                    if (embed) {
                        analysisCallback($(embed[0]), dataUrl, function(audioUrl, title) {
                            var parent = link.parent();
                            var download = $('<a href="' + audioUrl + '" download="' + title + '">下載</a>');

                            parent.append($('<br/>'));
                            parent.append(download);
                        });
                    }
                });
            }
        }
    });
};
