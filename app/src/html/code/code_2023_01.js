// start
"use strict";

// 키보드 이벤트 자동 실행
(function () {
  // 키보드 이벤트 - 임시
  document.addEventListener("keydown", function (e) {
    keys[e.key] = true;
    // console.log("pushed key " + e.key);
    if (e.key === "c") {
      console.log("pushed key " + e.key);
      view_status();
    }
  });

  // move
  let keys = [];
  let keypress;
  let unit = document.querySelector(".player");
  let speed = 1;
  let speedX = 0;
  let speedY = 0;
  // test 용
  let spaceBg = document.querySelector(".space .bg");
  let distance = 0;
  let bgTarget = document.querySelector(".space .target-1");
  let tl = bgTarget.offsetLeft;
  let tt = bgTarget.offsetTop;
  let viewBox = document.querySelector(".view-box");
  setInterval(() => {
    // 장애물 or 적 테스트
    if (unit.offsetTop >= tt - 10 && unit.offsetTop <= tt + 10 && unit.offsetLeft >= tl - 10 && unit.offsetLeft <= tl + 10) {
      // 이동금지
      speedX = tl - 10;
      // viewBox.classList.remove("hide");
    } else {
      // viewBox.classList.add("hide");
    }

    if (keys.ArrowRight === true) {
      // console.log("right");
      if (speedX < 90) {
        speedX += speed;
      } else {
        if (distance > -200) {
          distance -= 100;
          spaceBg.style.left = `${distance}px`;
          // console.log(spaceBg.style.left);
          speedX = 0;
        }
      }
    }
    if (keys.ArrowLeft === true) {
      // console.log("left");
      if (speedX > 0) {
        speedX -= speed;
      } else {
        if (distance >= -200 && distance < 0) {
          distance += 100;
          spaceBg.style.left = `${distance}px`;
          // console.log(spaceBg.style.left);
          speedX = 90;
        }
      }
    }
    if (keys.ArrowDown === true) {
      // console.log("down");
      if (speedY < 90) {
        speedY += speed;
      }
    }
    if (keys.ArrowUp === true) {
      // console.log("up");
      if (speedY > 0) {
        speedY -= speed;
      }
    }
    unit.style.top = `${speedY}px`;
    unit.style.left = `${speedX}px`;
  }, 10);

  document.addEventListener("keyup", function (e) {
    keypress = false;
    keys[e.key] = false;
    // if (unit.offsetTop >= tt - 10 && unit.offsetTop <= tt + 10 && unit.offsetLeft >= tl - 10 && unit.offsetLeft <= tl + 10) {
    //   console.log(`top : ${unit.offsetTop}`);
    //   console.log(`left : ${unit.offsetLeft}`);
    // }
  });
})();

// =========== root ===========
let userName = window.localStorage.getItem("userName");
let userLevel = window.localStorage.getItem("userLevel") * 1;
let userExp = window.localStorage.getItem("userExp") * 1;
let userStr = window.localStorage.getItem("userStr") * 1;
let userDex = window.localStorage.getItem("userDex") * 1;
let userVit = window.localStorage.getItem("userVit") * 1;
let userLuc = window.localStorage.getItem("userLuc") * 1;
let getExp = Math.floor(Math.random() * 100) + 10;

let levelExp;
window.localStorage.setItem("levelExp", (userLevel + 1) * 100);
levelExp = window.localStorage.getItem("levelExp") * 1
if (!userName) {
  userName = "player";
}

// 예전에는 없어도 상관없었는데... 지금은 있어야함
let test_type;

console.log(userName);
console.log(`userStr : ${userStr}`);
console.log(`userDex : ${userDex}`);
console.log(`userVit : ${userVit}`);
console.log(`userLuc : ${userLuc}`);
console.log(`exp : ${userExp} / ${levelExp}`);


