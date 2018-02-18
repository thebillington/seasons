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
        gameObjects.push(GameObject(x, y - i, color(83, 53, 10), tC, "trunk"+type));
        
        // Make the leaves
        for (var j = i; j < height; j++) {
            
            // Add a leaf
            gameObjects.push(GameObject(x+j-height+1,y-height-i+1, color(50,230,90), true, "leaf"+type));
            gameObjects.push(GameObject(x-j+height-1,y-height-i+1, color(50,230,90), true, "leaf"+type));
            
        }
        
    }
    
}