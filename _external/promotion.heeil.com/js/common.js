//-------------------------------------------------------------------------
// link
//-------------------------------------------------------------------------
function autoBlur(){ 
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="/img") 
document.body.focus(); 
} 
document.onfocusin=autoBlur; 


//-------------------------------------------------------------------------
// png 투명하게 출력
//-------------------------------------------------------------------------
function setPNG24(obj) {
    obj.width=obj.height=1;
    obj.className=obj.className.replace(/\bPNG24\b/i,'');
    obj.style.filter =
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
    obj.src='';
    return '';
}

//-------------------------------------------------------------------------
// 레이어 열기
//-------------------------------------------------------------------------
function funcViewLayer(src, w, h){

	var top = document.documentElement.scrollTop;
	if(top > 200){
		$('#hidden_layer').css("top",top+65);
	}

	$('#hidden_frame').width(w);
	$('#hidden_frame').height(h);
	$('#hidden_layer').show("slow");
	$('#hidden_frame').attr('src',src);
	
}

//-------------------------------------------------------------------------
//레이어 위치조정하여 열기
//-------------------------------------------------------------------------
function funcViewLayer2(src, w, h, pos_t, pos_l ){
	
	jQuery('#hidden_frame').width(w);
	jQuery('#hidden_frame').height(h);
	var layer =  document.getElementById('hidden_layer');
	
	layer.style.top = pos_t + "px";
	layer.style.left = pos_l + "px";
	
	jQuery('#hidden_layer').show("slow");
	jQuery('#hidden_frame').attr('src',src);
	
}

//-------------------------------------------------------------------------
// 레이어 닫기
//-------------------------------------------------------------------------
function funcHideLayer(){
	parent.$("#hidden_layer").hide("slow");
	$('#hidden_frame').width("0px");
	$('#hidden_frame').height("0px");
}

//-------------------------------------------------------------------------
// 날짜 초기화
//-------------------------------------------------------------------------
function funcClearData(id){
	var obj = document.getElementById(id);
	obj.value = "";
}

//-------------------------------------------------------------------------
// 숫자만 입력 예)onkeyup="checkNumber(this);"
//-------------------------------------------------------------------------
function checkNumber(obj){
	if(isNaN(obj.value)){
		alert("숫자만 입력해 주세요");
		obj.value = "";
	}
}

//-------------------------------------------------------------------------
// 공백제거
//-------------------------------------------------------------------------
 function trim(str) {  
    return str.replace( /(^\s*)|(\s*$)/g, "" );  
 } 
 
 String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}

//-------------------------------------------------------------------------
// 검색날짜 삭제 버튼
//-------------------------------------------------------------------------
function funcClearData(obj){
	document.getElementById(obj).value="";
}

//-------------------------------------------------------------------------
// 문자 치환
//-------------------------------------------------------------------------
String.prototype.replaceAll = function(str1, str2){
	var temp_str = "";

	if (this.trim() != "" && str1 != str2){
		temp_str = this.trim();

		while (temp_str.indexOf(str1) > -1){
			temp_str = temp_str.replace(str1, str2);
		}
	}

	return temp_str;
}

//-------------------------------------------------------------------------
// Object Id
//------------------------------------------------------------------------- 
function object_id(obj) {
	return document.getElementById(obj);
}

//-------------------------------------------------------------------------
// ID 보이기, 감추기
//------------------------------------------------------------------------- 
function show_id(id){
	document.getElementById(id).style.display='block';
}

function hide_id(id){
	document.getElementById(id).style.display='none';
}

//-------------------------------------------------------------------------
// 레이어 오픈
//------------------------------------------------------------------------- 
function open_layer(obj,mode) {
	obj = object_id(obj);
	if (mode) obj.style.display = mode;
	else obj.style.display = (obj.style.display!="none") ? "none" : "block";
}

//-------------------------------------------------------------------------
// 오브젝트 삭제
//------------------------------------------------------------------------- 
function remove_object(id) {
	$('#'+id).remove();
}

