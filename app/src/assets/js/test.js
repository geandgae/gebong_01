"use strict";

const calc = (a, b) => {
  return a + b;
}
console.log(calc("ㄴ", "ㅖ"));
console.log(calc(1, 5));

// const sum = require('./sum');

// console.log("function sum test!");
// console.log("1 + 2 =", sum(1,2));



// 팝업열기
// $scope.setLayer = function (element) {
//   var idx = element;
//   var element = $("#" + element);
//   var isDim = element.prev().hasClass("dimBg");
//   var isOptbtm = element.hasClass("opt-bottom");
//   var tabbar = $(".bar__tab");
//   var quickbtn = $(".btn__quick_wrap").find("[class*=btn_]");

//   // 열기
//   isDim ? element.parents(".dim_layer").fadeIn() : element.fadeIn();
//   isOptbtm && element.addClass("active");
//   $("body").css({ overflow: "hidden", "touch-action": "none" });
//   // footer bar reset
//   tabbar.addClass("t_hide");
//   quickbtn.removeClass("show");
//   // 닫기
//   element.find(".ui-only-layerclose").click(function () {
//     $("body").css({ overflow: "visible", "touch-action": "auto" });
//     isDim ? $(".dim_layer").fadeOut() : element.fadeOut();
//     isOptbtm && element.removeClass("active");
//     return false;
//   });

//   // 갤러리 팝업일때
//   if (idx === "layer-comm-photo") {
//     pub_click_pinch();
//     pub_gallery();
//     pub_pinchzoom();
//   }
// };
// 팝업열기 end

// pub_dropdown_dot
// $scope.pub_dropdown_dot = function (e) {
//   let listNodes = document.querySelectorAll(".ui-only-dropdown");
//   let parentNode = e.target.parentElement.parentElement;
//   let selectNode = parentNode.children[0];
//   let listNode = parentNode.children[1];
//   if (selectNode.classList[2] == "active") {
//     selectNode.classList.remove("active");
//   } else {
//     for (let idx of listNodes) {
//       idx.classList.remove("active");
//     }
//     selectNode.classList.add("active");
//   }
//   listNode.addEventListener("click", function () {
//     selectNode.classList.remove("active");
//   });
// };

// pub_more_btn
// $scope.pub_more_btn = function (e) {
//   let parentNode = e.target.parentElement.parentElement;
//   parentNode.classList.toggle("unset");
//   if (parentNode.classList.contains("unset")) {
//     e.target.innerHTML = "접기";
//   } else {
//     e.target.innerHTML = "더보기";
//   }
// };

// pub_insta_upload 인스타 업로드 하단 버튼 그림자
function pub_insta_upload() {
  let oh = document.querySelector(".comm-insta-upload").offsetHeight;
  let sh = document.querySelector(".comm-insta-upload").scrollHeight;
  let ctrl = document.querySelector(".comm-floating-wrap");
  if (sh > oh) {
    ctrl.classList.add("opt-shadow");
  }
}

//퍼블 테스트용 스크립트 강제 실행
// pub_moretext
// function pub_moretext() {
//   let cont_wrap = document.querySelectorAll(".ui-only-cont-limited");
//   for (let idx of cont_wrap) {
//     let cont_text = idx.querySelector(".desc-text");
//     let cont_ctrl = idx.querySelector(".comp-btn");
//     let cont_btnwrap = idx.querySelector(".desc-btn");

//     console.log(cont_ctrl);

//     // 글 byte
//     let cont_str = cont_text.innerText;
//     let cont_length = cont_str.length;
//     let cont_byte = 0;
//     cont_byte = (function (s, b, i, c) {
//       for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
//       return b;
//     })(cont_str);
//     if (cont_byte > 171) {
//       cont_btnwrap.classList.add("active");
//     } else if (cont_byte > 133 && cont_length > 133) {
//       // 영문일때
//       cont_btnwrap.classList.add("active");
//     }

