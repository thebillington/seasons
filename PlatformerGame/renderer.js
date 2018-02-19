// Function to draw the player
function drawPlayer() {
    
    // Draw the player on screen
    image(playerImg, playerRect.x, playerRect.y, playerRect.width, playerRect.height);
    
}

// Function to draw the goal 
function drawGoal(){
    //Draw the goal on screen
    drawRect(goalRect.x, goalRect.y, goalRect.width, goalRect.height, goalRect.colour);
}

// Function to draw the keys for the goal
function drawKeys(){
    // Draw the keys on screen
    for(var i = 0; i < keyArray.length; i++) {
        if(keyArray[i].visible) {
            image(keyImg, keyArray[i].x, keyArray[i].y, keyArray[i].width, keyArray[i].height);
        }
    }
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