//-------------------------------------------------------------------------
// 더블클릭방지
//------------------------------------------------------------------------- 
function avoid_double_click() {
	if($('#avoid_double_click')) {
		$('#avoid_double_click').html("------- 데이터 처리중입니다. -------");
	}
}

//-------------------------------------------------------------------------
// 하이픈빼기
//------------------------------------------------------------------------- 
function remove_hyphen(str) {
	var pattern = /-/gi;
	return str.replace(pattern, "");  
}


//-------------------------------------------------------------------------
// FORM CHECK
//------------------------------------------------------------------------- 
function check_form(form_name)
{
	
	var check_result = true;
	var $obj = $('form[name="' + form_name + '"] *').filter("input, select, textarea");     
	var obj_count = $obj.length;
	
	for (i=0; i<obj_count; i++)
	{
		// 필수항목체크
		if ($obj.eq(i).hasClass('required')) {
			if ($obj.eq(i).attr('type') == 'checkbox' || $obj.eq(i).attr('type') == 'radio'|| $obj.eq(i).attr('type') == 'select') {
				if (!check_select($obj.eq(i))) return false;
			} else if($obj.eq(i).attr('type') == 'textarea') {
				if (!check_text($obj.eq(i))) return false;
			} else {
				if (!check_text($obj.eq(i))) return false;
			}
		}
		
		// 길이체크
		if (!check_length($obj.eq(i))) return false;


		// 패턴체크
		var class_name = $obj.eq(i).attr('className') != null ? $obj.eq(i).attr('className') : $obj.eq(i).attr('class'); 
		if (class_name != null) {
			var option = class_name.split(' '); 

			for (j=0;j<option.length;j++) { 
				var pattern = option[j].toLowerCase(); 

				switch (pattern) { 
					case "exp_id"			: if(!check_pattern($obj.eq(i),'exp_id')) return false; break;
					case "exp_password"		: if(!check_pattern($obj.eq(i),'exp_password')) return false; break;
					case "exp_numeric"		: if(!check_pattern($obj.eq(i),'exp_numeric')) return false; break;
					case "exp_alphabet"		: if(!check_pattern($obj.eq(i),'exp_alphabet')) return false; break;
					case "exp_hangul"		: if(!check_pattern($obj.eq(i),'exp_hangul')) return false; break;
					case "exp_word"			: if(!check_pattern($obj.eq(i),'exp_word')) return false; break;
					case "exp_comma"		: if(!check_pattern($obj.eq(i),'exp_comma')) return false; break;
					case "exp_price"		: if(!check_pattern($obj.eq(i),'exp_price')) return false; break;
					case "exp_email"		: if(!check_pattern($obj.eq(i),'exp_email')) return false; break;
					case "exp_url"			: if(!check_pattern($obj.eq(i),'exp_url')) return false; break;
					case "exp_image"		: if(!check_pattern($obj.eq(i),'exp_image')) return false; break;
					case "exp_csv"			: if(!check_pattern($obj.eq(i),'exp_csv')) return false; break;
					case "exp_xls"			: if(!check_pattern($obj.eq(i),'exp_xls')) return false; break;
					case "exp_swf"			: if(!check_pattern($obj.eq(i),'exp_swf')) return false; break;
					case "exp_file"			: if(!check_pattern($obj.eq(i),'exp_file')) return false; break;
					default : break;
				}
			}
		}

	} // for end

	return check_result;
}

//-------------------------------------------------------------------------
// SELECT, CHECKBOX, RADIO CHECK
//-------------------------------------------------------------------------
function check_select($obj)
{
	var check_result = false;
	var field_name = $obj.attr('name');
	
	if( $('input[name=' + field_name + ']:radio:checked').length > 0 )  check_result = true;
	if( $('input[name=' + field_name + ']:checkbox:checked').length > 0 )  check_result = true;
	
	if (!check_result)
	{
		msg = "[" + $obj.attr('title') + "] 필수선택사항입니다.";
		alert(msg);
		//$obj.val("");  //2010.07.29 주석처리 (체크박스, 라디오박스 Value를 삭제함)
		$obj.focus();
		return false;
	}

	return true;
}


