// 보그PJ 회원가입 페이지 member.js

// 약관동의 html코드 불러오기
import { mcode } from "./data/mem_data.js";

console.log(mcode);
// 약관동의 넣기 : #conf
$("#conf").html(mcode.conf);

/**********************************************
  약관동의 전체 체크 시 모든 체크박스 변경하기
**********************************************/
// 원리 : 개별체크박스가 모두 체크되면 전체체크하기
// 1. 대상선정
// 1-1. 모두동의 체크박스 : #chk_all
const chkAll = $("#chk_all");
// 1-2. 개별 체크박스 공총 : .chk
const chkEach = $(".chk");

// 2. 체크박스 변경 이벤트 함수 만들기
chkAll.change(function () {
  // 1. 체크박스 체크여부 확인하기
  let isChk = $(this).prop("checked");
  console.log(isChk);
  // 2. 전체 체크박스가 체크상태(true)이면
  // 개별박스도 모두 true로 변경
  // 미체크상태면 개별박스도 동일하게 변경
  chkEach.prop("checked", isChk);
  // chkEach.attr('checked',isChk);
  // attr도 변경 가능함
}); ////// 모두동의 체크박스 change //////////////

// 대상 : .chk -> chkEach변수
chkEach.change(function () {
  // 1. 체크개수 알아오기 : length -> 개수리턴
  let num = $(".chk:checked").length;
  console.log("체크개수 : ", num);

  // 2. 체크 개수가 3이면 전체체크박스 체크하기
  if (num == 3) {
    chkAll.prop("checked", true);
  } else {
    chkAll.prop("checked", false);
  }
}); ////// 개별 체크박스 change /////////

/**********************************************
  동의/비동의 버튼 클릭 시 처리하기
**********************************************/
// 통과조건 : #termsService와 #termsPrivacy인 체크박스가 모두 체크되면 통과
// 1. 대상선정 : .YNbox button
$(".YNbox button").click(function () {
  // 1. 버튼 구분하기 : 동의버튼이냐? is('#btnY')
  let isBtnY = $(this).is("#btnY");
  console.log(isBtnY);
  // 2. 동의 버튼일 경우 : 필수체크 확인 후 회원가입 허가
  if (isBtnY) {
    //
    if ($("#termsService").prop("checked") && $("#termsPrivacy").prop("checked")) {
      // alert('회원가입으로 이동합니다.');
      // 동의/비동의 박스 스~윽 사라지기
      $("#conf").fadeOut(300, () => {
        // 사라진 후 회원가입 박스 스~윽 나타나기
        $(".scont").fadeIn(300);
      }); //////////fade ///////////
    } else {
      alert("모든 필수사항에 체크하셔야 합니다~");
    } //// 체크박스 확인 if else////////////
  } //////////if동의버튼 클릭////////////
  else {
    alert("동의하지 않으셨으므로 메인페이지로 이동합니다.");
    location.href = "index.php"; //그냥 이동
  } ///////비동의 버튼 클릭//////
  // 3. 비동의 버튼일 경우 : 안내문 alert 하고 메인화면 돌아가기
}); //////////click///////////////

/**************************************************
  [ 속성값을 읽어오는 메서드 2가지 ]
  - attribute 의 메서드 : attr(속성명), getAttribute(속성명)
  - property 의 메서드 : prop(속성명)
  -> 둘의 차이는 속성값을 읽을 때는 차이가 없음
  ->> 체크박스에서 checked속성 인 경우 true/false를
      리턴해주는 것은 prop()메서드 뿐이다.
  [ 속성 값을 세팅하는 메서드 2가지 ] : 오버라이딩 됨
  1. attr(속성명, 값), setAttribute(속성명, 값)
  2. prop(속성명, 값)
  _____________________________________
  attr() - HTML attribute 값이 모두 String 으로 넘어옴 
  prop() - 자바스크립트의 프로퍼티 값이 넘어오기 때문에 boolean, date, function 등도 가져올 수 있음
  .prop()는 .attr() 보다 약 2.5 배 빠름
**************************************************/

