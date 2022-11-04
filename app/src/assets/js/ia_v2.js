"use strict";

// import
import {crt, st, ctg} from "./data_options.js";
import {data_set} from "./data_set.js";


// s : function
(function () {

  const lengthCreator = Object.keys(crt).length;
  const lengthState = Object.keys(st).length;
  const lengthCategory = Object.keys(ctg).length;

  console.log(lengthCreator);
  console.log(lengthState);
  console.log(lengthCategory);

  // setToast
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

  // setFilter
  function setFilter() {
    let filter = document.querySelector(".filter");
    let inc = `
      <ul class="progress-info">
        <li>전체 : ${l}</li>
        <li>${state.text.fin} : ${state.count.fin}</li>
        <li>${state.text.mod} : ${state.count.mod}</li>
        <li>${state.text.del} : ${state.count.del}</li>
        <li>${state.text.stay} : ${state.count.stay}</li>
        <li>${state.text.chk} : ${state.count.chk}</li>
        <li>${state.text.ing} : ${state.count.ing}</li>
      </ul>
      <div class="progress-bar">
        <div class="text">${total}%</div>  
        <div class="bar">
          <span role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${total}" style="width:${total}%"></span>
        </div>  
      </div>  
    `;
  }

  // tableData
  function tableData(data, target) {
    // data(table td) array
    let td = [];
    for (const item of data) {
      // console.log(item.depth1);
      // console.log(data[0]);
      if(item.depth1 == target) {
        td.push(`
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
    }

    // th
    let th = `
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

    // table target
    let el = document.querySelectorAll(".table");
    if (el) {
      el.forEach(function (item) {
        let id = item.getAttribute("id");
        if (id == target) {
          // console.log(target);
          item.querySelector("thead").innerHTML = th;
          item.querySelector("tbody").innerHTML = td.join("");
        }
      });
    }
  }

  // tableState
  function tableState() {
    let el = document.querySelectorAll(".table td.state > p");
    let l = el.length;
    let state = {
      text : {
        fin : "완료",
        mod : "수정",
        del : "삭제",
        stay : "대기",
        chk : "검수",
        ing : "진행",
      },
      count : {
        fin : 0,
        mod : 0,
        del : 0,
        stay : 0,
        chk : 0,
        ing : 0,
      },
    }
    if (el) {
      el.forEach(function (item) {
        let text = item.innerHTML;
        if (text === state.text.fin) {
          item.closest("tr").classList.add("fin");
          state.count.fin++;
        } else if (text === state.text.mod) {
          item.closest("tr").classList.add("mod");
          state.count.mod++;
        } else if (text === state.text.del) {
          item.closest("tr").classList.add("del");
          state.count.del++;
        } else if (text === state.text.stay) {
          item.closest("tr").classList.add("stay");
          state.count.stay++;
        } else if (text === state.text.chk) {
          item.closest("tr").classList.add("chk");
          state.count.chk++;
        } else if (text === state.text.ing) {
          item.closest("tr").classList.add("ing");
          state.count.ing++;
        }
      });
    }
    
    // process
    let total = Math.round((state.count.fin / l) * 100);
    let progress = document.querySelector(".progress");
    let inc = `
      <ul class="progress-info">
        <li>전체 : ${l}</li>
        <li>${state.text.fin} : ${state.count.fin}</li>
        <li>${state.text.mod} : ${state.count.mod}</li>
        <li>${state.text.del} : ${state.count.del}</li>
        <li>${state.text.stay} : ${state.count.stay}</li>
        <li>${state.text.chk} : ${state.count.chk}</li>
        <li>${state.text.ing} : ${state.count.ing}</li>
      </ul>
      <div class="progress-bar">
        <div class="text">${total}%</div>  
        <div class="bar">
          <span role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${total}" style="width:${total}%"></span>
        </div>  
      </div>  
    `;
    progress.innerHTML = inc;

    // function move() {
    //   var elem = document.getElementById("myBar");
    //   var width = 1;
    //   var id = setInterval(frame, 10);
    //   function frame() {
    //       if (width >= 100) {
    //           clearInterval(id);
    //       } else {
    //           width++;
    //           elem.style.width = width + '%';
    //       }
    //   }
    // }

    // function move() {
    //   var elem = document.getElementById("myBar");
    //   var width = 10;
    //   var id = setInterval(frame, 10);
    //   function frame() {
    //       if (width >= 100) {
    //           clearInterval(id);
    //       } else {
    //           width++;
    //           elem.style.width = width + '%';
    //           document.getElementById("label").innerHTML = width * 1 + '%';
    //       }
    //   }
    // }
  }

  // tableIndex
  function tableIndex() {
    let el = document.querySelectorAll(".table td.index > p");
    let l = el.length;
    if (el) {
      for (let i = 0; i < l; i++) {
        let item = el[i];
        let num = i + 1;
        item.innerHTML = num;
      }
    }
  }

  // tableFilter
  function tableFilter() {
    let input = document.querySelector(".filter input[type=text]");
    let btn = document.querySelector(".filter .btn");
    let td = document.querySelectorAll(".table tbody td p");
    let select = document.querySelectorAll(".filter select");
    let tds = document.querySelectorAll(".table tbody td p");

    // searchInc
    function searchInc() {
      let fv = input.value;
      // console.log(fv);
      if (td) {
        td.forEach(function (item) {
          let text = item.innerHTML;
          item.closest("tr").classList.add("hide");
          if (text.includes(fv)) {
            setTimeout(() => {
              item.closest("tr").classList.remove("hide");       
            }, 100);
          } else if (fv == "") {
            item.closest("tr").classList.remove("hide");
          }
        });
      }
    }

    // searchSel
    function searchSel(type) {
      let fv = input.value;
      if (type === "type_author") {
        // console.log("author")
        tds = document.querySelectorAll(".table tbody td.author p");
      } else if (type === "type_state") {
        // console.log("state")
        tds = document.querySelectorAll(".table tbody td.state p");
      }
      
      // console.log(fv);
      if (tds) {
        tds.forEach(function (item) {
          let text = item.innerHTML;
          item.closest("tr").classList.add("hide");
          if (fv == text) {
            setTimeout(() => {
              item.closest("tr").classList.remove("hide");       
            }, 100);
          } else if (fv == "") {
            item.closest("tr").classList.remove("hide");
          }
        });
      }
    }

    // enterKey
    function enterKey() {
      if (window.event.keyCode == 13) {
        searchInc();
        // 키보드 테스트
        // window.onkeydown = (e) => console.log(e);
        // window.addEventListener("keydown", (e) => console.log(e));
      }
    }

    // select
    if (select) {
      select.forEach(function (item) {
        item.addEventListener("change", function() {
          let name = item.name;
          let option = item.options[item.selectedIndex].value;
          // console.log(option);
          // console.log(name);
          input.value = option;
          searchSel(name);
        });
      });
    }

    // run
    btn.addEventListener("click", function() {
      searchInc();
    });
    input.addEventListener("keyup", function() {
      enterKey();
    });
  }

  // tableCopy
  function tableCopy() {
    let el = document.querySelectorAll(".table td > p");
    if (el) {
      el.forEach(function (item) {
        item.addEventListener("click", function() {
          let range = document.createRange();
          let sel = window.getSelection();
          range.selectNode(item); //텍스트 정보를 Range 객체에 저장
          sel.removeAllRanges(); //기존 선택정보 삭제
          sel.addRange(range); //텍스트 정보 선택
          document.execCommand("copy"); //복사
          sel.removeRange(range); //선택 정보 삭제
          // toast
          let copy = range.endContainer.innerText;
          setToast(copy);
        });
      });
    }
  }

  // tableCheck
  function tableCheck() {
    let el = document.querySelectorAll(".table tbody tr");
    if (el) {
      el.forEach(function (item) {
        item.addEventListener("click", function() {
          item.classList.toggle("select");
        });
      });
    }
  }

  

  


  // function run
  // tableData
  tableData(data_set, ctg.ct00);
  tableData(data_set, ctg.ct01);
  tableData(data_set, ctg.ct02);
  // tableState
  tableState();
  // tableIndex
  tableIndex();
  // tableFilter
  tableFilter();
  // tableCopy
  tableCopy();
  // tableCheck
  tableCheck();
  
  
  
  // 카테고리 정리(분류)
  // 진행상태
  // 검색 셀렉트 포커스
  // 인클루드
  // 다크모드
  // 로딩
  // 메모
  // 정렬
  // ia 디자인
  // 접근성 
  // core

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

  




})();
// e : function