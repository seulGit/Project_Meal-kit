/*
=================================
22/07/20 김정치 신상품 자동 캐로셀 
=================================
*/

let newProduct = document.querySelector('.Newproduct');
let con = document.querySelector('#container');
let prev = document.querySelectorAll('.prev');
let next = document.querySelectorAll('.next')
// let recentBox = document.querySelector('.recent_box');



// 22/07/28 김정치 성선규 클릭 이벤트 후 링크 이동 및 클릭 미적용 해결 
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) {                                              // 인덱스값 적용이 안되서 카테고리별로 제어
            const imgBox = document.querySelectorAll(".productImage");                      // 신상품 카테고리 이미지 태그
            const imgBox2 = document.querySelectorAll(".recommendImg");                     // 추천상품 카테고리 이미지 태그
            const imgBox3 = document.querySelectorAll(".salesImg");                         // 할인상품 카테고리 이미지 태그
            const product_title = document.querySelectorAll(".productTitle");
            const recommend_title = document.querySelectorAll(".recommendTitle");
            const sales_title = document.querySelectorAll(".salesTitle");
            for(let i = 0; i < imgBox.length; i++){
                                                                                            // JSON 이미지 정보 적용
                imgBox[i].setAttribute("src", `${data["korean_food"][i].main_img}`);        // 신상품 카테고리
                imgBox2[i].setAttribute("src", `${data["korean_food"][i+7].main_img}`);     // 추천상품 카테고리
                imgBox3[i].setAttribute("src", `${data["korean_food"][i+11].main_img}`);    // 할인상품 카테고리

                product_title[i].innerHTML = `${data["korean_food"][i].item_Name}`;
                recommend_title[i].innerHTML = `${data["korean_food"][i+7].item_Name}`;
                sales_title[i].innerHTML = `${data["korean_food"][i+11].item_Name}`;
                                                                                            // 상세페이지로 이동
                imgBox[i].addEventListener("click", function(){                             // 신상품 카테고리
                    for(let j = 0; j < data["korean_food"].length; j++){

                        if(imgBox[i].getAttribute("src") == data["korean_food"][j].main_img){
                            location.href = "item_Details.html?index=" + j;
                        }
                    }
                })
                imgBox2[i].addEventListener("click", function(){                            // 추천상품 카테고리
                    for(let j = 0; j < data["korean_food"].length; j++){

                        if(imgBox2[i].getAttribute("src") == data["korean_food"][j+7].main_img){
                            location.href = "item_Details.html?index=" + j+7;
                        }
                    }
                })
                imgBox3[i].addEventListener("click", function(){                            // 할인상품 카테고리
                    for(let j = 0; j < data["korean_food"].length; j++){

                        if(imgBox3[i].getAttribute("src") == data["korean_food"][j+11].main_img){
                            location.href = "item_Details.html?index=" + j+11;
                        }
                    }
                })
            }
        }
    })
});


let swiper = new Swiper(".mySwiper", {

    slidesPerView: 4,           // 아이템 갯수
    spaceBetween: 30,           // 아이템 사이 간격 유지
    // loop: true,                 // 무한 루프
    autoplay: {                 // 자동 캐러셀 시작
        delay: 2000,            // 캐로셀 이동시간
        disableOnInteraction: false,  // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true,      // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: {               // 22/07/28 네비게이션 적용
        nextEl: ".next",
        prevEl: ".prev",
    },
});

let swiperReview = new Swiper(".mySwiperReview", {
    slidesPerView: 4,           // 아이템 갯수
    spaceBetween: 30,           // 아이템 사이 간격 유지
    loop: true,                 // 무한 루프
    autoplay: {                 // 자동 캐러셀 시작
        delay: 2000,            // 캐로셀 이동시간
        disableOnInteraction: false,  // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
        pauseOnMouseEnter: true,      // 마우스오버시 자동 캐러셀 멈춤
    },
    navigation: {               // 22/07/28 네비게이션 적용
        nextEl: ".next",
        prevEl: ".prev",
    },
});
let swiperBlog = new Swiper(".mySwiperBlog", {
    slidesPerView: 1,           // 아이템 갯수
    loop: true,                 // 무한 루프
    // autoplay: {                 // 자동 캐러셀 시작
    //     delay: 3000,            // 캐로셀 이동시간
    //     disableOnInteraction: false,  // 자동 캐러셀 이외 동작 이후도 자동 적용 // true시에는 클릭이동 후 정지
    //     pauseOnMouseEnter: true,      // 마우스오버시 자동 캐러셀 멈춤
    // }
});
