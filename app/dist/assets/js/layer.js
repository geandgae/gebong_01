"use strict";

// s : function
const startFunction = (function() {

  const test = function(e) {

    var focusedElementBeforeModal;
    var modal = document.querySelector('.modal');
    var modalOverlay = document.querySelector('.modal-overlay');
    var modalToggle = document.querySelector('.modal-toggle');
  
    modalToggle.addEventListener('click', openModal);
  
    function openModal() {
      // document.activeElement 현재 포커스된 요소를 반환
      focusedElementBeforeModal = document.activeElement;// focus된게 아니라 'active'된 el.
  
      modal.addEventListener('keydown', trapTabKey);// key를 누르고 있을때
      modalOverlay.addEventListener('click', closeModal);
  
      var signUpBtn = modal.querySelector('#signup');
      signUpBtn.addEventListener('click', closeModal);
  
      var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; //포커스가 갈 수 있는 엘레먼트
      var focusableElements = modal.querySelectorAll(focusableElementsString); //querySelectorAll은 nodelist로 반환함
      focusableElements = Array.prototype.slice.call(focusableElements); //노드 목록을 어레이로 변환, 변환하지 않아도 firstTabStop, lastTabStop 값 가져올 수 있음
  
      var firstTabStop = focusableElements[0];
      var lastTabStop = focusableElements[focusableElements.length - 1];
  
      modal.style.display = 'block';
      modalOverlay.style.display = 'block';
  
      firstTabStop.focus();
  
      function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9) {
  
          // SHIFT + TAB
          if (e.shiftKey) {
            if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
            }
  
          // TAB
          } else {
            if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
            }
          }
        }
  
        // ESCAPE
        if (e.keyCode === 27) {
          closeModal();
        }
      }
    }
  
    function closeModal() {
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
  
      focusedElementBeforeModal.focus();
    }

    // 키보드이벤트 테스트
    const evtKeytab = function() {
      let btn = document.querySelectorAll(".layer.focus .btn")
      btn.addEventListener("keyup", function(e) {
        e.preventDefault();
        if (window.event.keyCode == 9) {
          btn.forEach(function(item) {
            item.focus();
            console.log(window.event.keyCode);
          });
        }
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

  // test
  const testblock = function() {
    let makeBtn = document.querySelector(".make");
  
    const evtMake = function() {
      let wrap = document.querySelector(".wrap");
      let out = document.querySelector(".outland");
      let cont = `
        <span>wrap</span>
        <div class="btn-set">
          <button class="btn" data-layer="layer-d100">layer-d100</button>
          <button class="btn" data-layer="layer-d200">layer-d200</button>
          <button class="btn" data-layer="layer-d300">layer-d300</button>
          <button class="btn" data-layer="popupTest2">popupTest2</button>
        </div>
        <div class="scroll"></div>
      `;
      let cont2 = `
        <!-- layer -->
        <div class="layer" data-layer="layer-d100" data-ui-depth="0">
          <div class="inner">
            <span>layer-d100</span>
            <button class="btn" data-layer="layer-d200">layer-d200</button>
            <button class="btn close">close</button>
          </div>
        </div>
        <!-- //layer -->
  
        <!-- layer -->
        <div class="layer" data-layer="layer-d200" data-ui-depth="0">
          <div class="inner alt">
            <span>layer-d200</span>
            <button class="btn" data-layer="layer-d300">layer-d300</button>
            <button class="btn close">close</button>
          </div>
        </div>
        <!-- //layer -->
  
        <!-- layer -->
        <div class="layer" data-layer="layer-d300" data-ui-depth="0">
          <div class="inner alt2">
            <span>layer-d300</span>
            <a href="#;">aaa</a>
            <a href="#;">aaa2</a>
            <a href="#;">aaa3</a>
            <a href="#;">aaa4</a>
            <button>adas</button>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <button class="btn close">close</button>
          </div>
        </div>
        <!-- //layer -->
  
        <!-- layer -->
        <div class="layer" data-layer="popupTest2" data-ui-depth="0">
          <div class="inner alt">
            <span>popupTest2</span>
            <button class="btn close">close</button>
          </div>
        </div>
        <!-- //layer -->
      `;
      setTimeout(() => {
        wrap.innerHTML = cont;
        out.innerHTML = cont2;
      }, 500);
      
    }
  
    makeBtn.addEventListener("click", evtMake);
  }




  // outland
  const outland = function() {
    
    let outer = document.querySelector(".outland");
    let btn = document.querySelectorAll(".btn[data-layer]");
    let close = document.querySelectorAll(".layer .btn.close");
    let depth = 0;

    // evtOpen
    const evtOpen = function(e) {
      let id = e.currentTarget.dataset.layer;
      let target = document.querySelectorAll(".outland .layer");
      // 포커스가 갈 수 있는 엘레먼트
      let focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
       
      target.forEach(function(item) {
        if(id === item.dataset.layer) {
          // focusEl nodelist array
          let focusNodelist = item.querySelectorAll(focusEl);
          let focusArray = Array.from(focusNodelist);
          // let focusArray = [...focusNodelist];
          let firstStop = focusArray[0];
          let lastStop = focusArray[focusArray.length - 1];
          console.log(firstStop);
          // console.log(lastStop);
          // key tab
          const keyTab = function(e) {
            // Check key
            if (e.keyCode === 9) {
              // SHIFT + TAB
              if (e.shiftKey) {
                if (document.activeElement === firstStop) {
                e.preventDefault();
                lastStop.focus();
                }
              // TAB
              } else {
                if (document.activeElement === lastStop) {
                e.preventDefault();
                firstStop.focus();
                }
              }
            }
            // ESCAPE
            // if (e.keyCode === 27) {
            //   evtClose();
            // }
            // console.log(e.keyCode);
          }
          depth += 1;
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("aria-hidden", "false");
          item.setAttribute("data-ui-depth", depth);
          firstStop.focus();
          item.addEventListener('keydown', keyTab);
          console.log(depth);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
        }
      });

      
    }

    // evtClose
    const evtClose = function(e) {
      let id = e.currentTarget.closest(".layer").dataset.layer;
      let target = document.querySelectorAll(".outland .layer.active");
      let focusTarget;
      // moveFocus
      const moveFocus = function() {
        // focus 이동
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.uiDepth == depth) {
            focusTarget = document.querySelector(`.layer .btn[data-layer=${id}]`);
            // console.log(item.dataset.uiDepth);
            // console.log(depth);
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            focusTarget.focus();
          } else if(depth <= 0) {
            focusTarget = document.querySelector(`.wrap .btn[data-layer=${id}]`);
            focusTarget.focus();
          }
        })
      }
      target.forEach(function(item) {
        // layer 1개 이상일때
        if(id === item.dataset.layer) {
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-ui-depth", 0);
          depth -= 1;
          moveFocus();
        }
        // layer 1개 일때
        if(target.length === 1) {
          outer?.classList.remove("active");
        }
      })
    }

    // run
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

  // outland2 document type
  const outland2 = function() {

    console.log("outland2");

    let outer = document.querySelector(".outland");
    let btn = document.querySelectorAll(".btn[data-layer]");
    let close = document.querySelectorAll(".layer .btn.close");
    let depth = 0;

    

    // evtOpen
    const evtOpen = function(e) {
      let id = e.currentTarget.dataset.layer;
      console.log(id);
      let target = document.querySelectorAll(".outland .layer");
      // 포커스가 갈 수 있는 엘레먼트
      let focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      
      target.forEach(function(item) {
        if(id === item.dataset.layer) {
          // focusEl nodelist array
          let focusNodelist = item.querySelectorAll(focusEl);
          let focusArray = Array.from(focusNodelist);
          // let focusArray = [...focusNodelist];
          let firstStop = focusArray[0];
          let lastStop = focusArray[focusArray.length - 1];
          console.log(firstStop);
          // console.log(lastStop);
          // key tab
          const keyTab = function(e) {
            // Check key
            if (e.keyCode === 9) {
              // SHIFT + TAB
              if (e.shiftKey) {
                if (document.activeElement === firstStop) {
                e.preventDefault();
                lastStop.focus();
                }
              // TAB
              } else {
                if (document.activeElement === lastStop) {
                e.preventDefault();
                firstStop.focus();
                }
              }
            }
          }
          depth += 1;
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("aria-hidden", "false");
          item.setAttribute("data-ui-depth", depth);
          firstStop.focus();
          item.addEventListener('keydown', keyTab);
          console.log(depth);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
        }
      });

      
    }

    // evtClose
    const evtClose = function(e) {
      let id = e.currentTarget.closest(".layer").dataset.layer;
      let target = document.querySelectorAll(".outland .layer.active");
      let focusTarget;
      // moveFocus
      const moveFocus = function() {
        // focus 이동
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.uiDepth == depth) {
            focusTarget = document.querySelector(`.layer .btn[data-layer=${id}]`);
            // console.log(item.dataset.uiDepth);
            // console.log(depth);
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            focusTarget.focus();
          } else if(depth <= 0) {
            focusTarget = document.querySelector(`.wrap .btn[data-layer=${id}]`);
            focusTarget.focus();
          }
        })
      }
      target.forEach(function(item) {
        // layer 1개 이상일때
        if(id === item.dataset.layer) {
          item.classList.remove("active");
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
          item.setAttribute("data-ui-depth", 0);
          depth -= 1;
          moveFocus();
        }
        // layer 1개 일때
        if(target.length === 1) {
          outer?.classList.remove("active");
        }
      })
    }


    // document.addEventListener("click", function(e) {
      
    //   if(e.target.classList == "btn" && e.target.dataset.layer) {
    //     let btn = document.querySelectorAll(".btn[data-layer]");
    //     // console.log(e.target.dataset.layer);
    //     // console.log(e.target.classList);
    //     btn.forEach(function(item) {
    //       // console.log(item.dataset.layer);
    //       // console.log(id);
    //       // item.addEventListener("click", evtOpen);
    //       item.addEventListener("click", function(e){
    //         let id = e.currentTarget.dataset.layer;
    //         console.log(id);
    //       });
    //     });
    //   } else if(e.target.classList == "btn close") {
    //     // console.log(e.target.classList);
    //     let close = document.querySelectorAll(".layer .btn.close");
    //     if (close) {
    //       close.forEach(function(item) {
    //         // item.addEventListener("click", evtClose);
    //         // console.log(item);
    //       });
    //     }
    //   }
    // });


    btn.forEach(function(item) {
      item.onclick = (e) => {
        evtOpen(e);
      }
    });

    close.forEach(function(item) {
      item.onclick = (e) => {
        evtClose(e);
      }
    });

  }

  document.addEventListener("click", function() {
    // outland2();
  });

  
  return {
    outland : outland,
    // outland2 : outland2,
    // testblock : testblock,
  }


  // 팝업 1.딤체크 / 2.딤에따른 분기 / 3.팝업의 현재 z-index / 4.팝업종류

  
  

})();
// e : function

startFunction.outland();
// startFunction.outland2();
// startFunction.testblock();





