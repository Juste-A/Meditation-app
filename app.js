function app () {
    const track = document.querySelector(".track");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".background-vid video");

    // sounds
    const tracks = document.querySelectorAll(".sound button");
    // time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time button");
    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    // duration
    let defaultDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    // pick different sounds
    tracks.forEach(sound => {
        sound.addEventListener("click", function(){
            track.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(track); 
        })
    })

    // play sound
    play.addEventListener("click", function() {
        checkPlaying(track);
    })

    // select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            defaultDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`
        })
    })

    // function to stop and play the sounds
    function checkPlaying(track) {
        if (track.paused) {
            track.play();
            video.play();
            play.src = "./icons/pause.svg";
        } else {
            track.pause();
            video.pause();
            play.src = "./icons/play.svg";
        }

    }

    // animate the circle
    track.ontimeupdate = function() {
        let currentTime = track.currentTime;
        let elapsed = defaultDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        // animate the circle
        let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= defaultDuration) {
            track.pause();
            track.currentTime = 0;
            play.src = "./icons/play.svg";
            video.pause();
        }
    }
}

app();