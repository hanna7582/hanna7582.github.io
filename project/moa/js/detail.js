(function($) {
    $(function(){  
        var key = getParameterByName('key');
        var goal=getGoal(key);
        // console.log(key);               

        //최초 데이터 갱신 
        $('.popup-message.type2 strong').text(goal.reward);//보상내용.
        var criteria;//달성조건                

        //스템프 상태를 알기위한 기준날짜
        var nowDay=fnNowDay(goal.date.substring(0,10));
        
        if(goal.type=='type1'){
            unit='회';
            criteria=`${goal.criteria[0]}일 동안 매일 ${goal.criteria[1]}회`;            
            var count=goal.criteria[1];
            $('.stamp-type').show();
            /*
                var count=2;  오늘 찍을 스템프수
                var nowDay=1; 몇일째?
                for (var i=0; i<14; i++){
                    if((nowDay-1)*count <= i && (nowDay-1)*count+count >i){
                        console.log(i);
                    }
                }
            */
            goal.achieves.forEach( (obj, i) => {                
                var classValue="stamp";                          
                //찍을 수 있는 스템프                      
                if((nowDay-1)*count <= i && (nowDay-1)*count+count >i){classValue+=" today";}                
                //날짜가 아직 안되서 찍을 수 없는 스템프
                if((nowDay-1)*count+count <=i){classValue+=" disabled";}
                //날짜가 지났는데 못찍은 스템프
                if((nowDay-1)*count > i && !obj.stamp){classValue+=" fail";}
                //날짜가 지난 스템프
                if((nowDay-1)*count > i){classValue+=" past";}
                //찍은 스템프
                if(obj.stamp){classValue+=" on ok";}                
                $('.stamp-type ul').append(`<li><button class="${classValue}"></button></li>`); 
            })
            setTimeout(fnStampAvg,0);
        }else if(goal.type=='type2'){
            unit='회';
            criteria=`${goal.criteria[0]}일 동안 ${goal.criteria[1]}~${goal.criteria[1]+1}시`;
            $('.stamp-type').show();
            goal.achieves.forEach( (obj, i) => {
                var classValue="stamp";                          
                //찍을 수 있는 스템프                      
                if(nowDay==(i+1)){
                    classValue+=" today";
                    //목표 시간보다 경과하였다면 실패
                    if(new Date().getHours() > goal.criteria[1]+1){
                        classValue+=" fail";   
                    }
                }                 
                //날짜가 아직 안되서 찍을 수 없는 스템프
                if(nowDay<(i+1)){classValue+=" disabled";}
                //날짜가 지났는데 못찍은 스템프
                if(nowDay>(i+1) && !obj.stamp){classValue+=" fail";}                
                //날짜가 지난 스템프
                if(nowDay>(i+1)){classValue+=" past";}       
                //찍은 스템프
                if(obj.stamp){classValue+=" on ok";}   
                $('.stamp-type ul').append(`<li><button class="${classValue}"></button></li>`); 
            })
            setTimeout(fnStampAvg,0);
        }else if(goal.type=='type3'){
            unit=goal.criteria[2];
            criteria=`${goal.criteria[0]}일 동안 ${goal.criteria[1]}${goal.criteria[2]}`;                    
            $('.write-type').show();
            $('.write-type .unit').text(`${goal.criteria[2]}`);
            goal.achieves.forEach( achieveObj=> {
                $('.write-list').append(`
                    <li>
                        <div><span class="date">${achieveObj.date}</span>
                            <span class="achieve">${achieveObj.achieve}</span>
                        </div>
                        <button class="material-icons">delete</button>
                    </li>
                `) 
            })
            setTimeout(fnWriteListAvg,0);
        }
        $('.detail-info').append(`
            <div class="day">
                <b>${goal.today}</b><span>/${goal.totalDay}DAY</span><small>${goal.date}</small>
            </div>
            <strong>${goal.name}</strong>
            <div class="reward"><b>보상</b>${goal.reward}</div>    
            <div class="condition">
                <span class="left">${criteria}</span>
                <span class="right"><b class="count">${goal.count}</b><b>${unit}</b>남았어요.</span>
            </div>

            <div class="progress">                                
                <span class="bar"></span>
                <span class="percent">${goal.percent}%</span>
                <span class="water"></span>
            </div>
        `)  

        // 팝업 ========================================================================================
        // 팝업닫기
        $('.popup-bg').on('click',function(){    
            $('[class*=popup]').hide();
            $('.popup-bg').hide();                   
        })

        // 수정팝업
        $('#btn-edit').on('click',function(){    
            $('.popup-new, .popup-bg').show();
            var goal=getGoal(key)
            $('.text-label').addClass('focus');
            $('#goal-name').prop('value',goal.name);
            $('#reward-name').prop('value',goal.reward);
        })
        $('.popup-new button').on('click',function(){    
            if($(this).hasClass('btn-submit')){                
                if($('#goal-name').val()!='' && $('#reward-name').val()!=''){
                    goal.name=$('#goal-name').val();
                    goal.reward=$('#reward-name').val();
                    $('.popup-message.type2 strong').text(goal.reward);//보상내용갱신
                    setGoal(key, goal);
                    $('.detail-info strong').text(goal.name);
                    $('.popup-new, .popup-bg').hide();
                }else{
                    if($('#goal-name').val()==''){
                        $('#goal-name').focus();
                    }else{
                        $('#reward-name').focus();
                    }
                    fnAlert('내용을 입력해주세요.');
                }                
            }else{
                $('.popup-new, .popup-bg').hide();
            }                                          
        })

        // 목표삭제 팝업
        $('#btn-detail-delete').on('click',function(){    
            $('.popup-message.delete, .popup-bg').show();                                       
        })
        $('.delete button').on('click',function(){   
            if($(this).hasClass('btn-normal')){
                $('.popup-message.delete, .popup-bg').hide();               
            }else{
                var goals=getGoals();
                goals.forEach((obj,i)=>{
                    if(obj.key==key){
                        goals.splice(i,1);
                    }
                });
                setGoals(goals);
               location.href="main.html"; 
            }
        })

        //목표달성 팝업
        $('.type1 button').on('click',function(){                           
            $('[class*=popup], .popup-bg').hide();                        
        })

        //스템프 찍기 취소 팝업
        $('.type4 button').on('click',function(){    
            if($(this).hasClass('btn-primary')){           
                $('.stamp-type li').eq(stampIndex).find('button').removeClass('on ok'); 
                var goals=getGoals();
                goals.forEach((obj)=>{
                    if(obj.key==key){
                        obj.achieves[stampIndex].stamp=false;
                        obj.achieves[stampIndex].date="";
                    }
                });
                setGoals(goals);
                                
                fnStampAvg();
            }
            $('[class*=popup], .popup-bg').hide();            
        })

        //보상획득/다시도전 팝업 
        $('.bottom-message button').on('click',function(){   
            $('.popup-message, .popup-bg').hide();            
            if($(this).hasClass('btn-reward')){  
                //보상획득을 누르면 더이상 수정 불가 
                var goal=getGoal(key);
                goal.success=true;
                goal.state="end";
                $('.btn-achieve, .write-type input').prop("disabled", true);
                setGoal(key, goal);
                $('.popup-message.type2, .popup-bg').show();
            }else{
                $('.popup-message.type3, .popup-bg').show();
            }
        })
        $('.popup-message.type2 button').on('click',function(){               
            if($(this).hasClass('btn-primary')){
                location.href='reward.html';
            }else{
                $('.popup-message, .popup-bg').hide();
            }
        })

        //다시도전 팝업 
        $('.popup-message.type3 button').on('click',function(){               
            if($(this).hasClass('btn-primary')){
                var goal=getGoal(key);
                var newGoal={};                                
                newGoal.type=goal.type;                
                if(newGoal.type=='type1'){
                    newGoal.count=goal.criteria[1];          
                }else if(newGoal.type=='type2'){
                    newGoal.count=1; 
                }else{
                    newGoal.count=0;
                    newGoal.achieves=[];
                }
                var keys=[];
                getGoals().forEach(obj => {
                    keys.push(obj.key);
                });
                if(keys.length!=0){
                    newGoal.key=Math.max(...keys)+1;
                }                
                newGoal.name=goal.name;
                newGoal.reward=goal.reward;
                newGoal.criteria=goal.criteria;
                newGoal.rewardUse=false;
                newGoal.rewardDel=false;
                newGoal.date=fnGoalDay(1)+'-'+fnGoalDay(goal.criteria[0]);
                newGoal.percent=0;
                newGoal.totalDay=goal.criteria[0];
                newGoal.today=1;
                newGoal.like="";
                newGoal.state="";
                newGoal.success=false;
                if(newGoal.type!='type3'){
                    newGoal.achieves=[];
                    for(var i=0; i<criteria[0]; i++){
                        newGoal.achieves[i]={"stamp":false, "date":""};
                    }
                }
                var goals=getGoals();
                goals.push(newGoal);
                setGoals(goals)                
                location.href='main.html';
            }else{
                $('.popup-message, .popup-bg').hide();
            }
        })

        //stamp-type ======================================================================
        var stampIndex=0;
        $('.stamp').on('click',function(){ 
            stampIndex=$(this).index('.stamp');
            var goals=getGoals();            
            if($(this).hasClass('disabled')){
                fnAlert('오늘은 찍을 수 없는 스템프입니다.');
            }else if($(this).hasClass('fail')){
                fnAlert('달성하지 못했어요.');
            }else if($(this).hasClass('past')){         
                goals.forEach((obj)=>{
                    if(obj.key==key){
                        $('.popup-message.type1 p').text(obj.achieves[stampIndex].date);
                    }
                });  
                $('.popup-message.type1, .popup-bg').show();
            }else if($(this).hasClass('not')){
                fnAlert('순서대로 찍으세요.');
            }else if($(this).hasClass('ok')){
                var goal=getGoal(key);
                $('.popup-message.type4 p').text(goal.achieves[stampIndex].date);
                $('.popup-message.type4, .popup-bg').show();
            }else{                  
                goals.forEach((obj)=>{
                    if(obj.key==key){
                        obj.achieves[stampIndex].stamp=true;
                        obj.achieves[stampIndex].date=fnToday();
                    }
                });
                setGoals(goals);
                var goal=getGoal(key);
                $('.popup-message.type1 p').text(goal.achieves[stampIndex].date);
                $(this).addClass('ok'); 
                $('.stamp-type li').eq(stampIndex).find('button').addClass('on');
                $('.popup-message.type1, .popup-bg').show();
                $('.popup-message.type1 .btn-normal').show();                        
                fnMoaAni();  
                fnStampAvg();                    
            }                        
        })

        function fnStampAvg(){            
            var goal=getGoal(key);
            var sum=0;//스템프합계
            var avg=0;//달성률
            var total=goal.achieves.length;

            //만약 달성한 수가 있다면 원래 값에 빼기 달성한 수가 없다면 원래값 불러와서 저장
            var count=0;
            if(goal.type=="type1"){
                count=goal.criteria[1];
            }else{
                count=1;
            }
            $('.stamp-type button').each(function(){
                if($(this).hasClass('on')){
                    sum++;//공통 합계 체크
                    if($(this).hasClass('today')){
                        count--;//type1      
                    }
                }  

                if($(this).hasClass('today')){
                    if($(this).hasClass('fail')){
                        count--;//type2                              
                    }
                }               
            })
            
            if(sum>=total){
                sum=Math.abs(total);
            }
            
            //종료되었을 때 상황 체크하기
            if(goal.today=='종료'){
                goal.state="end";                
                $('.condition .right').hide();
                setTimeout(function(){$('.bottom-message').show()},2000);
                if(parseInt(goal.percent) >= 80){
                    goal.success=true;
                    fnMoaAniSuccess('success'); 
                }else{
                    goal.success=false;
                    fnMoaAniSuccess('fail');
                    $('.btn-reward').hide();
                }
            }else{
                //날짜가 종료되지 않았지만 목표달성했을 경우
                if(goal.percent>=80){                                              
                    goal.success=true;
                    goal.state="end";                
                    $('.condition .right').hide();                                        
                    fnMoaAniSuccess('success');
                    setTimeout(function(){$('.bottom-message').show()},2000);
                    fnMoaAni();
                } 
            }            
                             
            avg=Math.ceil(sum/total*100);            
            
            $('.condition .count').text(count);                                   
            $('.progress .percent').text(avg);
            $('.progress .bar').animate({width:avg+'%'},1000)
            $('.progress .water').animate({left:avg+'%'},1000)
            $('.progress .percent').animate({percent: avg},{
                duration: 1000,
                step: function (now) {
                    $(this).text(Math.ceil(now)+'%');
                }
            })
            $('.bottom-message b').text(avg+'%'); 
            goal.count=count;//남은 수 
            goal.percent=avg;//달성률
            setGoal(key, goal);
        }    

        //write-type ======================================================================
        //숫자만 추출.replace(/[^0-9]/g,"")
        $('.btn-achieve').on('click',function(){  
            var goal=getGoal(key);           
            var num=$('.write-type input').val();
            if(num!=0){            
                $('.write-list').prepend(`
                    <li>
                        <div>
                            <span class="date">${fnToday()}</span>
                            <span class="achieve">${num+goal.criteria[2]}</span>
                        </div>
                        <button class="material-icons">delete</button>
                    </li>
                `);
                $('.write-type input').val('');

                //달성률 갱신 
                goal.achieves.unshift({date:fnToday(), achieve:num+goal.criteria[2]})                
                setGoal(key, goal);
                //평균구하기
                fnWriteListAvg();
            }
        })

        //숫자(실수)만 입력가능
        $('.write-type input').inputFilter(function(value) {return /^-?\d*[.]?\d*$/.test(value)});
        //목표 범위 초과 검사
        $('.write-type input').keyup(function(e){
            var total=Number($('.condition .count').text());
            if($.isNumeric($(this).val())){            
                if($(this).val()>total){
                   fnAlert('범위를 초과하였습니다.');
                   $(this).val(total);
                }                                    
            }
            // console.log(total, $(this).val())
        })
        
        function fnWriteListAvg(){
            var goal=getGoal(key);
            var sum=0;//합계
            var avg=0;//달성률
            var total=goal.criteria[1];//전체 수
            //달성 수
            $('.write-list .achieve').each(function(){
                var achieveNum=Number($(this).text().replace(/[^0-9.]/g,"")); 
                // console.log(achieveNum);
                sum=sum+achieveNum;                
            })
            var achieve=total-sum;//남은 수 
            if(!Number.isInteger(achieve)){//정수가 아니면
                achieve=achieve.toFixed(1);//소수점 1자리까지만 출력
            }
            // console.log(total,sum,achieve);
            
            if(goal.today=='종료'){
                goal.state="end";                
                $('.btn-achieve, .write-type input').prop("disabled", true);
                $('.condition .right').hide();
                setTimeout(function(){$('.bottom-message').show()},2000);
                if(parseInt(goal.percent) >= 80){
                    goal.success=true;
                    fnMoaAniSuccess('success'); 
                }else{
                    goal.success=false;
                    fnMoaAniSuccess('fail');
                    $('.btn-reward').hide();
                }
            }else{
                //날짜가 종료되지 않았지만 목표달성했을 경우
                if(sum>=total){
                    sum=Math.abs(total);                          
                    goal.success=true;
                    goal.state="end";   
                    goal.today="종료";               
                    $('.btn-achieve, .write-type input').prop("disabled", true);
                    $('.condition .right').hide();                                        
                    fnMoaAniSuccess('success');
                    setTimeout(function(){$('.bottom-message').show()},2000);
                }else{
                    //리스트 삭제 활성화
                    fnListDel();
                }
            }

            avg=Math.ceil(sum/total*100);                                
                      
            //프로그레스 애니메이션
            $('.condition .count').text(achieve);                                               
            $('.progress .percent').text(avg);            
            $('.progress .bar').animate({width:avg+'%'},1000)
            $('.progress .water').animate({left:avg+'%'},1000)
            $('.progress .percent').animate({percent: avg},{
                duration: 1000,
                step: function (now) {
                    $(this).text(Math.ceil(now)+'%');
                }
            })
            $('.bottom-message b').text(avg+'%'); 
            $('.total b').text(sum);  
            goal.count=achieve;//남은 수 
            goal.percent=avg;//달성률
            setGoal(key, goal);
        }

        //달성 리스트 단일 삭제
        $('.write-list').on('click','button',function(){ 
            //달성률 갱신 
            var date=$(this).parent().find('.date').text();
            var goal=getGoal(key);
            goal.achieves.forEach((obj, i) => {
                if(obj.date==date){
                    goal.achieves.splice(i, 1);    
                }                
            });     
            setGoal(key, goal);

            $(this).parents('li').remove();
            fnWriteListAvg();
        })        
       
    }) 
})(jQuery)
