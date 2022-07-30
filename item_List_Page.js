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
//22/07/28 성선규
//height가 800 이하로 내려가면 위치 변경
// 장바구니, 찜하기, 최근 본 상품 컨테이너에 요소 추가 및 삭제 구현
//=======================================

$.noConflict();
let _$ = jQuery;

// 22/07/22 성선규 html 아이템 박스를 동적으로 생성하기 위한 선언
const item_section = document.querySelector(".container section:nth-child(3)");


function create_item_box() {
    const new_div_item = document.createElement("div");
    const new_div_img_span = document.createElement("div");
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


    //<span class="material-symbols-outlined">
    //  favorite
    //</span>
    new_span1.setAttribute("class", "material-symbols-outlined");
    new_span1.className += " favorite";
    new_span1.append(new_icon_favorite);

    //<span class="material-symbols-outlined">
    //  shopping
    //</span>
    new_span2.setAttribute("class", "material-symbols-outlined");
    new_span2.className += " shopping"
    new_span2.append(new_icon_shopping);

    //<div class="item_img_1"></div>
    new_div_img.setAttribute("class", "item_img_1");

    //<div>
    //  <span class="material-symbols-outlined">
    //      favorite
    //  </span>
    //  <span class="material-symbols-outlined">
    //      shopping
    //  </span>
    //</div>
    new_div_img_span.append(new_span1);
    new_div_img_span.append(new_span2);

    //<div>
    //  <div class="item_img_1"></div>
    //      <span class="material-symbols-outlined">
    //          shopping
    //      </span>
    //</div>
    new_div_img_span.append(new_div_img);

    //<div>
    //  <div>
    //      <div class="item_img_1"></div>
    //    <span class="material-symbols-outlined">
    //      shopping_cart
    //    </span>
    //  </div>
    //</div>
    new_div_item.append(new_div_img_span);

    //<div class="item">
    //  <div>
    //      <div class="item_img_1"></div>
    //    <span class="material-symbols-outlined">
    //      shopping_cart
    //    </span>
    //  </div>
    //</div>
    new_div_item.setAttribute("class", "item");

    //<section>
    //  <div class="item">
    //      <div>
    //        <div class="item_img_1"></div>
    //          <span class="material-symbols-outlined">
    //            shopping_cart
    //          </span>
    //      </div>
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

//22/07/28 성선규 추가
// 최근 본 상품, 찜한상품, 장바구니 박스 컨트롤을 위한 변수 선언
let recent_item_count = 1;
let select_item_count = 1;
let like_item_count = 1;

let Ls = new Array();
let Cart;

// JSON 연동하여 아이템 정보 내보내기
_$(document).ready(function () {
    _$(function () {
        _$.ajax({
            type: 'get',
            url: 'item_List.json',
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data["korean_food"].length; i++) {
                    create_item_box();
                }
                console.log(window.localStorage.getItem('Cart'))
                // window.localStorage.setItem('Cart', JSON.stringify(Ls))
                // 로컬스토리지 구현
                Cart = JSON.parse(window.localStorage.getItem('Cart'))
                for (let i = 0; i < Cart.length; i++) {
                    const select_item = document.querySelector(".select_item");
                    let select_box_div = document.createElement("div");
                    let close_icon = document.createElement("img");
                    close_icon.setAttribute("class", "close_icon");
                    close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png");
                    select_box_div.append(close_icon);
                    select_item.append(select_box_div);

                    select_box_div.style.background = `url(${data["korean_food"][Cart[i]].main_img}) 50% 50%/100% no-repeat`;
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

                const recent_item = document.querySelector(".recent_item");
                const select_item = document.querySelector(".select_item");
                const like_item = document.querySelector(".like_item");

                for (let i = 0; i < data["korean_food"].length; i++) {
                    item_img_1[i].style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`;
                    item_title[i].innerHTML = data["korean_food"][i].item_Name;
                    item_info[i].innerHTML = data["korean_food"][i].item_info;
                    item_price[i].innerHTML = data["korean_food"][i].price;
                    discount_rate[i].innerHTML = data["korean_food"][i].discount_rate;
                    discount_price[i].innerHTML = data["korean_food"][i].discount_price;

                    // 22/07/28 성선규 추가
                    // 아이템 클릭 시 해당 아이템 최근 본 상품 박스에 추가
                    item_img_1[i].addEventListener("click", function () {
                        let select_box_div = document.createElement("div"); // 새로운 div 생성
                        let close_icon = document.createElement("img"); // 새로운 img 태그 생성
                        close_icon.setAttribute("class", "close_icon"); // 생성한 img에 class 추가
                        close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png"); // img에 이미지 주소 추가
                        select_box_div.append(close_icon); // div 안쪽에 img 태그 추가
                        recent_item.append(select_box_div); // 장바구니 박스에 div 추가
                        const recent_box_div_img = document.querySelector(`.recent_item > div:nth-child(${recent_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                        recent_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 장바구니 박스에 넣은 div에 백그라운드 이미지 추가
                        recent_item_count++; // 순서 증가
                        // location.href = "item_Details.html?index=" + i; // 주소값 뒤에 i값을 키:벨류 형태로 전달
                    })

                    // 22/07/28 성선규 추가
                    // 장바구니 아이콘 클릭 시 해당 아이템 장바구니 박스에 추가
                    shopping_icon[i].addEventListener("click", function () {
                        let select_box_div = document.createElement("div"); // 새로운 div 생성
                        let close_icon = document.createElement("img"); // 새로운 img 태그 생성
                        close_icon.setAttribute("class", "close_icon"); // 생성한 img에 class 추가
                        close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png"); // img에 이미지 주소 추가
                        select_box_div.append(close_icon); // div 안쪽에 img 태그 추가
                        select_item.append(select_box_div); // 장바구니 박스에 div 추가
                        const select_box_div_img = document.querySelector(`.select_item > div:nth-child(${select_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                        select_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 장바구니 박스에 넣은 div에 백그라운드 이미지 추가
                        const select_check = document.querySelector("#select");
                        select_check.checked = true; // 요소가 추가될 경우 radio 체크되면서 view 전환
                        select_item_count++; // 순서 증가

                        // 로컬스토리지
                        Ls.push(i);
                        console.log(Ls);
                        Cart = JSON.stringify(Ls);
                        window.localStorage.setItem('Cart', Cart);
                    })


                    //22/07/28 성선규 추가
                    // 찜하기 아이콘 클릭 시 해당 아이템 찜한 상품 박스에 추가
                    favorite_icon[i].addEventListener("click", function () {
                        let select_box_div = document.createElement("div");
                        let close_icon = document.createElement("img");
                        close_icon.setAttribute("class", "close_icon");
                        close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png");
                        select_box_div.append(close_icon);
                        like_item.append(select_box_div);
                        const like_box_div_img = document.querySelector(`.like_item > div:nth-child(${like_item_count})`);
                        like_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`;
                        const like_check = document.querySelector("#like");
                        like_check.checked = true;
                        like_item_count++;
                    })

                    // 22/07/27 성선규
                    // 장바구니 아이콘 클릭시 이벤트 실행
                    let flag = true;
                    shopping_icon[i].addEventListener("click", function () {
                        if (flag) {
                            shopping_alarm.classList.add("move_alarm"); // 알람 박스에 애니메이션CSS가 선언되어있는 클래스 추가
                            shopping_alarm.style.display = "flex";
                            shopping_alarm.style.opacity = "1";
                            shopping_alarm_img.style.background = `url(${data["korean_food"][i].sub_main_img}) 50% 50%/100% no-repeat`; // 알람 박스에 해당 아이템 이미지 삽입
                            setTimeout(function () { // 애니메이션이 4초동안 유지 4.001초 후에 해당 코드 실행
                                shopping_alarm.classList.remove("move_alarm"); // 애니메이션 CSS가 선언되어 있는 클래스 삭제
                                shopping_alarm.style.opacity = "0";
                                flag = !flag;
                            }, 4001);
                        }
                    })
                    // 22/07/27 성선규
                    // 찜하기 아이콘 클릭시 이벤트 실행
                    let flag1 = true;
                    favorite_icon[i].addEventListener("click", function () {
                        console.log(flag1)
                        if (flag1) {
                            shopping_alarm.classList.add("move_alarm");
                            shopping_alarm.style.display = "flex";
                            shopping_alarm.style.opacity = "1";
                            like_alarm_img.style.background = `url(${data["korean_food"][i].sub_main_img}) 50% 50%/100% no-repeat`;
                            setTimeout(function () {
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
                    close_shopping_alarm.addEventListener("click", function () {
                        shopping_alarm.style.display = "none";
                    })
                    // 찜하기 알람 사라지도록 구현
                    close_like_alarm.addEventListener("click", function () {
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
media_basket_btn.addEventListener("click", function () {
    if (media_basket_flag == true) {
        basket_box_icon.innerHTML = "chevron_left"; // 아이콘 모양 변경
        media_basket_btn.style.transform = "translateX(200px)" // 버튼 위치 변경
        basket_box.style.transform = "translateX(0px)"; // 장바구니 컨테이너 위치 변경
        basket_box.style.display = "block"; // 장바구니 컨테이너 보이기
        media_basket_flag = !media_basket_flag; // 플래그 전환
    } else {
        basket_box_icon.innerHTML = "chevron_right"; // 아이콘 모양 변경
        media_basket_btn.style.transform = "translateX(0px)"
        basket_box.style.transform = "translateX(-210px)";
        media_basket_flag = !media_basket_flag;
    }
})

// 로컬스토리지
window.onload = function () {
    // const select_item = document.querySelector(".select_item");
    // let select_box_div = document.createElement("div");
    // let close_icon = document.createElement("img");
    // close_icon.setAttribute("class", "close_icon");
    // close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png");
    // select_box_div.append(close_icon);
    // select_item.append(select_box_div);

    // select_box_div.style.background
}

// 22/07/27 성선규
// width가 1300px 왔다갔다 할 경우 basket_box가 사라지는 버그 발견
// 미디어 쿼리 버그 수정
window.addEventListener("resize", function () {
    if (window.innerWidth < 1300) {
        media_basket_flag = true;
        basket_box_icon.innerHTML = "chevron_right";
        media_basket_btn.style.transform = "translateX(0)";
        basket_box.style.transform = "translateX(-210px)";
    } else {
        basket_box.style.transform = "translateX(0px)";
    }
    // 22/07/28 성선규 추가 : height가 800 이하로 내려가면 위치 변경
    if (window.innerHeight < 800) {
        basket_box.style.top = "150px";
    } else {
        basket_box.style.top = "320px";
    }
})

// 장바구니 및 찜한 상품 이미지에 x 버튼 클릭 시 해당 아이템 삭제
basket_box.addEventListener("mouseover", function () {
    // 최근 본 상품
    const recent_close_icon = document.querySelectorAll(".recent_item > div > .close_icon");
    const recent_box_item = document.querySelectorAll(".recent_item > div");
    const recent_item = document.querySelector(".recent_item");
    for (let i = 0; i < recent_close_icon.length; i++) {
        recent_close_icon[i].addEventListener("click", function () {
            recent_item.removeChild(recent_box_item[i]);
            recent_item_count--;
        })
    }
    // 장바구니
    // select_close_icon.addEventListener("click", function (e) {
    // console.dir(e.target);
    // Ls.splice(i, 1);
    // console.log(Ls)
    // Cart = JSON.stringify(Ls);
    // window.localStorage.setItem('Cart', Cart);
    // select_item.removeChild(select_box_item[i]);
    // select_item_count--;
    const select_item = document.querySelector(".select_item");
    _$(document).ready(function () {
        _$(".select_item > div > .close_icon").on("click", function (e) {
            console.log(_$('.select_item > div').index(_$(this).parent()));
            Ls.splice(_$('.select_item > div').index(_$(this).parent()), 1);
            console.log(Ls)
            Cart = JSON.stringify(Ls);
            window.localStorage.setItem('Cart', Cart);
            select_item.removeChild(_$('.select_item > div')[_$('.select_item > div').index(_$(this).parent())]);
            select_item_count--;
        });
    })
    
    // 찜한 상품
    const like_close_icon = document.querySelectorAll(".like_item > div > .close_icon")
    const like_box_item = document.querySelectorAll(".like_item > div");
    const like_item = document.querySelector(".like_item");
    for (let i = 0; i < like_close_icon.length; i++) {
        like_close_icon[i].addEventListener("click", function () {
            like_item.removeChild(like_box_item[i]);
            like_item_count--;
        })
    }

})