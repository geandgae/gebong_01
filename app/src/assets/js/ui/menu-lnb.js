// 메뉴 초기화 함수
const initializeMenu = () => {
  // data-lnb="menubar"를 가진 모든 요소를 찾습니다.
  const menubars = document.querySelectorAll("[data-lnb=menubar]");

  // 각 menubar에 대해 초기화를 진행합니다.
  menubars.forEach((menubar) => {
    menubar.setAttribute("role", "menubar");

    // depth-1의 <li> 요소를 찾아서 role="none"을 설정합니다.
    const menuItems = menubar.querySelectorAll("li");
    menuItems.forEach((item) => {
      item.setAttribute("role", "none");

      // 버튼이 있으면 토글 버튼으로 설정합니다.
      const button = item.querySelector("button.toggle");
      if (button) {
        // 각 버튼에 고유한 ID를 생성합니다.
        const uniqueId = `menu-${Math.random().toString(36).substring(2, 9)}`;
        const submenu = button.nextElementSibling;

        // 버튼에 aria-controls 및 aria-expanded 속성을 설정합니다.
        button.setAttribute("aria-controls", uniqueId);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("role", "menuitem");

        // 서브메뉴가 존재하면 id와 role을 설정합니다.
        if (submenu && submenu.tagName === "UL") {
          submenu.setAttribute("id", uniqueId);
          submenu.setAttribute("role", "menu");
          // submenu.hidden = true;
        }
      }

      // 링크가 있으면 role="menuitem"을 설정합니다.
      const link = item.querySelector(".link");
      if (link) {
        link.setAttribute("role", "menuitem");
      }
    });
  });
};
initializeMenu();

// 메뉴 초기화 함수
const initializeMenu2 = () => {
  document.querySelectorAll("[data-lnb='menubar']").forEach((menubar) => {
    menubar.setAttribute("role", "menubar");

    menubar.querySelectorAll("li").forEach((item) => {
      item.setAttribute("role", "none");

      const button = item.querySelector("button.toggle");
      if (button) {
        const submenu = button.nextElementSibling;
        const uniqueId = submenu ? `menu-${Math.random().toString(36).substring(2, 9)}` : null;

        button.setAttribute("aria-controls", uniqueId);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("role", "menuitem");

        if (submenu && submenu.tagName === "UL") {
          submenu.setAttribute("id", uniqueId);
          submenu.setAttribute("role", "menu");
        }
      }

      const link = item.querySelector(".link");
      if (link) {
        link.setAttribute("role", "menuitem");
      }
    });
  });
};

// 메뉴 토글 핸들러 함수
const handleDepthToggle = (triggers) => {
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const parentLi = trigger.closest("li");

      // 현재 메뉴를 토글
      toggleMenu(trigger, !expanded);

      // 동일한 depth의 다른 메뉴들을 닫음
      closeSiblings(trigger);

      // 현재 메뉴가 닫힐 때 하위 메뉴도 모두 닫음
      if (expanded) {
        closeSubmenus(parentLi);
      }
    });
  });
};

// 현재 메뉴 토글 함수
const toggleMenu = (button, expand) => {
  button.setAttribute("aria-expanded", expand);
  button.classList.toggle("active", expand);
};

// 동일한 depth의 형제 메뉴 닫기 함수
const closeSiblings = (trigger) => {
  const parentLi = trigger.closest("li");
  parentLi.parentNode.querySelectorAll(":scope > li > button.toggle").forEach((btn) => {
    if (btn !== trigger) {
      toggleMenu(btn, false);
      closeSubmenus(btn.closest("li"));
    }
  });
};

// 하위 메뉴 닫기 함수
const closeSubmenus = (parentLi) => {
  parentLi.querySelectorAll("ul button.toggle").forEach((childBtn) => {
    toggleMenu(childBtn, false);
  });
};

// 메뉴 토글 초기화 함수
const lnbToggle = () => {
  document.querySelectorAll("[data-lnb='menubar']").forEach((menubar) => {
    const depthButtons = menubar.querySelectorAll("button.toggle");
    handleDepthToggle(depthButtons);
  });
};

// 초기화 및 이벤트 설정 실행
lnbToggle();























const handleDepthToggle2 = (triggers) => {
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const parentLi = trigger.closest("li");

      // 현재 메뉴를 토글
      trigger.setAttribute("aria-expanded", !expanded);
      trigger.classList.toggle("active", !expanded);

      console.log(trigger.parentNode.parentNode);

      // 같은 depth의 다른 메뉴들을 닫음
      parentLi.parentNode.querySelectorAll(":scope > li > button.toggle").forEach((btn) => {
        if (btn !== trigger) {
          btn.setAttribute("aria-expanded", "false");
          btn.classList.remove("active");

          // 하위 메뉴가 있다면 모두 닫음
          btn.closest("li").querySelectorAll("ul button.toggle").forEach((childBtn) => {
            childBtn.setAttribute("aria-expanded", "false");
            childBtn.classList.remove("active");
          });
        }
      });

      // 현재 메뉴가 닫힐 때 하위 메뉴도 모두 닫음
      if (expanded) {
        parentLi.querySelectorAll("ul button.toggle").forEach((childBtn) => {
          childBtn.setAttribute("aria-expanded", "false");
          childBtn.classList.remove("active");
        });
      }
    });
  });
};
const lnbToggle3 = () => {
  document.querySelectorAll("[data-lnb='menubar']").forEach((menubar) => {
    // 모든 depth에서 버튼을 찾아 이벤트 설정
    const depthButtons = menubar.querySelectorAll("button.toggle");
    handleDepthToggle2(depthButtons);
  });
};
// lnbToggle();






