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

// Get the goal rectangle
var goalRect;

// Get the key sprite and rectangle
var keyImg;
var keyArray;
var keyPickedUp;
var keysCollected;

// Store whether we are in the end game
var endgame;

// Store whether this level is a tutorial
var tutorial;

// Store whether the player is drowning
var drowning;

// Set the player speed
PLAYER_SPEED = 0.7;

// Key codes
SPACE = 32;
KEY_S = 83;

// Set first load to false
var firstLoad = true;

// Store whether the game is runnning
var running = false;

// Load objects in before the game loads
function preload() {
    
    document.getElementById('p5_loading').innerHTML = "Getting animations...";
    
    // Setup the animation reel
    setupAnimationReel();
    
    // Get the sprite image
    playerImg = currentAnimationFrame();

    // Get the key image
    keyImg = loadImage("assets/key.png");
    
    // Load sounds
    setupMusic();
    
}

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;

    // Initilise season object arrays
    summerObjects = [];
    autumnObjects = [];
    winterObjects = [];
    springObjects = [];

    // Initilise keyRect array
    keyArray = [];
    keyPickedUp = 0;
    keysCollected = false;
    drowning = false;
    
    // Create an empty array to hold the game objects
    gameObjects = [];

    // Initilise the season to summer
    currentSeason = 0;
    
    // If this is the first load
    if (firstLoad) {
        
        // Set running to true
        running = true;
        
        // Load the level
        loadLevel("levelOne.txt");
        firstLoad = false;

        // Initilise the goal rectangle
        goalRect = Goal(-50, -50, gridSquareSizeX, gridSquareSizeY*2, color(0));
  
        // Get the player rectangle and setup player state
        playerRect = Rectangle(-20, -50, gridSquareSizeX * 0.7, 2*gridSquareSizeY);
        
        // Set end game to false
        endgame = false;
        
        // Start the music
        startMusic();
    }

    //initilise starting world to summer objects
    gameObjects = summerObjects;
    
    // Reset the physics
    resetPhys();
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the background image
    renderBackground();
    
    // Get the sprite image
    playerImg = currentAnimationFrame();
    
    // Physics update
    physics();
    
    // Draw the grid
    //drawGrid();
    
    // Check whether we are running
    if (running) {
        
        // Check whether this is a tutorial
        if (tutorial) {
            // Draw the instructions
            renderInstructions();
        }

        // Draw the keys
        drawKeys();

        // Draw all of the game objects
        drawGameObjects();

        // Draw the player
        drawPlayer();

        // Draw the goal
        drawGoal();
        
        // Check whether we are in end game
        if (!endgame) {
    
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
                prevX = playerRect.x;
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
                prevX = playerRect.x;
                playerRect.x-=PLAYER_SPEED;
            }
            else {
                changeAnimationFrames("still");
            }

            // Check for space bar and not jumped
            if (keyIsDown(SPACE) && !jumped) {

                // Set the y speed to jump speed
                ySpeed = jumpSpeed;

                // Set jumped to true
                jumped = true;

            }
        }
    }
}

// Function to change season based on value of currentSeason
function changeSeason(currentSeason) {
    //switch case which changes the current gameObjects array to equal the seasonal objects array
    switch(currentSeason) {
        case(0):
            gameObjects = summerObjects;
            document.getElementById('main').style.backgroundColor = "#FBF4E1";
            break;
        case (1):
            gameObjects = autumnObjects;
            document.getElementById('main').style.backgroundColor = "#F59A44";
            break;
        case (2):
            gameObjects = winterObjects;
            document.getElementById('main').style.backgroundColor = "#D0E2F2";
            break;
        case (3):
            gameObjects = springObjects;
            document.getElementById('main').style.backgroundColor = "#98FB98";
            break;
    }

}

// Function to check key presses
function keyPressed() {
    
    // Check if we are in end game
    if (!endgame) {

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
}