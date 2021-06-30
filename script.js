const startContainer = document.querySelector('#start-container')
const chooseContainer = document.querySelector('#choose-container')
const gameContainer = document.querySelector('#game-container')
const charImgs = document.querySelectorAll('.character-img')
const startBtn = document.querySelector('#start-btn')
const commenceBtn = document.querySelector('#commence-btn')
const playerPortrait = document.querySelector('#player-portrait')
const opponentPortrait = document.querySelector('#opponent-portrait')
const rockChoice = document.querySelector('#rock')
const paperChoice = document.querySelector('#paper')
const scissorChoice = document.querySelector('#scissor')
const choices = document.querySelectorAll('.choice')
const choiceBtn = document.querySelector('#choice-btn')
const playerScoreSpan = document.querySelector('#player-score')
const opponentScoreSpan = document.querySelector('#opponent-score')

const choiceArray = ['rock', 'paper', 'scissor']
let chosenImg = 'resources/images/Goobbue.png'
let opponentImage
let playerChoice
let playerScore = 0
let opponentScore = 0

startBtn.addEventListener('click', chooseCharacters)
commenceBtn.addEventListener('click', startGame)

charImgs.forEach(charImg => {
  charImg.addEventListener('click', highlightChar)
})

function chooseCharacters() {

  startContainer.classList.add('remove')
  setTimeout(() => startContainer.remove(), 2000)
  setTimeout(() => chooseContainer.classList.add('active'), 1500)
}

function highlightChar() {
  charImgs.forEach(img => img.classList.remove('active'))
  this.classList.add('active')
  chosenImg = this.src
}

function randomizeOpponent() {
  let randomNum = Math.floor(Math.random() * 6)
  opponentImage = charImgs[randomNum].src
  console.log(opponentImage)
}

commenceBtn.addEventListener('click', startGame)

function startGame() {
  chooseContainer.classList.add('remove')
  setTimeout(() => chooseContainer.classList.remove('active'), 800)
  setTimeout(() => chooseContainer.remove(), 1000)
  setTimeout(() => gameContainer.classList.add('active'), 1500)
  randomizeOpponent()
  playerPortrait.src = chosenImg
  opponentPortrait.src = opponentImage
}

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choices.forEach(choice => choice.classList.remove('chosen'))
    choice.classList.add('chosen')
    playerChoice = choice.id
  })
})

choiceBtn.addEventListener('click', compareChoicesAndScore)

function compareChoicesAndScore() {
  let randomizer = Math.floor(Math.random() * 3)
  let computerChoice = choiceArray[randomizer]

  if(playerChoice === '') {
    console.log('Make a choice!')
    return
  }

  if(playerChoice === computerChoice) {
    console.log('Draw!')
    console.log(computerChoice, " ", playerChoice)
  } else if (playerChoice === 'rock') {
    if(computerChoice === 'paper') {
      console.log('Computer Wins!')
      opponentScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'scissor') {
      console.log('You Win!')
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    }
  } else if (playerChoice === 'paper') {
    if(computerChoice === 'rock') {
      console.log('You Win!')
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'scissor') {
      console.log('Computer Wins!')
      opponentScore++
      console.log(computerChoice, " ", playerChoice)
    }
  } else if (playerChoice === 'scissor') {
    if(computerChoice === 'paper') {
      console.log('You Win!')
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'rock') {
      console.log('Computer Wins!')
      opponentScore++
      console.log(computerChoice, " ", playerChoice)
    }
  }
  playerChoice = ''
  computerChoice = ''
  choices.forEach(choice => choice.classList.remove('chosen'))
  updateScore()
}

function updateScore() {
  playerScoreSpan.textContent = playerScore
  opponentScoreSpan.textContent = opponentScore
}