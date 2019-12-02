//로그인
$(".user").focusin(function(){
  $(".inputUserIcon").css("color", "#e74c3c");
}).focusout(function(){
  $(".inputUserIcon").css("color", "white");
});

$(".pass").focusin(function(){
  $(".inputPassIcon").css("color", "#e74c3c");
}).focusout(function(){
  $(".inputPassIcon").css("color", "white");
});

//이미지 선택
$('#image_click ul li a').click(function(){
  var img_val = $(this).text();
  var src_val = "../images/"+img_val;
  $('#image_click img').attr('src', src_val);
});

//이메일 선택
$('#select_Email').change(function(){
   $("#select_Email option:selected").each(function () {
        if($(this).val()== '1'){
             $("#email2").val('');
             $("#email2").attr("disabled",false);
        }else{ //직접입력이 아닐경우
             $("#email2").val($(this).val());
             $("#email2").attr("disabled",true);
        }
   });
});

// 파일업로드
$('.file-upload').click(function(){
  var id="#"+$(this).attr('id');//파일업로드 아이디
  var str=id.split('-');
  var input_id="#filename-"+str[1];//파일이름 아이디

  $(id).change(function() {
      var filepath = this.value;
      var m = filepath.match(/([^\/\\]+)$/);
      var filename = m[1];
      $(input_id).val(filename);
  });
});
