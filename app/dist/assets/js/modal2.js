"use strict";

// s : function
const modal = (function() {

  // function
  let evtOpen;
  let evtClose;
  let evtAlert;
  let evtConfirm;

  // init
  const init = function() {

    // wraps
    let wrap = document.querySelector(".wrap");
    let outer = document.querySelector(".outland");
    let dialog = outer.querySelector(".dialog");
    let depth = 0;

    // focus
    let focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let tabFirst;
    let tabLast;

    // initModal
    let initModal = outer.querySelectorAll(".modal");
    initModal.forEach(function(item) {
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
        // shift + tab
        if (e.shiftKey) {
          if (document.activeElement === tabFirst) {
            e.preventDefault();
            tabLast.focus();
          }
        // tab
        } else {
          if (document.activeElement === tabLast) {
            e.preventDefault();
            tabFirst.focus();
          }
        }
      }
    }

    // wacc
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
    const elOpen = function(el, target) {
      target.forEach(function(item) {
        if(el === item.dataset.modal) {
          depth += 1;
          outer?.classList.add("active");
          item.classList.add("active");
          item.classList.add("focus");
          item.setAttribute("aria-hidden", "false");
          item.setAttribute("data-modal-level", depth);
          wacc();
          focusTab();
          item.addEventListener('keydown', keyTab);
          // console.log(depth);
          // console.log(item);
          // console.log(item.dataset);
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
    const elClose = function(el, target, accuracy) {
      // moveFocus
      const moveFocus = function() {
        let focusTarget;
        target.forEach(function(item) {
          if(depth > 0 && item.dataset.modalLevel == depth) {
            item.setAttribute("aria-hidden", "false");
            item.classList.add("focus");
            focusTab();
            item.addEventListener('keydown', keyTab);
          }
          focusTarget = accuracy;
          focusTarget.focus();
        })
      }
      // status
      target.forEach(function(item) {
        // console.log(item.dataset.modal);
        // modal 1개 이상일때
        if(el === item.dataset.modal) {
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
          // console.log(item.dataset);
        }
        if (el === true) {
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
      let target = outer.querySelectorAll(".modal");
      elOpen(el, target);
    }

    // evtClose
    evtClose = function(el, accuracy) {
      let target = outer.querySelectorAll(".modal.active");
      elClose(el, target, accuracy); 
    }

    // evtAlert
    evtAlert = function(el, text){
      let cont =`
        <div class="modal active type-dialog" data-modal="${el}">
          <div class="inner">
            <span class="text">${el}</span>
            <span class="text">${text}</span>
            <button class="btn close">close</button>
          </div>
        </div>
      `
      dialog.innerHTML = cont;
      let target = outer.querySelectorAll(".modal.active");
      elOpen(el, target);
    }

    // evtConfirm
    evtConfirm = function(el, text, btn_confirm, btn_cancel){
      let btnok;
      let btnclose;
      btn_confirm ? btnok = btn_confirm : btnok = "확인";
      btn_cancel ? btnclose = btn_cancel : btnclose = "닫기";
      let cont =`
        <div class="modal active type-dialog" data-modal="${el}">
          <div class="inner">
          <span class="text">${el}</span>
            <span class="text">${text}</span>
            <button class="btn confirm">${btnok}</button>
            <button class="btn close">${btnclose}</button>
          </div>
        </div>
      `
      dialog.innerHTML = cont;
      let target = outer.querySelectorAll(".modal.active");
      elOpen(el, target);
    }
  }

  // run
  const run = {
    accuracy : "accuracy",
    open : (e, o) => {
      let accuracy = run.accuracy;
      let el = o.el;
      let auto;
      o.auto ? auto = o.auto : auto = false;
      let type;
      o.type ? type = o.type : type = "popup";
      // click
      if(auto === false) {
        accuracy = e.target;
        // accuracy값 반환
        run.accuracy = accuracy;
        el = accuracy.dataset.modal;
        // open pop
        if(type === "popup" && accuracy.classList.contains("open")) {
          evtOpen(el);
        }
        // open dialog
        if(type === "dialog" && accuracy.classList.contains("open")) {
          let text = o.text;
          let dialog_confirm;
          o.dialog_confirm ? dialog_confirm = o.dialog_confirm : dialog_confirm = false;
          if(dialog_confirm == true) {
            let btn_confirm = o.btn_confirm;
            let btn_cancel = o.btn_cancel;
            evtConfirm(el, text, btn_confirm, btn_cancel);
          }
          if(dialog_confirm == false) {
            evtAlert(el, text);
          }
        }
        // close
        run.close(o);
      }
      // auto
      if(auto === true) {
        accuracy = document.querySelector("body");
        // open pop
        if(type === "popup") {
          evtOpen(el);
        }
        // open dialog
        if(type === "dialog") {
          let text = o.text;
          let dialog_confirm;
          o.dialog_confirm ? dialog_confirm = o.dialog_confirm : dialog_confirm = false;
          if(dialog_confirm == true) {
            let btn_confirm = o.btn_confirm;
            let btn_cancel = o.btn_cancel;
            evtConfirm(el, text, btn_confirm, btn_cancel);
          }
          if(dialog_confirm == false) {
            evtAlert(el, text);
          }
        }
        // accuracy값 반환
        run.accuracy = document.querySelector(`.modal[data-modal=${el}]`);
        // close
        run.close(o);
      }  
    },
    close : (o) => {
      let accuracy = run.accuracy;
      let el = accuracy.dataset.modal;
      let close = document.querySelectorAll(`.modal[data-modal=${el}] .close`);
      let ctrl;
      o.ctrl ? ctrl = o.ctrl : ctrl = false;
      let explosion;
      o.explosion ? explosion = o.explosion : explosion = false;
      // evt
      const evt = (el, accuracy) => {
        if(explosion == true) {
          evtClose(explosion);
        } else {
          evtClose(el, accuracy);
        }
      }
      if(ctrl == true) {
        evt(el, accuracy);
      }
      if(ctrl == false) {
        close.forEach(function(item) {
          item.onclick = () => {
            evt(el, accuracy);
          }
        });
      }
    },
  }

  return {
    init : init,
    run : run,
  }

})();

modal.init();