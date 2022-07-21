/*
============================
22/07/19 노현
네비바 스크롤 고정 생성
============================
22/07/21 성선규
네비바 z-index 추가
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
        nav.style.zIndex = '100'; // 22/07/21 성선규 추가 : 다른 요소에 네비게이션바가 묻혀서 해당 내용 추가
    }
    else {
        nav.style.position = '' // 
        // document.body.classList.remove("fixed-nav"); 오류나서 안됨 이유는 모르겠음.
    }
/*
22/07/20 노현
네비바 스크롤했을때 백그라운드 속성값 주는거 수정.
*/
    // if문 조건값이 적용되버려서
    // 아래 else if문이 적용되지않기때문에 위 아래 바꿈.
    // if (window.pageYOffset >= 200){
    //     nav.style.backgroundColor='white';
    //     nav.style.opacity=0.8;
    // }else if (window.pageYOffset >= 800){
    //     nav.style.backgroundColor='';
    //     nav.style.opacity=1;
    // }
    if (window.pageYOffset >= 800){//네비바 밑 메인이미지 Y축길이가 200~800 정도라서 수치를 저렇게 잡음.
        nav.style.backgroundColor='';
        nav.style.opacity=1;
    }else if (window.pageYOffset >= 200 ){
        nav.style.backgroundColor='white';
        nav.style.opacity=0.8;
    }
});
// window.addEventListener('scroll', function () {
//     console.log(window.pageYOffset)
// });
