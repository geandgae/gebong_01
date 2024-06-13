"use strict";

// let num = 0;
// function showNum() {
//   console.log(this.num);
// }
// showNum(); //0

let person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
};

console.log(person.fullName());


// s : function
(function () {
  
  console.log(document.readyState);
  setTimeout(() => {
    console.log(document.readyState);
  }, 500);

  

})();
// e : function

docReady(function() {
  startLog();
});


function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function startLog() {
  console.log("core start !!!!!");
}
