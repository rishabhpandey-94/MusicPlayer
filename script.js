console.log("welcome to MusicPlay")

// Start scripting

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgress = document.getElementById('myProgress');
let gif = document.getElementById('gif');
let gif2 = document.getElementById('gif2');
let masterSongPlay = document.getElementById('masterSongPlay');
let songitems = Array.from(document.getElementsByClassName('songitem'));


let songs = [
    {SongName:"Sauda khara khara", filepath:"songs/1.mp3", coverpath:"Cover/1.jpg"},
    {SongName:"Naiyo Lagda", filepath:"songs/2.mp3", coverpath:"Cover/2.jpg"},
    {SongName:"Koka - Badshah", filepath:"songs/3.mp3", coverpath:"Cover/3.jpg"},
    {SongName:"Bijli Bijli", filepath:"songs/4.mp3", coverpath:"Cover/4.jpg"},
    {SongName:"Humdard - Ek Villain", filepath:"songs/5.mp3", coverpath:"Cover/5.jpg"},  
]


songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
})


// handle play/pause click
masterplay.addEventListener('click', ()=> {
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        gif2.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        gif2.style.opacity = 0;
    }
})

// Listen to event
audioElement.addEventListener('timeupdate', ()=> {
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgress.value = progress;
})
myProgress.addEventListener('change', ()=> {
    audioElement.currentTime = myProgress.value * audioElement.duration/100;
})

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songitemplay')).forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}
Array.from(document.getElementsByClassName('songitemplay')).forEach(element => {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongPlay.innerHTML = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        gif2.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');

    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4)
    {
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongPlay.innerHTML = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongPlay.innerHTML = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})

