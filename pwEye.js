// =======================
// 22/07/22 노현
// 눈깔 클릭시 패스워드 노출
// =======================

let eyeOne = document.querySelector('#eye1');
const pw = document.querySelector('#password');

eyeOne.addEventListener('click',function(){
    if(pw.type ==='password'){
        pw.style.marginTop='-2px'; // 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw.type ='text';
    }else if (pw.type ==='text'){
        pw.style.marginTop='-2px';// 클릭시 input[type=password]간격때문에 움직여서 넣음.
        pw.type='password';
    }
})

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