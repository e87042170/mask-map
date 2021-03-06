var map;
var markers = [];
var pharmacy = [];
var position = [];
var curInfoWindow='';
// The location of Uluru
var uluru = {lat: 22.6393936, lng: 120.3025675};//高雄火車站
var max_radius=1800;    //半徑(公尺)
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,initMap());
  } else {
    console.log("Geolocation is not supported by this browser.");
    initMap();
  }
}

function showPosition(position) {
    lat=position.coords.latitude;
    lng=position.coords.longitude;
    uluru = {lat: lat, lng: lng};
    initMap();
}
// Initialize and add the map

function initMap() {        
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15, 
            center: uluru,
            // styles: [
            //   {
            //       featureType: 'poi.business',
            //       stylers: [{visibility: 'off'}]
            //   },
            //   {
            //       featureType: 'poi.park',
            //       elementType: 'labels.text',
            //       stylers: [
            //       {visibility: 'off'}
            //       ]
            //   }
            // ]		  
          });
    google.maps.event.addListener(map, 'idle', function() {
      //console.log("Bounds = "+map.getBounds());
      clearMarkers();
      markers=[];
      for (var i = 0; i < pharmacy.length; i++) {
        var pos=getGeo(pharmacy[i]['醫事機構代碼'],position);
        if(pos.lat!='null'){
            var map_center = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
            var marker_pos = new google.maps.LatLng(pos.lat, pos.lng);
            var dist=google.maps.geometry.spherical.computeDistanceBetween(map_center, marker_pos);
            if(dist<max_radius){
                addMarker(i,pos);
            }
        }
      }
    });
    $.ajax({
      type: "GET",
      url: "maskdata.csv",
      dataType: "text",
      success: function(csv) {
        pharmacy=JSON.parse(csvJSON(csv))
        var updatetime=pharmacy[0]['來源資料時間'];
        if (updatetime==undefined){
          updatetime=pharmacy[0]['來源資料時間\r'];
        }
        $('#update').html("最後更新時間："+updatetime)
        $.ajax({
          type: "GET",
          url: "data.csv",
          dataType: "text",
          success: function(csv) {
            position=JSON.parse(csvJSON(csv))
            for (var i = 0; i < pharmacy.length; i++) {
              var pos=getGeo(pharmacy[i]['醫事機構代碼'],position);
              if(pos.lat!='null'){
                  var map_center = new google.maps.LatLng(lat, lng);
                  var marker_pos = new google.maps.LatLng(pos.lat, pos.lng);
                  var dist=google.maps.geometry.spherical.computeDistanceBetween(map_center, marker_pos);
                  if(dist<max_radius){
                      addMarker(i,pos);
                  }
              }
            }
            //var markerCluster = new MarkerClusterer(map, markers,{imagePath:'https://googlemaps.github.io/v3-utility-library/packages/markerclustererplus/images/m'});
          }
        }); 
      }
    }); 
  }
  function addMarker(e,pos) {
    var x=pharmacy[e]["成人口罩剩餘數"];
    
    var icon_url='http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
    if(x>50){
      icon_url='http://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
    }else if(x>20){
      icon_url='http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
    }
    var icon = {
        url: icon_url, // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
      position: {
        lat: pos.lat,
        lng: pos.lng
      },
      map: map,
      icon:icon
    //   label: position[e].label
    });
    markers.push(marker);
    var msg='<h1>'+pharmacy[e]["醫事機構名稱"]+'</h1>'
            +'<div>'+pharmacy[e]["醫事機構地址"]+'</div><br>'
            +'<div><span class="adult">成人：'+pharmacy[e]["成人口罩剩餘數"]+'</span> '
            +'<span class="child">兒童：'+pharmacy[e]["兒童口罩剩餘數"]+'</span></div>';
    addInfoWindow(marker,msg);
  }
  function addInfoWindow(marker, message) {
    var infoWindow = new google.maps.InfoWindow({
        content: message
    });
    google.maps.event.addListener(marker, 'click', function () {
      if(curInfoWindow!=''){
        curInfoWindow.close();
        curInfoWindow=''
      }  
      infoWindow.open(map, marker);
      curInfoWindow=infoWindow;
    });
  }
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
      setMapOnAll(null);
  }
  function getGeo(val,geojson){
    for (var i = 0; i < geojson.length; i++) {
        if(val==geojson[i]['醫事機構代碼']&&!isNaN(parseFloat(geojson[i]["\"TGOS Y\""]))&&!isNaN(parseFloat(geojson[i]["\"TGOS X\""]))){
            return {
                lat: parseFloat(geojson[i]["\"TGOS Y\""]),  //本地端測試不適用
                //lat: parseFloat(geojson[i]["\"TGOS Y\"\r"]),  //本地端測試適用 \r
                lng: parseFloat(geojson[i]["\"TGOS X\""])
            };
        }
    }
    return {lat: 'null',lng: 'null'};
}
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
