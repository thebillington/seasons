// Store the animation state
var animationState = "walkingLeft";

// Store the current frame of the animation reel
var currentFrame = -1;

// Create arrays to hold the different animation states
var leftWalk;
var rightWalk;
var still;

// Store the animation tick to tick every few frames
var animationTick = 0;

// Set the animation delay
var animationDelay = 5;

// Store the current animation array
var animationFrames;

// Function to set up all of the animation
function setupAnimationReel() {
    
    // Create the animation arrays
    leftWalk = [];
    rightWalk = [];
    still = [];
    
    // Get all of the animations
    for (var i = 1; i < 6; i++) {
        // Push the frame
        leftWalk.push(loadImage("assets/playerWalkLeft"+i+".png"));
        rightWalk.push(loadImage("assets/playerWalkRight"+i+".png"));
        still.push(loadImage("assets/playerStill"+i+".png"));
        
    }
    
    // Set the animationFrames to the default
    animationFrames = leftWalk;
    
}

// Function to change the animation frames
function changeAnimationFrames(anim) {
    
    // Create a switch
    switch (anim) {
        case "lWalk":
            // Check whether we are already walking left
            if (animationFrames != leftWalk) {
                animationFrames = leftWalk;
                currentFrame = 0;
            }
            break;
        case "rWalk":
            if (animationFrames != rightWalk) {
                animationFrames = rightWalk;
                currentFrame = 0;
            }
            break;
        case "still":
            if (animationFrames != still) {
                animationFrames = still;
                currentFrame = 0;
            }
            break;
    }
    
}

// Function to return the current animation frame
function currentAnimationFrame() {
    
    console.log(animationFrames);
    
    // Check whether we need to animate
    if (animationTick == 0) {

        // Increment the animation frame
        currentFrame++;

        // Check for wrap
        if (currentFrame == animationFrames.length) {
            currentFrame = 0;
        }
        
        // Reset the animation tick
        animationTick = animationDelay;
    }
    else {
        animationTick--;
    }

    // Return the current walking frame animation
    return animationFrames[currentFrame];
    
}