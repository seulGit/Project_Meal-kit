/*
=================================
22/07/20 김정치 신상품 자동 캐로셀 
=================================
*/

let newProduct = document.querySelector('.Newproduct');

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,           // 아이템 갯수
    spaceBetween: 30,           // 아이템 사이 간격 유지
    loop: true,                 // 무한 루프
    centeredSlides: true,
    autoplay: {                 // 자동 캐러셀 시작
        delay: 2000,            // 캐로셀 이동시간
        disableOnInteraction: false,  // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true,      // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: {               // 22/07/20 네비게이션 아직 적용 안됨
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});