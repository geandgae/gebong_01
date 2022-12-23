"use strict";

// start : modal
const modal = (() => {

  // event
  let evtOpen, evtClose, evtAlert, evtConfirm;

  // init
  const init = () => {
    // wraps
    let wrap = document.querySelector(".wrap");
    let outer = document.querySelector(".outland");
    let dialog = outer.querySelector(".dialog");
    let depth = 0;
    // focus
    let focusEl = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let tabFirst, tabLast;

    // initModal
    let initModal = outer.querySelectorAll(".modal");
    initModal.forEach(i => i.setAttribute("data-modal-level", depth));

    // focusTab
    const focusTab = () => {
      let focus = outer.querySelector(".modal.active.focus")
      if (focus) {
        let focusNodelist = focus.querySelectorAll(focusEl);
        let focusArray = Array.from(focusNodelist);
        // focusArray = [...focusNodelist];
        tabFirst = focusArray[0];
        tabLast = focusArray[focusArray.length - 1];
      }
      tabFirst.focus();
    }
    
    // key tab
    const keyTab = (e) => {
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === tabFirst) {
            // e.preventDefault();
            tabLast.focus();
          }
        } else {
          if (document.activeElement === tabLast) {
            // e.preventDefault();
            tabFirst.focus();
          }
        }
      }
    }

    // wacc
    const wacc = () => {
      if (outer.classList.contains("active")) {
        wrap?.classList.add("lock");
        wrap?.setAttribute("aria-hidden", "true");
      } else {
        wrap?.classList.remove("lock");
        wrap?.setAttribute("aria-hidden", "false");
      }
    }

    // elOpen
    const elOpen = (el, target) => {
      target.forEach(i => {
        if (el === i.dataset.modal) {
          depth += 1;
          outer?.classList.add("active");
          i.classList.add("active");
          i.classList.add("focus");
          i.setAttribute("aria-hidden", "false");
          i.setAttribute("data-modal-level", depth);
          wacc();
          focusTab();
          i.addEventListener('keydown', keyTab);
        } else {
          i.setAttribute("aria-hidden", "true");
          i.classList.remove("focus");
        }
      });
    }
    
    // evtOpen
    evtOpen = (el) => {
      let target = outer.querySelectorAll(".modal");
      elOpen(el, target);
    }

    // evtAlert
    evtAlert = (el, text) => {
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
    evtConfirm = (el, text, btn_confirm, btn_cancel) => {
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

    // evtClose
    evtClose = (el, accuracy) => {
      let target = outer.querySelectorAll(".modal.active");
      // moveFocus
      const moveFocus = () => {
        let focusTarget;
        target.forEach(i => {
          if (depth > 0 && i.dataset.modalLevel == depth) {
            i.setAttribute("aria-hidden", "false");
            i.classList.add("focus");
            focusTab();
            i.addEventListener('keydown', keyTab);
          }
          focusTarget = accuracy;
          focusTarget.focus();
        })
      }
      // status
      target.forEach(i => {
        // console.log(i.dataset.modal);
        // modal 1개 이상일때
        if (el === i.dataset.modal) {
          i.classList.remove("active");
          i.setAttribute("aria-hidden", "true");
          i.classList.remove("focus");
          i.setAttribute("data-modal-level", 0);
          depth -= 1;
          moveFocus();
          console.log(depth);
        } 
        if (target.length === 1) {
          outer?.classList.remove("active");
          wacc();
        }
        if (el === true) {
          depth = 0;
          i.classList.remove("active");
          i.setAttribute("aria-hidden", "true");
          i.classList.remove("focus");
          i.setAttribute("data-modal-level", 0);
          outer?.classList.remove("active");
          wacc();
        }
      })
    }
  }

  // run
  const run = {
    accuracy : "-_-",
    valid : (o, n) => {
      if (o[n] === undefined) {
        throw `${n} 정의 되지 않았습니다.`
      }
    },
    open : (e, o) => {
      let accuracy = run.accuracy;
      let el = o.el;
      let auto = o.auto === undefined ? false : true;
      let type = o.type === undefined ? "popup" : "dialog";
      // evtDialog
      const evtDialog = (o) => {
        let text = o.text;
        let dialog_confirm = o.dialog_confirm === undefined ? false : true;
        // valid
        let essential = ["type", "text"];
        essential.forEach(i => run.valid(o, i));
        if (dialog_confirm == true) {
          let btn_confirm = o.btn_confirm;
          let btn_cancel = o.btn_cancel;
          evtConfirm(el, text, btn_confirm, btn_cancel);
          // call event
          let confirm_event = o.confirm_event;
          if (confirm_event) {
            let btn_evt = document.querySelector(`.modal.focus.type-dialog[data-modal=${el}] .confirm`);
            btn_evt.onclick = e => confirm_event(e);
          }
        }
        if (dialog_confirm == false) {
          evtAlert(el, text);
        }
      }
      // click
      if (auto === false) {
        accuracy = e.target;
        // accuracy값 반환
        run.accuracy = accuracy;
        el = accuracy.dataset.modal;
        // open pop
        if (type === "popup" && accuracy.classList.contains("open")) {
          evtOpen(el);
        }
        // open dialog
        if (type === "dialog" && accuracy.classList.contains("open")) {
          evtDialog(o);
        }
        // close
        run.close(o);
      }
      // auto
      if (auto === true) {
        accuracy = document.querySelector("body");
        // open pop
        if (type === "popup") {
          evtOpen(el);
        }
        // open dialog
        if (type === "dialog") {
          evtDialog(o);
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
      let ctrl = o.ctrl === undefined ? false : true;
      let explosion = o.explosion === undefined ? false : true;
      // evt
      const evt = (el, accuracy) => {
        if (explosion == true) {
          evtClose(explosion);
        } else {
          evtClose(el, accuracy);
        }
      }
      if (ctrl == true) {
        evt(el, accuracy);
      }
      if (ctrl == false) {
        close.forEach(i => {
          i.onclick = () => {
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
// end : modal
modal.init();