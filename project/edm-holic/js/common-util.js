/**
 * Supported Browser : MSIE, Chrome, FireFox, Safari
 * 
 * Object       : common-util.js
 * Description  : 공통 Util용 스크립트 
 * Author       : LaheeDad
 * Since        : 2013.9.23.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2013.9.23.     LaheeDad         최초 생성
 */

/**
 * 앞뒤 공백 제거
 * @returns 공백이 제거된 문자열
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/gi, '');
};


/**
 * Java StartWith 구현
 * @param   시작문자(문자열)
 * @returns Boolean : 시작문자유무(true:시작문자)
 */
String.prototype.startWith = function(str){
    return this.indexOf(str) == 0;
};


/**
 * 문자열 관련
 */
var stringUtil = {
    /**
     * NULL인지 체크
     * @param str
     * @returns {Boolean} true : null
     */
    isNull : function(str)    {
        var bRtn = false;
        if (str == undefined || str == null || str == 'null' || str.toString().replace(/ /g,"") == ""){
            bRtn =  true;
        }
        return bRtn;
    },
    /**
     * MessageResource문자열에서 개행 문자 제거 
     * @param str   문자열
     * @returns
     */
    replaceNewLine : function(str){
        return str.replace(/\\n/g,'\n');
    },
    /**
     * 
     * 날자 형식으로 리턴
     * ref) var param = stringUtil.makeDateFormat(20140101);  // 2014.01.01
     * @param YYYYMMDD
     * @returns YYYY.MM.DD
     */
    makeDateFormat : function(strDate){
        
        var delimiter = "-";    //날짜 형식 구분자
        
        if( isNaN(strDate) || strDate == null ){
            strDate = "";
        }
        
        var size = strDate.length;
        if(size >= 6 ){
            strDate = strDate.substring(0,4) + delimiter + strDate.substring(4,6) + delimiter + strDate.substring(6);
        }else if(size >= 4 ){
            strDate = strDate.substring(0,4) + delimiter + strDate.substring(4);
        }
        
        return strDate;
    }
};


/**
 * 숫자 관련 처리 
 */
var numUtil = {
    /**
     * 콤마 제거
     * 
     * @use numUtil.removeComma(num);
     * @param num
     * @returns
     */
    removeComma : function(num) {
        num = new String(num);
        return num.replace(/,/gi,"");
    },
    /**
     * 숫자에 자릿수 표시
     * 
     * @use numUtil.createComma(num);
     * @param num
     * @returns
     */
    createComma : function(num) {
        num = numUtil.removeComma(num);

        if (isNaN(num) || num == 0){
            return 0;
        }
    
        var sign = "";
    
        if (num < 0) {
            num = num * (-1);
            sign = "-";
        } else {
            num = num * 1;
        }
    
        var reg = /(^[+-]?\d+)(\d{3})/;
        num += '';
    
        while (reg.test(num))
            num = num.replace(reg, '$1' + ',' + '$2');
    
        return sign + num ;
    }        
};


