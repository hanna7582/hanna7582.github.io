//google map
//https://stackoverflow.com/questions/20491405/how-to-use-google-places-api-with-a-search-button
function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: 37.555106, lng: 126.935990},
       zoom: 17,
   });

   // Create the search box and link it to the UI element.
   var searchInput = document.getElementById('search-input');
   var searchBtn = document.getElementById('submit');
   var searchBox = new google.maps.places.SearchBox(searchInput);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function () {
       searchBox.setBounds(map.getBounds());
   });

   var markers = [];
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function () {
       //마커지움
      markers=clearMarkers(markers);
      setTimeout(function(){
         displaySearchResults(map, searchBox, markers);       
      })
   });

   searchBtn.onclick = function () {
      markers=clearMarkers(markers);
      displaySearchResults(map,searchBox,markers);
   }
}

function clearMarkers(markers) {
   // console.log('지우기 전', markers);
   
   for (var i = 0; i < markers.length; i++) {
     if (markers[i]) {
       markers[i].setMap(null);
     }
   }
   markers = [];
   return markers;
}

function displaySearchResults(map, searchBox, markers) {
   var places = searchBox.getPlaces();
   console.log(places);
   //리스트 목록 갱신&선택 이동
   $('.store-list').empty();
   places.forEach(function(data){
     $('.store-list').append(`
        <li><a href="#"><b>${data.name}</b><span>10:00 - 23:00</span></a></li>
     `)
   })
    
   if (places.length == 0) {
       return;
   }   
   
   // For each place, get the icon, name and location.
   var bounds = new google.maps.LatLngBounds();      

   places.forEach(function (place, i) {      
         if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
         }
         var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
         };
            
         // Create a marker for each place.
         markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
         }));    

         if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
         } else {
            bounds.extend(place.geometry.location);
         }
   });    

   reMarkers=markers;
      
   $('.store-list a').off('click');
   //리스트 선택          
   $('.store-list').on('click','a',function(){
      var i=$(this).parent().index();
      google.maps.event.trigger(reMarkers[i], 'click');
      map.setZoom(17);
      map.setCenter(reMarkers[i].getPosition());
      $('.store-list li').css('background','');
      $(this).parent().css('background','#006140');
   })

   map.fitBounds(bounds);
}