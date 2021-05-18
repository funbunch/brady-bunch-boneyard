window.addEventListener("DOMContentLoaded", () => {

//set up DOM elements  
const canvas = document.querySelector('canvas')
const gameStatusDisplay = document.getElementById('movement')
const score = document.getElementById('score')
const playAgain = document.getElementById('restartGame')
let timer = document.getElementById('timer')


// canvas setup / game state
const c = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 500;

//timing vars
let gameLoopInterval = setInterval(gameLoop, 75)
let startTime = 40

//set up var to be able to clear countdown
let countdown = setInterval(countDownFunc, 1000)
function countDownFunc() {
  startTime--
  if(startTime <= 0) {
     clearInterval(countdown)
  }
}

function drawBox(x, y, size, color) {
  c.fillStyle = color
  c.fillRect(x, y, size, size);
}

// Class characters
class Dog {
  constructor(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
  }
  render() {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.width, this.height)
    }
  }

class Bone {
  constructor(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.hit = false    
  }
  render() {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.width, this.height)
    }
  }

let brady = new Dog(200, 300, 'yellow', 60, 120)
let goodBone = new Bone(400, 200, 'white', 20, 40)
let bones = []
let badBones = []
let bonesCollected = 0

function createRandomBones() {
  const randomY =  Math.floor(Math.random() * 500)
  // console.log(randomY)
  // Math.random() * (max - min) + min;
  const randomX =  Math.floor(Math.random() * (1500 - 1000) + 1000);
  // console.log(randomX)
  // first time 4 bones each time after is 1 less
  if (bones.length < 4) {
    bones.push(new Bone(randomX, randomY - 40, 'white', 20, 40, false))
  } 

  bones.forEach((bone, index ) => {
     //remove bone when hit - array exists(appears) if not false/hit
    if (bone.hit === false) {
      bone.render()
      bone.x -= 10
      if (bone.x < -5) {
        bones.splice(1, index)
      }
      //collision detect
      detectBoneCollection(bone)
    }
  })
}

function createRandomBadBones() {
  const randomY =  Math.floor(Math.random() * 500)
  // console.log(randomY)
  // Math.random() * (max - min) + min;
  const randomX =  Math.floor(Math.random() * (1500 - 1000) + 1000);
  // console.log(randomX)
  // first time 4 bones each time after is 1 less
  if (badBones.length < 3) {
    badBones.push(new badBone(randomX, randomY - 40, 'brown', 20, 40, false))
  } 

  badBones.forEach((badBone, index ) => {

    badBone.render()
    badBone.x -= 10
    if (badBone.x < -5) {
      badBones.splice(1, index)
    }
    //collision detect
    detectBoneCollection(badBone)
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
        //increment bonecollected
        currentBone.hit = true
        //loop through array of bones at whatever index remove from array
        //TODO
        // for (let i = 0; i < bones.length; i++) {
        //   if (bones[i] === true) {
        //     bones.splice(i)
        //     //console.log(bones[i])
        //   } 
         
        //   //console.log(bones[i])  
        // }
        // currentBone.color = 'transparent' 
        bonesCollected++
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
  gameStatusDisplay.innerText = "You collected all the bones!!" 
  playAgain.style.display = "block"
 }
 function loseGame() {
  clearInterval(gameLoopInterval)
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
  // createRandomBadBones()
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
//TODO
//playAgain.addEventListener('click', gameLoop())

document.addEventListener('keydown', movementHandler)

})