//-------------------------------------------------------------------------
// INPUT
//-------------------------------------------------------------------------
function check_text($obj){
	text = $obj.val();
	text = text.replace(/\s*/, "");
	if (text==""){
		msg = "[" + $obj.attr('title') + "] 필수입력사항입니다.";
		alert(msg);
		$obj.val("");
		$obj.focus();
		return false;
	}
	return true;
}


//-------------------------------------------------------------------------
// Length
//-------------------------------------------------------------------------
function check_length($obj){
	var result = true;
	
	var minlength = $obj.attr('minlength');
	var maxlength = $obj.attr('maxlength');
	
	if($obj.val().length > 0) {
		if ($obj.val().length < minlength)
		{
			if (minlength ==  maxlength)
			{
				alert("[" +$obj.attr('title') + '] 항목은 ' + minlength + " 글자를 입력하셔야 합니다.");
			}
			else if(maxlength <= 0)
			{
				alert("[" +$obj.attr('title') + '] 항목은 ' + minlength + "이상 글자를 입력하셔야 합니다.");
			}
			else
			{
				alert("[" +$obj.attr('title') + '] 항목은 ' + minlength + " ~ " + maxlength + " 글자를 입력하셔야 합니다.");
			}

			
			$obj.focus();
			result = false
		}
	}

	return result;
}


//-------------------------------------------------------------------------
// FORM OBJECT PATTERN
//-------------------------------------------------------------------------
function check_pattern($obj, pattern){
	
	var exp_id  		= /^[a-zA-Z0-9_]{4,20}$/;  //4~20자리 (회원아이디)
	var exp_common_id	= /^[a-zA-Z0-9_]{3,20}$/;  //3~20자리 (일반아이디)
	var exp_password   	= /^[a-zA-Z0-9_-]{4,20}$/; //4~20자리 (비밀번호)
	var exp_numeric		= /^[0-9]+$/; //숫자
	var exp_alphabet	= /^[a-zA-Z]+$/; //알파벳
	var exp_hangul		= /^[가-힣]+$/; //한글
	var exp_word		= /^[가-힣a-zA-Z0-9-\s]+$/ //공백포함 특수문자 제외한 문자
	var exp_price		= /^[0-9_-]+$/; //가격
	var exp_email		= /^[_a-zA-Z0-9-]+@[._a-zA-Z0-9-]+\.[a-zA-Z.]+$/; //이메일
	var exp_url			= /^(http\:\/\/)*[.a-zA-Z0-9-]+\.[a-zA-Z]+$/; //URL
	//var exp_comma		= /^([가-힣0-9_-a-zA-Z ])+,+([가-힣0-9_-a-zA-Z, \s])+[^,]$/; //문자사이에 콤마 넣기
	var exp_comma		= /^[가-힣0-9_-a-zA-Z, ]+$/; //문자사이에 콤마 넣기
	//var exp_url			= /^((?:[a-z\d\-]{2,}\.)+[a-z]{2,})(:\d{1,5})?(\/[^\?]*)?(\?.+)?$/i; //url
	var exp_image       = /\.(gif|jpg|jpeg|png)$/;                   //이미지 허용 확장자
    var exp_csv         = /\.(csv)$/;                   			 //CSV파일 허용 확장자
	var exp_xls         = /\.(xls)$/;                   			 //XLS파일 허용 확장자
    var exp_swf         = /\.(swf)$/;                   			 //SWF파일 허용 확장자
    var exp_file        = /\.(gif|jpg|jpeg|png|bmp|zip|alz|doc|hwp|xls|csv|ppt|pdf|txt)$/; //파일업로드 허용확장자

  	text = $obj.val();
	text = text.replace(/\s*/, "");

	pattern = eval(pattern);

	if (!pattern.test(text) && text != ""){
		msg = "[" + $obj.attr('title') + "] 입력형식 오류입니다.";
		alert(msg);
		$obj.focus();
		return false;
	}
	
	return true;
}


