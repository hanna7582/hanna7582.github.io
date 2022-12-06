$(function () {
  // 메인 비쥬얼 swiper ======================================================================================================================================================
  // 배경 슬라이드
  var mainVisualBgSlideLength = $('.swiper-bg .swiper-slide').length // 총 슬라이드 수
  var optionsBg = {
    pagination: {
      el: '.swiper-bg-control .swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-bg-control .swiper-btn-next',
      prevEl: '.swiper-bg-control .swiper-btn-prev',
    },
    a11y: {
      prevSlideMessage: '이전 배경',
      nextSlideMessage: '다음 배경',
    },
    effect: 'fade',
    loop: true,
    speed: 500,
    allowTouchMove: false,
  }
  // 한번에 보여줄 슬라이드 수 보다 총 슬라이드 수가 많으면 자동 재생
  if (mainVisualBgSlideLength > 1) {
    optionsBg.autoplay = {
      delay: 5000,
      disableOnInteraction: false,
    }
  } else {
    // 재생 버튼으로 변경
    $('.main-visual .btn-control').attr('aria-label', '배경 재생')
    $('.main-visual .btn-control').toggleClass('icon-pause icon-play')
  }
  var mainVisualBg = new Swiper('.main-visual .swiper-bg', optionsBg)

  // 메인 비쥬얼 재생/정지
  $('.main-visual .btn-control').on('click', function () {
    var icon = $(this).attr('aria-label')
    $(this).toggleClass('icon-pause icon-play')
    if (icon == '배경 정지') {
      $(this).attr('aria-label', '배경 재생')
      mainVisualBg.autoplay.stop()
    } else {
      $(this).attr('aria-label', '배경 정지')
      mainVisualBg.autoplay.start()
    }
  })

  // 컨텐츠 슬라이드
  var optionsInner = {
    navigation: {
      nextEl: '.swiper-inner-control .swiper-btn-next',
      prevEl: '.swiper-inner-control .swiper-btn-prev',
    },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
    },
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    speed: 500,
    breakpoints: {
      768: {
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 50,
      },
      1400: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 60,
      },
    },
  }
  var mainVisualInner = new Swiper('.main-visual .swiper-inner', optionsInner)

  // 뉴스레터 swiper ======================================================================================================================================================
  var newsLetterSlideLength = $('.news-letter .swiper-slide').length // 총 슬라이드 수
  var newsLetter = new Swiper('.news-letter .swiper', {
    navigation: {
      nextEl: '.news-letter .swiper-btn-next',
      prevEl: '.news-letter .swiper-btn-prev',
    },
    a11y: {
      prevSlideMessage: '이전',
      nextSlideMessage: '다음',
    },
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  })
  // 리스트 1개 이하 컨트롤 미노출
  if (newsLetterSlideLength <= 1) {
    $('.news-letter .swiper-control').hide()
  }

  // 뉴스레터 재생/정지
  $('.news-letter .btn-control').on('click', function () {
    var icon = $(this).attr('aria-label')
    $(this).toggleClass('icon-pause icon-play')
    if (icon == '정지') {
      $(this).attr('aria-label', '재생')
      newsLetter.autoplay.stop()
    } else {
      $(this).attr('aria-label', '정지')
      newsLetter.autoplay.start()
    }
  })

  // 상담 및 컨설팅 현황 swiper ======================================================================================================================================================
  var consultingSlideLength = $('.main-consulting .swiper-slide').length // 총 슬라이드 수
  var consulting = new Swiper('.main-consulting .swiper', {
    loop: true,
    direction: 'vertical',
    speed: 500,
    slidesPerView: 2,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  })

  // 상담 및 컨설팅 현황 영역 도달 시 재생 시작(2개 이상일 경우)
  consulting.autoplay.stop()
  var playState = false
  var topPosition = $('.main-consulting').offset().top
  $(window)
    .on('scroll', function () {
      var scrollTop = $(this).scrollTop()
      if (topPosition < scrollTop && !playState && consultingSlideLength > 2) {
        // 최초 한번 실행
        playState = true
        consulting.autoplay.start()
      }
    })
    .scroll()

  // 포커스 발생시 정지
  $('.main-consulting .swiper-slide').on('focus', function () {
    consulting.autoplay.stop()
  })
})
