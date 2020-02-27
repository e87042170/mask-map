---
layout: default
title: mask4
---

# 口罩地圖實作 - 加入資訊視窗 InfoWindow

# 結合口罩剩餘數量資料顯示地圖標記

在上一篇文章裡，我們已經可以在地圖上顯示全台藥局的地圖標記了，這次要結合健保局口罩剩餘數量的開放資料顯示地圖標記，並且在每個標記上加資訊視窗，也就是加入 **InfoWindow**。

我們先去健保局的[開放資料網站](https://data.nhi.gov.tw/Datasets/DatasetResource.aspx?rId=A21030000I-D50001-001)下載口罩剩餘數量的 `csv`，接著，我們一樣用 `$.ajax` 取得口罩剩餘數量的資料，再去比對有地理位置座標的資料，我們可以比對**醫事機構代碼**，有找到一樣的才加入地圖座標。

```js
$.ajax({
    type: "GET",
    url: "maskdata.csv",//口罩剩餘數量的開放資料
    dataType: "text",
    success: function(csv) {
        pharmacy=JSON.parse(csvJSON(csv))
        $.ajax({
            type: "GET",
            url: "data.csv",//包含GPS座標的資料
            dataType: "text",
            success: function(csv) {
                position=JSON.parse(csvJSON(csv))
                for (var i = 0; i < pharmacy.length; i++) {
                    var pos=getGeo(pharmacy[i]['醫事機構代碼'],position);
                    if(pos.lat!='null'){
                        addMarker(i,pos);
                    }
                }
            }
        }); 
    }
}); 
```

```js
function addMarker(e,pos) {
    markers[e] = new google.maps.Marker({
        position: {
            lat: pos.lat,
            lng: pos.lng
        },
        map: map,
    });
}
function getGeo(val,geojson){
    for (var i = 0; i < geojson.length; i++) {
        if(val==geojson[i]['醫事機構代碼']){
            return {
                lat: parseFloat(geojson[i]["\"TGOS Y\""]),
                lng: parseFloat(geojson[i]["\"TGOS X\""])
            };
        }
    }
    return {lat: 'null',lng: 'null'};
}
```

修改完成之後，我們的地圖上就會只剩下健保特約藥局的地圖標記。

# 加入資訊視窗 InfoWindow

有了健保特約藥局的標記之後，我們就要開始加入資訊視窗(InfoWindow)，要怎麼加呢？很簡單，只要加入以下的程式碼即可。

```js
var infoWindow = new google.maps.InfoWindow({
    content: message
});
```

`message` 是你要顯示的資訊內容，我們可以把藥局的名稱、地址及口罩剩餘數量等資訊加到 `message` 裡面。

但是，這樣還無法在地圖上顯示資訊視窗，要顯示視窗需要把地圖標記加入監聽事件，然後再把剛剛新增的 `InfoWindow` 物件丟到監聽事件裡面做顯示的動作，這樣地圖標記和資訊視窗的關係才能夠對應得起來。

我們可以把上面的一連串動作包起來做成一個函數。

```js
function addInfoWindow(marker, message) {
    //新增資訊視窗
    var infoWindow = new google.maps.InfoWindow({
        content: message
    });
    //點擊該地圖標記(marker)時，就開啟剛剛新增的資訊視窗(InfoWindow)
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}
```

因為這個函數需要輸入2個參數，所以我們要在 `addMarker` 的函數裡面呼叫這個函數，然後在新增 **marker** 之後，一起把 `message` 的資訊丟到這個函數裡。

```js
function addMarker(e,pos) {
    markers[e] = new google.maps.Marker({
        position: {
            lat: pos.lat,
            lng: pos.lng
        },
        map: map,
    });
    var msg='<h1>'+pharmacy[e]["醫事機構名稱"]+'</h1>'
            +'<div>'+pharmacy[e]["醫事機構地址"]+'</div><br>'
            +'<div><span class="adult">成人：'+pharmacy[e]["成人口罩剩餘數"]+'</span> '
            +'<span class="child">兒童：'+pharmacy[e]["兒童口罩剩餘數"]+'</span></div>';
    addInfoWindow(markers[e],msg);
}
```

現在我們的地圖已經可以在點擊地圖標記時，顯示正確的藥局及口罩資訊，但是，資訊視窗好像會越點越多齁。

因此，我們再把 `addInfoWindow` 的函數修改一下，如果目前有已開啟的資訊視窗，就把它關閉。

```js
function addInfoWindow(marker, message) {
    var infoWindow = new google.maps.InfoWindow({
        content: message
    });
    google.maps.event.addListener(marker, 'click', function () {
        //如果目前有已開啟的資訊視窗，就把它關閉
        if(curInfoWindow!=''){
            curInfoWindow.close();
            curInfoWindow=''
        }  
        curInfoWindow=infoWindow;
        infoWindow.open(map, marker);
    });
}
```

這樣就可以在點下一個地圖標記時，自動把上一個資訊視窗關閉。

目前為止，我們的地圖已經可以正確地顯示藥局及口罩剩餘數量，下一篇文章，我們要來讓地圖標記可以根據剩餘數量，自動地改變標記顏色。

> 範例：[結合口罩剩餘數量資料，加入資訊視窗](https://e87042170.github.io/mask-map/demo/google-maps-add-infowindow.html){:rel="nofollow" target="_blank"}

