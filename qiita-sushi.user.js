// ==UserScript==
// @name         Qiita Sushi
// @namespace    https://greasyfork.org/users/432749
// @description  QiitaのLGTMアイコンをSushiアイコンに変更する
// @author       fukuchan
// @match        https://qiita.com/*
// ==/UserScript==

/*
 * Sushiemoji
 * Copyright 2017 yantene
 */
const viewBox = "0 0 64 64";
const innerHTML = '<defs><style>.a{fill:#eee;}.b{fill:#bdbdbd;}.c{fill:#d32f2f;}.d{fill:#b71c1c;}</style></defs><title>tuna</title><path class=\"a\" d=\"M53.94,44.75l-3.07.77a16,16,0,0,1-12.76-2.21l-14.55-9.7A8,8,0,0,1,20,27V23a8,8,0,0,1,6.06-7.76l3.07-.77a16,16,0,0,1,12.76,2.21l14.55,9.7A8,8,0,0,1,60,33v4A8,8,0,0,1,53.94,44.75Z\"/><path class=\"b\" d=\"M60,33a8,8,0,0,1-6.06,7.73l-3.07.77A16,16,0,0,1,46,42V41a8,8,0,0,0-3.56-6.66l-14.55-9.7A16,16,0,0,0,20.07,22,8.08,8.08,0,0,0,20,23h0v4a8,8,0,0,0,3.56,6.66l14.55,9.7c.42.28.85.53,1.29.76l.29.15c.43.22.87.42,1.31.6l.25.09q.59.23,1.2.41l.29.09c.45.12.9.23,1.36.31l.37.06c.43.07.86.12,1.29.16l.17,0h0a16,16,0,0,0,4.93-.44l3.07-.77A8,8,0,0,0,60,37V33Z\"/><path class=\"a\" d=\"M37.94,54.75l-3.07.77a16,16,0,0,1-12.76-2.21L7.56,43.61A8,8,0,0,1,4,37V33a8,8,0,0,1,6.06-7.76l3.07-.77a16,16,0,0,1,12.76,2.21l14.55,9.7A8,8,0,0,1,44,43v4A8,8,0,0,1,37.94,54.75Z\"/><path class=\"b\" d=\"M37.94,50.75l-3.07.77a16,16,0,0,1-12.76-2.21L7.56,39.61A8,8,0,0,1,4,33v4a8,8,0,0,0,3.56,6.66l14.55,9.7a16,16,0,0,0,12.76,2.21l3.07-.77A8,8,0,0,0,44,47V43A8,8,0,0,1,37.94,50.75Z\"/><path class=\"c\" d=\"M16,17.76v3.42a1,1,0,0,0,.81,1c11.44,2.27,21,12,28.79,19.74a1,1,0,0,0,.95.26l14.69-3.67a1,1,0,0,0,.76-1V32.39a1.2,1.2,0,0,0-.29-.7C56,24,44,15.07,32.22,13a1,1,0,0,0-.43,0l-15,3.76A1,1,0,0,0,16,17.76Z\"/><path class=\"d\" d=\"M61.24,33.36,46.55,37a1,1,0,0,1-.95-.26C37.85,29,28.26,20.59,16.81,18.32a1,1,0,0,1-.78-.77,1,1,0,0,0,0,.21v3.42a1,1,0,0,0,.81,1c11.44,2.27,21,12,28.79,19.74a1,1,0,0,0,.95.26l14.69-3.67a1,1,0,0,0,.76-1V32.39h0A1,1,0,0,1,61.24,33.36Z\"/><path class=\"c\" d=\"M2,26.58V30a1,1,0,0,0,.81,1c11.44,2.27,21,13,28.79,20.74a1,1,0,0,0,.95.26L47.24,48.3a1,1,0,0,0,.76-1V42.22a1,1,0,0,0-.29-.7C39.81,33.61,30,23.9,18.22,21.84a1,1,0,0,0-.43,0l-15,3.76A1,1,0,0,0,2,26.58Z\"/><path class=\"d\" d=\"M47.24,43.19,32.55,46.86a1,1,0,0,1-.95-.26C23.85,38.86,14.26,29.41,2.81,27.15A1,1,0,0,1,2,26.37a1,1,0,0,0,0,.21V30a1,1,0,0,0,.81,1c11.44,2.27,21,13,28.79,20.74a1,1,0,0,0,.95.26L47.24,48.3a1,1,0,0,0,.76-1V42.22h0A1,1,0,0,1,47.24,43.19Z\"/>';

// SVG要素の中身をSushiに変更する
const sushinize = node => {
    node.setAttribute('viewBox', viewBox);
    node.innerHTML = innerHTML;
};

// ボタンを押すなどして要素に変更があったら再びSushiに変更する
const handleObserver = (records, observer) => {
    observer.disconnect();
    sushinize(records[0].target);
    observer.observe(records[0].target, {attributes: true});
};

// LGTMのSVG要素をそれぞれSushiに変更し、要素の変更を監視する
const images = document.querySelectorAll('*[class*="like"] svg, .ItemLink__status svg');
images.forEach(image => {
    sushinize(image);
    new MutationObserver(handleObserver).observe(image, {attributes: true});
});

// 文字列のLGTMをSushiに置換する
const texts = document.querySelectorAll('.userPopularItems_likeUnit');
texts.forEach(text => {
    text.textContent = "Sushi";
});