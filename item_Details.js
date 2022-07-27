/* ========================
220725 오슬기 상세 페이지 내 이미지 클릭시 변경되는 js구현, json 이미지데이터 적용 1차 완료
220726 오슬기 json 이미지데이터 2차 완료
===========================*/



const mainDetailsImg = document.querySelector('.main_details_img');
const subImg = document.querySelectorAll('.subimg');

//서브이미지 클릭 시 메인사진변경 
for (let i = 0; i < subImg.length; i++) {
    subImg[i].addEventListener('click', function () {
        mainDetailsImg.style.background = subImg[i].style.background;
    })
};






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


            item_img_1.style.background = `url(${data["korean_food"][0].main_img1}) 50% 50%/100% no-repeat`;
            item_img_2.style.background = `url(${data["korean_food"][0].main_img2}) 50% 50%/100% no-repeat`;
            item_img_3.style.background = `url(${data["korean_food"][0].main_img3}) 50% 50%/100% no-repeat`;
            item_img_4.style.background = `url(${data["korean_food"][0].main_img4}) 50% 50%/100% no-repeat`;
            item_img_5.style.background = `url(${data["korean_food"][0].main_img5}) 50% 50%/100% no-repeat`;
            item_title.innerHTML = data["korean_food"][0].item_Name;
            item_price.innerHTML = data["korean_food"][0].price;
            discount_rate.innerHTML = data["korean_food"][0].discount_rate;
            discount_price.innerHTML = data["korean_food"][0].discount_price;
            details_detail_img.setAttribute('src',data["korean_food"][0].details_img1);
            details_info_img.setAttribute('src',data["korean_food"][0].shipping_img1);



            // details_detail_btn.addEventListener('click')
            // .style.background = `url(${data["korean_food"][0].main_details1}) 50% 50%/100% no-repeat`;

        }
    })
});

