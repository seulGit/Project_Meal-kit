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
//22/07/29 성선규
// 로컬스터리지 구현
// 제이쿼리 충돌방지 구현
//=======================================
//22/07/30 성선규
// 로컬스터리지 버그 픽스
// 장바구니, 찜하기, 최근 본 상품 컨테이너를 각기 다른 이벤트에 구현
//=======================================

// 22/07/29 성선규 추가
// 제이쿼리 충돌방지를 위해 $ -> jQuery -> _$ 로 변경
$.noConflict();
let _$ = jQuery;

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
    if (value < 1000) { // value가 10000 이하라면 앞의 자릿수 하나 + 나머지 뒤의 자릿수를 출력
        price_search.innerHTML = value;
    } else if (value < 10000){
        price_search.innerHTML = String(value).slice(0, 1) + "," + String(value).slice(-3);
    } else{ // value가 10000 이상이라면 앞의 자릿수 두개 + 나머지 뒤의 자릿수를 출력
        price_search.innerHTML = String(value).slice(0, 2) + "," + String(value).slice(-3);
    }
    search_value(this.value); // 가격 검색 input의 값이 변경 시 검색 함수 호출
}


// 22/07/24 성선규 추가
// 텍스트 검색 기능 구현
const search = document.querySelector("input[type=text]");
search.addEventListener("keyup", function (e) { // input 박스에 값이 들어간 후 키업 할때
    search_value(); // input 박스에 이벤트 실행시 검색 함수 호출
})


// 22/07/24 성선규 추가
// 가격 검색과 텍스트 검색을 동시에 진행하기 위한 함수 선언
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
    // 22/07/30 성선규
    // 아이템 검색시 결과가 없을 경우 empty_item 보이기
    let empty_count = 0; // 아이템을 카운팅하기 위해서
    for(let i = 0; i < search_item.length; i++){ // 아이템 갯수만큼 반복
        if(search_item[i].style.display == "none"){ // 인덱스 0번째 아이템부터 끝까지 스타일 display가 none인지
            empty_count++; // display가 none이라면 카운트 증가
            if(empty_count == search_item.length){ // empty_count가 아이템 갯수와 같다면
                document.querySelector(".empty_item").style.display = "flex"; // empty_item 보이기
            }
        } else{ // empty_count가 아이템 갯수와 같지 않다면
            document.querySelector(".empty_item").style.display = "none"; // empty_item 숨기기
        }
    }
}


