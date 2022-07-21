// 가격 검색을 위한 선언
const price_value = document.querySelector("input[type=range]");
const price_search = document.querySelector("#price_value");
// JSON 연동을 위한 선언
const item_container = document.querySelectorAll(".item");
const item_img = document.querySelectorAll(".item_img_1");
const item_title = document.querySelectorAll(".title > h1");
const item_info = document.querySelectorAll(".title > h3");
const item_price = document.querySelectorAll(".price > i");
const discount_rate = document.querySelectorAll(".price > span");
const discount_price = document.querySelectorAll(".price > h4");
const icon = document.querySelectorAll(".material-symbols-outlined");

const item_div = document.querySelectorAll(".container section:nth-child(3) > div");

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
            console.log(data["item"].length)
            console.log("접속 성공");
            console.log(data["item"][0]);
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
for(let i = 0; i < item_img.length; i++){
    item_img[i].addEventListener("mouseover", function (event) {
        event.target.childNodes[1].style.transform = "translateY(0)";
        event.target.childNodes[3].style.transform = "translateY(0)";
    });
    item_img[i].addEventListener("mouseout", function(event){
        event.target.childNodes[1].style.transform = "translateY(50px)";
        event.target.childNodes[3].style.transform = "translateY(50px)";
    })
    icon[i].addEventListener("mouseover", function(event){
        event.target.style.transform = "translateY(0)";
    })
}