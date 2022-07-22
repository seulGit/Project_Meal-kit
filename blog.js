let topbtn = document.querySelector('#setting');
let home = document.querySelector('#home');
let heart = document.querySelector('#heart');
let share = document.querySelector('#share');
let logout = document.querySelector('#logout');
let profile = document.querySelector('#profile');
let topNav = document.querySelector('.topNav');
let footerNav = document.querySelector('.footerNav');
let light = document.querySelector('.xi-lightbulb-o');
let container = document.querySelector('.container'); 
let hide = document.querySelector('#hide');
let leftTop = document.querySelector('.leftTop');

// 상단메뉴의 설정 이모티콘 rotate 효과 설정
// 상단메뉴 이모티콘 display='none' 효과 
let flag = false;
topbtn.addEventListener("click", function () {
    if (flag == true) {
        topbtn.style.transition = 'all 1s';
        topbtn.style.color = 'black';
        topbtn.style.transform = 'rotate(-180deg)';
        home.style.display = 'inline-block';
        flag = !flag;
    } else if (flag == false) {
        topbtn.style.transition = 'all 1s';
        topbtn.style.color = 'blue';
        topbtn.style.transform = 'rotate(180deg)';
        home.style.display = 'none';
        flag = !flag;
    }

});

// 스크롤 시 상단 메뉴 배경이 생기는 효과
window.addEventListener("scroll", function () {
    if (window.scrollY !== 0) {
        topNav.style.background = 'white';
    } else if (window.scrollY == 0) {
        topNav.style.background = 'none';
    }
});

// 스크롤 시 하단 메뉴 배경이 생기는 효과
// window.addEventListener("click",function(){
//     if(window.scrollY !==100){
//         footerNav.style.background ='none';
//     }else if(window.scrollY == 99){
//         footerNav.style.background ="white";
//     }
// })

// 전구 아이콘 누르면 아이콘 바뀜
let darkMode = true;
light.addEventListener("click", function(){
    if(darkMode == true){
        light.className ='xi-lightbulb';
        darkMode = !darkMode;
    }else if(darkMode == false){
        light.className ='xi-lightbulb-o';
        darkMode = !darkMode;
    }
});

// 다크 모드
light.addEventListener("click",function(){
   container.classList.toggle('dark');
});


// 아이콘 누르면 왼쪽 네비바 들어갔다 나옴
   let navbar = true;
hide.addEventListener("click", function(){
    if(navbar == true){
        leftTop.style.display='';
    }else if(navbar == false){
        leftTop.style.display='';
    }
});
