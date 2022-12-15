"use strict";

// s : function
const modal = (function() {

  // let
  let wrap;
  let outer;
  let depth;
  // focus
  let focusEl;
  let tabFirst;
  let tabLast;
  // function
  let evtAuto;
  let evtOpen;
  let evtClose;

  // init
  const init = function() {
    wrap = document.querySelector(".wrap");
    outer = document.querySelector(".outland");
    depth = 0;
    focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    let initTarget = outer.querySelectorAll(".modal");
    initTarget.forEach(function(item) {
      item.setAttribute("data-modal-level", depth);
    });

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

        console.log(tabFirst);
        console.log(tabLast);
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

    const wacc = function() {
      if(outer.classList.contains("active")) {
        wrap?.classList.add("lock");
        wrap?.setAttribute("aria-hidden", "true");
      } else {
        wrap?.classList.remove("lock");
        wrap?.setAttribute("aria-hidden", "false");
      }
    }

    // elOpen
    const elOpen = function(id, target) {
      target.forEach(function(item) {
        if(id === item.dataset.modal) {
          depth += 1;
          outer?.classList.add("active");
          wacc();
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("aria-hidden", "false");
          item.setAttribute("data-modal-level", depth);
          focusTab();
          item.addEventListener('keydown', keyTab);
          // console.log(depth);
          // console.log(item);
          console.log(item.dataset);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          // console.log(depth);
          // console.log(item);
          console.log(item.dataset);
        }
      });
    }

    // elClose 
    const elClose = function(id, target) {
      let focusTarget;
      
      // moveFocus
      const moveFocus = function() {
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.modalLevel == depth) {
            // console.log(item.dataset.modalLevel);
            // console.log(item);
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            focusTab();
            item.addEventListener('keydown', keyTab);
            if(!item.classList.contains("type-auto")) {
              focusTarget = document.querySelector(`.modal .open[data-modal=${id}]`);
              focusTarget.focus();
            }
          } else if(depth <= 0) {
            if(!item.classList.contains("type-auto")) {
              focusTarget = document.querySelector(`.wrap .open[data-modal=${id}]`);
              focusTarget.focus();
            }
          }
        })
      }
      target.forEach(function(item) {
        // console.log(id);
        // console.log(item.dataset.modal);
        // modal 1개 이상일때
        if(id === item.dataset.modal) {
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-modal-level", 0);
          depth -= 1;
          moveFocus();
          // console.log(depth);
          console.log(item.dataset);
        } 
        if(target.length === 1) {
          outer?.classList.remove("active");
          wacc();
          console.log(item.dataset);
        }
        if (id === "all") {
          depth = 0;
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-modal-level", 0);
          outer?.classList.remove("active");
          wacc();
        }
      })
    }

    // evtOpen
    evtOpen = function(el) {
      let id = el;
      let target = outer.querySelectorAll(".modal");
      elOpen(id, target);
    }

    // evtClose
    evtClose = function(el) {
      let id = el;
      let target = outer.querySelectorAll(".modal.active");
      elClose(id, target); 
    }

    // evtAuto
    evtAuto = function(el){
      let id = el;
      let target = outer.querySelectorAll(".modal.type-auto");
      elOpen(id, target);
    }

  }
  
  // open
  const open = function(el, option) {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
        // event
        evtOpen(el);
        // callback
        if(option) {
          let callback = option;
          callback();
        }
      }
    });
  }

  // close
  const close = function(el, all) {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains("close") && e.target.closest(".modal").dataset.modal == el) {
        // console.log(e.target.closest(".modal").classList.contains("focus"));
        // evnet
        evtClose(el);
        if(all == "all") {
          evtClose(all);
        }
      }
    });
  }

  // run
  const run = function(el, option) {
    document.addEventListener('click', (e) => {
      // open
      if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
        // event
        evtOpen(el);
        // callback
        if(option) {
          let callback = option;
          callback();
        }
      }
      // close
      if (e.target.classList.contains("close") && e.target.closest(".modal").dataset.modal == el) {
        // console.log(e.target.closest(".modal").classList.contains("focus"));
        // evnet
        evtClose(el);
      }
    });
  }

  // auto 
  const auto = function(el) {
    evtClose("all");
    evtAuto(el);

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains("close") && e.target.closest(".modal.type-auto")) {
        evtClose("all");
      }
    });
  }

  
  return {
    init : init,
    open : open,
    close : close,
    auto : auto,
    run : run,
  }


  // 팝업 1.딤체크 / 2.딤에따른 분기 / 3.팝업의 현재 z-index / 4.팝업종류 / 5.버튼으로 뜨지 않을때(자동 오픈) 
  // n : 1 호출 / id로 실행

  
  

})();
// e : function

// startFunction.inittest();

// startFunction.test();

// startFunction.test().a("test-a");
// startFunction.test().b("test-b");
// startFunction.test().b("test-c");

// startFunction.outland();



modal.init();

