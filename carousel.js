/*
=================================
22/07/20 김정치 신상품 자동 캐로셀 
=================================
*/

//22/07/28 성선규 추가
// 최근 본 상품, 찜한상품, 장바구니 박스 컨트롤을 위한 변수 선언 
let recent_item_count = JSON.parse(window.localStorage.getItem("recent")).length;
let select_item_count = JSON.parse(window.localStorage.getItem("Cart")).length;
let like_item_count = JSON.parse(window.localStorage.getItem("favorite")).length;

if(recent_item_count == 0){
    recent_item_count = 1;
}
if(select_item_count == 0){
    select_item_count = 1;
}
if(like_item_count == 0){
    like_item_count = 1;
}

//22/07/29 성선규 추가
// 장바구니 로컬 스터리지를 위한 배열 선언
let Cart_Array = new Array();
if (window.localStorage.getItem("Cart") === null) { // 만약 페이지를 처음 방문한다면 null값으로 되어 있어 확인 후
    window.localStorage.setItem("Cart", JSON.stringify(Cart_Array)); // 첫 방문이라면 빈 배열로 초기화
}

//22/07/30 성선규 추가
// 최근 본 상품 로컬 스터리지를 위한 배열 선언
let recent_Array = new Array();
if (window.localStorage.getItem("recent") === null) { // 만약 페이지를 처음 방문한다면 null값으로 되어 있어 확인 후
    window.localStorage.setItem("recent", JSON.stringify(recent_Array)); // 첫 방문이라면 빈 배열로 초기화
}

//22/07/30 성선규 추가
// 최근 본 상품 로컬 스터리지를 위한 배열 선언
let favorite_Array = new Array();
if (window.localStorage.getItem("favorite") === null) { // 만약 페이지를 처음 방문한다면 null값으로 되어 있어 확인 후
    window.localStorage.setItem("favorite", JSON.stringify(favorite_Array)); // 첫 방문이라면 빈 배열로 초기화
}

// 22/07/30 성선규 구현
recent_Array = JSON.parse(window.localStorage.getItem('recent')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기


let newProduct = document.querySelector('.Newproduct');
let con = document.querySelector('#container');
let prev = document.querySelectorAll('.prev');
let next = document.querySelectorAll('.next')
let recommendItemBox = document.querySelector('.recommendItem');


// 22/07/29 김정치 사이드 추천상품박스 좌측 등장 이벤트 

let isVisible = false;

window.addEventListener('scroll', function () {
    if (checkVisible($('.Recommend')) && !isVisible) {
        recommendItemBox.style.left = '0';
        isVisible = !isVisible;
    } else if (isVisible = !isVisible) {
        recommendItemBox.style.left = '-10vw';
        isVisible = isVisible;
    }
});

// 22/07/29 김정치 스크롤시 특정 시점 이벤트 적용을 위해 참조하였음 
function checkVisible(elm, eval) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}
// 김정치 사이드 추천상품박스 좌측 등장 이벤트 끝


