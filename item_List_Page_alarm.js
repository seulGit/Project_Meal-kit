// 장바구니 찜하기 버튼 클릭 시 알람 기능 구현
// 22/07/24 성선규
// const shopping_icon = document.querySelectorAll(".shopping");
const shopping_alarm = document.querySelector(".shopping_alarm");
// item_img_1[0].addEventListener("mouseover", function(){
//     alert("dddd")
// })
const item_section1 = document.querySelector(".container section:nth-child(3)");
item_section1.addEventListener("mouseover", function(){
    const shopping_icon = document.querySelectorAll(".shopping");
    for (let i = 0; i < shopping_icon.length; i++) {
        let flag = true;
        shopping_icon[i].addEventListener("click", function () {
            if(flag){
                shopping_alarm.classList.add("move_alarm");
                shopping_alarm.style.display = "flex";
                setTimeout(function () {
                    shopping_alarm.classList.remove("move_alarm");
                    flag = !flag;
                }, 4001);
            }
        })
    }
    const favorite_icon = document.querySelectorAll(".favorite");
    const like_alarm = document.querySelector(".like_alarm")
    for(let i = 0; i < favorite_icon.length; i++){
        let flag = true;
        favorite_icon[i].addEventListener("click", function () {
            if(flag){
                like_alarm.classList.add("move_alarm");
                like_alarm.style.display = "flex";
                setTimeout(function () {
                    like_alarm.classList.remove("move_alarm");
                    flag = !flag;
                }, 4001);
            }
        })
    }
})

const close_shopping_alarm = document.querySelector(".shopping_alarm img");
close_shopping_alarm.addEventListener("click", function () {
    shopping_alarm.style.display = "none";
    like_alarm.style.display = "none";
})
const close_like_alarm = document.querySelector(".like_alarm img");
close_like_alarm.addEventListener("click", function () {
    shopping_alarm.style.display = "none";
    like_alarm.style.display = "none";
})