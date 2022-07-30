/*
===========================================================================
220719 이은지 상단 메뉴 설정 아이콘 누르면 rotate 효과
220720 상단 메뉴 스크롤 시 뒷배경 생기는 효과
       하얀 전구 아이콘 누를 시 검은 전구 아이콘 전환 효과
       전구 누르면 다크모드 
220723 footer 내용 추가, 왼쪽 메뉴 트랜지션 효과, 다크모드 수정
       댓글,답글 창 드롭다운 효과
220724 상단 메뉴 드롭다운 효과
220725 상단 메뉴 다크모드 시 색깔 변경.. 해결못함
220726 답글 버튼 두 번 눌러야 창 나오는 것 한 번만 눌러도 나올 수 있도록 수정, 
       다크모드 상단 메뉴 색상 해결!!!!
       선규 피드백 -> 답글 입력했을 때 자식 요소로 들어갈 수 있도록 기능 요청
220727 선규 피드백 -> 역량 부족으로 하지 못함..
       오른쪽 하단에 맨 위로 올라가기 버튼 생성
220729 성선규가 답글기능 하라고 함
220730 답글 기능 완료.... 
===========================================================================
*/



// 220719 상단 메뉴 아이콘 효과
// 상단메뉴의 설정 이모티콘 rotate 효과 설정 
let topNav = document.querySelector('.topNav'); // 상단 메뉴
let topbtn = document.querySelector('#setting'); // 상단 메뉴 설정 아이콘 
let flag = false;
topbtn.addEventListener("click", function () {
    if (flag == true) { // 아이콘 오른쪽으로 돌아갔을 때 다시 왼쪽으로 돌아옴
        topbtn.style.transition = 'all 0.5s'; // 아이콘 돌아가는 모습 보기 위해 트랜지션 주었음
        // topbtn.style.color = 'black';  // 아이콘 색 설정 : 검은색 // 0725 다크모드 시 색 수정이 어려워 아이콘 변경함
        topbtn.style.transform = 'rotate(0deg)'; //클릭 시 왼쪽으로 돌아감
        flag = !flag;
    } else if (flag == false) { //아이콘 처음 눌렀을 때 오른쪽으로 돌아감
        topbtn.style.transition = 'all 0.5s';
        // topbtn.style.color = 'blue'; // 아이콘 색 설정 : 파란색 // 0725 다크모드 시 색 수정이 어려워 아이콘 변경함
        topbtn.style.transform = 'rotate(90deg)'; // 클릭 시 오른쪽으로 돌아감
        flag = !flag;
    }

});


//  220720 전구 아이콘 누르면 아이콘 바뀜
let light = document.querySelector('.xi-lightbulb-o'); // 전구 아이콘
let darkMode = true; // 처음 모습은 하얀 전구 아이콘
light.addEventListener("click", function(){
    if(darkMode == true){
        light.className ='xi-lightbulb';  // 하얀 전구 아이콘 클릭하면 검은 전구 아이콘으로 바뀜
        topNav.style.background='#1e1f21';   // 상단 메뉴 검정색 설정 
        topNav.style.color='white';  
        darkMode = !darkMode;    // 계속 클릭할 수 있도록 fasle와 true효과 주었음
    }else if(darkMode == false){
        light.className ='xi-lightbulb-o'; // 검은 전구 아이콘 클릭하면 하얀 전구 아이콘으로 바뀜
        topNav.style.background='white';    // 상단 메뉴 하얀색 설정
        topNav.style.color='black';  
        darkMode = !darkMode;
    }
});

// 220720 다크모드
// 다크모드할 때 topNav 뒷 배경이 색깔이 변하지 않음 css 우선순위때문인 것 같음 --> 220726 css 지웠음
let container = document.querySelector('.container');  // 모든 요소 담고 있는 컨테이너
light.addEventListener("click",function(){
   container.classList.toggle('dark'); // css에 dark 클래스 이름 주어 토글 효과 주었음
});

