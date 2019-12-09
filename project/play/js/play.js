$(function(){

   // player setting ===============================================================
   var player = $('audio')[0];
   var playerSrc = [
      ['music/아이유_나의 옛날이야기(My old story).mp3','아이유'],
      ['music/아이유_푸르던.mp3','아이유'],
      ['music/아이유_Someday(Dream High OST).mp3','아이유'],
      ['music/아이유_나만 몰랐던 이야기.mp3','아이유'],
      ['music/아이유_매일 그대와.mp3','아이유'],
      ['music/아이유&김연아_얼음꽃.mp3','아이유&김연아']
   ];

   var playListLength=playerSrc.length;//음원 수
   var shuffle=false;//랜덤 여부
   var randomIndex=0; //랜덤 인덱스
   var boxWidth, spanWidth, textMovePlay;//제목길경우 움직이기

   //초기설정 
   title(0);
   playList();//플레이 리스트

   //제목
   function title(i){
      src=player.currentSrc;
      var title=src.substring(src.lastIndexOf('/')+1,src.lastIndexOf('.'));
      $('dl dt').text(decodeURI(title));
      $('dl dd').text(playerSrc[i][1]);
   }
    
   //플레이 리스트 생성
   function playList(){
      for(var i=0; i<playListLength; i++){
        $('#play-list ul').append(`
         <li class="swiper-slide">
            <div class="move">   
               <span>${playerSrc[i][0].substring(playerSrc[i][0].lastIndexOf('/')+1,playerSrc[i][0].lastIndexOf('.'))}</span>
            </div>
         </li>
        `);
      }
   }

   //재생 시간
   function timer(seconds){
      console.log(typeof seconds);
      if(isNaN(seconds)){
         return '00:00';
      }
      var h=parseInt(seconds/3600);
      var m=parseInt(seconds/60%60);
      var s=parseInt(seconds%60);
    
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
    
      if(h==0){
        return m+':'+s;
      }else{
        return h+':'+m+':'+s;
      }
   }

   //플레이 프로그레스
   function progressStatus(){
      if(!player.ended){
        var percent=parseInt(player.currentTime/player.duration*100);
        var totalTime=parseInt(player.duration);
        var nowTime=parseInt(player.currentTime);
        //console.log(nowTime, totalTime);
        $('#progress .now').text(timer(nowTime));
        $('#progress .time').text(timer(totalTime));
        $('#progress .slider').slider('value',percent);
      }else{
        $('#progress .slider' ).slider('value',0);      
        $('#btn-play i').text('play_arrow');
        clearInterval(progressloop);
        $('body').removeClass('play');        
      }
   }

   //데이터 갱신 
   function playUpdate(index){
      $('source').attr('src',playerSrc[index][0]);
      player.load();
      player.onloadeddata = function() {
         title(index);
      }
      player.play();
      $('#btn-play i').text('pause');
      $('body').addClass('play');    
      progressloop=setInterval(progressStatus, 10);
      
      $('body').addClass('next');
      setTimeout(()=>$('body').removeClass('next'),1200);

      //노래제목 길경우 처리하기
      setTimeout(()=>{
         textStop();
         var $move=$('.swiper-slide-active .move');
         $move.addClass('active');
         spanWidth=$('.swiper-slide-active span').width();//활성화 제목 넓이 다시 구하기            
         if(spanWidth>boxWidth){//박스보다 제목넓이가 길경우 애니메이션
            $move.width(spanWidth*2+60);
            $move.append($('.swiper-slide-active span').clone()); 
            textMovePlay=setInterval(()=>textMove(spanWidth));         
         }
      });            
   }

   //플레이 리스트 스와이퍼
   var playListSwiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      centeredSlides: true,
      slideToClickedSlide: true,
      direction: 'vertical',
      loop:true,
   });

   playListSwiper.on('slideChangeTransitionEnd', function () {
      var index=0;
      // console.log(shuffle);      
      if(shuffle){
         index=randomIndex;         
      }else{
         index=playListSwiper.realIndex;
      }
      playUpdate(index);
   });

   playListSwiper.on('click', function () { 
      shuffle=false; 
      setTimeout(()=>{
         if($('#btn-shuffle').hasClass('on')){
            shuffle=true;
         }else{
            shuffle=false;
         }
      },1000)  
   });

   //노래제목 길 경우 움직이기========================================
   function textMove(spanWidth){
      $('.swiper-slide-active .active').animate({
         left:-(spanWidth+50)                  
      },5000,'linear',function(){
         $('.swiper-slide-active .active').css('left',0);
         textMove(spanWidth);
      })
   }

   //정지
   function textStop(){
      $('.move').find('span:nth-child(2)').remove();//복제본 지우기      
      $('.move').removeClass('active');
      clearInterval(textMovePlay);
      $('.move').stop(true, true).css('left',0);//애니메이션 정지 및 처음 위치로 돌아가기 
   }
   
   //리사이즈
   $(window).resize(function () { 
      textStop();
      boxWidth=$('#play-list').width();//컨텐츠 넓이         
      spanWidth=$('.swiper-slide-active span').width();//활성화 제목 넓이
      $('.swiper-slide-active .move').addClass('active');
      $('.swiper-slide-active .move').width(spanWidth*2+60);
      if(spanWidth>boxWidth){//박스보다 제목넓이가 길경우 애니메이션
         $('.swiper-slide-active .move').append($('.swiper-slide-active span').clone()); 
         textMovePlay=setInterval(()=>textMove(spanWidth)); 
      }  
   }).resize();

   // controls ===============================================================
   // playlist_play/close 
   $('#btn-list').on('click',function(){
      $('body').toggleClass('open');      
      if($(this).find('i').text()=='playlist_play'){                               
         $(this).find('i').text('chevron_right');
      }else{         
         $(this).find('i').text('playlist_play');
      }
   })

   // play slider
   $( '#progress .slider' ).slider({
      range: 'min',
      slide: function( event, ui ) {
         var percent=ui.value;
         var newtime=percent*player.duration/100;
         player.currentTime=newtime;
         var nowTime=parseInt(newtime);
         $('#progress .now').text(timer(nowTime));
         $('#progress .slider').slider('value',percent);         
      }
   });

   // volumn slider
   $( '#volume .slider' ).slider({
      range: 'min',
      value:100,
      orientation: "vertical",
      slide: function( event, ui ) {
         var percent=ui.value;
         player.volume=percent*0.01;
         $('#volume .slider').slider('value',percent);
         if(player.volume==0){
            $('#btn-volume i').text('volume_off');
            player.muted=true;
         }else{
            $('#btn-volume i').text('volume_up');
            player.muted=false;
         }           
      },stop: function( event, ui ) {
         $('#volume .slider').fadeOut('slow');
      }
   });

   // play/pause
   $('#btn-play').on('click',function(){
      if (player.paused) {
        player.play();
        $('#btn-play i').text('pause');
        $('body').addClass('play');
        progressloop=setInterval(progressStatus, 10);
      } else {
        player.pause();
        $('#btn-play i').text('play_arrow');
        $('body').removeClass('play');
        clearInterval(progressloop);
      }
   })
  
   //repeat/repeat_one
   $('#btn-repeat').on('click',function(){
      if($(this).text()=='repeat_one' && $(this).hasClass('on')){
         $(this).find('i').text('repeat');
         player.loop=false;
         state=setInterval(function(){
            if(player.ended){
               console.log('끝남');
               $('#btn-next').trigger('click');
               progressloop=setInterval(progressStatus, 10);
            }
         }, 1000);
         console.log('전체 반복');
      }else if($(this).text()=='repeat' && !$(this).hasClass('on')){
         player.loop=true;
         $(this).find('i').text('repeat_one');
         $(this).addClass('on');
         console.log('현재 영상만 반복');
      }else if($(this).text()=='repeat' && $(this).hasClass('on')){
         $(this).removeClass('on');
         player.loop=false;
         clearInterval(state);
         console.log('반복안함');
      }
   })

   //prev/next
   $('#btn-next, #btn-prev').on('click',function(){
      randomIndex=parseInt(Math.random()*playerSrc.length);
      if($(this).attr('id')=='btn-next'){
         if(shuffle){
            playListSwiper.slideToLoop(randomIndex);
         }else{            
            playListSwiper.slideNext(1000);
         }
      }else{
         if(shuffle){
            playListSwiper.slideToLoop(randomIndex);
         }else{            
            playListSwiper.slidePrev(1000);
         }
      }      
   })

   //volume_up/volume_off
   $('#btn-volume').on('click',function(){
      $('#volume .slider').toggle();
      // if($(this).text()=='volume_up'){
      //    $(this).find('i').text('volume_off');
      //    player.muted=true;
      // }else{
      //    $(this).find('i').text('volume_up');
      //    player.muted=false;
      // }
   })

   //btn-shuffle 
   $('#btn-shuffle').click(function (e) { 
      $(this).toggleClass('on');
      if($(this).hasClass('on')){
         console.log('랜덤');  
         shuffle=true;
      }else{
         console.log('순서대로');
         shuffle=false;
      }
   });
 
})