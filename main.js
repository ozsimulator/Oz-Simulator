let ozState = 0; // 0 = in, 1 = out
let atDoor = 0; // 0 = not at door, 1 = at door
const ozWantsOut = new Audio('audio/oz_wants_out_sound.mp3');
const ozWantsIn = new Audio('audio/oz_wants_in_sound.mp3');
const element = document.getElementById('doorPicture');
let firstClick = 1; // 1 = first click, 0 = not first click

// Function that you want to run at random intervals
function changePhoto() {

    // Handle the case where oz is inside
    if (ozState === 0) {
        ozWantsOut.play();

        // If oz is not at the door, change the photo
        if (atDoor === 0) {
            element.src = 'images/oz_wants_out.jpeg';
            atDoor = 1;
        }
    }

    // Handle the case where oz is outside
    else {
        ozWantsIn.play();

        // If oz is not at the door, change the photo
        if (atDoor === 0) {
            element.src = 'images/oz_wants_in.jpeg';
            atDoor = 1;
        }
    }
}

function openDoor() {
    // If this is the first click, start the random interval
    if (firstClick === 1) {
        scheduleRandomInterval();
        const instructionElement = document.getElementById('instructions');
        instructionElement.style.display='block';
        element.src = 'images/no_oz.jpeg';
        firstClick = 0;
    }


    else {
        // Oz is no longer at the door
        atDoor = 0;

        // If Oz is in, let him out
        if (ozState === 0) {
            ozState = 1;
        }

        // If Oz is out, let him in
        else {
            ozState = 0;
        }

        // Change the photo so that Oz is not at the door
        element.src = 'images/no_oz.jpeg';
    }
}

// Function to schedule the next run of changePhoto
function scheduleRandomInterval() {

    let randomInterval = 0;

    // If Oz is not at the door, set the interval to be larger
    if (atDoor === 0) {
        randomInterval = Math.floor(Math.random() * 10000) + 2000;
    }

    // If Oz is at the door, set the interval to be smaller
    else {
        randomInterval = Math.floor(Math.random() * 5000) + 2000;
    }

    // Schedule the next execution of changePhoto
    setTimeout(() => {
        changePhoto();
        scheduleRandomInterval(); // Schedule the next random interval
    }, randomInterval);
}



