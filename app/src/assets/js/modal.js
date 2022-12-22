"use strict";

// s : function
const modal = (function() {

  
  // function
  let evtAuto;
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
    const elOpen = function(id, target) {
      target.forEach(function(item) {
        if(id === item.dataset.modal) {
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
              // console.log(focusTarget);
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

    // evtAlert
    evtAlert = function(el, text){
      let cont =`
        <div class="modal active type-dialog" data-modal="${el}">
          <div class="inner">
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
    evtConfirm = function(el, text, btn1, btn2){
      let btnok;
      let btnclose;
      btn1 ? btnok = btn1 : btnok = "확인";
      btn2 ? btnclose = btn2 : btnclose = "닫기";
      let cont =`
        <div class="modal active type-dialog" data-modal="${el}">
          <div class="inner">
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
        if(blank == "blank") {
          evtClose(blank);
        } else {
          evtClose(el, accuracy);
        }
      }
    });
  }

  // auto 
  const auto = function(el, e) {
    console.log("---target---");
    console.log(e.target);
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

        // const doc = document;

        // // removeEventListener
        // if (doc.eventHandler) {
        //   doc.removeEventListener('click', doc.eventHandler);
        // }

        // // s: eventHandler
        // doc.eventHandler = (e) => {
        //   // open
        //   if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
        //     accuracy = e.target;
        //     // event
        //     evtOpen(el);
        //     // callback
        //     if(option) {
        //       let callback = option;
        //       callback();
        //     }
        //   }
        //   // close
        //   if (e.target.classList.contains("close") && e.target.closest(".modal").dataset.modal == el) {
        //     // console.log(e.target.closest(".modal").classList.contains("focus"));
        //     // evnet
        //     if(blank == "blank") {
        //       evtClose(blank);
        //     } else {
        //       evtClose(el, accuracy);
        //     }
        //   }
        // }
        // // e: eventHandler

        // // addEventListener
        // doc.addEventListener('click', doc.eventHandler);

      }
    },
    alert : (el, text, blank, option) => {
      let accuracy;
      document.addEventListener('click', (e) => {
        // open
        if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
          accuracy = e.target;
          // event
          evtAlert(el, text);
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
    },
    confirm : (el, text, btn1, btn2, blank, option) => {
      let accuracy;
      document.addEventListener('click', (e) => {
        // open
        if (e.target.classList.contains("open") && e.target.dataset.modal == el) {
          accuracy = e.target;
          // event
          evtConfirm(el, text, btn1, btn2);
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
    },
    auto : (e, blank) => {
      let accuracy = e.target;
      let el = accuracy.dataset.modal;
      let close = document.querySelectorAll(`.modal[data-modal=${el}] .close`);
      console.log(accuracy);
      console.log(el);
      console.log(close);
      // open
      if (accuracy.classList.contains("open")) {
        evtOpen(el);
      }
      // close
      close.forEach(function(item) {
        item.onclick = () => {
          if(blank == "blank") {
            evtClose(blank);
          } else {
            evtClose(el, accuracy);
          }
        }
      });
    },
    // open : (e, blank) => {
    //   run.accuracy = e.target;
    //   let accuracy = run.accuracy;
    //   let el = accuracy.dataset.modal;
    //   let close = document.querySelectorAll(`.modal[data-modal=${el}] .close`);
    //   console.log("open");
    //   console.log(run.accuracy);
    //   // console.log(el);
    //   // console.log(close);
    //   // open
    //   if (accuracy.classList.contains("open")) {
    //     evtOpen(el);
    //   }
    //   // close
    //   close.forEach(function(item) {
    //     item.onclick = () => {
    //       if(blank == "blank") {
    //         evtClose(blank);
    //       } else {
    //         evtClose(el, accuracy);
    //       }
    //     }
    //   });
    // },
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


// 클로져, 클래스 테스트
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
console.log(new Food('cheese', 5).price);
console.log(new Food('cheese', 5).category);
console.log(new Food('cheese', 5));


let Rectangle = class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);


let Rectangle2 = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // 메서드
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle2(10, 10);

console.log(square.area); // 100


let Point = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755


let Animal = class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

let Dog = class Dog extends Animal {
  constructor(name) {
    super(name); // super class 생성자를 호출하여 name 매개변수 전달
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let aaa = new Animal('Mitzie');
let bbb = new Dog('Mitzie');
aaa.speak(); // Mitzie barks.
bbb.speak(); // Mitzie barks.