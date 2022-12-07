"use strict";

// import
import {crt, st, ctg} from "./data_options.js";
import {data_set} from "./data_set.js";

let loadDiv = document.querySelector(".loading");

// s : function
(function () {

  // init
  let dataOrign = [];
  let dataClone = [];
  let dataSort = [];

  // dataInit
  const dataInit = function(data, out) {
    // s : data array for each
    data.forEach(function(item) {
      out.push(`
        <tr data-sort="${item.date}" data-id="${item.id}" data-author="${item.author}" data-state="${item.state}">
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
    });
    // e : data array for each
  }

  // dataFilter
  const dataFilter = (data, query) => {
    return data.filter((i) =>
      i.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  // tableView
  const tableView = function(data, target) {
    let el = document.querySelectorAll(".article");
    if (el) {
      if(target) {
        let tr = [];
        let id = target.closest(".article").getAttribute("id");
        tr = dataFilter(data, id);
        // target.innerHTML = tr.join("");
        return new Promise((resolve, reject) => {
          resolve(target.innerHTML = tr.join(""));
        })
      } else {
        el.forEach(function(item) {
          let tr = [];
          let id = item.getAttribute("id");
          tr = dataFilter(data, id);
          // item.querySelector("tbody").innerHTML = tr.join("");
          return new Promise((resolve, reject) => {
            resolve(item.querySelector("tbody").innerHTML = tr.join(""));
          })
        });
      }
    }
    
    tableIndex();
    tableState();
    tableCopy();
    noteToggle();
  }

  // tableSet
  const tableSet = function() {
    let container = document.querySelector(".container.main");
    let article = [];
    for (let item in ctg) {
      let id = ctg[item].id;
      let title = ctg[item].title;
      // console.log(ctg[item]);
      article.push(`
        <!-- article -->
        <article class="article" id="${id}">
          <h2>${title}</h2>
          <!-- table -->
          <table class="table">
            <caption>${title}</caption>
            <thead>
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
            </thead>
            <tbody></tbody>
          </table>
          <!-- //table -->
        </article>
        <!-- //article -->
      `);
    }
    container.innerHTML = article.join("");

    // tableView
    tableView(dataOrign);
  }

  // tableState
  const tableState = function() {
    let el = document.querySelectorAll(".table tbody tr[data-state]");
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
        let text = item.dataset.state;
        if (text === state.text.fin) {
          item.classList.add("fin");
          state.count.fin++;
        } else if (text === state.text.mod) {
          item.classList.add("mod");
          state.count.mod++;
        } else if (text === state.text.del) {
          item.classList.add("del");
          state.count.del++;
        } else if (text === state.text.stay) {
          item.classList.add("stay");
          state.count.stay++;
        } else if (text === state.text.chk) {
          item.classList.add("chk");
          state.count.chk++;
        } else if (text === state.text.ing) {
          item.classList.add("ing");
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
  const tableIndex = function() {
    let el = document.querySelectorAll(".table td.index > p");
    let counter = document.querySelector(".counter");
    let length = el.length;
    counter.innerHTML = `총 ${length} 개`;
    if (el) {
      for (let i = 0; i < el.length; i++) {
        let item = el[i];
        let num = i + 1;
        item.innerText = num;
      }
    }
  }
  
  // filterSet
  const filterSet = function() {
    // typeAuthor
    let typeAuthor = document.querySelector(".filter select[name=author]");
    let author = [`<option value="">author</option>`];
    for (let item in crt) {
      author.push(`
        <option value="${crt[item]}">${crt[item]}</option>
      `);
    }
    typeAuthor.innerHTML = author.join("");
    
    // typeState
    let typeState = document.querySelector(".filter select[name=state]");
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

    // categoryFilter
    const categoryFilter = function() {
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

    // selectFilter
    const selectFilter = function() {
      let input = document.querySelector(".filter input[type=text]");
      let btn = document.querySelector(".filter .search .btn");
      let select = document.querySelectorAll(".filter select");
      // searchSel
      function searchSel(type) {
        // init
        let iv = input.value;

        // dataFilter 
        dataClone = dataFilter(dataOrign, iv);
        
        // tableView
        const runResult = async () => {
          console.log("loding");
          await tableView(dataClone);
          console.log("loding-end");
          loadDiv.classList.remove("active");
        }
        runResult();
        

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

      // select
      if (select) {
        select.forEach(function (item) {
          item.addEventListener("change", function() {
            let name = item.name;
            let option = item.options[item.selectedIndex].value;
            input.value = option;
            // 로딩 테스트
            loadDiv.classList.add("active");
            setTimeout(() => {
              searchSel(name);
            }, 0);
          });
        });
      }

      // keyword
      btn.addEventListener("click", function() {
        searchSel("keyword");
      });
      input.addEventListener("keyup", function() {
        if (window.event.keyCode == 13) {
          searchSel("keyword");
        }
      });
    }

    // run
    categoryFilter();
    selectFilter();
  }

  // tableCopy
  const tableCopy = function() {

    // setToast
    const setToast = function(target) {
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
  
    let el = document.querySelectorAll(".table td p"); //메모 복사 안됨
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
  const tableCheck = function() {

    const evt = function(e) {
      // console.log(e.currentTarget);
      e.currentTarget.classList.toggle("select");
    };
    function tableCheckEvt() {
      let el = document.querySelectorAll(".table tbody tr");
      if (el) {
        el.forEach(function (item) {
          item.addEventListener("click", evt);
        });
      }
    }
    tableCheckEvt();

    document.addEventListener("click", function() {
      tableCheckEvt();
    });
  }

  // noteToggle
  const noteToggle = function() {
    const evt = function(e) {
      console.log("noteToggleEvt!!!!! --- evt");
      e.currentTarget.closest(".note").classList.toggle("active");
    };
    
    const noteToggleEvt = function() {
      console.log("noteToggleEvt!!!!! --- loading");
      let note = document.querySelectorAll(".table td.note");
      if (note) {
        note.forEach(function (item) {
          let memo = item.querySelectorAll(".note-memo p");
          let btn = item.querySelector(".btn");
          if (memo.length > 1) {
            item.closest(".note").classList.add("multi");
            btn.addEventListener("click", evt);
          }
        });
      }
    }
    noteToggleEvt();
  }

  // waccToggle
  const waccToggle = function(e) {

    let idx = 0;
    let tog;
    const evt = function(e) {
      console.log(e.currentTarget);
      if (e.currentTarget.classList.contains("active")) {
        e.currentTarget.setAttribute("aria-expanded", "true");
      } else {
        e.currentTarget.setAttribute("aria-expanded", "false");
      }
    };
    function waccToggleInit() {
      tog = document.querySelectorAll("[data-wacc-toggle=true]");
      if (tog) {
        tog.forEach(function (item) {
          idx++;
          let ctrl = item.querySelector(".btn");
          let target = item.querySelector(".target");
          target.setAttribute("id", `ui-tog-${idx}`);
          ctrl.setAttribute("aria-expanded", "false");
          ctrl.setAttribute("aria-controls", `ui-tog-${idx}`);
          if (ctrl.classList.contains("active")) {
            ctrl.setAttribute("aria-expanded", "true");
          } else {
            ctrl.setAttribute("aria-expanded", "false");
          }
        });
      }
    }
    
    function waccToggleEvt() {
      if (tog) {
        tog.forEach(function (item) {
          let ctrl = item.querySelector(".btn");
          ctrl.addEventListener("click", evt);
        });
      }
    }
    
    waccToggleInit();
    document.addEventListener("click", function() {
      waccToggleInit();
      idx = 0;
      waccToggleEvt();
    });

  }

  // tableSort
  const tableSort = function() {
    let dateTh = document.querySelectorAll(".table th.date");
    if (dateTh) {
      
      let sortType;
      let arraySort;
      let tbody;

      // sortNum
      function sortNum (a, b) {
        // 숫자일때
        if (typeof a == "number" && typeof b == "number") {
          // return a - b;
          if (sortType == "sortasc") {
            return a - b;
          } else if (sortType == "sortdesc") {
            return b - a;
          }
        }
        // 문자포함일때 / , - 공백문자만 삭제하기
        let datasetA = a.dataset.sort;
        let datasetB = b.dataset.sort;
        let na = ( datasetA + "" ).replace(/[-,\s\xA0]+/gi, "");
        let nb = ( datasetB + "" ).replace(/[-,\s\xA0]+/gi, "");
        let numA = parseFloat( na ) + ""; 
        let numB = parseFloat( nb ) + ""; 
        if (numA == "NaN" || numB == "NaN" || na != numA || nb != numB) {
          return false; 
        }
        if (sortType == "sortasc") {
          return parseFloat( na ) - parseFloat( nb );
        } else if (sortType == "sortdesc") {
          return parseFloat( nb ) - parseFloat( na ); 
        }
      }

      // arrayReload
      function arrayReload(array, target) {
        let data = [];
        
        array.forEach(function(i) {
          let obj = new Object();

          obj.id = i.dataset.id;
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
        });

        // dataInit
        dataSort = [];
        dataInit(data, dataSort);
        
        // tableView
        tableView(dataSort, target);
      }

      // dateTh
      dateTh.forEach(function(item) {
        let asc = item.querySelector(".sortasc");
        let desc = item.querySelector(".sortdesc");
        asc.addEventListener("click", function() {
          sortType = this.getAttribute("class");
          tbody = this.closest(".table").querySelector("tbody");
          let arrayDate = [];
          let date = this.closest(".table").querySelectorAll(".table tbody tr");
          date.forEach(function (i) {
            arrayDate.push(i);
          });
          arraySort = arrayDate.sort(sortNum);
          arrayReload(arraySort, tbody);
        });
        desc.addEventListener("click", function() {
          sortType = this.getAttribute("class");
          tbody = this.closest(".table").querySelector("tbody");
          let arrayDate = [];
          let date = this.closest(".table").querySelectorAll(".table tbody tr");
          date.forEach(function (i) {
            arrayDate.push(i);
          });
          arraySort = arrayDate.sort(sortNum);
          arrayReload(arraySort, tbody); 
        });
      });
    }
  }


  


  // dataInit
  dataInit(data_set, dataOrign);
  
  // tableSet
  tableSet();

  // filterSet
  filterSet();
  
  // tableCheck
  tableCheck();

  // tableSort
  tableSort();


  
  // 테이블세팅 자동화 data_option 변수 처리
  // 정렬
  // json 로컬 저장
  // 인클루드
  // 다크모드
  // 로딩
  // ia 디자인
  // core
  // 코드정리 init, 실행부 분리
  // 접근성 분리
  // 제이슨 방식

  // 팝업 1.딤체크 / 2.딤에따른 분기 / 3.팝업의 현재 z-index / 4.팝업종류

  // 검색속도 개선

  // async function f() {
  //   return Promise.resolve(1);
  // }
  
  // f().then(alert); // 1

  

})();
// e : function



// async test
async function f() {

  let promise = new Promise((resolve, reject) => {
    // setTimeout(() => resolve(loadTime), loadTime);
    resolve("loadTime")
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  console.log(result);
}
// f();



// 제이슨 파일 테스트
async function showJson() {
  console.log("start!!")

  // then
  // fetch("/assets/js/json_test.json")
  // .then((response) => response.json())
  // .then((data) => console.log(data));


  // exexexexex
  // // JSON 읽기
  // let response = await fetch('/article/promise-chaining/user.json');
  // let user = await response.json();

  // // github 사용자 정보 읽기
  // let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  // let githubUser = await githubResponse.json();

  // // 아바타 보여주기
  // let img = document.createElement('img');
  // img.src = githubUser.avatar_url;
  // img.className = "promise-avatar-example";
  // document.body.append(img);

  // // 3초 대기
  // await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  // img.remove();

  // return githubUser;
  // exexexexex

  // JSON 읽기
  let response = await fetch('/assets/js/json_test.json');
  let test = await response.json();
  

  // 3초 대기
  // await new Promise((resolve, reject) => resolve(array.push(test)));

  console.log(test.data_03);

  // test.forEach(function (item) {
  //   console.log(item);
  // });
}
// showJson();



// 테스트
function showTest() {
  let td = document.querySelectorAll(".table tbody td p");
  if (td) {
    td.forEach(function (item) {
      // let text = item.innerText;
      // item.closest("tr").classList.add("hide");
      // if (text.includes(iv)) {
      //   setTimeout(() => {
      //     item.closest("tr").classList.remove("hide");       
      //   }, 100);
      // } else if (iv == "") {
      //   item.closest("tr").classList.remove("hide");
      // }
      console.log(item);
    });
  }
}
// showTest();

// 로딩 테스트
window.addEventListener('DOMContentLoaded', function() {
  
  loadDiv.classList.remove("active");

  // 시간체크
  setTimeout(function() {
    var ntime = performance.timing;
    var total = ntime.loadEventEnd - ntime.navigationStart; //전체 소요시간
    var redirect = ntime.redirectEnd - ntime.redirectStart; // 동일 origin에서의 redirect 시간
    var cache = ntime.domainLookupStart - ntime.fetchStart; // cache 시간
    var dnslookup = ntime.domainLookupEnd - ntime.domainLookupStart; //DNS Lookup 시간
    var connect = ntime.connectEnd - ntime.connectStart; // 웹서버 연결 시간
    var request = ntime.responseStart - ntime.requestStart; // 요청 소요 시간
    var response = ntime.responseEnd - ntime.responseStart; // 응답 데이터를 모두 받은 시간
    var dom = ntime.domComplete - ntime.domLoading; // DOM객체 생성 시간 *******************
    var load = ntime.loadEventEnd - ntime.loadEventStart; // 브라우저의 Load 이벤트 실행시간
    var pageEnd = ntime.loadEventEnd - ntime.responseEnd; //  서버에서 페이지를 받고 페이지를 로드하는데 걸린 시간
    // var networkDelay = ntime.responseEnd - ntime.fetchStart; //  네트워크 지연 시간
     
    console.log("total : " + total + "ms  >>>>>>>  전체 소요시간");
    console.log("redirect : " + redirect + "ms  >>>>>>>   동일 origin에서의 redirect 시간");
    console.log("cache : " + cache + "ms   >>>>>>>  cache 시간");
    console.log("dnslookup : " + dnslookup + "ms  >>>>>>>  DNS Lookup 시간");
    console.log("connect : " + connect + "ms  >>>>>>>  웹서버 연결 시간");
    console.log("request : " + request + "ms  >>>>>>>  요청 소요 시간");
    console.log("response : " + response + "ms  >>>>>>>  첫 응답으로 부터 응답 데이터를 모두 받은 시간");
    console.log("dom : " + dom + "ms  >>>>>>>  DOM객체 로드 완료 시간");
    console.log("load : " + load + "ms  >>>>>>>  브라우저의 Load 이벤트 실행시간");
    console.log("pageEnd : " + pageEnd + "ms  >>>>>>>  서버에서 페이지를 받고 페이지를 로드하는데 걸린 시간");
                 
  }, 6000);

  console.log("==================== start!! ====================");
});

// 로딩시간 체크
// window.onload = function(){

//   setTimeout(function(){

//     let t = performance.timing.loadEventEnd - performance.timing.responseEnd;
//     console.log(t);
//     console.log(performance.timing.loadEventEnd);
//     console.log(performance.timing.responseEnd);

//   }, 0);

// }

// window.addEventListener('DOMContentLoaded', function() {
//   // let t = performance.timing.loadEventEnd - performance.timing.responseEnd;
//   // console.log(t);
  
//   setTimeout(function(){

//     // let t = performance.timing.loadEventEnd - performance.timing.responseEnd;
//     // console.log(t);
//     console.log(performance.timing.loadEventEnd);
//     console.log(performance.timing.responseEnd);

//   }, 0);
// });


// async 테스트
function gotoCodestates() {
  return new Promise((resolve, reject) => {
      setTimeout(() => { resolve('1. go to codestates') }, Math.floor(Math.random() * 10000) + 1)
  })
}

function sitAndCode() {
  return new Promise((resolve, reject) => {
      setTimeout(() => { resolve('2. sit and code') }, Math.floor(Math.random() * 10000) + 1)
  })
}

function eatLunch() {
  return new Promise((resolve, reject) => {
      setTimeout(() => { resolve('3. eat lunch') }, Math.floor(Math.random() * 10000) + 1)
  })
}

function goToBed() {
  return new Promise((resolve, reject) => {
      setTimeout(() => { resolve('4. goToBed') }, Math.floor(Math.random() * 10000) + 1)
  })
}

const result2232 = async () => {

  loadDiv.classList.add("active");

  console.log("loding");

  const one = await gotoCodestates();
  console.log(one);

  const two = await sitAndCode();
  console.log(two);

  const three = await eatLunch();
  console.log(three);

  const four = await goToBed();
  console.log(four);

  loadDiv.classList.remove("active");
}

// document.addEventListener("click", function() {
//   result2232();
// });