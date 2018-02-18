// Store the next level file
var nextLevel;

//Create a function to load in from file
function loadLevel(levelName) {
    
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
	
	// Check the number of each game elements
    nextLevel = levelData[0];
    playerRect.x = parseInt(levelData[1]) * gridSquareSizeX;
    playerRect.y = parseInt(levelData[2]) * gridSquareSizeY;
    var goalX = parseInt(levelData[3]);
    var goalY = parseInt(levelData[4]);
    var noKeys = parseInt(levelData[5]);
	var noGround = parseInt(levelData[6]);
	var noWater = parseInt(levelData[7]);
	var noRocks = parseInt(levelData[8]);
	var noTrees = parseInt(levelData[9]);
    
    // Fetch the keys
    for (var i = 10; i < 10 + noKeys; i++) {
        console.log("KEY");
    }
    
    // Fetch the ground
    for (var i = 10 + noKeys; i < 10 + noKeys + noGround; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeGround(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        
    }
    
    // Fetch the water
    for (var i = 10 + noKeys + noGround; i < 10 + noKeys + noGround + noWater; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeWater(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        
    }
    
    // Fetch the water
    for (var i = 10 + noKeys + noGround + noWater; i < 10 + noKeys + noGround + noWater + noRocks; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeRock(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
        
    }
    
    // Fetch the water
    for (var i = 10 + noKeys + noGround + noWater + noRocks; i < 10 + noKeys + noGround + noWater + noRocks + noTrees; i++) {
        
        // Split the current line
        var data = levelData[i].split(" ");
        
        // Create the ground
        makeTree(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
        
    } 
}