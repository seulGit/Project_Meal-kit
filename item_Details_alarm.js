// // 장바구니 찜하기 버튼 클릭 시 알람 기능 구현
// // 22/07/24 성선규
// // 22/07/27 오슬기 수정
const shopping_alarm = document.querySelector(".shopping_alarm"); //장바구니 알람 객체
const like_alarm = document.querySelector(".like_alarm");         //찜하기 알람 객체

const shopping_cart = document.querySelector(".shopping_cart_btn"); //장바구니 버튼 객체
const favorite = document.querySelector(".favorite_btn")            //찜하기 버튼 객체

// 장바구니 버튼 클릭 시 알람문구 뜨는 기능
        shopping_cart.addEventListener("click", function () { //버튼 클릭
            let flag1 = true;                                 //플래그 선언
            if(flag1){
                shopping_alarm.classList.add("move_alarm");   //알람 나타날떄의 css
                shopping_alarm.style.display = "flex";
                shopping_alarm.style.opacity = "1";
                setTimeout(function () {                      //알람 사라질떄의 css
                    shopping_alarm.classList.remove("move_alarm"); 
                    shopping_alarm.style.opacity = "0";
                    flag2 = !flag2;
                }, 4001);                                     //알람 생기는 애니메이션이 4초라 4001로 줬음
            }
        });
    

// 찜하기 버튼 클릭 시 알람문구 뜨는 기능
        favorite.addEventListener("click", function () { //버튼 클릭
            let flag2 = true;                            //플래그 선언
            if(flag2){
                like_alarm.classList.add("move_alarm");  //알람 나타날때의 css
                like_alarm.style.display = "flex";       
                like_alarm.style.opacity = "1";
                setTimeout(function () {                 //알람 사라질떄의 css
                    like_alarm.classList.remove("move_alarm");
                    like_alarm.style.opacity = "0";
                    flag2 = !flag2;                     
                }, 4001);                                //알람 생기는 애니메이션이 4초라 4001로 줬음
            }
        });


const close_shopping_alarm = document.querySelector(".shopping_alarm img");
const close_like_alarm = document.querySelector(".like_alarm img");
close_shopping_alarm.addEventListener("click", function () {
    shopping_alarm.style.display = "none";
})
close_like_alarm.addEventListener("click", function () {
    like_alarm.style.display = "none";
})