//22/07/29 성선규 추가
// jqeury 충돌 방지
_$(document).ready(function () {
    // JSON 연동하여 아이템 정보 내보내기
    _$(function () {
        _$.ajax({
            type: 'get',
            url: 'item_List.json',
            dataType: 'json',
            success: function (data) {

                for (let i = 0; i < data["korean_food"].length; i++) { // JSON에 존재하는 "korean_food"안의 객체 갯수만큼 반복
                    create_item_box(); // 객체 갯수만큼 상품 정보가 들어가는 요소 생성
                }

                // 위에서 생성한 상품 정보가 들어가는 요소의 정보를 받아오기
                const item_img_1 = document.querySelectorAll(".item_img_1"); // 상품의 메인 이미지가 들어가는 div
                const item_title = document.querySelectorAll(".title > h1"); // 상품의 제목이 들어가는 h1
                const item_info = document.querySelectorAll(".title > h3"); // 상품의 부제목이 들어가는 h3
                const item_price = document.querySelectorAll(".price > i"); // 상품의 원래 가격이 들어가는 i
                const discount_rate = document.querySelectorAll(".price > span"); // 상품의 할인률이 들어가는 span
                const discount_price = document.querySelectorAll(".price > h4"); // 상품의 할인 후 가격이 들어가는 h4


                // 22/07/27 성선규
                // 알람 기능 구현을 위한 요소 정보 받아오기
                const shopping_alarm = document.querySelector(".shopping_alarm"); // 장바구니 알람
                const like_alarm = document.querySelector(".like_alarm"); // 찜하기 알람
                const shopping_alarm_img = document.querySelector(".shopping_alarm_img"); // 장바구니 알람 안쪽 이미지
                const like_alarm_img = document.querySelector(".like_alarm_img"); // 찜하기 알람 안쪽 이미지
                const shopping_icon = document.querySelectorAll(".shopping"); // 상품 이미지 안쪽의 장바구니 아이콘
                const favorite_icon = document.querySelectorAll(".favorite"); // 상품 이미지 안쪽의 찜하기 아이콘

                const recent_item = document.querySelector(".recent_item"); // 최근 본 상품
                const select_item = document.querySelector(".select_item"); // 찜한 상품
                const like_item = document.querySelector(".like_item"); // 장바구니 



                //22/07/29 성선규 추가
                // 장바구니 로컬스토리지 구현
                Cart_Array = JSON.parse(window.localStorage.getItem('Cart')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기
                for (let i = 0; i < Cart_Array.length; i++) { // 받아온 아이템 갯수만큼 반복
                    const select_item = document.querySelector(".select_item"); // 장바구니 안쪽 div 요소 정보 할당
                    let select_box_div = document.createElement("div"); // 새로운 div 생성
                    let close_icon = document.createElement("span"); // 새로운 span 생성
                    close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 위에서 만든 span에 클래스 부여
                    close_icon.innerHTML = "close";
                    select_box_div.append(close_icon); // span을 새로 만든 div 안에 자식요소로 이동
                    select_item.append(select_box_div); // span이 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

                    // 새로 만든 div에 로컬스터리지에 저장되어 있던 상품의 index값을 가져와 index값에 맞는 이미지 할당
                    select_box_div.style.background = `url(${data["korean_food"][Cart_Array[i]].main_img}) 50% 50%/100% no-repeat`;
                }

                //22/07/30 성선규 추가
                // 최근 본 상품 로컬스토리지 구현
                recent_Array = JSON.parse(window.localStorage.getItem('recent')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기
                for (let i = 0; i < recent_Array.length; i++) { // 받아온 아이템 갯수만큼 반복
                    const recent_item = document.querySelector(".recent_item"); // 장바구니 안쪽 div 요소 정보 할당
                    let recent_box_div = document.createElement("div"); // 새로운 div 생성
                    let close_icon = document.createElement("span"); // 새로운 img 생성
                    close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 위에서 만든 span에 클래스 부여
                    close_icon.innerHTML = "close";
                    recent_box_div.append(close_icon); // span을 새로 만든 div 안에 자식요소로 이동
                    recent_item.append(recent_box_div); // span이 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

                    // 새로 만든 div에 로컬스터리지에 저장되어 있던 상품의 index값을 가져와 index값에 맞는 이미지 할당
                    recent_box_div.style.background = `url(${data["korean_food"][recent_Array[i]].main_img}) 50% 50%/100% no-repeat`;
                }

                //22/07/30 성선규 추가
                // 찜하기 로컬스토리지 구현
                favorite_Array = JSON.parse(window.localStorage.getItem('favorite')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기
                for (let i = 0; i < favorite_Array.length; i++) { // 받아온 아이템 갯수만큼 반복
                    const like_item = document.querySelector(".like_item"); // 장바구니 안쪽 div 요소 정보 할당
                    let favorite_box_div = document.createElement("div"); // 새로운 div 생성
                    let close_icon = document.createElement("span"); // 새로운 span 생성
                    close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 위에서 만든 span 클래스 부여
                    close_icon.innerHTML = "close";
                    favorite_box_div.append(close_icon); // span에 새로 만든 div 안에 자식요소로 이동
                    like_item.append(favorite_box_div); // span이 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

                    // 새로 만든 div에 로컬스터리지에 저장되어 있던 상품의 index값을 가져와 index값에 맞는 이미지 할당
                    favorite_box_div.style.background = `url(${data["korean_food"][favorite_Array[i]].main_img}) 50% 50%/100% no-repeat`;
                }



                for (let i = 0; i < data["korean_food"].length; i++) { // JSON에 "korean_food"에 들어있는 객체의 갯수만큼 반복
                    item_img_1[i].style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 메인 이미지 할당
                    item_title[i].innerHTML = data["korean_food"][i].item_Name; // 상품 제목 출력
                    item_info[i].innerHTML = data["korean_food"][i].item_info; // 상품 부제목 출력
                    item_price[i].innerHTML = data["korean_food"][i].price; // 상품 원래 가격 출력
                    discount_rate[i].innerHTML = data["korean_food"][i].discount_rate; // 상품 할인률 출력
                    discount_price[i].innerHTML = data["korean_food"][i].discount_price; // 상품 할인 후 가격 출력



                    // 22/07/28 성선규 추가
                    // 아이템 클릭 시 해당 아이템 최근 본 상품 박스에 추가
                    item_img_1[i].addEventListener("click", function (e) {
                        console.log(recent_item_count)
                        let select_box_div = document.createElement("div"); // 새로운 div 생성
                        let close_icon = document.createElement("span"); // 새로운 img 태그 생성
                        close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 생성한 span에 class 추가
                        close_icon.innerHTML = "close";
                        select_box_div.append(close_icon); // div 안쪽에 span 태그 추가
                        recent_item.append(select_box_div); // 장바구니 박스에 div 추가
                        console.dir(recent_item)
                        const recent_box_div_img = document.querySelector(`.recent_item > div:nth-child(${recent_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                        recent_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 장바구니 박스에 넣은 div에 백그라운드 이미지 추가
                        recent_item_count++; // 순서 증가


                        //22/07/30 성선규 추가
                        recent_Array.push(i); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                        window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 배열을 JSON으로 변환 후 localStorage의 'recent'에 저장


                        // 22/07/28 성선규 : 주소값 뒤에 i값을 키:벨류 형태로 전달
                        location.href = "item_Details.html?index=" + i;  
                    })

                    // 22/07/28 성선규 추가
                    // 장바구니 아이콘 클릭 시 해당 아이템 장바구니 박스에 추가
                    shopping_icon[i].addEventListener("click", function () {
                        let select_box_div = document.createElement("div"); // 새로운 div 생성
                        let close_icon = document.createElement("span"); // 새로운 span 태그 생성
                        close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 생성한 span에 class 추가
                        close_icon.innerHTML = "close";
                        select_box_div.append(close_icon); // div 안쪽에 span 태그 추가
                        select_item.append(select_box_div); // 장바구니 박스에 div 추가
                        const select_box_div_img = document.querySelector(`.select_item > div:nth-child(${select_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                        select_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 장바구니 박스에 넣은 div에 백그라운드 이미지 추가
                        const select_check = document.querySelector("#select");
                        select_check.checked = true; // 요소가 추가될 경우 radio 체크되면서 view 전환
                        select_item_count++; // 순서 증가

                        //22/07/30 성선규 추가
                        Cart_Array.push(i); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                        window.localStorage.setItem('Cart', JSON.stringify(Cart_Array)); // 배열을 JSON으로 변환 후 localStorage의 'Cart'에 저장
                    })


                    //22/07/28 성선규 추가
                    // 찜하기 아이콘 클릭 시 해당 아이템 찜한 상품 박스에 추가
                    favorite_icon[i].addEventListener("click", function () {
                        let select_box_div = document.createElement("div"); // 새로운 div 생성
                        let close_icon = document.createElement("span"); // 새로운 span 태그 생성
                        close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 생성한 span에 class 추가
                        close_icon.innerHTML = "close";
                        select_box_div.append(close_icon); // div 안쪽에 span 태그 추가
                        like_item.append(select_box_div); // 장바구니 박스에 div 추가
                        const like_box_div_img = document.querySelector(`.like_item > div:nth-child(${like_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                        like_box_div_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 찜하기 박스에 넣은 div에 백그라운드 이미지 추가
                        const like_check = document.querySelector("#like");
                        like_check.checked = true; // 요소가 추가될 경우 radio 체크되면서 view 전환
                        like_item_count++; // 순서 증가

                        //22/07/30 성선규 추가
                        favorite_Array.push(i); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                        window.localStorage.setItem('favorite', JSON.stringify(favorite_Array)); // 배열을 JSON으로 변환 후 localStorage의 'favorite'에 저장
                    })

                    // 22/07/27 성선규
                    // 장바구니 아이콘 클릭시 이벤트 실행
                    let flag = true;
                    shopping_icon[i].addEventListener("click", function () {
                        if (flag) { // true 값일 때 실행
                            shopping_alarm.classList.add("move_alarm"); // 알람 박스에 애니메이션CSS가 선언되어있는 클래스 추가
                            shopping_alarm.style.display = "flex";
                            shopping_alarm.style.opacity = "1";
                            shopping_alarm_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 알람 박스에 해당 아이템 이미지 삽입
                            flag = !flag; // 다시 실행시키지 못하도록 false로 변경
                            setTimeout(function () { // 애니메이션이 4초동안 유지 4.001초 후에 해당 코드 실행
                                shopping_alarm.classList.remove("move_alarm"); // 애니메이션 CSS가 선언되어 있는 클래스 삭제
                                shopping_alarm.style.opacity = "0";
                                flag = !flag; // true로 변경하여 다시 실행할수 있도록 변경
                            }, 4001);
                        }
                    })
                    // 22/07/27 성선규
                    // 찜하기 아이콘 클릭시 이벤트 실행
                    let flag1 = true;
                    favorite_icon[i].addEventListener("click", function () {
                        if (flag1) { // true 값일 때 실행
                            like_alarm.classList.add("move_alarm"); // 알람 박스에 애니메이션CSS가 선언되어있는 클래스 추가
                            like_alarm.style.display = "flex";
                            like_alarm.style.opacity = "1";
                            like_alarm_img.style.background = `url(${data["korean_food"][i].main_img}) 50% 50%/100% no-repeat`; // 알람 박스에 해당 아이템 이미지 삽입
                            flag1 = !flag1; // 다시 실행시키지 못하도록 false로 변경
                            setTimeout(function () { // 애니메이션이 4초동안 유지 4.001초 후에 해당 코드 실행
                                like_alarm.classList.remove("move_alarm"); // 애니메이션 CSS가 선언되어 있는 클래스 삭제
                                like_alarm.style.opacity = "0";
                                flag1 = !flag1; // true로 변경하여 다시 실행할수 있도록 변경
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

//22/07/30 성선규 추가
// 최근 본 상품 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const recent_item = document.querySelector(".recent_item"); // 최근 본 상품 컨테이너 요소 정보 할당
recent_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    _$(".recent_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨
        if (_$(".recent_item > div").index(_$(this).parent()) != -1) {
            recent_Array.splice(_$('.recent_item > div').index(_$(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            recent_item.removeChild(_$('.recent_item > div')[_$('.recent_item > div').index(_$(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            recent_item_count--; // 카운트 감소
        }
    })
})


//22/07/30 성선규 추가
// 찜하기 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const like_item = document.querySelector(".like_item"); // 최근 본 상품 컨테이너 요소 정보 할당
like_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    _$(".like_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨
        if (_$(".like_item > div").index(_$(this).parent()) != -1) {
            favorite_Array.splice(_$('.like_item > div').index(_$(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('favorite', JSON.stringify(favorite_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            like_item.removeChild(_$('.like_item > div')[_$('.like_item > div').index(_$(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            like_item_count--; // 카운트 감소
        }
    })
})


//22/07/30 성선규 추가
// 장바구니 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const select_item = document.querySelector(".select_item"); // 최근 본 상품 컨테이너 요소 정보 할당

select_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    _$(".select_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨
        if (_$('.select_item > div').index(_$(this).parent()) != -1) {
            Cart_Array.splice(_$('.select_item > div').index(_$(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('Cart', JSON.stringify(Cart_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            select_item.removeChild(_$('.select_item > div')[_$('.select_item > div').index(_$(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            select_item_count--; // 카운트 감소
        }
    });
})