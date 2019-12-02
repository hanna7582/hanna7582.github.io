$(function(){

  var wishList={};
  var cartList={};
  var cartCount=0;
  var wishCount=0;

  // kakao_01 : 스타 홈웨어 여성용_라이언
  // kakao-02 : 2019 다이어리_어피치
  // kakao-03 : 2019 탁상 스케줄러
  // kakao-04 : 페이스안마봉_리틀콘
  // kakao-05 : 페이스립밤-네오
  // kakao-06 : 젠틀맨라이언 북스토어 인형
  // kakao-07 : 2019 탁상 캘린더
  // kakao-08 : 리틀프렌즈마우스패드-어피치
  // kakao-09 : 허니프렌즈 말랑쿠션-어피치 32,000원
  // kakao-10 : 라이언 싱글 버블 퍼프 6,900원
  // kakao-11 : 목걸이카드지갑-라이언 18,000원
  // kakao-12 : 베이직슬리퍼-어피치 20,000원
  // kakao-13 : 케이블보호캡-베로니 6,000원
  // kakao-14 : 리틀프렌즈 머그컵

  //콤마찍기
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //위시리스트추가
  function addWishList(code, src, name, price, wishState, cartState){
    wishList[code]={}
    wishList[code]['src']=src;
    wishList[code]['name']=name;
    wishList[code]['price']=price;
    wishList[code]['wishState']=wishState
    wishList[code]['cartState']=cartState;
    wishCount=Object.keys(wishList).length;
    // console.log(wishList);
  }
  //장바구니추가
  function addCartList(code, src, name, price, num, wishState, cartState){
    cartList[code]={}
    cartList[code]['src']=src;
    cartList[code]['name']=name;
    cartList[code]['price']=price;
    cartList[code]['num']=num;
    cartList[code]['wishState']=wishState
    cartList[code]['cartState']=cartState;
    cartCount=Object.keys(cartList).length;
    // console.log(cartList);
  }

  //리스트 추가
  function listUpdate(){
    $('.all-check').prop('checked', false);
    $('.popup-shopping').find('.result .count').text(0);
    $('#wish ul').empty();
    for (var code in wishList) {
      var cartOn='';
      if(wishList[code].cartState){
        cartOn='on';
      }else{
        cartOn='';
      }
      var sale='';
      if(code.indexOf('sale')==0){
        sale='<span class="sale">SALE</span>';
      }
      $('#wish ul').append(
        '<li data-code="'+code+'">'+
        '  <label>'+
        '    <input type="checkbox"><i class="icon icon-check"></i>'+
        '    <img src="'+wishList[code].src+'" alt="">'+sale+
        '  </label>'+
        '  <div class="right">'+
        '    <dl>'+
        '      <dt>'+wishList[code].name+'</dt>'+
        '      <dd>'+wishList[code].price+'</dd>'+
        '    </dl>'+
        '    <div class="btn-group">'+
        '      <button class="fas fa-shopping-cart '+cartOn+'"><span class="blind">cart</span></button>'+
        '      <button class="fas fa-trash"><span class="blind">trash</span></button>'+
        '    </div>'+
        '  </div>'+
        '</li>'
      )
    }
    if(Object.keys(wishList).length==0){
      $('#wish ul').append('<li class="empty">위시리스트가 비었습니다.</li>');
    }

    $('#cart ul').empty();
    for (var code in cartList) {
      var wishOn='';
      if(cartList[code].wishState){
        wishOn='on';
      }else{
        wishOn='';
      }
      var sale='';
      if(code.indexOf('sale')==0){
        sale='<span class="sale">SALE</span>';
      }
      $('#cart ul').append(
        '<li data-code="'+code+'">'+
        '  <label>'+
        '    <input type="checkbox"><i class="icon icon-check"></i>'+
        '    <img src="'+cartList[code].src+'" alt="">'+sale+
        '  </label>'+
        '  <div class="right">'+
        '    <dl>'+
        '      <dt>'+cartList[code].name+'</dt>'+
        '      <dd>'+cartList[code].price+'</dd>'+
        '    </dl>'+
        '    <div class="count-control">'+
        '      <button class="fas fa-minus"><span class="blind">minus</span></button>'+
        '      <span class="num">'+cartList[code].num+'</span>'+
        '      <button class="fas fa-plus"><span class="blind">plus</span></button>'+
        '    </div>'+
        '    <div class="btn-group">'+
        '      <button class="fas fa-heart '+wishOn+'"><span class="blind">wish</span></button>'+
        '      <button class="fas fa-trash"><span class="blind">trash</span></button>'+
        '    </div>'+
        '  </div>'+
        '</li>'
      )
    }
    if(Object.keys(cartList).length==0){
      $('#cart ul').append('<li class="empty">장바구니가 비었습니다.</li>');
    }
    totalPay();
  }

  //수량 변경
  function count(){
    // console.log('위시리스트',Object.keys(wishList).length);
    // console.log('장바구니',Object.keys(cartList).length);
    wishCount=Object.keys(wishList).length
    cartCount=Object.keys(cartList).length;
    if(wishCount>0){
      $('#btn-wish').addClass('on');
    }else{
      $('#btn-wish').removeClass('on');
    }
    if(cartCount>0){
      $('#btn-cart').addClass('on');
    }else{
      $('#btn-cart').removeClass('on');
    }
    $('#wish .total, #btn-wish .total').text(wishCount);
    $('#cart .total, #btn-cart .total').text(cartCount);
  }

  //합계계산
  function totalPay(){
    var total=0;
    var pay=0;
    var num=0;
    $('#cart ul li').each(function(){
      if($(this).find('input').is(':checked')){
        pay=Number($(this).find('dd').text().replace('원','').replace(/,/g, ''));
        num=Number($(this).find('.num').text());
        total+=pay*num;
      }
    })
    $('#cart').find('.pay').text(numberWithCommas(total)+'원');
  }

  //수량 체크
  $('#cart').on('click','.count-control button',function(){
    var count=$(this).parent().children('span').text();
    if($(this).text()=='minus'){
      count--;
    }else{
      count++;
    }
    if(count<1){count=1; alert('최소수량은 1개입니다.')}
    if(count>10){count=10; alert('최대수량은 10개입니다.')}
    $(this).parent().children('span').text(count);
    totalPay();
    var code=$(this).parents('li').data('code');
    cartList[code]['num']=count;
  })

  //초기 각 리스트 추가
  $('.theme .icon-wish').each(function(i, el){
    var code=$(el).parents('li').data('code');
    var src=$(el).parents('li').find('img').attr('src');
    var name=$(el).parents('li').find('.text-box > a').text();
    var price=$(el).parents('li').find('.text-box > span').text();
    var wishState=$(el).hasClass('on');
    var cartState=$(el).next().hasClass('on');
    if($(el).hasClass('on')){
      addWishList(code, src, name, price, wishState, cartState);
    }
  })
  $('.theme .icon-cart').each(function(i, el){
    var code=$(el).parents('li').data('code');
    var src=$(el).parents('li').find('img').attr('src');
    var name=$(el).parents('li').find('.text-box > a').text();
    var price=$(el).parents('li').find('.text-box > span').text();
    var wishState=$(el).prev().hasClass('on');
    var cartState=$(el).hasClass('on');
    if($(el).hasClass('on')){
      addCartList(code, src, name, price, 1, wishState, cartState);
    }
  })
  count();

  //장바구니/위시리스트 팝업열기 및 리스트 목록 뿌리기
  $('#btn-wish, #btn-cart').on('click',function(){
    var id=$(this).attr('id').replace('btn-','');
    id='#'+id;
    listUpdate();

    $('.popup-shopping .tab-nav a').removeClass('on');
    $('.popup-shopping .tab-content').removeClass('on');
    $('[href="'+id+'"]').addClass('on');
    $(id).addClass('on');
    $('.popup-shopping').before('<div class="bg"></div>').show();
    $('body').css('overflow','hidden');
  })

  //리스트 버튼누르기
  //1. 위시리스트인지 장바구니인지 판단하여 리스트목록에 추가
  //2. 버튼 아이콘 활성화 상태체크 후 각 리스트의 상태값 변경
  //3. 내가 클릭한 상품에 대한 정보를 객체에 저장
  //4. 최종 리스트 수 갱신
  $('.theme button').click(function(e){
    var code=$(this).parents('li').data('code');
    var src=$(this).parents('li').find('img').attr('src');
    var name=$(this).parents('li').find('.text-box > a').text();
    var price=$(this).parents('li').find('.text-box > span').text();
    $(this).toggleClass('on');
    var wishState=$(this).parents('li').find('.icon-wish').hasClass('on');
    var cartState=$(this).parents('li').find('.icon-cart').hasClass('on');
    // console.log(wishState, cartState);
    if($(this).hasClass('icon-wish')){
      if($(this).hasClass('on')){
        addWishList(code, src, name, price, wishState, cartState);
        $('body').append('<div class="bg"></div><div class="alert">찜되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-wish').addClass('on');
          }
        })
      }else{
        delete wishList[code];
        $('body').append('<div class="bg"></div><div class="alert">찜에서 삭제되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-wish').removeClass('on');
          }
        })
      }
      if(cartList[code]!=undefined){
        cartList[code]['wishState']=wishState;
      }
    }else{
      if($(this).hasClass('on')){
        addCartList(code, src, name, price, 1, wishState, cartState);
        $('body').append('<div class="bg"></div><div class="alert">장바구니에 담겼습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-cart').addClass('on');
          }
        })
      }else{
        delete cartList[code];
        $('body').append('<div class="bg"></div><div class="alert">장바구니에서 삭제되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-cart').removeClass('on');
          }
        })
      }
      if(wishList[code]!=undefined){
        wishList[code]['cartState']=cartState;
      }
    }
    setTimeout(function(){
      $('.alert, .bg').fadeOut(function(){
        $(this).remove();
      })
      count();
    },1000)
  });

  //체크박스 제어
  $('.all-check').change(function(){
    if($(this).prop('checked')){
      $(this).parents('.tab-content').find('ul [type=checkbox]').prop('checked', true);
      $(this).parents('.tab-content').find('.result .count').text($(this).parents('.tab-content').find('.result .total').text());
    }else{
      $(this).parents('.tab-content').find('ul [type=checkbox]').prop('checked', false);
      $(this).parents('.tab-content').find('.result .count').text(0);
    }
    totalPay();
  })

  //전체선택 체크해제
  $('.popup-shopping ul').on('change','[type=checkbox]',function(){
    $(this).parents('.tab-content').find('.all-check').prop('checked', false);
    var count=$(this).parents('.tab-content').find('.result .count').text();
    if($(this).prop('checked')){
      count++
    }else{
      count--;
    }
    $(this).parents('.tab-content').find('.result .count').text(count);
    totalPay();
  })

  function deleteList(el, id, code){
    if(id=='wish'){
      delete wishList[code];
      if(cartList[code]!=undefined){
        cartList[code].wishState=false;
      }
      $('.theme li').each(function(i, el){
        if(code==$(el).data('code')){
          $(el).find('.icon-wish').removeClass('on');
        }
      })
      el.parents('li').remove();
      if(Object.keys(wishList).length==0){
        $('#wish ul').append('<li class="empty">위시리스트가 비었습니다.</li>');
      }
      $('#'+id).find('.result .count').text(0);
    }else{
      delete cartList[code];
      if(wishList[code]!=undefined){
        wishList[code].cartState=false;
      }
      $('.theme li').each(function(i, el){
        if(code==$(el).data('code')){
          $(el).find('.icon-cart').removeClass('on');
        }
      })
      el.parents('li').remove();
      if(Object.keys(cartList).length==0){
        $('#cart ul').append('<li class="empty">장바구니가 비었습니다.</li>');
      }
      $('#'+id).find('.result .count').text(0);
    }
    count();
  }

  //팝업창 리스트의 단일 삭제/위시리스트/장바구니
  $('.popup-shopping ul').on('click','.btn-group button',function(){
    var id=$(this).parents('.tab-content').attr('id');
    var code=$(this).parents('li').data('code');
    var src=$(this).parents('li').find('img').attr('src');
    var name=$(this).parents('li').find('dt').text();
    var price=$(this).parents('li').find('dd').text();
    $(this).toggleClass('on');

    if($(this).text()=='trash'){
      deleteList($(this), id, code);
    }else if($(this).text()=='wish'){
      var wishState=$(this).hasClass('on');

      if($(this).hasClass('on')){
        addWishList(code, src, name, price, wishState, true);
        $('body').append('<div class="alert">찜되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-wish').addClass('on');
          }
        })
      }else{
        delete wishList[code];
        $('body').append('<div class="alert">찜에서 삭제되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-wish').removeClass('on');
          }
        })
      }
      if(cartList[code]!=undefined){
        cartList[code]['wishState']=wishState;
      }
      setTimeout(function(){
        $('.alert').fadeOut(function(){
          $(this).remove();
        })
        count();
      },1000)
    }else if($(this).text()=='cart'){
      var cartState=$(this).hasClass('on');

      if($(this).hasClass('on')){
        addCartList(code, src, name, price, 1, true, cartState);
        $('body').append('<div class="alert">장바구니에 담겼습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-cart').addClass('on');
          }
        })
      }else{
        delete cartList[code];
        $('body').append('<div class="alert">장바구니에서 삭제되었습니다.</div>');
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-cart').removeClass('on');
          }
        })
      }
      if(wishList[code]!=undefined){
        wishList[code]['cartState']=cartState;
      }
      setTimeout(function(){
        $('.alert').fadeOut(function(){
          $(this).remove();
        })
        count();
      },1000)
    }
    listUpdate();
  })

  //선택삭제
  $('.btn-remove').on('click',function(){
    var id=$(this).parents('.tab-content').attr('id');
    $(this).parents('.tab-content').find('ul [type=checkbox]').each(function(i, el){
      if($(this).prop('checked')){
        var code=$(this).parents('li').data('code');
        deleteList($(this), id, code);
      }
    })
    listUpdate();
  })

  //선택장바구니담기
  $('.btn-add-cart').on('click',function(){
    $(this).parents('.tab-content').find('ul [type=checkbox]').each(function(i, el){
      if($(this).prop('checked')){
        var code=$(this).parents('li').data('code');
        var src=$(this).parents('li').find('img').attr('src');
        var name=$(this).parents('li').find('dt').text();
        var price=$(this).parents('li').find('dd').text();
        addCartList(code, src, name, price, 1, true, true);
        wishList[code].cartState=true;
        $('.theme li').each(function(i, el){
          if(code==$(el).data('code')){
            $(el).find('.icon-cart').addClass('on');
          }
        })
      }
    })
    $('body').append('<div class="alert">장바구니에 담겼습니다.</div>');
    setTimeout(function(){
      $('.alert').fadeOut(function(){
        $(this).remove();
      })
      count();
    },1000)
    listUpdate();
  })


})