//     cont_ctrl.addEventListener("click", () => {
//       cont_text.classList.toggle("unset");
//       cont_ctrl.classList.toggle("unset");
//       if (cont_ctrl.classList.contains("unset")) {
//         cont_ctrl.innerHTML = "접기";
//       } else {
//         cont_ctrl.innerHTML = "더보기";
//       }
//     });
//   }
// }

// pub_more_view
function pub_more_view() {
  let cont_wrap = document.querySelectorAll(".ui-only-cont-limited");

  for (let idx of cont_wrap) {
    let cont_text = idx.querySelector(".desc-text");
    let cont_btnwrap = idx.querySelector(".desc-btn");
    let cont_h = cont_text.querySelector(".desc-limited").offsetHeight;
    let cont_lim = cont_text.clientHeight + 3;

    if (cont_h > cont_lim) {
      cont_btnwrap.classList.add("active");
    }

    console.log(cont_h);
    console.log("기준" + cont_lim);
    // console.log(cont_lim);

    // 글 byte
    // let cont_str = cont_text.innerText;
    // let cont_length = cont_str.length;
    // let cont_byte = 0;
    // cont_byte = (function (s, b, i, c) {
    //   for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    //   return b;
    // })(cont_str);
    // if (cont_byte > 171) {
    //   cont_btnwrap.classList.add("active");
    // } else if (cont_byte > 133 && cont_length > 133) {
    //   // 영문일때
    //   cont_btnwrap.classList.add("active");
    // }

    // console.log(cont_str);
    // console.log(cont_length);
    // console.log(cont_byte);
    // console.log(kor_check);
  }
}

// pub_more_btn
// function pub_more_btn() {
//   document.addEventListener("click", function (e) {
//     if (e.target && e.target.className == "comp-btn--more") {
//       let parentNode = e.target.parentElement.parentElement;
//       // console.log(e.target);
//       // console.log(parentNode);

//       parentNode.classList.toggle("unset");
//       if (parentNode.classList.contains("unset")) {
//         e.target.innerHTML = "접기";
//       } else {
//         e.target.innerHTML = "더보기";
//       }
//     }
//   });
// }

// pub_dropdown_dot
// function pub_dropdown_dot() {
//   document.addEventListener("click", function (e) {
//     let listNodes = document.querySelectorAll(".ui-only-dropdown");
//     // for (let idx of listNodes) {
//     //   idx.classList.contains("active") && idx.classList.remove("active");
//     //   idx.classList.remove("active");
//     //   console.log(e.target);
//     // }
//     // $(".ui-only-dropdown").each(function () {
//     //   $(this).removeClass("active");
//     // });
//     if (e.target && e.target.className == "comp-btn--dot") {
//       let parentNode = e.target.parentElement.parentElement;
//       let selectNode = parentNode.children[0];
//       let listNode = parentNode.children[1];
//       // selectNode.classList.toggle("active");
//       // console.log(e.target);
//       // console.log(parentNode);
//       // console.log(selectNode);
//       // console.log(listNode);
//       // e.stopPropagation();
//       // e.stopImmediatePropagation();
//       // selectNode.classList.contains("active") ? selectNode.classList.remove("active") : selectNode.classList.add("active");
//       if ( selectNode.classList[2] == "active" ) {
//         selectNode.classList.remove("active")
//       } else {
//         for (let idx of listNodes) {
//           idx.classList.remove("active");
//           // console.log(idx);
//         }
//         selectNode.classList.add("active");
//         // console.log(selectNode.classList);
//       }
//       listNode.addEventListener("click", function () {
//         selectNode.classList.remove("active");
//       });
//     }
//   });
// }
// pub_brnew_tab

