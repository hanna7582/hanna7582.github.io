$(function(){
  //검색팝업 =================================================================

  //카테고리 선택 
  var category={
    category0:{
      categoryName:'전체',
      result:[]
    },
    category1:{
      categoryName:'인형/피규어',
      result:['미니인형', '중형인형', '대형인형', '키체인인형', '피규어/브릭']
    },
    category2:{
      categoryName:'리빙',
      result:['쿠션/방석', '컵/텀블러', '주방용품', '미용/욕실용품', '생활소품/잡화','푸드', '탈취/방향제']
    },
    category3:{
      categoryName:'잡화',
      result:['신발', '파우치/지갑/가방', '패션소품', '우산', '모자', '시즌잡화']
    },
    category4:{
      categoryName:'의류',
      result:['여성의류', '남성의류', '상의', '잠옷', '속옷', '양말']
    },
    category5:{
      categoryName:'쥬얼리',
      result:['귀걸이', '반지', '가방침/핀뱃지', '케이스', '헤어스트링']
    },
    category6:{
      categoryName:'문구',
      result:['필기구', '필통/케이스', '노트/메모', '파일', '데스크소품', '카드/엽서선물포장']
    },
    category7:{
      categoryName:'여행/레저',
      result:['여행', '물놀이', '캠핑']
    },
    category8:{
      categoryName:'생활테크',
      result:['휴대폰케이스', '휴대폰악세사리', '노트북악세사리', '소형전자']
    }
  }

  $('.select > a').click(function(e){
    e.preventDefault();
    if($(this).siblings('ul').is(':hidden')){
      $('.select > a').removeClass('active');
      $('.select ul').slideUp();
      $(this).siblings('ul').slideDown();  
      $(this).addClass('active');  
    }else{
      $(this).siblings('ul').slideUp(); 
      $(this).removeClass('active');
    }
  })

  $('.select ul').on('click' , 'a', function(e){
    e.preventDefault();
    $('.select ul').slideUp();
    $('.select > a').removeClass('active');
    var val=$(this).text();
    $(this).parents('.select').children('a').text(val);
    console.log($(this).parents('.select').hasClass('category-choice'));
    
    if($(this).parents('.select').hasClass('category-choice')){
      var categoryName=$(this).attr('href').substring(1);
      console.log(categoryName);  
      if(categoryName=='category0'){
        $('.category-result > a').addClass('isDisabled');
      }else{
        $('.category-result > a').removeClass('isDisabled');
      }
      
      $('.category-result > a').text('세부카테고리');     
      $('.category-result ul').empty();

      for(var i in category[categoryName]['result']){
          $('.category-result ul').append('<li><a href="#">'+category[categoryName]['result'][i] +'</a></li>');
      }               
    }
  })

  $('.popular-list ul li a').click(function(e){
    e.preventDefault();
    var val=$(this).text();
    $('.search-control input').val(val);
  })

  $('.search-control input').on('focus',function(){
    $('.select ul').slideUp();
  })

  var popularSwiper;
  $('[data-popup="popup-search"]').click(function(e){
    e.preventDefault();
    //실시간 인기 검색어
    popularSwiper = new Swiper('.popular-list .swiper-container', {
      slidesPerView:5,
      centeredSlides:true, 
      slideToClickedSlide: true,
      direction: 'vertical',
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed:1000,
      loop:true,
    });
  })

  $('.popup-search .icon-close, .popup-filter .icon-close').click(function(){
    popularSwiper.destroy();
  })

  //필터검색팝업 =================================================================
  $('[data-popup="popup-filter"]').click(function(e){
    e.preventDefault();
    $('.popup-search').hide();
  })

  var filters=[
    {
      categoryName:'캐릭터',
      result:['라이언', '어피치', '프로도', '네오', '무지', '콘', '튜브', '제이지', '니니즈']
    },
    {
      categoryName:'테마기획전',
      result:['젠틀맨 라이언', '버블버블', '레이지 선데이', '러블리어피치','리틀 스케치북', '허그미 프렌즈', '커버낫 X라이언', '트레블 프렌즈', '배틀그라운드', '프렌즈 레이싱']
    },
    {
      categoryName:'인형/피규어 ',
      result:['미니인형', '중형인형', '대형인형', '키체인인형','피규어/브릭']
    },
    {
      categoryName:'리빙',
      result:['미니인형', '중형인형', '대형인형', '키체인인형','피규어/브릭']
    },
    {
      categoryName:'리빙',
      result:['쿠션/방석', '컵/텀블러', '주방용품', '미용/욕실용품', '생활소품/잡화','푸드', '탈취/방향제']
    },
    {
      categoryName:'잡화',
      result:['신발', '파우치/지갑/가방', '패션소품', '우산', '모자', '시즌잡화']
    },
    {
      categoryName:'의류',
      result:['여성의류', '남성의류', '상의', '잠옷', '속옷', '양말']
    },
    {
      categoryName:'쥬얼리',
      result:['귀걸이', '반지', '가방침/핀뱃지', '케이스', '헤어스트링']
    },
    {
      categoryName:'문구',
      result:['필기구', '필통/케이스', '노트/메모', '파일', '데스크소품', '카드/엽서선물포장']
    },
    {
      categoryName:'여행/레저',
      result:['여행', '물놀이', '캠핑']
    },
    {
      categoryName:'생활테크',
      result:['휴대폰케이스', '휴대폰악세사리', '노트북악세사리', '소형전자']
    }
  ]

  filters.forEach((category, i) => {
    $('.checkbox-wrap').append(`
      <div class="checkbox-control">
        <span class="group-name">${category.categoryName}</span>
        <div class="checkbox-group"></div>
      </div>
    `);

    category.result.forEach(val => {
      $('.checkbox-wrap .checkbox-control').eq(i).find('.checkbox-group').append(`
          <label><input type="checkbox"><i class="icon icon-check"></i><span>${val}</span></label>
      `)
    });
  });
})