// 220720 스크롤 시 상단 메뉴 배경이 생기는 효과
// 220726 스크롤 시 상단 메뉴 색이 바뀔 수 있도록 위 다크모드 플래그를 활용하여 조건문 작성
// 220727 오른쪽 하단에 맨 위로 올라가기 버튼 스크롤 시 보이기
let topToBtn = document.querySelector('.topToBtn');  // 위로 올라가기 버튼

window.addEventListener("scroll", function () {
    if (window.scrollY !== 0) {      // 스크롤을 내렸을 때
        topToBtn.style.display='block';  // 위로 올라가기 버튼 생김
        if(darkMode == false){         // 다크모드일 때
         topNav.style.background='#1e1f21';   // 상단 메뉴 검정색 설정
         topNav.style.color='white';          // 상단 메뉴 글자 하얀색 설정
         topNav.style.borderBottom='1px solid gray';  // 220723 상단 메뉴의 구분선이 있으면 좋겠다는 조원들의 피드백 반영
      }  else if(darkMode == true){          // 다크모드가 아닐 때
         topNav.style.background='white';    // 상단 메뉴 하얀색 설정
         topNav.style.color='black';          // 상단 메뉴 글자 검정색 설정
         topNav.style.borderBottom='1px solid gray';
      }
       
    }else if (window.scrollY == 0) {      // 스크롤 0일 때
        topToBtn.style.display='none';    // 위로 올라가기 버튼 사라짐
        if(darkMode==false){              // 다크모드일 때
            topNav.style.color='black';   // 상단 메뉴 글자 검정색 설정
            // 상단 메뉴 글자 검정색 설정한 이유 
            // 다크모드 시 상단 메뉴 글자가 하얀색으로 바뀌는데 스크롤 맨 위로 올렸을 때
            // 글자가 하얀색 그대로여서 뒷 배경 이미지에 묻히는 느낌임
            // 그래서 다크모드일 때도 스크롤 맨 위로 올렸을 땐 글자 검정색으로 바꾸어주었음

        }else if(darkMode==true){         // 다크모드 아닐 때
            topNav.style.color='black';   
        }
        topNav.style.background = 'none'; // 스크롤 맨 위로 올렸을 때 뒷 배경 사라질 수 있도록 none 효과를 주었음
        topNav.style.border='none'; // 스크롤 맨 위로 올렸을 때 바닥 선 사라짐
    } 

});




// 220723 상단 메뉴 아이콘 누르면 왼쪽 메뉴 나옴
let leftNav = document.querySelector('.leftNav'); // 왼쪽 메뉴
let leftNavShow = document.querySelector('#leftNavShow'); // 상단 메뉴 왼쪽에 있는 네비바 아이콘
leftNavShow.addEventListener("click",function(){
    leftNav.style.left="0%"; // 상단 메뉴 아이콘 누르면 왼쪽 메뉴가 원래 자리로 나옴
});

// 220723 왼쪽 메뉴 x 누를 시 네비 바 들어감
let hide = document.querySelector('.xi-close'); // x아이콘
// 아이콘 누르면 왼쪽 네비바 들어감
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
// 220726 -> 댓글 수와 답글 수가 같아 변수 i를 주어 해결하였음
// 답글을 두 번 눌러야 창이 나오는 오류가 있어 조원(성선규)이 코드 수정을 도와주었음

let footerTextBtn = document.querySelectorAll('.footerTextBtn'); // 답글 버튼
let footerAnswer = document.querySelectorAll('.footerAnswer'); // 답글 창
 