function pub_brnew_tab() {
  const tab_list = document.querySelectorAll(".ui-only-tab .comp-tab-list li");
  const tab_pan = document.querySelectorAll(".ui-only-tab .comp-tab-contents .comp-tab-panel");
  let cont_active = "";
  for (var i = 0; i < tab_list.length; i++) {
    tab_list[i].querySelector(".desc-tab-link").addEventListener("click", function (e) {
      e.preventDefault();
      for (var j = 0; j < tab_list.length; j++) {
        tab_list[j].classList.remove("active");
        tab_pan[j].classList.remove("active");
      }
      this.parentNode.classList.add("active");
      cont_active = this.getAttribute("data-tab-target");
      document.querySelector(cont_active).classList.add("active");
    });
  }
}

// 스크롤 로딩 scroll + debounce
function pub_scrolling() {
  const wrap = document.querySelector(".comm-list-wrap");
  const trigger = document.querySelector(".fetch-more");

  const debounce = (func, delay) => {
    let timeid = null;
    return (...args) => {
      clearTimeout(timeid);
      timeid = setTimeout(func.bind(null, ...args), delay);
    };
  };

  const fetchmore = () => {
    console.log("loading");
    $(
      "<div style='background-color: #fce66c; width:100%; height:800px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div><div style='background-color: gray; width:100%; height:300px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div><div style='background-color: #ccc; width:100%; height:200px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div>"
    ).appendTo(wrap);
  };

  const onScroll = (e) => {
    // console.dir(e.target.scrollingElement);
    const footer = document.querySelector("footer").clientHeight;
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    // console.log(scrollTop);
    // console.log(clientHeight);
    // console.log(footer);
    console.log(scrollHeight);

    if (scrollTop + clientHeight + footer > scrollHeight) {
      fetchmore();
    }
  };

  document.addEventListener("scroll", debounce(onScroll, 300));
}
// 스크롤 로딩 pub_observe
function pub_observer() {
  const body = document.querySelector(".comm-body");
  if (body.classList.contains("ui-only-observer")) {
    const wrap = document.querySelector(".comm-list-wrap");
    const trigger = document.querySelector(".fetch-more");
    // let page = 0;
    // const fetchmore = async () => {
    //   const target = page ? trigger : app;
    //   console.log("loading");
    //   // await renderList(page++);
    //   console.log("fin");
    // };
    const fetchmore = () => {
      console.log("loading");
      // $("<div style='background-color: #fce66c; width:100%; height:800px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div><div style='background-color: gray; width:100%; height:300px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div><div style='background-color: #ccc; width:100%; height:200px; text-align:center; padding:100px; font-size:20px; margin-top:20px; display:flex; justify-content:center; align-items:center;'>append</div>").appendTo(wrap);
      $(
        '<div class="comm-list"><div class="comm-profile-short"><span class="comp-profile--s70"><img src="https://cdn.boribori.co.kr/cdn/product/A5926/P316190675/2_P316190675_basic_1641176360925.jpg" alt=""></span><div class="desc-info"><div class="desc-id">하프보리맘00</div></div><div class="comp-dropdown-wrap type-icon"><div class="comp-dropdown-select ui-only-dropdown"><button type="button" class="comp-btn--dot"><span><i></i>더보기</span></button></div><div class="comp-dropdown-list"><ul><li><button type="button">수정</button></li><li><button type="button">삭제</button></li><li><button type="button">신고</button></li></ul></div></div></div><div class="comm-figure"><ul><li class="desc-figure"><img src="https://cdn.boribori.co.kr/cdn/product/A5926/P316190675/2_P316190675_basic_1641176360925.jpg" alt=""></li></ul></div><div class="comp-group-btns"><span class="comp-toggle"><input type="checkbox" name="" id="feed_like2" checked><label for="feed_like2"><i class="comp-ic--like">좋아요</i></label></span><button class="comp-btn--icon" type="button"><i class="comp-ic--reply">댓글</i></button><button class="comp-btn--icon" type="button" ng-click="setLayer("layer-comm-share")"><i class="comp-ic--share">공유</i></button></div><div class="comm-like-counter"><span class="desc-like">좋아요 1개</span></div><div class="comm-content ui-only-cont-limited"><div class="desc-text">드디어 다음주면 우리 아이가 졸업해요 ! 아직까지 실감이 나지 않네요. 내가 초등학생 학부모라니 시간이 너무 빠른 것 같아요. 아직 믿기지 않네요 !올해는 더 많이 입혀주고 가꿔줄게 !</div><div class="desc-btn"><button type="button" class="comp-btn--more" ng-click="pub_more_btn($event)">더보기</button></div></div><div class="comm-counter"><span class="desc-text">댓글 20개</span><button type="button" class="comp-btn">모두보기</button></div><div class="comm-date"><span class="desc-date">2022년 4월 10일</span></div></div>'
      ).appendTo(wrap);
    };

    const fetchmoreobserver = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) fetchmore();
      console.log(isIntersecting);
    });

    fetchmoreobserver.observe(trigger);
  }
}