var dateUtil = {
    /**
     * 날짜 형식 구분자
     */
    delimiter : "-",
    /**
     * 요청에 따른 날짜리턴
     * 아무값이 없으면 오늘 날짜
     * @param sdate 특정 날자를 넘길 경우.
     * @param dateFormat 요청 데이터 형식
     * @param split
     * @returns
     */
    getDate : function( sdate, dateFormat) {
        var date;
        
        if( sdate == undefined || sdate == "" || sdate == null){
            date = new Date();
        }else{
            date = new Date(sdate);
        }
        
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (("" + month).length == 1) { month = "0" + month; }
        if (("" + day).length  == 1) { day  = "0" + day;  }

        if(dateFormat == "yyyy"){
            return year;
        }else if(dateFormat == "mm"){
            return month ;
        }else if(dateFormat == "dd"){
            return day;
        }else if(dateFormat == "yyyymm"){
            return year + this.delimiter + month;
        }else if(dateFormat == "mmdd"){
            return month + this.delimiter + day;
        }else{
            return  year + this.delimiter + month + this.delimiter + day;
        }
    },
    /**
     * 월의 마지막 날짜 구하기
     * @param year 년도
     * @param month 월
     * @returns
     */
    getMonthLastDay : function(year, month) {
        // 월별 마지막 날짜
        var arrLastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

        // 윤년인 경우 2월의 마지막은 29일
        if((0 == year%4 && 0 != year%100) || 0 == year%400) {
            arrLastDay[1]=29;
        }
        
        return arrLastDay[month-1];
    },
    /**
     * 년월일(YYYYMMDD)의 유효성을 체크    
     * ref : dateUtil.isDateFormat(yyyymmdd)
     * @param ymd
     * @returns {Boolean} ture : OK
     */
    isDateFormat : function(ymd) {
        ymd = ymd.replace(/-/gi,"");
        
        if( isNaN(ymd) || ymd==null ){
            return false;
        }else{
            var year = ymd.substring(0, 4);
            var month = parseInt(ymd.substring(4, 6), 10) -1;
            var day = parseInt(ymd.substring(6), 10);
            var endDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                endDay[1] = 29;
            }
            
            return (day >= 1 && day <= endDay[month]);
        }
    },
    /**
     * 입력시간의 유효성을 체크
     * ref : dateUtil.isTimeFormat('HHMM')
     * @param hhmm  시간
     * @returns {Boolean}
     */
    isTimeFormat : function(hhmm){
        var bRtn = true;
       
        hhmm = hhmm.replace(/[-:]/gi,"");
        
        if( isNaN(hhmm) || hhmm == null ||  hhmm.length != 4){
            bRtn = false;
        }else{
            if(parseInt(hhmm.substr(0, 2)) > 23){
                bRtn = false;
            }
            
            if(parseInt(hhmm.substr(2, 2)) > 59){
                bRtn = false;
            }            
        }
        
        if(!bRtn){
            alert('시간범위가 아닙니다. 최대 23시 59분까지 입니다.');
        }
        
        return bRtn;
    },
   /**
    * 입력시간의 유효성을 체크
    * - 시작시간과 종료시간의 범위검사 추가
    * ref : dateUtil.isTimeFormat('HHMM', 'HHMM')
    * @param hhmm   시작시간
    * @param hhmm2  종료시간
    * @returns {Boolean}
    */
    isTimeFormat2 : function(hhmm, hhmm2){
        var bRtn = true;
        
        hhmm = hhmm.replace(/[-:]/gi,"");
        hhmm2 = hhmm2.replace(/[-:]/gi,"");
        
        if(dateUtil.isTimeFormat(hhmm) && dateUtil.isTimeFormat(hhmm2)){
            if(parseInt(hhmm) > parseInt(hhmm2)){
                bRtn = false;
                alert('시작시간이 종료시간보다 늦습니다. 다시 확인해 주세요.');
            }
        }else{
            bRtn = false;
        }
        
        return bRtn;
    },
    /**
     * 날짜 차이를 일로계산 한다    
     * ref : dateUtil.diffDate('2002/02/01','2003/03/01')
     * @param fromDate
     * @param toDate
     * @returns
     */
    diffDate : function( fromDate, toDate) {
        // 값이 없는 경우 0일을 리턴한다.(조회 최소기간:하루)
        if(stringUtil.isNull(fromDate) || stringUtil.isNull(toDate)){
            return "0";
        }

        var MinMilli = 1000 * 60;
        var HrMilli = MinMilli * 60;
        var DyMilli = HrMilli * 24;

        //var d1 = new Date(stringUtil.replaceAll(fromDate, ".", "/"));
        //var d2 = new Date(stringUtil.replaceAll(toDate, ".", "/"));
        // 날자 표현형식 통일 : yyyy/mm/dd
        var d1 = new Date(fromDate);
        var d2 = new Date(toDate);

        var d3 = d2-d1;
        var str = d3 /DyMilli ;

        return str;
    },
    /**
     * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환
     * ref : dateUtil.addDate(aType, aDay, aDate, split)
     *       20130304 로부터 2달뒤 ==> dateUtil.addDate("m", 2, "20130304", "/");
     * @param aType 가감타입 : y(연도), m(월),  d(일), md(월가감 날짜까지 표현)
     * @param aDay 가감일
     * @param aDate 가감기준일
     * @returns {String}
     */
    addDate : function (aType, aDay, aDate){
        var yyyy;
        var mm;
        var dd;
        var cDate;
        var cYear, cMonth, cDay;
        
        if(aDate == undefined){
            aDate = dateUtil.getDate();
        }

        aDate = aDate.replace(/-/gi,"");

        yyyy = aDate.substr(0, 4);
        mm  = aDate.substr(4, 2);
        dd  = aDate.substr(6, 2);

        if (aType == "y") {
            yyyy = (yyyy * 1) + (aDay * 1);
        } else if (aType == "m" || aType == "md") {
            mm  = (mm * 1) + (aDay * 1);
        } else if (aType == "d") {
            dd  = (dd * 1) + (aDay * 1);
            if (aDay < 0) dd++;
            else  dd--;
        }

        cDate = new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
        cYear = cDate.getFullYear();
        cMonth = cDate.getMonth() + 1;
        cDay = cDate.getDate();

        cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
        cDay = cDay < 10 ? "0" + cDay : cDay;


        if (aType == "m"){
            return cYear + this.delimiter + cMonth;
        }else{
            return cYear + this.delimiter + cMonth + this.delimiter + cDay;
        }
    }    
};



