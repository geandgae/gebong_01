"use strict";

// s : function
(function () {

  // outland
  const outland = function() {
    let outer = document.querySelector(".outland");
    let btn = document.querySelectorAll(".btn[data-layer]");
    let close = document.querySelectorAll(".outland .close");

    const evtOpen = function(e) {
      let id = e.currentTarget.dataset.layer;
      let target = document.querySelectorAll(".outland .layer");
      target.forEach(function(item) {
        if(id === item.dataset.layer) {
          console.log(item);
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("current");
          item.setAttribute("tabindex", 0);
          item.setAttribute("aria-hidden", "false");
          item.focus();
        } else {
          item.setAttribute("tabindex", -1);
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("current");
        }
      });
    }

    const evtClose = function(e) {
      let id = e.currentTarget.closest(".layer").dataset.layer;
      let target = document.querySelectorAll(".outland .layer.active");
      target.forEach(function(item) {
        if(id === item.dataset.layer) {
          item.classList.remove("active");
        }
        if(target.length === 1) {
          outer?.classList.remove("active");
        }
      })
    }
    
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

  
  outland();


  // 팝업 1.딤체크 / 2.딤에따른 분기 / 3.팝업의 현재 z-index / 4.팝업종류

  

})();
// e : function

