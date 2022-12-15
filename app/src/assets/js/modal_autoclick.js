"use strict";

// s : function
const modal = (function() {

  // let
  let outer;
  let btn;
  let close;
  let auto;
  let depth;
  // 포커스가 갈 수 있는 엘레먼트
  let focusEl;
  let tabFirst;
  let tabLast;
  
  // function
  // let focusTab;
  // let keyTab;
  let evtAuto;
  let evtOpen;
  let evtClose;

  // init
  const init = function() {
    outer = document.querySelector(".outland");
    btn = Array.from(document.querySelectorAll(".btn[data-modal]"));
    close = Array.from(outer.querySelectorAll(".modal .btn.close"));
    auto = Array.from(outer.querySelectorAll(".modal.type-auto"));
    depth = 0;
    focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    let initTarget = outer.querySelectorAll(".modal");
    initTarget.forEach(function(item) {
      item.setAttribute("data-modal-level", depth);
    });
  }

  // set
  const set = function() {

    // focusTab
    const focusTab = function() {
      let focus = outer.querySelector(".modal.active.focus")
      // focusEl nodelist array
      let focusNodelist;
      let focusArray;
      if(focus) {
        focusNodelist = focus.querySelectorAll(focusEl);
        focusArray = Array.from(focusNodelist);
        // focusArray = [...focusNodelist];
        tabFirst = focusArray[0];
        tabLast = focusArray[focusArray.length - 1];
      }
      tabFirst.focus();
    }

    // key tab
    const keyTab = function(e) {
      // Check key
      if (e.keyCode === 9) {
        // SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === tabFirst) {
          e.preventDefault();
          tabLast.focus();
          }
        // TAB
        } else {
          if (document.activeElement === tabLast) {
          e.preventDefault();
          tabFirst.focus();
          }
        }
      }
    }

    const elOpen = function(id, el) {
      el.forEach(function(item) {
        if(id === item.dataset.modal) {
          depth += 1;
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("aria-hidden", "false");
          item.setAttribute("data-modal-level", depth);
          focusTab();
          item.addEventListener('keydown', keyTab);
          console.log(depth);
          console.log(item);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
        }
      });
    }

    // evtAuto
    evtAuto = function(tg){
      if (auto) {
        let id = tg;
        elOpen(id, auto);
      }
    }
    // evtAuto("auto-01");
    // evtAuto("auto-02");

    // evtAuto
    // evtAuto = function(el){
    //   console.log("auto-start");
    //   let auto = outer.querySelectorAll(".modal.type-auto");
    //   if (auto) {
    //     let id = el;
    //     elOpen(id, auto);
    //   }
    // }

    // evtOpen
    evtOpen = function(e) {
      let id = e.currentTarget.dataset.modal;
      let target = outer.querySelectorAll(".modal");
      elOpen(id, target);
    }

    // evtClose
    evtClose = function(e) {
      let id = e.currentTarget.closest(".modal").dataset.modal;
      let target = outer.querySelectorAll(".modal.active");
      let focusTarget;

      // moveFocus
      const moveFocus = function() {
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.modalLevel == depth) {
            // console.log(item.dataset.modalLevel);
            // console.log(item);
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            if(!item.classList.contains("type-auto")) {
              focusTarget = document.querySelector(`.modal .btn[data-modal=${id}]`);
              focusTarget.focus();
            }
          } else if(depth <= 0) {
            if(!item.classList.contains("type-auto")) {
              focusTarget = document.querySelector(`.wrap .btn[data-modal=${id}]`);
              focusTarget.focus();
            }
          }
        })
      }
      target.forEach(function(item) {
        // modal 1개 이상일때
        if(id === item.dataset.modal) {
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-modal-level", 0);
          depth -= 1;
          moveFocus();
        }
        // modal 1개 일때
        if(target.length === 1) {
          outer?.classList.remove("active");
        }
      })
    }

    
    // return
    return {
      evtAuto : evtAuto,
    }

  }
  

  // run 
  const run = function() {
    if (btn) {
      btn.forEach(function(item) {
        item.addEventListener("click", evtOpen);
      });
    }
    if (close) {
      close.forEach(function(item) {
        item.addEventListener("click", evtClose);
      });
    }
  }

  // update
  const update = function() {
    init();
    set();
  }


  

  
  return {
    init : init,
    set : set,
    run : run,
    update : update,
  }


  // 팝업 1.딤체크 / 2.딤에따른 분기 / 3.팝업의 현재 z-index / 4.팝업종류 / 5.버튼으로 뜨지 않을때(자동 오픈)

  
  

})();
// e : function

// startFunction.inittest();

// startFunction.test();

// startFunction.test().a("test-a");
// startFunction.test().b("test-b");
// startFunction.test().b("test-c");

// startFunction.outland();