// pub_gallery
function pub_gallery() {
  var swiper = new Swiper(".comm-gallery-list", {
    // loop: false,
    spaceBetween: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    touchRatio: 0,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  });
  var swiper2 = new Swiper(".comm-gallery-stage", {
    // zoom: true,
    // loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    // zoom: {
    //   maxRatio: 2,
    //   minRation: 1
    // },
    // zoom 원복
    on: {
      slideChange: function () {
        $(".panzoom").css({ transform: "matrix(1, 0, 0, 1, 0, 0)" });
      },
    },
  });
}
// pub_pinchzoom
function pub_pinchzoom() {
  // 플리킹 루트
  var $root = $(".comm-gallery-stage .swiper-slide");
  var prevTapTime = 0;

  // jquery.panzoom 적용
  $(".panzoom")
    .panzoom({
      minScale: 0.7,
      maxScale: 3,
      exponential: true,
      // 기본적으로 패닝 끔
      disablePan: true,
    })
    .on("panzoomzoom", function (e, panzoom, scale, opts) {
      // 확대/축소 동작시 패닝 켬
      panzoom.options.disablePan = false;
    })
    .on("panzoomend", function (e, panzoom, matrix, changed) {
      // 제스처가 끝난 시점에
      // 1. scale이 1보다 작음
      // 2. 변화가 없었고 더블 탭으로 판명
      // 1 혹은 2번을 만족하면 리셋한다. (scale을 1로, pan을 제자리로)
      if (panzoom.scale <= 1 || (!changed && +new Date() - prevTapTime < 300)) {
        panzoom.reset();
        panzoom.options.disablePan = true;
      }
      prevTapTime = +new Date();
    })
    .on("panzoomend", function (e, panzoom, matrix, changed) {
      var rect = panzoom.$elem.find("img").get(0).getBoundingClientRect();
      var diffW = Math.max(rect.width - $root.width(), 0);
      var diffH = Math.max(rect.height - $root.height(), 0);
      var maxX = diffW / 2;
      var minX = -maxX;
      var maxY = diffH / 2;
      var minY = -maxY;
      var x = parseFloat(matrix[4]);
      var y = parseFloat(matrix[5]);

      // 확대된 상태에서 패닝시 이미지가 뷰포트를 벗어나지 못하게 한다.
      if (panzoom.scale > 1) {
        x = Math.max(minX, Math.min(x, maxX));
        y = Math.max(minY, Math.min(y, maxY));
        panzoom.pan(x, y, {
          animate: true,
          silent: true,
        });
      }
    })
    .on("click", function (e) {
      var $el = $(e.currentTarget);
      // 더블 탭시 최대 스케일로 확대 한다.
      if (+new Date() - prevTapTime < 300) {
        $el.panzoom("zoom", $el.panzoom("option", "maxScale"), {
          animate: true,
        });
      }
      prevTapTime = +new Date();
    });
}
// pub_click_pinch
function pub_click_pinch() {
  const pub_pinch = document.querySelector(".desc-pinch-wrap");
  pub_pinch.classList.remove("hide");
  // pub_pinch.addEventListener("click", () => {
  //   pub_pinch.classList.add('hide');
  // });
  pub_pinch.addEventListener("touchstart", () => {
    pub_pinch.classList.add("hide");
  });
}

