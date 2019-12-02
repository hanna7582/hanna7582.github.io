(function($) {
    //typing  
    var swiperIndex=0;  
    var textArrayIndex=0;
    var textIndex=0;
    var speed=100;    
    function fnTyping(){
        var user=localStorage.getItem('user');
        var textArray=[
            [
                `안녕하세요. ${user}님!<br>저는 모아라고 해요.<br>`,
                `모아는 목표달성과<br>의지를 키워주는 앱입니다.`
            ],
            [
                `[사용방법1]<br>만들고 싶은 목표와 받고싶은 보상을 등록 후<br>달성기준에 따라 스템프를 찍거나<br>직접 입력해서 목표달성을 해요.`,               
                `[사용방법2]<br>보상은 목표를 80%이상 달성하면 받을 수 있고<br>실패시 같은 내용으로 다시 도전할 수 있어요.`
            ],
            [                
                `[주요기능]<br>테마변경<br>검색어 자동완성<br>필터링 및 순서정렬<br>목표/보상내역보기<br>목표등록/수정/삭제<br>데이터 백업`               
            ],
            [
                `저는 ${user} 님이<br>지정된 목표를 달성할 때마다 나타나서<br>열심히 응원할께요.`,
                `그럼 저와 함께 목표를 달성하러 가볼까요?`
            ]
        ];
        var text=textArray[swiperIndex][textArrayIndex];
        // console.log(text);
        if(textIndex==text.length){
            //글자의 길이와 같아지면 다시 0번째부터 시작
            setTimeout(function(){
                textIndex=0;
                //다음 문구로 이동
                textArrayIndex++;
                if(textArrayIndex==textArray[swiperIndex].length){
                    clearInterval(start);                
                }
            },100);
        }
        // console.log(text);
        
        appendText=text.substring(0, textIndex++);
        //br태그를 시작하는 <가 아닐때만 붙이기
        if(appendText.charAt(appendText.length-1)!='<'){
            $('.typing').html(appendText);
        }
    }

    function fnSlideStart(){
        $('.introduce').hide();                            
        $('.use').show();
        $('.moa').show();   
        $('.moa').addClass('ani-moa-up');
        setTimeout(function(){
            $('.swiper-pagination').show();
        },2000)                             
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
            on:{
                'slideChange':function () {
                    // console.log('slide changed',swiper.activeIndex);
                    $('.typing').empty();
                    swiperIndex=swiper.activeIndex;
                    clearInterval(start);  
                    textArrayIndex=0;
                    textIndex=0;
                    start=setInterval(fnTyping,speed);
                }
            }
        });
        setTimeout(function(){
            start=setInterval(fnTyping,speed);                                
            $('.bottom-message').show();
        },2000); 
    }

    $(function(){    
        
        $('#user').val(localStorage.getItem('user'));
        if($('#user').val()!=''){
            $('.introduce button').addClass('on');
            $('#user').focus();
        }                

        $('.introduce button').click(function(){
            if($('#user').val()==''){
                fnAlert('이름을 입력하세요.');                   
                $('#user').focus();
            }else{
                if(localStorage.getItem('user')==undefined){
                    $('.introduce').animate({
                        left:'-100%'
                    },1000,function(){
                        localStorage.setItem('user',$('#user').val());
                        fnSlideStart();                                          
                    });
                }
                if(localStorage.getItem('user-change')){                                                    
                    localStorage.setItem('user',$('#user').val());
                    fnAlert('변경되었습니다.');
                    setTimeout(function(){location.href="main.html"},2000);
                }
            }
        })

        if(localStorage.getItem('user')==undefined || localStorage.getItem('user-change')=="true"){
            // console.log('처음접속, 이름바꾸기')
            $('#user').keyup(function(){
                if($('#user').val()!=''){
                    $('.introduce button').addClass('on');
                }else{
                    $('.introduce button').removeClass('on');
                }
            }) 
        }else if(localStorage.getItem('introduce')=="true"){
            // console.log('소개화면')
            fnSlideStart();
        }

    })     
})(jQuery);
