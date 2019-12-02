$(function(){
  //text overflow
  $('td.text-overflow').hover(function(){
    var p=$(this).text();
    $(this).attr('title',p);
  },function(){
    $(this).attr('title','');
  })

  //file upload
  $('.file-upload input[type=file]').on('change',function(){
     $(this).parents('.file-upload').find('button').remove();
     file = $(this).prop("files")[0];
     $(this).parents('.file-upload').find('.file-name').text(file.name).attr('title',file.name);
     $(this).parents('.file-upload').append('<button class="btn btn-danger"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i><span class="skip">삭제</span></button>');
  });

  //file upload delete
  $('.file-upload').on('click','button', function(){
    $selector=$(this).parents('.file-upload');
    $selector.find('.file-name').text('선택된 파일 없음').attr('title','');
    $selector.find('input').val('');
    $(this).remove();
  });

  //image-upload
  $('.image-upload input[type=file]').on('change',function(){
     file = $(this).prop("files")[0];
     $(this).parents('.image-upload').next().append(
         '<li>'
         +'<div class="wrap">'
         +'<div class="img-wrap"><img src="" alt=""></div>'
         +'<span class="img-name">'+file.name+'</span>'
         +'<button><i class="glyphicon glyphicon-remove"></i></button>'
         +'</div>'
         +'</li>'
     );
     var reader = new FileReader();
     reader.onload = function (e) {
       $('.image-upload input[type=file]').parents('.image-upload').next().find('li:last-child img').attr({
         'src': e.target.result,
         alt:file.name
       });
     }
     reader.readAsDataURL(file);
  });

  $('.image-sort').on('click','button', function(){
    $selector=$(this).parents('li');
    $('.image-upload').find('.image-upload input[type=file]').val('');
    $selector.remove();
    $(this).remove();
  });

  //email
  $('#selectEmail').change(function(){
    $("#selectEmail option:selected").each(function () {
      if($(this).val()== '1'){
        $("#email2").val('').attr("disabled",false);
      }else{
        $("#email2").val($(this).text()).attr("disabled",true);
      }
    });
  });

  //modal open after
  $(".modal.scroll").on('show.bs.modal', function () {
    $(this).find('.modal-body').outerHeight($(window).innerHeight()-200);
  });

  //modal hidden
  $(".modal.scroll").on('hidden.bs.modal', function () {
    $(this).find('.modal-body').outerHeight('');
  });
})

function fn_datepicker(id){
  $(id).datepicker({
    showOn: "button",
    buttonImage: "../../images/calendar.png",
    buttonImageOnly: true,
    buttonText: "날짜 선택"
  });

  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
  });
}