// =========== localStorage ===========
const setUser = () => {
  const userSet = document.querySelector("#userSet");
  const inputs = document.querySelectorAll(".form .input");

  // start
  for (const item of inputs) {
    item.value = window.localStorage.getItem(item.name);
  }

  // userSet
  userSet.addEventListener("click", () => {
    // 레벨 경험치 초기화
    window.localStorage.setItem("userExp", (userExp = 0));
    window.localStorage.setItem("userLevel", (userLevel = 0));
    for (const item of inputs) {
      if (item.name === "userName") {
        window.localStorage.setItem("userName", item.value);
      } else if (item.dataset.user === "status") {
        window.localStorage.setItem(item.name, item.value);
      }
    }
  });
};

const rollStatus = () => {
  const userRoll = document.querySelector("#userRoll");
  const inputs = document.querySelectorAll(".form .input[data-user=status]");
  userRoll.addEventListener("click", () => {
    for (const item of inputs) {
      item.value = Math.floor(Math.random() * 10) + 1;
    }
  });
};

const levelReset = () => {
  const btnExp = document.querySelector("#expReset");

  btnExp.addEventListener("click", () => {
    window.localStorage.setItem("userExp", (userExp = 0));
    window.localStorage.setItem("userLevel", (userLevel = 0));
    location.reload();
  });
};

const levelUp = () => {
  window.localStorage.setItem("userExp", (userExp += getExp));
  userExp = window.localStorage.getItem("userExp") * 1;
  if (userExp >= (userLevel + 1) * 100) {
    window.localStorage.setItem("userExp", (userExp -= (userLevel + 1) * 100));
    window.localStorage.setItem("userLevel", (userLevel += 1));

    console.log("levelUp");
    console.log(userLevel);
    console.log(userExp);
  }
};

// run
setUser();
rollStatus();
levelReset();

// =========== 변수 =========== : !!todo 코드 정리
// user 참조 객체(순수스탯)
let user_origin = {
  attack: (userStr + userLevel) * 10,
  hp: (userVit + userLevel) * 10,
  hit: (userDex + userLevel) * 100,
  defense: (userVit + userLevel),
};

// user 참조 객체(장비스탯)
let user_equipment = {
  attack: 0,
  hp: 0,
  hit: 0,
  defense: 0,
};

// user 객체
let user = {
  name: userName,

  lv: 1 + userLevel,

  exp: userExp,

  hp: user_origin.hp + user_equipment.hp,
  max_hp: user_origin.hp + user_equipment.hp,

  hit: user_origin.hit + user_equipment.hit,
  defense: user_origin.defense + user_equipment.defense,
  block: 10,
  dodge: 10,
  counter: 50,
  attack: user_origin.attack + user_equipment.attack,
  resistance: 10,

  fumble: 1,
  normal: 2,
  critical: 4,

  late_c: 20, // 크리 확률
  late_f: 50, // 펌블 확률

  add_c: 0.0, // 크리 추가 데미지

  penetrate: 0, // 관통

  damage_x: 1,
  damage_y: 0, // 크리일때 저항 무시
};

console.log(`lv : ${user.lv}`);

// mob 객체
let mob = {
  name: "mob",

  hp: 200,
  max_hp: 200,

  hit: 50,
  block: 10,
  dodge: 10,
  counter: 50,
  attack: 10,
  defense: 10,
  resistance: 10,

  fumble: 1,
  normal: 2,
  critical: 3,

  late_c: 50, // 크리 확률
  late_f: 50, // 펌블 확률

  add_c: 0.0, // 크리 추가 데미지

  penetrate: 0, // 관통

  damage_x: 1,
  damage_y: 0, // 크리일때 저항 무시
};

// weapon 객체
let weapon_list = {
  a_01: {
    // hit : 100,
    attack: 15,
    name: "a_01",
  },
  a_02: {
    hit : 100,
    attack: 40,
    name: "a_02",
  },
};

// 변수 설정
let p_damage = 50;
let r_damage = p_damage;
let b_damage = 0;

let p_defense = 100;
let p_resistance = 0;

let late_c = 50;
let late_f = 50;

let add_c = 0.0; // 크리 추가 데미지

let damage_x = 1;
let damage_y = 0; // 크리일때 저항 무시

let stack = 0;

let p_buff = 0;

