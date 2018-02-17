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

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Create an empty array to hold the game objects
    gameObjects = [];
    
    // Add a game object
    gameObjects.push(GameObject(5, 5, color(50, 255, 255), "ice"));
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the grid
    drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
}

// Create a function to draw all of the grid squares
function drawGrid() {
    
    // Look at each horizontal grid square
    for (var i = 0; i < gridSquaresX; i++) {
        
        // Look at each vertical grid square
        for (var j = 0; j < gridSquaresY; j++) {
            
            // Draw a blank rect at the specified location
            drawGridSquare(i, j, gridSquareSizeX, gridSquareSizeY, color(255));
            
        }
        
    }
    
}

// Create a function to draw all of the game objects
function drawGameObjects() {
    
    // Look at each game object
    for (var i = 0; i < gameObjects.length; i++) {
        
        // Draw the game object
        drawGridSquare(gameObjects[i].x, gameObjects[i].y, gridSquareSizeX, gridSquareSizeY, gameObjects[i].colour);
        
    }
    
}

// Function to draw a grid square
function drawGridSquare(x, y, width, height, colour) {
    
    // Draw a gridSquare at the specified location
    drawRect(x * gridSquareSizeX, y * gridSquareSizeY, gridSquareSizeX, gridSquareSizeY, colour);
    
}

// Create a function to draw a rectangle
function drawRect(x, y, width, height, colour) {
    
    // Set the fill colour
    fill(colour);
    
    // Draw the rect
    quad(x,y, x+ width,y, x + width,y+height, x,y+height)
    
}

// Function to create a game object
function GameObject(_x, _y, _colour, _name) {
    
    // Return a new game object with the set parameters
    return {x: _x, y: _y, colour: _colour, name: _name};
    
}