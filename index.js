const $emoji = document.querySelector("#js-gameEmoji");
const $stopBtn = document.querySelector("#js-stopBtn");
const $seleted = document.querySelector("#js-seleted");
const $result = document.querySelector("#js-result");
const $numOfWin = document.querySelector("#js-numOfWin");
const $numOfDraw = document.querySelector("#js-numOfDraw");
const $numOfLose = document.querySelector("#js-numOfLose");
const $oddsToWin = document.querySelector("#js-oddsToWin");

let numOfGamesLeft = 10;
let numOfWin = 0;
let numOfDraw = 0;
let numOfLose = 0;
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

changeToNum = (emoji) => {
  if (emoji === "✌") {
    return -1;
  } else if (emoji === "👊") {
    return 0;
  } else {
    return 1;
  }
};

paintResult = (seleted) => {
  const curEmojiNum = changeToNum(curEmoji);
  const seletedNum = changeToNum(seleted);
  const resultNum = seletedNum - curEmojiNum;
  if (resultNum === 0) {
    $result.innerText = "아쉽게 비겼습니다!";
    numOfDraw += 1;
  } else if ([1, -2].includes(resultNum)) {
    $result.innerText = "당신이 이겼습니다ㅎㅎ";
    numOfWin += 1;
  } else {
    $result.innerText = "당신은 졌습니다ㅠㅠ";
    numOfLose += 1;
  }
};

paintScoreboard = () => {
  const numOfGames = numOfWin + numOfDraw + numOfLose;
  const oddsToWin = Math.round((numOfWin / numOfGames) * 100);
  $numOfWin.innerText = numOfWin;
  $numOfDraw.innerText = numOfDraw;
  $numOfLose.innerText = numOfLose;
  $oddsToWin.innerText = `${oddsToWin}%`;
};

handleClickStopBtn = (e) => {
  if (e.target.nodeName !== "BUTTON") return;
  $stopBtn.removeEventListener("click", handleClickStopBtn);
  clearInterval(changing);
  let i = 3;
  const countDown = setInterval(() => {
    i -= 1;
    if (i === 0) {
      clearInterval(countDown);
      $stopBtn.addEventListener("click", handleClickStopBtn);
      changeEmoji();
    }
  }, 1000);
  const seleted = e.target.value;
  paintSeleted(seleted);
  paintResult(seleted);
  paintScoreboard();
};

function init() {
  changeEmoji();
  $stopBtn.addEventListener("click", handleClickStopBtn);
}

init();
