// import data from "./data.js";

"use strict";

// s : load
// window.addEventListener("load", function() {
// window.addEventListener('load', init);
// document.addEventListener('DOMContentLoaded', init);
// s : function
(function () {
  /* [html 최초 로드 및 이벤트 상시 대기 실시] */
  window.onload = function () {
    console.log("");
    console.log("[window onload] : [start]");
    console.log("");

    // [이벤트 함수 호출]
    main();
  };

  /* [이벤트 수행 함수] */
  function main() {
    console.log("");
    console.log("[main] : [start]");
    console.log("");

    //로컬 assets 파일에 저장된 json 파일 읽기 실시 [json 파일에 선언된 변수이름으로 호출해야합니다]
    // var jsonData = JSON.parse(JSON.stringify(args));
    // console.log("");
    // console.log("[main] : [jsonData] : " + JSON.stringify(jsonData));
    // console.log("");

    // //json 데이터 파싱 실시
    // console.log("");
    // console.log("[main] : [idx] : " + jsonData.idx);
    // // console.log("[main] : [name] : " + jsonData.name);
    // // console.log("[main] : [program] : " + JSON.stringify(jsonData.program));
    // console.log("");
  }

  // <-- JSON데이터를 받아서 정보를 넣어주는 함수 생성 -->
  function renderTable(data, target) {
    // <-- 빈배열에 문자열로 푸쉬해줄 예정 -->
    let tbodyData = [];
    // <-- 이터레이터는 회원한명의 정보(객체로된) -->
    for (const item of data) {
      // <-- ['...', '...', ... , '...'] -->
      // <-- 위와 같이 배열안에 총 열개의 문자열이 생길것임 -->
      // <-- 백틱을 써주는 것을 꼭 명심 -->
      // console.log(tbodyData);
      // console.log(data[0]);
      tbodyData.push(`
        <tr>
          <td>${item.index}</td>
          <td>${item.depth1}</td>
          <td>${item.depth2}</td>
          <td>${item.depth3}</td>
          <td>${item.depth4}</td>
          <td>${item.view_id}</td>
          <td>${item.view_name}</td>
          <td>${item.view_url}</td>
          <td>${item.date}</td>
          <td>${item.state}</td>
          <td>${item.author}</td>
          <td>${item.note}</td>
        </tr>
      `);
    }

    // table target
    let thead = 
    `
      <tr>
        <th>no</th>
        <th>depth1</th>
        <th>depth2</th>
        <th>depth3</th>
        <th>depth4</th>
        <th>id</th>
        <th>name</th>
        <th>url</th>
        <th>date</th>
        <th>state</th>
        <th>author</th>
        <th>note</th>
      </tr>
    `;
    let table = document.querySelectorAll(".table");
    if (table) {
      table.forEach(function (item) {
        let id = item.getAttribute("id");
        if (id == target) {
          console.log(target);
          item.querySelector("thead").innerHTML = thead;
          item.querySelector("tbody").innerHTML = tbodyData.join("");
        }
      });
    }
  }
  renderTable(data_01, "table_01");
  renderTable(data_02, "table_02");
})();
// e : function
// });
// e : load
