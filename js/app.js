window.addEventListener("DOMContentLoaded", () => {

//set up DOM elements  
const canvas = document.querySelector('canvas')
const movementDisplay = document.getElementById('movement')
const score = document.getElementById('score')

// canvas setup / game state
const c = canvas.getContext('2d')

canvas.width = 1000;
canvas.height = 500;

let gameLoopInterval = setInterval(gameLoop, 100)

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
    //this.alive = true
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
    bone.render()
    bone.x -= 10
    if (bone.x < -5) {
      bones.splice(1, index)
    }
    //collision detect
    detectBoneCollection(bone)
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
        bonesCollected++
        // console.log(bonesCollected)
        //endGame() 
     }
}

function displayScore() {
  score.innerText = `Score: ${bonesCollected}`
}

function endGame() {
  clearInterval(gameLoopInterval)
  movementDisplay.innerText = "You collected all the bones!!" 
 }

//Game Functions
function gameLoop() {
  // Clear the canvas
  c.clearRect(0, 0, canvas.width, canvas.height)
  createRandomBones()
  // goodBone.render()
  brady.render()
  displayScore()
}

//list for keypress
function movementHandler(e) {
  e.preventDefault()
  const position = 10
  movementDisplay.innerText = `X: ${brady.x} Y: ${brady.y}`
  switch (e.keyCode) {
    //up
    case (38):
    //if checks to prevent going off canvas  
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



// event listerners
// canvas.addEventListener('click', e => {
//   console.log(e)
//   // drawBox(e.offsetX, e.offsetY, 50, 50, 'yellow')
//   //movementDisplay.innerText = `X: ${e.offsetX} Y: ${e.offsetY}`
// })

document.addEventListener('keydown', movementHandler)


})