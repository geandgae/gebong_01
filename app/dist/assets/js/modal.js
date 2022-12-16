"use strict";

// s : function
const modal = (function() {

  
  // function
  let evtAuto;
  let evtOpen;
  let evtClose;

  // init
  const init = function() {
    // let
    let wrap;
    let outer;
    let depth;
    // focus
    let focusEl;
    let tabFirst;
    let tabLast;
    
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

        // console.log(tabFirst);
        // console.log(tabLast);
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
          // console.log(item.dataset);
        }
      });
    }

    // elClose 
    const elClose = function(id, target, accuracy) {
      
      // moveFocus
      const moveFocus = function() {
        let focusTarget;
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.modalLevel == depth) {
            // console.log(item.dataset.modalLevel);
            // console.log(item);
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            focusTab();
            item.addEventListener('keydown', keyTab);
            if(!item.classList.contains("type-auto")) {
              // focusTarget = document.querySelector(`.modal .open[data-modal=${id}]`);
              focusTarget = accuracy;
              focusTarget.focus();
            }
          } else if(depth <= 0) {
            if(!item.classList.contains("type-auto")) {
              // focusTarget = document.querySelector(`.wrap .open[data-modal=${id}]`);
              focusTarget = accuracy;
              focusTarget.focus();
              console.log(focusTarget);
              // console.log(accuracy);
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
          console.log(depth);
          // console.log(item.dataset);
        } 
        if(target.length === 1) {
          outer?.classList.remove("active");
          wacc();
          console.log(depth);
          // console.log(item.dataset);
        }
        if (id === "blank") {
          depth = 0;
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-modal-level", 0);
          outer?.classList.remove("active");
          wacc();
          console.log(depth);
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
    evtClose = function(el, accuracy) {
      let id = el;
      let target = outer.querySelectorAll(".modal.active");
      elClose(id, target, accuracy); 
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
        console.log(e.target);
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
  const close = function(el, blank) {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains("close") && e.target.closest(".modal").dataset.modal == el) {
        // console.log(e.target.closest(".modal").classList.contains("focus"));
        // evnet
        evtClose(el);
        if(blank == "blank") {
          evtClose(blank);
        }
      }
    });
  }

  // run
  const run = function(el, option, blank) {
    let accuracy;
    document.addEventListener('click', (e) => {
      // open
      if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
        accuracy = e.target;
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
        evtClose(el, accuracy);
        if(blank == "blank") {
          evtClose(blank);
        }
      }
    });
  }

  // auto 
  const auto = function(el) {
    evtClose("blank");
    evtAuto(el);

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains("close") && e.target.closest(".modal.type-auto")) {
        evtClose("blank");
      }
    });
  }

  // 오브젝트형 테스트
  const objRun = {
    init : () => {
      let global = "global";
      let global2 = "global2";
      // console.log(global);
      // console.log(global2);
      return global
    },
    open : (type, el, blank, option) => {
      let global = objRun.init();
      // global = "open";
      // console.log(global);

      // auto
      if(type == "auto") {
        evtClose("blank");
        evtAuto(el);
        document.addEventListener('click', (e) => {
          if (e.target.classList.contains("close") && e.target.closest(".modal.type-auto")) {
            evtClose("blank");
          }
        });
      }
      // normal
      if(type == "normal") {
        let accuracy;
        document.addEventListener('click', (e) => {
          // open
          if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
            accuracy = e.target;
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
            if(blank == "blank") {
              evtClose(blank);
            } else {
              evtClose(el, accuracy);
            }
          }
        });
        }
      
      
      
    },
  }

  
  return {
    init : init,
    open : open,
    close : close,
    auto : auto,
    run : run,
    objRun : objRun,
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