// pub_swipe
function pub_swipe() {
  var boriSwipes = [];
  function boriSlide() {
    $(".comm-slide-pape").each(function (i, obj) {
      if (boriSwipes[i] != null) {
        boriSwipes[i].destroy(false, true);
      }
      boriSwipes[i] = new Swiper(obj, {
        pagination: {
          el: ".swiper-pagination",
        },
      });
    });
  }
  boriSlide();
}

function pub_bind_test() {
  document.querySelector(".root").addEventListener("click", function (e) {
    console.log("root");
    console.log(e.target);
  });

  document.querySelector(".btn").addEventListener("click", function (e) {
    var div = document.createElement("div");
    div.className = "row";

    div.innerHTML = '<h2 class="parent"><button class="child"><span class="target">Target</span></button></h2>';

    document.querySelector(".root").appendChild(div);
  });
}
// pub_dropdown
function pub_dropdown() {
  class Dropdown {
    constructor(element) {
      this.element = element;
      this.trigger = element.querySelector(".ui-only-dropdown");
      this.intext = element.querySelector(".desc-text");
      this.opts = Array.from(element.querySelectorAll(".comp-dropdown-list > ul > li"));
      this.lists = element.querySelectorAll(".comp-dropdown-list > ul > li");
      this.selected = {
        text: "",
        val: "",
        index: -1,
      };
      this.bindEvents();
    }
    // bindEvents
    bindEvents() {
      this.trigger.addEventListener("click", this.toggleDropdown);
      for (let opt of this.opts) {
        opt.addEventListener("click", () => {
          let trgchk = this.trigger;
          // if (trgchk.classList.contains("ui-only-alt")) {
          //   this.closeDropdown();
          // } else {
          //   this.setValue(opt);
          //   this.closeDropdown();
          // }
          this.setValue(opt);
          this.closeDropdown();
        });
      }
      // Close menu
      document.addEventListener("click", (event) => {
        if (event.target !== this.element && !this.element.contains(event.target)) {
          this.closeDropdown();
        }
      });
    }
    // toggleDropdown
    toggleDropdown() {
      this.classList.contains("active") ? this.classList.remove("active") : this.classList.add("active");
    }
    // closeDropdown
    closeDropdown() {
      this.trigger.classList.remove("active");
    }
    // setValue
    setValue(opt) {
      const btn = opt.querySelector("button");
      let child = this.trigger.childNodes[1];
      let list = this.lists;
      // console.log(opt);
      // console.log(opt_prev);
      // console.log(testcnt);
      // console.log(child);
      for (let i = 0; i < list.length; i++) {
        // console.log(list[i]);
        list[i].classList.remove("active");
      }
      this.selected.text = opt.innerText;
      this.selected.index = this.opts.indexOf(opt);
      this.selected.val = btn.getAttribute("value");
      // console.log(this.selected);
      // 선택 구분
      opt.classList.contains("active") ? opt.classList.remove("active") : opt.classList.add("active");
      // 삭제 가능
      child.classList.contains("desc-text") && (this.intext.innerHTML = this.selected.text);
    }
  }
  var selects = Array.from(document.querySelectorAll(".comp-dropdown-wrap"));
  for (let select of selects) {
    const dropdown = new Dropdown(select);
  }
}

// pub_roadchk(
function pub_roadchk() {
  // 1. 대상 선정
  var target = document.querySelector(".comm-list-wrap");
  // 2. 옵저버 인스턴스 생성
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log(mutation);
      $timeout(function () {
        pub_more_view();
      }, 100);
    });
  });
  // 3. 옵션 설정
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
  };
  // 4. 실행
  observer.observe(target, config);
}

