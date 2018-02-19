// Create an array to store the songs
var songs;

// Store the current song
var currentSong = 0;

// Function to setup the music
function setupMusic() {

    console.log("LOADING MUSIC");
    
    // Create an empty array of songs and populate
    songs = [];
    try {
        songs.push(loadSound("music/bensound-betterdays.mp3"));
        songs.push(loadSound("music/bensound-memories.mp3"));
        songs.push(loadSound("music/bensound-ofeliasdream.mp3"));
        songs.push(loadSound("music/bensound-sadday.mp3"));
        songs.push(loadSound("music/bensound-slowmotion.mp3"));
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
    
        // Play the first song
        songs[currentSong].play();
        songs[currentSong].onended(nextSong);

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