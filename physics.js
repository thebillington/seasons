// Setup physics
var gravity = 0.07;
var xSpeed;
var ySpeed;
var fallSpeed = 2;
var jumpSpeed = -2;
var jumped;
var prevX;
var prevY;
var onIce;

// Function toi reset the physics
function resetPhys() {
    
    // Reset key variables
    xSpeed = 0;
    ySpeed = 0;
    jumped = false;
    prevX = 0;
    prevY = 0;
    onIce = false;
    
}

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
    
    // Check if the player is off screen
    offScreen();
    
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
                    
                    // Die
                    die();
                    
                    // Exit function
                    return;
                    
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
        if (((gameObjects[i].type == "ground" || gameObjects[i].type == "ice") || gameObjects[i].type == "rock") && !onIce) {
            
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
                    
        // Move the goal and player off screen
        playerRect.x = -20;
        goalRect.x = -50;
        
        // Prevent game running
        running = false;
                    
        // Reset
        setup();
        
        // Set on ice to false
        onice = false;
        
        // Reset the goal colour
        goalRect.colour = color(0);

        // Reload the level
        loadLevel(nextLevel);
        
        // Restart thew game running
        running = true;

    }
}

// Function to die
function die() {

    // Prevent game running
    running = false;

    // Move the goal and player off screen
    goalRect.x = -50;

    // Reset the colour of the portal
    goalRect.colour = color(0);

    // Reset
    setup();

    // Restart the game running
    running = true;
    
    // Set on ice to false
    onice = false;

    // Reload the level
    loadLevel(currentLevel);
    
}

// Check if the player has fallen off the screen
function offScreen() {
    
    // Check if the y is greater than canvas height
    if (playerRect.y > cHeight) {
        
        // Die
        die();
    }
    
}