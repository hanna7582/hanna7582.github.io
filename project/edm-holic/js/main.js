$(document).ready(function () {
	/* iframe 위로 올라오는거 방지 */
    $("iframe").each(function() {
        var ifr_source = $(this).attr('src');
        var wmode = "wmode=transparent";
            if(ifr_source.indexOf('?') != -1) {
                var getQString = ifr_source.split('?');
                var oldString = getQString[1];
                var newString = getQString[0];
                $(this).attr('src',newString+'?'+wmode+'&'+oldString);
            }
            else $(this).attr('src',ifr_source+'?'+wmode);
    });
    
    player();
    
    coupon();
    
    news();
    
    dateSelect();
    
    main_hover();
        
    $( ".del" ).click(function() {
    	 $(this).parent().remove();
	});
});
	
/* search */
$(document).ready(function () {
	$('input').keyup(function(){
        var txtName = $(".form-control").val();
        if(txtName.length > 0 ){
        	$(".navbar-collapse .list").removeClass("none");
        }else if(txtName.length < 1){
        	$(".navbar-collapse .list").addClass("none");
        }
    });
});


/* 메인메뉴 */
function menu() {
	console.log('click');
    var menu = document.getElementById('menu');
    var shadow = document.getElementById('shadow');

    menu.className = 'menu-in';
    shadow.className = 'shadow-in';
	
	document.getElementById('shadow').addEventListener('click', function () {
	    var menu = document.getElementById('menu');
	    var shadow = document.getElementById('shadow');
	
	    menu.className = 'menu-out';
	    shadow.className = 'shadow-out';
	});
}

/* edmchart hover */
function main_hover(){
	$(".edmchart_hover").mouseover(function() {
		$(this).css( "background", "#ff00c8" );
		$(this).find("dl dd, .rank").css( "color", "#fff" );
		$(this).find(".rank").css( "border-color", "#fff" );
		$(this).find(".up").removeClass("up").addClass("up_hover");
		$(this).find(".down").removeClass("down").addClass("down_hover");
		$(this).find(".keep").removeClass("keep").addClass("keep_hover");
	})
	.mouseout(function() {
		$(this).css( "background", "url(../images/common/bg3.png) no-repeat" );
		$(this).find("dl dd").css( "color", "#a55c63" );
		$(this).find(".rank").css({'color':'#ff00c8','border-color':'#363636'});
		$(this).find(".up_hover").removeClass("up_hover").addClass("up");
		$(this).find(".down_hover").removeClass("down_hover").addClass("down");
		$(this).find(".keep_hover").removeClass("keep_hover").addClass("keep");
  });
}

/* 이메일 */
function email(){
	if($('#email_select option:selected').val() == "7"){
		$(".input_03").addClass("none");
		$(".input_04").removeClass("none");
	};
}

/* 스트리밍 팝업창 */
function streaming_popup(){
	$("#streaming_popup").removeClass("none");
	$("#streaming_popup").addClass("popup");
}

/* 동영상 팝업창 */
function video_view(){
	$("#video_popup").removeClass("none");
	$("#video_popup").addClass("popup");
}

/* 매거진 팝업창 */
function magazine_popup(){
	$("#popup").removeClass("none");
	$("#popup").addClass("popup");
}

/* 이벤트 팝업창 */
function event_popup(){
	$("#event_popup").removeClass("none");
	$("#event_popup").addClass("popup");
}

/* 비콘 이벤트 팝업창 */
function bicon_popup_event(){
	$("#bicon_popup_event").removeClass("none");
	$("#bicon_popup_event").addClass("popup");
}

function pop_close(){
	$("#popup").removeClass("popup");
	$("#popup").addClass("none");
	$("#streaming_popup").removeClass("popup");
	$("#streaming_popup").addClass("none");
	$("#event_popup").removeClass("popup");
	$("#event_popup").addClass("none");
	$("#bicon_popup_event").removeClass("popup");
	$("#bicon_popup_event").addClass("none");
}