//-------------------------------------------------------------------------
// Byte 체크
//------------------------------------------------------------------------- 
function check_byte(str) {
	var length = 0;
	for(var i = 0; i < str.length; i++)
	{
		if(escape(str.charAt(i)).length >= 4)
			length += 2;
		else
			if(escape(str.charAt(i)) != "%0D")
				length++;
	}
	return length;
}


//-------------------------------------------------------------------------
// 콤마 체크
//------------------------------------------------------------------------- 
function add_comma(str)
{
	var temp = "";
	var str = String(remove_comma(str));

	num_len = str.length;
	co = 3;
	while (num_len>0){
		num_len = num_len - co;
		if (num_len<0){
			co = num_len + co;
			num_len = 0;
		}
		temp = ","+str.substr(num_len,co)+temp;
	}
	return temp.substr(1);
}

function remove_comma(str)
{
	var reg = /(,)*/g;
	str = parseInt(String(str).replace(reg,""));
	return (isNaN(str)) ? 0 : str;
}


//-------------------------------------------------------------------------
// 금액 한글변환
//------------------------------------------------------------------------- 
function convert_won(str1){		
	tmpstr = '';
	tmporg = '';
	kk = 0;
	var $tObj = $('input[name=' + str1 + ']');
	sObj = $('#' + str1 + '_won');
	str = $tObj.attr('value');
	tLen = str.length;	
	for (k=0; k<tLen; k++)
	{
		tmpstr += str.substr(k, 1);
		tmporg += str.substr(k, 1);
		kk++;
		
		if (k == 0 && tmporg == 0) 
		{
			$tObj.attr('value','0');
			sObj.html('');
			return false;
		}
		else
		{
			tmpstr += convert_unit(tLen-k, str);
			
			if (str.substr(k, 1)>0)
			{
				switch ((tLen-k)%4)
				{
					case 3: tmpstr += '백'; break;
					case 2: tmpstr += '십'; break;
					case 0: tmpstr += '천'; break;
				}
			}
		
			tmpstr = tmpstr.replaceAll('1', '일');
			tmpstr = tmpstr.replaceAll('2', '이');
			tmpstr = tmpstr.replaceAll('3', '삼');
			tmpstr = tmpstr.replaceAll('4', '사');
			tmpstr = tmpstr.replaceAll('5', '오');
			tmpstr = tmpstr.replaceAll('6', '육');
			tmpstr = tmpstr.replaceAll('7', '칠');
			tmpstr = tmpstr.replaceAll('8', '팔');
			tmpstr = tmpstr.replaceAll('9', '구');
			tmpstr = tmpstr.replaceAll('0', '');
			
			//if ((tLen-k)%3 == 1 && k < tLen-1) tmporg += ',';
		}
	}
	$tObj.attr('value', tmporg);
	sObj.html(tmpstr + ' 원');
	if (tmporg.length==0) sObj.html(''); 
}


function convert_unit(dvn, str){
	var tmps = '';
	if (dvn == 5) {tmps = '만 ';}
	else if (dvn == 9) {tmps = '억 ';}
	else if (dvn == 13) {tmps = '조 ';}
	if (str.length > (dvn+3)) 
	{
		if (str.substr((str.length-(dvn+3)), 4) == '0000') { tmps = '';}
	}
	return tmps;
}