// goodgoods 스크롤 이벤트
function tem_ggs_scroll() {
  console.log("start");
  $scope.ggs = document.querySelector(".goodgoods");
  if ($scope.ggs.classList.contains("goodgoods-wrap")) {
    // top height
    const trigger = document.querySelector(".top-trigger");
    const trigger_h = trigger.clientHeight;
    const header = document.querySelector("header").clientHeight;
    const tit_box = document.querySelector(".planshop_tit_box").clientHeight;

    // contents
    const ggs_navi = trigger.querySelectorAll("ul li");
    const ggs_cont = document.querySelectorAll(".goodgoods-wrap .inBox");
    const length = ggs_navi.length;
    const ggs_last = ggs_navi[ggs_navi.length - 1];

    // coupon
    const coupon_h = document.querySelector(".area-coupon--img").clientHeight;
    const top_img_h = document.querySelector(".goodgoods .top_box").clientHeight;
    const top_h = coupon_h + top_img_h;

    // contents 위치 값
    const cont_pos = [];
    for (let i = 0; i < ggs_cont.length; i++) {
      let cont_el = window.pageYOffset + ggs_cont[i].getBoundingClientRect().top;
      cont_pos.push(cont_el);
    }
    const cont_last = cont_pos[cont_pos.length - 1];

    // ggs_anchor
    function ggs_anchor() {
      for (let i = 0; i < ggs_navi.length; i++) {
        let nav_el = ggs_navi[i];
        let pos_el = cont_pos[i];
        nav_el.addEventListener("click", function () {
          if (nav_el == ggs_navi[0]) {
            let pos = pos_el - trigger_h - header;
            window.scrollTo(0, pos);
          } else {
            let pos = pos_el - trigger_h - header;
            window.scrollTo(0, pos);
          }
        });
      }
    }
    ggs_anchor();

    // onScroll
    const onScroll = (e) => {
      const { scrollTop } = e.target.scrollingElement;
      const lim = scrollTop + trigger_h + header + 1;
      // console.dir(e.target.scrollingElement);

      // sticky 발동
      if (scrollTop > header + tit_box + top_h) {
        trigger.classList.add("sticky");
        trigger.style.top = header + "px";
      } else {
        trigger.classList.remove("sticky");
        trigger.style.top = "0px";
      }

      // 마킹범위
      for (let i = 0; i < length; i++) {
        let nav_el = ggs_navi[i];
        let cont = cont_pos[i];
        let cont_next = cont_pos[i + 1];
        nav_el.classList.remove("on");
        if (cont <= lim && cont_next > lim) {
          nav_el.classList.add("on");
        } else if (cont_last <= lim) {
          ggs_last.classList.add("on");
        }
      }
    };

    document.addEventListener("scroll", onScroll);
  }
}

// pub_terms_tab
function pub_terms_tab() {
  const tab_list = document.querySelectorAll(".terms-hierarchy .terms-tab-list li");
  const tab_pan = document.querySelectorAll(".terms-hierarchy .terms-tab-contents .terms-tab-panel");
  let cont_active = "";
  for (var i = 0; i < tab_list.length; i++) {
    tab_list[i].querySelector("button").addEventListener("click", function (e) {
      e.preventDefault();
      for (var j = 0; j < tab_list.length; j++) {
        tab_list[j].classList.remove("active");
        tab_pan[j].classList.remove("active");
      }
      this.parentNode.classList.add("active");
      cont_active = this.getAttribute("data-tab-target");
      document.querySelector(cont_active).classList.add("active");
    });
  }
}

// $timeout(function () {
//   // pub_more_btn();
//   // pub_dropdown();
//   // pub_dropdown_dot();
//   // pub_roadchk();
//   // pub_swipe();
//   // pub_scrolling();
//   // pub_observer();
//   // pub_bind_test();

//   pub_more_view();
//   // pub_brnew_tab();
//   // pub_insta_upload();

//   // tem_ggs_scroll();

//   // pub_terms_tab()
// }, 500);

// pub_bytetest
// function pub_bytetest() {
//   // 변수선언
//   var string = undefined; //테스트할 문자열

