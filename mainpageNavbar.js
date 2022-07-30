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
const topOfNav = nav.offsetTop; //offset은 대상의 위치값을 나타낸다.
// window.pageYOffset
// documnet가 수직으로 스크롤 된 만큼의 픽셀 값을 계산하는 윈도우 속성
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= topOfNav) { // pageYOffset 대신 scrollY도 가능
        // document.body.classList.add("fixed-nav"); 오류나서 안됨 이유는 모르겠음.
        nav.style.position = 'fixed'; // 위에꺼 오류나서 직접 fixed값 줬음
        nav.style.top = '0'; // 탑에 붙이려고
        nav.style.width = '100vw'; // 스크롤 내릴때 사이즈 그대로 가져가려고 넣음.
        nav.style.zIndex = '100'; // 22/07/21 성선규 추가 : 다른 요소에 네비게이션바가 묻혀서 해당 내용 추가
    }
    else {
        nav.style.position = '';
         // ==================================
        // 22/07/21 노현 수정
        // 네비바 움직일때 & 서있을때 밑줄 추가 
        // ==================================
        nav.style.borderBottom='3px solid rgb(255, 69, 0)'; // 스크롤 내렸다가 다시 돌아왔을때 네비바 포인트색상 사라져서 추가. 
        nav.style.boxShadow='none'; // 가만히 있을때 포인트색상(boderbottom)이랑 겹쳐있어서 none 넣었음.
       
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
    // if (window.pageYOffset >= 800){//네비바 밑 메인이미지 Y축길이가 200~800 정도라서 수치를 저렇게 잡음. // 22/07/22 노현 수정 - 필요없어져서 주석처리.
        // nav.style.backgroundColor=''; // 22/07/22 노현 수정 - 스크롤할때 백그라운드 전부 흰색주려고 주석처리.
        // nav.style.opacity=1; // 22/07/21 노현 수정 - 투명도 빼버림
    if (window.pageYOffset >= 155 ){
        nav.style.backgroundColor='white'; // 스크롤 내려서 155 이상일때 백그라운드 허옇게
        // ==================================
        // 22/07/21 노현 수정
        // 네비바 움직일때 & 서있을때 밑줄 추가
        // ==================================
        nav.style.borderStyle='none'; // 스크롤 내릴때 포인트색상 빠지고 회색섀도우 색나오게끔
        nav.style.boxShadow='0 3px 2px 0 rgba(192, 192, 192, 0.6)'; // 스크롤 내릴때 포인트색상 빠지고 회색섀도우 색나오게끔
        
        // nav.style.opacity=0.8; // 22/07/21 노현 수정 - 투명도 빼버림
    }
});
// y축 좌표 확인할때 씀
// window.addEventListener('scroll', function () {
//     console.log(window.pageYOffset)
// });


