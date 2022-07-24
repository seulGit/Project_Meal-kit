/*
=============================================================
220719 이은지 상단 메뉴 설정 아이콘 누르면 rotate 효과
220720 상단 메뉴 스크롤 시 뒷배경 생기는 효과
       하얀 전구 아이콘 누를 시 검은 전구 아이콘 전환 효과
       전구 누르면 다크모드 
220723 footer 내용 추가, 왼쪽 메뉴 트랜지션 효과, 다크모드 수정
       댓글,답글 창 드롭다운 효과
=============================================================
*/

let home = document.querySelector('#home');

let share = document.querySelector('#share');
let logout = document.querySelector('#logout');
let profile = document.querySelector('#profile');


// 220719 상단 메뉴 아이콘 효과
// 상단메뉴의 설정 이모티콘 rotate 효과 설정 
let topNav = document.querySelector('.topNav'); // 상단 메뉴
let topbtn = document.querySelector('#setting'); // 상단 메뉴 설정 아이콘 
let flag = false;
topbtn.addEventListener("click", function () {
    if (flag == true) { // 아이콘 오른쪽으로 돌아갔을 때 다시 왼쪽으로 돌아옴
        topbtn.style.transition = 'all 1s'; // 아이콘 돌아가는 모습 보기 위해 트랜지션 주었음
        topbtn.style.color = 'black';  // 아이콘 색 설정 : 검은색
        topbtn.style.transform = 'rotate(-180deg)'; //클릭 시 왼쪽으로 돌아감
        flag = !flag;
    } else if (flag == false) { //아이콘 처음 눌렀을 때 오른쪽으로 돌아감
        topbtn.style.transition = 'all 1s';
        topbtn.style.color = 'blue'; // 아이콘 색 설정 : 파란색
        topbtn.style.transform = 'rotate(180deg)'; // 클릭 시 오른쪽으로 돌아감
        flag = !flag;
    }

});

//220720 스크롤 시 상단 메뉴 배경이 생기는 효과
window.addEventListener("scroll", function () {
    if (window.scrollY !== 0) {  
        topNav.style.background = 'white'; // 스크롤 시 상단 메뉴 배경 흰색 효과 주었음
        topNav.style.borderBottom='1px solid gray'; // 220723 상단 메뉴의 구분선이 있으면 좋겠다는 조원들의 피드백 반영
    } else if (window.scrollY == 0) {
        topNav.style.background = 'none'; // 스크롤 맨 위로 올렸을 때 뒷 배경 사라질 수 있도록 none 효과를 주었음
        topNav.style.border='none'; // 스크롤 맨 위로 올렸을 때 바닥 선 사라짐
    }
});


//  220720 전구 아이콘 누르면 아이콘 바뀜
let light = document.querySelector('.xi-lightbulb-o'); // 전구 아이콘
let darkMode = true; // 처음 모습은 하얀 전구 아이콘
light.addEventListener("click", function(){
    if(darkMode == true){
        light.className ='xi-lightbulb';  // 하얀 전구 아이콘 클릭하면 검은 전구 아이콘으로 바뀜
        darkMode = !darkMode;    // 계속 클릭할 수 있도록 fasle와 true효과 주었음
    }else if(darkMode == false){
        light.className ='xi-lightbulb-o'; // 검은 전구 아이콘 클릭하면 하얀 전구 아이콘으로 바뀜
        darkMode = !darkMode;
    }
});


// 220720 다크모드
// 다크모드할 때 topNav 뒷 배경이 색깔이 변하지 않음 css 우선순위때문인 것 같음
let container = document.querySelector('.container');  // 모든 요소 담고 있는 컨테이너
light.addEventListener("click",function(){
   container.classList.toggle('dark'); // css에 dark 클래스 이름 주어 토글 효과 주었음
});


// 220723 상단 메뉴 아이콘 누르면 왼쪽 메뉴 나옴
let leftNav = document.querySelector('.leftNav'); // 왼쪽 메뉴
let leftNavShow = document.querySelector('#leftNavShow'); // 상단 메뉴 왼쪽에 있는 네비바 아이콘
leftNavShow.addEventListener("click",function(){
    leftNav.style.left="0%"; // 상단 메뉴 아이콘 누르면 왼쪽 메뉴가 원래 자리로 나옴
});

// 220723 왼쪽 메뉴 x 누를 시 네비 바 들어감
let hide = document.querySelector('.xi-close'); // x아이콘
// 아이콘 누르면 왼쪽 네비바 들어갔다 나옴
hide.addEventListener("click", function(){
    leftNav.style.left="-100%";  // x누르면 왼쪽 메뉴가 왼쪽으로 -100%이동함
});


// 220723 댓글 창 드롭다운 효과
let talkclick = document.querySelector('#talk'); // 댓글 
let toggle = document.querySelector('.footerTextToggle'); // 댓글과 댓글쓰기 창
     let talk = false;
talkclick.addEventListener("click",function(){  // 댓글 글자 누를 때
    if(talk == true){                      
        toggle.style.display='none';   // 댓글 창 숨기기   
        talk = !talk;
    }else if(talk == false){
        toggle.style.display='block';  // 댓글 창 보이기
        talk = !talk;
    }
});

// 220723 답글 창 드롭다운 효과
// 배열로 가져왔는데 하나의 댓글 창 누를 때 다른 댓글 창도 같이 열림..
let footerTextBtn = document.querySelectorAll('.footerTextBtn'); // 답글 버튼
let footerAnswer = document.querySelectorAll('.footerAnswer'); // 답글 창
 
let answerBtn = false;

 for(let i=0; i<footerTextBtn.length; i++){ 
    for(let j=0; j<footerAnswer.length; j++){    // 배열로 가져왔기 때문에 for문 사용
 footerTextBtn[i].addEventListener("click",function(){
    if(answerBtn == true){              
        footerTextBtn[i].style.backgroundColor="white";
        footerAnswer[j].style.display='none';   // 댓글 창 숨기기   
        answerBtn = !answerBtn;
    }else if(answerBtn == false){
        footerTextBtn[i].style.backgroundColor="powderblue";
        footerAnswer[j].style.display='block';  // 댓글 창 보이기
        answerBtn = !answerBtn;
    }
 });
  }
}