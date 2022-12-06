$(function () {
  setTimeout(() => {
    // PC - FTA 활용률
    $('#btn-use-rate').on('click', function () {
      $('.map_guide').slideToggle(500)
      $('.main-use-rate-box').toggleClass('active').children().children('#btn-use-rate').text('펼치기')
      $('.main-use-rate-box').siblings('.use-rate-wrap').find('.map_guide').attr('title', 'FTA 활용률 닫힘')
      $('.main-use-rate-box.active').children().children('#btn-use-rate').text('접기')
      $('.main-use-rate-box.active').siblings('.use-rate-wrap').find('.map_guide').attr('title', 'FTA 활용률 열림')

      var isOpen = $('#mo-use-rate').is(':visible')
      if (isOpen) {
        // 닫힘
        $('#mo-use-rate').stop().slideUp()
        $('#mo-use-rate').attr('aria-hidden', 'true')
      } else {
        // 열림
        $('#mo-use-rate').stop().slideDown()
        $('#mo-use-rate').attr('aria-hidden', 'false')
      }
    })

    // 인덱스 지도 수출, 수입 탭
    $('.map_btnbox button').click(function () {
      var $tap = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('.map_box').removeClass('active')
      var contents = $('.map_box')
      $(contents[$tap]).addClass('active')
    })

    $('.map_btnbox button').click(function () {
      var $menu_tap = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('.graph_box').removeClass('active')
      var page_contents = $('.graph_box')
      $(page_contents[$menu_tap]).addClass('active')
    })

    $('#map_open').click(function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('.graph_container').hide()
      $('.map_container').show()
    })
    $('#graph_open').click(function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('.map_container').hide()
      $('.graph_container').show()
    })

    // MO - FTA 활용률
    // $('#btn-use-rate').on('click', function (e) {})
    $('#mo-use-rate .tab button').on('click', function (e) {
      e.preventDefault()
      $('#mo-use-rate .tab li').removeClass('on')
      $('#mo-use-rate .tab li button').attr('aria-selected', 'false')
      var $target = $(this).parents('li')
      $target.addClass('on')
      $(this).attr('aria-selected', 'true')

      $('#mo-use-rate .tab_cont').hide()
      $('#mo-use-rate .tab_cont').attr('aria-hidden', 'true')
      var id = $(this).attr('aria-controls')
      $('#' + id).show()
      $('#' + id).attr('aria-hidden', 'false')
    })
  }, 200)
})
