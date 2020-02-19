---
layout: default
title: mask3
---

# 口罩地圖實作 - Marker 地圖標記

地圖可以正確顯示之後，接下來我們就可以嘗試看看放置地圖標記(Marker)。

要放置地圖標記很簡單，只要在 `initMap()` 函數裡面，map物件的後面加入下列的程式即可。

```js
var map;
var markers;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.6393936, lng: 120.3025675},
    zoom: 8
  });
  //增加地圖標記
  var markers = new google.maps.Marker({
    position: {lat: 22.6393936, lng: 120.3025675},
    map: map
  });
}
```

*marker* 的 *position* 屬性先放上高雄火車站的座標，之後我們可以再修改座標位置。

> 範例：[增加地圖標記 Marker ](https://e87042170.github.io/mask-map/demo/google-maps-add-markers-01.html)

重新整理網頁之後，應該就可以看到在高雄火車站上，出現了一個預設的地圖標記。接下來，就可以試著使用迴圈來產生多個地圖標記了。

# 新增多個地圖標記



```js
var position = [
  {label:'A', lat:22.6393936, lng:120.3025675},
  {label:'B', lat:22.6393836, lng:120.3025775},
  {label:'C', lat:22.6393736, lng:120.3025875},
  {label:'D', lat:22.6393636, lng:120.3025975},
  {label:'E', lat:22.6393536, lng:120.3025075}
];
```



