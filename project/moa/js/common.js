(function($) {
    $(function(){
        // form
        $('input[type=text]').on({
            focusin:function(){
                $(this).prev().addClass('focus');
            },
            focusout:function(){            
                if($(this).val()==''){
                    $(this).prev().removeClass('focus');
                }
            }
        })

        $('input[type=text]').each(function(){
            if($(this).val()!=''){
                $(this).prev().addClass('focus');
            }
        })     
    })
})(jQuery);

// 입력창 필터
(function($) {
    $.fn.inputFilter = function(inputFilter) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    };
}(jQuery));

// 아코디언
function fnAccordion(){
    $('.accordion').on('click','a',function(e){  
        e.preventDefault();            
        if($(this).hasClass('active')){
            $('.accordion a').removeClass('active');
            $(this).removeClass('active');
        }else{
            $('.accordion a').removeClass('active');
            $(this).addClass('active');
        }            
        $('.accordion .content').slideUp();
        if($(this).next().css('display')=='none'){
            $(this).next().slideDown();
        }
    })
}

//알림 메세지창
function fnAlert(msg){
    $('body').append('<div class="alert"><span>'+msg+'</span></div>');
    setTimeout(function(){$('.alert').fadeOut();},1500);
}

//swipe 리스트 삭제
function fnListDel(){
    $('.list-del li').touch({
        trackDocument: false,
        trackDocumentNormalize: false,
        preventDefault: {   
            swipe: false,
            tap: false
        }
    }).on('swipeRight',function(e, o) {
        $('.list-del li').removeClass();
    }).on('swipeLeft',function(e, o) {            
        $('.list-del li').removeClass();
        $(this).removeClass().addClass('remove left');
    })
}

//모아 애니메이션
function fnMoaAni(){
    $('.moa').show().addClass('ani-moa-up');
    setTimeout(function(){
        $('.moa .water').addClass('ani-scale');
        $('.heart1, heart2').addClass('ani-opacity');
    },2000)

    setTimeout(function(){
        $('.moa').removeClass('ani-moa-up');
        $('.moa .water').removeClass('ani-scale');
        $('.heart1, heart2').removeClass('ani-opacity');
    },5000)
}

function fnMoaAniSuccess(mode){
    if(mode=='success'){
        $('.moa').show().addClass('ani-moa-up');
        setTimeout(function(){
            $('.moa .water').addClass('ani-scale');
            $('.heart1, heart2').addClass('ani-opacity');
        },2000)
    }else if(mode=='fail'){
        $('.moa').show().addClass('ani-moa-up');
        $('.moa .mouth2, .fail-msg').show();  
        $('.moa .mouth1, .success-msg').hide();        
    }else{
        $('.moa').removeClass('ani-moa-up');
        setTimeout(function(){
            $('.moa .water').removeClass('ani-scale');
            $('.heart1, heart2').removeClass('ani-opacity');
        },2000)
    }
}

function zero(num){
    if(num<10){num='0'+num;}
    return num;
}

//목표날짜구하기
function fnGoalDay(day) {
    var date = new Date();
    var today = date.getDate();
    date.setDate(today + day-1)
    return date.getFullYear()+'.'+zero((date.getMonth()+1))+'.'+zero(date.getDate());
}

//오늘날짜 구하기
function fnToday(){
    var now=new Date();
    var date=now.getFullYear()+'.'+zero((now.getMonth()+1))+'.'+zero(now.getDate());
    return date+' '+new Date().toTimeString().substring(0, 8);
}

//몇일째인지 구하기
function fnNowDay(startDay){
    var today = new Date(new Date().toLocaleDateString()+' 00:00:00');
    var startDay = new Date(startDay+' 00:00:00');
    //밀리세컨*초*분*시
    day = (today.getTime() - startDay.getTime()) / (1000*60*60*24); 
    day = day+1
    return day;
}

//날짜 갱신
function fnUpdateDay(){
    var goals=getGoals();
    goals.forEach(obj => {        
        var nowDay=fnNowDay(obj.date.substring(0,10));
        if(obj.today!='종료'){
            if(nowDay>obj.totalDay){
                obj.today='종료';    
            }else{
                obj.today=nowDay;
            }
        }
    });    
    setGoals(goals);
}

//데이터 획득 
function getGoals(){         
    return JSON.parse(localStorage.getItem('goals'));
}

//데이터 저장
function setGoals(goals){
    localStorage.setItem('goals',JSON.stringify(goals));            
}

//해당 목표만 가져오기
function getGoal(key){
    var goals=getGoals();
    var goal;
    goals.forEach(obj => {
        if(obj.key==key){
            goal=obj;     
        }
    });
    return goal;
}

//해당 목표만 수정하기 
function setGoal(key, goal){
    var goals=getGoals();
    goals.forEach((obj,i) => {
        if(obj.key==key){
            goals[i]=goal;     
        }
    });
    localStorage.setItem('goals',JSON.stringify(goals));
}

//url 파라미터 값 가져오기 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
