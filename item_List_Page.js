//=======================================
//22/7/20 성선규
// JSON을 Jquery로 AJAX를 이용하여 연동하여 아이템 정보 가져오기
//=======================================
//22/07/24 성선규
// 가격검색 및 텍스트 검색 기능 추가
// 최상단으로 이동할수 있는 버튼 기능 추가
// 아이템 박스를 동적으로 생성하는 코드 추가
//=======================================
//22/07/26 성선규
// 미디어 쿼리에 부가기능 추가
//=======================================
//22/07/27 성선규
// 미디어 쿼리 버그 픽스
// 장바구니, 찜하기 알람창 구현
//=======================================

// 22/07/22 성선규 html 아이템 박스를 동적으로 생성하기 위한 선언
const item_section = document.querySelector(".container section:nth-child(3)");


function create_item_box() {
    const new_div_item = document.createElement("div");
    const new_div_img = document.createElement("div");
    const new_div_title = document.createElement("div");
    const new_div_price = document.createElement("div");
    const new_span1 = document.createElement("span");
    const new_span2 = document.createElement("span");
    const new_span_price = document.createElement("span");
    const new_h1 = document.createElement("h1");
    const new_h3 = document.createElement("h3");
    const new_h4 = document.createElement("h4");
    const new_i = document.createElement("i");
    const new_icon_shopping = document.createTextNode("shopping_cart");
    const new_icon_favorite = document.createTextNode("favorite");


    //<span class="material-symbols-outlined">favorite</span>
    new_span1.setAttribute("class", "material-symbols-outlined");
    new_span1.className += " favorite";
    new_span1.append(new_icon_favorite);

    //<span class="material-symbols-outlined">shopping</span>
    new_span2.setAttribute("class", "material-symbols-outlined");
    new_span2.className += " shopping"
    new_span2.append(new_icon_shopping);

    //<div class="item_img_1"></div>
    new_div_img.setAttribute("class", "item_img_1");

    //<div><span class="material-symbols-outlined">favorite</span></div>
    //<div><span class="material-symbols-outlined">shopping</span></div>
    new_div_img.append(new_span1);
    new_div_img.append(new_span2);

    //<div><div class="item_img_1"><span class="material-symbols-outlined">shopping</span></div></div>
    new_div_item.append(new_div_img);

    //<div class="item">
    //  <div class="item_img_1">
    //    <span class="material-symbols-outlined">
    //      shopping_cart
    //    </span>
    //  </div>
    //</div>
    new_div_item.setAttribute("class", "item");

    //<section>
    //  <div class="item">
    //    <div class="item_img_1">
    //      <span class="material-symbols-outlined">
    //        shopping_cart
    //      </span>
    //    </div>
    //  </div>
    //</section>
    item_section.append(new_div_item);


    //<div>
    //  <h1></h1>
    //  <h3></h3>
    //</div>
    new_div_title.append(new_h1);
    new_div_title.append(new_h3);


    //<div class="title">
    //  <h1></h1>
    //  <h3></h3>
    //</div>
    new_div_title.setAttribute("class", "title");


    //<section>
    //  <div class="item">
    //    <div class="item_img_1">
    //      <span class="material-symbols-outlined">
    //        shopping_cart
    //      </span>
    //    </div>
    //    <div class="title">
    //      <h1></h1>
    //      <h3></h3>
    //    </div>
    //  </div>
    //</section>
    new_div_item.append(new_div_title);


    //<div class="price"></div>
    new_div_price.setAttribute("class", "price")


    //<div class="price">
    //  <i></i>
    //  <span></span>
    //  <h4></h4>
    //</div>
    new_div_price.append(new_i);
    new_div_price.append(new_span_price);
    new_div_price.append(new_h4);

    //<section>
    //  <div class="item">
    //    <div class="item_img_1">
    //      <span class="material-symbols-outlined">
    //        shopping_cart
    //      </span>
    //      <span class="material-symbols-outlined">
    //        favorite
    //      </span>
    //    </div>
    //    <div class="title">
    //      <h1></h1>
    //      <h3></h3>
    //    </div>
    //    <div class="price">
    //      <i></i>
    //      <span></span>
    //      <h4></h4>
    //    </div>
    //  </div>
    //</section>
    new_div_item.append(new_div_price);
}


