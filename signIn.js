/*
===============================================
220725 이은지 아이디, 비밀번호 정규표현식 작성
       조건문 작성
       버튼 누를 시 메인페이지, 회원가입 창 이동
===============================================
*/

let id = document.querySelector('#id'); // input 아이디
let pw = document.querySelector('#pw'); // input 비밀번호
let loginBtn = document.querySelector('.loginBtn'); // 로그인 버튼
let signUpBtn = document.querySelector('.signUpBtn'); // 회원가입 버튼

const idInput = /^[a-zA-Z0-9]*$/;
// 아이디 영문 대, 소문자, 숫자 작성해야함
const pwInput =/(?=.*[a-zA-Z])+(?=.*[~`!@#$%\^&*()-+=])+(?=.*[a-zA-Z])+.{1,}$/
// 비밀번호 영문(대소문자 상관없이), 특수문자, 숫자 1개 이상 작성해야함


loginBtn.addEventListener("click",function(){
     if(id.value.length==0){
        alert('아이디를 입력해주세요'); // 아이디를 적지 않았을 때
     }
     else if(id.value.length>15 || id.value.length<5 ){ // 아이디 글자 수가 맞지 않았을 때
        alert("5~15자 이내로 입력해주세요");

     } else if(idInput.test(id.value)==true){ // 아이디 값이 맞을 때
       
        if(pw.value.length==0){                 // 비밀번호를 적지 않았을 때
        alert("비밀번호를 입력해주세요");
       
    } else if(pwInput.test(pw.value)==!true){   // 비밀번호가 맞지 않을 때
        alert("비밀번호는 영문과 특수문자, 숫자를 입력해주세요");
    
    } else if(pwInput.test(pw.value)==true){  // 비밀 번호가 맞을 때
        location.href="mainpage.html"; 
        // 로그인 버튼 눌렀을 시 모든 조건이 true이면
        // 메인페이지로 넘어감                                    
       }
     }
});


// 회원가입 버튼을 누를 때 confirm으로 회원가입 창으로 이동

let answer; 
// 변수 선언 이유
// confirm에서 취소를 누를 때에도 회원가입 창으로 이동이 됨
// 변수선언 하지 않고 confirm 자체에 
// if/else if 조건문을 주었을 때에 어떤 것이 true, false인지 인식되지 않아 실행되지 않음 

signUpBtn.addEventListener("click",function(){    
    
   answer = confirm("회원가입하시겠습니까?");
    if(answer == true){          // 변수의 값이 true일 때 회원가입 창으로 이동
    location.href="signUp.html";
    }
});