/***************************************************
    [ 사용자 입력 폼 유효성 검사 ]
    - 이벤트 종류 : blur(<->focus)
    - 제이쿼리 이벤트 메서드 : blur()
    - 이벤트 대상: 입력요소 중 text(이메일뒷주소제외),password
        form.logF input[type=text][id!=email2],
        form.logF input[type=password],
    - 요소 뒤 대괄호는 속성선택자(CSS문법)
    - [id!=속성명] 은 같지 않다(jquery문법)

***************************************************/

$(`form.logF input[type=text][id!=email2],
form.logF input[type=password]`).blur(function () {
  // 1. 현재 블러가 발생한 요소의 아이디는?
  let cid = $(this).attr("id");
  // cid는 current id 즉, 현재 블러발생 아이디

  // 모든 공백 제거 메서드(get rid of Space)
  const groSpace = (x) => x.replace(/\s/g, "");
  // replace(정규식, 바꿀문자)
  // 정규식은 슬래쉬 사이에 표현 : \s 공백문자
  // g는 전역적으로 찾으라는 플래그 문자

  // 2. 현재 블러가 발생한 요소의 값
  // 아이디와 비번 공백제거, 이름은 가운데 공백 빼고 제거
  let cv = cid == "mnm" ? $(this).val().trim() : groSpace($(this).val());
  // 입력창 공백처리 후 재입력
  $(this).val(cv);

  // console.log(this, cid, cv);
  /****************************************
    3. 빈 값 여부 검사하기(필수입력항목)
  ****************************************/
  if (cv == "") {
    ///// 빈값 검사 /////////
    $(this).siblings(".msg").text("필수입력!!").removeClass("on");

    // 통과 실패 시 패스값 변경1///////////
    pass = false;
  } /////////// 빈값 검사 //////////////////
  /********************************************
    4. 아이디의 경우 유효성 검사
    기준 : 영문자로 시작하는 6~20글자 영문자/숫자
  *********************************************/
  else if (cid == "mid") {
    console.log("아이디 검사결과", vReg(cv, cid));
    // 1. 아이디 유효성 검사
    if (!vReg(cv, cid)) {
      // 아이디 검사 실패
      $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on");
      // 통과 실패 시 패스값 변경2///////////
      pass = false;
    } //////////if///////////////
    else {
      // 통과 시
      // 1. DB를 조회하여 같은 아이디가 있다면 : '이미 사용중인 아이디 입니다.'
      // 2. 동일 아이디가 없다면 : '멋진 아이디네요~!'
      //-> 비동기 통신 Ajax로 서버쪽에 아이디 중복 검사 필요!
      /**
        [ Ajax로 중복 아이디 검사하기 ] 
        ajax처리 유형 2가지

        1) post방식 처리 메서드
        - $.post(url,data,callback)

        2) get방식 처리 메서드
        - $.get(url,callback)
        -> get방식은 url로 키=값 형식으로 데이터를 전송하기 때문에
        따로 데이터를 보내지 않음

        3) 위의 2가지 유형 중 처리방식 메서드
        - $.ajax({
          전송할 페이지,
          전송 방식,
          보낼 데이터,
          전송할 데이터 타입,
          비동기옵션,
          성공처리,
          실패처리
        })
        $.ajax(객체) 객체 안에 7가지 유형의 데이터를 보냄
       */
      console.log('중복검사 시작');
      // 2. 아이디 중복검사
      $.ajax({
        // 1. 전송할 페이지(url)
        url:'./process/chkID.php',
        // 2. 전송방식(type)
        type:'post',
        // 3. 보낼데이터(data) - 객체형식으로 키:값으로 전송
        data:{'mid':$('#mid').val()},
        // 4. 전송할 데이터 타입(dataType) ex)html, xml, 등등 달라짐
        dataType:'html',
        // 5. 비동기 옵션
        // -> 비동기옵션은 본 처리를 비동기적으로 처리하겠다는 것임(기본값 true)
        // -> 동기적처리(순서대로처리됨) , 비동기처리(순서와 개별로 따로 처리하고 있음)
        // -> false로 해야 동기화처리되어 아이디의 유효성검사를 거지치고 내려옴
        async:false,
        // 6. 성공처리 : 리턴값을 받는 경우
        success: function(res){
          // res - 리턴 된 결과값
          if(res=='ok'){ //아이디가 중복되지 않은 경우
            $('#mid').siblings(".msg").text("멋진 아이디네요~!").addClass("on");
          }else{ // 아이디가 중복 된 경우
            $('#mid').siblings(".msg").text("이미 사용중인 아이디 입니다.").removeClass("on");
            pass = false;
            console.log('중복아이디: ', pass);
          } ////아이디 중복검사 분기
        },
        // 7. 실패처리 : 
        // xhr - XMLHttpRequest객체
        // status - 실패상태코드
        // error - 에러결과값
        error:function(xhr,status,error){
          alert('연결처리 실패: '+error);
        }
      }) //////////// ajax 메서드 ///////////
    } //// 아이디 검사결과 ///////////////
  } ////////// id 검사 ///////////

  /********************************************
    5. 비밀번호의 경우 유효성 검사
    기준 : 특수문자,문자,숫자포함 형태의 5~15자리
  *********************************************/
  else if (cid == "mpw") {
    console.log("비밀번호 검사결과", vReg(cv, cid));
    if (!vReg(cv, cid)) {
      // 비밀번호 검사 실패
      $(this).siblings(".msg").text(`특수문자,문자,숫자포함 형태의 5~15자리`);
      // 통과 실패 시 패스값 변경3///////////
      pass = false;
    } //////////if///////////////
    else {
      // 통과 시
      // 메세지 지우기
      $(this).siblings(".msg").empty();
    }
  } ////////// pw 유효성 검사 ///////////

  /********************************************
    6. 비밀번호 확인 검사
    기준 : 비밀번호의 일치 여부
  *********************************************/
  else if (cid == "mpw2") {
    // console.log("비밀번호확인 검사결과");
    if (cv != $("#mpw").val()) {
      // 비밀번호 확인 검사 실패
      $(this).siblings(".msg").text(`비밀번호가 일치하지 않습니다.`);
      // 통과 실패 시 패스값 변경4///////////
      pass = false;
    } //////////if///////////////
    else {
      // 통과 시
      // 메세지 지우기
      $(this).siblings(".msg").empty();
    }
  } ////////// pw확인 검사 ///////////

  /********************************************
    7. 이메일 유효성 검사
    기준 : 이메일 형식에 맞는지 여부
  ********************************************/
  else if (cid == "email1") {
    // 1. 이메일 주소만들기 : 앞주소@뒷주소
    let comp = eml1.val() + "@" + (seleml.val() == "free" ? eml2.val() : seleml.val());
    // 메일 뒷주소 : 선택박스값 free?숨긴입력창값:선택값

    // 2. 이메일 검사함수 호출하기
    resEml(comp);
  } ////////// 이메일 유효성 검사 ///////////

  // 모두 통과일 경우
  else {
    // 입력값의 공백제거
    $(this).val(cv);
    $(this).siblings(".msg").empty();
    // empty()내용을 지우는 메서드!(태그그대로)
  } //////////// else ////////////////
}); ///////// blur 메서드 ///////////

