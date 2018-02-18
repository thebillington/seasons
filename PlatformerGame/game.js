// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 60;
var gridSquaresY = 50;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Variable to hold all of our game objects
var gameObjects;

// Variable used to switch seasons (0 = summer, 1 = autumn, 2 = winter, 3 =  spring)
var currentSeason;

// Variables to store specific state of game objects for each season
var summerObjects;
var autumnObjects;
var winterObjects;
var springObjects;

// Get the player sprite and rectangle
var playerImg;
var playerRect;

// Store whether the player is drowning
var drowning;

// Set the player speed
PLAYER_SPEED = 0.7;

// Key codes
SPACE = 32;
KEY_S = 83;

// Load objects in before the game loads
function preload() {
    
    // Setup the animation reel
    setupAnimationReel();
    
    // Get the sprite image
    playerImg = currentAnimationFrame();
    
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

    // Initilise season object arrays
    summerObjects = [];
    autumnObjects = [];
    winterObjects = [];
    springObjects = [];
  
    // Get the player rectangle and setup player state
    playerRect = Rectangle(300, 50, gridSquareSizeX * 0.7, 2*gridSquareSizeY);
    drowning = false;
    
    // Create an empty array to hold the game objects
    gameObjects = [];

    // Initilise the season to summer
    currentSeason = 0;
  
    // Make the ground
    makeGround(10, 20, 10, 1);
    makeGround(10, 21, 10, 1);
    makeGround(10, 22, 23, 1);
    makeGround(30, 21, 6, 1);
    makeGround(30, 20, 6, 1);
    makeGround(30, 22, 6, 1);
    makeGround(19, 11, 20, 1);
  
    // tree creation
    makeTree(16,19,4);
    // water creation
    makeWater(20, 21, 10, 2);
    // terrain creation
    makeRock(10, 19, 2);

    //initilise starting world to summer objects
    gameObjects = summerObjects;
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Get the sprite image
    playerImg = currentAnimationFrame();
    
    // Physics update
    physics();
    
    // Draw the grid
    //drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
    // Draw the player
    drawPlayer();
    
    // Check key presses
    if (drowning) {
        changeAnimationFrames("drown");
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        // Check whether we are jumping
        if (jumped) {
            changeAnimationFrames("rJump");
        }
        else {
            changeAnimationFrames("rWalk");
        }
        playerRect.x+=PLAYER_SPEED;
    }
    else if (keyIsDown(LEFT_ARROW)) {
        // Check whether we are jumping
        if (jumped) {
            changeAnimationFrames("lJump");
        }
        else {
            changeAnimationFrames("lWalk");
        }
        playerRect.x-=PLAYER_SPEED;
    }
    else {
        changeAnimationFrames("still");
    }
    
}

// Function to change season based on value of currentSeason
function changeSeason(currentSeason) {
    //switch case which changes the current gameObjects array to equal the seasonal objects array
    switch(currentSeason) {
        case(0):
            gameObjects = summerObjects;
            break;
        case (1):
            gameObjects = autumnObjects;
            break;
        case (2):
            gameObjects = winterObjects;
            break;
        case (3):
            gameObjects = springObjects;
            break;
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

    // Check for key press s
    if (keyCode == KEY_S && !drowning) {
        //increase the value of the current season variable to change season
        currentSeason++;
        //if the current season is equal to winter
        if(currentSeason > 3) {
            //set the new current season value to summer
            currentSeason = 0;
        }
        //run the changeSeason function
        changeSeason(currentSeason);
    }
}