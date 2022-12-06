$.datepicker.setDefaults({
  dateFormat: 'yy-mm-dd',
  prevText: '이전 달',
  nextText: '다음 달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년',
})

// sub-nav
dropDownNav('.sub-nav')
// 활용절차 nav
dropDownNav('.usage-process-nav')

// drop-down nav
function dropDownNav(selector) {
  // drop-down
  $(selector + ' .drop-down > a').on('click', function (e) {
    // e.preventDefault()
    var isOpen = $(this).next().is(':visible')
    $(selector + ' a').removeClass('active')
    $(selector + ' .drop-down .depth2').hide()
    $(selector + ' .drop-down').attr('aria-expanded', 'false')
    if (isOpen) {
      $(this).parent().attr('aria-expanded', 'false')
      $(this).removeClass('active')
      $(this).next().hide()
    } else {
      $(this).parent().attr('aria-expanded', 'true')
      $(this).addClass('active')
      $(this).next().show()
    }
  })
  // a 활성화
  $(selector + ' a').on('click', function (e) {
    // e.preventDefault()
    if ($(this).parent('li').hasClass('drop-down')) return
    $(selector + ' a').removeClass('active')
    $(selector + ' a').removeAttr('aria-current')
    $(selector + ' .drop-down').attr('aria-expanded', 'false')
    $(selector + ' .depth2').hide()
    $(this).attr('aria-current', 'page')
    $(this).addClass('active')
    if ($(this).parents('li').hasClass('drop-down')) {
      $(this).parents('li').find('.arrow').addClass('active')
      $(this).parents('.drop-down').attr('aria-expanded', 'true')
      $(this).parents('li').find('.depth2').show()
    }
  })
}

// 활용절차 nav
var diff // 스크롤 스파이 시점 계산
var gap // 디바이스별 격차 계산
$(window)
  .on('scroll', function () {
    findPosition()
  })
  .scroll()

$(window)
  .on('resize', function () {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width
    $('.usage-process-control .btn-usage-process-menu').removeClass('close').attr('aria-label', '활용절차 메뉴 열기')
    if (width >= 1400) {
      $('.usage-process-nav').attr('aria-expanded', 'true')
      $('.usage-process-nav .depth1').show()
      gap = 20
    } else {
      $('.usage-process-nav').attr('aria-expanded', 'false')
      $('.usage-process-nav .depth1').hide()
      gap = 0
    }
    // pc와 pc이하 20px차이
    if ($('body').hasClass('notice-on')) {
      diff = 170 - gap
    } else {
      diff = 120 - gap
    }
  })
  .resize()

// 활용절차 nav 메뉴 토글 버튼
$('.usage-process-control .btn-usage-process-menu').on('click', function () {
  if ($(this).attr('aria-label') == '활용절차 메뉴 열기') {
    $(this).attr('aria-label', '활용절차 메뉴 닫기')
    $('.usage-process-nav').attr('aria-expanded', 'true')
  } else {
    $(this).attr('aria-label', '활용절차 메뉴 열기')
    $('.usage-process-nav').attr('aria-expanded', 'false')
  }
  $(this).toggleClass('close')
  $('.usage-process-nav .depth1').toggle()
})

// 활용절차 nav 스크롤스파이
$('.usage-process-nav a').on('click', function (e) {
  e.preventDefault()
  var selector = $(this).attr('href')
  var topPosition = $(selector).offset().top - diff
  console.log(selector, topPosition)
  $(window).scrollTop(topPosition)
})

