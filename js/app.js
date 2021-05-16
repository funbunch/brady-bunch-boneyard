window.addEventListener("DOMContentLoaded", () => {

//set up DOM elements  
const canvas = document.querySelector('canvas');
const movementDisplay = document.getElementById('movement')

// canvas setup / game state
const c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

let gameLoopInterval = setInterval(gameLoop, 65)

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
      //this.alive = true
    }
    render() {
      c.fillStyle = this.color
      c.fillRect(this.x, this.y, this.width, this.height)
      }
    }

let brady = new Dog(200, 300, 'yellow', 60, 120)
let goodBone = new Bone(400, 200, 'white', 20, 40)
let bones = []

function createRandomBones() {
  const randomY =  Math.floor(Math.random() * 500)
  // console.log(randomY)

  const randomX =  Math.floor(Math.random() * 1000);
  // console.log(randomX)
  if (bones.length < 3) {
    bones.push(new Bone(randomX, randomY, 'white', 20, 40))
  } 

  bones.forEach((bone, index ) => {
    bone.render()
    bone.x -= 10
    if (bone.x < -5) {
      bones.splice(1, index)
      console.log(bones)
    }
    if (bone) {
      //collision detect
      detectBoneCollection(bone)
    }
    
  })
}

function detectBoneCollection(currentBone) {
  console.log(typeof currentBone)
  if (
       //left
       brady.x + brady.width >= currentBone.x &&
       // right 
       brady.x <= currentBone.x + currentBone.width &&
       //top
       brady.y + brady.height >= currentBone.y && 
       //bottom
       brady.y <= currentBone.y + currentBone.height 
     )  {
        console.log('hit')
        //endGame() 
     }
}

function endGame() {
  //ogre.alive = false
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
}

//list for keypress
function movementHandler(e) {
  const position = 10
  movementDisplay.innerText = `X: ${brady.x} Y: ${brady.y}`
  switch (e.keyCode) {
    case (38):
    brady.y -= position 
    break
    case (40):
    brady.y += position 
    break
    case (37):
    brady.x -= position 
    break
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