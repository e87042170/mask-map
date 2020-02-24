---
layout: default
title: mask4
---

# 口罩地圖實作 - 產生藥局位置的地圖標記

# csv To JSON

要標示藥局的地圖標記，就要有藥局的地理位置座標，上網找了一下政府的 **opendata** ，裡面只有藥局及衛生所的地址及其他相關資訊，就是沒有包含地理位置座標，
幸好有大神利用 TGOS API 取得座標資訊並[分享](https://github.com/kiang/pharmacies/blob/master/data.csv)出來，我們就先直接拿來用吧，改天有時間再來研究怎麼從地址取得 GPS 座標。

有了藥局的座標位置之後，我們先試看看把座標資料轉換成 `position` 的陣列。因為資料來源是 `csv` 的檔案格式，因此我們需要先把他轉成 `JSON` 的格式，轉完之後把資料丟到 `position` 陣列裡面就可以了。

因為 **Javascript** 裡面沒有 `csv` 轉 `JSON` 的函數，因此必須自行新增一個函數來處理。

```js
function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}
```

# 取得資料集 DataSet

轉完之後的格式是字串格式，所以還要再 **parse** 成 `JSON` 格式。還有，因為資料裡面的地理座標是**字串**資料格式，在丟到 `position` 屬性裡面時，要先轉換成 **Float** 的資料格式。

再來，我們可以看到因為藥局的資料裡面，有些未包含地理座標位置，所以我們在新增地圖標記的時候也要記得把它剔除掉。

因為我們要使用 **JQuery** 的 `$.ajax` 函數來取得資料，因此還需要載入 JQuery。

```js
$.ajax({
    type: "GET",
    url: "data.csv",
    dataType: "text",
    success: function(csv) {
        position=JSON.parse(csvJSON(csv))
        for (var i = 0; i < position.length; i++) {
            var lat=parseFloat(position[i]["\"TGOS Y\""])
            var lng=parseFloat(position[i]["\"TGOS X\""])
            if(lat!='null'){
                markers = new google.maps.Marker({
                    position: {lat:lat, lng:lng},
                    // label: position[i].label,
                    map: map
                });
            }
        }
    }
}); 
```

到這裡，我們已經可以從資料集中取得我們需要的資料，再來，我們要把地理座標位置的資料集和口罩剩餘數量的資料集做一個整合，這樣我們就可以在地圖上顯示藥局及口罩數量等資訊。

> 範例：[從資料集中，增加多個地圖標記](https://e87042170.github.io/mask-map/demo/google-maps-add-markers-03.html){:rel="nofollow" target="_blank"}










