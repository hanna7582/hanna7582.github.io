$(function() {

	$( ".datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "/admin/css/images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date"
    });

	// 로그인 input box 스크립트(아이디, 패스워드)
	$('.login_box input').each(function() {
		$(this).on({
			focusin:function() {
				$(this).css('background', '#fff'); // input 박스에 focus시 배경 흰색 처리
			},
			focusout:function() {
				var val = $(this).val(); // input 박스의 값을 체크하여 값이 있으면 값을 나타내고 없으면 아래의 조건문을 나타낸다.
				if(!val) {
					if($(this).attr('id') == 'id') { // 해당 input 박스의 id가 'id'일 경우,
						$(this).css('background', '#fff url(/admin/img/login/txt_id_bg.png) no-repeat 25px center');
					} else { // 해당 input 박스의 id가 'id'가 아닌 다른 값일 경우(즉, password 일 경우)
						$(this).css('background', '#fff url(/admin/img/login/txt_pw_bg.png) no-repeat 25px center');
					}
				}
			}
		});
	});

	// GNB
	$('.gnb>ul>li:first-child').css('padding-left', '0px');
	$('.gnb>ul>li:last-child').css('background', 'none');
	$('.gnb>ul>li>a').bind('click', function() {
		$(this).addClass('on').parent('li').siblings('li').children('a').removeClass('on');
	});

	// Aside Menu
	$('.menu>ul>li>a').bind('click', function() {
		var aside_menu = $(this).siblings('ul');
		var aside_height = aside_menu.outerHeight();
		
		if(!$(this).hasClass('on')) {
			$(this).addClass('on').parent('li').siblings('li').children('a').removeClass('on');
			$(this).siblings('ul').stop().show(300);
			$(this).parent('li').stop().animate({'padding-bottom':aside_height}, 300).siblings('li').stop().animate({'padding-bottom':0}, 300).children('a').siblings('ul').hide(300);
		} else {
			$(this).siblings('ul').stop().hide(300);
			$(this).removeClass('on').parent('li').stop().animate({'padding-bottom':0}, 300);
		}
		return false;
	});

	// 테이블 양쪽 border 제거
	$('table th:first-child, table td:first-child').css('border-left', 'none');
	$('table th:last-child, table td:last-child').css('border-right', 'none');

	// 테이블 마지막 행 td border-bottom 제거
	$('table tr:last-child td').css('border-bottom', 'none');

	// 탭 마지막 li border-right 제거
	$('.tab_area>ul>li:last-child').css('border-right', 'none');

	// 탭 선택제어 
	$('.tab_area>ul>li>a').bind('click', function() {
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	});

	// 에디터 내용 쓰기(.editor), 보기(.ontent_viewer)의 부모 td태그의 양쪽 여백을 0으로 만든다.
	$('.editor, .content_viewer').parent('td').css({'padding-left':'0px', 'padding-right':'0px'});


	// .file_upload div안에 p태그가 있을 경우 margin-top:10px을 준다. 그렇지 않을 경우 margin-top은 0px이다.
	var upload_pNum = $('.file_upload').has('p').size();
	var tg =$('.file_upload>div.upload');
		if((upload_pNum) > 0) {
			tg.css('margin-top', '10px');
			// console.log('hi');
		} else {
			tg.css('margin-top', '0px');
			// console.log('hi');
		}


	// // 갤러리 라디오 버튼 선택 시 사진 or 영상 입력 나타내기/숨기기
	// $('input[name="media_type"]').change(function() {
	// 	var radio_val = $('input[name="media_type"]:checked').val();
	// 	if(radio_val == '1') {
	// 		$('.media_photo').css('display', 'block');
	// 		$('.media_movie').css('display', 'none');
	// 	} else {
	// 		$('.media_photo').css('display', 'none');
	// 		$('.media_movie').css('display', 'block');
	// 	}
	// });
});

