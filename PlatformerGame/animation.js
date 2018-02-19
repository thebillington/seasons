// Store the animation state
var animationState = "walkingLeft";

// Store the current frame of the animation reel
var currentFrame = -1;

// Create arrays to hold the different animation states
var leftWalk;
var rightWalk;
var leftJump;
var rightJump;
var still;
var drown;

// Get the end game image
var endGameImg;

// Get the instructions
var instructions;

// Store the backgrounds
var backgrounds;

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
    leftJump = [];
    rightJump = [];
    still = [];
    drown = [];
    
    // Get the backgrounds
    backgrounds = [];
    backgrounds.push(loadImage("assets/summer.png"));
    backgrounds.push(loadImage("assets/spring.png"));
    backgrounds.push(loadImage("assets/winter.png"));
    backgrounds.push(loadImage("assets/autumn.png"));
    
    // Get the instructions
    instructions = loadImage("assets/instructions.png");
    
    // Get the end game image
    endGameImg = loadImage("assets/winner.png");
    
    // Get all of the animations
    for (var i = 1; i < 6; i++) {
        // Push the frame
        leftWalk.push(loadImage("assets/playerAnimation/playerWalkLeft"+i+".png"));
        rightWalk.push(loadImage("assets/playerAnimation/playerWalkRight"+i+".png"));
        leftJump.push(loadImage("assets/playerAnimation/playerJumpLeft"+i+".png"));
        rightJump.push(loadImage("assets/playerAnimation/playerJumpRight"+i+".png"));
        still.push(loadImage("assets/playerAnimation/playerStill"+i+".png"));
        drown.push(loadImage("assets/playerAnimation/playerDrown"+i+".png"));
        
    }
    
    // Set the animationFrames to the default
    animationFrames = leftWalk;
    
}

// Function to change the animation frames
function changeAnimationFrames(anim) {
    
    // Create a switch to change the animation reel
    switch (anim) {
        case "lWalk":
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
        case "lJump":
            if (animationFrames != leftJump) {
                animationFrames = leftJump;
                currentFrame = 0;
            }
            break;
        case "rJump":
            if (animationFrames != rightJump) {
                animationFrames = rightJump;
                currentFrame = 0;
            }
            break;
        case "still":
            if (animationFrames != still) {
                animationFrames = still;
                currentFrame = 0;
            }
            break;
        case "drown":
            if (animationFrames != drown) {
                animationFrames = drown;
                currentFrame = 0;
            }
            break;
    }
    
}

// Function to return the current animation frame
function currentAnimationFrame() {
    
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