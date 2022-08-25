let today = new Date();
let week = today.getDay();  // 요일
var arrWeek = new Array(); // 요일 array
var arrPlatform = new Array();  // 플랫폼 array

week -= 1

if (week == 0) {
  week = 6
}

// 오늘 날짜 색 반전
// console.log(week);
$(document).ready(function() {
  $('.week-button').ready(function(index){
    $('.week-button[week-button-index=' + week + ']').addClass('click-button');
    $('.week-button[week-button-index!=' + week + ']').removeClass('click-button');
    arrWeek.push(week)
    // console.log(arrWeek)
  });
});

// 플랫폼 리스트 초기화
$(document).ready(function() {
  var c = $('input[type=radio][name="chk_platform"]:checked').val();
  arrPlatform.push(c)
  // console.log(arrPlatform)
});

// 클릭한 요일 색 반전 및 선택된 요일을 리스트에 저장, 요일과 플랫폼 정보 가져오기
$('.week-button').each(function(index){
  // console.log(index)

  $(this).attr('week-button-index', index);
}).click(function(){
  var index = $(this).attr('week-button-index');
  arrWeek.push(parseInt(index))
  // console.log(arrWeek)
  // console.log(index)

  $('.week-button[week-button-index=' + index + ']').addClass('click-button');
  $('.week-button[week-button-index!=' + index + ']').removeClass('click-button');

  // 요일, 플랫폼 정보 가져오기
  let check_week = parseInt(arrWeek[arrWeek.length - 1]);
  let check_platform = arrPlatform[arrPlatform.length - 1];

  check_week = settingWeek(check_week)
  console.log(check_week, check_platform)
  call(check_week, check_platform);
});

// 하트 토글
$(function() {
  $(".heart").on("click", function() {
    $(this).toggleClass("is-active");
  });
});

// 선택된 플랫폼을 리스트에 저장, 요일과 플랫폼 정보 가져오기
$('input[type=radio][name="chk_platform"]').click(function() {
  var c = $('input[type=radio][name="chk_platform"]:checked').val();
  arrPlatform.push(c)
  // console.log(arrPlatform)

  // 요일, 플랫폼 정보 가져오기
  let check_week = parseInt(arrWeek[arrWeek.length - 1]);
  let check_platform = arrPlatform[arrPlatform.length - 1];

  check_week = settingWeek(check_week)
  console.log(check_week, check_platform)
  call(check_week, check_platform);
});

// 요일, 플랫폼 정보를 토대로 GET 요청
function call(check_week, check_platform) {
  var day = check_week;
  var platform = check_platform;
  var page = 1;

  var webtoonData = new Array();

  $('#webtoon_list').empty();


  $.ajax({
    type: "GET",
    // url: "/webtoon/list/" + day + "/" + platform + "?page=" + page,
    url: "https://jsonplaceholder.typicode.com/users",
    dataType: "json",
    success: function(data) {
      console.log(data);
      webtoonData.push(data);
      console.log(webtoonData);

      for(let i = 0; i < data.length; i++) {

        function create_webtoon(i) {
          // id = data[i].id;
          // title = data[i].title;
          // author = data[i].author;
          // img_url = data[i].img_url;
          // web_url = data[i].web_url;
          // click_count = data[i].click_count;

          // id = data[i].id;
          // title = data[i].name;

          id = data[i].id;
          title = data[i].name;
          author = data[i].username;
          img_url = data[i].phone;
          web_url = data[i].website;
          click_count = data[i].id;
          

          let one = document.createElement("li");
          one.setAttribute('id', 'one' + id);
          document.getElementById('webtoon_list').appendChild(one);

          let thumbnail = document.createElement("div");
          thumbnail.setAttribute('id', 'thumbnail' + id);
          document.getElementById("one" + id).appendChild(thumbnail);

          let img_a = document.createElement("a");
          img_a.setAttribute('id', 'img_a' + id);
          img_a.setAttribute('href', 'web_url');
          document.getElementById('thumbnail' + id).appendChild(img_a);

          let img_src = document.createElement("img");
          img_src.setAttribute('src', 'img_url');
          img_src.setAttribute('width', '83');
          img_src.setAttribute('height', '90');
          document.getElementById('img_a' + id).appendChild(img_src);



          let m_dl = document.createElement("dl");
          m_dl.setAttribute('id', 'dl' + id);
          document.getElementById("one" + id).appendChild(m_dl);

          let m_dt = document.createElement("dt");
          m_dt.setAttribute('id', 'dt' + id);
          document.getElementById("dl" + id).appendChild(m_dt);

          let m_a = document.createElement("a");
          m_a.setAttribute('href', 'web_url');
          document.getElementById("dt" + id).appendChild(m_a);

          let m_dd1 = document.createElement("dd");
          m_dd1.setAttribute('id', 'author' + id);
          document.getElementById("dl" + id).appendChild(m_dd1);

          let m_p = document.createElement("p");
          m_p.innerText = author;
          document.getElementById("author" + id).appendChild(m_p);


          let m_dd2 = document.createElement("dd");
          m_dd2.setAttribute('id', 'wish' + id);
          document.getElementById("dl" + id).appendChild(m_dd2);

          let m_span = document.createElement("span");
          m_span.setAttribute('id', 'w' + id);
          document.getElementById("wish" + id).appendChild(m_span);

          let m_click = document.createElement("p");
          m_click.innerText = click_count;
          document.getElementById("wish" + id).appendChild(m_click);
        }

        create_webtoon(i);
        // id = data[i].id;
        // name = data[i].name;

        // console.log(id, name);
      };
    

    }
  });

  // 여기에 포문 써서
  // 어레이 리스트 webtoonData에 담겨 있는 정보들 하나씩 뽑아내며 웹툰 카드 쭈르륵 만들어주기(?)

  console.log(webtoonData);
  
  for(let i = 0; i < webtoonData.length; i++) {
    id = webtoonData[i](id);
    console.log(id);
  };

  for(let i = 0; i < webtoonData.length; i++) {
    console.log(i);
    
  };
}

// 프론트 단에서는 월화수목금토일(0 ~ 6)
function settingWeek(check_week) {
  return check_week += 1
}