(function($) {
    $(function(){        
        fnUpdateDay();

        localStorage.setItem('user-change',false);
        localStorage.setItem('introduce',false);
        
        if(localStorage.getItem('description')==null){
            $('.popup-explanation').show();
        }

        //테마적용
        if(localStorage.getItem('view')=='list'){
            $('#display-check').prop('checked',false);
            $('.card-view').hide();
            $('.list-view').show();
        }else{
            $('#display-check').prop('checked',true);
            $('.list-view').hide();
            $('.card-view').show();
        }

        if(localStorage.getItem('color')=='white'){
            $('#color-check').prop('checked',false);
            $('body').removeClass('blue-theme');
            $('#logo').attr('fill','#5CB5E3');
        }else{
            $('#color-check').prop('checked',true);
            $('body').addClass('blue-theme');
            $('#logo').attr('fill','#fff');            
        }

        $(window).resize(function(){
            var screenH=$(window).height();
            $('section').height(screenH-100);
        }).resize();

        //menu팝업 popup (jquery.touch)      
        $('#btn-menu').on('click',function(){
            $('body').addClass('on');
            $('.popup-bg').show();
        })         
        $('.popup-bg').touch({
            trackDocument: true,
            trackDocumentNormalize: true,
            preventDefault: {             
                swipe: true
            }
        }).on('swipeLeft',function(e, o) {
            $('body').removeClass('on')
            $(this).hide();
        }).on('tap',function(e, o) {
            $('body').removeClass('on')
            $(this).hide();
            $('[class^=popup]').hide();
            //입력폼 초기화
            $('#form-new')[0].reset();
        })      

        //이름변경
        $('#link-name-change').on('click',function(e){
            e.preventDefault();
            localStorage.setItem('user-change',true);            
            location.href='introduce.html';
        })         
        $('.user-info .name b').text(localStorage.getItem('user'));

        //테마변경
        $('.theme input[type=checkbox]').change(function(){            
            $(this).siblings('span').removeClass('on');
            if($(this).is(":checked")){
                $(this).siblings('span:last-child').addClass('on');
                if($(this).attr('id')=='display-check'){
                    // console.log('카드뷰')
                    $('.list-view').hide();
                    $('.card-view').show();
                    localStorage.setItem('view','card');
                }else{
                    // console.log('블루')
                    $('body').addClass('blue-theme');
                    $('#logo').attr('fill','#fff');
                    localStorage.setItem('color','blue');
                }
            }else{
                $(this).siblings('span:first-child').addClass('on');
                if($(this).attr('id')=='display-check'){
                    // console.log('리스트뷰')
                    $('.card-view').hide();
                    $('.list-view').show();
                    localStorage.setItem('view','list');
                }else{
                    // console.log('화이트')
                    $('body').removeClass('blue-theme');
                    $('#logo').attr('fill','#5CB5E3');
                    localStorage.setItem('color','white');
                }
            }
            listUpdate();
        })

        //초기화
        $('#link-reset').on('click',function(e){ 
            e.preventDefault();                                 
            $('.popup-reset').show();         
            $('body').removeClass('on');       
        })
        $('.popup-reset .btn-primary').on('click',function(e){           
            localStorage.removeItem('user');
            localStorage.removeItem('user-change');
            localStorage.removeItem('introduce');
            localStorage.removeItem('favorite');
            location.href="index.html";   
        })
        $('.btn-normal').on('click',function(e){           
            $('[class^=popup]').hide();                 
        })

        //백업
        $('#link-backup').on('click',function(e){  
            e.preventDefault();                                 
            $('.popup-backup').show();         
            $('body').removeClass('on');
        })

        $('.popup-backup .btn-primary').on('click',function(){
            var goals=JSON.parse(localStorage.getItem('goals'));
            var goalsData = JSON.stringify(goals, null, "\t");
            var dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(goalsData);
            $(this).attr({
                'href':dataUri,
                'download':`moa_${fnToday()}.json`
            });
            $('[class^=popup]').hide(); 
        })

        //데이터 복구 
        $('#link-recovery').on('click',function(e){  
            e.preventDefault();                                 
            $('.popup-recovery').show();         
            $('body').removeClass('on');
            $('#backup').val('');
        })

        //파일탐색기 열기 
        $('#btn-file').click(function(){
            $('[for=jsonfile]').click();
        })
        $('[type=file]').change(function(){
            //파일이름 얻기
            var fileName=$(this)[0].files[0].name;
            $('.filename').text(fileName);                
        })

        $('.popup-recovery .btn-primary').on('click',function(){
            var input, file, fr;
            if (typeof window.FileReader !== 'function') {
                fnAlert("이 브라우저는 파일 API가 지원되지 않습니다.");
            return;
            }
            input = $('#jsonfile')[0];
            if (!input) {
                fnAlert("파일을 선택하기위한 요소가 없습니다.");
            }
            else if (!input.files) {
                fnAlert("이 브라우저는 files속성을 지원하지 않습니다.");
            }
            else if (!input.files[0]) {
                fnAlert('파일을 선택하세요.');
            }
            else {
                file = input.files[0];
                fr = new FileReader();
                fr.onload = receivedJSON;
                fr.readAsText(file);
            }
            function receivedJSON(e) {
                let goals = e.target.result;      
                localStorage.setItem('goals',goals);      
                fnAlert('복구된 데이터를 불러옵니다.');
                setTimeout(listUpdate,1000);
                $('[class^=popup]').hide(); 
            }
        })

        //간단설명팝업
        $('#link-explanation').on('click',function(e){ 
            e.preventDefault();                                 
            $('.popup-explanation').show();     
            $('.popup-bg').hide();    
            $('body').removeClass('on');       
        })
        $('.popup-explanation').on('click',function(e){           
            $('.popup-explanation').hide();   
            localStorage.setItem('description','ok');                  
        })
        
        $('#btn-favorite').on('click',function(){                             
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                // console.log('관심필터off');
                $('.sortable li').show();
                localStorage.setItem('favorite',false);
            }else{
                $(this).addClass('on');                
                // console.log('관심필터on');
                $('.sortable li').hide();
                $('.sortable .btn-favorite').each(function(){
                    if($(this).hasClass('on')){
                        $(this).parents('li').show();
                    }
                })    
                localStorage.setItem('favorite',true);  
            }
        })                

        //리스트별 관심목표체크 
        $('.sortable').on('click','.btn-favorite', function(e){ 
            $(this).toggleClass('on');  
            var goals=getGoals();
            var key=$(this).parents('li').data('key');
            goals.forEach((obj,i) => {
                if(obj.key==key){
                    if($(this).hasClass('on')){
                        goals[i].like='on';
                    }else{
                        goals[i].like='';
                    }     
                }
            });                          
            setGoals(goals);            
            return false;
        })         

        //리스트 삭제 (jquery.touch)        
        function listDel(){        
            $('.sortable li').touch({
                trackDocument: false,
                trackDocumentNormalize: false,
                preventDefault: {   
                    swipe: false,
                    tap: false
                }
            }).on('swipeRight',function(e, o) {
                $('.sortable li').removeClass();
            }).on('swipeLeft',function(e, o) {            
                $('.sortable li').removeClass();
                $(this).removeClass().addClass('remove left');
            })
        }
        $('.sortable').on('click','.btn-del',function(){
            var goals=getGoals();
            var key=$(this).parents('li').data('key');            
            goals.forEach((obj,i)=>{
                if(obj.key==key){
                    goals.splice(i,1);
                }
            });
            setGoals(goals);
            $(this).parent('li').remove();
            listUpdate();
        })

        //정보보기 
        $('.sortable').on('click','.info',function(){           
            $(this).children('div').toggleClass('on')
            return false;
        })

        // 검색팝업
        var searchWords=[];
        $('#btn-search').on('click',function(){    
            $('.view article').not(':hidden').find('li').each(function(){
                searchWords.push($(this).find('strong').text());
            });
            console.log(searchWords);
            //자동완성
            $('.popup-search input').autocomplete({
                source: searchWords
            });
            $('.popup-search, .popup-bg').show();            
        })

        

        //검색
        $('.popup-search button').on('click',function(){  
            var search=$('.popup-search input').val();
            var qsRegex=new RegExp(search, 'gi');
            $('.sortable li').hide();
            $('.sortable li').filter(function(){                                          
                return $(this).find('strong').text().match(qsRegex);                                    
            }).fadeIn();
            var stateTotal=$('.view article').not(':hidden').find('li').not(':hidden').length;
            var stateEnd=0;
            $('.view article').not(':hidden').find('li').not(':hidden').each(function(){
                if($(this).find('.day b').text()=='종료'){
                    stateEnd++;
                }
            })
            stateIng=stateTotal-stateEnd;
            $('.count .total b').text(stateTotal);
            $('.count .now b').text(stateIng);
            $('.count .finish b').text(stateEnd);
            $('.popup-search input').val('').focus();
            
            if(stateTotal==0){
                fnAlert('검색된 데이터가 없어요.');
            }
        })
        
        // 필터팝업
        $('#btn-filter').on('click',function(){    
            $('.popup-filter').show();
        })
        $('[name=filter]').change(function(){   
            $('.popup-filter').hide();
            $('.sortable li').show();
            if($(this).val()=='ing'){
                $('.sortable li').each(function(){                    
                    if($(this).find('.day b').text()=='종료'){
                        console.log($(this).find('.day b').text());
                        $(this).hide();
                    }                 
                })  
            }else if($(this).val()=='end'){ 
                $('.sortable li').each(function(){                                                                     
                    if($(this).find('.day b').text()!='종료'){
                        $(this).hide();
                    }                 
                })
            }                        
        })  

        //순서변경버튼 (jquery.ui.touch-punch)  http://touchpunch.furf.com/  
        $('#btn-sort').on('click',function(){            
            if($(this).hasClass('on')){    
                $(this).removeClass('on');                                            
                $( ".sortable" ).sortable("destroy");   
                listDel();                             
            }else{    
                $('.sortable li').removeClass();            
                $(this).addClass('on');
                $('.sortable li').off();
                if($('#display-check').is(":checked")){                    
                    // console.log('카드뷰')
                    $( ".sortable" ).sortable({
                        update: sortUpdate
                    });     
                }else{
                    // console.log('리스트뷰')
                    $( ".sortable" ).sortable({
                        axis: 'y',
                        update: sortUpdate
                    }); 
                }
            }
            //정렬 후 데이터 갱신
            var goals=getGoals();
            function sortUpdate(){
                var sortGoals=[];
                $('article').each(function(){
                    if(!$(this).is(':hidden')){
                        $(this).find('li').each(function(i){
                            var key=$(this).data('key');
                            goals.forEach((obj,objIndex) => {
                                if(obj.key==key){
                                    sortGoals[i]=goals[objIndex];                                                                  
                                }
                            });                                                                                  
                        })                                                
                        setGoals(sortGoals);                        
                    }
                })              
            }
        })
        
        //순서변경 버튼이 아닌 다른 버튼을 누르면 정렬기능 꺼지기
        $('[id*=btn]').on('click',function(){
            if($(this).attr('id')!='btn-sort' && $('#btn-sort').hasClass('on')){
                listDel();
                $('#btn-sort').removeClass('on');                   
                $( ".sortable" ).sortable("destroy");                                          
            }
        }) 

        // 위로가기
        $('.list-view, .card-view').scroll(function(){
            var listScrollTop=$(this).scrollTop();
            if(listScrollTop>100){
                $('#btn-up').fadeIn();                
            }else{
                $('#btn-up').fadeOut();
            }
        }).scroll();
        $('#btn-up').on('click',function(){    
           $('.list-view, .card-view').animate({
               scrollTop:0
           })                 
        })
        
        // 등록팝업
        $('#btn-new').on('click',function(){    
            $('.popup-new, .popup-bg').show();                    
        })

        $('[name=type3-val2]').inputFilter(function(value) {return /^-?\d*$/.test(value)});
        // $('[name=type3-val3]').inputFilter(function(value) {return /^[a-zA-Z가-힣]*$/i.test(value)});
        $('.popup-new button').on('click',function(){                
            if($(this).hasClass('btn-submit')){
                if($('#goal-name').val()==''){
                    fnAlert('목표를 작성하세요.');
                    $('#goal-name').focus();
                }else if($('#reward-name').val()==''){
                    fnAlert('보상을 작성하세요.');
                    $('#reward-name').focus();
                }else{
                    var name=$('#goal-name').val();
                    var reward=$('#reward-name').val();
                    var type=$('input[name="goal-type"]:checked').val();
                    var criteria=[];
                    var newGoal={};      
                    newGoal.achieves=[];                          
                    if(type=='type1'){
                        criteria[0]=parseInt($('[name=type1-val1]').val());
                        criteria[1]=parseInt($('[name=type1-val2]').val());
                        newGoal.count=criteria[1];                        
                        for(var i=0; i<criteria[0]*criteria[1]; i++){
                            newGoal.achieves[i]={"stamp":false, "date":""};
                        }      
                    }else if(type=='type2'){
                        criteria[0]=parseInt($('[name=type2-val1]').val());
                        criteria[1]=parseInt($('[name=type2-val2]').val());
                        newGoal.count=1; 
                        for(var i=0; i<criteria[0]; i++){
                            newGoal.achieves[i]={"stamp":false, "date":""};
                        }  
                    }else{
                        if($('[name=type3-val2]').val()==''){
                            fnAlert('수량을 작성하세요.');
                            $('[name=type3-val2]').focus();
                        }else if($('[name=type3-val3]').val()==''){
                            fnAlert('단위를 작성하세요.');
                            $('[name=type3-val3]').focus();
                        }
                        
                        criteria[0]=parseInt($('[name=type3-val1]').val());
                        criteria[1]=parseInt($('[name=type3-val2]').val());
                        criteria[2]=$('[name=type3-val3]').val();
                        newGoal.count=0;
                        newGoal.achieves=[];
                    }
                    // console.log(name, reward, type, criteria); 

                    //key값 중복안되게 가장 높은 값 구해서 +1
                    var keys=[];
                    getGoals().forEach(obj => {
                        keys.push(obj.key);
                    });
                    if(keys.length!=0){
                        newGoal.key=Math.max(...keys)+1;
                    }else{
                        newGoal.key=1;
                    }                
                    newGoal.name=name;
                    newGoal.reward=reward;
                    newGoal.rewardUse=false;
                    newGoal.rewardDel=false;
                    newGoal.type=type;          
                    newGoal.date=fnGoalDay(1)+'-'+fnGoalDay(criteria[0]);
                    newGoal.criteria=criteria;
                    newGoal.percent=0;
                    newGoal.totalDay=criteria[0];
                    newGoal.today=1;
                    newGoal.like="";
                    newGoal.state="";
                    newGoal.success=false;
                    if($('#goal-name, #reward-name').val()){
                        // console.log('목표, 보상 빈값아님');
                        if(type!='type3' || (type=='type3' && $('[name=type3-val2]').val() && $('[name=type3-val3]').val())){
                            // console.log('통과');
                            var goals=getGoals();
                            goals.push(newGoal);
                            setGoals(goals)                
                            listUpdate();
                            $('[class^=popup-]').hide();                
                            $('#form-new')[0].reset();     
                            $('.text-label').removeClass('focus');
                            $('.select-group [class*=type]').hide();            
                            $('.select-group > div').eq(0).show();
                        }
                    }
                }
            }else{
                $('[class^=popup-]').hide();                
                $('#form-new')[0].reset();     
                $('.text-label').removeClass('focus');
                $('.select-group [class*=type]').hide();            
                $('.select-group > div').eq(0).show();
            } 
        })
        $('[name=goal-type]').change(function(){
            var typeIndex=$('[name=goal-type]:checked').index('[name=goal-type]');
            $('.select-group [class*=type]').hide();
            $('.select-group > div').eq(typeIndex).show();
        }) 
        
        //데이터 갱신
        listUpdate();
        function listUpdate(){
            var goals=getGoals(); 
            // console.log(goals);
                                        
            var stateTotal=goals.length;
            var stateEnd=0;
            var stateIng=0;
            $('.sortable').empty();
            goals.forEach((obj, i) => {
                if(obj.state=='end'){stateEnd++;}              
                $('.card-view .sortable').append(`
                    <li data-key="${obj.key}">                    
                        <a href="detail.html?key=${obj.key}" class="wrap ${obj.type}">
                            <strong>${obj.name}</strong>
                            <button class="btn-favorite material-icons ${obj.like}">favorite</button>                            
                            <div class="info">
                                <div class="percent on">
                                    <b>${obj.percent}</b><span>%</span>
                                </div>
                                <div class="day">
                                    <b>${obj.today}</b><span>/${obj.totalDay}DAY</span>
                                </div>     
                            </div>
                        </a>  
                        <button class="material-icons btn-del">delete</button>                  
                    </li>
                `)
                
                $('.list-view .sortable').append(`
                    <li data-key="${obj.key}">                    
                        <a href="detail.html?key=${obj.key}" class="wrap ${obj.type}">
                            <strong>${obj.name}</strong>
                            <button class="btn-favorite material-icons ${obj.like}">favorite</button>
                            <span class="badge"><b>${obj.count}</b>회 남음</span>
                            <div class="info">
                                <div class="percent on">
                                    <b>${obj.percent}%</b><span>달성</span>
                                </div>
                                <div class="day">
                                    <b>${obj.today}</b><span>/${obj.totalDay}DAY</span>
                                </div>     
                            </div>
                            <div class="progress" data-percent="${obj.percent}">
                                <span class="bar"></span>
                            </div>
                        </a>  
                        <button class="material-icons btn-del">delete</button>                  
                    </li>
                `)   

                if(obj['today']=='종료'){ 
                    $('.sortable').each(function(){
                        $(this).find('li').eq(i).find('.badge').empty();
                    })                                           
                }
                
                if(obj['type']=='type3'){       
                    $('.sortable').each(function(){              
                        achieve=obj.criteria[1]-obj.count;
                        if(!Number.isInteger(achieve)){
                            achieve=achieve.toFixed(1)
                        }      
                        $(this).find('li').eq(i).find('.badge').html(`<b>${achieve}</b>/${obj.criteria[1]}${obj.criteria[2]}`);
                    })
                }  


            });

            //카운트
            stateIng=stateTotal-stateEnd;
            $('.count .total b').text(stateTotal);
            $('.count .now b').text(stateIng);
            $('.count .finish b').text(stateEnd);
        
            //프로그레스
            $('.progress').each(function(){
                var percent=$(this).data('percent');
                $(this).find('.bar').animate({
                    width:percent+'%'
                },{
                    duration:2000,
                    step:function(now){
                        var data=Math.round(now);
                        $(this).parents('li').find('.percent b').text(data+'%');                          
                    }
                })
            })

            //관심목표필터메뉴        
            if(localStorage.getItem('favorite')=='true'){            
                $('#btn-favorite').addClass('on');    
                $('.sortable li').hide();
                $('.sortable .btn-favorite').each(function(){
                    if($(this).hasClass('on')){
                        $(this).parents('li').show();
                    }
                })      
            }else{
                $('#btn-favorite').removeClass('on');
            }
            //리스트삭제 갱신
            listDel();
        }
    })
})(jQuery)