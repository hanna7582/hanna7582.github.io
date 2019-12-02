(function($) {
    $(function(){
        //아코디언
        fnAccordion();

        function fnCount(){
            var goals=getGoals();
            var stateTotal=goals.length;
            var stateEnd=0;
            var stateIng=0;
            goals.forEach((obj) => {
                if(obj.state=='end'){stateEnd++;}  
            });    
            stateIng=stateTotal-stateEnd;
            $('.count .total b').text(stateTotal);
            $('.count .now b').text(stateIng);
            $('.count .finish b').text(stateEnd);
        }

        //목표내역 불러오기
        var goals=getGoals();

        goals.forEach((obj,i) => {  
            fnCount();

            var type;//타입
            var successState='';//성공여부
            var criteria;//달성조건
            var state='';//진행상태
            var reStart='';//재도전
            if(obj.type=='type1'){
                type='횟수';
                criteria=`${obj.criteria[0]}일 동안 매일 ${obj.criteria[1]}회`;
            }else if(obj.type=='type2'){
                type='시간';
                criteria=`${obj.criteria[0]}일 동안 ${obj.criteria[1]}~${obj.criteria[1]+1}시`;
            }else if(obj.type=='type3'){
                type='수량/단위';
                criteria=`${obj.criteria[0]}일 동안 ${obj.criteria[1]}${obj.criteria[2]}`;
            }
            
            if(obj.state=='end'){
                state='<span class="badge fail">종료</span>'; reStart='<button class="material-icons btn-restart">refresh</button>'; 
                if(obj.success){successState='(성공)';}
                else{successState='(실패)';}
            }else{
                state='<span class="badge">진행</span>';
            }
            
            $('.goal-list > ul').append(`
                <li data-key="${obj.key}">
                    <a href="#">${state} ${obj.name} <i class="material-icons">keyboard_arrow_down</i></a>
                    <div class="content">
                        <ul>
                            <li><b>목표기간</b>${obj.date}(${obj.totalDay}일)</li>
                            <li><b>보상내용</b>${obj.reward}</li>
                            <li><b>달성종류</b>${type}</li>
                            <li><b>달성조건</b>${criteria}</li>
                            <li><b>달성률</b>${obj.percent}% ${successState}</li>
                        </ul>
                        ${reStart}
                    </div>
                    <button class="material-icons btn-del">delete</button>
                </li>
            `);
        })

        if($('.goal-list li').length==0){
            $('.goal-list').append('<p class="text-center">목표가 없습니다.</p>');                     
        }

        //목표내역 단일 삭제                    
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
        $('.goal-list').on('click','.btn-del',function(e){  
            var key=$(this).parents('li').data('key');
            goals.forEach((obj,i)=>{
                if(obj.key==key){
                    goals.splice(i,1);
                }
            });
            setGoals(goals);
            fnCount();
            $(this).parents('li').remove();            
            if($('.goal-list li').length==0){
                $('.goal-list').append('<p class="text-center">목표가 없습니다.</p>')
            }
        })

        //목표내역 삭제 팝업
        $('#btn-goal-delete').on('click',function(e){            
            if($('.goal-list li').length==0){
                fnAlert('삭제할 리스트가 없습니다.');
            }else{
                $('.popup-goal, .popup-bg').show();    
            }                     
        })
        //목표내역 전체 삭제
        $('.popup-goal .btn-primary').on('click',function(e){ 
            goals=[];    
            setGoals(goals);
            fnCount();
            $('.goal-list li').remove();
            $('.popup-goal, .popup-bg').hide();    
            $('.goal-list').append('<p class="text-center">목표가 없습니다.</p>');                     
        })
        $('.popup-goal .btn-normal').on('click',function(e){           
            $('.popup-goal, .popup-bg').hide();                     
        })     

        //다시 도전 팝업 
        var key;
        $('.goal-list').on('click', '.btn-restart', function(){
            $('.restart, .popup-bg').show();
            key=$(this).parents('li').data('key');
        })
        
        $('.restart button').on('click', function(){
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
                    newGoal.stamps=[];
                    for(var i=0; i<goal.criteria[0]; i++){
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
    })    

}(jQuery));