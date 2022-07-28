/*
=================================
22/07/20 김정치 신상품 자동 캐로셀 
=================================
*/

let newProduct = document.querySelector('.Newproduct');
let con = document.querySelector('#container');
let prev = document.querySelectorAll('.prev');
let next = document.querySelectorAll('.next')

let btn = document.querySelectorAll('.productBtn');
let recentBox = document.querySelector('.recent_box');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function (e) {
        recentBox.innerHTML = btn[i].children[0].children[0].outerHTML;
        console.log(btn[i].children[0].children[0].attributes[0].nodeValue);
        console.dir(btn[i].children[0].children[0].attributes[0].nodeValue);
    })
}


let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4, // 아이템 갯수
    spaceBetween: 30, // 아이템 사이 간격 유지
    loop: true, // 무한 루프
    autoplay: { // 자동 캐러셀 시작
        delay: 2000, // 캐로셀 이동시간
        disableOnInteraction: false, // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true, // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: { // 22/07/20 네비게이션 아직 적용 안됨
        nextEl: ".next",
        prevEl: ".prev",
    },
});
let swiperBlog = new Swiper(".mySwiperBlog", {
    slidesPerView: 1, // 아이템 갯수
    loop: true, // 무한 루프
    autoplay: { // 자동 캐러셀 시작
        delay: 3000, // 캐로셀 이동시간
        disableOnInteraction: false, // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true, // 마우스오버시 자동 캐러셀 멈춤
    }
});
s