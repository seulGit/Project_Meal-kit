// 가격 검색을 위한 선언
const price_value = document.querySelector("input[type=range]");
const price_search = document.querySelector("#price_value");
// JSON 연동을 위한 선언
// const item_container = document.querySelectorAll(".item");
const icon = document.querySelectorAll(".material-symbols-outlined");

// 22/07/22 성선규 html 아이템 박스를 동적으로 생성하기 위한 선언
const item_section = document.querySelector(".container section:nth-child(3)");
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

function create_item_box() {
    //<span class="material-symbols-outlined">favorite</span>
    new_span1.setAttribute("class", "material-symbols-outlined");
    new_span1.append(new_icon_favorite);

    //<span class="material-symbols-outlined">shopping</span>
    new_span2.setAttribute("class", "material-symbols-outlined");
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
    //      shopping
    //    </span>
    //  </div>
    //</div>
    new_div_item.setAttribute("class", "item");

    //<section>
    //  <div class="item">
    //    <div class="item_img_1">
    //      <span class="material-symbols-outlined">
    //        shopping
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
    //        shopping
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
    //        shopping
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








// 가격 선택 value 값
price_value.oninput = function () {
    if (this.value < 10000) {
        price_search.innerHTML = this.value.slice(0, 1) + "," + this.value.slice(-3);
    } else {
        price_search.innerHTML = this.value.slice(0, 2) + "," + this.value.slice(-3);
    }
}

// JSON 연동하여 아이템 정보 내보내기
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) {
            // console.log(data["item"].length)
            // console.log("접속 성공");
            // console.log(data["item"][0]);
            for(let i = 0; i < 12; i++){
                create_item_box();
            }
                const item_img = document.querySelectorAll(".item_img_1");
                const item_title = document.querySelectorAll(".title > h1");
                const item_info = document.querySelectorAll(".title > h3");
                const item_price = document.querySelectorAll(".price > i");
                const discount_rate = document.querySelectorAll(".price > span");
                const discount_price = document.querySelectorAll(".price > h4");
            for (let i = 0; i < data["item"].length; i++) {
                item_img[i].style.background = `url(${data["item"][i].img}) 50% 50%/100% no-repeat`;
                item_title[i].innerHTML = data["item"][i].item_Name;
                item_info[i].innerHTML = data["item"][i].item_info;
                item_price[i].innerHTML = data["item"][i].price;
                discount_rate[i].innerHTML = data["item"][i].discount_rate;
                discount_price[i].innerHTML = data["item"][i].discount_price;
                // 아이템 메인 이미지에 mouseover 시 이미지 변경
                item_img[i].addEventListener("mouseover", function () {
                    item_img[i].style.background = `url(${data["item"][i].sub_main_img}) 50% 50%/100% no-repeat`;
                    item_img[i].style.transition = "all 0.5s";
                })
                item_img[i].addEventListener("mouseout", function () {
                    item_img[i].style.background = `url(${data["item"][i].img}) 50% 50%/100% no-repeat`;
                })
            }
        }
    });

});
// 아이템 이미지 안쪽 아이콘 띄우기
for (let i = 0; i < item_img.length; i++) {
    item_img[i].addEventListener("mouseover", function (event) {
        event.target.childNodes[1].style.transform = "translateY(0)";
        event.target.childNodes[3].style.transform = "translateY(0)";
    });
    item_img[i].addEventListener("mouseout", function (event) {
        event.target.childNodes[1].style.transform = "translateY(50px)";
        event.target.childNodes[3].style.transform = "translateY(50px)";
    })
    icon[i].addEventListener("mouseover", function (event) {
        event.target.style.transform = "translateY(0)";
    })
}

// 아이템 리스트