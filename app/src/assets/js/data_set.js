"use strict";

// import
import {crt, st, ctg} from "./data_options.js";
import {data_00} from "./data_00.js";
import {data_01} from "./data_01.js";
import {data_02} from "./data_02.js";
import {data_03} from "./data_03.js";

for (let item in data_00) {
  data_00[item].depth1 = ctg.ct00.id;
  console.log(data_01[item].depth1);
}
for (let item in data_01) {
  data_01[item].depth1 = ctg.ct01.id;
  console.log(data_02[item].depth1);
}
for (let item in data_02) {
  data_02[item].depth1 = ctg.ct02.id;
  console.log(data_02[item].depth1);
}

// data_set
export const data_set = [
  ...data_00,
  ...data_01, 
  ...data_02,
  ...data_03,
];

// export default data_set;