/* 플레이어 */
function player(){
	$( ".playlist" ).click(function() {
		$(".player").removeClass("none");
		$(".play").removeClass("glyphicon glyphicon-play");
		$(".play").addClass("glyphicon glyphicon-pause");
		$(".spin").addClass("spin on");
	});
	
	$( ".play" ).click(function() {
		$(this).toggleClass("glyphicon glyphicon-pause glyphicon glyphicon-play");
		$(".spin").toggleClass("spin spin on");
		$(".streaming .list table tbody tr").removeClass("list_select_on");
		$(".dj_name").removeClass("on").addClass("off");
	});
	
	$( ".select_play" ).click(function() {
		if($(".streaming .list table tbody tr").hasClass("list_select_on")){
			$(".spin").addClass("spin on");
			$(".player").removeClass("none");
			$(".play").removeClass("glyphicon glyphicon-play");
			$(".play").addClass("glyphicon glyphicon-pause");
			$(".streaming .list table tbody tr").removeClass("list_select_on").addClass("list_select");
			$(".dj_name").removeClass("on").addClass("off");
			/*$("span").addClass("now_play");
			$(".list_select_on:first").find(".text_left span").addClass("now_play");*/
		}
	});
	
	$( ".select_all" ).click(function() {
		if($(".streaming .list table tbody tr").hasClass("list_select")){
			$(".streaming .list table tbody tr").removeClass("list_select").addClass("list_select_on");
			$(".dj_name").removeClass("off").addClass("on");
			$("span").removeClass("now_play");
		}else{
			$(".streaming .list table tbody tr").removeClass("list_select_on").addClass("list_select");
			$(".dj_name").removeClass("on").addClass("off");
		}
	});
	
	$( ".select_del" ).click(function() {
		if($(".streaming .list table tbody tr").hasClass("list_select_on")){
			$("#streaming_popup").removeClass("popup");
			$("#streaming_popup").addClass("none");
			$(".streaming .list table tbody tr").remove(".list_select_on");
		}else if($(".streaming .list table tbody tr").hasClass("list_select")){
			$("#streaming_popup").removeClass("popup");
			$("#streaming_popup").addClass("none");
		}
	});
	
	$(".streaming .list table tbody tr").click(function() {	
			$("span").removeClass("now_play");
		if($(this).hasClass("list_select_on")){
			$(this).toggleClass("list_select_on list_select");
			$(this).find(".dj_name").toggleClass("off on");
		}else if($(this).hasClass("list_select")){
			$(this).toggleClass("list_select_on list_select");
			$(this).find(".dj_name").toggleClass("off on");
		}
	});
}

/* edmchart 날짜선택 */
function dateSelect(){
	$('.edmchart_date').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());
	  
	    var $list = $('<ul />', {
	        'class': 'select-options'
	    }).insertAfter($styledSelect);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }
	  
	    var $listItems = $list.children('li');
	  
	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').each(function(){
	            $(this).removeClass('active').next('ul.select-options').hide();
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggle();
	    });
	  
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	        //console.log($this.val());
	    });
	  
	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.hide();
	    });

	});
}

/* 뉴스 */
function news(){
	$(".sub_menu .text_box").hide();
	$(".sub_menu a").click(function() {
		$(this).toggleClass("bg_off bg_on");	
		$(this).parent(".sub_menu").children(".text_box").slideToggle("300");
		$(this).find("i").toggleClass("down up");
		if($(this).hasClass("bg_on")){
			$(this).find("dd").css("color", "#fff");
		}else{
			$(this).find("dd").css("color", "#888");
		}
	});
}

/* 쿠폰 */
function coupon(){
	$(".coupon .text_box").hide();
	$(".coupon a").click(function() {
		$(this).toggleClass("bg_off bg_on");	
		$(this).parent(".coupon").children(".text_box").slideToggle("300");
	});
}

/* 토스트 */
function toast_message(sMessage){
	var container = $(document.createElement("div"));
	var message = $(document.createElement("div"));
	message.addClass("toast_area");
	message.text(sMessage);
	message.appendTo(container);
	container.addClass("pop_bg2");
	container.appendTo(document.body);

	container.delay(50).fadeIn("slow", function()
	{
		$(this).delay(1000).fadeOut("slow", function()
		{
			$(this).remove();
		});
	});
}

/* setting */
$(document).ready(function(){
	/*$(".btn-onoff button").on("swiperight", swipeR);
	$(".btn-onoff button").on("swipeleft", swipeL);
	
  var _width = $(".btn-onoff").width();
  var _widthB = $(".btn-onoff button").width();
	
  function swipeR(event){//오른쪽으로 swipe
  	$(this).removeClass("btn-on").addClass("btn-off").val("off");
  	$(this).animate({"left": _width - _widthB + "px"}, "swing");
  }
  
  function swipeL(event){//왼쪽으로 swipe
		$(this).removeClass("btn-off").addClass("btn-on").val("on");
		$(this).animate({"left": 0 + "px"}, "swing");
  }
  
  $(".btn-onoff").click(function(){//toggle
    if($("button", this).hasClass("btn-on")){
      $("button",this).removeClass("btn-on").addClass("btn-off").val("off");
      $("button",this).animate({"left": _width - _widthB + "px"}, "swing"); 
      document.getElementById("button").innerHTML = "on";
    }else{
      $("button",this).removeClass("btn-off").addClass("btn-on").val("on");
      $("button",this).animate({"left": 0 + "px"}, "swing");
      document.getElementById("button").innerHTML = "off";
    }
  });*/
});