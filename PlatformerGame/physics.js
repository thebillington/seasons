// Setup gravity
var gravity = 0.1;
var ySpeed = 0;
var fallSpeed = 3;
var jumpSpeed = -3;
var jumped = false;

// Physics update
function physics() {
    
    // Check gravity
    testGravity();
    
    // Move the player by fall speed
    playerRect.y += ySpeed;
    
    // Check if the player has collided with any game objects
    playerCollision();
    
}

// Function to apply gravity
function testGravity() {
    
    // Check whether the players fall speed is greater than or equal to max
    if (ySpeed < fallSpeed) {
        
        // Increase the fall speed
        ySpeed += gravity;
        
    }
    
}

// Collision detection for the player
function playerCollision() {
    
    // Look at each game object
    for (var i = 0; i < gameObjects.length; i++) {
        
        // If the player collided with the object
        while (rectCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
        
            // Move the player up until they aren't colliding
            playerRect.y -= gravity;
            
            // Set jumped to false
            jumped = false;
            
        }
        
    }
    
}

// Check for collision between two rectangles
function rectCollision(rectOne, rectTwo) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.width / 2) - (rectTwo.x + rectTwo.width / 2)) < rectOne.width / 2 + rectTwo.width / 2 && Math.abs((rectOne.y + rectOne.height / 2) - (rectTwo.y + rectTwo.height / 2)) < rectOne.height / 2 + rectTwo.height / 2;
    
}