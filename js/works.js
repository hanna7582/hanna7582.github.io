
$(function(){
  let worksData;
  let itemIndex;

  $.ajax({
    url:"js/data.json",
    success:function(data){
      worksData=data;
      data.forEach((item, i) => {
        $('#works .filter').append(`
          <div class="col-sm-6 col-md-4 col-lg-3 item" data-category="${item.category}" data-index="${i}">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <span class="title">${item.title}</span>
                  <span class="label label-${item.category} pull-right">${item.category}</span>
                </h4>
              </div>
              <div class="panel-body">
                <img src="${item.img[0]}" alt="" class="img-responsive">
                <div class="box">
                  <a href="#" class="glyphicon glyphicon-search">
                    <span class="sr-only">자세히보기</span>
                  </a>
                </div>
              </div>
              <div class="panel-footer">
                ${item.description}
              </div>
            </div>  
          </div>
        `);
      })
    }
  })

  //모달
  $('#works').on('click', '.item a', function(event){
    $grid.isotope();
    event.preventDefault();
    itemIndex=$(this).parents('.item').attr('data-index');
    var title=worksData[itemIndex].title;
    $('#modal h4').text(title);
    $('#modal .swiper-wrapper').empty();
    for(const i in worksData[itemIndex].img){
      $('#modal .swiper-wrapper').append(`
        <div class="swiper-slide"><img src="${worksData[itemIndex].img[i]}" alt="" class="img-responsive"></div>
      `);
    };
    
    $('.modal-footer button').show();
    
    for(const key in worksData[itemIndex].url){
      if(worksData[itemIndex].url[key]==''){
        $(`.modal-footer button.${key}`).hide();
      }else{
        $(`.modal-footer button.${key}`).attr('onclick',`window.open('${worksData[itemIndex].url[key]}')`)
      }
    }
    $('#modal').modal();
  })

  $('#modal').on({
    'show.bs.modal':function(){
      $('#modal .modal-body').outerHeight($(window).innerHeight()-modal);
    },
    'shown.bs.modal':function(){
      modalSwiper.slideTo(0, 0, false);
      modalSwiper.update();
    },
    'hidden.bs.modal':function(){
      $('#modal .modal-body').outerHeight('');
    }
  })

  //modal Swiper
  var modalSwiper = new Swiper('#modal .swiper-container', {
    pagination: {
      el: '#modal .swiper-pagination',
      clickable: true,
    },
  });

  $(window).resize(function(){
    modalSwiper.update();
    $('#modal .modal-body').outerHeight($(window).innerHeight()-modal);
  })
})
