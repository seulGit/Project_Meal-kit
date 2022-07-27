/*
================================================
220726 이은지 회원가입 정규표현식
       조건문 작성
       회원가입 버튼 클릭 시 조건 만족하면 
       로그인 페이지 이동 
=================================================
*/

let id = document.querySelector('#id'); // input 아이디
let password = document.querySelector('#password'); // input 비밀번호
let pwConfirm = document.querySelector('#pwConfirm'); // input 비밀번호 재확인
let nameCheak = document.querySelector('#nameCheak'); // input 이름
let genderBox = document.querySelector('.genderBox'); // 성별
let birth = document.querySelector('#birth'); // 생년월일 날짜
let phone = document.querySelector('#phone'); // input 핸드폰 번호
let address = document.querySelector('#address'); // input 주소
let email = document.querySelector('#email'); // input 이메일
let btn = document.querySelector('.btn'); // 가입하기 버튼


const idInput = /^[a-zA-Z0-9]*$/;
// 아이디 영문(대,소문자상관없이) 숫자 작성해야함
const pwInput = /(?=.*\d)+(?=.*[~`!@#$%\^&*()-+=])+(?=.*[a-z])(?=.*[A-Z])+.{1,}$/;
// 비밀번호 영문(대,소문자), 특수문자, 숫자 1개 이상 작성해야함
const nameInupt = /^[a-zA-Z가-힣]*.{3,}$/;
// 이름 영어(대, 소문자 상관없이), 한글만 3글자 이상 작성해야함
const phoneInput = /^01([0|1|6|7|8]?)-([0-9]{3,4})-([0-9]{4})$/;
// 핸드폰 번호 010,011,016,017,018 중에 작성, 중간번호(3~4자리), 끝 번호(4자리) 작성해야함
const addressInput = /(([가-힣A-Za-z·\d~\-\.]{2,}(로|길).[\d]+)|([가-힣A-Za-z·\d~\-\.]+(읍|동)\s)[\d]+)/;
// 주소 도로명주소, 지번 주소 작성해야함
const emailInput =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
// 이메일 주소 영문(대,소문자 상관없이)과 숫자 작성 
// @ 도메인주소 작성 시 .이 하나 이상 들어가야 하고 맨 뒤(com/net) 이기 때문에 2~3글자 작성해야함

// nextElementSibling 다음 형제 요소 노드를 사용할 수 있도록 해주는 속성

// 아이디 확인
id.addEventListener("keyup",function(){
    if(id.value.length == 0){
        id.nextElementSibling.innerHTML="아이디를 입력하세요";
        id.nextElementSibling.style.color='red';

    }else if(idInput.test(id.value) !== true){
        id.nextElementSibling.innerHTML="아이디는 영문과 숫자를 사용해주세요";
        id.nextElementSibling.style.color='red';

    } else if(id.value.length>15 || id.value.length<5){
        id.nextElementSibling.innerHTML="아이디는 5~15자로 작성해주세요";
        id.nextElementSibling.style.color='red';

    } else if(idInput.test(id.value)==true){
        id.nextElementSibling.innerHTML="사용 가능합니다";
        id.nextElementSibling.style.color='blue';
    }
});

// 비밀번호 확인
password.addEventListener("keyup",function(){
   if(password.value.length==0){
    password.nextElementSibling.innerHTML="비밀번호를 입력하세요";
    password.nextElementSibling.style.color='red';

   } else if(pwInput.test(password.value) ==! true){
    password.nextElementSibling.innerHTML="비밀번호는 영문 대/소문자, 특수문자, 숫자를 사용해주세요";
    password.nextElementSibling.style.color='red';

   } else if(pwInput.test(password.value) == true){
    password.nextElementSibling.innerHTML="사용 가능합니다";
    password.nextElementSibling.style.color='blue';
   }
});

// 비밀번호 재확인
pwConfirm.addEventListener("ketup",function(){
    if(password.value != pwConfirm.value){
        pwConfirm.nextElementSibling.innerHTML="위의 입력하신 비밀번호와 같지 않습니다";
        pwConfirm.nextElementSibling.style.color='red';

    } else if(password.value == pwConfirm.value){
        pwConfirm.nextElementSibling.innerHTML="위의 입력하신 비밀번호와 같습니다";
        pwConfirm.nextElementSibling.style.color='blue';
    }
});

// 이름 확인
nameCheak.addEventListener("keyup",function(){
     if(nameCheak.value.length==0){
        nameCheak.nextElementSibling.innerHTML="이름을 입력하세요";
        nameCheak.nextElementSibling.style.color='red';

     } else if(nameInupt.test(nameCheak.value) !== true){
        nameCheak.nextElementSibling.innerHTML="영문 또는 한글을 이용해 이름을 입력해주세요";
        nameCheak.nextElementSibling.style.color='red';

     } else if(nameInupt.test(nameCheak.value) == true){
        nameCheak.nextElementSibling.innerHTML="사용 가능합니다";
        nameCheak.nextElementSibling.style.color='blue';
     }
});

// 성별 체크
    genderBox.addEventListener("click",function(){    
        genderBox.nextElementSibling.innerHTML="체크 완료";
        genderBox.nextElementSibling.style.color='blue';
 
});
     
// 생년월일
birth.addEventListener("mousedown",function(){
        birth.nextElementSibling.innerHTML="체크완료";
        birth.nextElementSibling.style.color='blue';
   });


// 휴대전화 확인
phone.addEventListener("keyup", function(){
    if(phone.value.length==0){
        phone.nextElementSibling.innerHTML="휴대전화(-포함)를 입력하세요";
        phone.nextElementSibling.style.color='red';

     } else if(phoneInput.test(phone.value) !== true){
        phone.nextElementSibling.innerHTML="사용할 수 있는 휴대전화(-포함)를 입력해주세요";
        phone.nextElementSibling.style.color='red';

     } else if(phoneInput.test(phone.value) == true){
        phone.nextElementSibling.innerHTML="사용 가능합니다";
        phone.nextElementSibling.style.color='blue';
     }
});

// 주소 확인
address.addEventListener("keyup",function(){
    if(address.value.length==0){
        address.nextElementSibling.innerHTML="밀키트를 배송받을 주소를 입력하세요";
        address.nextElementSibling.style.color='red';

     } else if(addressInput.test(address.value) !== true){
        address.nextElementSibling.innerHTML="사용할 수 있는 주소를 입력해주세요";
        address.nextElementSibling.style.color='red';

     } else if(addressInput.test(address.value) == true){
        address.nextElementSibling.innerHTML="사용 가능합니다";
        address.nextElementSibling.style.color='blue';
     }
});

// 이메일 확인
email.addEventListener("keyup",function(){
    if(email.value.length==0){
        email.nextElementSibling.innerHTML="이메일을 입력하세요";
        email.nextElementSibling.style.color='red';

     } else if(emailInput.test(email.value) !== true){
        email.nextElementSibling.innerHTML="사용할 수 있는 이메일을 입력해주세요";
        email.nextElementSibling.style.color='red';

     } else if(emailInput.test(email.value) == true){
        email.nextElementSibling.innerHTML="사용 가능합니다";
        email.nextElementSibling.style.color='blue';
     }
});


// 회원가입 버튼 누를 시 조건 만족하면 로그인 페이지로 이동
btn.addEventListener("click",function(){
    if(true){
        alert("가입을 축하합니다!");
   location.href=("signIn.html");
    } else {
        alert("가입 양식을 다시 한 번 확인해주세요");
    }
});