/* ========================
220725 오슬기 상세 페이지 내 이미지 클릭시 변경되는 js구현, json 이미지데이터 적용 1차 완료
220726 오슬기 json 이미지데이터 2차 완료
220727 오슬기 클릭시 뷰포트이동 기능 구현
220728 오슬기 수량 증감 시 금액변동 기능 구현, 서브이미지 클릭 안 할 시 메인이미지노출 유지 기능 구현, 본문 상세이미지 추가
완료
220729 오슬기 수량 증감 시 금액변동 기능-세부조건문 추가
220730 오슬기 메인이미지 노출 기능- 버튼 클릭시 노출로 변경, 장바구니/찜하기 버튼 클릭 시 좌측박스에 들어가는 기능 적용
            성선규작업 코드 추가(로컬스토리지)
===========================*/

let index = location.href.slice(location.href.indexOf("index") + 6);
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




// JSON 연동하여 아이템 정보 내보내기
$(function () {
    $.ajax({
        type: 'get',
        url: 'item_List.json',
        dataType: 'json',
        success: function (data) {

            //<상세페이지 이미지> 요소 받아오기
            const item_img_1 = document.querySelector(".main_details_img"); //메인이미지
            const item_img_2 = document.querySelector('.subimgbox > .subimg:nth-child(1)'); //서브이미지1
            const item_img_3 = document.querySelector('.subimgbox > .subimg:nth-child(2)'); //서브이미지2
            const item_img_4 = document.querySelector('.subimgbox > .subimg:nth-child(3)'); //서브이미지3
            const item_img_5 = document.querySelector('.subimgbox > .subimg:nth-child(4)'); //서브이미지4

            //<본문 이미지데이터 들어갈 자리> 요소 받아오기
            const details_detail_img = document.querySelectorAll('.detailimg > img'); //본문 '상세정보'영역 이미지(데이터 들어올 자리)
            const details_info_img = document.querySelectorAll('.infoimg > img'); //본문 '배송정보'영역 이미지(데이터 들어올 자리)            

            //<제품정보> 요소 받아오기
            const item_title = document.querySelector(".item_name > span"); //제품명
            const item_price = document.querySelector(".item_price_original > span:nth-child(2)"); //판매가 금액부분
            const discount_rate = document.querySelector(".item_price_dcRate > span:nth-child(2)"); //할인율 %부분
            const discount_price = document.querySelector(".item_price_total > span:nth-child(2)"); // 총합계금액 금액부분
            const item_quantity = document.querySelector('.item_quantity > span:nth-child(2) > input'); //수량부분 input

            //<본문네비바> 요소 받아오기
            const details_detail_btn = document.querySelector('.detail'); //본문네비바 '상세정보'버튼
            const details_info_btn = document.querySelector('.info'); //본문네비바 '배송정보'버튼
            const details_review_btn = document.querySelector('.review'); //본문네비바 '리뷰'버튼
            const details_blog_btn = document.querySelector('.blog'); //본문네비바 '블로그후기'버튼

            //본문 제품이미지데이터 적용
            item_img_1.style.background = `url(${data["korean_food"][index].main_img1}) 50% 50%/100% no-repeat`; //메인사진
            item_img_2.style.background = `url(${data["korean_food"][index].main_img2}) 50% 50%/100% no-repeat`; //서브사진1
            item_img_3.style.background = `url(${data["korean_food"][index].main_img3}) 50% 50%/100% no-repeat`; //서브사진2
            item_img_4.style.background = `url(${data["korean_food"][index].main_img4}) 50% 50%/100% no-repeat`; //서브사진3
            item_img_5.style.background = `url(${data["korean_food"][index].main_img5}) 50% 50%/100% no-repeat`; //서브사진4

            //본문 제품정보 데이터 적용
            item_title.innerHTML = data["korean_food"][index].item_Name; //제품명
            item_price.innerHTML = data["korean_food"][index].price; //판매가
            discount_rate.innerHTML = data["korean_food"][index].discount_rate; //할인율
            discount_price.innerHTML = data["korean_food"][index].discount_price; //총합계금액

            //본문 '상세정보'이미지데이터 적용
            //최대 5장으로 데이터 설정해놔서 인덱스 0~4 임
            details_detail_img[0].setAttribute('src', data["korean_food"][index].details_img1);
            details_detail_img[1].setAttribute('src', data["korean_food"][index].details_img2);
            details_detail_img[2].setAttribute('src', data["korean_food"][index].details_img3);
            details_detail_img[3].setAttribute('src', data["korean_food"][index].details_img4);
            details_detail_img[4].setAttribute('src', data["korean_food"][index].details_img5);

            //본문 '배송정보'이미지데이터 적용
            //최대 5장으로 데이터 설정해놔서 인덱스 0~4 임
            details_info_img[0].setAttribute('src', data["korean_food"][index].shipping_img1);
            details_info_img[1].setAttribute('src', data["korean_food"][index].shipping_img2);
            details_info_img[2].setAttribute('src', data["korean_food"][index].shipping_img3);
            details_info_img[3].setAttribute('src', data["korean_food"][index].shipping_img4);
            details_info_img[4].setAttribute('src', data["korean_food"][index].shipping_img5);


            //22/07/29 성선규 추가
            //장바구니, 최근본상품, 찜하기 로컬스토리지 구현 
            // 장바구니 로컬스토리지 구현
            Cart_Array = JSON.parse(window.localStorage.getItem('Cart')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기
            for (let i = 0; i < Cart_Array.length; i++) { // 받아온 아이템 갯수만큼 반복
                const select_item = document.querySelector(".select_item"); // 장바구니 안쪽 div 요소 정보 할당
                let select_box_div = document.createElement("div"); // 새로운 div 생성
                let close_icon = document.createElement("span"); // 새로운 span 생성
                close_icon.setAttribute("class", "material-symbols-outlined close_icon"); //span에 클래스명 부여
                close_icon.innerHTML = "close"; //구글폰트 아이콘 쓴거라 span에 아이콘명을 텍스트로 넣어줘야 했음 
                select_box_div.append(close_icon); // div 안쪽에 위에서 생성한 span 태그 추가
                select_item.append(select_box_div); // img가 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

                // 새로 만든 div에 로컬스터리지에 저장되어 있던 상품의 index값을 가져와 index값에 맞는 이미지 할당
                select_box_div.style.background = `url(${data["korean_food"][Cart_Array[i]].main_img}) 50% 50%/100% no-repeat`;
            }

            //22/07/30 성선규 추가
            // 최근 본 상품 로컬스토리지 구현
            recent_Array = JSON.parse(window.localStorage.getItem('recent')) // 기존에 로컬스토리지에 저장되어있던 아이템 받아오기
            for (let i = 0; i < recent_Array.length; i++) { // 받아온 아이템 갯수만큼 반복
                const recent_item = document.querySelector(".recent_item"); // 장바구니 안쪽 div 요소 정보 할당
                let recent_box_div = document.createElement("div"); // 새로운 div 생성
                let close_icon = document.createElement("span"); // 새로운 span 생성
                close_icon.setAttribute("class", "material-symbols-outlined close_icon"); //span에 클래스명 부여
                close_icon.innerHTML = "close"; //구글폰트 아이콘 쓴거라 span에 아이콘명을 텍스트로 넣어줘야 했음 
                recent_box_div.append(close_icon); // img를 새로 만든 div 안에 자식요소로 이동
                recent_item.append(recent_box_div); // img가 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

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
                close_icon.setAttribute("class", "material-symbols-outlined close_icon"); //span에 클래스명 부여
                close_icon.innerHTML = "close"; //구글폰트 아이콘 쓴거라 span에 아이콘명을 텍스트로 넣어줘야 했음 
                favorite_box_div.append(close_icon); // img를 새로 만든 div 안에 자식요소로 이동
                like_item.append(favorite_box_div); // img가 들어있는 div를 장바구니 안쪽 div의 자식요소로 이동

                // 새로 만든 div에 로컬스터리지에 저장되어 있던 상품의 index값을 가져와 index값에 맞는 이미지 할당
                favorite_box_div.style.background = `url(${data["korean_food"][favorite_Array[i]].main_img}) 50% 50%/100% no-repeat`;
            }




            //수량 증감 시 판매가, 총합계금액 변동 기능
            item_quantity.addEventListener('change', function () { //수량이 바뀔시 메서드실행

                //json 금액데이터 요소 받아오기
                const price_data = data["korean_food"][index].price; //판매가
                const dc_price_data = data["korean_food"][index].discount_price; //총합계금액

                //금액데이터 연산가능한 숫자로 변환하기
                //금액데이터가 "15,900원" 형식으로 쓰여져있어서 연산하기 위해서 ","와 "원"을 제거해야함
                let value_slice = price_data.slice(0, price_data.indexOf(",")) + price_data.slice(price_data.indexOf(",") + 1, price_data.indexOf("원")); //판매가
                // 예시:     9,500원          ㅣ맨앞부터 시작해서 ,전까지 자르기 = 9   ㅣ    +        ㅣ,다음자리(+1이니까)부터 시작해서        ㅣㅣ "원" 전까지 자르기 = 500  ㅣ   = 9500
                let dc_value_slice = dc_price_data.slice(0, dc_price_data.indexOf(",")) + dc_price_data.slice(dc_price_data.indexOf(",") + 1, dc_price_data.indexOf("원")); //총합계금액

                //총합계금액(판매가*수량) 구하기
                //위에서 연산가능한 숫자로 바꾼 거에 수량 곱하기
                let value = value_slice * this.value; //판매가 *수량 
                let dc_value = dc_value_slice * this.value; //총합계금액 * 수량

                //연산결과에 ","와 "원" 다시 붙이기 
                //100만원 이하에서는 문제없는데, 100만원 넘어가니 ","가 2개 쓰여야해서 조건문으로 구분했음
                //판매가
                if (value >= 1000000) { //100만원보다 크면
                    item_price.innerHTML = (String(value).slice(0, -6)) + "," + (String(value).slice(-6, -3)) + "," + (String(value).slice(-3)) + "원";
                    // 예시:        1000000      ㅣ총합계금액을 문자열로 변환 후, 뒤에서 6번째자리 전까지 자르기 = 1 + "," + 뒤에서 6번째자리부터 뒤에서 세번째 자리전까지 자르기 = 000 + "," + 뒤 세자리만 뽑아내기 = 000 + "원" ㅣ
                } else if (value > 0 && value < 1000000) { //0보다 크고 100만원보다 작으면 
                    item_price.innerHTML = (String(value).slice(-6, -3)) + "," + (String(value).slice(-3)) + "원";
                }
                // 뒤에서 6번째자리 전까지 자르는 것을 제외하고 위랑 동일 

                //총합계금액
                if (dc_value >= 1000000 && dc_value > 0) {
                    discount_price.innerHTML = (String(dc_value).slice(0, -6)) + "," + (String(dc_value).slice(-6, -3)) + "," + (String(dc_value).slice(-3)) + "원";
                } else if (dc_value > 0 && dc_value < 1000000) {
                    discount_price.innerHTML = (String(dc_value).slice(-6, -3)) + "," + (String(dc_value).slice(-3)) + "원";
                } else { //음수나 0 입력 시 경고창 뜨게 설정 
                    alert("올바른 수량을 입력해주세요.");
                }

                //최대 주문수량을 99개로 제한해놨기때문에 조건문 설정
                if (this.value >= 100) { //주문수량이 100개이상이면 (this=item_quantity)
                    alert("주문가능한 최대 수량은 99개 입니다."); //경고창 뜨고
                    this.value = '99'; //수량을 99개로 자동 수정
                }
            })



            //서브이미지 클릭 시 메인사진변경 기능 & 새로고침 아이콘 클릭시 메인사진 노출 기능
            //이미지 div 요소 가져오기
            const mainDetailsImg = document.querySelector('.main_details_img'); //메인이미지
            const subImg = document.querySelectorAll('.subimg'); //서브이미지
            const subImgBox = document.querySelector('.subimgbox'); //서브이미지 담고있는 div
            const mainAndSubImg = document.querySelector('.topleft'); //메인이미지+서브이미지 담고있는 div
            const ImgRefreshIcon = document.querySelector('.main_details_img > span'); //새로고침 아이콘

            //서브이미지 클릭 시 메인사진 변경 
            for (let i = 0; i < subImg.length; i++) { //서브이미지가 여러개라서 for문 돌림
                if (data["korean_food"][index].main_img2 != "") { //받아오는 json메인이미지데이터가 있을 시(=이미지주소가 공백이 아닐 시)
                    subImg[i].addEventListener('click', function () { //서브이미지i번째를 클릭하면
                        mainDetailsImg.style.background = subImg[i].style.background; //메인이미지의 배경이 서브이미지i번째의 배경과 같아짐 (이미지를 배경이미지로 적용해놓았음)
                        ImgRefreshIcon.style.opacity = '1';
                    });
                } else if (data["korean_food"][index].main_img2 == "") { //받아오는 json메인이미지데이터가 없을 시(=이미지주소가 공백일 시)
                    subImgBox.style.display = 'none'; //서브이미지를 담고있는 div를 숨김 (메인이미지만 중앙정렬로 보여주기 위해서)
                    mainDetailsImg.style.height = "50vh";
                }
            };

            //새로고침 아이콘 클릭 시 메인사진으로 다시 보여주는 기능 
            ImgRefreshIcon.addEventListener('click', function () { // 새로고침 아이콘 클릭 시 
                item_img_1.style.background = `url(${data["korean_food"][index].main_img1}) 50% 50%/100% no-repeat`;
                //메인이미지의 배경스타일은 원래 받아왔던 json 메인이미지 데이터로 변경
            })



            //장바구니/찜하기 박스로 들어가는 기능 & 알람 
            //찜하기,장바구니 버튼 요소 받아오기 
            const shopping_cart = document.querySelector(".shopping_cart_btn"); //장바구니 버튼 객체
            const favorite = document.querySelector(".favorite_btn") //찜하기 버튼 객체

            // 22/07/27 성선규
            // 알람 기능 구현을 위한 요소 정보 받아오기
            const shopping_alarm = document.querySelector(".shopping_alarm");
            const like_alarm = document.querySelector(".like_alarm");
            const shopping_alarm_img = document.querySelector(".shopping_alarm_img");
            const like_alarm_img = document.querySelector(".like_alarm_img");

            const select_item = document.querySelector(".select_item");
            const like_item = document.querySelector(".like_item");


            // 22/07/28 성선규 추가
            // 장바구니 아이콘 클릭 시 해당 아이템 장바구니 박스에 추가
            shopping_cart.addEventListener("click", function () {
                let select_box_div = document.createElement("div"); // 새로운 div 생성
                // let close_icon = document.createElement("img"); // 새로운 img 태그 생성
                let close_icon = document.createElement("span"); //0730 오슬기 수정 에러 해결과정에서 span 태그가 다루기 쉬울 것 같아서.. span으로 수정헀음 

                close_icon.setAttribute("class", "material-symbols-outlined close_icon"); // 생성한 span에 class 추가
                // close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png"); 
                close_icon.innerHTML = "close"; //구글폰트 아이콘 쓴거라 span에 아이콘명을 텍스트로 넣어줘야 했음
                select_box_div.append(close_icon); // div 안쪽에 위에서 생성한 span 태그 추가
                select_item.append(select_box_div); // 장바구니 박스에 div 추가
                const select_box_div_img = document.querySelector(`.select_item > div:nth-child(${select_item_count})`); // div 추가된 요소에 순서를 변수에 저장하여 문서 정보 받기
                select_box_div_img.style.background = `url(${data["korean_food"][index].main_img}) 50% 50%/100% no-repeat`; // 장바구니 박스에 넣은 div에 백그라운드 이미지 추가
                const select_check = document.querySelector("#select");
                select_check.checked = true; // 요소가 추가될 경우 radio 체크되면서 view 전환
                select_item_count++; // 순서 증가


                //22/07/30 성선규 추가
                Cart_Array.push(index); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                window.localStorage.setItem('Cart', JSON.stringify(Cart_Array)); // 배열을 JSON으로 변환 후 localStorage의 'Cart'에 저장
            })


            //22/07/28 성선규 추가
            // 찜하기 아이콘 클릭 시 해당 아이템 찜한 상품 박스에 추가
            favorite.addEventListener("click", function () {
                let select_box_div = document.createElement("div");
                // let close_icon = document.createElement("img");
                let close_icon = document.createElement("span");

                close_icon.setAttribute("class", "material-symbols-outlined close_icon");
                // close_icon.setAttribute("src", "icon/close_FILL0_wght400_GRAD0_opsz48.png");
                close_icon.innerHTML = "close";
                select_box_div.append(close_icon);
                like_item.append(select_box_div);
                const like_box_div_img = document.querySelector(`.like_item > div:nth-child(${like_item_count})`);
                like_box_div_img.style.background = `url(${data["korean_food"][index].main_img}) 50% 50%/100% no-repeat`;
                const like_check = document.querySelector("#like");
                like_check.checked = true;
                like_item_count++;

                //22/07/30 성선규 추가
                favorite_Array.push(index); // 상품 클릭 시 해당 인덱스 값을 배열에 추가
                window.localStorage.setItem('favorite', JSON.stringify(favorite_Array)); // 배열을 JSON으로 변환 후 localStorage의 'favorite'에 저장
            })

            // 22/07/27 성선규
            // 장바구니 아이콘 클릭시 이벤트 실행
            let flag = true;
            shopping_cart.addEventListener("click", function () {
                if (flag) {
                    flag = !flag;
                    shopping_alarm.classList.add("move_alarm"); // 알람 박스에 애니메이션CSS가 선언되어있는 클래스 추가
                    shopping_alarm.style.display = "flex";
                    shopping_alarm.style.opacity = "1";
                    shopping_alarm_img.style.background = `url(${data["korean_food"][index].main_img}) 50% 50%/100% no-repeat`; // 알람 박스에 해당 아이템 이미지 삽입
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
            favorite.addEventListener("click", function () {
                console.log(flag1)
                if (flag1) {
                    flag1 = !flag1;
                    like_alarm.classList.add("move_alarm");
                    like_alarm.style.display = "flex";
                    like_alarm.style.opacity = "1";
                    like_alarm_img.style.background = `url(${data["korean_food"][index].main_img}) 50% 50%/100% no-repeat`;
                    setTimeout(function () {
                        like_alarm.classList.remove("move_alarm");
                        like_alarm.style.opacity = "0";
                        flag1 = !flag1;
                        // console.log(flag1)
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

        }
    })
});



//버튼 클릭시 장바구니에 들어있는 해당 아이템 삭제 기능
//장바구니 
const basket_box = document.querySelector(".basket_box");

//22/07/30 성선규 추가
// 최근 본 상품 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const recent_item = document.querySelector(".recent_item"); // 최근 본 상품 컨테이너 요소 정보 할당
recent_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    $(".recent_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨


        //22/07/28 성선규 추가
        // 최근 본 상품, 찜한상품, 장바구니 박스 컨트롤을 위한 변수 선언
        let recent_item_count = Number(location.href.slice(location.href.indexOf("recent") + 7, location.href.indexOf("recent") + 8));
        let select_item_count = Number(location.href.slice(location.href.indexOf("select") + 7, location.href.indexOf("select") + 8));
        let like_item_count = Number(location.href.slice(location.href.indexOf("favorite") + 9, location.href.indexOf("favorite") + 10));

        if ($(".recent_item > div").index($(this).parent()) != -1) {
            recent_Array.splice($('.recent_item > div').index($(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('recent', JSON.stringify(recent_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            recent_item.removeChild($('.recent_item > div')[$('.recent_item > div').index($(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            recent_item_count--; // 카운트 감소
        }
    })
})


//22/07/30 성선규 추가
// 찜하기 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const like_item = document.querySelector(".like_item"); // 최근 본 상품 컨테이너 요소 정보 할당
like_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    $(".like_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨
        if ($(".like_item > div").index($(this).parent()) != -1) {
            favorite_Array.splice($('.like_item > div').index($(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('favorite', JSON.stringify(favorite_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            like_item.removeChild($('.like_item > div')[$('.like_item > div').index($(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            like_item_count--; // 카운트 감소
        }
    })
})

//22/07/30 성선규 추가
// 장바구니 이미지에 x 버튼 클릭 시 해당 아이템 삭제
const select_item = document.querySelector(".select_item"); // 최근 본 상품 컨테이너 요소 정보 할당

select_item.addEventListener("mouseover", function () { // 해당 요소에 마우스를 올릴 시
    $(".select_item > div > .close_icon").on("click", function () { // 해당 정보 받아온 후 x 버튼 클릭 시 함수 실행

        // x 버튼 상위 요소에서 클릭한 x버튼이 자식요소의 몇번째에 있는지 확인 후 -1을 반환하지 않는다면 밑에 코드 실행
        // -1은 해당 요소가 없기때문에 반환됨
        if ($('.select_item > div').index($(this).parent()) != -1) {
            Cart_Array.splice($('.select_item > div').index($(this).parent()), 1); // 로컬스터리지에 저장될 배열에서 삭제
            window.localStorage.setItem('Cart', JSON.stringify(Cart_Array)); // 로컬스터리지에 배열을 JSON으로 변환 후 저장
            select_item.removeChild($('.select_item > div')[$('.select_item > div').index($(this).parent())]); // 클릭한 요소의의 상위 요소 삭제
            select_item_count--; // 카운트 감소
        }
    });
})




// // 장바구니 및 찜한 상품 이미지에 x 버튼 클릭 시 해당 아이템 삭제
// basket_box.addEventListener("mouseover", function () {

//     // 장바구니 
//     const select_close_icon = document.querySelectorAll(".select_item > div > .close_icon");
//     const select_box_item = document.querySelectorAll(".select_item > div");
//     const select_item = document.querySelector(".select_item");
//     for (let i = 0; i < select_close_icon.length; i++) {
//         select_close_icon[i].addEventListener("click", function () {
//             select_item.removeChild(select_box_item[i]);
//             select_item_count--;
//         })
//     }
//     // 찜한 상품
//     const like_close_icon = document.querySelectorAll(".like_item > div > .close_icon")
//     const like_box_item = document.querySelectorAll(".like_item > div");
//     const like_item = document.querySelector(".like_item");
//     for (let i = 0; i < like_close_icon.length; i++) {
//         like_close_icon[i].addEventListener("click", function () {
//             like_item.removeChild(like_box_item[i]);
//             like_item_count--;
//         })
//     }

// })



// 페이지 상단으로
// 22/07/24 성선규 추가
const up_btn = document.querySelector(".scroll_up_container > div");

up_btn.addEventListener("click", function () {
    window.scrollTo({
        top: 0, //최상단으로
        left: 0, //왼쪽으로
        behavior: 'smooth' //애니메이션 부드럽게 
    });
})


//본문네비메뉴바 클릭시 뷰포트 이동기능 구현 
const bodymenu_detail_btn = document.querySelectorAll(".bodymenubox>.detail"); //상세정보
const bodymenu_info_btn = document.querySelectorAll(".bodymenubox>.info"); //배송정보
const bodymenu_review_btn = document.querySelectorAll(".bodymenubox>.review"); //리뷰
const bodymenu_blog_btn = document.querySelectorAll(".bodymenubox>.blog"); //블로그후기
const bodymenubox = document.querySelectorAll(".bodymenubox"); //본문네비메뉴바 (본문에 총 4개 있음)

for (let i = 0; i < bodymenu_detail_btn.length; i++) {
    bodymenu_detail_btn[i].addEventListener("click", function () { //상세정보 클릭 시
        bodymenubox[0].scrollIntoView(); //첫번째 메뉴바로 이동
    });
    bodymenu_info_btn[i].addEventListener("click", function () { //배송정보 클릭 시
        bodymenubox[1].scrollIntoView(); //두번째 메뉴바로 이동
    });
    bodymenu_review_btn[i].addEventListener("click", function () { //리뷰 클릭 시
        bodymenubox[2].scrollIntoView(); //세번째 메뉴바로 이동
    });
    bodymenu_blog_btn[i].addEventListener("click", function () { //블로그후기 클릭 시 
        bodymenubox[3].scrollIntoView(); //네번째 메뉴바로 이동 
    });
};