let v_buff = "debuff";

let btn = document.querySelector(".hit");

let log_view = document.querySelector(".log");

// view 설정
let view_uhp = document.querySelector(".view-wrap .user .hp");
view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
let view_ust = document.querySelector(".view-wrap .user .st");
view_ust.innerText = `h ::: ${user.hit} b ::: ${user.block} d ::: ${user.dodge} c ::: ${user.counter} a ::: ${user.attack} d ::: ${user.defense} r ::: ${user.resistance}`;

let view_mhp = document.querySelector(".view-wrap .mob .hp");
view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;
let view_mst = document.querySelector(".view-wrap .mob .st");
view_mst.innerText = `h ::: ${mob.hit} b ::: ${mob.block} d ::: ${mob.dodge} c ::: ${mob.counter} a ::: ${mob.attack} d ::: ${mob.defense} r ::: ${mob.resistance}`;

let view_dmg = document.querySelector(".view-wrap .damage");
let view_miss = document.querySelector(".view-wrap .miss");
let view_counter = document.querySelector(".view-wrap .counter");

let trun_view = document.querySelector(".view-wrap");

let log_text;

let hit_type;
// =========== 변수 ===========

// weapon
function weapon(slot, type) {
  // console.log(slot);
  // console.log(type);

  // let user_h = slot.hit;
  let user_a = slot.attack;

  let wp_h = type.hit;
  let wp_a = type.attack;

  // console.log(user_h);
  // console.log(user_a);
  // console.log(wp_h);
  // console.log(wp_a);

  // slot.hit = wp_h;

  console.log("user_a : " + user_a);
  console.log("wp_a : " + wp_a);

  // console.log(user_origin);
  // console.log(user_equipment);

  user_equipment.attack = wp_a;
  user_equipment.hit = wp_h;
  user.attack = user_origin.attack + user_equipment.attack;
  user.hit = user_origin.hit + user_equipment.hit

  // log_box
  log_text = `user 은(는) ${type.name} 을(를) 장비하였다`;
  log_box();
  log_text = `공격력이 ${type.attack} 증가하였다`;
  log_box();
}

let console_test = function (e) {
  console.log("=================test1");
  console.log("origin : " + user_origin.attack);
  console.log("weapon : " + user_equipment.attack);
  console.log("total : " + user.attack);
  console.log(e);
};

function console_test2() {
  console.log("=================test2");
  user_origin.attack = user_origin.attack + 100;
  user.attack = user_origin.attack + user_equipment.attack;
  console.log("origin : " + user_origin.attack);
  console.log("weapon : " + user_equipment.attack);
  console.log("total : " + user.attack);
}

function console_test3() {
  console.log("=================test3");
  mob.attack = mob.attack + 100;
  console.log("total : " + mob.attack);
}

let stat_view = document.querySelector(".layer");
let stat_view_name = document.querySelector(".status .st-name");
let stat_view_lv = document.querySelector(".status .st-lv");
let stat_view_hp = document.querySelector(".status .st-hp");
let stat_view_hit = document.querySelector(".status .st-hit");
let stat_view_attack = document.querySelector(".status .st-attack");
let stat_view_defense = document.querySelector(".status .st-defense");

// status
function view_status() {
  // console.log("user-hp : " + user.hp);
  // console.log("user-attack  : " + user.attack);
  // console.log("user-hit  : " + user.hit);
  // console.log("======================================");
  // console.log("mob-hp : " + mob.hp);
  // console.log("mob-attack  : " + mob.attack);
  // console.log("mob-hit  : " + mob.hit);

  // view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

  stat_view_name.innerText = `${user.name}`;
  stat_view_lv.innerText = `lv : ${user.lv} / exp : ${user.exp}`;
  stat_view_hp.innerText = `hp : ${user.hp} / ${user.max_hp}`;
  stat_view_hit.innerText = `hit : ${user.hit}`;
  stat_view_attack.innerText = `attack : ${user.attack}`;
  stat_view_defense.innerText = `defense : ${user.defense}`;

  stat_view.classList.toggle("active");
}

