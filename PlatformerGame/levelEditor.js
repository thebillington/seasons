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
var gameElements;

// Create the setup function to run before the game is initialized
function setup() {
    
    // Create a canvas
    createCanvas(cWidth,cHeight);
    
    // Set the grid square size
    gridSquareSizeX = cWidth / gridSquaresX;
    gridSquareSizeY = cHeight / gridSquaresY;
    
    // Create an empty array to hold the game objects
    gameObjects = [];
    
    // Create game elements array
    gameElements = [];
    
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
                        gameElements.push(GameElement(x, y, parseInt(document.getElementById('gWidth').value), parseInt(document.getElementById('gHeight').value), creationSelection));
                        break;

                    case "WATER":

                        // Add water
                        gameElements.push(GameElement(x, y, parseInt(document.getElementById('wWidth').value), parseInt(document.getElementById('wHeight').value), creationSelection));
                        break;

                    case "ROCK":

                        // Add rock
                        gameElements.push(GameElement(x, y, parseInt(document.getElementById('rWidth').value), -1, creationSelection));
                        break;

                    case "TREE":

                        // Add tree
                        gameElements.push(GameElement(x, y, -1, parseInt(document.getElementById('tHeight').value), creationSelection));
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
	
	// Get the attribute numbers
	levelData += packages.length + "\n" + goals.length + "\n" + (walls.length - 88) + "\n" + spawners.length;
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Add the package data
		levelData += "\n" + packages[i].location.x + " " + packages[i].location.y + " " + packages[i].colour.levels[0] + " " + packages[i].colour.levels[1] + " " + packages[i].colour.levels[2] + " " + packages[i].id;
		
	}
		
	// Look at each goal
	for (var i = 0; i < goals.length; i++) {
		
		// Add the package data
		levelData += "\n" + goals[i].location.x + " " + goals[i].location.y + " " + goals[i].colour.levels[0] + " " + goals[i].colour.levels[1] + " " + goals[i].colour.levels[2] + " " + goals[i].id;
		
	}
		
	// Look at each wall
	for (var i = 88; i < walls.length; i++) {
		
		// Add the package data
		levelData += "\n" + walls[i].location.x + " " + walls[i].location.y;
		
	}
		
	// Look at each spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Add the package data
		console.log(spawners[i].colour);
		console.log(spawners[i].colour.levels);
		levelData += "\n" + spawners[i].location.x + " " + spawners[i].location.y + " " + spawners[i].items + " " + spawners[i].frequency + " " + spawners[i].direction.x + " " + spawners[i].direction.y + " " + spawners[i].colour.levels[0] + " " + spawners[i].colour.levels[1] + " " + spawners[i].colour.levels[2] + " " + spawners[i].id;
		
	}
	
	// Set the level data as the form data to send to the testLevel script
	document.getElementById('levelData').value = levelData;
	document.getElementById('testLevelData').value = levelData;
	
}