//   // 문자열 초기화
//   for (var j = 0; j < 10000; j++) {
//     string += "This is 아무의미없는 문자열";
//   }
//   var stringLength = string.length;
//   var stringByteLength = 0;

//   // 일반적인 FOR문으로 문자열 BYTE 계산
//   console.time("일반적인FOR방식");
//   for (var i = 0; i < stringLength; i++) {
//     if (escape(string.charAt(i)).length >= 4) stringByteLength += 3;
//     else if (escape(string.charAt(i)) == "%A7") stringByteLength += 3;
//     else if (escape(string.charAt(i)) != "%0D") stringByteLength++;
//   }
//   console.log(stringByteLength + " Bytes");
//   console.timeEnd("일반적인FOR방식");

//   // 개선된 FOR문으로 문자열 BYTE 계산
//   console.time("개선된FOR방식");
//   stringByteLength = (function (s, b, i, c) {
//     for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
//     return b;
//   })(string);
//   console.log(stringByteLength + " Bytes");
//   console.timeEnd("개선된FOR방식");

//   // encodeURI로 문자열 BYTE 계산
//   console.time("encodeURI방식");
//   stringByteLength = ~-encodeURI(string).split(/%..|./).length;
//   console.log(stringByteLength + " Bytes");
//   console.timeEnd("encodeURI방식");

//   // 정규식을 활용한 계산
//   console.time("정규식방식");
//   stringByteLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length;
//   console.log(stringByteLength + " Bytes");
//   console.timeEnd("정규식방식");
// }

//퍼블 테스트용 높이
// 제이쿼리는 outerHeight();
// let e_height = $(".in-txt").outerHeight();
// console.log(e_height);
// function test_txt() {
//   let test_t = document.querySelectorAll("[data-ui-review]");
//   for (let i = 0; i < test_t.length; i++) {
//       let test_e = test_t[i];
//       let test_h = test_e.querySelector(".in-txt").clientHeight;
//       let test_b = test_e.querySelector(".btn-more");
//       console.log(test_h);
//       if (test_h < "120") {
//           test_b.classList.add('hide');
//       }
//   }
// }
// window.onload = function () {
//   test_txt();
// };

// var swiper = new Swiper(".comm-gallery-list", {
//   // loop: true,
//   // spaceBetween: 10,
//   // slidesPerView: 4,
//   // freeMode: true,
//   // watchSlidesProgress: true,
// });
// var swiper2 = new Swiper(".comm-gallery-stage", {
//   // loop: true,
//   // spaceBetween: 10,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   thumbs: {
//     // swiper: swiper,
//   },
// });

//퍼블 테스트용 스크립트

//퍼블 테스트용 스크립트
// function pub_dropdown() {
//   let ui_ctrl = document.querySelectorAll(".ui-only-dropdown");
//   for (let i = 0; i < ui_ctrl.length; i++) {
//     let ui_parent = ui_ctrl[i].parentElement;
//     ui_ctrl[i].addEventListener("click", function () {
//       ui_parent.classList.toggle("active");
//     });
//   }
// }

// function toggleClass(element, className) {
//   if (elem.className.indexOf(className) !== -1) {
//     elem.className = elem.className.replace(className, "");
//   } else {
//     elem.className = elem.className.replace(/\s+/g, " ") + " " + className;
//   }
//   return elem;
// }
// function toggleDisplay(elem) {
//   const curDisplayStyle = elem.style.display;
//   if (curDisplayStyle === "none" || curDisplayStyle === "") {
//     elem.style.display = "block";
//   } else {
//     elem.style.display = "none";
//   }
// }

// function toggleMenuDisplay(e) {
//   const dropdown = e.currentTarget.parentNode;
//   const menu = dropdown.querySelector(".menu");
//   const icon = dropdown.querySelector(".fa-angle-right");
//   toggleClass(menu, "hide");
//   toggleClass(icon, "rotate-90");
// }

