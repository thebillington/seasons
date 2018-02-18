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

// Function to create a tree
function makeTree(x, y, height, type) {
    
    // Create the trunk and leaves
    for (var i = 0; i < height; i++) {
        
        // Store whether the trunk or leaf is collidable
        var tC = false;
        
        // Make only the top of the trunk collidable
        if (i == height - 1) {
            tC = true;
        }
        
        // Add the trunk game objects
        summerObjects.push(GameObject(x, y - i, color(83, 53, 10), tC, "trunk "+type));
        // autumnObjects.push(GameObject(x, y - i, color(83, 53, 10), tC, "trunk "+type));
        // winterObjects.push(GameObject(x, y - i, color(83, 53, 10), tC, "trunk "+type));
        // if(height = i-1){
        //     winterObjects.push(GameObject(x, y - i, color(255,255,255), true, "trunk "))
        // }
        // springObjects.push(GameObject(x, y - i, color(83, 53, 10), tC, "trunk "+type));
        
        // Make the leaves
        for (var j = i; j < height; j++) {
            
            // Add a leaf
            summerObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf "+type));
            summerObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf "+type));

            // autumnObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf "+type));
            // autumnObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf "+type));

            // winterObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf "+type));
            // winterObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf "+type));

            // springObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf "+type));

            
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
                summerObjects.push(GameObject(x + i , y - j, color('rgba(104, 120, 201, 0)'), "drywater"))
                autumnObjects.push(GameObject(x + i , y - j, color(104, 120, 201), "water"))
                winterObjects.push(GameObject(x + i , y - j, color(165, 242, 243), "ice"))
                springObjects.push(GameObject(x + i , y - j, color(104, 120, 201), "water"))
            }
        }

        
}

// Function to create a ground
function makeGround(x, y, length, height) {
    
    //for the length of the ground
    for (var i = 0; i < length; i++) {
        //and for the height of the ground
        for(var j = 0; j < height; j++) {
            //incrementally add gameObjects with appropriate colour and type
            summerObjects.push(GameObject(x + i , y - j, color(81, 67, 15), "ground"))
            // autumnObjects.push(GameObject(x + i , y - j, color(81, 67, 15), "ground"))
            // winterObjects.push(GameObject(x + i , y - j, color(255, 0, 0), "ground"))
            // springObjects.push(GameObject(x + i , y - j, color(81, 67, 15), "ground"))
        }

    }       

}

function makeRock(x, y, height) {

        //for loops to iterate through height of the rock (Square object so height/length are interchangable)
        for (var i = 0; i < height; i++) {
            for(var j = 0; j < height; j++) {
                //incrementally add gameObjects with appropriate colour and type
                summerObjects.push(GameObject(x + i, y - j, color(90, 77, 65), "rock"))
                // autumnObjects.push(GameObject(x + i, y - j, color(90, 77, 65), "rock"))
                // winterObjects.push(GameObject(x + i, y - j, color(90, 77, 65), "rock"))
                // if(height = j-1){
                //     winterObjects.push(GameObject(x + i, y - j, color(255, 0, 0), "rock"))
                // }
                // springObjects.push(GameObject(x + i, y - j, color(90, 77, 65), "rock"))
        }
    }
}



