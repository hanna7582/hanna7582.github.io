$(function () {
  setTimeout(() => {
    // 디바이스 체크
    $(window)
      .on('resize', function () {
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width
        eventOff()
        if (width >= 1400) {
          pcNavOn()
        } else {
          moNavOn()
        }
      })
      .resize()

    // 공지사항 swiper ==============================================================================
    var topNoticeSlideLength = $('.top-notice .swiper-slide').length // 총 슬라이드 수
    var topNotice = new Swiper('.top-notice .swiper', {
      loop: true,
      direction: 'vertical',
      speed: 500,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    })

    // 리스트 1개 이하 재생 버튼으로 변경 및 자동 재생 정지
    if (topNoticeSlideLength <= 1) {
      $('.top-notice .btn-control').attr('aria-label', '재생')
      $('.top-notice .btn-control').toggleClass('icon-top-notice-pause icon-top-notice-play')
      topNotice.autoplay.stop()
    }

    // 공지사항 재생/정지
    $('.top-notice .btn-control').on('click', function () {
      var state = $(this).attr('aria-label')
      $(this).toggleClass('icon-top-notice-pause icon-top-notice-play')
      if (state == '정지') {
        $(this).attr('aria-label', '재생')
        topNotice.autoplay.stop()
      } else {
        $(this).attr('aria-label', '정지')
        topNotice.autoplay.start()
      }
    })
    // 공지사항 닫기
    $('.top-notice .btn-close').on('click', function () {
      $('.top-notice').hide()
      $('body').removeClass('notice-on')
    })

    // 검색 레이어팝업 ==============================================================================
    // 검색아이콘 클릭시 페이지 표출
    $('header .btn-search').on('click', function () {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width
      if (width < 1400) {
        // 메뉴 닫기
        $('body').removeAttr('style')
        $('.btn-menu').attr('aria-label', '전체메뉴 열기')
        $('.header-wrap nav').attr('aria-expanded', 'false')
        $('header nav').hide()
        $('header .depth1 > li:nth-child(1)').removeClass('active')
      }
      if ($(this).attr('aria-label') == '검색팝업 열기') {
        $(this).attr('aria-label', '검색팝업 닫기')
      } else {
        $(this).attr('aria-label', '검색팝업 열기')
      }
      $('.nav_search').slideToggle()
      $('#schKwrd').focus()
      $('header').addClass('active')
    })

    // 검색창에서 포커스 나갈때 비노출
    $('.nav_search_x').blur(function () {
      $('.nav_search').slideUp(500)
      $('.search_btn').focus()
    })

    // 검색창 닫힘
    $('.nav_search_x').on('click', function () {
      $('.nav_search').slideUp(500)
    })

    // 자동완성 기능 교체
    $('.btn-autocomplete').on('click', function () {
      $('.btn-autocomplete').toggleClass('active')
      $('.nav_searchtxt').toggle()
      $('.nav_searchlist').toggle()
      var state = $(this).attr('aria-label')
      if (state === '자동완성 켜기') {
        $('.btn-autocomplete').attr('aria-label', '자동완성 끄기')
      } else {
        $('.btn-autocomplete').attr('aria-label', '자동완성 켜기')
      }
      $('#schKwrd').focus()
    })

    // 자동완성 임시
    $('#schKwrd').on('keyup', function () {
      if ($('#objAutoCmpltSchArea').is(':visible')) {
        $('#objAutoCmpltSchArea').show()
        if ($(this).val() === '') {
          $('#objAutoCmpltSchArea li').hide()
        } else {
          $('#objAutoCmpltSchArea li').show()
        }
      }
    })

    // family-site ==============================================================================
    $('.family-list button').on('click', function () {
      $(this).siblings('ul').toggle()
      $(this).toggleClass('active')
      $(this).parents('.family-list').siblings().children('ul').hide()
      $(this).parents('.family-list').siblings().children('button').removeClass('active')
    })
    $('.family-list ul').mouseleave(function () {
      $(this).hide()
      $(this).siblings('button').removeClass('active')
    })
  }, 200)

  // PC 네비게이션 이벤트 실행
  function pcNavOn() {
    $('header nav').show()
    $('header .depth1').on({
      mouseenter: function () {
        $('header').addClass('on')
      },
      mouseleave: function () {
        $('header').removeClass('on')
      },
      keyup: function () {
        $('header').addClass('on')
      },
    })
    $('h1, .btn-login').on({
      keyup: function () {
        $('header').removeClass('on')
      },
    })
  }
  // MO 네비게이션 이벤트 실행
  function moNavOn() {
    $('header nav').hide()
    $('header .depth1 > li').removeClass('active')
    $('.btn-menu').on('click', function () {
      // 검색 닫기
      $('.nav_search').hide()
      $('.btn-search').attr('aria-label', '검색팝업 열기')
      if ($(this).attr('aria-label') == '전체메뉴 열기') {
        $('body').css('overflow', 'hidden')
        $(this).attr('aria-label', '전체메뉴 닫기')
        $('.header-wrap nav').attr('aria-expanded', 'true')
      } else {
        $('body').removeAttr('style')
        $(this).attr('aria-label', '전체메뉴 열기')
        $('.header-wrap nav').attr('aria-expanded', 'false')
      }
      $('header .depth1 > li:nth-child(1)').toggleClass('active')
      $('header nav').toggle()
    })
    $('header .depth1 > li > a').on('click', function () {
      $('header .depth1 > li').removeClass('active')
      $(this).parent().addClass('active')
    })
  }
  // 이벤트 제거
  function eventOff() {
    $('body').removeAttr('style')
    $('header').removeClass('on')
    $('header .depth1').off('mouseenter mouseleave keyup')
    $('h1, .btn-login').off('keyup')
    $('.btn-menu, header .depth1 > li > a').off('click')
    $('.header-wrap nav').removeAttr('aria-expanded')
  }
})

// 팝업을 연 요소
var currentTargetEl
// 팝업 닫기
$(document).on('click', '.popup .btn-close, .popup .btn-popup-close, .popup .btn-popup-confirm', function () {
  popupClose()
})
function popupClose() {
  $('#popup').remove()
  currentTargetEl.focus()
  $('html').removeAttr('style')
}

// 팝업 열기 currentTarget 팝업을 연 요소, popup 팝업 선택자
function popupOpen(currentTarget, popup) {
  currentTargetEl = $(currentTarget)
  popup.show().attr('tabindex', 0).focus()
  $('html').css('overflow', 'hidden')
}

// 비디오 팝업
var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
var player

function fnShowVideo(videoId, e) {
  var currentTarget = e.currentTarget
  $('html').css('overflow', 'hidden')
  $('body').append('<div id="popup"></div>')
  $('#popup').load('/popup/video.html', function () {
    popupOpen(currentTarget, $('.video'))
    player = new YT.Player('youtube_player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      events: {
        onReady: function (event) {
          event.target.playVideo()
        },
      },
    })
  })
}
