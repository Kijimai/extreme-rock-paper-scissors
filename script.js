const startContainer = document.querySelector('#start-container')
const chooseContainer = document.querySelector('#choose-container')
const gameContainer = document.querySelector('#game-container')
const jukebox = document.querySelector('#jukebox')
const charImgs = document.querySelectorAll('.character-img')
const diffBtns = document.querySelectorAll('.diff-btn')
const startBtn = document.querySelector('#start-btn')
const commenceBtn = document.querySelector('#commence-btn')
const playerPortrait = document.querySelector('#player-portrait')
const opponentPortrait = document.querySelector('#opponent-portrait')
const rockChoice = document.querySelector('#rock')
const paperChoice = document.querySelector('#paper')
const scissorChoice = document.querySelector('#scissor')
const choices = document.querySelectorAll('.choice')
const choiceBtn = document.querySelector('#choice-btn')
const playerChoiceContainer = document.querySelector('#player-choice')
const opponentChoiceContainer = document.querySelector('#opponent-choice')
const playerScoreSpan = document.querySelector('#player-score')
const opponentScoreSpan = document.querySelector('#opponent-score')
const conclusionText = document.querySelector('#conclusion-text')




const choiceArray = ['rock', 'paper', 'scissors']
let chosenImg = 'resources/images/Goobbue.png'
let opponentImage
let playerChoice
let playerScore = 0
let opponentScore = 0
let winCondition = ''
let isGameOver = false

startBtn.addEventListener('click', chooseCharacters)
commenceBtn.addEventListener('click', startGame)

charImgs.forEach(charImg => {
  charImg.addEventListener('click', highlightChar)
})

diffBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    storeDiff(btn.value)
    console.log(winCondition)
  })
})

function storeDiff(diff) {
  winCondition = parseInt(diff)
}

function chooseCharacters() {
  if(winCondition === '') {
    console.log('choose diff')
    return
  }
  setTimeout(() => {
    jukebox.play()
    jukebox.loop = true
  }, 1500)

  jukebox.classList.add('active')
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
  const fightAudio = new Audio('resources/audio/Fight.mp3')
  fightAudio.volume = 0.5
  setTimeout(() => {
    fightAudio.play()
  }, 3000)
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
    playerChoiceContainer.innerHTML = `<i class="far fa-hand-${playerChoice}"></i>`
  })
})

choiceBtn.addEventListener('click', compareChoicesAndScore)

function compareChoicesAndScore() {
  if(isGameOver === true) {
    return
  }
  if(playerChoice === '') {
    conclusionText.textContent = 'Make a choice, warrior!'
    return
  }

  let randomizer = Math.floor(Math.random() * 3)
  let computerChoice = choiceArray[randomizer]
  opponentChoiceContainer.innerHTML = `<i class="far fa-hand-${computerChoice}"></i>`

  if(playerChoice === computerChoice) {
    conclusionText.textContent = 'Draw!'
    conclusionText.style.color = 'black'
    console.log(computerChoice, " ", playerChoice)
  } else if (playerChoice === 'rock') {
    if(computerChoice === 'paper') {
      conclusionText.textContent = 'Opponent Wins!'
      conclusionText.style.color = 'red'
      opponentScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'scissors') {
      conclusionText.textContent = 'You Win!'
      conclusionText.style.color = 'green'
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    }
  } else if (playerChoice === 'paper') {
    if(computerChoice === 'rock') {
      conclusionText.textContent = 'You Win!'
      conclusionText.style.color = 'green'
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'scissors') {
      conclusionText.textContent = 'Opponent Wins!'
      conclusionText.style.color = 'red'
      opponentScore++
      console.log(computerChoice, " ", playerChoice)
    }
  } else if (playerChoice === 'scissors') {
    if(computerChoice === 'paper') {
      conclusionText.textContent = 'You Win!'
      conclusionText.style.color = 'green'
      playerScore++
      console.log(computerChoice, " ", playerChoice)
    } else if (computerChoice === 'rock') {
      conclusionText.textContent = 'Opponent Wins!'
      conclusionText.style.color = 'red'
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
  checkScore()
  playerScoreSpan.textContent = playerScore
  opponentScoreSpan.textContent = opponentScore
}

function checkScore() {

  if(playerScore === winCondition) {
    const winAudio = new Audio('resources/audio/YouWin.mp3')
    winAudio.volume = 0.5
    winAudio.play()
    conclusionText.style.color = 'green'
    conclusionText.textContent = 'YOU ARE THE CHAMPION!'
    jukebox.pause()
    isGameOver = true
  } else if (opponentScore === winCondition) {
    const loseAudio = new Audio('resources/audio/YouLose.mp3')
    loseAudio.volume = 0.5
    loseAudio.play()
    conclusionText.style.color = 'red'
    conclusionText.textContent = 'YOU HAVE BEEN DEFEATED!'
    jukebox.pause()
    isGameOver = true
  } else {
    return
  }
}