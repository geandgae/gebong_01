"use strict";

// import
import {crt, st, ctg} from "./data_options.js";
import {data_set} from "./data_set.js";


// s : function
(function () {

  // var
  const lengthCategory = [];
  // const lengthCreator = Object.keys(crt).length;
  // const lengthState = Object.keys(st).length;


  // setTable
  function setTable() {
    let container = document.querySelector(".container.main");
    let article = [];
    for (let item in ctg) {
      let id = ctg[item].id;
      let title = ctg[item].title;
      lengthCategory.push(id);
      // console.log(ctg[item]);
      article.push(`
        <!-- article -->
        <article class="article" id="${id}">
          <h2>${title}</h2>
          <!-- table -->
          <table class="table">
            <caption>${title}</caption>
            <thead></thead>
            <tbody></tbody>
          </table>
          <!-- //table -->
        </article>
        <!-- //article -->
      `);
    }
    container.innerHTML = article.join("");
    // run tableData
    tableData(data_set, lengthCategory);
  }

  // setFilter
  function setFilter() {
    // typeAuthor
    let typeAuthor = document.querySelector(".filter select[name=type_author]");
    let author = [`<option value="">author</option>`];
    for (let item in crt) {
      author.push(`
        <option value="${crt[item]}">${crt[item]}</option>
      `);
    }
    typeAuthor.innerHTML = author.join("");
    
    // typeState
    let typeState = document.querySelector(".filter select[name=type_state]");
    let state = [`<option value="">state</option>`];
    for (let item in st) {
      state.push(`
        <option value="${st[item]}">${st[item]}</option>
      `);
    }
    typeState.innerHTML = state.join("");

    // typeCategory
    let typeCategory = document.querySelector(".category");
    let category = [`<li><button type="button" class="btn" id="table_all">전체보기</button></li>`];
    for (let item in ctg) {
      let id = ctg[item].id;
      let title = ctg[item].title;
      category.push(`
        <li><button type="button" class="btn" id="${id}">${title}</button></li>
      `);
    }
    typeCategory.innerHTML = category.join("");

  }
  
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

  // tableData
  function tableData(data, length) {
    // s : length array
    for (let target of length) {

      // s : data array
      let td = [];
      for (let item of data) {
        // console.log(item.depth1);
        // console.log(data[0]);
        if(item.id == target) {
          td.push(`
            <tr data-sort="${item.date}">
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
              <td class="note" data-wacc-toggle="true">
                <button type="button" class="btn" title="더보기"><i></i></button>
                <div class="note-memo target">
                  ${item.note}
                </div>
              </td>
            </tr>
          `);
        } 
      }
      // e : data array

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
          <th class="date">
            date
            <button class="sortasc">▲</button>
            <button class="sortdesc">▼</button>
          </th>
          <th class="state">state</th>
          <th class="author">author</th>
          <th class="note">note</th>
        </tr>
      `;

      // table view
      let el = document.querySelectorAll(".article");
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
    // e : length array
  }

  // tableState
  function tableState() {
    let el = document.querySelectorAll(".table td.state > p");
    let l = el.length;
    let state = {
      text : {
        fin : st.fin,
        mod : st.mod,
        del : st.del,
        stay : st.stay,
        chk : st.chk,
        ing : st.ing,
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
        let text = item.innerText;
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
  }

  // tableIndex
  function tableIndex() {
    let el = document.querySelectorAll(".table td.index > p");
    let l = el.length;
    if (el) {
      for (let i = 0; i < l; i++) {
        let item = el[i];
        let num = i + 1;
        item.innerText = num;
      }
    }
  }

  // tableFilter
  function tableFilter() {
    let input = document.querySelector(".filter input[type=text]");
    let btn = document.querySelector(".filter .search .btn");
    let td = document.querySelectorAll(".table tbody td p");
    let select = document.querySelectorAll(".filter select");
    let tds = document.querySelectorAll(".table tbody td p");

    // searchInc
    function searchInc() {
      let iv = input.value;
      // console.log(iv);
      if (td) {
        td.forEach(function (item) {
          let text = item.innerText;
          item.closest("tr").classList.add("hide");
          if (text.includes(iv)) {
            setTimeout(() => {
              item.closest("tr").classList.remove("hide");       
            }, 100);
          } else if (iv == "") {
            item.closest("tr").classList.remove("hide");
          }
        });
      }
      // reset
      if (select) {
        select.forEach(function (item) {
          item.value = "";
        });
      }
    }

    // searchSel
    function searchSel(type) {
      let iv = input.value;
      if (type === "type_author") {
        // console.log("author")
        tds = document.querySelectorAll(".table tbody td.author p");
      } else if (type === "type_state") {
        // console.log("state")
        tds = document.querySelectorAll(".table tbody td.state p");
      }
      
      // console.log(iv);
      if (tds) {
        tds.forEach(function (item) {
          let text = item.innerText;
          item.closest("tr").classList.add("hide");
          if (iv == text) {
            setTimeout(() => {
              item.closest("tr").classList.remove("hide");       
            }, 100);
          } else if (iv == "") {
            item.closest("tr").classList.remove("hide");
          }
        });
      }
      
      // reset
      if (select) {
        select.forEach(function (item) {
          if (type === item.name) {
            item.classList.remove("reset")
          } else {
            item.classList.add("reset")
          }
          if (item.classList.contains("reset")) {
            item.value = "";
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

  // categoryFilter
  function categoryFilter() {
    let article = document.querySelectorAll(".article");
    let btn = document.querySelectorAll(".filter .category .btn");

    if (btn) {
      btn.forEach(function (item) {
        item.addEventListener("click", function() {
          let id = item.id;
          // article
          article.forEach(function (i) {
            i.classList.add("hide");
            if (id === i.id) {
              i.classList.remove("hide");
            } else if (id === "table_all") {
              i.classList.remove("hide");
            }
          });
        });
      });
    }
  }

  // noteToggle
  function noteToggle() {
    let note = document.querySelectorAll(".table td.note");
    let btn = document.querySelectorAll(".table td.note .btn");

    if (note) {
      note.forEach(function (item) {
        let memo = item.querySelectorAll(".note-memo p");
        memo.forEach(function (i) {
          if (memo.length > 1) {
            i.closest(".note").classList.add("multi");
          }
        });
      });
    }

    if (btn) {
      btn.forEach(function (item) {
        item.addEventListener("click", function() {
          item.closest(".note").classList.toggle("active");
          item.classList.toggle("active");
        });
      });
    }
  }

  // waccToggle
  function waccToggle() {
    let idx = 0;
    let tog = document.querySelectorAll("[data-wacc-toggle=true]");
    if (tog) {
      tog.forEach(function (item) {
        idx++;
        let ctrl = item.querySelector(".btn");
        let target = item.querySelector(".target");
        target.setAttribute("id", `ui-tog-${idx}`);
        ctrl.setAttribute("aria-expanded", "false");
        ctrl.setAttribute("aria-controls", `ui-tog-${idx}`);
        ctrl.addEventListener("click", function() {
          if (this.classList.contains("active")) {
            this.setAttribute("aria-expanded", "true");
          } else {
            this.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  }


  

  


  // run functions
  // setTable
  setTable();
  // setFilter
  setFilter();  
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
  // categoryFilter
  categoryFilter();
  // noteToggle
  noteToggle();

  // waccToggle
  waccToggle();
  
  // 테이블세팅 자동화 data_option 변수 처리
  // 정렬
  // json 로컬 저장
  // 인클루드
  // 다크모드
  // 로딩
  // ia 디자인
  // 접근성 
  // core

  let tagA = document.querySelector("table");
  function exTest(text) {
    // 태그네임 소문자로
    let a1 = text.tagName.toLowerCase();
    console.warn("--------------Test--------------");
    console.log(a1);
    console.log(tagA.tBodies[0]);
    console.warn("--------------Test--------------");
  }
  exTest(tagA);

  

  // 숫자 실수 적용
  function sortingNumber(a, b){  
    if (typeof a == "number" && typeof b == "number") {
      return a - b;
    }
    // , - 공백문자만 삭제하기.  
    let na = ( a + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let nb = ( b + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let numA = parseFloat( na ) + ""; 
    let numB = parseFloat( nb ) + ""; 
    if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
      return false; 
    } 
    return parseFloat( na ) - parseFloat( nb ); 
  }
  console.log(sortingNumber("2022-12-11", "2022-10-31"));


  // changeForSorting() : 문자열 바꾸기
  function changeForSorting(first, second){  
    // 문자열의 복사본 만들기. 
    let a = first.toString().replace(/[\s\xA0]+/g, " "); 
    let b = second.toString().replace(/[\s\xA0]+/g, " "); 
    let change = { first : a, second : b }; 

    if (a.search( /\d/ ) < 0 || b.search( /\d/ ) < 0 || a.length == 0 || b.length == 0) {
      return change;
    }

    let regExp = /(\d),(\d)/g; // 천단위 쉼표를 찾기 위한 정규식. 

    a = a.replace(regExp, "$1" + "$2"); 
    b = b.replace(regExp, "$1" + "$2"); 

    let unit = 0; 
    let aNb = a + " " + b; 
    let numbers = aNb.match(/\d+/g); // 문자열에 들어있는 숫자 찾기 

    for ( let x = 0; x < numbers.length; x++ ){ 
      let length = numbers[ x ].length; 
      if ( unit < length ) unit = length; 
    } 

    let addZero = function( string ){ // 숫자들의 단위 맞추기 

      let match = string.match( /^0+/ ); 

      if ( string.length == unit ) return ( match == null ) ? string : match + string; 

      let zero = "0"; 

      for ( let x = string.length; x < unit; x++ ) string = zero + string; 

      return ( match == null ) ? string : match + string; 
    }; 

    change.first = a.replace( /\d+/g, addZero ); 
    change.second = b.replace( /\d+/g, addZero ); 

    return change; 
  } 
  console.log(changeForSorting("first", "second"));

  let korean = [ "티스토리", "다음", "네이버", "드림위즈" ]; 
  let english = [ "Google", "Stackoverflow", "Yahoo!", "Ask", "Bing" ]; 
  let others = [ "Übel", "Ubah", "Atom", "Änderung", "Ansage" ]; 
  let number = [ 100, 25, 5, 40, 1, 10 ]; 
  let string = [ "100", "25", "5", "40", "1", "10" ]; 
  let overall = [ "티스토리", "Google", "Übel", "Ubah", 100, 25, "5", "40" ]; 

  function compare ( a , b ) { return a - b; } 

  function ascending ( a , b ) {  
    if ( a < b ) return -1; 
    else if ( a == b ) return 0; 
    else return 1; 
  }
  function descending ( a , b ) {
    if ( b < a ) return -1;
    else if ( b == a ) return 0; 
    else return 1;     
  } 

  // console.log(korean.sort(compare));
  // console.log(korean.sort(ascending));
  // console.log(korean.sort(descending));
  // console.log(korean.sort());
  // console.log(number.sort(compare));
  // console.log(number.sort());
  // console.log(string.sort(compare));
  // console.log(string.sort());
  // console.log(overall.sort(compare));
  // console.log(overall.sort());
  // console.log(english.sort());
  // console.log(others.sort());
  // console.log(number.sort());
  // console.log(string.sort());
  // console.log(overall.sort());

  function srtNum (a, b){  
    if (typeof a == "number" && typeof b == "number") {
      return b - a;
    }
    // , - 공백문자만 삭제하기.  
    let na = ( a + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let nb = ( b + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let numA = parseFloat( na ) + ""; 
    let numB = parseFloat( nb ) + ""; 
    if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
      return false; 
    } 
    return parseFloat( nb ) - parseFloat( na ); 
  }

  function srtNum2 (a, b){  
    if (typeof a == "number" && typeof b == "number") {
      return a - b;
    }
    // , - 공백문자만 삭제하기.  
    let na = ( a + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let nb = ( b + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let numA = parseFloat( na ) + ""; 
    let numB = parseFloat( nb ) + ""; 
    if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
      return false; 
    } 
    return parseFloat( na ) - parseFloat( nb ); 
  }


  // 전체 배열 테스트
  // let arrayDate = [];
  // let dataTd = document.querySelectorAll(".table tbody tr");
  // console.log(dataTd);
  // if (dataTd) {
  //   dataTd.forEach(function (item) {
  //     let date = item.querySelector("td.date p").innerText;
  //     arrayDate.push(date);
  //   });
  // }
  
  // old
  // let dateTh = document.querySelectorAll(".table th.date");
  // if (dateTh) {
  //   dateTh.forEach(function (item) {
  //     item.addEventListener("click", function() {
  //       let arrayDate = [];
  //       let date = this.closest(".table").querySelectorAll(".table tbody tr");
  //       date.forEach(function (i) {
  //         arrayDate.push(i.dataset.sort);
  //       });
  //       console.log(arrayDate);
  //       console.log(arrayDate.sort(srtNum));
  //     });
  //   });
  // }


  // 신규 작성 2022-11-28
  function srtAsc (a, b){
    let datasetA = a.dataset.sort;
    let datasetB = b.dataset.sort;
    if (typeof a == "number" && typeof b == "number") {
      return a - b;
    }
    // , - 공백문자만 삭제하기.
    let na = ( datasetA + "" ).replace(/[-,\s\xA0]+/gi, "");
    let nb = ( datasetB + "" ).replace(/[-,\s\xA0]+/gi, "");
    let numA = parseFloat( na ) + ""; 
    let numB = parseFloat( nb ) + ""; 
    if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
      return false; 
    } 
    return parseFloat( na ) - parseFloat( nb );
  }
  function srtDesc (a, b){
    let datasetA = a.dataset.sort;
    let datasetB = b.dataset.sort;  
    if (typeof a == "number" && typeof b == "number") {
      return b - a;
    }
    // , - 공백문자만 삭제하기.  
    let na = ( datasetA + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let nb = ( datasetB + "" ).replace(/[-,\s\xA0]+/gi, ""); 
    let numA = parseFloat( na ) + ""; 
    let numB = parseFloat( nb ) + ""; 
    if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
      return false; 
    } 
    return parseFloat( nb ) - parseFloat( na ); 
  }

  

  // 실행부
  let dateTh = document.querySelectorAll(".table th.date");
  if (dateTh) {
    
    let arraySort;
    let tbody;

    // tableSort
    function tableSort(array) {
      tbody.innerHTML = "";
      console.log(array);
      console.log(tbody);
      let td = [];
      let data = [];
      
      array.forEach(function (i) {
        
        let obj = new Object();

        obj.depth1 = i.querySelector(".depth1").innerText;
        obj.depth2 = i.querySelector(".depth2").innerText;
        obj.depth3 = i.querySelector(".depth3").innerText;
        obj.depth4 = i.querySelector(".depth4").innerText;
        obj.view_id = i.querySelector(".id").innerText;
        obj.view_name = i.querySelector(".name").innerText;
        obj.view_url = i.querySelector(".url").innerText;
        obj.date = i.querySelector(".date").innerText;
        obj.state = i.querySelector(".state").innerText;
        obj.author = i.querySelector(".author").innerText;
        obj.note = i.querySelector(".note-memo").innerHTML;

        data.push(obj);
        // console.log(data);

      });

      for (let item of data) {
        td.push(`
          <tr data-sort="${item.date}">
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
            <td class="note" data-wacc-toggle="true">
              <button type="button" class="btn" title="더보기"><i></i></button>
              <div class="note-memo target">
                ${item.note}
              </div>
            </td>
          </tr>
        `);
      }

      tbody.innerHTML = td.join("");

      noteToggle();
      waccToggle();
      tableState();
      tableIndex();
    }

    // dateTh
    dateTh.forEach(function (item) {
      let asc = item.querySelector(".sortasc");
      let desc = item.querySelector(".sortdesc");
      asc.addEventListener("click", function() {
        tbody = this.closest(".table").querySelector("tbody");
        let arrayDate = [];
        let date = this.closest(".table").querySelectorAll(".table tbody tr");
        date.forEach(function (i) {
          // console.log(i);
          // arrayDate.push(i.dataset.sort);
          arrayDate.push(i);
        });
        // console.log(arrayDate[0].closest("table"));
        // console.log(arrayDate);
        arraySort = arrayDate.sort(srtAsc);
        tableSort(arraySort);     
      });
      desc.addEventListener("click", function() {
        tbody = this.closest(".table").querySelector("tbody");
        let arrayDate = [];
        let date = this.closest(".table").querySelectorAll(".table tbody tr");
        date.forEach(function (i) {
          // arrayDate.push(i.dataset.sort);
          arrayDate.push(i);
        });
        // console.log("원본 " + arrayDate);
        // console.log(arrayDate.sort(srtDesc));
        arraySort = arrayDate.sort(srtDesc);
        tableSort(arraySort); 
      });
    });
  }
  




})();
// e : function