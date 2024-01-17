function getWinnerRock(player2)
{
  if (player2 === 'rock') {
    return 'tie';
  }
  else if (player2 === 'paper'){
    return 'lose';
  }
  else {
    return 'win';
  }
}
function getWinnerPaper(player2)
{
  if (player2 === 'rock') {
    return 'win';
  }
  else if (player2 === 'paper'){
    return 'tie';
  }
  else {
    return 'lose';
  }
}
function getWinnerScissor(player2)
{
  if (player2 === 'rock') {
    return 'lose';
  }
  else if (player2 === 'paper'){
    return 'win';
  }
  else {
    return 'tie';
  }
}
//combinations of 3 functions above
function getWinner(value, player2) {
  if (value === 'rock')
  {
    return getWinnerRock(player2);
  }
  else if (value ==='paper')
  {
    return getWinnerPaper(player2);
  }
  else if (value === 'scissor')
  {
    return getWinnerScissor(player2);
  }
}

function refreshOpponentButton() {
  for (let i = 1; i <= 3; i++)
  {
    let button = document.getElementById(`opp_btn${i}`);
    button.style.backgroundColor = 'white';
    button.style.boxShadow = 'none';
  }
}
function markOpponentButton(player2) {
  let i;
  if (player2 === 'rock') {
    i = 1;
  }
  else if (player2 === 'paper') {
    i = 2;
  }
  else {
    i = 3;
  }

  let button = document.getElementById(`opp_btn${i}`);
  button.style.backgroundColor = 'rgb(31, 23, 23)';
  button.style.boxShadow = '0px 0px 20px rgb(255, 255, 255, 0.5)';
}
//combination of 2 functions above
function updateOpponentButton(player2) {
  refreshOpponentButton();
  markOpponentButton(player2);
}

function updateCenterImage(value, player2) {
  let yourCenterImage = document.getElementById('picked1');
  let oppCenterImage = document.getElementById('picked2');

  if (value === 'rock') {
    yourCenterImage.src = "./images/rock.jpg";
    yourCenterImage.style.width = '50%';
  }
  else if (value === 'paper') {
    yourCenterImage.src = "./images/paper.jfif";
    yourCenterImage.style.width = '50%';
  }
  else {
    yourCenterImage.src = "./images/scissor.jfif";
    yourCenterImage.style.width = '50%';
  }

  if (player2 === 'rock') {
    oppCenterImage.src = "./images/rock.jpg";
    oppCenterImage.style.width = '50%';
  }
  else if (player2 === 'paper') {
    oppCenterImage.src = "./images/paper.jfif";
    oppCenterImage.style.width = '50%';
  }
  else {
    oppCenterImage.src = "./images/scissor.jfif";
    oppCenterImage.style.width = '50%';
  }
}

function updateScore(result = "tie", yourScore, oppScore) {
  if (result === 'win') {
    yourScore[0] += 1;
  }
  else if (result === 'lose') {
    oppScore[0] += 1;
  }

  let your_Score = document.getElementById('yourScore');
  let opp_Score = document.getElementById('oppScore');

  your_Score.textContent = (`SCORE: ${yourScore}`);
  opp_Score.textContent = (`SCORE: ${oppScore}`);
}

function updateIndicator(result, value, player2) {
  let indicator = document.getElementById('indi');
  indicator.style.display = 'block';

  if (result === 'win') {
    indicator.textContent = `${value.toUpperCase()} BEATS ${player2.toUpperCase()}.`;
  }
  else if (result === 'lose') {
    indicator.textContent = `${player2.toUpperCase()} BEATS ${value.toUpperCase()}.`;
  }
  else {
    indicator.textContent = `IT'S A TIE BREAKER.`;
  }
}

function playAgain(yourScore, oppScore) {
  let playAgainPanel = document.getElementById('pa-panel');
  let yesButton = document.getElementById('yes');
  let noButton = document.getElementById('no');
  let indicator = document.getElementById('indi');
  let remark = document.getElementById('remark');

  if(yourScore[0] === 5 || oppScore[0] === 5)
  {
    remark.textContent = (yourScore[0] === 5) ? "YOU WIN :]" : "YOU LOSE :[";
    playAgainPanel.style.display = "flex";
  }

  yesButton.addEventListener('click', function () {
    yourScore[0] = 0;
    oppScore[0] = 0;
    playAgainPanel.style.display = "none";
    indicator.textContent = "START";
    updateScore("none", yourScore, oppScore);
  })

  noButton.addEventListener('click', function () {
    playAgainPanel.style.display = "none";
  })
}


let player2 = ['paper', 'rock', 'scissor', 'rock', 'scissor'];
let yourScore = [0];
let oppScore = [0];
let value;

for(let i = 1; i <= 3; i++)
{
  let button = document.getElementById(`your_btn${i}`);
  let result;

  button.addEventListener('click', function () {
    value = button.value;

    result = getWinner(value, player2[0]);
    console.log(player2[0]);
    console.log(result);

    updateOpponentButton(player2[0]);
    updateCenterImage(value, player2[0]);
    updateScore(result, yourScore, oppScore);
    updateIndicator(result, value, player2[0]);
    player2.shift();
    player2.push(value);
    playAgain(yourScore, oppScore);
  })
}