function findPosition() {
  $('[id*="process"]').each(function () {
    var id = $(this).attr('id')
    var scrollTop = $(window).scrollTop() + diff
    var elScrollTop = Math.round($(this).offset().top)
    var elHeight = Math.round($(this).outerHeight(true))
    // console.log(elScrollTop, elScrollTop + elHeight, scrollTop)
    if (elScrollTop <= scrollTop + 5) {
      // console.log('active', id)
      // 초기화
      $('.usage-process-nav .drop-down').attr('aria-expanded', 'false')
      $('.usage-process-nav .depth2').hide()
      $('.usage-process-nav a').removeClass('active')

      var activeMenu = $('.usage-process-nav').find('a[href="#' + id + '"]')
      // 활성화
      activeMenu.parents('.drop-down').attr('aria-expanded', 'true')
      activeMenu.parents('.drop-down').find('.icon').addClass('active')
      activeMenu.parents('.drop-down').find('.depth2').show()
      activeMenu.addClass('active')
    }
  })
}

// 초기 라디오, 체크박스 상태에 따라 텍스트입력창 활성화 / 비활성화
$('[type=radio], [type=checkbox]').each(function (i, el) {
  var checked = $(el).is(':checked')
  if (!checked) {
    $(el).siblings('.input-text, .select-box').attr('disabled', true)
  }
})
// 라디오 선택시 텍스트입력창 활성화 / 비활성화
$('[type=radio]').on('change', function () {
  var checked = $(this).is(':checked')
  var groupName = $(this).attr('name')
  $('[name="' + groupName + '"]')
    .siblings('.input-text, .select-box')
    .attr('disabled', true)
  if (checked) {
    $(this).siblings('.input-text, .select-box').attr('disabled', false)
  }
})
//체크박스 선택시 텍스트입력창 활성화 / 비활성화
$('[type=checkbox]').on('change', function () {
  var checked = $(this).is(':checked')
  if (checked) {
    $(this).siblings('.input-text, .select-box').attr('disabled', false)
  } else {
    $(this).siblings('.input-text, .select-box').attr('disabled', true)
  }
})

// 팝오버 열기
$('.btn-file-view').on('click', function () {
  $('.popover').hide()
  $('.popover-area').removeClass('on')
  $(this).siblings('.popover').show()
  $(this).parent('.popover-area').addClass('on')
})

// 팝오버 닫기
$('.popover-area .btn-close').on('click', function () {
  $(this).parent('.popover').hide()
  $('.popover-area').removeClass('on')
})

// 아코디언
$('.accordion button').on('click', function () {
  var state = $(this).attr('aria-expanded')
  $('.accordion button').removeClass().attr('aria-expanded', 'false')
  $('.accordion .accordion-body').stop().slideUp()
  if (state === 'true') {
    $(this).parent().next().stop().slideUp()
    $(this).removeClass()
    $(this).attr('aria-expanded', 'false')
  } else {
    $(this).parent().next().stop().slideDown()
    $(this).addClass('active')
    $(this).attr('aria-expanded', 'true')
  }
})

// o, x 팝업
$('.choice [type="radio"]').on('change', function () {
  var isAnswer = $(this).parent('.choice').hasClass('choice-o')
  var result = isAnswer ? 'o' : 'x'
  $('body').append(`
    <div class="popup quiz-popup">
      <div class="popup-wrap">
        <span class="icon-answer-${result}"></span>
        <span class="blind">${result}입니다. 2초 뒤 사라집니다.</span>
      </div>
    </div>
  `)
  $('.popup').show()
  setTimeout(function () {
    $('.popup').fadeOut(function () {
      $(this).remove()
    })
  }, 2000)
})

// 모바일용 유관기관
$('.site_list_toggle button').on('click', function (e) {
  var $target = $(this).parents('li')
  var state = $target.hasClass('active')
  $('.site_list_toggle li').removeClass('active')
  $('.site_list_toggle div').attr('aria-hidden', 'true').stop().slideUp()
  $('.site_list_toggle button').attr('aria-expanded', 'false')
  if (state) {
    $target.removeClass('active')
    $target.find('div').stop().slideUp()
    $(this).attr('aria-expanded', 'false')
    $target.find('div').attr('aria-hidden', 'true')
  } else {
    $target.addClass('active')
    $target.find('div').stop().slideDown()
    $(this).attr('aria-expanded', 'true')
    $target.find('div').attr('aria-hidden', 'false')
  }
})