///////////////////////////////////////
// 이메일 관련 대상 선정 ///////////////
// 이메일 앞주소
const eml1 = $("#email1");
// 이메일 뒷주소
const eml2 = $("#email2");
// 이메일 뒷주소 선택박스
const seleml = $("#seleml");
///////////////////////////////////////

/********************************************
  선택박스 변경 시 이메일 검사하기
  _______________________________

  검사시점 : 선택박스에 change이벤트가 발생할 때
  제이쿼리 메서드 : change()
  이벤트 대상 : #seleml -> seleml변수
********************************************/
seleml.change(function () {
  // 1. 선택박스의 변경 된 값 불러오기
  let cv = $(this).val();
  // console.log(cv);
  // 2. 옵션에 따른 분기 선택 / free / 나머지
  if (cv == "init") {
    // '선택해주세요'
    // 1. 메세지 출력
    eml1.siblings(".msg").text("이메일 옵션 선택은 필수사항입니다.").removeClass("on");
    // 2. 직접입력 창이 있다면 사라지기
    eml2.fadeOut(300);
  } else if (cv == "free") {
    // '직접입력'
    // 1. 직적 입력할 수 있는 창 보이기
    eml2.fadeIn(300).val("").focus();
    // 2. 메세지 없애기
    eml1.siblings(".msg").empty();
  } else {
    // 자동완성 주소인 경우
    // 1. 직접입력 창이 있다면 사라지기
    eml2.fadeOut(300);
    // 2. 이메일 전체주소 조합하기
    let comp = eml1.val() + "@" + cv;
    // 3. 이메일 유효성 검사 함수 호출
    resEml(comp);
  } //////// 선택박스 옵션 ////////
}); ///////////change메서드//////////////

