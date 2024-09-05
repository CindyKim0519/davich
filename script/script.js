$(document).ready(function(){

const l_btn = $('.p_btn li:first-child');//좌측 버튼
const p_btn = $('.p_btn li:nth-child(2)')//정지 버튼
const r_btn = $('.p_btn li:nth-child(3)');//우측버튼
const page_num = $('.p_btn li:last-child #page');
let v_slide_img = $('.visual>div');

let i=$('.p_btn>li').index()+1;  //1
page_num.text(i+'/4');

// 모바일 토글버튼 모양 변경
$('#toggle').click(function(){
  $('#toggle span:nth-child(2)').toggle();
  $('#toggle span:first-child').toggleClass('rotate1');
  $('#toggle span:last-child').toggleClass('rotate2');
  $(this).toggleClass('bgcolor');
  $('header nav').slideToggle();
}); 
$('.visual>div:last-child').insertBefore('.visual>div:first-child');
$('.visual').css('margin-left','-100%');

function moveLeft(){
    $('.visual').stop().animate({'margin-left':'-200%'},500,function(){

        $('.visual>div:first-child').insertAfter('.visual>div:last-child');
        $('.visual').css('margin-left','-100%');
        if(i==1){
          i=4;
        }else{
          i--;
        }
        page_num.text(i+'/4');

    });
}

let Timer = setInterval(moveLeft, 5000);

function moveRight(){
    $('.visual').stop().animate({'margin-left':'0%'},500,function(){
        $('.visual >div:last-child').insertBefore('.visual >div:first-child');
        $('.visual').css('margin-left','-100%');
        if(i==4){
          i=1;
        }else{
          i++;
        }
        page_num.text(i+'/4');
    });
}



//1234  4321
l_btn.click(function(){
    clearInterval(Timer);

    moveLeft();
});

r_btn.click(function(){
    clearInterval(Timer);
    moveRight();   
});

  l_btn.mouseleave(function(){
    Timer = setInterval(moveLeft, 5000);
  });
  r_btn.mouseleave(function(){
    Timer = setInterval(moveLeft, 5000);
  });

p_btn.click(function(){ 
  clearInterval(Timer);
    if($(this).find('i').hasClass('fa-solid fa-pause')==true){
        clearInterval(Timer);
        $(this).find('i').attr('class','fa-solid fa-play')
    }else{
        Timer=setInterval(moveLeft, 5000);
        $(this).find('i').attr('class','fa-solid fa-pause')
    }
})


// 헤더 메뉴
let gnb = $('header .gnb >ul>li >a');
    let cancel = $('.visual');
    //2. gnb 메뉴 클릭시 해당서부메뉴 보이게 하기
    gnb.click(function(){
        // $('.sub').hide();//보이는 서브 숨기고
        //선택한 서브만 보이게한다.
        // $(this).next().show();
        // $(this).next().toggle();
        $(this).next().toggle().parent().siblings().find('.sub').hide();
        
    });
    cancel.click(function(){
        $('.sub').hide();
    })
//이벤트 슬라이드 구현
const eslide = $('.es_wrap');
const es_lbtn = $('.event i.fa-angle-left');
const es_rbtn = $('.event i.fa-angle-right');

//1번 슬라이드의 앞에 3번을 배치한다.
$('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

//왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.
eslide.css('margin-left','-100%');

//moveleft함수
function moveLeft2(){
  eslide.stop().animate({'margin-left':'-200%'},500, function(){
    $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
    eslide.css('margin-left','-100%');
  });
}
//시간객체를 사용하여 4초마다 움직이도록 한다.
let Timer2 = setInterval(moveLeft2, 5000);

//moveright함수
function moveRight2(){
  eslide.stop().animate({'margin-left':'0px'},500, function(){
    $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
    eslide.css('margin-left','-100%');
  });
}

// 좌측버튼 클릭시 
es_lbtn.click(function(){
  clearInterval(Timer2);
  moveLeft2();
});

//우측버튼 클릭시
es_rbtn.click(function(){
  clearInterval(Timer2);
  moveRight2();
});

//좌, 우 버튼 마우스 아웃시 다시 시간을 생성해서 움직이게
$('.event i.fas').mouseleave(function(){
  Timer2 = setInterval(moveLeft2, 5000);
});


//윈도우 세로 스크롤값을 구하여 
$(window).scroll(function(){
    let s_pos = $(this).scrollTop();
    console.log(s_pos);//세로스크롤값 체크~

    if(s_pos>=800){//얼마이상일때 top버튼 보이게하고
      $('footer i.fa-chevron-up').fadeIn();
    }else{//그렇지 않으면 top버튼 숨기게 한다.
      $('footer i.fa-chevron-up').fadeOut();
    }
  });


    //.t_btn클릭시 페이지 상단으로 올라감.
    $('footer i.fa-chevron-up').click(function(){
        $('html, body').animate({'scrollTop':'0px'},500);
        return false;
      });


        //갤러리 구현
      //1. 변수생성
      let g_list = $('.girl figure a');

      //2. 이미지목록 a요소 클릭시 href값 변수에 담아 modal윈도 띄우기
  g_list.click(function(){
    let img_src = $(this).attr('href');
    // let title = $(this).attr('title');
    let title = $(this).next().find('h6').text();
    let i = $(this).parent().index()+1;

    console.log(i); //li태그의 인덱스값 출력
    console.log(img_src); //href값 출력하기
    console.log(title); //title제목 출력하기

    let modal=`
      <div class="modal">
        <div class="center">
          <h3>${title}</h3>
          <img src=${img_src} alt="">
          <i class="fas fa-times"></i>
          <i class="fas fa-angle-left"></i>
          <i class="fas fa-angle-right"></i>
          <span class="p_num">${i}/8</span>
        </div>
      </div>
    `;

    //body태그의 맨뒤에 modal변수값 출력하기
    $('body').append(modal);

    //닫기 버튼 클릭시 모달윈도 숨기기
    $('.modal i.fa-times').click(function(){
      $('.modal').fadeOut();
    });

    //좌,우 버튼 클릭시 각각 함수 작성하기
    $('.modal i.fa-angle-left').click(function(){
      if(i == 1){
        i=6;
      }else{
        i--;
      }
      console.log(i); //1,8,7,6,5,4,3,2,1...
      dataChange(i);
    });

    $('.modal i.fa-angle-right').click(function(){
      if(i == 6){
        i=1;
      }else{
        i++;
      }
      console.log(i);//1,2,3,4,5,6,7,8,1....
      dataChange(i);
    });

    //좌, 우버튼 클릭시 받아온 i값을가지고
    //제목, 이미지, 페이지번호 변경하기
    function dataChange(i){

      //1. 페이지번호 <span class="p_num">${i}/12</span>
      $('.modal .p_num').text(i+'/6');

      //2. 인덱스번호에 맞는 제목 변경되어야....
      $('.modal h3').text($('.girl figure').eq(i-1).find('.caption').text());

      //3. 인덱스번호에 맞는 이미지 출력하기
        $('.modal img').attr('src','./images/insta0'+i+'.JPG');
      } 
      return false;  
    });
    
    // 메인페이지 모달띄우기
    let popup = `
      <div class="p_modal">
        <div class='banner'>
          <a href="#" title="">
            <img src="./images/popup.jpg" alt="">
          </a><br>
          <input type="checkbox" id="ch">
          
          <label for="ch">오늘 하루 열지 않음</label>
          <input type="button" value="닫기" id="c_btn">

        </div>
      </div>
    `
    $('body').append(popup);

    //현재 브라우저에 쿠키 popup의 값이 none이면 팝업을 나오지 않게 한다.
    if($.cookie('popup')=='none'){
      $('.p_modal').hide();
    }

    //체크박스 변수
    let $ex = $('.p_modal #ch');
    //체크박스에 사용자가 체크를 했는지 안했는지 확인하기 위한 함수를 작성
    function closePopup(){
      if($ex.is(':checked')){ //체크박스에 체크되었다면
        $.cookie('popup', 'none', {expires:1, path:'/'});
      }
      $('.p_modal').hide();//쿠키를 생성하고 종료한다.
    }

    //닫기 버튼 클릭시 해당함수를 호출하여 모달윈도 닫기
    $('.p_modal #c_btn').click(function(){
      closePopup();
    });

    //광고 랜덤 슬라이드

    let product_m = ['random-slide1.png','random-slide2.jpg','random-slide3.jpg']
    let ran = Math.floor(Math.random()*3);

    document.getElementById('banner_img').src=`./images/${product_m[ran]}`;
    
    let product_m1 = ['random-banner1.jpg','random-banner2.jpg','random-banner3.jpg']
    let ran1 = Math.floor(Math.random()*3);

    document.getElementById('banner_img2').src=`./images/${product_m1[ran]}`;
  });