//-------------------------------------------------------------------------
// 주민등록번호 체크
//------------------------------------------------------------------------- 
function check_jumin(jumin1,jumin2){

	var jumin = jumin1 + jumin2;

	fmt = /^\d{6}[1234]\d{6}$/;
	if (!fmt.test(jumin)) {
		alert('잘못된 주민등록번호입니다.'); return false;
	}

	birthYear  = (jumin.charAt(6) <= '2') ? '19' : '20';
	birthYear += jumin.substr(0, 2);
	birthMonth = jumin.substr(2, 2) - 1;
	birthDate  = jumin.substr(4, 2);
	birth      = new Date(birthYear, birthMonth, birthDate);

	if ( birth.getYear()%100 != jumin.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) {
		alert('잘못된 주민등록번호입니다.');
		return false;
	}

	buf = new Array(13);
	for (i = 0; i < 13; i++) buf[i] = parseInt(jumin.charAt(i));

	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

	if ((11 - (sum % 11)) % 10 != buf[12]) {
		alert('잘못된 주민등록번호입니다.');
		return false;
	}
	return true;
}

//--------------------------------------------------------------------
//	문자 함수
//--------------------------------------------------------------------
function is_instr(str1, str2) {
	if (str1) 
	{
		if (str1.indexOf(str2, 0)>-1)
			return true;
		else
			return false;
	}
}

//--------------------------------------------------------------------
//	팝업 함수
//--------------------------------------------------------------------
function win_open(url, name, option) {
	var popup = window.open(url, name, option);
	popup.focus();
}


//--------------------------------------------------------------------
//	우편번호찾기 함수
//--------------------------------------------------------------------
function win_zip(form, zip1, zip2, address) {
	var option ="width=450,height=500,scrollbars=yes";
	
	var condition = "?";
	condition += "form="+form;
	condition += "&zip1="+zip1;
	condition += "&zip2="+zip2;
	condition += "&address="+address;

	win_open(mf_module_path+"/zip/zip.php"+condition, "win_zip", option);
}


//-------------------------------------------------------------------------
// 날짜형식검색
//------------------------------------------------------------------------- 
function set_date(from_date,to_date, from_obj, to_obj){
	document.getElementById(from_obj).value	= (from_date) ? from_date : "";
	document.getElementById(to_obj).value	= (to_date) ? to_date : "";
}


//-------------------------------------------------------------------------
// ID 보이기, 감추기
//------------------------------------------------------------------------- 
function show_id(id){
	document.getElementById(id).style.display='block';
}

function hide_id(id){
	document.getElementById(id).style.display='none';
}


//-------------------------------------------------------------------------
// 쿠키
//------------------------------------------------------------------------- 