// log_box
function log_box() {
  let log_wrap = document.querySelector(".log-wrap");
  let log_wrap_h = log_wrap.scrollHeight;
  let log_line = document.createElement("p");
  let text = document.createTextNode(log_text);
  log_line.appendChild(text);
  log_view.appendChild(log_line);
  // console.log(log_wrap_h);
  log_wrap.scrollTo({
    top: log_wrap_h,
    behavior: "smooth",
  });
  // log_view.scrollTo({
  //   top: 0,
  //   left: 100,
  //   behavior: 'smooth'
  // });
  // console.log(log_text)
  // // 1. <div> element 만들기
  // const newDiv = document.createElement('div');
  // // 2. <div>에 들어갈 text node 만들기
  // const newText = document.createTextNode('안녕하세요');
  // // 3. <div>에 text node 붙이기
  // newDiv.appendChild(newText);
  // // 4. <body>에 1에서 만든 <div> element 붙이기
  // document.body.appendChild(newDiv);
}

// hit 판정
function hitbox(at, tg) {
  if (at && tg) {
    console.log("===== hitbox 판정 =====");
    // console.log(at);
    let e = at.hit;
    let dice = Math.floor(Math.random() * 100 + 1);
    if (e > dice) {
      console.log("hit : " + e);
      console.log("dice : " + dice);
      console.log("hit");
      block(at, tg);
    } else {
      console.log("hit : " + e);
      console.log("dice : " + dice);
      console.log("miss");
      test_type = "miss";
      counter(at, tg, test_type);

      // log_box
      // log_text = `${v_turn} 은(는) 공격은 miss`;
      // log_box();
    }
  } else {
    console.log("false");
  }
}

// block 판정
function block(at, tg) {
  console.log("===== block 판정 =====");
  let e = at.hit;
  let d = tg.block;
  let dice = Math.floor(Math.random() * e + 1);
  // 막기
  if (d > dice) {
    console.log("block : " + d);
    console.log("dice : " + dice);
    console.log("block");
    test_type = "block";
    counter(at, tg, test_type);

    view_miss.classList.add("active");
    view_miss.innerText = `block`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 block 당했다.`;
    // log_box();
  } else {
    console.log("block : " + d);
    console.log("dice : " + dice);
    console.log("block fail");
    dodge(at, tg);
  }
}

// dodge 판정
function dodge(at, tg) {
  console.log("===== dodge 판정 =====");
  let e = at.hit;
  let g = tg.dodge;
  let dice = Math.floor(Math.random() * e + 1);
  // console.log(p_dice);
  // 막기
  if (g > dice) {
    console.log("dodge : " + g);
    console.log("dice : " + dice);
    console.log("dodge");
    test_type = "dodge";
    counter(at, tg, test_type);

    view_miss.classList.add("active");
    view_miss.innerText = `dodge`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 dodge 당했다.`;
    // log_box();
  } else {
    console.log("dodge : " + g);
    console.log("dice : " + dice);
    console.log("damage");
    damage(at, tg);
  }
}