// 가격 검색 값을 보여주기 위한 선언
const price_value = document.querySelector("input[type=range]");
const price_search = document.querySelector("#price_value");

price_value.oninput = function () {
    let value = Math.ceil(this.value / 10) * 10; // 가격 input value를 1의 자리에서 올림
    if (value < 10000) { // value가 10000 이하라면 앞의 자릿수 하나 + 나머지 뒤의 자릿수를 출력
        price_search.innerHTML = String(value).slice(0, 1) + "," + String(value).slice(-3);
    } else { // value가 10000 이상이라면 앞의 자릿수 두개 + 나머지 뒤의 자릿수를 출력
        price_search.innerHTML = String(value).slice(0, 2) + "," + String(value).slice(-3);
    }
    search_value(this.value); // 가격 검색 input의 값이 변경 시 검색 함수 호출
}

// 텍스트 검색 기능 구현
// 22/07/24 성선규 추가
const search = document.querySelector("input[type=text]");
search.addEventListener("keyup", function (e) { // input 박스에 값이 들어간 후 키업 할때
    search_value();
})


// 가격 검색과 텍스트 검색을 동시에 진행하기 위한 함수 선언
// 22/07/24 성선규 추가
function search_value(value) {
    const price_h4 = document.querySelectorAll(".price > h4");
    const search_item = document.querySelectorAll("div.item");
    const item_title = document.querySelectorAll(".title > h1");
    const item_info = document.querySelectorAll(".title > h3");

    for (let i = 0; i < price_h4.length; i++) {

        // 상품의 가격을 콤마를 기준으로 나눈 뒤 합치기
        let value = price_h4[i].innerHTML.slice(0, price_h4[i].innerHTML.indexOf(",")) + price_h4[i].innerHTML.slice(price_h4[i].innerHTML.indexOf(",") + 1, 6);

        // 상품의 이름 확인 -> 부가설명 확인 -> 가격 범위 확인
        if ((item_title[i].innerHTML.toUpperCase().includes(search.value.toUpperCase()) ||
                item_info[i].innerHTML.toUpperCase().includes(search.value.toUpperCase())) &&
            parseInt(price_value.value) > parseInt(value)) {
            search_item[i].style.display = "flex";
        } else {
            search_item[i].style.display = "none";
        }
    }
}

