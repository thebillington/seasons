// Store the next level file
var nextLevel;

// Store the current level
var currentLevel;

//Create a function to load in from file
function loadLevel(levelName) {
    
    // Store the current level
    currentLevel = levelName;
    
    //First create a http request and fetch the file
    var client = new XMLHttpRequest();
    client.open('GET', "levels/"+levelName, true);
    client.send();
    
    //When the file is received parse the text
    client.onreadystatechange = function() {
        
        //If the client is ready
        if (client.readyState == 4) {
            
            //If fetching was successful
            if(client.status == 200) {
                
                //Open the level
                var levelText = client.responseText;
                openLevel(levelText);
				
            } else {
                //Log failure
                alert("Failed to load level from server.")
            }
        }
    }
}

// Function to load level data from a text file
function openLevel(levelText) {
	
	// Load the level data
    var levelData = levelText.split("\n");
    
    // Set the number of set variables
    var setVars = 11;
	
	// Check the number of each game elements
    nextLevel = levelData[0];
    currentSeason = parseInt(levelData[1]);
    playerRect.x = parseInt(levelData[2]) * gridSquareSizeX;
    playerRect.y = parseInt(levelData[3]) * gridSquareSizeY;
    goalRect.x = (parseInt(levelData[4]) - 2) * gridSquareSizeX;
    goalRect.y = (parseInt(levelData[5]) - 2) * gridSquareSizeY;
    var noKeys = parseInt(levelData[6]);
	var noGround = parseInt(levelData[7]);
	var noWater = parseInt(levelData[8]);
	var noRocks = parseInt(levelData[9]);
	var noTrees = parseInt(levelData[10]);
    
    // Fetch the keys
    for (var i = setVars; i < setVars + noKeys; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");

        // Add the key
        keyArray.push(Key(parseInt(data[0]) * gridSquareSizeX, (parseInt(data[1]) - 2) * gridSquareSizeY, gridSquareSizeX* 2, gridSquareSizeY * 2, true));

    }
    
    // Fetch the ground
    for (var i = setVars + noKeys; i < setVars + noKeys + noGround; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeGround(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround; i < setVars + noKeys + noGround + noWater; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeWater(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround + noWater; i < setVars + noKeys + noGround + noWater + noRocks; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeRock(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
        
    }
    
    // Fetch the water
    for (var i = setVars + noKeys + noGround + noWater + noRocks; i < setVars + noKeys + noGround + noWater + noRocks + noTrees; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeTree(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
        
    } 
    
    // Check whether we should draw instructions for this level
    tutorial = false;
    if (currentLevel.indexOf("tutorial") != -1) {
        tutorial = true;
    }

    // Set the game objects
    switch(currentSeason) {
        case 0:
            gameObjects = summerObjects;
            break;
        case 1:
            gameObjects = autumnObjects;
            break;
        case 2:
            gameObjects = winterObjects;
            break;
        case 3:
            gameObjects = springObjects;
            break;
    }
}