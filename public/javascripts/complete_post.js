"use strict";

let time_count = 5;

function count_return_time() {
  document.getElementById("count_time").innerHTML = time_count;
  time_count--;
  if (time_count < 0) location.href = "/";
}

setInterval(() => {
  count_return_time();
}, 1000);
