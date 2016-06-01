// ==UserScript==
// @name         Blogger Statistics Hider
// @name:zh-TW   Blogger 流量資訊隱藏
// @namespace    http://www.twsiyuan.com/
// @version      0.1
// @description  Hide all statistics info in blogger
// @description:zh-TW  在 Blogger 管理頁面中，隱藏所有的流量統計資訊
// @author       Siyuan
// @match        https://www.blogger.com/home
// @match        https://www.blogger.com/blogger.g*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var sheet = window.document.styleSheets[0];
    sheet.insertRule('.gwt-Image { display: none !important; }', sheet.cssRules.length);
    sheet.insertRule('.OJTUNIC-q-A tr:nth-child(3) { display: none !important; }', sheet.cssRules.length);
    sheet.insertRule('.DY0BBXD-p-d a:nth-child(2) { display: none !important; }', sheet.cssRules.length);
    sheet.insertRule('.OJTUNIC-F-g { display: none !important; }', sheet.cssRules.length);
    sheet.insertRule('.DY0BBXD-p-m { display: none !important; }', sheet.cssRules.length);
   
})();
