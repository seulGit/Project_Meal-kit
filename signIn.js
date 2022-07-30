/*
=========================================================
220725 이은지 
       아이디, 비밀번호 정규표현식 작성
       조건문 작성
       버튼 누를 시 메인페이지, 회원가입 창 이동
220726 선규 피드백 회원가입 버튼 클릭 시 alert창 삭제 요청 
       -> 피드백 반영 했음
=========================================================
*/

let id = document.querySelector('#id'); // input 아이디
let pw = document.querySelector('#pw'); // input 비밀번호
let loginBtn = document.querySelector('.loginBtn'); // 로그인 버튼
let signUpBtn = document.querySelector('.signUpBtn'); // 회원가입 버튼

const idInput = /^[a-zA-Z0-9]*$/; 
// 아이디 영문(대,소문자 상관없이), 숫자 작성해야함
const pwInput = /(?=.*\d)+(?=.*[~`!@#$%\^&*()-+=])+(?=.*[a-z])(?=.*[A-Z])+.{1,}$/;
// 비밀번호 - 영문(대,소문자), 특수문자, 숫자 1개 이상 작성해야함

loginBtn.addEventListener("click",function(){
     if(id.value.length==0){
        alert('아이디를 입력해주세요'); // 아이디를 적지 않았을 때
     }
     else if(id.value.length>15 || id.value.length<5 ){ // 아이디 글자 수가 맞지 않았을 때
        alert("아이디는 5~15자 이내로 입력해주세요");

     } else if(idInput.test(id.value)==true){ // 아이디 값이 맞을 때
       
        if(pw.value.length==0){                 // 비밀번호를 적지 않았을 때
        alert("비밀번호를 입력해주세요");
       
    } else if(pwInput.test(pw.value) ==! true){   // 비밀번호가 맞지 않을 때
        alert("비밀번호는 영문(대,소문자)과 특수문자, 숫자를 입력해주세요");
    
    } else if(pwInput.test(pw.value)==true){  // 비밀 번호가 맞을 때
        location.href="mainpage.html"; 
        // 로그인 버튼 눌렀을 시 모든 조건이 true이면
        // 메인페이지로 넘어감                                    
       }
     }
});


// 회원가입 버튼을 누를 때 회원가입 창으로 이동
// location객체는 문서의 주소와 관련된 객체로 window 객체의 속성
signUpBtn.addEventListener("click",function(){         
    location.href="signUp.html";
});



