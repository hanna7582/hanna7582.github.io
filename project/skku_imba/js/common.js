$(document).ready(function () {
  footerSns()

  $(window).on('resize', function () {
    footerSns()
  })

  // 내 정보
  $('.btn-mine').on('click', function () {
    if ($(this).next().is(':hidden')) {
      $(this).next().slideDown()
    } else {
      $(this).next().slideUp()
    }
  })

  //햄버거메뉴
  const menuBtn = $('.header2 .allmenu-btn')
  const allMenuCont = $('.all-menu')

  menuBtn.click(function () {
    allMenuCont.toggleClass('on')
    menuBtn.toggleClass('on')
    $('html, body').toggleClass('not_scroll')
    $('.all-menu ul *').removeClass('on')
  })
  $('.all-menu-close').on('click', function () {
    $('html, body').removeClass('not_scroll')
    menuBtn.removeClass('on')
    menuBtn.focus()
    allMenuCont.removeClass('on')
  })

  //family site
  $('.family-btn').on('click', function () {
    $('.family-btn').toggleClass('open')
    $('.family-list').toggleClass('open')
  })

  //mobile 리스트 2022.11.02
  $('.all-menu > ul > li > a').click(function () {
    if ($(window).outerWidth() <= 768) {
      if ($(this).parents('li').hasClass('on')) {
        $(this).parents('li').removeClass('on')
      } else {
        $('.all-menu > ul > li').removeClass('on')
        $(this).parents('li').addClass('on')
      }
    }
  })
  $('.all-menu .depth2 li').click(function () {
    if ($(window).outerWidth() <= 768) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on')
      } else {
        $('.depth2 li').removeClass('on')
        $(this).addClass('on')
      }
    }
  })

  // foot family site focus out
  $('.brochure > a').on('focusin', function () {
    $('.family-list, .family-btn').removeClass('open')
  })

  // 모바일 전용 sub-nav
  $(window)
    .on('resize', function () {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width
      if (width > 1200) {
        $('.select-menu a').off('click')
        $('.select-menu').addClass('open')
        $('.select-menu ul').show()
      } else {
        subNavOn()
        $('.select-menu').removeClass('open')
        $('.select-menu ul').hide()
      }
    })
    .resize()

  $('.select-menu .selected').on('click', function () {
    $(this).next().toggle()
    $(this).parent('.select-menu').toggleClass('open')
  })
  function subNavOn() {
    $('.select-menu a').on('click', function (e) {
      e.preventDefault()
      var menu = $(this).text()
      $(this).parents('ul').find('a').removeAttr('aria-current').removeClass('active')
      $(this).attr('aria-current', 'page')
      $(this).addClass('active')
      $(this).parents('.select-menu').find('.selected').text(menu)
      $(this).parents('.select-menu').find('ul').hide()
      $(this).parents('.select-menu').removeClass('open')
    })
  }

  // select input 활성화
  $('.select-visiable').on('change', function () {
    var optionVal = $(this).val()
    if (optionVal == 1) {
      $(this).next().attr('disabled', true)
    } else {
      $(this).next().attr('disabled', false)
    }
  })

  // 초기 라디오, 체크박스 상태에 따라 텍스트입력창 활성화 / 비활성화
  $('[type=radio], [type=checkbox]').each(function (i, el) {
    var checked = $(el).is(':checked')
    if (!checked) {
      $(el).siblings('input, select').attr('disabled', true)
    }
  })
  // 라디오 선택시 텍스트입력창 활성화 / 비활성화
  $('[type=radio]').on('change', function () {
    var checked = $(this).is(':checked')
    var groupName = $(this).attr('name')
    $('[name="' + groupName + '"]')
      .siblings('input, select')
      .attr('disabled', true)
    if (checked) {
      $(this).siblings('input, select').attr('disabled', false)
    }
  })
})

//footer sns
function footerSns() {
  if (window.innerWidth < 768) {
    $('.address-info').before($('.sns-wrap'))
  } else {
    $('.right-box .list').before($('.sns-wrap'))
  }
}

// 팝업을 연 요소
var currentTargetEl
// 팝업 닫기
$(document).on('click', '.popup .btn-close', function () {
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
