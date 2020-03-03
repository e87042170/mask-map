---
layout: default
title: mask4
---

# 口罩地圖實作 - 變更地圖標記圖案

在上一篇文章，我們的地圖已經可以正確地顯示藥局及口罩剩餘數量，既然有口罩剩餘數量，那我們就可以判斷口罩的剩餘數量來變更地圖標記的圖案，讓地圖清楚的區分出各藥局剩餘口罩數量的概況。

地圖標記的圖案可以使用自行定義的圖案，我們這邊使用 Google 提供的[圖案](http://kml4earth.appspot.com/icons.html){:rel="nofollow" target="_blank"}。

要變更地圖標記的圖案，只要修改 `marker` 物件的 `icon` 屬性即可。

```js
var icon = {
    url: 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png',  //使用者定義的圖案
};
markers[e] = new google.maps.Marker({
    position: {lat: pos.lat,lng: pos.lng},
    map: map,
    icon:icon  //使用者可以藉由修改 icon 的 url 屬性變更圖案
});
```

我們先以成人的口罩數量來做判斷，預設是紅色的，如果大於20小於等於50就變成黃色，如果大於50就變成綠色，判斷基準可以自行定義。當然，要以兒童的數量來判斷也可以，只要多一個切換或選擇的功能就可以做到，但是判斷的基準也要記得修改，因為兒童口罩的數量比較少，所以基準會不同。

因此，只要將 `addMarker` 的函數修改成下面這樣，就可以讓地圖自動根據成人口罩數量變更成不同的地圖標記。 

```js
function addMarker(e,pos) {
    //取得目前藥局的成人口罩剩餘數
    var x=pharmacy[e]["成人口罩剩餘數"];
    //判斷數量變更地圖標記圖案
    var icon_url='http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
    if(x>50){
        icon_url='http://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
    }else if(x>20){
        icon_url='http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
    }
    var icon = {
        url: icon_url,
    };
    markers[e] = new google.maps.Marker({
        position: {lat: pos.lat,lng: pos.lng},
        map: map,
        icon:icon
    });
    var msg='<h1>'+pharmacy[e]["醫事機構名稱"]+'</h1>'
            +'<div>'+pharmacy[e]["醫事機構地址"]+'</div><br>'
            +'<div><span class="adult">成人：'+pharmacy[e]["成人口罩剩餘數"]+'</span> '
            +'<span class="child">兒童：'+pharmacy[e]["兒童口罩剩餘數"]+'</span></div>';
    addInfoWindow(markers[e],msg);
}
```

> 範例：[根據口罩剩餘數量，變更地圖標記圖案](https://e87042170.github.io/mask-map/demo/google-maps-change-marker.html){:rel="nofollow" target="_blank"}