// function handleTitleChange(e) {
//   const result = document.getElementById("result");
//   result.innerHTML = "The result is: " + e.target.textContent;
// }

//get elements const dropdownTitle = document.querySelector('.dropdown .title'); const dropdownOptions = document.querySelectorAll('.dropdown .option'); //bind listeners to these elements dropdownTitle.addEventListener('click', toggleMenuDisplay); dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected)); document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);

// console.log(ui_prnt);

// const a = [0, 1, 2];

// a.forEach(
//   function (value, index, arr) {
//     console.log(value, index, arr, this);
//   },
//   [10, 11, 12]
// );

/* Arrow Function */
// a.forEach(
//   (v, i, arr) => {
//     console.log(v, i, arr, this);
//   },
//   [10, 11, 12]
// );

// //퍼블 테스트용 상품평 더보기
// function test_review_txt() {
//   let ellipsis_txt = document.querySelectorAll("[data-ui-review]");
//   let btn_ellipsis = document.querySelectorAll(".btn-more");

//   for (let i = 0; i < ellipsis_txt.length; i++) {
//       let ell = ellipsis_txt[i];
//       btn_ellipsis[i].addEventListener("click", function() {
//           let elltxt = ell.getAttribute("data-ui-review");
//           if (elltxt === "off") {
//               ell.setAttribute("data-ui-review", "active");
//               console.log(elltxt);
//           } if (elltxt === "active") {
//               ell.setAttribute("data-ui-review", "off");
//               console.log(elltxt);
//           }
//       });
//   }
// }

// // 브랜드 더보기 예시
// function pbl_brand() {
//   let pb_list = document.querySelector(".prdt_brand_list");
//   let pb_ctrl = document.querySelector(".prdt_brand_list .detail_view");
//   pb_ctrl.addEventListener("click", function() {
//     pb_list.classList.add("active");
//     pb_ctrl.classList.add("hide");
//     console.log(pb_list);
//     console.log(pb_ctrl);
//   });
// }

// // 가변필터 예시
// function pbl_varfilter() {
//   let pb_list = document.querySelector(".filter_var_list");
//   let pb_ctrl = document.querySelector(".filter_var_list .detail_view");
//   pb_ctrl.addEventListener("click", function() {
//     pb_list.classList.toggle("active");
//     pb_ctrl.classList.toggle("on");
//     if (pb_ctrl.classList.contains('on')) {
//       pb_ctrl.innerHTML = "접기";
//     } else {
//       pb_ctrl.innerHTML = "더보기";
//     }
//   });

//   // let theButton = document.getElementById('theButton');
//   // let theText = document.querySelectorAll('.the-text');

//   // theButton.onclick = function () {
//   // 	for(let x of theText) {
//   // 		x.classList.toggle('colorized');
//   // 	}
//   // };
// }

//퍼블 테스트용 스크립트
window.onload = function () {
  // pub_dropdown();
  // pub_moretext();
  // pub_brnew_tab();
};




"use strict";

// s : load
// window.addEventListener("load", function() {
// window.addEventListener('load', init);
// document.addEventListener('DOMContentLoaded', init);
// s : function
(function () {
  
  console.log("start");

  // 참고
  for (let img of document.querySelectorAll("img")) {
    img.alt = "circle"
    img.src =
      "data:image/svg+xml;base64," +
      btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <style>
          :root { color: blue }
          @media (prefers-color-scheme: dark) {
            :root { color: purple }
          }
        </style>
        <circle fill="currentColor" cx="16" cy="16" r="16"/>
      </svg>
    `);
    console.log(img)
  }

})();
// e : function
// });
// e : load



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
        item.setAttribute("data-layer-level", depth);
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
        if(depth > 0 && item.dataset.layerLevel == depth) {
          focusTarget = document.querySelector(`.layer .btn[data-layer=${id}]`);
          // console.log(item.dataset.layerLevel);
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
        item.setAttribute("data-layer-level", 0);
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

// document.addEventListener("click", function() {
//   outland2();
// });