// 쿠키 입력
function set_cookie( name, value, expirehours ) { 
	var todayDate = new Date(); 
	//todayDate.setDate( todayDate.getDate() + expiredays ); 일자
	todayDate.setTime(todayDate.getTime() + (60*60*1000*expirehours));  // 시간
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 


// 쿠키 얻음
function get_cookie(name) {
	var find_sw = false;
	var start, end;
	var i = 0;

	for (i=0; i<= document.cookie.length; i++)
	{
		start = i;
		end = start + name.length;

		if(document.cookie.substring(start, end) == name) 
		{
			find_sw = true
			break
		}
	}

	if (find_sw == true) 
	{
		start = end + 1;
		end = document.cookie.indexOf(";", start);

		if(end < start)
			end = document.cookie.length;

		return document.cookie.substring(start, end);
	}
	return "";
}

// 쿠키 지움
function delete_cookie(name) {
	var today = new Date();

	today.setTime(today.getTime() - 1);
	var value = get_cookie(name);
	if(value != "")
		document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}


//-------------------------------------------------------------------------
// TEXTAREA 높이 조절
//------------------------------------------------------------------------- 
function increase_textarea(id, row) {
	document.getElementById(id).rows += row;
}

function decrease_textarea(id, row) {
	if (document.getElementById(id).rows - row > 0)
		document.getElementById(id).rows -= row;
}

function original_textarea(id, row) {
	document.getElementById(id).rows = row;
}


//-------------------------------------------------------------------------
// 즐겨찾기추가
//------------------------------------------------------------------------- 
function add_favorite() {
	if (document.all) 
		window.external.AddFavorite(location.href,$(document).attr("title"));
	else
		window.sidebar.addPanel($(document).attr("title"), location.href, "");
}

//-------------------------------------------------------------------------
// 주소복사
//------------------------------------------------------------------------- 
function url_copy(url) {
	window.clipboardData.setData('Text', url); 
    alert( '주소가 복사되었습니다.\n주소창에 Ctrl+V 하시면 복사된 주소가 붙여집니다.' );
}

//-------------------------------------------------------------------------
// 탭
//------------------------------------------------------------------------- 
function tab_over(obj) {
    var tab_id = obj.id;

    var cObj = obj.parentNode.firstChild;
    while(cObj) {
        if(cObj.nodeName == "DIV" && cObj.id) {
            var cTabID= cObj.id;
            if(cTabID.indexOf('tab')<0) continue;
            var cContentID = cTabID.replace(/^tab/,'content');

            if(tab_id == cTabID) {
                cObj.className = "tab on";
                object_id(cContentID).className = "tab_content show";
            } else {
                cObj.className = "tab";
                object_id(cContentID).className = "tab_content hide";
            }
        }
        cObj = cObj.nextSibling;
    }
}


//-------------------------------------------------------------------------
// 이미지 넓이 지정
//------------------------------------------------------------------------- 
// HTML 로 넘어온 <img ... > 태그의 폭이 테이블폭보다 크다면 테이블폭을 적용한다.
function resize_image(image_width, border_color) {

    var target = document.getElementsByName('target_resize_image[]');
    var image_height = 0;

    if (target) {
        for(i=0; i<target.length; i++) { 
            // 원래 사이즈를 저장해 놓는다
            target[i].tmp_width  = target[i].width;
            target[i].tmp_height = target[i].height;
            // 이미지 폭이 테이블 폭보다 크다면 테이블폭에 맞춘다
            if(target[i].width > image_width) {
                image_height = parseFloat(target[i].width / target[i].height)
                target[i].width = image_width;
                target[i].height = parseInt(image_width / image_height);
                target[i].style.cursor = 'pointer';

                // 스타일에 적용된 이미지의 폭과 높이를 삭제한다
                target[i].style.width = '';
                target[i].style.height = '';
            }

            if (border_color) {
                target[i].style.borderWidth = '1px';
                target[i].style.borderStyle = 'solid';
                target[i].style.border_color = border_color;
            }
        }
    }
}


//-------------------------------------------------------------------------
// 이미지 팝업
//------------------------------------------------------------------------- 
function image_window(img)
{
	var w = img.tmp_width; 
	var h = img.tmp_height; 
	var winl = (screen.width-w)/2; 
	var wint = (screen.height-h)/3; 

	if (w >= screen.width) { 
		winl = 0; 
		h = (parseInt)(w * (h / w)); 
	} 

	if (h >= screen.height) { 
		wint = 0; 
		w = (parseInt)(h * (w / h)); 
	} 

	var js_url = "<script language='javascript' type='text/javascript'> \n"; 
		js_url += "<!-- \n"; 
		js_url += "var ie=document.all; \n"; 
		js_url += "var nn6=document.getElementById&&!document.all; \n"; 
		js_url += "var isdrag=false; \n"; 
		js_url += "var x,y; \n"; 
		js_url += "var dobj; \n"; 
		js_url += "function movemouse(e) \n"; 
		js_url += "{ \n"; 
		js_url += "  if (isdrag) \n"; 
		js_url += "  { \n"; 
		js_url += "    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x; \n"; 
		js_url += "    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y; \n"; 
		js_url += "    return false; \n"; 
		js_url += "  } \n"; 
		js_url += "} \n"; 
		js_url += "function selectmouse(e) \n"; 
		js_url += "{ \n"; 
		js_url += "  var fobj      = nn6 ? e.target : event.srcElement; \n"; 
		js_url += "  var topelement = nn6 ? 'HTML' : 'BODY'; \n"; 
		js_url += "  while (fobj.tagName != topelement && fobj.className != 'dragme') \n"; 
		js_url += "  { \n"; 
		js_url += "    fobj = nn6 ? fobj.parentNode : fobj.parentElement; \n"; 
		js_url += "  } \n"; 
		js_url += "  if (fobj.className=='dragme') \n"; 
		js_url += "  { \n"; 
		js_url += "    isdrag = true; \n"; 
		js_url += "    dobj = fobj; \n"; 
		js_url += "    tx = parseInt(dobj.style.left+0); \n"; 
		js_url += "    ty = parseInt(dobj.style.top+0); \n"; 
		js_url += "    x = nn6 ? e.clientX : event.clientX; \n"; 
		js_url += "    y = nn6 ? e.clientY : event.clientY; \n"; 
		js_url += "    document.onmousemove=movemouse; \n"; 
		js_url += "    return false; \n"; 
		js_url += "  } \n"; 
		js_url += "} \n"; 
		js_url += "document.onmousedown=selectmouse; \n"; 
		js_url += "document.onmouseup=new Function('isdrag=false'); \n"; 
		js_url += "//--> \n"; 
		js_url += "</"+"script> \n"; 

	var settings;

	if (mf_is_gecko) {
		settings  ='width='+(w+10)+','; 
		settings +='height='+(h+10)+','; 
	} else {
		settings  ='width='+w+','; 
		settings +='height='+h+','; 
	}
	settings +='top='+wint+','; 
	settings +='left='+winl+','; 
	settings +='scrollbars=no,'; 
	settings +='resizable=yes,'; 
	settings +='status=no'; 


	win=window.open("","image_window",settings); 
	win.document.open(); 
	win.document.write ("<html><head> \n<meta http-equiv='imagetoolbar' CONTENT='no'> \n<meta http-equiv='content-type' content='text/html; charset="+mf_charset+"'>\n"); 
	var size = "이미지 사이즈 : "+w+" x "+h;
	win.document.write ("<title>"+size+"</title> \n"); 
	if(w >= screen.width || h >= screen.height) { 
		win.document.write (js_url); 
		var click = "ondblclick='window.close();' style='cursor:move' title=' "+size+" \n\n 이미지 사이즈가 화면보다 큽니다. \n 왼쪽 버튼을 클릭한 후 마우스를 움직여서 보세요. \n\n 더블 클릭하면 닫혀요. '"; 
	} 
	else 
		var click = "onclick='window.close();' style='cursor:pointer' title=' "+size+" \n\n 클릭하면 닫혀요. '"; 
	win.document.write ("<style>.dragme{position:relative;}</style> \n"); 
	win.document.write ("</head> \n\n"); 
	win.document.write ("<body leftmargin=0 topmargin=0 bgcolor=#dddddd style='cursor:arrow;'> \n"); 
	win.document.write ("<table width=100% height=100% cellpadding=0 cellspacing=0><tr><td align=center valign=middle><img src='"+img.src+"' width='"+w+"' height='"+h+"' border=0 class='dragme' "+click+"></td></tr></table>");
	win.document.write ("</body></html>"); 
	win.document.close(); 

	if(parseInt(navigator.appVersion) >= 4){win.window.focus();} 
}

//-------------------------------------------------------------------------
// 특정문자 escape >,<," 있는지 확인
//-------------------------------------------------------------------------
function chkEscapeChar(str) {
	var escape_char = new Array();
	escape_char = ['>', '<','"'];

	var error_code = 0;
	var i;
	
	for(i=0 ; i < escape_char.length ; i++){
		ret = str.indexOf(escape_char[i]);
		if( ret >= 0 ) error_code +=1;
	}

	return(error_code);
}

//브라우저 정보 갖고 오기
function getBrowser(){
    var name = window.navigator.appName;
	return name;
}
//ie판별
function is_ie(){
	var browser = getBrowser();
	
	if(browser.indexOf('Microsoft Internet Explorer') > -1){
		return true;
	}else{
		return false;
	}
}