// counter 판정
function counter(at, tg, test_type) {
  console.log("===== counter 판정 =====");

  let ater = at.name;
  // let dter = tg.name;

  let e = tg.counter;
  let att = Math.round(tg.attack * 0.5);
  let hp = at.hp;
  let dice = Math.floor(Math.random() * 100 + 1);
  if (e > dice) {
    console.log("counter : " + e);
    console.log("dice : " + dice);
    console.log("counter!!!!");

    console.log(att);

    at.hp = hp - att;
    if (at.hp < 0) {
      at.hp = 0;
    }
    view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
    view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

    // view_dmg.classList.add("active");
    // view_dmg.innerText = `counter!! -${att}`;
    view_counter.classList.add("active");
    view_counter.innerText = `counter!! -${att}`;
    view_miss.classList.add("active");
    view_miss.innerText = `miss`;
    setTimeout(() => {
      view_counter.classList.remove("active");
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 ${test_type}`;
    log_text = `${ater}의 공격은 ${test_type}`;
    log_box();
    log_text = `${ater}의 은(는) 반격당해 ${att} 피해를 입었다`;
    log_box();

    trun();
    // btn.classList.add("active");
    // console.log(btn);
  } else {
    console.log("counter : " + e);
    console.log("dice : " + dice);
    console.log("counter fail");

    view_miss.classList.add("active");
    view_miss.innerText = `miss`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_text = `${v_turn} 은(는) 공격은 ${test_type}`;
    log_text = `${ater}의 공격은 ${test_type}`;
    log_box();

    trun();
    // btn.classList.add("active");
    // console.log(btn);
  }
}

// damage 판정
function damage(at, tg) {
  console.log("===== damage 판정 =====");
  let lc = at.late_c;
  let lf = at.late_f;
  let fmb = at.fumble;
  let cri = at.critical;
  let nor = at.normal;
  let ac = at.add_c;
  let dice = Math.floor(Math.random() * 100 + 1);
  console.log("dice1 : " + dice);
  if (lc > dice) {
    at.damage_x = cri + ac;
    at.damage_y = 10;
    console.log("critical : " + lc);
    console.log("damage_x : " + at.damage_x);
    console.log("critical");
    hit_type = "치명타";
    damage_a(at, tg);
  } else {
    let dice_2 = Math.floor(Math.random() * 100 + 1);
    console.log("dice2 : " + dice_2);
    if (lf > dice_2) {
      at.damage_x = fmb;
      at.damage_y = 0;
      console.log("fumble : " + lf);
      console.log("damage_x : " + at.damage_x);
      console.log("fumble");
      hit_type = "빗맞힘";
      damage_a(at, tg);
    } else {
      at.damage_x = nor;
      at.damage_y = 0;
      console.log("damage_x : " + at.damage_x);
      console.log("normal");
      hit_type = "일반공격";
      damage_a(at, tg);
    }
  }
}

// damage 계산
function damage_a(at, tg) {
  // if (v_buff == "buff") {
  //   p_damage = b_damage;
  // } else {
  //   p_damage = r_damage;
  // }
  console.log("===== damage =====");
  // Math.floor(Math.random() * (max - min)) + min;
  // let damage = (p_damage - p_defense) * (100 - p_resistance ) / 100;
  // let damage = Math.round((p_damage - p_defense) * (100 - p_resistance ) / 100 + 0);

  // // let damage4 = (p_damage * (100 - p_resistance) / 100) - p_defense;
  // // let damage5 = p_damage * damage2;
  // // let damage0 = damage1 - damage5;
  // console.log(damage4);
  // console.log(damage5);
  // console.log(damage0);

  let ater = at.name;
  let dter = tg.name;

  let hp = tg.hp;
  let att = at.attack;
  let x = at.damage_x;
  let y = at.damage_y;
  let pnt = at.penetrate;

  let def = tg.defense;
  let res = tg.resistance;

  let damage1 = att * x - (def - pnt * 0.5);
  let damage2 = (100 - (res - y)) / 100;
  let damage3 = Math.round(damage1 * damage2);
  if (damage3 <= 0) {
    damage3 = 1;
  }
  console.log("damage_ori : " + damage1);
  console.log("damage_res : " + damage2);
  console.log("damage : " + damage3);

  tg.hp = hp - damage3;

  if (tg.hp < 0) {
    tg.hp = 0;
  }
  view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
  view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

  view_dmg.classList.add("active");
  view_dmg.innerText = `${hit_type}!! ${damage3}`;
  setTimeout(() => {
    view_dmg.classList.remove("active");
  }, 500);

  // log_box
  // log_text = `${v_turn} 은(는) ${hit_type}!! ${damage3} 피해를 주었다`;
  log_text = `${ater}은(는) ${dter}에게 ${hit_type}!! ${damage3} 피해를 주었다`;
  log_box();

  trun();

  // console.log(btn);
}

// 보상설정
const chest_list = {
  // nm
  ci_01: {
    grade: "nm",
    attack: 10,
    name: "ci_01",
  },
  ci_02: {
    grade: "nm",
    attack: 20,
    name: "ci_02",
  },
  ci_03: {
    grade: "nm",
    attack: 30,
    name: "ci_03",
  },
  // mg
  ci_04: {
    grade: "mg",
    attack: 40,
    name: "ci_04",
  },
  ci_05: {
    grade: "mg",
    attack: 50,
    name: "ci_05",
  },
  // ra
  ci_06: {
    grade: "ra",
    attack: 60,
    name: "ci_06",
  },
  ci_07: {
    grade: "ra",
    attack: 70,
    name: "ci_07",
  },
  // ep
  ci_08: {
    grade: "ep",
    attack: 80,
    name: "ci_08",
  },
  ci_09: {
    grade: "ep",
    attack: 90,
    name: "ci_09",
  },
  // uq
  ci_10: {
    grade: "uq",
    attack: 100,
    name: "ci_10",
  },
  ci_11: {
    grade: "uq",
    attack: 110,
    name: "ci_11",
  },
};
let chest_selected;
const chest = () => {
  

  // 등급
  const nm = () => {
    const d =  Math.floor(Math.random() * 3) + 1;
    // console.log(`nm---- ${d}`);
    if (d === 1) { chest_selected = chest_list.ci_01.name; }
    if (d === 2) { chest_selected = chest_list.ci_02.name; }
    if (d === 3) { chest_selected = chest_list.ci_03.name; }
    return chest_selected 
  }
  const mg = () => {
    const d =  Math.floor(Math.random() * 2) + 1;
    // console.log(`mg---- ${d}`);
    if (d === 1) { chest_selected = chest_list.ci_04.name; }
    if (d === 2) { chest_selected = chest_list.ci_05.name; }
    return chest_selected 
  }
  const ra = () => {
    const d =  Math.floor(Math.random() * 2) + 1;
    // console.log(`ra--- ${d}`);
    if (d === 1) { chest_selected = chest_list.ci_06.name; }
    if (d === 2) { chest_selected = chest_list.ci_07.name; }
    return chest_selected 
  }
  const ep = () => {
    const d =  Math.floor(Math.random() * 2) + 1;
    // console.log(`ep--- ${d}`);
    if (d === 1) { chest_selected = chest_list.ci_08.name; }
    if (d === 2) { chest_selected = chest_list.ci_09.name; }
    return chest_selected 
  }
  const uq = () => {
    const d =  Math.floor(Math.random() * 100) + 1;
    // console.log(`uq--- ${d}`);
    if (d === 100) {
      console.log("!!!!!");
      chest_selected = chest_list.ci_11.name; 
    } else {
      chest_selected = chest_list.ci_10.name;
    }
    return chest_selected 
  }

  // test용
  const roll = document.querySelector("#chestRoll");
  const result = document.querySelector("#chestResult");
  const roll100 = document.querySelector("#roll100");
  let array = [];
  roll.addEventListener("click", () => {
    // roll 1 아이템 등급 결정 100중에 1~55-nm, 56~75-mg, 76~90-ra, 91~99-ep, 100-uq
    const dice1 = Math.floor(Math.random() * 100) + 1;
    if (dice1) {
      console.log(dice1);
      if (dice1 >= 1 && dice1 <= 55) {
        nm();
        console.log(chest_selected);
        array.push("nm");
      } else if (dice1 >= 56 && dice1 <= 75) {
        mg();
        console.log(chest_selected);
        array.push("mg");
      } else if (dice1 >= 76 && dice1 <= 90) {
        ra();
        console.log(chest_selected);
        array.push("ra");
      } else if (dice1 >= 91 && dice1 <= 99) {
        ep();
        console.log(chest_selected);
        array.push("ep");
      } else if (dice1 === 100) {
        uq();
        console.log(chest_selected);
        array.push(chest_selected);
      }
    }
  })

  // 100번 자동
  roll100.addEventListener("click", () => {
    for (let i = 1; i <= 1000; i++) {
      const dice1 = Math.floor(Math.random() * 100) + 1;
      if (dice1) {
        if (dice1 >= 1 && dice1 <= 55) {
          nm();
          array.push("nm");
        } else if (dice1 >= 56 && dice1 <= 75) {
          mg();
          array.push("mg");
        } else if (dice1 >= 76 && dice1 <= 90) {
          ra();
          array.push("ra");
        } else if (dice1 >= 91 && dice1 <= 99) {
          ep();
          array.push("ep");
        } else if (dice1 === 100) {
          uq();
          array.push(chest_selected);
        }
      }
    }
  })

  result.addEventListener("click", () => {

    const rnm = array.filter((word) => word === "nm");
    const rmg = array.filter((word) => word === "mg");
    const rra = array.filter((word) => word === "ra");
    const rep = array.filter((word) => word === "ep");
    const ci_10 = array.filter((word) => word === "ci_10");
    const ci_11 = array.filter((word) => word === "ci_11");
    // console.log(`
    //   [${array}]
    //   all : ${array.length}
    //   nm : ${rnm.length}
    //   mg : ${rmg.length}
    //   ra : ${rra.length}
    //   ep : ${rep.length}
    //   uq : ${ci_10.length}
    //   suq : ${ci_11.length}
    // `);
    console.log(`
      all : ${array.length}
      nm : ${rnm.length}
      mg : ${rmg.length}
      ra : ${rra.length}
      ep : ${rep.length}
      uq : ${ci_10.length}
      suq : ${ci_11.length}
    `);
  })
  // test용


}
// test
chest();

// trun stack 전투 종료 결정
function trun(e) {
  // stack++;
  // p_buff--;
  // if (p_buff < 0) {
  //   v_buff = "debuff";
  // }
  // console.log("stack : " + stack);
  // console.log("time : " + p_buff);
  // console.log("v_buff : " + v_buff);
  if (user.hp <= 0) {
    // console.log("========= game over =========");
    log_text = `user 은(는) 패배하였다`;
    log_box();
  } else if (mob.hp <= 0) {
    // console.log("========= game clear =========");
    levelUp();
    chest();
    log_text = `user 은(는) 승리하였다`;
    log_box();
    log_text = `user 은(는) ${getExp}의 경험치를 얻었다.`;
    log_box();
    log_text = `user 은(는) ${chest_selected}을(를) 얻었다.`;
    log_box();
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  } else {
    setTimeout(() => {
      btn.classList.add("active");
    }, 500);
  }
}

// buff 지금은 사용 안 함 : !!todo 턴 경과후 버프 삭제 및 버프 비율
function buff(e) {
  p_buff = 3;
  v_buff = "buff";
  b_damage = r_damage + 1000;
  console.log("stack : " + stack);
  console.log("time : " + p_buff);
  console.log("v_buff : " + v_buff);
  console.log(b_damage);
  user.attack = user_origin.attack + user_equipment.attack + b_damage;
}

// start 공격 이벤트 버튼 : !!todo 몹 자동으로 턴 넘어가게 
let v_turn = "user";

function start() {
  if (v_turn == "user") {
    console.log(v_turn);
    // 데미지 계산
    btn.classList.remove("active");
    hitbox(user, mob);

    // 턴 넘기기
    setTimeout(() => {
      trun_view.classList.remove("turn_user");
      trun_view.classList.add("turn_mob");
      btn.innerText = `mob hit`;
      v_turn = "mob";
    }, 500);
  } else {
    console.log(v_turn);
    // 데미지 계산
    btn.classList.remove("active");
    hitbox(mob, user);

    // 턴 넘기기
    setTimeout(() => {
      trun_view.classList.remove("turn_mob");
      trun_view.classList.add("turn_user");
      btn.innerText = `user hit`;
      v_turn = "user";
    }, 500);
  }
}






// 마우스 오른쪽 이벤트 테스트용 위 코드랑 관계 없음
document.oncontextmenu = function () {
  // Use document as opposed to window for IE8 compatibility
  return false;
};

window.addEventListener(
  "contextmenu",
  function (e) {
    // Not compatible with IE < 9
    e.preventDefault();
    console.log("right");
  },
  false
);