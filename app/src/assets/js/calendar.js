"use strict";

// s : function
const calendar = (function() {

  function test() {

    console.log(new Date()); // 현재 날짜(로컬 기준) 객체 만들기
    console.log(new Date(2021, 11, 6)); // 지정한 날짜 객체 만들기
    console.log(new Date('2021-12-06T03:24:00')); // 지정한 날짜 객체 만들기
    console.log("====================================================")
  
    // UTC 기준
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    console.log(today);
  
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
  
    // console.log(new Date().getFullYear());
    // console.log(new Date().getDate());
    // console.log(new Date().getDay());
    // console.log(new Date().getMonth());
  
    // 이전 달의 마지막 날 날짜와 요일 구하기
    let startDay = new Date(currentYear, currentMonth, 0);
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();
  
    // 이번 달의 마지막날 날짜와 요일 구하기
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    let nextDay = endDay.getDay();
    console.log(prevDate, prevDay, nextDate, nextDay);
  
  
    let calendar = document.querySelector(".calendar");
    calendar.innerHTML = "";
    // 지난달
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
      calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
    }
  
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
      calendar.innerHTML = calendar.innerHTML + `<div class="day current">${i}</div>`
    }
  }


  function calendarInit() {

    // 날짜 정보 가져오기
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    
    let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일
  
    // kst 기준 현재시간
    // console.log(thisMonth);
  
    // 캘린더 렌더링
    renderCalender(thisMonth);
  
    function renderCalender(thisMonth) {
  
        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();
  
        // 이전 달의 마지막 날 날짜와 요일 구하기
        let startDay = new Date(currentYear, currentMonth, 0);
        let prevDate = startDay.getDate();
        let prevDay = startDay.getDay();

        // console.log(startDay);
        // console.log(prevDate);
        // console.log(prevDay);
  
        // 이번 달의 마지막날 날짜와 요일 구하기
        let endDay = new Date(currentYear, currentMonth + 1, 0);
        let nextDate = endDay.getDate();
        let nextDay = endDay.getDay();
        
  
        // console.log(prevDate, prevDay, nextDate, nextDay);
  
        // 현재 월 표기
        let month = document.querySelector(".month");
        month.innerText = `${currentYear}.${currentMonth + 1}`;
  
        // 렌더링 html 요소 생성
        let calendar = document.querySelector(".calendar");
        calendar.innerHTML = '';

        console.log("prevDay" + prevDay);
        console.log("nextDay" + nextDay);
        console.log(7 - nextDay);
        
        // 지난달
        if (!(prevDay == 6)) {
          for (let i = prevDate - prevDay; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
          }
        }
        // 이번달
        for (let i = 1; i <= nextDate; i++) {
          calendar.innerHTML = calendar.innerHTML + `<div class="day current">${i}</div>`
        }
        // 다음달
        // if (!(nextDay == 6)) {
        //   for (let i = 1; i < 7 - nextDay; i++) {
        //     calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
        //   }
        // }
        if (!(prevDay == 6)) {
          for (let i = 1; i < 42 - nextDate - prevDay; i++) {
            calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
          }
        } else {
          for (let i = 1; i <= 42 - nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
          }
        }
  
        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth && today.getFullYear() == currentYear) {
          let todayDate = today.getDate();
          let currentMonthDate = document.querySelectorAll(".day.current");
          currentMonthDate[todayDate -1].classList.add('today');
        }
    }
  
    // 이전달로 이동
    let btnPrev = document.querySelector(".prev");
    btnPrev.onclick = () => {
      thisMonth = new Date(currentYear, currentMonth - 1, 1);
      renderCalender(thisMonth);
    }
    // 다음달로 이동
    let btnNext = document.querySelector(".next");
    btnNext.onclick = () => {
      thisMonth = new Date(currentYear, currentMonth + 1, 1);
      renderCalender(thisMonth);
    }

    // 이전년으로 이동
    let btnTop = document.querySelector(".top");
    btnTop.onclick = () => {
      thisMonth = new Date(currentYear - 1, currentMonth, 1);
      renderCalender(thisMonth);
    }
    // 다음년으로 이동
    let btnBottom = document.querySelector(".bottom");
    btnBottom.onclick = () => {
      thisMonth = new Date(currentYear + 1, currentMonth, 1);
      renderCalender(thisMonth);
    }
  }

  calendarInit();

  function calendarInit2() {

    // 날짜 정보 가져오기
    let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
    
    
    let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일
    
    // kst 기준 현재시간
    // console.log(thisMonth);
    
    // 캘린더 렌더링
    renderCalender(thisMonth);
    
    function renderCalender(thisMonth) {
      
        
        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        console.log(currentMonth);
  
        // 이전 달의 마지막 날 날짜와 요일 구하기
        let endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        let startDay = new Date(currentYear, currentMonth, 1).getDay();

        
        
        
  
        // 현재 월 표기
        let month = document.querySelector(".month");
        month.innerText = `${currentYear}.${currentMonth + 1}`;
  
        // 렌더링 html 요소 생성
        let calendar = document.querySelector(".calendar");
        calendar.innerHTML = '';
        
        // 지난달
        for (let i = 0; i < startDay; i++) {
          calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
        }
        for (var i = 1; i <= endDay; i++) { // 빈칸 이후의 달의 일수
          if (startDay != 7) {
            calendar.innerHTML = calendar.innerHTML + `<div class="day current">${i}</div>`
            startDay += 1;
          } else {
            calendar.innerHTML = calendar.innerHTML + `<div class="day current">${i}</div>`
            startDay -= 6;
          }
        }
        // // 이번달
        // for (let i = 1; i <= nextDate; i++) {
        //   calendar.innerHTML = calendar.innerHTML + `<div class="day current">${i}</div>`
        // }
        // // 다음달
        // for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        //   calendar.innerHTML = calendar.innerHTML + `<div class="day disabled">${i}</div>`
        // }
  
        // 오늘 날짜 표기
        // if (today.getMonth() == currentMonth) {
        //   let todayDate = today.getDate();
        //   let currentMonthDate = document.querySelectorAll(".day.current");
        //   currentMonthDate[todayDate -1].classList.add('today');
        // }
    }
  
    // 이전달로 이동
    let btnPrev = document.querySelector(".prev");
    btnPrev.onclick = () => {
      thisMonth = new Date(currentYear, currentMonth - 1, 1);
      renderCalender(thisMonth);
    }
    // 다음달로 이동
    let btnNext = document.querySelector(".next");
    btnNext.onclick = () => {
      thisMonth = new Date(currentYear, currentMonth + 1, 1);
      renderCalender(thisMonth);
    }
  }

  // calendarInit2();

  // 달력, 날짜 관련 변수 선언
  // let calendar = document.querySelector('.calendar');
  // let select_ym = document.querySelector('#select_ym');
  // let output = document.querySelector('#output');
  
  // let v_date = today.getDate(); // 오늘 일수
  // let v_day = today.getDay(); // 오늘 요일
  
  // let year = today.getFullYear(); // 올해
  // let month = today.getMonth(); // 이번 달
  // let v_year = today.getFullYear(); // 올해 (변함)
  // let v_month = today.getMonth(); // 이번 달 (변함)

  // function calendar_make(a, b) {
  //   if (a != undefined && b != undefined) { // 인수를 전달 받을 시 (달력 넘기기)
  //     v_year = a;
  //     v_month = b;
  //   } else { // 오늘로 이동
  //     v_year = year;
  //     v_month = month;
  //   }
  //   // 인수 받는 것을 처음에 둬야 이후 변수들에 대입되어 오류가 안 난다.
  //   let last_date = new Date(v_year, v_month + 1, 0).getDate(); // 이번달 마지막 일
  //   let first_day = new Date(v_year, v_month, 1).getDay(); // 이번 달 시작 요일 (0=>일, 1=>월 ...)
  //   select_ym.innerHTML = '<div>' + v_year + '년 ' + (v_month + 1) + '월' + '</div>';
   
  //   let row = calendar.insertRow();
  //   for (let i = 0; i < first_day; i++) { // 월의 시작일 전의 빈 칸
  //     let cell = row.insertCell();
  //   }
  //   for (let i = 1; i <= last_date; i++) { // 빈칸 이후의 달의 일수
  //     if (first_day != 7) {
  //       cell = row.insertCell();
  //       first_day += 1;
  //     } else {
  //       row = calendar.insertRow();
  //       cell = row.insertCell();
  //       first_day -= 6;
  //     }
  //     cell.setAttribute('id', i);
  //     cell.setAttribute('class', 'days');
  //     cell.addEventListener('click', function (self) {
  //       document.querySelector('#word_add').setAttribute('onclick', 'javascript:words_add(' + self.target.id + ')');
  //     })
  //     cell.innerHTML = i;
  //   }
  // }
  

})();
// e : function


