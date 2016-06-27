// ==UserScript==
// @name         Blogger Statistics Hider
// @name:zh-TW   Blogger 流量資訊隱藏
// @namespace    http://www.twsiyuan.com/
// @version      0.2
// @description  Hide all statistics info in blogger
// @description:zh-TW  在 Blogger 管理頁面中，隱藏所有的流量統計資訊
// @author       Siyuan
// @match        https://www.blogger.com/home
// @match        https://www.blogger.com/blogger.g*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    
    $('img.blogg-button-image').each(function() {
        var container = $(this).parent().parent().parent();
        container.find('img').each(function() {
            if ($(this).attr('src').startsWith('//chart')){
                $(this).hide();
            }
        });
        container.find('a').each(function() {
            var href = $(this).attr('href');
            if (href && href.indexOf('#overviewstats') >= 0){
                $(this).hide();
            }
        });
    });
    
    
    $('div.overview a').each(function() {
        var href = $(this).attr('href');
        if (href && href.indexOf('#overviewstats') >= 0){
            $(this).text('');
        }
    });
    
    var sheet = window.document.styleSheets[0];
    sheet.insertRule('.gwt-Image { visibility: hidden !important; }', sheet.cssRules.length);
    sheet.insertRule('.editPosts tr td:nth-child(7) { display: none !important; }', sheet.cssRules.length);   
    sheet.insertRule('.pages tr td:nth-child(7) { display: none !important; }', sheet.cssRules.length);
})();
