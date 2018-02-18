// Function to return a game element
function GameElement(_x, _y, _width, _height, _type) {
    
    // Return a game element
    return {x: _x, y: _y, width: _width, height: _height, type: _type};
    
}

// Function to create a rectangle
function Rectangle(_x, _y, _width, _height) {
    
    // Return the rectangle object
    return {x: _x, y: _y, width: _width, height: _height};
    
}
    
// Function to create a game object
function GameObject(_x, _y, _colour, _collidable, _type) {
    
    // Return a new game object with the set parameters
    return {x: _x, y: _y, colour: _colour, collidable: _collidable, type: _type};
    
}

// Function to make the game objects
function makeGameObjects() {
    
    // Clear the game objects
    gameObjects = [];
    
    // For each element
    for (var i = 0; i < gameElements.length; i++) {
        
        // Create a switch case to make the right element
        switch(gameElements[i].type) {

            case "GROUND":

                // Make ground
                makeGround(gameElements[i].x, gameElements[i].y, gameElements[i].width, gameElements[i].height);
                break;

            case "WATER":

                // Make water
                makeWater(gameElements[i].x, gameElements[i].y, gameElements[i].width, gameElements[i].height);
                break;

            case "ROCK":

                // Make rock
                makeRock(gameElements[i].x, gameElements[i].y, gameElements[i].width);
                break;

            case "TREE":
                console.log("TREE");
                // Make tree
                makeTree(gameElements[i].x, gameElements[i].y, gameElements[i].height);
                break;
        }
        
    }
    
}

// Function to create a tree
function makeTree(x, y, height) {
    
    console.log("TREE");
    
    // Create the trunk and leaves
    for (var i = 0; i < height; i++) {
        
        // Store whether the trunk or leaf is collidable
        var tC = false;
        
        // Make only the top of the trunk collidable
        if (i == height - 1) {
            tC = true;
        }
        
        // Add the trunk game objects
        gameObjects.push(GameObject(x, y - i, color(160, 82, 45), tC, "trunk"));
        
        // Make the leaves
        for (var j = i; j < height; j++) {
            
            // Add a leaf
            gameObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf"));
            gameObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf"));
            
        }
        
    }
    
}

// Function to create water
function makeWater(x, y, length, height) {
        //for the length of the water
        for (var i = 0; i < length; i++) {
            //and for the height of the water
            for(var j = 0; j < height; j++) {
                //incrementally add gameObjects with appropriate colour and type
                gameObjects.push(GameObject(x + i , y - j, color(104, 120, 201), false, "water"));
            }
        }
        
}

// Function to create a ground
function makeGround(x, y, length, height) {
    
    //for the length of the ground
    for (var i = 0; i < length; i++) {
        //and for the height of the ground
        for(var j = 0; j < height; j++) {
            // Check whether this ground should be collidable
            var c = false;
            if (j == height - 1) {
                c = true;
            }
            //incrementally add gameObjects with appropriate colour and type
            gameObjects.push(GameObject(x + i , y - j, color(133,178,76), c, "ground"));
        }

    }       

}

// Function to create a rock
function makeRock(x, y, height) {

        //for loops to iterate through height of the rock (Square object so height/length are interchangable)
        for (var i = 0; i < height; i++) {
            for(var j = 0; j < height; j++) {
                // Check whether this rock should be collidable
                var c = false;
                if (j == height - 1) {
                    c = true;
                }
                //incrementally add gameObjects with appropriate colour and type
                gameObjects.push(GameObject(x + i, y - j, color(169, 169, 169), c, "rock"));
        }
    }
}



