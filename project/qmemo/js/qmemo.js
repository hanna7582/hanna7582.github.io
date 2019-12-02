//스토리지에 객체를 저장할 수 있도록 메소드 추가하기
Storage.prototype.setObject=function(key, value){
  //객체를 문자열로 변환한 후 값을 저장
  this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject=function(key){
  //문자열을 객체로 변환한 후 값을 리턴
  return this.getItem(key) && JSON.parse(this.getItem(key));
}

//document.ready(문서가 로드되고 난뒤 실행)
$(function(){
  //초기화 ================================================================
  //테마 상태 체크
  var themeType=localStorage.getItem('themeType');
  if(themeType=='dark'){
    $('.memo-main').addClass('dark');
    $('#theme-check').attr('checked',false);
  }else if(themeType=='light'){
    $('.memo-main').removeClass('dark');
    $('#theme-check').attr('checked',true);
  }

  //메모 형식 체크
  var memoType=localStorage.getItem('memoType');
  if(memoType=='list'){
    $('#box-view').hide();
    $('#list-view').show();
    $('#memo-check').attr('checked',false);
  }else if(memoType=='box'){
    $('#list-view').hide();
    $('#box-view').show();
    $('#memo-check').attr('checked',true);
  }

  //select
  $('select').material_select();

  //sideNav
  $('#btn-settings').sideNav();

  // 위로가기 =========================================================
  //위로가기 버튼 활성화상태 체크
  $(window).scroll(function(){
    var windowTop=$(window).scrollTop();
    if(windowTop>100){
      $('#go-top').addClass('on');
    }else{
      $('#go-top').removeClass('on');
    }
  }).scroll();
  //위로가기
  $('#go-top').click(function(){
    $('html, body').animate({
      scrollTop:0
    },500)
  })

  // 환경설정(settings) =========================================================
  // theme-check
  $('#theme-check').change(function(){
    if($(this).is(':checked')){
      //alert("체크됨");
      localStorage.setItem('themeType','light');
      $('.memo-main').removeClass('dark');
    }else{
      //alert("체크안됨");
      localStorage.setItem('themeType','dark');
      $('.memo-main').addClass('dark');
    }
  })
  // memo-check
  $('#memo-check').change(function(){
    if($(this).is(':checked')){
      localStorage.setItem('memoType','box');
      $('#list-view').hide();
      $('#box-view').show();
    }else{
      localStorage.setItem('memoType','list');
      $('#box-view').hide();
      $('#list-view').show();
    }
    //memoType, isotope 갱신
    memoType=localStorage.getItem('memoType');
    $grid.isotope('layout');
    $grid2.isotope('layout');
  })

  // modal ===============================================================
  // info modal
  $('#btn-q-info').click(function(){
    $('#info-modal').modal('open');
  });

  // search modal
  $('#autocomplete-input').keyup(function(e){
    //13==enter
    if(e.keyCode==13){
      $('#search-modal').modal('close');
    }
    //filter기능 변경
    $grid.isotope({filter:function(){
      return qsRegex ? $(this).text().match( qsRegex ) : true;
    }});
    $grid2.isotope({filter:function(){
      return qsRegex ? $(this).text().match( qsRegex ) : true;
    }});
  })

  $('#btn-search').click(function(){
    $('#search-modal').modal('open');

    // autocomplete
    var contentsLength=$('.grid-item').length;
    autoObj={};
    for(var i=0; i<contentsLength; i++){
      var contents=$('.grid-item').eq(i).find('p').text();
      autoObj[contents]=null;
    }
    // console.log('컨텐츠수',contentsLength);
    // console.log('자동완성단어모음',autoObj);

    $('#autocomplete-input').autocomplete({
      data: autoObj,
      limit: 5,//자동완성 목록 수
      onAutocomplete: function(val) {
      },
      minLength: 1,//타이핑 글자수
    });

    // use value of search field to filter
    var $quicksearch = $('#autocomplete-input').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
      $grid2.isotope();
      updateCount();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
      }
    }
  });

  // memo modal(스크립트로 생성되는 요소는 on으로 적용해야함)
  $('body').on('click','.modal-link',function(){
    //날짜/시간, 메모내용, 카테고리값을 가져와서 모달창에 뿌리기
    //값을 가져와서 콘솔에 출력해보기(테스트)->적용
    //선택자 활용을 잘할것(부모, 자식, 형제)
    //값을 가져올때와 넣을때의 메소드의 매개변수 개수?
    $('#modal').modal('open');
    $modal=$('#modal');
    console.log(memoType);
    if(memoType=='box'){
      title=$(this).find('.card-title').text();
      category=$(this).siblings('.card-action').find('span').text();
      contents=$(this).find('p').html();
    }else{
      title=$(this).siblings('.date').find('span:eq(0)').text();
      category=$(this).siblings('.date').find('span:eq(1)').text();
      contents=$(this).siblings('.truncate').html();
    }
    $modal.find('h4').html(title+'<span class="right">'+category+'</span>');
    $modal.find('p').html(contents);
  });

  // memo ==================================================================
  // isotope init
  // box-view
  // 정규표현식
  var qsRegex;
  $grid = $('#box-view').isotope({
    itemSelector:'.grid-item',
    layoutMode:'masonry',
    getSortData:{
      date:'.date',
      category:'[data-category]'
    },
    filter: function() {
      return qsRegex ? $(this).text().match( qsRegex ) : true;
    }
  })
  // list-view
  $grid2 = $('#list-view').isotope({
    itemSelector:'.row',
    getSortData:{
      date:'.date',
      category:'[data-category]'
    },
    filter: function() {
      return qsRegex ? $(this).text().match( qsRegex ) : true;
    }
  })
  // count
  iso1 = $grid.data('isotope');
  iso2 = $grid2.data('isotope');
  $filterCount=$('.filter-count');

  // select sort(정렬)
  $('.select-sort').change(function(){
    var sortValue=$(this).find('option:selected').val();
    $grid.isotope({sortBy:sortValue});
    $grid2.isotope({sortBy:sortValue});
  });

  // select filter(필터:선택한 카테고리별로 걸러줌.)
  $('.select-filter').change(function(){
    var filterValue=$(this).find('option:selected').val();
    //search filter의 기본값을 변경해버림.
    $grid.isotope({filter:filterValue});
    $grid2.isotope({filter:filterValue});
    updateCount();//total count 갱신처리(필터기능시)
  });

  // updateCount
  function updateCount(){
    memoType=localStorage.getItem('memoType');
    if(memoType=='box'){
      $filterCount.text('Total '+iso1.filteredItems.length);
    }else{
      $filterCount.text('Total '+iso2.filteredItems.length);
    }
  }

  // memo list
  for(var i=0; i<localStorage.length; i++){
    var memoIdVal=localStorage.key(i);
    if(memoIdVal.indexOf(new Date().getFullYear())!=-1){
      var obj=localStorage.getObject(memoIdVal);
      var boxTag='<div class="grid-item '+obj.category+'" data-category="'+obj.category+'">'+
                 '  <div class="card hoverable '+obj.color+'">'+
                 '    <a href="#modal" class="modal-link">'+
                 '      <div class="card-content white-text">'+
                 '        <span class="card-title date">'+memoIdVal+'</span>'+
                 '        <p class="truncate">'+obj.memo+'</p>'+
                 '      </div>'+
                 '    </a>'+
                 '    <div class="card-action">'+
                 '      <button class="remove"><i class="material-icons">close</i></button>'+
                 '      <span class="right">'+obj.category+'</span>'+
                 '    </div>'+
                 '  </div>'+
                 '</div>';
      $items=$(boxTag);
      $grid.append($items).isotope('prepended',$items);

      var listTag='<div class="row '+obj.category+'" data-category="'+obj.category+'">'+
                  ' <div class="col s12 m5 date">'+
                  '   <span>'+memoIdVal+'</span>'+
                  '   <span class="badge '+obj.color+'">'+obj.category+'</span>'+
                  ' </div>'+
                  ' <div class="col s12 m7 truncate">'+obj.memo+'</div>'+
                  '   <a href="#!" class="white-text modal-link"><i class="material-icons">open_in_new</i></a>'+
                  '   <a href="#!" class="white-text remove"><i class="material-icons">close</i></a>'+
                  '</div>';
      $items=$(listTag);
      $grid2.append($items).isotope('prepended',$items);
    }
  }
  //문서 로드하고 한번 실행
  updateCount();

  // memo save
  $('#save').click(function(){
    var memoIdVal=nowDate();//로컬스토리지의 키값
    var categoryVal=$('.select-category option:selected').val();
    var colors=['green','brown','teal'];
    var color="";
    var memoContentsVal=$('#memo-contents').val();
    //엔터키(enter)를 <br>로 변경
    memoContentsVal=memoContentsVal.replace(/\r?\n/g,'<br>');

    switch (categoryVal) {
      case 'idea':color=colors[0]; break;
      case 'diary':color=colors[1]; break;
      case 'etc':color=colors[2]; break;
    }
    // 메모장에 저장할 값을 객체에 담기
    var obj={
      'category':categoryVal,
      'color':color,
      'memo':memoContentsVal
    }

    if(typeof(Storage) !== "undefined"){
      if(categoryVal!='' && memoContentsVal!=''){
        //메모의 키값과 객체를 저장
        localStorage.setObject(memoIdVal, obj);
        var boxTag='<div class="grid-item '+categoryVal+'" data-category="'+categoryVal+'">'+
                   '  <div class="card hoverable '+color+'">'+
                   '    <a href="#modal" class="modal-link">'+
                   '      <div class="card-content white-text">'+
                   '        <span class="card-title date">'+memoIdVal+'</span>'+
                   '        <p class="truncate">'+memoContentsVal+'</p>'+
                   '      </div>'+
                   '    </a>'+
                   '    <div class="card-action">'+
                   '      <button class="remove"><i class="material-icons">close</i></button>'+
                   '      <span class="right">'+categoryVal+'</span>'+
                   '    </div>'+
                   '  </div>'+
                   '</div>';
        $items=$(boxTag);
        $grid.append($items).isotope('prepended',$items);

        var listTag='<div class="row '+categoryVal+'" data-category="'+categoryVal+'">'+
                    ' <div class="col s12 m5 date">'+
                    '   <span>'+memoIdVal+'</span>'+
                    '   <span class="badge '+color+'">'+categoryVal+'</span>'+
                    ' </div>'+
                    ' <div class="col s12 m7 truncate">'+memoContentsVal+'</div>'+
                    '   <a href="#!" class="white-text modal-link"><i class="material-icons">open_in_new</i></a>'+
                    '   <a href="#!" class="white-text remove"><i class="material-icons">close</i></a>'+
                    '</div>';
        $items=$(listTag);
        $grid2.append($items).isotope('prepended',$items);

        //메모 작성영역(textarea) 값과 높이 초기화
        $('#memo-contents').val('').css('height','');
        updateCount();
      }else if(categoryVal==''){
        alert('카테고리를 선택해주세요.');
      }else if(memoContentsVal==''){
        alert('내용을 작성해주세요.');
      }
    }else{
      alert('웹스토리지를 지원하지 않습니다.');
    }
  })// memo save end

  // memo one delete
  $('body').on('click','.remove',function(){
    if(confirm('선택하신 메모를 지우시겠습니까?')){
      if(memoType=='box'){
        memoIdVal=$(this).parents('.card').find('.date').text();
      }else{
        memoIdVal=$(this).siblings('.date').find('span:eq(0)').text();
      }
      localStorage.removeItem(memoIdVal);
      //해당 문자열을 가지고 있는 객체를 선택해서 지우기
      $obj1=$('#box-view .grid-item:contains("'+memoIdVal+'")');
      $obj2=$('#list-view .row:contains("'+memoIdVal+'")');
      $grid.isotope('remove',$obj1).isotope('layout');
      $grid2.isotope('remove',$obj2).isotope('layout');
      updateCount();
    }
  })
  // touchSwipe one delete
  $('body').on('touchstart click','#list-view .row',function(){
    $(this).swipe({
      swipe:function(event, direction, distance, duration, fingerCount, fingerData){
        memoIdVal=$(this).find('span:eq(0)').text();
        if(direction=='left'){
          if(confirm('선택하신 메모를 지우시겠습니까?')){
            $(this).animate({
              left:'-100%',
              opacity:0
            },500,function(){
              localStorage.removeItem(memoIdVal);
              $obj1=$('#box-view .grid-item:contains("'+memoIdVal+'")');
              $obj2=$('#list-view .row:contains("'+memoIdVal+'")');
              $grid.isotope('remove',$obj1).isotope('layout');
              $grid2.isotope('remove',$obj2).isotope('layout');
              updateCount();
            })
          }
        }
      },
      threshold:0
    })//swipe end
  })//touchstart click end

  // memo all delete
  $('#btn-delete').click(function(){
    if(confirm('메모를 전체 삭제하시겠습니까?')){
      localStorage.clear();
      localStorage.setItem('intro',0);
      localStorage.setItem('memoType',memoType);
      localStorage.setItem('themeType',themeType);
      $obj1=$('#box-view .grid-item');
      $obj2=$('#list-view .row');
      $grid.isotope('remove',$obj1).isotope('layout');
      $grid2.isotope('remove',$obj2).isotope('layout');
      updateCount();
    }
  })
})//document ready end

// 현재날짜와 시간(스토리지의 키값으로 사용)
function nowDate(){
  var today=new Date();
  var year=zero(today.getFullYear());
  var month=zero(today.getMonth()+1);
  var day=zero(today.getDate());
  var hours=zero(today.getHours());
  var min=zero(today.getMinutes());
  var sec=zero(today.getSeconds());
  function zero(num){
    num=(num<10)?"0"+num:num;
    return num;
  }
  return year+"."+month+"."+day+"("+hours+":"+min+":"+sec+")";
}








//
