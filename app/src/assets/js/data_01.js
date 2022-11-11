"use strict";

import {crt, st, ctg} from "./data_options.js";

export let data_01 = [
  {
    depth1: ctg.ct00.id,
    depth2: "222",
    depth3: "222",
    depth4: "d4",
    view_id: "view_id",
    view_name: "view_name",
    view_url: "aaa/aaa.url",
    date: "2022-11-11",
    state: st.stay,
    author: crt.p00,
    note: "<p>note1</p><p>note2</p>",
  },
  {
    depth1: ctg.ct00.id,
    depth2: "d2",
    depth3: "d3",
    depth4: "d4",
    view_id: "view_id",
    view_name: "view_name",
    view_url: "aaa/aaa.url",
    date: "2022-11-02",
    state: st.stay,
    author: crt.p01,
    note: "<p>note1</p><p>note2</p>",
  },
  {
    depth1: ctg.ct00.id,
    depth2: "d2",
    depth3: "d3",
    depth4: "d4",
    view_id: "view_id",
    view_name: "view_name",
    view_url: "aaa/aaa.url",
    date: "2022-11-05",
    state: st.mod,
    author: crt.p00,
    note: "<p>Lorem ipsum dolor sit amet</p>",
  },
]