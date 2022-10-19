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
