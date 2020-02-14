# 口罩地圖實作 - 使用 Google Maps JavaScript API

有了 API KEY 之後，我們就可以開始使用 Google Maps JavaScript API 了。

首先，先到 Google 官網的說明裡面複製基本的範例。

<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
  </body>
</html>

然後把 YOUR_API_KEY 改成你剛剛申請的 API KEY，應該就可以顯示滿版的 Google Map 了。

如果你的地圖顯示成灰色，且有"For development purposes only"的字樣，那就是你的專案沒有連結的帳單帳戶，你需要建立一個帳單帳戶，又或者是你連 API KEY 都不給(如果是要練習的話就不用給)；如果你的地圖顯示"糟糕！出了點狀況。"，那就是你的 API KEY 沒改，或者是限制金鑰的設定問題。

# Map Options 必要選項

每個地圖都有2個必要選項，center以及zoom。

範例中 Map 的 center(地圖中心經緯度)，顯示的是澳洲雪梨附近，你可以開 Google Map 定位一個定位點，例如高雄火車站，然後你可以在網址列看到經緯度。

在@後面的是緯度及經度，這個代表地圖的中心點，後面的!3d及!4d才是你的標示點的緯度及經度，修改後的經緯度如下。

center: {lat: 22.6393936, lng: 120.3025675}

lat代表的緯度，lng則是經度。

zoom是指地圖的縮放層級，它可以設定0~22的值，常用的縮放層級如下：

* 1：世界層級
* 5：洲層級
* 10：城市層級
* 15：街道層級 
* 20：建築物層級

我們把範例地圖的縮放層級修改為街道層級。

zoom: 15

我們的地圖可以正確顯示之後，接下來我們就可以嘗試看看放置地圖標記(Marker)。