/***************************************
  키보드 입력 시 이메일 체크하기
  ___________________________
  
  - 키보드 관련 이벤트 : keypress,keyup,keydown
  1. keypress : 키가 눌려졌을 때
  2. keyup : 키가 눌려졌다가 올라올 때
  3. keydown : 키가 눌려져서 내려가 있을 때
  -> 글자가 입력 되는 순간은 어떤 이벤트를 사용 해야 할까
  ->> keyup
  ->>> 나머지는 값이 입력되기 전에 전달되어 값이 정확하게 전달되지 않음

  - 이벤트 대상 : eml1 eml2
  -> 모든 이벤트 함수와 연결하는 제이쿼리 메서드는?
  on(이벤트명 , 함수)
***************************************/
$("#email1,#email2").on("keyup", function () {
  // 1. 현재 이벤트 대상 아이디 읽어오기
  let cid = $(this).attr("id");

  // 2. 이메일 뒷주소 세팅하기
  let backEml = cid == "email1" ? (seleml.val() == "free" ? eml2.val() : seleml.val()) : eml2.val();
  // 입력값이 앞주소면 뒤쪽은 셀박스 값 : 뒷주소입력값

  // 3. 선택박스값이 free이면 이메일 뒷주소로 변경 함
  // if(seleml.val() == 'free') backEml = eml2.val();

  // 4. 이메일 전체주소 조합하기
  let comp = eml1.val() + "@" + backEml;
  // console.log(comp);
  resEml(comp);
}); //////// key이벤트 ////////

/****************************************
  함수명 : resEml
  기능 : 이메일 검사결과 처리
****************************************/
const resEml = (comp) => {
  // comp - 이메일주소
  // console.log("이메일주소 : ", comp);
  // console.log(vReg(comp,'eml'));
  if (vReg(comp, "eml")) {
    // 이메일주소 검사 통과
    eml1.siblings(".msg").text("적합한 이메일 형식입니다!").addClass("on");
  } else {
    // 이메일주소 검사 실패
    eml1.siblings(".msg").text("적합하지 않은 이메일 형식입니다!").removeClass("on");
    // 통과 실패 시 패스값 변경5///////////
    pass = false;
  }
}; /////////// resEml ///////////////

// 비밀번호 글자 보이기 숨기기/숨기기
let eyeNum = 1; // 1- 보이기, 0- 안보임
// 초기상태
$(".eye")
  .css({
    textDecoration: "line-through",
    opacity: 0.5,
    cursor: "pointer",
  })
  .click((e) => {
    // 1. 글자보이기 타입 전환
    $("#mpw").attr("type", eyeNum ? "text" : "password");
    // eyeNum에 할당하기
    // 2. css디자인 바꾸기
    $(e.target).css({
      textDecoration: eyeNum ? "none" : "line-through",
      opacity: eyeNum ? 1 : 0.5,
    });
    eyeNum = eyeNum ? 0 : 1;
  }); //// 눈 click///////////

/**************************************************
    가입하기(submit) 버튼 클릭 시 처리하기
    __________________________________
    
    - form요소 내부의 submit버튼을 클릭하면 기본적으로
    form요소에 설정 된 action속성값인 페이지로 전송된다!
    전체검사를 위해 이를 중지해야한다.
    -> 중지방법은 event.preventDefault()!!!!
    
    전체검사의 원리 :
    전역변수 pass를 설정하여 true를 할당하고
    검사중간에 통과실패 사유발생 시 false로 변경
    유효성검사 통과여부를 해당 전역변수로 판단한다.

    검사방법 :
    기존 이벤트 blur 이벤트를 강제로 발생시킨다!
    이벤트를 강제로 발생시키는 제이쿼리 메서드는?
    ->>> trigger(이벤트명)
  **************************************************/

// 검사용 변수
let pass = true;

