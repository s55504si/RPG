let flag = true;
let objFlag = new Array(11);
objFlag = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
let plyName = prompt("プレイヤー名を入力してください");
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 4;
let plyExpNeed = new Array(10000);
for (let i = 0; i < 10000; i++) {
  plyExpNeed[i] = (i + 2) * (i + 2);
}

let plyImg = document.getElementById("plyImg");
let eneImg = document.getElementById("eneImg");
//プレイヤーのid取得
for (let i = 0; i <= 6; i++) {
  let plySt = new Array(7);
  plySt[i] = document.getElementById("plySt" + i);
}
plySt0.textContent = plyName;

let enemy = 0;
let eneName = [
  "スライム", //弱い
  "コウモリ", //素早い、回避
  "ネズミ", //素早い、攻撃
  "ヘビ", //普通、毒
  "イヌ", //普通、総合
  "ゴブリン", //普通、攻撃
  "幽霊", //hp低い、回避
  "ゾンビ", //リジェネ
  "火", //hp低い、攻撃
  "クマー", //強い、総合
  "【BOSS】九尾", //ボス
];

eneSt0.textContent = eneName[enemy];
let eneLv = [1, 3, 5, 10, 15, 20, 30, 40, 50, 65, 80];
let eneHp = 10;
let eneHpMax = [10, 15, 30, 75, 100, 150, 30, 100, 50, 200, 4000];
let eneAtt = [1, 1, 3, 2, 4, 5, 2, 4, 8, 7, 30];
let eneKill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let eneExp = [1, 3, 5, 10, 15, 20, 50, 60, 70, 100, 500];
let eneCntMax = [5, 2, 3, 6, 6, 8, 1, 5, 4, 6, 5];
let eneCnt = eneCntMax[0];

let obj = new Array(10);
for (let i = 0; i <= 9; i++) {
  obj[i] = document.getElementById("obj" + i);
  obj[i].textContent = eneName[i] + "を" + (20 - eneKill[i]) + "体倒す";
}

//敵のid取得
for (let i = 0; i <= 4; i++) {
  let eneSt = new Array(5);
  eneSt[i] = document.getElementById("eneSt" + i);
}

//モンスター移動
let nigeru = document.getElementById("nigeru");
let nextEne = document.getElementById("nextEne");
nigeru.addEventListener("mousedown", () => {
  if (enemy != 0 && flag) {
    enemy--;
    eneHp = eneHpMax[enemy];
    eneImg.src = "img/enemyA" + enemy + ".png";
    eneSt0.textContent = eneName[enemy];
    eneSt1.textContent = "レベル:" + eneLv[enemy];
    eneSt2.textContent = "HP:" + eneHpMax[enemy];
    eneSt3.textContent = "攻撃力:" + eneAtt[enemy];
    eneSt4.textContent = "倒した回数:" + eneKill[enemy];
  }
});
nextEne.addEventListener("mousedown", () => {
  if (enemy != 10 && flag) {
    enemy++;
    eneHp = eneHpMax[enemy];
    eneImg.src = "img/enemyA" + enemy + ".png";
    eneSt0.textContent = eneName[enemy];
    eneSt1.textContent = "レベル:" + eneLv[enemy];
    eneSt2.textContent = "HP:" + eneHpMax[enemy];
    eneSt3.textContent = "攻撃力:" + eneAtt[enemy];
    eneSt4.textContent = "倒した回数:" + eneKill[enemy];
  }
});

//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
      plySt2.textContent = "HP:" + plyHp;
    }
  }
});
//プレイヤーの攻撃
eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + enemy + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + enemy + ".png";
    if (eneHp - plyAtt > 0) {
      eneHp -= plyAtt;
    }
    //モンスターが倒れた時
    else {
      //BOSSの処理
      if (enemy == 10) {
        objFlag[10] = true;
        let bossObj = document.getElementById("bossObj");
        bossObj.textContent = "ボスを1回倒す (達成済み)";
      }
      eneHp = eneHpMax[enemy];
      eneKill[enemy]++;

      if (eneKill[enemy] >= 20) {
        objFlag[enemy] = true;
        obj[enemy].textContent = eneName[enemy] + "を20体倒す (達成済み)";
      } else {
        if (enemy != 10) {
          obj[enemy].textContent =
            eneName[enemy] + "を" + (20 - eneKill[enemy]) + "体倒す";
        }
      }
      if (
        objFlag[0] &&
        objFlag[1] &&
        objFlag[2] &&
        objFlag[3] &&
        objFlag[4] &&
        objFlag[5] &&
        objFlag[6] &&
        objFlag[7] &&
        objFlag[8] &&
        objFlag[9] &&
        objFlag[10]
      ) {
        flag = false;
        eneSec.textContent = "ゲームクリア！！！";
      }
      eneSt4.textContent = "倒した回数:" + eneKill[enemy];
      //経験値の獲得
      plyExp += eneExp[enemy];
      plySt5.textContent = "経験値:" + plyExp;
      plyExpNext -= eneExp[enemy];
    }

    //レベルアップの処理
    if (plyExpNext <= 0) {
      plyExpNext = plyExpNeed[plyLv + 1];
      plyLv++;
      plySt1.textContent = "レベル:" + plyLv;
      plyHpMax = plyLv * 2 + 6;
      plyHp = plyHpMax;
      plySt2.textContent = "HP:" + plyHp;
      plyAtt++;
      plySt3.textContent = "攻撃力:" + plyAtt;
      plyHeal++;
      plySt4.textContent = "回復魔法" + plyHeal;
    }
    plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
  }
  eneSt2.textContent = "HP:" + eneHp;
});
//敵の攻撃

let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  eneCnt--;
  if (flag) {
    if (eneCnt > 0) {
      eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
    } else {
      plyHp -= eneAtt[enemy];
      plyImg.src = "img/playerB.png";

      if (plyHp > 0) {
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "モンスターの攻撃まで " + eneCnt + " 秒";
      } else {
        plyHp = 0;
        clearInterval(loop);
        flag = false;
        plySt2.textContent = "HP:" + plyHp;
        eneSec.textContent = "ゲームオーバー";
      }
      setTimeout(() => {
        if (flag) {
          eneCnt = eneCntMax[enemy] + 1;

          plyImg.src = "img/playerA.png";
        }
      }, 500);
    }
  }
}, 1000);
