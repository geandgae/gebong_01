"use strict";

// import
import {crt, st, ctg} from "./data_options.js";
import {data_00} from "./data_00.js";
import {data_01} from "./data_01.js";
import {data_02} from "./data_02.js";
import {data_03} from "./data_03.js";
import {data_set} from "./data_set.js";


// s : function
(function () {


  // tableData
  const tableData = function(data) {
    // table view
    let el = document.querySelectorAll(".article");
    if (el) {
      el.forEach(function(target) {
        let td = [];
        let id = target.getAttribute("id");

        // s : td array loop
        for (let i = 0; i < data.length; i++) {
          if (id == data[i].id) {  
            td.push(`
              <tr data-sort="${data[i].date}" data-id="${data[i].id}" data-author="${data[i].author}" data-state="${data[i].state}">
                <td class="index"><p>${[i + 1]}</p></td>
                <td class="depth1"><p>${data[i].depth1}</p></td>
                <td class="depth2"><p>${data[i].depth2}</p></td>
                <td class="depth3"><p>${data[i].depth3}</p></td>
                <td class="depth4"><p>${data[i].depth4}</p></td>
                <td class="id"><p>${data[i].view_id}</p></td>
                <td class="name"><p>${data[i].view_name}</p></td>
                <td class="url"><p><a href="${data[i].view_url}" target="blank">${data[i].view_url}</a></p></td>
                <td class="date"><p>${data[i].date}</p></td>
                <td class="state"><p>${data[i].state}</p></td>
                <td class="author"><p>${data[i].author}</p></td>
                <td class="note" data-wacc-toggle="true">
                  <button type="button" class="btn" title="더보기"><i></i></button>
                  <div class="note-memo target">
                    ${data[i].note}
                  </div>
                </td>
              </tr>
            `);
          }
        }
        // e : td array loop

        // s : data array for of
        // for (let item of data) {
        //   if(item.id == id) {
        //     td.push(`
        //       <tr data-sort="${item.date}" data-id="${item.id}">
        //         <td class="index"><p></p></td>
        //         <td class="depth1"><p>${item.depth1}</p></td>
        //         <td class="depth2"><p>${item.depth2}</p></td>
        //         <td class="depth3"><p>${item.depth3}</p></td>
        //         <td class="depth4"><p>${item.depth4}</p></td>
        //         <td class="id"><p>${item.view_id}</p></td>
        //         <td class="name"><p>${item.view_name}</p></td>
        //         <td class="url"><p><a href="${item.view_url}" target="blank">${item.view_url}</a></p></td>
        //         <td class="date"><p>${item.date}</p></td>
        //         <td class="state"><p>${item.state}</p></td>
        //         <td class="author"><p>${item.author}</p></td>
        //         <td class="note" data-wacc-toggle="true">
        //           <button type="button" class="btn" title="더보기"><i></i></button>
        //           <div class="note-memo target">
        //             ${item.note}
        //           </div>
        //         </td>
        //       </tr>
        //     `);
        //   } 
        // }
        // e : data array for of

        // s : data array for each
        // data.forEach(function(item) {
        //   if(item.id == id) {
        //     td.push(`
        //       <tr data-sort="${item.date}" data-id="${item.id}">
        //         <td class="index"><p></p></td>
        //         <td class="depth1"><p>${item.depth1}</p></td>
        //         <td class="depth2"><p>${item.depth2}</p></td>
        //         <td class="depth3"><p>${item.depth3}</p></td>
        //         <td class="depth4"><p>${item.depth4}</p></td>
        //         <td class="id"><p>${item.view_id}</p></td>
        //         <td class="name"><p>${item.view_name}</p></td>
        //         <td class="url"><p><a href="${item.view_url}" target="blank">${item.view_url}</a></p></td>
        //         <td class="date"><p>${item.date}</p></td>
        //         <td class="state"><p>${item.state}</p></td>
        //         <td class="author"><p>${item.author}</p></td>
        //         <td class="note" data-wacc-toggle="true">
        //           <button type="button" class="btn" title="더보기"><i></i></button>
        //           <div class="note-memo target">
        //             ${item.note}
        //           </div>
        //         </td>
        //       </tr>
        //     `);
        //   }
        // });
        // e : data array for each

        target.querySelector("tbody").innerHTML = td.join("");
        
      });
    }
  };

  // tableDataEach
  const tableDataEach = function(data, target) {
    let td = [];

    // s : data array for each
    data.forEach(function(item) {
      td.push(`
        <tr data-sort="${item.date}" data-id="${item.id}">
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

    // table view
    let el = document.querySelectorAll(".article");
    if (el) {
      el.forEach(function(item) {
        let id = item.getAttribute("id");
        if (id == target) {
          item.querySelector("tbody").innerHTML = td.join("");
        }
      });
    }

  };

  // tableDataFilter
  const tableDataFilter = function(data) {
    // array
    let td = [];
    data.forEach(function(item) {
      td.push(`
        <tr data-sort="${item.date}" data-id="${item.id}">
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

    // filterItems
    const filterItems = (query) => {
      return td.filter((i) =>
        i.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    }

    // table view
    let el = document.querySelectorAll(".article");
    if (el) {
      el.forEach(function(target) {
        let tda = [];
        let id = target.getAttribute("id");
        tda = filterItems(id);
        target.querySelector("tbody").innerHTML = tda.join("");
      });
    }
  };

  // setTable
  function setTable() {
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

    // run tableData
    tableData(data_set);

    // run tableDataEach
    // tableDataEach(data_00, "table_00");
    // tableDataEach(data_01, "table_01");
    // tableDataEach(data_02, "table_02");
    // tableDataEach(data_03, "table_05");

    // run tableDataFilter
    // tableDataFilter(data_set);
  }

  // tableIndex
  function tableIndex() {
    let el = document.querySelectorAll(".table td.index > p");
    if (el) {
      for (let i = 0; i < el.length; i++) {
        let item = el[i];
        let num = i + 1;
        item.innerText = num;
      }
    }
  }

  // setFilter
  function setFilter() {
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

    categoryFilter();
    tableFilter();
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

  // tableFilter
  function tableFilter() {
    let input = document.querySelector(".filter input[type=text]");
    let btn = document.querySelector(".filter .search .btn");
    let select = document.querySelectorAll(".filter select");
    let tra = document.querySelectorAll(".article:not(.hide) .table tbody tr");
    let td = document.querySelectorAll(".article:not(.hide) .table tbody td p");
    let tr;
    let reset = false;

    // searchSel
    function searchSel(type) {
      // init
      let sn = type;
      let iv = input.value;

      // keyword
      if(type == "keyword") {
        console.log(type);
        console.log(reset);
      }
      // select
      else {
        if(iv == "") {
          tr = "";
          reset = true;
        } else {
          tr = document.querySelectorAll(`.article:not(.hide) .table tbody tr[data-${sn}=${iv}]`);
          reset = false;
          console.log(tr);
        }
      }

      // view
      if (tr) {
        console.log(tr.length);
        // tra
        tra.forEach(function (item) {
          item.classList.add("hide");
        });
        // tr
        tr.forEach(function (item) {
          item.classList.remove("hide");
          input.value = "";
        });
      }

      // reset
      if (reset) {
        console.log("reset");
        // tra
        tra.forEach(function (item) {
          item.classList.remove("hide");
        });
      }
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

    // searchInc
    function searchInc() {
      let iv = input.value;
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
        // reset
      if (select) {
        select.forEach(function (item) {
          
        });
      }
      }
    }

    // enterKey
    function enterKey() {
      if (window.event.keyCode == 13) {
        // searchInc();
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
          input.value = option;
          searchSel(name);
        });
      });

      
    }

    // run
    btn.addEventListener("click", function() {
      searchSel("keyword");
    });
    input.addEventListener("keyup", function() {
      // enterKey();
    });
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
    // let event = function(e) {
    //   // console.log(item);
    //   // console.log(e.target);
    //   console.log(e.currentTarget);
    //   e.currentTarget.classList.toggle("select");
    // };
    // function tableCheckEvt() {
    //   let el = document.querySelectorAll(".table tbody tr");
    //   if (el) {
    //     el.forEach(function (item) {
    //       item.addEventListener("click", event);
    //     });
    //   }
    // }
    // function tableCheckDel() {
    //   if (el) {
    //     el.forEach(function (item) {
    //       item.removeEventListener('click', clickListener);
    //     });
    //   }
    // }

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
  function noteToggle() {
    // let note = document.querySelectorAll(".table td.note");
    // let btn = document.querySelectorAll(".table td.note .btn");

    // if (note) {
    //   note.forEach(function (item) {
    //     let memo = item.querySelectorAll(".note-memo p");
    //     memo.forEach(function (i) {
    //       if (memo.length > 1) {
    //         i.closest(".note").classList.add("multi");
    //       }
    //     });
    //   });
    // }

    // if (btn) {
    //   btn.forEach(function (item) {
    //     item.addEventListener("click", function() {
    //       item.closest(".note").classList.toggle("active");
    //       item.classList.toggle("active");
    //     });
    //   });
    // }

    const evt = function(e) {
      // item.closest(".note").classList.toggle("active");
      // item.classList.toggle("active");
      // console.log(e.currentTarget);
      e.currentTarget.closest(".note").classList.toggle("active");
      e.currentTarget.classList.toggle("active");
    };
    
    function noteToggleEvt() {
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
          item.addEventListener("click", evt);
        });
      }
    }
    noteToggleEvt();

    document.addEventListener("click", function() {
      noteToggleEvt();
    });

  }

  // waccToggle
  function waccToggle(e) {
    // let idx = 0;
    // let tog = document.querySelectorAll("[data-wacc-toggle=true]");
    // if (tog) {
    //   tog.forEach(function (item) {
    //     idx++;
    //     let ctrl = item.querySelector(".btn");
    //     let target = item.querySelector(".target");
    //     target.setAttribute("id", `ui-tog-${idx}`);
    //     ctrl.setAttribute("aria-expanded", "false");
    //     ctrl.setAttribute("aria-controls", `ui-tog-${idx}`);
    //     ctrl.addEventListener("click", function() {
    //       console.log(ctrl);
    //       if (this.classList.contains("active")) {
    //         this.setAttribute("aria-expanded", "true");
    //       } else {
    //         this.setAttribute("aria-expanded", "false");
    //       }
    //     });
    //   });
    // }

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

  // 오브젝트
  let objtest = {
		init: function() {
			let el;
      console.log(el);
      return el;
		},
		set: function(){
			this.init();
      // el = document.querySelectorAll(".table tbody tr");
      // return el;
      // let el = document.querySelectorAll(".table tbody tr");
      // console.log(init.el);
		},
	}

  // tableSort
  function tableSort() {
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
      function arrayReload(array) {
        // console.log(array);
        // tbody.innerHTML = "";
        let data = [];
        let tr = [];
        
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
          tr.push(`
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

        tbody.innerHTML = tr.join("");

        // update();
        // tableIndex();
        // tableState();
        // tableCopy();

      }

      // dateTh
      dateTh.forEach(function (item) {
        let asc = item.querySelector(".sortasc");
        let desc = item.querySelector(".sortdesc");
        asc.addEventListener("click", function() {
          sortType = this.getAttribute("class");
          tbody = this.closest(".table").querySelector("tbody");
          let arrayDate = [];
          let date = this.closest(".table").querySelectorAll(".table tbody tr");
          date.forEach(function (i) {
            // arrayDate.push(i.dataset.sort);
            arrayDate.push(i);
          });
          arraySort = arrayDate.sort(sortNum);
          arrayReload(arraySort);
        });
        desc.addEventListener("click", function() {
          sortType = this.getAttribute("class");
          tbody = this.closest(".table").querySelector("tbody");
          let arrayDate = [];
          let date = this.closest(".table").querySelectorAll(".table tbody tr");
          date.forEach(function (i) {
            // arrayDate.push(i.dataset.sort);
            arrayDate.push(i);
          });
          arraySort = arrayDate.sort(sortNum);
          arrayReload(arraySort); 
        });
      });
    }
  }


  // run functions
  // setTable
  setTable();
  // tableIndex();

  // filter
  setFilter();

  // tableState
  // tableState();

  // tableCopy
  // tableCopy();

  // tableCheck
  // tableCheck();

  

  // noteToggle
  // noteToggle();

  // waccToggle
  // waccToggle();

  // tableSort
  // tableSort();


  
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
  
  let loadDiv = this.document.querySelector(".loading");
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
                 
  }, 5000);

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
