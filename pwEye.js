// =======================
// 22/07/22 노현
// 눈깔 클릭시 패스워드 노출
// =======================

let eyeOne = document.querySelector('#eye1'); // input 안 아이콘 아이디값
const pw = document.querySelector('#password'); // input 비밀번호 아이디값

// 토글기능
eyeOne.addEventListener('click',function(){
    if(pw.type ==='password'){ // 클릭시 타입이 패스워드라면
        pw.style.marginTop='-2px'; // 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw.type ='text'; // 텍스트로 다시 바꿔주고
    }else if (pw.type ==='text'){ // 클릭시 타입이 텍스트라면
        pw.style.marginTop='-2px';// 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw.type='password'; // 패스워드로 다시 바꿔주고
    }
})


// 비밀번호 확인 . 위랑 똑같은거 .
let eyeTwo = document.querySelector('#eye2'); 
const pw2 = document.querySelector('#pwConfirm');

eyeTwo.addEventListener('click',function(){
    if(pw2.type ==='password'){
        pw2.style.marginTop='-2px';// 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw2.type ='text';
    }else if (pw2.type ==='text'){
        pw2.style.marginTop='-2px';// 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw2.type='password';
    }
})