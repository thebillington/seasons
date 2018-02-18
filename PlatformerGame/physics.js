// Setup gravity
var gravity = 0.07;
var ySpeed = 0;
var fallSpeed = 2;
var jumpSpeed = -2;
var jumped = false;
var prevX = 0;
var prevY = 0;

// Physics update
function physics() {
    
    // Check gravity
    testGravity();
    
    // Store the previous locations
    prevX = playerRect.x;
    prevY = playerRect.y;
    
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
        
        // Check whether the game object is collidable
        if (gameObjects[i].collidable) {
            
            // Check whether the player is drowning
            if (drowning) {
                
                // Check if the player has hit the floor of the pond
                if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
                 
                    // Reset the location
                    playerRect.x = 300;
                    playerRect.y = 50;
                    
                    // Set drowning to false
                    drowning = false;
                    
                }
                
            }
        
            // If the player collided with the object
            while (fallCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {

                // Move the player up until they aren't colliding
                playerRect.y -= gravity;

                // Set jumped to false
                jumped = false;
                
                // Set the y speed to 0
                ySpeed = 0;

            }
            
        }
        
        // Check for water
        if (gameObjects[i].type == "water") {
            
            // Check for a collision
            if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
            
                // Set the ySpeed
                ySpeed = gravity;
                
                // Set the drowning flag
                drowning = true;
                
            }
            
        }
        
        // If the game object is ground
        if (gameObjects[i].type == "ground") {
            
            // Check for side collision
            checkSideCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY});
            
        }
        
    }
    
}

// Check for side collision
function checkSideCollision(rectOne, rectTwo) {
    
    //console.log(prevX);
    
    // Check whether the previous y location is greater than the top of the platform
    if (prevX - rectOne.width > rectTwo.x) {
        while (blockCollision(rectOne, rectTwo)) {
            rectOne.x += 0.7;
        }
    }
    // Check whether the previous y location is greater than the top of the platform
    if (prevX + rectOne.width < rectTwo.x + gridSquareSizeX) {
        while (blockCollision(rectOne, rectTwo)) {
            rectOne.x -= 0.7;
        }
    }
    
}

// Check for collision between two rectangles
function fallCollision(rectOne, rectTwo) {
    
    // Check whether the previous y location is greater than the top of the platform
    if (prevY + rectOne.height > rectTwo.y) {
        return false;
    }
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.width / 2) - (rectTwo.x + rectTwo.width / 2)) < rectOne.width / 2 + rectTwo.width / 2 && Math.abs((rectOne.y + rectOne.height / 2) - (rectTwo.y + rectTwo.height / 2)) < rectOne.height / 2 + rectTwo.height / 2;
    
}

// Function to check for a standard block collision
function blockCollision(rectOne, rectTwo) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.width / 2) - (rectTwo.x + rectTwo.width / 2)) < rectOne.width / 2 + rectTwo.width / 2 && Math.abs((rectOne.y + rectOne.height / 2) - (rectTwo.y + rectTwo.height / 2)) < rectOne.height / 2 + rectTwo.height / 2;
    
}