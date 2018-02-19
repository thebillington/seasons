// Setup physics
var gravity = 0.07;
var xSpeed = 0;
var ySpeed = 0;
var fallSpeed = 2;
var jumpSpeed = -2;
var jumped = false;
var prevX = 0;
var prevY = 0;
var onIce = false;

// Physics update
function physics() {
    
    // Check gravity
    testGravity();
    
    // Check if the player has collided with any game objects
    playerCollision();

    // Check for collision with keys
    checkKeys();

    // Check for collision with the portal
    checkPortal();
    
    // Store the previous locations
    prevY = playerRect.y;
    
    // Move the player
    playerRect.x += xSpeed;
    playerRect.y += ySpeed;
    
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
    
    // Store whether this round of physics checks has collided with ice
    var currentIce = false;
    
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
                    
                    // Set on ice to false
                    onIce = false;
                    
                }
                
            }
            
            // Check for ice
            if (gameObjects[i].type == "ice") {
                
                // Check for collision
                if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
                    
                    // Set ice collide flag
                    onIce = true;
                    
                    // Set current ice to true
                    currentIce = true;
                    
                    // Reset jump
                    jumped = false;
                }
            }
            
            // Check if this is ground
            if (gameObjects[i].type == "ground") {
                // Jump collision
                while (jumpCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {

                    // Move the player up until they aren't colliding
                    playerRect.y += gravity;

                    // Set the y speed to 0
                    ySpeed = 0;

                }
            }
        
            // Fall collision
            while (fallCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {

                // Move the player up until they aren't colliding
                playerRect.y -= gravity;
                
                // Set the y speed to 0
                ySpeed = 0;
                
                // Reset jump
                jumped = false;
                
                // If we aren't on ice
                if (!currentIce) {
                    
                    // Set on ice to false
                    onIce = false;
                    
                }

            }
            
        }
        
        // Check for water
        if (gameObjects[i].type == "water") {
            
            // Check for a collision
            if (blockCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY})) {
            
                // Set the ySpeed
                ySpeed = 0.2;
                
                // Set the drowning flag
                drowning = true;
                
            }
            
        }
        
        // If the game object is ground or ice
        if (gameObjects[i].type == "ground" || gameObjects.type == "ice") {
            
            // Check for side collision
            checkSideCollision(playerRect, {x: gameObjects[i].x * gridSquareSizeX, y: gameObjects[i].y * gridSquareSizeY, width: gridSquareSizeX, height:gridSquareSizeY});
            
        }
        
    }
    // Check whether we were on any ice
    if (!onIce || drowning) {
        xSpeed = 0;
    }
    else {

        // Check the previous x location
        if (prevX < playerRect.x) {
            // Set the x speed to move right
            xSpeed = 1;
        }
        else if (prevX > playerRect.x) {
            // Left
            xSpeed = -1;
        }
    }
    
}

// Check for side collision
function checkSideCollision(rectOne, rectTwo) {
    
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

// Check for collision between two rectangles
function jumpCollision(rectOne, rectTwo) {
    
    // Check whether the previous y location is greater than the top of the platform
    if (prevY < rectTwo.y + gridSquareSizeY) {
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

// Create a function to check whether a key is collected
function checkKeys() {
    // Look at each key
    for (var i = 0; i < keyArray.length; i++) {
        // Check for collision
        if (blockCollision(playerRect, keyArray[i])) {
            // Pick up the key
            if(keyArray[i].visible) {
                keyArray[i].visible = false;
                keyPickedUp += 1;
            }

            // Check if all the keys are collected
            if(keyPickedUp == keyArray.length && keyArray.length != 0) {
                goalRect.colour = color(255);
                keysCollected = true;
            }
        }
    }
}

// Create a function to check whether the player has collided with the portal
function checkPortal() {

    // Check whether the player has collided with the portal and all keys are collected
    if(blockCollision(playerRect, goalRect) && keysCollected) {

        // Go to the next level
        loadLevel(nextLevel);

    }

}