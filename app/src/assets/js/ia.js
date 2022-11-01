"use strict";

// s : load
// window.addEventListener("load", function() {
// window.addEventListener('load', init);
// document.addEventListener('DOMContentLoaded', init);
// s : function
(function () {




  /* [html 최초 로드 및 이벤트 상시 대기 실시] */
  window.onload = function () {
    console.log("");
    console.log("[window onload] : [start]");
    console.log("");

    // [이벤트 함수 호출]
    main();
  };

  /* [이벤트 수행 함수] */
  function main() {
    console.log("");
    console.log("[main] : [start]");
    console.log("");

    //로컬 assets 파일에 저장된 json 파일 읽기 실시 [json 파일에 선언된 변수이름으로 호출해야합니다]
    // var jsonData = JSON.parse(JSON.stringify(args));
    // console.log("");
    // console.log("[main] : [jsonData] : " + JSON.stringify(jsonData));
    // console.log("");

    // //json 데이터 파싱 실시
    // console.log("");
    // console.log("[main] : [idx] : " + jsonData.idx);
    // // console.log("[main] : [name] : " + jsonData.name);
    // // console.log("[main] : [program] : " + JSON.stringify(jsonData.program));
    // console.log("");
  }

  // <-- JSON데이터를 받아서 정보를 넣어주는 함수 생성 -->
  function renderTable(data, target) {
    // <-- 빈배열에 문자열로 푸쉬해줄 예정 -->
    let tbodyData = [];
    // <-- 이터레이터는 회원한명의 정보(객체로된) -->
    for (const item of data) {
      // <-- ['...', '...', ... , '...'] -->
      // <-- 위와 같이 배열안에 총 열개의 문자열이 생길것임 -->
      // <-- 백틱을 써주는 것을 꼭 명심 -->
      // console.log(tbodyData);
      // console.log(data[0]);
      tbodyData.push(`
        <tr>
          <td class="index"><p></p></td>
          <td class="depth1"><p>${item.depth1}</p></td>
          <td class="depth2"><p>${item.depth2}</p></td>
          <td class="depth3"><p>${item.depth3}</p></td>
          <td class="depth4"><p>${item.depth4}</p></td>
          <td class="id"><p>${item.view_id}</p></td>
          <td class="name"><p>${item.view_name}</p></td>
          <td class="url"><p><a href="${item.view_url}" target="blank">${item.view_url}</a></p></td>
          <td class="date"><p>${item.date}</p></td>
          <td class="state"><p>${item.state}</p></td>
          <td class="author"><p>${item.author}</p></td>
          <td class="note">${item.note}</td>
        </tr>
      `);
    }

    // table target
    let thead = `
      <tr>
        <th class="index">no</th>
        <th class="depth1">depth1</th>
        <th class="depth2">depth2</th>
        <th class="depth3">depth3</th>
        <th class="depth4">depth4</th>
        <th class="id">id</th>
        <th class="name">name</th>
        <th class="url">url</th>
        <th class="date">date</th>
        <th class="state">state</th>
        <th class="author">author</th>
        <th class="note">note</th>
      </tr>
    `;
    let table = document.querySelectorAll(".table");
    if (table) {
      table.forEach(function (item) {
        let id = item.getAttribute("id");
        if (id == target) {
          console.log(target);
          item.querySelector("thead").innerHTML = thead;
          item.querySelector("tbody").innerHTML = tbodyData.join("");
        }
      });
    }
  }
  renderTable(data_01, "table_01");
  renderTable(data_02, "table_02");

  // tableState
  function tableState() {
    let state = document.querySelectorAll(".table td.state > p");
    if (state) {
      state.forEach(function (item) {
        let text = item.innerHTML;
        console.log(text);
        if (text === "완료") {
          item.closest("tr").classList.add("fin");
        } else if (text === "수정") {
          item.closest("tr").classList.add("mod");
        } else if (text === "삭제") {
          item.closest("tr").classList.add("del");
        }
      });
    }
  }
  tableState();

  // tableCopy
  function tableCopy() {
    let copy = document.querySelectorAll(".table td > p");
    if (copy) {
      copy.forEach(function (item) {
        item.addEventListener("click", function() {
          let range = document.createRange();
          let sel = window.getSelection();
          range.selectNode(item); //텍스트 정보를 Range 객체에 저장
          sel.removeAllRanges(); //기존 선택정보 삭제
          sel.addRange(range); //텍스트 정보 선택
          document.execCommand("copy"); //복사
          sel.removeRange(range); //선택 정보 삭제
          // 복사한 정보 보기
          let copy_text = range.endContainer.innerText;
          // toast
          setToast(copy_text);
        });
      });
    }
  }
  tableCopy();

  // tableIndex
  function tableIndex() {
    let index = document.querySelectorAll(".table tbody td.index p");
    let length = index.length;
    // console.log(index);
    for (let i = 0; i < length; i++) {
      let num = i + 1;
      let item = index[i];
      // console.log(num);
      item.innerHTML = num;
    }
  }
  tableIndex();

  // set toast
  function setToast(target) {
    let outland = document.querySelector("#outland");
    let toast = `
      <div class="toast">
        <div class="inner">
          <p class="text">
            <span class="var">
              "<em>${target}</em>"
            </span>
            <span>복사되었습니다.</span>
          </p>
        </div>
      </div>
    `;
    outland.innerHTML = toast;
    // setTimeout(() => {
    //   outland.innerHTML = "";     
    // }, 500);
  }


  // check_test
  function check_test() {
    let tr = document.querySelectorAll(".table tbody tr");
    if (tr) {
      tr.forEach(function (item) {
        item.addEventListener("click", function() {
          item.classList.add("select");
        });
      });
    }
  }
  check_test();



  // ----------- 검색 작업중 -----------------
  // tableSearch
  function tableSearch() {
    let data = document.querySelectorAll(".table td > p");

    console.log(data)

    function search() {
      let text = document.getElementsByClassName("search-text")[0].value;
      text = parseInt(text);

      let res = data.find((element) => {
        return element === text;
      });

      document.getElementById("result").innerText = res;
    }
    document.getElementById("btn").addEventListener("click", search);
  }
  // tableSearch();

  // searchFilter
  function searchFilter(data, type, search) {
    // data 값을 하나하나 꺼내와서
    return data.map((d) => {
        // 만약 해당 데이터가 search 값을 가지고 있다면 리턴한다.
        if (d[type].includes(search)) {
            return d;
        }
    });
  }
  // search 버튼 클릭 시 호출되는 함수
  function search() {
    // 폼에 입력된 값
    let sel = document.getElementById("search-select").value;
    let text = document.getElementsByClassName("search-text")[0].value;

    // res [undefined, {id:, name: favorites:}, undefined] 이런식으로 리턴
    // 따라서 undefined 값을 제거해줘야하기 때문에 filter 메소드 적용
    let res = searchFilter(data_01, sel, text).filter((d) => d !== undefined);

    // 결과 값 화면 출력
    document.getElementById("result").innerText = res.map((d) => d.index);
  }
  // 클릭 시 search 함수 호출
  // document.getElementById("btn").addEventListener("click", search);



  // filter_test
  function start() {
    const button = document.querySelectorAll(".btn ");
    const storeItems = document.querySelectorAll(".store-item");

    button.forEach((b) =>
      b.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = e.target.dataset.filter;

        storeItems.forEach((i) => {
          if (filter === "all") {
            i.style.display = "block";
          } else {
            if (i.classList.contains(filter)) {
              i.style.display = "block";
            } else {
              i.style.display = "none";
            }
          }
        });
      })
    );
  }
  // start();


  // //input에 keyup 이벤트 등록
  // $("#inputSearchText").keyup(function(){
  //   //keyup 이벤트 발생 시 해당 input의 value 가져오기.
  //   var searchText = $(this).val();
  //   //실시간 검색이 필요한 table의 모든 행(tr) 숨김 처리
  //   $("#tableTarget > tbody > tr).hide();
  //   //해당 table에서 input에 입력한 데이터가 있는 td Element 찾기.
  //   var temp = $("#tableTarget > tbody > tr > td:contains('"+ searchText +"');
  //   //입력한 데이터가 있는 Elemnet의 부모 Elemnet(td)만 표시.
  //   $(temp).parent().show();
  // }

  // filter_test 
  function filter_test() {
    console.log("filter start!!!!!");
    let filter = document.querySelector(".filter input[type=text]");
    let btn = document.querySelector(".filter .btn");
    let input = document.querySelector(".filter input");
    let td = document.querySelectorAll(".table tbody td p");
    let select = document.querySelectorAll(".filter select");

    // filter_search
    function filter_search() {
      let search_text = filter.value;
      console.log(search_text);
      if (td) {
        td.forEach(function (item) {
          let text = item.innerHTML;
          // item.closest("tr").classList.remove("block");
          item.closest("tr").classList.add("hide");
          // if (search_text == text) {
          if (text.includes(search_text)) {
            // console.log(text);
            // item.closest("tr").style.display = "block";
            // item.closest("tr").style.display = "none";
            setTimeout(() => {
              item.closest("tr").classList.remove("hide");       
            }, 100);
          } else if (search_text == "") {
            item.closest("tr").classList.remove("hide");
          }
        });
      }
    }

    // enterKey
    function enterKey() {
      if (window.event.keyCode == 13) {
        // 키보드 테스트
        // window.onkeydown = (e) => console.log(e);
        window.addEventListener("keydown", (e) => console.log(e));
        filter_search();
      }
    }
    input.addEventListener("keyup", function() {
      enterKey();
    });

    

    // 선택
    if (select) {
      select.forEach(function (item) {
        item.addEventListener("change", function() {
          let option = item.options[item.selectedIndex].value;
          console.log(item);
          console.log(option);
          filter.value = option;
          filter_search();
        });
      });
    }

    // 검색
    btn.addEventListener("click", function() {
      filter_search();
    });
  }
  filter_test();
  


  let tagA = document.querySelector("table");
  function exTest(text) {
    // 태그네임 소문자로
    let a1 = text.tagName.toLowerCase();
    console.warn("--------------exTest--------------");
    console.log(a1);
    console.log(tagA.tBodies[0]);
    console.warn("--------------exTest--------------");
  }
  exTest(tagA);


  
  

  // 로딩
  // 정렬
  // 다크모드
  // 진행상태

  




})();
// e : function
// });
// e : load
