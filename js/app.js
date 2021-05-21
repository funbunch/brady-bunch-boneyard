window.addEventListener("DOMContentLoaded", () => {

//set up DOM elements  
const canvas = document.querySelector('canvas')
const gameStatusDisplay = document.getElementById('game-status')
const gameIntro = document.getElementById('game-intro')
const score = document.getElementById('score')
const stats = document.getElementById('game-stats')
const startGame = document.getElementById('start-game')
const playAgain = document.getElementById('restartGame')
let timer = document.getElementById('timer')
const boneImgs = ['imgs/bone-1@2x.png','imgs/bone-2@2x.png','imgs/bone-3@2x.png']
const badImgs = ['imgs/chicken-bone.png', 'imgs/leaf@2x.png', 'imgs/fries.png']

// canvas setup / game state
const c = canvas.getContext('2d')

canvas.width = 714;
canvas.height = 500;

//timing vars
let gameLoopInterval = setInterval(gameLoop, 75)
let startTime


//start screen 
startGame.addEventListener('click', () => {
  //turn game deets on
  stats.style.display = 'flex'
  canvas.style.display = 'flex'
  //turn intro off
  gameIntro.style.display = 'none'
  startTime = 30
})

//set up var to be able to clear countdown
let countdown = setInterval(countDownFunc, 1000)
function countDownFunc() {
  startTime--
  if(startTime <= 0) {
     clearInterval(countdown)
  }
}

// Class characters
class Dog {
  constructor(x, y, width, height,imgSrc) {
    this.x = x
    this.y = y
    this.img = new Image()
    this.imgSrc = imgSrc
    this.width = width
    this.height = height
  }
  render() {
    this.img.src = this.imgSrc
    c.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

class Bone {
  constructor(x, y, width, height, imgSrc, good) {
    this.x = x
    this.y = y
    this.img = new Image()
    this.imgSrc = imgSrc
    this.width = width
    this.height = height
    this.hit = false
    this.good = good    
  }
  render() {
    this.img.src = this.imgSrc
    c.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

//set up function to randomize imgs
function getRandomImg(arr) {
  let changingImg = Math.floor(Math.random() * arr.length)
  return imgSrc = arr[changingImg]
  }  

let brady = new Dog(200, 350, 146, 113, 'imgs/dog-1@2x.png')
let bones = []
let badBones = []
let bonesCollected = 0

function createRandomBones() {
  let randomY =  Math.floor(Math.random() * (500-300) + 300)
  // console.log(randomY)
  // Math.random() * (max - min) + min;
  let randomX =  Math.floor(Math.random() * (1500 - 714) + 714)
  // console.log(randomX)
  // first time 4 bones each time after is 1 less
  if (bones.length <= 4) {
    bones.push(new Bone(randomX, randomY, 50, 48, getRandomImg(boneImgs), true))
  } 

  bones.forEach((bone, index ) => {
     //remove bone when hit - array exists(appears) if not false/hit
    if (bone.hit === false) {
      bone.render()
      bone.x -= 10
      if (bone.x < -5) {
        bones.splice(index, 1)
      }
      //collision detect
      detectBoneCollection(bone)
    }
  })
}

function createRandomBadBones() {
  let randomY =  Math.floor(Math.random() * (500-250) + 250)
  // console.log(randomY)
  // Math.random() * (max - min) + min;
  let randomX =  Math.floor(Math.random() * (1500 - 714) + 714);
  // console.log(randomX)
  // first time 3 bones each time after is 1 less
  if (badBones.length < 2) {
    badBones.push(new Bone(randomX, randomY - 40, 50, 47, getRandomImg(badImgs), false))
  } 

  badBones.forEach((badBone, index ) => {
    if (badBone.hit === false) {
      badBone.render()
      badBone.x -= 10
      if (badBone.x < -5) {
        badBones.splice(index, 1)
      }
      //collision detect
      detectBoneCollection(badBone)
    }
  })
}

function detectBoneCollection(currentBone) {
  if (
       //left
       brady.x + brady.width > currentBone.x &&
       // right 
       brady.x <= currentBone.x + currentBone.width &&
       //top
       brady.y + brady.height > currentBone.y && 
       //bottom
       brady.y <= currentBone.y + currentBone.height &&
       currentBone.hit === false
     )  {
        bones.splice(currentBone, 1)
        //increment bonecollected
        currentBone.hit = true
        //loop through array of bones at whatever index remove from array
        // for (let i = 0; i < bones.length; i++) {
        //   if (bones[i] === true) {
        //     bones.splice(i)
        //     //console.log(bones[i])
        //   } 
         
        //   //console.log(bones[i])  
        // }
       if (currentBone.good === true ) {
         bonesCollected++
       } else if (bonesCollected > 0) {
        bonesCollected--
       }
      }  
}

function displayScore() {
  score.innerText = `Score: ${bonesCollected}`
}
function displayTimer() {
  timer.innerText = `Timer: ${startTime}`
}

function winGame() {
  clearInterval(gameLoopInterval)
  gameStatusDisplay.style.display = 'flex'
  gameStatusDisplay.innerText = "You collected all the bones!!" 
  playAgain.style.display = "block"
 }
 function loseGame() {
  clearInterval(gameLoopInterval)
  gameStatusDisplay.style.display = 'flex'
  gameStatusDisplay.innerText = "Try again next time." 
  playAgain.style.display = "block"
 }

//Game Functions
function gameLoop() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height)
  if (bonesCollected === 10 && startTime >= 0) {
    winGame() 
  } else if (bonesCollected < 10 && startTime <= 0 ) {
   loseGame()
  }
  createRandomBones()
  createRandomBadBones()
  brady.render()
  displayScore()
  displayTimer()
}

//list for keypress
function movementHandler(e) {
  e.preventDefault()
  const position = 10
  // movementDisplay.innerText = `X: ${brady.x} Y: ${brady.y}`
  switch (e.keyCode) {
    //up
    case (38):
    //if checks to prevent dog going off canvas  
    if (brady.y - position > 0) {
      brady.y -= position 
    }
    break
    //down
    case (40):
    if (brady.y + brady.height + position < canvas.height) {
      brady.y += position 
    }
    break
    //left
    case (37):
    if (brady.x - position > 0) {
      brady.x -= position
    } 
    break
    //right
    case (39):
    brady.x += position 
    break
  }
}

document.addEventListener('keydown', movementHandler)

})