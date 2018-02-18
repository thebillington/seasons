// Function to create a rectangle
function Rectangle(_x, _y, _width, _height) {
    
    // Return the rectangle object
    return {x: _x, y: _y, width: _width, height: _height};
    
}
    
// Function to create a game object
function GameObject(_x, _y, _colour, _type) {
    
    // Return a new game object with the set parameters
    return {x: _x, y: _y, colour: _colour, type: _type};
    
}

// Function to create a tree
function makeTree(x, y, height, type) {

    console.log(gameObjects);
    
    // Create the trunk and leaves
    for (var i = 0; i < height; i++) {
        
        // Add the trunk game objects
        gameObjects.push(GameObject(x, y - i, color(83, 53, 10), "trunk"+type));
        
        // Make the leaves
        for (var j = i; j < height; j++) {
            
            // Add a leaf
            gameObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), "leaf"+type));
            gameObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), "leaf"+type));
            
        }
        
    }
    
}

// Function to create water
function makeWater(x, y, length, height, type) {
        
        //for the length of the water
        for (var i = 0; i < length; i++) {
            //and for the height of the water
            for(var j = 0; j < height; j++) {
                //incrementally add gameObjects with appropriate colour and type
                gameObjects.push(GameObject(x + i , y - j, color(104, 120, 201), "water"+type))
            }

        }       

}

// Function to create a ground
function makeGround(x, y, length, height, type) {
    
    //for the length of the ground
    for (var i = 0; i < length; i++) {
        //and for the height of the ground
        for(var j = 0; j < height; j++) {
            //incrementally add gameObjects with appropriate colour and type
            gameObjects.push(GameObject(x + i , y - j, color(81, 67, 15), "ground"+type))
        }

    }       

}

function makeRock(x, y, height, type) {

        //for loops to iterate through height of the rock (Square object so height/length are interchangable)
        for (var i = 0; i < height; i++) {
            for(var j = 0; j < height; j++) {
                //incrementally add gameObjects with appropriate colour and type
                gameObjects.push(GameObject(x + i, y - j, color(90, 77, 65), "rock"+type))
        }
    }
}