// 22/07/28 김정치 성선규 클릭 이벤트 후 링크 이동 및 클릭 미적용 해결 
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) { // 인덱스값 적용이 안되서 카테고리별로 제어
            const imgBox = document.querySelectorAll(".productImage"); // 신상품 카테고리 이미지 태그
            const imgBox2 = document.querySelectorAll(".recommendImg"); // 추천상품 카테고리 이미지 태그
            const imgBox3 = document.querySelectorAll(".salesImg"); // 할인상품 카테고리 이미지 태그
            const product_title = document.querySelectorAll(".productTitle"); // 신상품 카테고리 타이틀 태그
            const recommend_title = document.querySelectorAll(".recommendTitle"); // 추천상품 카테고리 타이틀 태그
            const sales_title = document.querySelectorAll(".salesTitle"); // 할인상품 카테고리 타이틀 태그
            const product_price = document.querySelectorAll(".productPrice"); // 신상품 카테고리 가격 태그
            const recommend_price = document.querySelectorAll(".recommendPrice"); // 추천상품 카테고리 가격 태그
            const discounted_price = document.querySelectorAll(".discountedPrice"); // 할인상품 카테고리 할인 후 가격 태그
            const sales_price = document.querySelectorAll(".salesPrice"); // 할인상품 카테고리 할인 전 가격 태그

            const recoImgBox = document.querySelector(".recoImgBoxImg"); // 추천상품 박스 이미지 태그
            const recoItemTitle = document.querySelector(".recoItemTitle"); // 추천상품 박스 타이틀 태그
            for (let i = 0; i < imgBox.length; i++) {
                // 22/07/29 김정치 JSON 정보 적용
                // JSON 이미지 정보 적용
                imgBox[i].setAttribute("src", `${data["korean_food"][i].main_img}`); // 신상품 카테고리
                imgBox2[i].setAttribute("src", `${data["korean_food"][i+7].main_img}`); // 추천상품 카테고리
                imgBox3[i].setAttribute("src", `${data["korean_food"][i+10].main_img}`); // 할인상품 카테고리
                recoImgBox.setAttribute("src", `${data["korean_food"][7].main_img}`); // 추천상품 박스 카테고리

                // JSON 아이템 타이틀 적용
                product_title[i].innerHTML = `${data["korean_food"][i].item_Name}`; // 신상품 카테고리
                recommend_title[i].innerHTML = `${data["korean_food"][i+7].item_Name}`; // 추천상품 카테고리
                sales_title[i].innerHTML = `${data["korean_food"][i+10].item_Name}`; // 할인상품 카테고리
                recoItemTitle.innerHTML = `${data["korean_food"][7].item_Name}`; // 추천상품 박스 카테고리

                // JSON 아이템 가격 적용
                product_price[i].innerHTML = `${data["korean_food"][i].price}`; // 신상품 카테고리
                recommend_price[i].innerHTML = `${data["korean_food"][i+7].price}`; // 추천상품 카테고리
                sales_price[i].innerHTML = `${data["korean_food"][i+10].price}`; // 할인 전 가격 카테고리
                discounted_price[i].innerHTML = `${data["korean_food"][i+10].discount_price}`; // 할인 후 가격 카테고리

                // 상세페이지로 이동 시작
                imgBox[i].addEventListener("click", function () { // 신상품 카테고리
                    for (let j = 0; j < data["korean_food"].length; j++) {

                        if (imgBox[i].getAttribute("src") == data["korean_food"][j].main_img) {
                            //22/07/30 성선규 추가
                            recent_Array.push(j); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                            window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 배열을 JSON으로 변환 후 localStorage의 'recent'에 저장
                            
                            location.href = "item_Details.html?index=" + j;
                        }
                    }
                })
                imgBox2[i].addEventListener("click", function () { // 추천상품 카테고리
                    for (let j = 0; j < data["korean_food"].length; j++) {

                        if (imgBox2[i].getAttribute("src") == data["korean_food"][j + 7].main_img) {
                            //22/07/30 성선규 추가
                            recent_Array.push(j + 7); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                            window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 배열을 JSON으로 변환 후 localStorage의 'recent'에 저장
                            
                            location.href = "item_Details.html?index=" + (j + 7);
                        }
                    }
                })
                imgBox3[i].addEventListener("click", function () { // 할인상품 카테고리
                    for (let j = 0; j < data["korean_food"].length; j++) {

                        if (imgBox3[i].getAttribute("src") == data["korean_food"][j + 10].main_img) {
                            //22/07/30 성선규 추가
                            recent_Array.push(j + 10); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                            window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 배열을 JSON으로 변환 후 localStorage의 'recent'에 저장
                            
                            location.href = "item_Details.html?index=" + (j + 10);
                        }
                    }
                })
                // 상세페이지로 이동 끝
            }
            recoImgBox.addEventListener("click", function () { // 추천상품 박스 카테고리
                if (recoImgBox.getAttribute("src") == data["korean_food"][7].main_img) {
                    //22/07/30 성선규 추가
                    recent_Array.push(7); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                    window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 배열을 JSON으로 변환 후 localStorage의 'recent'에 저장
                    
                    location.href = "item_Details.html?index=" + 7;
                }
            })
        }
    })
});

// 22/07/30 김정치 상품 카테고리 스와이퍼 오토 캐러셀 시작

let swiper = new Swiper(".mySwiper", {

    slidesPerView: 4, // 아이템 갯수
    spaceBetween: 30, // 아이템 사이 간격 유지
    // loop: true,                 // 무한 루프
    autoplay: { // 자동 캐러셀 시작
        delay: 2000, // 캐로셀 이동시간
        disableOnInteraction: false, // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true, // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: { // 22/07/28 네비게이션 적용
        nextEl: ".next",
        prevEl: ".prev",
    },
});

// 22/07/30 김정치 리뷰 카테고리 스와이퍼 오토 캐러셀 시작
let swiperReview = new Swiper(".mySwiperReview", {
    slidesPerView: 4, // 아이템 갯수
    spaceBetween: 30, // 아이템 사이 간격 유지
    loop: true, // 무한 루프
    autoplay: { // 자동 캐러셀 시작
        delay: 2000, // 캐로셀 이동시간
        disableOnInteraction: false, // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true, // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: { // 22/07/28 네비게이션 적용
        nextEl: ".next",
        prevEl: ".prev",
    },
});

// 22/07/30 김정치 블로그 카테고리 스와이퍼 오토 캐러셀 시작
let swiperBlog = new Swiper(".mySwiperBlog", {
    slidesPerView: 1, // 아이템 갯수
    loop: true, // 무한 루프
    autoplay: { // 자동 캐러셀 시작
        delay: 3000, // 캐로셀 이동시간
        disableOnInteraction: false, // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true, // 마우스오버시 자동 캐러셀 멈춤
    }
});