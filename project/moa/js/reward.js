(function($) {
    $(function(){ 
        //보상내역 불러오기
        var goals=getGoals();
        for (const i in goals) {
            if(goals[i].success && (goals[i].rewardDel==false)){
                $('.reward-list').append(`
                    <label><input type="checkbox" name="reward-list" data-key="${goals[i].key}"><i></i><span>${goals[i].reward}</span></label>
                `);
            }
        }

        if($('.reward-list label').length==0){
            $('.reward-list').append('<p class="text-center">보상이 없습니다.</p>');                     
        }

        //사용한 보상 체크
        $('[name=reward-list]').each(function(i){
            var key=$(this).data('key');                                                            
            goals.forEach((obj,i) => {
                if(obj.key==key){
                    if(goals[i].rewardUse){             
                        $(this).prop('checked',true);
                    }               
                }
            });
        })

        //사용여부 
        $('[name=reward-list]').change(function(){
            var goals=getGoals();
            $('[name=reward-list]').each(function(i){
                var key=$(this).data('key');                                                            
                goals.forEach((obj,i) => {
                    if(obj.key==key){
                        if($(this).is(':checked')){
                            goals[i].rewardUse=true;                            
                        }else{
                            goals[i].rewardUse=false;
                        }
                    }
                });
            })
            setGoals(goals)
        })

        //보상삭제 팝업 
        $('#btn-reward-delete').on('click',function(e){   
            var checkCount=0;
            $('[name=reward-list]').each(function(i){
                if($(this).is(':checked')){
                    checkCount++;
                }
            })   
            if(checkCount==0){
                fnAlert('삭제할 보상을 선택하세요.');
            }else{
                $('.popup-reward, .popup-bg').show();    
            }   
        })
        $('.popup-reward .btn-normal').on('click',function(e){           
            $('.popup-reward, .popup-bg').hide();                     
        })

        //보상 선택 삭제 
        $('.popup-reward .btn-primary').on('click',function(e){    
            var goals=getGoals();
            $('[name=reward-list]').each(function(i){
                if($(this).is(':checked')){
                    var key=$(this).data('key');
                    goals.forEach((obj,i) => {
                        if(obj.key==key){
                            goals[i].rewardDel=true;                            
                        }
                    });                        
                    $(this).parent().remove();
                }
            })  
            setGoals(goals)                                              
            $('.popup-reward, .popup-bg').hide();    
            if($('.reward-list label').length==0){
                $('.reward-list').append('<p class="text-center">보상이 없습니다.</p>');                     
            }
        })
        
    })    
}(jQuery));