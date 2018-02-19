// Function to create a rectangle
function Rectangle(_x, _y, _width, _height) {
    
    // Return the rectangle object
    return {x: _x, y: _y, width: _width, height: _height};
    
}

// Function to create a key
function Key(_x, _y, _width, _height, _visible) {
    return {x: _x, y: _y, width: _width, height: _height, visible: _visible}
}

function Goal(_x, _y, _width, _height, _colour) {
    return {x: _x, y: _y, width: _width, height: _height, colour: _colour}
}
    
// Function to create a game object
function GameObject(_x, _y, _colour, _collidable, _type) {
    
    // Return a new game object with the set parameters
    return {x: _x, y: _y, colour: _colour, collidable: _collidable, type: _type};
    
}

// Function to create a tree
function makeTree(x, y, height) {
    
    // Create the trunk and leaves
    for (var i = 0; i < height; i++) {
        
        // Store whether the trunk or leaf is collidable
        var tC = false;
        
        // Make only the top of the trunk collidable
        if (i == height - 1) {
            tC = true;
        }
        
        // Add the trunk game objects
        summerObjects.push(GameObject(x, y - i, color(160, 82, 45), tC, "trunk"));
        autumnObjects.push(GameObject(x, y - i, color(160, 82, 45), tC, "trunk"));
        winterObjects.push(GameObject(x, y - i, color(160, 82, 45), tC, "trunk "));
        springObjects.push(GameObject(x, y - i, color(160, 82, 45), tC, "trunk"));
        
        // Make the leaves
        for (var j = i; j < height; j++) {
            
            // Add a leaf
            summerObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf"));
            summerObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf"));

            // Check whether this is the top of the tree
            if (!(j == height - 1)) {
                // add fallen leaves
                autumnObjects.push(GameObject(x+j-height+1,y-i, color(218, 120, 27), true, "fallenleaf"));
                autumnObjects.push(GameObject(x-j+height-1,y-i, color(218, 120, 27), true, "fallenleaf"));

            }

            // Create smaller leaf section for spring objects
            for(var k = 0; k < height - 2; k++) {
                springObjects.push(GameObject(x-1, y-height-k+1, color(50,230,90), true, "leaf"));
                springObjects.push(GameObject(x, y-height-k, color(50,230,90), true, "leaf"));
                springObjects.push(GameObject(x+1, y-height-k+1, color(50,230,90), true, "leaf"));
            }

            
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
                autumnObjects.push(GameObject(x + i , y - j, color(104, 120, 201), false, "water"));
                winterObjects.push(GameObject(x + i , y - j, color(165, 242, 243), true, "ice"));
                springObjects.push(GameObject(x + i , y - j, color(104, 120, 201), false, "water"));
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
            summerObjects.push(GameObject(x + i , y - j, color(133,178,76), c, "ground"));
            autumnObjects.push(GameObject(x + i , y - j, color(81, 67, 15), c, "ground"));
            winterObjects.push(GameObject(x + i , y - j, color(150, 168, 152), c, "ground"));
            springObjects.push(GameObject(x + i , y - j, color(96,128,56), c, "ground"));
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
                summerObjects.push(GameObject(x + i, y - j, color(169, 169, 169), c, "rock"));
                autumnObjects.push(GameObject(x + i, y - j, color(169, 169, 169), c, "rock"));
                winterObjects.push(GameObject(x + i, y - j, color(169, 169, 169), c, "rock"));
                springObjects.push(GameObject(x + i, y - j, color(169, 169, 169), c, "rock"));
        }
    }
}




