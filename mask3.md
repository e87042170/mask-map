---
layout: default
title: mask3
---

# 口罩地圖實作 - Marker 地圖標記

地圖可以正確顯示之後，接下來我們就可以嘗試看看放置地圖標記(Marker)。

要放置地圖標記很簡單，只要在 `initMap()` 函數裡面，map物件的後面加入下列的程式即可。

<pre class="prettyprint linenums"><code class="language-javascript">var map;
var markers;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.6393936, lng: 120.3025675},
    zoom: 15
  });
  //增加地圖標記
  markers = new google.maps.Marker({
    position: {lat: 22.6393936, lng: 120.3025675},
    map: map
  });
}</code></pre>

*marker* 的 *position* 屬性先放上高雄火車站的座標，之後我們可以再修改座標位置。

> 範例：[增加地圖標記 Marker ](https://e87042170.github.io/mask-map/demo/google-maps-add-markers-01.html)

重新整理網頁之後，應該就可以看到在高雄火車站上，出現了一個預設的地圖標記。接下來，就可以試著使用迴圈來產生多個地圖標記了。

# 新增多個地圖標記

再來我們先新增一個 `position` 的陣列，這個陣列裡面包含多個座標位置，順便把標籤 `label` 加進去，方便我們識別。

<pre class="prettyprint linenums"><code class="language-javascript">var position = [
  {label:'A', lat: 22.6393936, lng: 120.2825675},
  {label:'B', lat: 22.6493936, lng: 120.2925675},
  {label:'C', lat: 22.6393936, lng: 120.3025675},
  {label:'D', lat: 22.6293936, lng: 120.3125675},
  {label:'E', lat: 22.6393936, lng: 120.3225675}
];</code></pre>

有了陣列之後，我們就可以使用迴圈來幫我們新增多個地圖標記。

<pre class="prettyprint linenums"><code class="language-javascript">for (var i = 0; i < position.length; i++) {
  markers = new google.maps.Marker({
    position: {lat:position[i].lat , lng:position[i].lng},
    label: position[i].label,
    map: map
  });
}</code></pre>

因為我們要做口罩地圖，所接下來只要把 `position` 的陣列內容，改成藥局的座標位置，就可以在 Google Map 上顯示藥局的位置了。

> 範例：[增加多個地圖標記](https://e87042170.github.io/mask-map/demo/google-maps-add-markers-02.html)
