"use strict";

// s : function
(function () {

  // outland
  const outland = function() {
    let outer = document.querySelector(".outland");
    let btn = document.querySelectorAll(".btn[data-layer]");
    let close = document.querySelectorAll(".outland .close");
    let focus;

    const evtKeytab = function() {
      let btn = document.querySelectorAll(".layer.focus .btn")
      focus?.addEventListener("keyup", function(e) {
        e.preventDefault();
        if (window.event.keyCode == 9) {
          btn.forEach(function(item) {
            item.focus();
            console.log(window.event.keyCode);
          });
        }
      });
    }

    

    const evtOpen = function(e) {
      let id = e.currentTarget.dataset.layer;
      let target = document.querySelectorAll(".outland .layer");
      target.forEach(function(item) {
        if(id === item.dataset.layer) {
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("tabindex", 0);
          item.setAttribute("aria-hidden", "false");
          focus = item;
          item.focus();
          console.log(focus);
          evtKeytab();
        } else {
          item.setAttribute("tabindex", -1);
          item.setAttribute("aria-hidden", "true");
          item.classList.remove("focus");
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


const test = function(e) {

  var focusedElementBeforeModal;
  var modal = document.querySelector('.modal');
  var modalOverlay = document.querySelector('.modal-overlay');
  var modalToggle = document.querySelector('.modal-toggle');

  modalToggle.addEventListener('click', openModal);

  function openModal() {
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

}