/**
 * 공통 함수 :: 이벤트 아님
 */
var comUtil = {
    
};

/**
 * 쿠키관련 함수
 */
var cookieUtil = {
    /**
     * 쿠키 확인 
     * @param name  cookie name
     * @returns
     */    
    getCookie : function(name){
        var nameOfCookie = name+"=";
        var x = 0;
        while ( x <= document.cookie.length )
        {
                var y = (x+nameOfCookie.length);
                if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                        if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                                endOfCookie = document.cookie.length;
                        return unescape( document.cookie.substring( y, endOfCookie ) );
                }
                x = document.cookie.indexOf( " ", x ) + 1;
                if ( x == 0 )
                        break;
        }
        return null;
    },
    /**
     * 쿠키 설정
     * - day가 0이거나 undefined면 해당 쿠키가 삭제된다.
     * @param name cookie name
     * @param value cookie value
     * @param day   expires day
     */
    setCookie : function(name, value, day){
        if(typeof day == 'undefined'){
            day = 0;
        }        
        var expire = new Date();
        expire.setDate(expire.getDate() + day);
        document.cookie = name + '=' + escape(value) + '; path=/ ' + ';expires=' + expire.toGMTString() + ';';
    }
};

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {
 
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = Base64._utf8_encode(input);
 
        while (i < input.length) {
 
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
 
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
 
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
 
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
        }
 
        return output;
    },
 
    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
        while (i < input.length) {
 
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
 
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
 
            output = output + String.fromCharCode(chr1);
 
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
 
        }
 
        output = Base64._utf8_decode(output);
 
        return output;
 
    },
 
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    },
 
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
};
var isMobile = {
        Android: function () {
                 return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
                 return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
                 return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
                 return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
                 return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
                 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
};

function goDefaultImage(obj,index){
	var cmmSrcDefaultimage = "/images/img/dj_img.png";
	
	if(index == 1){
		cmmSrcDefaultimage = "/images/img/dj_img.png";  //dj no이미지
	}else if(index == 2){
		cmmSrcDefaultimage = "/images/img/schedule_img_01.png";  //스케쥴 no 이미지 세로
	}else if(index == 2){
		cmmSrcDefaultimage = "/images/img/schedule_img_02.png";  //스케쥴 no 이미지 가로
	}
	
 	$(obj).attr("src",cmmSrcDefaultimage);
}