// let answerBtn = false;
// 플래그를 사용하지 않고 답글 창 display 설정으로 조건문을 설정할 수 있음

 for(let i=0; i<footerTextBtn.length; i++){ 
    for(let i=0; i<footerAnswer.length; i++){    //댓글 수와 답글 수가 같기 때문에 i를 주었음
 footerTextBtn[i].addEventListener("click",function(){
    if(footerAnswer[i].style.display == ""){         
         // 220726 답글 창이 안보일 때 답글 창을 누르면 버튼 색이 보이고 답글 창이 보이도록  
        footerTextBtn[i].style.backgroundColor="powderblue";
        footerAnswer[i].style.display='block';   // 댓글 창 숨기기   
        // answerBtn = !answerBtn;
    }else if(footerAnswer[i].style.display == "block"){  
        // 220726 답글 창이 보일 때 답글 창을 누르면 버튼 색이 하얀색이 되고 답글 창이 닫히도록
        footerTextBtn[i].style.backgroundColor="white";
        footerAnswer[i].style.display='';  // 댓글 창 보이기
        // answerBtn = !answerBtn;
    }
 });
  }
}


// 220724 상단 메뉴 드롭다운 효과
let topIconMenuPosition1 = document.querySelector('.topIconMenuPosition1');  // 홈과 공유 아이콘 담은 div
let topIconMenuPosition2 = document.querySelector('.topIconMenuPosition2');  //프로필과 로그아웃 아이콘 담은 div

let up = true;
topbtn.addEventListener("click",function(){
   if(up == true){
    topIconMenuPosition1.style.animation='iconTop1 0.5s';  // 홈과 공유 아이콘 위로 올라감
    topIconMenuPosition1.style.animationFillMode='forwards'; // 애니메이션 속성 유지
    topIconMenuPosition2.style.animation='iconDown1 0.5s'; // 프로필과 로그아웃 아이콘 보임
    topIconMenuPosition2.style.animationFillMode='forwards';
    up = !up;
   } else if(up == false){
    topIconMenuPosition1.style.animation='iconTop2 0.5s';  // 홈과 공유 아이콘 원래 위치 돌아옴
    topIconMenuPosition1.style.animationFillMode='forwards'; 
    topIconMenuPosition2.style.animation='iconDown2 0.5s'; // 프로필과 로그아웃 아이콘 아래로 내려감
    topIconMenuPosition2.style.animationFillMode='forwards';
    up = !up;
   }
});


// 220729 답글 입력하면 자식요소로 들어감
// 자식 요소 넣는 것이 어려워 코드 짜는데 다른 조원의 도움을 받음
// htML에는  <div class="inputText"></div> DIV 요소가 들어갈 수 있도록 DIV를 만들어 놓음
let answerBtn = document.querySelectorAll('.answerBtn');
for(let i=0; i<answerBtn.length; i++){
        answerBtn[i].addEventListener("click",function(){
            // createElement는 요소 노드를 만들어주는 메서드
            // div를 만들었음
        const div2 = document.createElement('div');
        const now_time_text = document.createElement('p');
        const input_atr = document.createAttribute('id');
        const now_time = new Date();
        //createAttribute 속성을 추가 스타일, 아이디, 클래스값을 부여해줌
        input_atr.value = 'inputTextBox';
        // 해당 key의 id 이름 지정
        // div id이름을 inputTextBox로 지정하여 css 설정
        div2.setAttributeNode(input_atr);
        // append는 만들어놓은 속성을 연결 
        div2.append(document.createTextNode(this.parentNode.children[0].value));
        // this를 사용하므로써 프로퍼티 추적 해당 영역에서만 글을 작성하면 댓글달릴 수 있도록
        // 버튼이 배열이기 때문에 
        now_time_text.append(now_time.getFullYear()+"."+Number(now_time.getMonth()+1)+"."+now_time.getDate()+" "+now_time.getHours()+":"+now_time.getMinutes());
        this.parentNode.parentNode.children[2].append(div2);
        this.parentNode.parentNode.children[2].append(now_time_text);
        
        // 답글을 담고 있는 parentNode, 댓글을 담고 있는 parentNode
        // 배열이기 때문에 3번째 요소에 div2를 넣겠다는 의미
        this.parentNode.children[0].value = '';
        // input 내용을 초기화 해줌

});
}