// 이벤트 대상 : #btnj
$("#btnj").click((e) => {
  // 호출확인
  console.log("가입해!");
  // 1. 기본이동 막기
  e.preventDefault();

  // 2. pass통과여부 변수에 true를 할당!
  pass = true;

  // 3. 입력창 blur이벤트 강제 발생시키기
  $(`form.logF input[type=text][id!=email2],
        form.logF input[type=password]`).trigger("blur");

  // 최종 통과여부
  console.log("통과여부", pass);

  // 4. 검사결과에 따라 메시지 보이기
  if (pass) {
    // 오리지널 POST방식의 데이터 전송 : 전체페이지 새로고침
    // $(".logF").submit();
    // 현재 페이지 form정보가 모두 inc/ins.php로 이동하여 데이터를 처리함 
    // -> 동기화방식(페이지 새로고침)

    // 현재 페이지를 가만히 두고 처리페이지로 비동기적인 처리를 하는 것이 바로 Ajax!!!
    // -> 비동기방식
    /*
      [ Ajax를 이용한 POST방식으로 DB에 데이터 입력하기 ] 

      AJAX = Asyncronous Javascript and XML

      - 비동기 통신이란? 쉽게 말해서 페이지가 새로 고쳐지지 않고 그대로 있으면서
      일부분만 서버통신을 하는 것을 말한다!
      - 제이쿼리는 POST방식으로 ajax를 처리하는 메서드를 제공한다

      [ POST방식 Ajax 메서드 ]

      $.post(URL,data,callback)
      $.post(전송페이지,전송데이터,전송 후 콜백함수)

    */

    $.post(
    // 1. 전송할 페이지
    'process/ins.php',
    // 2. 전송할 데이터 : {} 객체 전송
    {
      // 1.아이디
      "mid" : $("#mid").val(),
      // 2.비번
      "mpw" : $("#mpw").val(),
      // 3.이름
      "mnm" : $("#mnm").val(),
      // 4.성별 : 라디오태그의 value속성 필수!
      "gen" : $(':radio[name=gen]:checked').val(),
      // 5-1.이메일 앞주소
      "email1" : $("#email1").val(),
      // 5-2.이메일 뒷주소
      "seleml" : $("#seleml").val(),
      // 5-3.직접입력 이메일 뒷주소
      "email2" : $("#email2").val(),
    },
    // 3. 전송 후 콜백함수 
    function(res){ //리턴값 받을 매개변수하나 써주면 됨
      console.log('서버응답 : ',res);
      if( res ==='ok'){ // 성공 시
        alert('보그코리아 회원가입을 축하드립니다!!');

        // 최초 로그인을 위해 로그인 페이지로
        location.replace('login.php');
      }else{ // 실패 시
        alert(res);
      }
    } ///////// 전송 후 콜백함수 ///////////
    ); ///////////////// ajax POST() ////////////////////

    // 원래는 post방식으로 DB에 회원가입 데이터를 전송해서 입력 후
    // DB처리 완료 시 성공메세지, 로그인페이지 이동

    // alert('보그코리아 회원가입을 축하드립니다!!');
    // 로그인페이지로 리디렉션!
    // location.replace('login.php');
    // 민감한 입력 데이터 페이지가 다시 돌아와서 보이면 안되기 때문에
    // 히스토리를 지우는 replace()로 이동한다.
  } //////////////// if: 최종통과 ////////////////
  else {
    alert("입력을 수정하세요!!");
  } /////// 최종 통과실패 ///////////
}); //////////submit버튼 클릭 //////////////

/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
  // val - 검사할값, cid - 처리구분아이디
  // //console.log("검사:"+val+"/"+cid);

  // 정규식 변수
  let reg;

  // 검사할 아이디에 따라 정규식을 변경함
  switch (cid) {
    case "mid": // 아이디
      reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
      // 영문자로 시작하는 6~20글자 영문자/숫자
      // /^[a-z]{1} 첫글자는 영문자로 체크!
      // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
      // 최소 5글자에서 최대 19글자를 유효범위로 체크!
      // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
      break;
    case "mpw": // 비밀번호
      reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      // 특수문자,문자,숫자포함 형태의 5~15자리
      // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
      // (?=.*\d) 숫자 사용체크!
      // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
      // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
      break;
    case "eml": // 이메일
      reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
      // 이메일 형식에 맞는지 검사하는 정규식
      break;
  } //////////// switch case문 //////////////////

  // //console.log("정규식:"+reg);

  // 정규식 검사를 위한 JS메서드
  // -> 정규식.test(검사할값) : 결과 true/false
  return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////
