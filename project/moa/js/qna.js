(function($) {
    $(function(){
        //아코디언
        fnAccordion();

        //인트로 화면으로 가기
        $('#link-introduce').on('click',function(e){   
            e.preventDefault();        
            localStorage.setItem('introduce',true);            
            location.href='introduce.html';
        })        
    })    

}(jQuery));