/**
 * FORM 객체 유효성및 이벤트처리 관련 스크립트
 * 
 * Object       : jquery-submit.js
 * Description  : FORM 객체 유효성및 이벤트처리 관련 스크립트 
 * Author       : LaheeDad
 * Since        : 2013.9.10.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2013.9.10.     LaheeDad         최초 생성
 */


/**
 * 문자열의 왼쪽에서 count 만큼의 문자열을 반환
 * @param   count
 * @returns string
 */
String.prototype.left = function(count){
    return this.substr(0, count);
};

/**
 * 문자열의 오른쪽에서 count 만큼의 문자열을 반환
 * @param   count
 * @returns string
 */
String.prototype.right = function(count){
    return this.substr(this.length-count, count);
};


/**
 * From 유효성 확인을 위한 객체
 */
var submitUtil = {

    /**
     * 앞뒤 공백을 제거한후에 다시 Obejct에 담아준다.
     * @use submitUtil.trim(Object)
     * @param object
     */
    trim : function(object){        
        $(object).val($.trim($(object).val()));   
    },

    /**
     * 입력값이 NULL인지 체크
     * @use  submitUtil.isNull(Object); 
     * @param object
     * @returns true : null
     */
    isNull : function(object) {
        try{     
            var str = $(object).val();
            if("0" == str || "" == str || null == str || 'null' === str || str.toString().replace(/ /g,"") == ""){
                return true;
            }else{
                this.trim(object);
            }
            
            return false;
        }catch (e) {
            //return this.alertNfocus(object, '[isNull]Script Error Message :: ' + e);
            return false;
        }
    },    
    /**
     * ID 확인
     * @use  submitUtil.isID(Object); 
     * @param object
     * @returns {Boolean}
     */
    isID : function(object) {
        var pattern = /^.*(?=.{7,20})(?=.*[a-zA-Z])(?=.*[0-9]).*$/gi;
        try{
            this.trim(object);
            
            if (!pattern.test($(object).val())) {
//                return this.alertNfocus(object, '아이디는 숫자, 영문을 포함해 7자 이상 20자 이하로 입력해주세오.'); 
                toast_message(formName+ '아이디는 숫자, 영문을 포함해 7자 이상 20자 이하로 입력해주세오.');
            }else {
                return true;
            }
        }catch (e) {
//            return this.alertNfocus(object, '아이디는 숫자, 영문을 포함해 7자 이상 20자 이하로 입력해주세오.'); 
            toast_message(formName+ '아이디는 숫자, 영문을 포함해 7자 이상 20자 이하로 입력해주세오.');
        }
    },
    /**
     * 비밀번호 체크 
     * 영문 대/소문자, 특수문자, 숫자를 조합하여 최소 8자리
     * @use  submitUtil.isPassword(Object); 
     * @param object
     * @returns {Boolean}
     */
    isPassword : function(object, value, formName) {
        var pattern = /^.*(?=.{6,20})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*\(\)\-_+=]).*$/gi;
        var pattern2 = /((?=.*[a-zA-Z]{3,})|(?=.*[0-9]{3,})|(?=.*[!@#$%^&*\(\)\-_+=]{3,}))/;
        var pattern3 = /^.*(?=.{6,20})(?=.*[a-zA-Z])(?=.*[0-9]).*$/gi;
        var pattern4 = /^.*(?=.{6,20})(?=.*[a-zA-Z])|(?=.*[0-9])|(?=.*[!@#$%^&*\(\)\-_+=]).*$/gi;
        try{
            this.trim(object);
            
            var str = value;
            
            if(str == ''){
//                return this.alertNfocus(object, formName+'를 입력해 주십시오.');
            	toast_message(formName+ '를 입력해 주십시오.');
            }
            
            var patternYn = pattern4.test(str);
            
            if(patternYn){
                var strCnt = 0;
                
                for(i=0; i<str.length; i++){
                    strCnt = 0;
                    for(j=0; j < str.length; j++){
                        if(str[i] == str[j]){
                            strCnt = strCnt + 1;
                        }
                    }
                    if(strCnt > 2){
//                        return this.alertNfocus(object, formName+'는 연속된 문자,숫자를 사용할수 없습니다.');
                    	toast_message(formName+ '는 연속된 문자,숫자를 사용할수 없습니다.');
                    }else{
                        return true;
                    }
                }
                
            }else{
//                return this.alertNfocus(object, formName+'는 영문 대/소문자, 숫자, 특수문자를 조합하여 최소 8자리 이상 입력해주십시오.');
            	toast_message(formName+ '는 영문 대/소문자, 숫자, 특수문자를 조합하여 최소 6자리 이상 입력해주십시오.');
            }
        }catch (e) {
//            return this.alertNfocus(object, '[isPassword]Script Error Message :: ' + e);
        	toast_message(formName+ '[isPassword]Script Error Message ::'+3);
        }
    },
    /**
     *  E-Mail 주소 확인
     * @use  submitUtil.isEmail(Object);
     * @param object
     * @returns {Boolean}
     */
    isEmail : function(object) {
        var pattern1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
        var pattern2 = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/;
        
        try{
            this.trim(object);
            if(!pattern1.test($(object).val()) && !pattern2.test($(object).val())){
//                return this.alertNfocus(object, '올바른 이메일 주소를 입력해 주십시오.'); 
                toast_message(formName+ '올바른 이메일 주소를 입력해 주십시오.');
            }else{
                return true;
            }            
        }catch (e) {
            return this.alertNfocus(object, '[isEmail]Script Error Message :: ' + e);
            toast_message(formName+ '[isEmail]Script Error Message :: ' + e);
        }
    },
    
    /**
     * 문자열 바이트 체크
     * @use submitUtil.getByte(Object)
     * @param object
     * @returns {Number}
     */
    getByte : function(object) {    
        var str = $.trim($(object).val());
        var strByte = 0;
        
        for (var i = 0; i < str.length; i++) {
            var ch = str.charAt(i);
            if (escape(ch).length > 4) {
                strByte += 2;
            } else if (ch != '\r') {
                strByte++;
            }
        }

        return strByte;
    }
};


