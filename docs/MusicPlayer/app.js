let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

//Setup Music

const setMusic = (i) => {
    seekBar.value = 0; //set initial slide value to 0
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    //disk.style.Image.src = songs.cover;
    //'url('${song.cover}')';

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300);//wait 300ms
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = '0' + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = '0' + sec;
    }
    return min + ':' + sec;
}

//Play and Pause music
playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

////Update seekbar value and go to next song when current song ends
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);

    if(Math.floor(music.currentTime) == Math.floor(seekbar.max)){
        forwardBtn.click();
    }
}, 500)//check time every 500ms, if song is over, go to next song

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//Forward and Backward buttons
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

//Forward and Backward buttons
backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})

//Unpause
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}
