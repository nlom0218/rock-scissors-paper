const $emoji = document.querySelector("#js-gameEmoji");
const $stopBtn = document.querySelector("#js-stopBtn");
const $seleted = document.querySelector("#js-seleted");
const $result = document.querySelector("#js-result");
const $resetBtn = document.querySelector("#js-resetBtn");
const $winNum = document.querySelector("#js-winNum");

let win = 0;
let changing;
let curEmoji = "✌";
const changeEmoji = () => {
  changing = setInterval(() => {
    if (curEmoji === "✌") {
      curEmoji = "👊";
    } else if (curEmoji === "👊") {
      curEmoji = "🖐";
    } else {
      curEmoji = "✌";
    }
    $emoji.innerText = curEmoji;
  }, 100);
};

paintSeleted = (seleted) => {
  $seleted.innerText = `당신은 "${seleted}"를 선택하였습니다.`;
};

paintResult = (seleted) => {
  if (seleted === "✌") {
    if (curEmoji === "✌") {
      $result.innerText = "아쉽게 비겼습니다!";
    } else if (curEmoji === "👊") {
      $result.innerText = "당신은 졌습니다ㅠㅠ";
    } else {
      $result.innerText = "당신이 이겼습니다ㅎㅎ";
      win += 1;
    }
  } else if (seleted === "👊") {
    if (curEmoji === "👊") {
      $result.innerText = "아쉽게 비겼습니다!";
    } else if (curEmoji === "🖐") {
      $result.innerText = "당신은 졌습니다ㅠㅠ";
    } else {
      $result.innerText = "당신이 이겼습니다ㅎㅎ";
      win += 1;
    }
  } else {
    if (curEmoji === "🖐") {
      $result.innerText = "아쉽게 비겼습니다!";
    } else if (curEmoji === "✌") {
      $result.innerText = "당신은 졌습니다ㅠㅠ";
    } else {
      $result.innerText = "당신이 이겼습니다ㅎㅎ";
      win += 1;
    }
  }
};

paintWinNum = () => {
  $winNum.innerText = `이긴횟수는 ${win}회입니다.`;
};

handleClickStopBtn = (e) => {
  if (e.target.nodeName !== "BUTTON") return;
  clearInterval(changing);
  const seleted = e.target.value;
  paintSeleted(seleted);
  paintResult(seleted);
  paintWinNum();
};

handleClickResetBtn = () => {
  changeEmoji();
};

function init() {
  changeEmoji();
  $stopBtn.addEventListener("click", handleClickStopBtn);
  $resetBtn.addEventListener("click", handleClickResetBtn);
}

init();
