// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 40;
var gridSquaresY = 30;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Variable to hold all of our game objects
var gameObjects;

// Get the player sprite and rectangle
var playerImg;
var playerRect;

// Set the player speed
PLAYER_SPEED = 3;

// Key codes
SPACE = 32;

// Load objects in before the game loads
function preload() {
    
    // Get the sprite image
    playerImg = loadImage("assets/player.png");
    
}

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Get the player rectangle
    playerRect = Rectangle(300, 50, gridSquareSizeX, 2*gridSquareSizeY);
    
    // Create an empty array to hold the game objects
    gameObjects = [];
  
    // ground creation:
    makeGround(10, 20, 20, 1, "floor");
    makeGround(20, 11, 20, 1, "floor");
    // tree creation
    makeTree(16,19,4,"evergreen");
    // water creation
    makeWater(20, 19, 10, 2, "lake");
    // terrarin creation
    makeRock(10, 19, 2, "boulder");
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Physics update
    physics();
    
    // Draw the grid
    drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
    // Draw the player
    drawPlayer();
    
    // Check key presses
    if (keyIsDown(RIGHT_ARROW)) {
        playerRect.x+=PLAYER_SPEED;
    }
    if (keyIsDown(LEFT_ARROW)) {
        playerRect.x-=PLAYER_SPEED;
    }
    
}

// Function to check key presses
function keyPressed() {
    
    // Check for space bar and not jumped
    if (keyCode == SPACE && !jumped) {
        
        // Set the y speed to jump speed
        ySpeed = jumpSpeed;
        
        // Set jumped to true
        jumped = true;
        
    }
    
}