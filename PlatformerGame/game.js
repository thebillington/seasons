// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 40;
var gridSquaresY = 30;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the grid
    drawGrid();
    
}

// Create a function to draw all of the grid squares
function drawGrid() {
    
    // Look at each horizontal grid square
    for (var i = 0; i < gridSquaresX; i++) {
        
        // Look at each vertical grid square
        for (var j = 0; j < gridSquaresY; j++) {
            
            // Draw a blank rect at the specified location
            drawRect(i * gridSquareSizeX, j * gridSquareSizeY, gridSquareSizeX, gridSquareSizeY, color(255));
            
        }
        
    }
    
}

// Create a function to draw a rectangle
function drawRect(x, y, width, height, colour) {
    
    // Draw the rect
    quad(x,y, x+ width,y, x + width,y+height, x,y+height)
    
}