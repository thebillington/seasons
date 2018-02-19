// Create an array to store the songs
var songs;

// Store the current song
var currentSong = 0;

// Function to setup the music
function setupMusic() {
    
    // Create an empty array of songs and populate
    songs = [];
    try {
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (1/6)...";
        songs.push(loadSound("music/bensound-betterdays.mp3"));
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (2/6)...";
        songs.push(loadSound("music/bensound-memories.mp3"));
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (3/6)...";
        songs.push(loadSound("music/bensound-ofeliasdream.mp3"));
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (4/6)...";
        songs.push(loadSound("music/bensound-sadday.mp3"));
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (5/6)...";
        songs.push(loadSound("music/bensound-slowmotion.mp3"));
        document.getElementById('p5_loading').innerHTML = "Getting music tracks (6/6)...";
        songs.push(loadSound("music/bensound-tomorrow.mp3"));
    } catch (err) {
        console.log(err.message);
        console.log("Music is not supported on your device! Consider switching to a device that is Web Audio API compatible.");
    }
    
}

// Function to play music
function startMusic() {

    // Check that the songs list isn't empty
    if(songs.length != 0) {
        
        // Try play the song
        try {

            // Play the first song
            songs[currentSong].play();
            songs[currentSong].onended(nextSong);
            
            } catch (err) {
            console.log(err.message);
            console.log("Music is not supported on your device! Consider switching to a device that is Web Audio API compatible.");
        }

    }
    
}

// Function to play the next song
function nextSong() {
    
    // Go to the next song
    currentSong++;
    
    // Check if we have wrapped
    if (currentSong == songs.length) {
        currentSong = 0;
    }
    
    // Start the song
    startMusic();
    
}