// JSON 연동하여 아이템 정보 내보내기
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i < data["korean_food"].length; i++) {
                create_item_box();
            }
            const item_img_1 = document.querySelectorAll(".item_img_1");
            const item_title = document.querySelectorAll(".title > h1");
            const item_info = document.querySelectorAll(".title > h3");
            const item_price = document.querySelectorAll(".price > i");
            const discount_rate = document.querySelectorAll(".price > span");
            const discount_price = document.querySelectorAll(".price > h4");
            
            // 22/07/27 성선규
            // 알람 기능 구현을 위한 요소 정보 받아오기
            const shopping_alarm = document.querySelector(".shopping_alarm");
            const like_alarm = document.querySelector(".like_alarm");
            const shopping_alarm_img = document.querySelector(".shopping_alarm_img");
            const like_alarm_img = document.querySelector(".like_alarm_img");
            const shopping_icon = document.querySelectorAll(".shopping");
            const favorite_icon = document.querySelectorAll(".favorite");

            for (let i = 0; i < data["korean_food"].length; i++) {
                item_img_1[i].style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`;
                item_title[i].innerHTML = data["korean_food"][i].item_Name;
                item_info[i].innerHTML = data["korean_food"][i].item_info;
                item_price[i].innerHTML = data["korean_food"][i].price;
                discount_rate[i].innerHTML = data["korean_food"][i].discount_rate;
                discount_price[i].innerHTML = data["korean_food"][i].discount_price;

                // 22/07/27 성선규
                // 장바구니 아이콘 클릭시 이벤트 실행
                let flag = true;
                shopping_icon[i].addEventListener("click", function(){
                    if(flag){
                        shopping_alarm.classList.add("move_alarm"); // 알람 박스에 애니메이션CSS가 선언되어있는 클래스 추가
                        shopping_alarm.style.display = "flex";
                        shopping_alarm.style.opacity = "1";
                        shopping_alarm_img.style.background = `url(${data["korean_food"][i].sub_main_img}) 50% 50%/100% no-repeat`; // 알람 박스에 해당 아이템 이미지 삽입
                        setTimeout(function(){ // 애니메이션이 4초동안 유지 4.001초 후에 해당 코드 실행
                            shopping_alarm.classList.remove("move_alarm"); // 애니메이션 CSS가 선언되어 있는 클래스 삭제
                            shopping_alarm.style.opacity = "0";
                            flag = !flag;
                        }, 4001);
                    }
                })
                // 22/07/27 성선규
                // 찜하기 아이콘 클릭시 이벤트 실행
                let flag1 = true;
                favorite_icon[i].addEventListener("click", function(){
                    console.log(flag1)
                    if(flag1){
                        shopping_alarm.classList.add("move_alarm");
                        shopping_alarm.style.display = "flex";
                        shopping_alarm.style.opacity = "1";
                        like_alarm_img.style.background = `url(${data["korean_food"][i].sub_main_img}) 50% 50%/100% no-repeat`;
                        setTimeout(function(){
                            shopping_alarm.classList.remove("move_alarm");
                            shopping_alarm.style.opacity = "0";
                            flag1 = !flag1;
                            console.log(flag1)
                        }, 4001);
                    }
                })

                // 22/07/27 성선규
                // 알람창 X버튼 클릭시 사라지도록 구현
                const close_shopping_alarm = document.querySelector(".shopping_alarm img");
                const close_like_alarm = document.querySelector(".like_alarm img");
                // 장바구니 알람 사라지도록 구현
                close_shopping_alarm.addEventListener("click", function(){
                    shopping_alarm.style.display = "none";
                })
                // 찜하기 알람 사라지도록 구현
                close_like_alarm.addEventListener("click", function(){
                    like_alarm.style.display = "none";
                })


                // 아이템 메인 이미지에 mouseover 시 이미지 변경
                item_img_1[i].addEventListener("mouseover", function () {
                    if (data["korean_food"][i].sub_main_img != "") { // json에 데이터가 있을 경우에 코드 실행
                        item_img_1[i].style.background = `url(${data["korean_food"][i].sub_main_img}) 50% 50%/100% no-repeat`;
                        item_img_1[i].style.transition = "all 0.5s";
                    }
                })

                // 마우스 아웃시 원래 이미지로 변경
                item_img_1[i].addEventListener("mouseout", function () {
                    item_img_1[i].style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`;
                })
            }
        }
    });

});


// 페이지 상단으로
// 22/07/24 성선규 추가
const up_btn = document.querySelector(".scroll_up_container > div");

up_btn.addEventListener("click", function () {
    window.scrollTo({
        top: 0, // 최상단으로
        left: 0, // 왼쪽으로
        behavior: 'smooth' // 애니메이션 부드럽게
    });
})

// 22/07/26 성선규
// 미디어 쿼리에 부가기능 추가
const media_basket_btn = document.querySelector(".media_basket_btn_box");
const basket_box = document.querySelector(".basket_box");
const basket_box_icon = document.querySelector(".media_basket_btn_box > div > span")
let media_basket_flag = true;
media_basket_btn.addEventListener("click", function(){
    if(media_basket_flag == true){
        basket_box_icon.innerHTML = "chevron_left";
        media_basket_btn.style.transform = "translateX(200px)"
        basket_box.style.transform = "translateX(0px)";
        basket_box.style.display = "block";
        media_basket_flag = !media_basket_flag;
    } else{
        basket_box_icon.innerHTML = "chevron_right";
        media_basket_btn.style.transform = "translateX(0px)"
        basket_box.style.transform = "translateX(-210px)";
        media_basket_flag = !media_basket_flag;
    }
})

// 22/07/27 성선규
// width가 1300px 왔다갔다 할 경우 basket_box가 사라지는 버그 발견
// 미디어 쿼리 버그 수정
window.addEventListener("resize", function(){
    if(window.innerWidth < 1300){
        media_basket_flag = true;
        basket_box_icon.innerHTML = "chevron_right";
        media_basket_btn.style.transform = "translateX(0)";
        basket_box.style.transform = "translateX(-210px)";
    } else{
        basket_box.style.transform = "translateX(0px)";
    }
})