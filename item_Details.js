/* ========================
220725 오슬기 상세 페이지 내 이미지 클릭시 변경되는 js구현, json 이미지데이터 적용 1차 완료
220726 오슬기 json 이미지데이터 2차 완료
220727 오슬기 클릭시 뷰포트이동 기능 구현
===========================*/

let index = location.href.slice(location.href.indexOf("index") + 6);

// JSON 연동하여 아이템 정보 내보내기
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) {
            // console.log(data["korean_food"].length);
            // console.log("접속 성공");
            // console.log(data["korean_food"][0]);

            const item_img_1 = document.querySelector(".main_details_img");
            const item_img_2 = document.querySelector('.subimgbox > .subimg:nth-child(1)');
            const item_img_3 = document.querySelector('.subimgbox > .subimg:nth-child(2)');
            const item_img_4 = document.querySelector('.subimgbox > .subimg:nth-child(3)');
            const item_img_5 = document.querySelector('.subimgbox > .subimg:nth-child(4)');
            const item_title = document.querySelector(".item_name > span");
            const item_price = document.querySelector(".item_price_original > span:nth-child(2)");
            const discount_rate = document.querySelector(".item_price_dcRate > span:nth-child(2)");
            const discount_price = document.querySelector(".item_price_total > span:nth-child(2)");

            const details_detail_btn = document.querySelector('.detail');
            const details_info_btn = document.querySelector('.info');
            const details_review_btn = document.querySelector('.review');
            const details_blog_btn = document.querySelector('.blog');

            const details_detail_img = document.querySelector('.detailimg > img');
            const details_info_img = document.querySelector('.infoimg > img');

            const item_quantity = document.querySelector('.item_quantity > span:nth-child(2) > input');

            item_quantity.addEventListener('change', function () {

                const dc_price_data = data["korean_food"][index].discount_price;
                const price_data = data["korean_food"][index].price;

                let dc_value_slice = dc_price_data.slice(0, dc_price_data.indexOf(",")) + dc_price_data.slice(dc_price_data.indexOf(",") + 1, dc_price_data.indexOf("원"));
                let value_slice = price_data.slice(0, price_data.indexOf(",")) + price_data.slice(price_data.indexOf(",") + 1, price_data.indexOf("원"));

                let dc_value = dc_value_slice * this.value;
                let value = value_slice * this.value;

                if (dc_value >= 1000000) {
                    discount_price.innerHTML = (String(dc_value).slice(0, -6)) + "," + (String(dc_value).slice(1, -3)) + "," + (String(dc_value).slice(-3)) + "원";
                } else {
                    discount_price.innerHTML = (String(dc_value).slice(0, -3)) + "," + (String(dc_value).slice(-3)) + "원";
                }

                if (value >= 1000000) {
                    item_price.innerHTML = (String(value).slice(0, -6)) + "," + (String(value).slice(1, -3)) + "," + (String(value).slice(-3)) + "원";
                } else {
                    item_price.innerHTML = (String(value).slice(0, -3)) + "," + (String(value).slice(-3)) + "원";
                }
            })
            
            item_img_1.style.background = `url(${data["korean_food"][index].main_img1}) 50% 50%/100% no-repeat`; //메인사진
            item_img_2.style.background = `url(${data["korean_food"][index].main_img2}) 50% 50%/100% no-repeat`; //서브사진1
            item_img_3.style.background = `url(${data["korean_food"][index].main_img3}) 50% 50%/100% no-repeat`; //서브사진2
            item_img_4.style.background = `url(${data["korean_food"][index].main_img4}) 50% 50%/100% no-repeat`; //서브사진3
            item_img_5.style.background = `url(${data["korean_food"][index].main_img5}) 50% 50%/100% no-repeat`; //서브사진4
            item_title.innerHTML = data["korean_food"][index].item_Name;
            item_price.innerHTML = data["korean_food"][index].price;
            discount_rate.innerHTML = data["korean_food"][index].discount_rate;
            discount_price.innerHTML = data["korean_food"][index].discount_price;
            details_detail_img.setAttribute('src', data["korean_food"][index].details_img1);
            details_info_img.setAttribute('src', data["korean_food"][index].shipping_img1);

            const mainDetailsImg = document.querySelector('.main_details_img');
            const subImg = document.querySelectorAll('.subimg');
            const subImgBox = document.querySelector('.subimgbox');

            //서브이미지 클릭 시 메인사진변경 
            for (let i = 0; i < subImg.length; i++) {
                if (data["korean_food"][index].main_img2 != "") {
                    subImg[i].addEventListener('click', function () {
                        mainDetailsImg.style.background = subImg[i].style.background;
                    });
                } else if (data["korean_food"][index].main_img2 == "") {
                    console.log("as");
                    subImgBox.style.display = 'none';
                }
            };


            //서브이미지div에서 마우스가 밖으로 나가면 메인사진으로 다시 보이는 기능 
            subImgBox.addEventListener('mouseout',function(){
                item_img_1.style.background = `url(${data["korean_food"][index].main_img1}) 50% 50%/100% no-repeat`;
            })




        }
    })
});





// 페이지 상단으로
// 22/07/24 성선규 추가
const up_btn = document.querySelector(".scroll_up_container > div");

up_btn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})


const bodymenu_detail_btn = document.querySelectorAll(".bodymenubox>.detail");
const bodymenu_info_btn = document.querySelectorAll(".bodymenubox>.info");
const bodymenu_review_btn = document.querySelectorAll(".bodymenubox>.review");
const bodymenu_blog_btn = document.querySelectorAll(".bodymenubox>.blog");
const bodymenubox = document.querySelectorAll(".bodymenubox");

for (let i = 0; i < bodymenu_detail_btn.length; i++) {
    bodymenu_detail_btn[i].addEventListener("click", function () {
        bodymenubox[0].scrollIntoView();
    });
    bodymenu_info_btn[i].addEventListener("click", function () {
        bodymenubox[1].scrollIntoView();
    });
    bodymenu_review_btn[i].addEventListener("click", function () {
        bodymenubox[2].scrollIntoView();
    });
    bodymenu_blog_btn[i].addEventListener("click", function () {
        bodymenubox[3].scrollIntoView();
    });
};
