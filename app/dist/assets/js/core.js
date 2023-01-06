"use strict";

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
