/*
============================
22/07/19 노현
네비바 스크롤 고정 생성
============================
*/
const nav = document.querySelector('.navbar'); // 네비바 부분
const topOfNav = nav.offsetTop;

window.addEventListener('scroll', function () {
    if (window.pageYOffset >= topOfNav) { // pageYOffset 대신 scrollY도 가능
        // document.body.classList.add("fixed-nav"); 오류나서 안됨 이유는 모르겠음.
        nav.style.position = 'fixed' // 위에꺼 오류나서 직접 fixed값 줬음
        nav.style.top = '0' // 탑에 붙이려고
        nav.style.width = '100%' // 스크롤 내릴때 사이즈 그대로 가져가려고 넣음.
    }
    else {
        nav.style.position = '' // 
        // document.body.classList.remove("fixed-nav"); 오류나서 안됨 이유는 모르겠음.
    }

    // 
    if (window.pageYOffset >= 800){
        nav.style.backgroundColor='';
        nav.style.opacity=1;
    }else if (window.pageYOffset >= 200 ){
        nav.style.backgroundColor='white';
        nav.style.opacity=0.8;
    }
});
window.addEventListener('scroll', function () {
    console.log(window.pageYOffset)
});
