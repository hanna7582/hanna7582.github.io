
$(document).ready(function(){

	//Code to center the subscription pup-up box
	$box = $('#box');
	$box.css({
		'left' : '50%',
		'top' : '50%',
		'margin-left' : -$box.width()/2 + 'px',
		'margin-top' : -$box.height()/2 + 'px'
	});


	//Subscription pup-up
	$('.start_btn').click(function(){
		$('#lightbox').width($(window).width()).height($(window).height()).fadeIn(200);
		$('#box').fadeIn(200);

		return false;
	});

	$('#lightbox, .close').click(function(){
		$('#lightbox').width(0).height(0).fadeOut(200);
		$('#box').fadeOut(200);

		return false;
	});

	var player=$('video')[0];

	//스크롤 이벤트
	// $(window).scroll(function(){
	// 	var videoTop=$('.video').offset().top;
	// 	var windowTop=$(window).scrollTop();
	// 	if(windowTop>videoTop){
	// 		console.log('플레이');
	// 		player.play();
	// 		player.muted=true;
	// 		$('#btn-play-pause').attr('title','일시정지');
	//     $('#btn-play-pause i').text('pause');
	// 	}
	// })

	$('#btn-play-pause').click(function(){
		if (player.paused) {
	    player.play();
			$(this).attr('title','일시정지');
	    $('#btn-play-pause i').text('pause');
	  } else {
	    player.pause();
			$(this).attr('title','재생');
	    $('#btn-play-pause i').text('play_arrow');
	  }
	});

	//음소거
	$('#btn-volume').on('click',function(){
	  if($(this).find('i').text()=='volume_up'){
			$(this).attr('title','음소거해제');
	    $(this).find('i').text('volume_off');
	    player.muted=true;
	  }else{
			$(this).attr('title','음소거');
	    $(this).find('i').text('volume_up');
	    player.muted=false;
	  }
	})

	//전체화면
	$('#btn-fullscreen').on('click',function(){
	  if($(this).find('i').text()=='fullscreen'){
			$(this).attr('title','기본화면');
	    $(this).find('i').text('fullscreen_exit');
	    $('body').addClass('fullscreen');
	  }else{
			$(this).attr('title','전체화면');
	    $(this).find('i').text('fullscreen');
	    $('body').removeClass('fullscreen');
	  }
	})

	//다시재생
	$('#btn-replay').on('click',function(){
		player.pause();
	 	player.currentTime = 0;
	 	player.play();
	})

	//재생완료체크
	statusloop=setInterval(status, 10);
	function status(){
	  if(player.ended){
	    $('#btn-play-pause i').text('play_arrow').attr('title','재생');
	    clearInterval(statusloop);
	  }
	}

});
