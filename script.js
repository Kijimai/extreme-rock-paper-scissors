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

const choiceArray = ['rock', 'paper', 'scissors']
let chosenImg
let opponentImage
let playerChoice


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
    playerChoice = choice.id
    console.log(playerChoice)
  })
})
