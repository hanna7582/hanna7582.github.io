$(function(){
   var mainSlide = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.sp-next',
        prevEl: '.sp-prev',
      },
      pagination: {
         el: '.swiper-pagination',
         type: 'progressbar',
      },
      effect:'fade',
      loop:true,
      simulateTouch:false
   });

   var slideImgs=['img/slide-coffee1.png', 'img/slide-coffee2.png', 'img/slide-coffee3.png'];
   var slideTexts=['Meet our new<br> Summer Caramel Frappuccino',
               '50% discount<br> Coffee Frappuccino',
               'Delicious<br> Java Chip Frappuccino'
               ];

   // 공통               
   mainSlide.on('slideChange', function () {
      var index=mainSlide.realIndex+1;//현재 슬라이드 인덱스+1 페이지번호
      $('.pagination .page').text('0'+index);      
      $('.slide img').attr('src',slideImgs[index-1]);//현재페이지에 해당하는 배열의 인덱스
   });

   // 이전
   function slidePrev(){
      var index=mainSlide.realIndex+1;
      var prevIndex=index-1;//이전 슬라이드 번호
      if(prevIndex<1){//최소값보다 작아지면 최대값으로
         prevIndex=3;
      }
      $('.info .page').text('0'+(prevIndex));
      $('.info b').html(slideTexts[prevIndex-1]);//배열의 인덱스
   }

   // 다음 
   function slideNext(){
      var index=mainSlide.realIndex+1;
      var nextIndex=index+1;//다음 슬라이드 번호
      if(index>2){//최대값보다 작아지면 최소값으로
         nextIndex=1
      }      
      $('.info .page').text('0'+(nextIndex));
      $('.info b').html(slideTexts[nextIndex-1]);//배열의 인덱스     
   }

   mainSlide.on('slidePrevTransitionStart',function(){
      slidePrev();
   })
   mainSlide.on('slideNextTransitionStart',function(){
      slideNext();
   })

   $('.arrow button').on({
      mouseenter:function(){
         if($(this).hasClass('sp-prev')){
            $('.direction').text('Prev Slide');
            slidePrev();
         }else{
            $('.direction').text('Next Slide');
            slideNext();
         }
      }
   })

})

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
   var infowindow = new google.maps.InfoWindow();
   var infowindowContent = document.getElementById('infowindow-content');
   infowindow.setContent(infowindowContent);        

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
                           
         // google.maps.event.addListener(markers[i], 'click', function(){      
         //    console.log('장소', places[i]);                      
         //    infowindowContent.children['place-name'].textContent = places[i].name;
         //    infowindowContent.children['place-address'].textContent = places[i].formatted_address;
         //    infowindow.open(map);          
         // });       

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
   $('.store-list').on('click','a',function(e){
      e.preventDefault();
      var i=$(this).parent().index();
      google.maps.event.trigger(reMarkers[i], 'click');
      map.setZoom(17);
      map.setCenter(reMarkers[i].getPosition());
   })

   map.fitBounds(bounds);
}