// Store the width and heaight of the canvas
var cWidth = 800;
var cHeight = 600;

// Store the number of squares to hold in our grid
var gridSquaresX = 60;
var gridSquaresY = 50;

// Store the width of each grid square
var gridSquareSizeX;
var gridSquareSizeY;

// Variable to hold all of our game objects
var gameObjects;

// Store the current object
var currentObject;

// Store which object we are creating
var creationSelection = "GROUND";

// Variable to hold game elements
var ground;
var water;
var rocks;
var trees;

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Create an empty array to hold the game objects
    gameObjects = [];
    
    // Create game elements arrays
    ground = [];
    water = [];
    rocks = [];
    trees = [];
    
    // Set the current object to -1
    currentObject = -1;
    
}

// Create the draw function to house our update code
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the grid
    drawGrid();
        
    // Draw all of the game objects
    drawGameObjects();
    
}

// Function to deal with mouse clicks
function mouseReleased() {
    
    // Check that the mouse click is in the grid
    if (!((mouseX >= 0 && mouseX <= cWidth) && (mouseY >= 0 && mouseY <= cHeight))) {

        // Return
        return;

    }

    // Get the x and y
    var x = Math.floor(mouseX / gridSquareSizeX);
    var y = Math.floor(mouseY / gridSquareSizeY);

    // Check the mouse button
    if (mouseButton === LEFT) {

        // If we haven't got an object selected
        if (currentObject == -1) {

            // Check whether we have clicked on an object
            if (!objectAtLocation(x, y)) {
                
                // Switch for the different types of elements
                switch(creationSelection) {

                    case "GROUND":
                
                        // Add some ground
                        ground.push(GameElement(x, y, parseInt(document.getElementById('gWidth').value), parseInt(document.getElementById('gHeight').value)));
                        break;

                    case "WATER":

                        // Add water
                        water.push(GameElement(x, y, parseInt(document.getElementById('wWidth').value), parseInt(document.getElementById('wHeight').value)));
                        break;

                    case "ROCK":

                        // Add rock
                        rocks.push(GameElement(x, y, parseInt(document.getElementById('rWidth').value), -1));
                        break;

                    case "TREE":

                        // Add tree
                        trees.push(GameElement(x, y, -1, parseInt(document.getElementById('tHeight').value)));
                        break;
                }
                
                // Rebuild the game objects
                makeGameObjects();
            }
        }
    }
}

function objectAtLocation(x, y) {
    return false;
}

// Create a function to select an object drawing tool
function select(obj) {
    
    // Select the object
    creationSelection = obj;    
    
}

// Function to get the level data
function getLevelData() {
	
	// Create an empty string to store the level data
	var levelData = "";
    
    console.log(ground.length);
	
	// Get the attribute numbers
	levelData += ground.length + "\n" + water.length + "\n" + rocks.length + "\n" + trees.length + "\n";

    
    // For each game element
    for (var i = 0; i < ground.length; i++) {

        // Make ground
        levelData += ground[i].x + " " + ground[i].y + " " + ground[i].width + " " + ground[i].height + "\n";
        
    }
    for (var i = 0; i < water.length; i++) {

        // Make water
        levelData += water[i].x + " " + water[i].y + " " + water[i].width + " " + water[i].height + "\n";
        
    }
    for (var i = 0; i < rocks.length; i++) {

        // Make rock
        levelData += rocks[i].x + " " + rocks[i].y + " " + rocks[i].width + "\n";
        
    }
    for (var i = 0; i < trees.length; i++) {

        // Make ground
        levelData += trees[i].x + " " + trees[i].y + " " + trees[i].height + "\n";
        
    }
    
    // Store the text
    document.getElementById("levelData").value = levelData.trim();
    
    console.log(levelData.trim());
    
    // Select the level data
    document.getElementById("levelData").select();
    
    // Copy the level data
    document.execCommand("Copy");
	
}