// 메뉴 토글을 위한 클릭 이벤트 설정
const lnbToggle2 = () => {
  const menubars = document.querySelectorAll("[data-lnb=menubar]");
  menubars.forEach((menubars) => {
    const depth1 = menubars.querySelectorAll(":scope > li > button.toggle");
    console.log(depth1);
    let activeButton = null; // 현재 활성화된 버튼을 추적
    depth1.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        // trigger.setAttribute("aria-expanded", !expanded);
        // trigger.classList.toggle("active", !expanded);

        // 기존에 열려있던 메뉴를 닫음
        if (activeButton && activeButton !== trigger) {
          activeButton.setAttribute("aria-expanded", "false");
          activeButton.classList.remove("active");
        }

        // 현재 클릭된 메뉴의 상태를 토글
        const isNowExpanded = !expanded;
        trigger.setAttribute("aria-expanded", isNowExpanded);
        trigger.classList.toggle("active", isNowExpanded);

        // 현재 활성화된 버튼을 갱신
        activeButton = isNowExpanded ? trigger : null;
      });

      const depth2 = trigger.closest("li").querySelectorAll(".depth-2 > li > button.toggle");
      console.log(depth2);
      let activeButton2 = null; // 현재 활성화된 버튼을 추적
      depth2.forEach((trigger2) => {
        trigger2.addEventListener("click", () => {
          const expanded2 = trigger2.getAttribute("aria-expanded") === "true";
          // 기존에 열려있던 메뉴를 닫음
          if (activeButton2 && activeButton2 !== trigger2) {
            activeButton2.setAttribute("aria-expanded", "false");
            activeButton2.classList.remove("active");
          }

          // 현재 클릭된 메뉴의 상태를 토글
          const isNowExpanded2 = !expanded2;
          trigger2.setAttribute("aria-expanded", isNowExpanded2);
          trigger2.classList.toggle("active", isNowExpanded2);

          // 현재 활성화된 버튼을 갱신
          activeButton2 = isNowExpanded2 ? trigger2 : null;
        });

        const depth3 = trigger2.closest("li").querySelectorAll(".depth-3 > li > button.toggle");
        console.log(depth3);
        let activeButton3 = null; // 현재 활성화된 버튼을 추적
        depth3.forEach((trigger3) => {
          trigger3.addEventListener("click", () => {
            const expanded3 = trigger3.getAttribute("aria-expanded") === "true";
            // 기존에 열려있던 메뉴를 닫음
            if (activeButton3 && activeButton3 !== trigger3) {
              activeButton3.setAttribute("aria-expanded", "false");
              activeButton3.classList.remove("active");
            }

            // 현재 클릭된 메뉴의 상태를 토글
            const isNowExpanded3 = !expanded3;
            trigger3.setAttribute("aria-expanded", isNowExpanded3);
            trigger3.classList.toggle("active", isNowExpanded3);

            // 현재 활성화된 버튼을 갱신
            activeButton3 = isNowExpanded3 ? trigger3 : null;
          });
        });
      });
    });
  });
};
// lnbToggle();



// const handleDepthToggle = (triggers) => {
//   triggers.forEach((trigger) => {
//     trigger.addEventListener("click", () => {
//       const expanded = trigger.getAttribute("aria-expanded") === "true";

//       // 클릭된 메뉴의 상태를 토글
//       trigger.setAttribute("aria-expanded", !expanded);
//       trigger.classList.toggle("active", !expanded);

//       const parentLi = trigger.closest("li");

//       // 현재 depth의 다른 메뉴들을 닫음
//       const siblingButtons = parentLi.parentNode.querySelectorAll(":scope > li > button.toggle");
//       siblingButtons.forEach((btn) => {
//         if (btn !== trigger) {
//           btn.setAttribute("aria-expanded", "false");
//           btn.classList.remove("active");

//           // 하위 메뉴가 있다면 모두 닫음
//           const childMenu = btn.closest("li").querySelectorAll("ul button.toggle");
//           childMenu.forEach((childBtn) => {
//             childBtn.setAttribute("aria-expanded", "false");
//             childBtn.classList.remove("active");
//           });
//         }
//       });

//       // 현재 클릭된 메뉴가 닫히는 경우 하위 메뉴들도 모두 닫음
//       if (expanded) {
//         const childMenu = parentLi.querySelectorAll("ul button.toggle");
//         childMenu.forEach((childBtn) => {
//           childBtn.setAttribute("aria-expanded", "false");
//           childBtn.classList.remove("active");
//         });
//       }
//     });
//   });
// };

// const lnbToggle = () => {
//   const menubars = document.querySelectorAll("[data-lnb='menubar']");

//   menubars.forEach((menubar) => {
//     const depth1 = menubar.querySelectorAll(":scope > li > button.toggle");

//     // 각 depth 처리
//     handleDepthToggle(depth1);

//     depth1.forEach((trigger) => {
//       const depth2 = trigger.closest("li").querySelectorAll(".depth-2 > li > button.toggle");
//       handleDepthToggle(depth2);

//       depth2.forEach((trigger2) => {
//         const depth3 = trigger2.closest("li").querySelectorAll(".depth-3 > li > button.toggle");
//         handleDepthToggle(depth3);
//       });
//     });
//   });
// };

// lnbToggle();
