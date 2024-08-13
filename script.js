const now_playing = document.querySelector('.now-playing');
const track_art = document.querySelector('.track-art');
const track_name = document.querySelector('.track-name');
const track_artist = document.querySelector('.track-artist');

const playpause_btn = document.querySelector('.playpause-track');
const next_btn = document.querySelector('.next-track');
const prev_btn = document.querySelector('.prev-track');

const seek_slider = document.querySelector('.seek_slider');
const volume_slider = document.querySelector('.volume_slider');
const curr_time = document.querySelector('.current-time');
const total_duration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.fa-random');
const curr_track = new Audio();

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

function createWave(){
    for(let i = 0; i < 78; i++){
        let span = document.createElement("span")
        span.classList.add('stroke')
            
        wave.appendChild(span)
       
    }
    
}
createWave()

const music_list = [
  {
    img: 'images/namollaN.jpeg',
    name: 'I Want to Love You',
    artist: 'Namolla Family N',
    music: 'https://music.youtube.com/watch?v=DOzNbmygVfU&si=198OMMsaPNH8G2H8'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Accident',
    artist: 'Davichi',
    music: 'https://docs.google.com/uc?export=download&id=1ktqYJg3BoQ3ia4B6xRPyj9cVMkr3OKev'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Missing You Today',
    artist: 'Davichi',
    music: 'https://docs.google.com/uc?export=download&id=1UC9lDJbRPrSzpWZHnhqlpfEdt90JW42Z'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Sad Promise',
    artist: 'Davichi',
    music: 'https://docs.google.com/uc?export=download&id=1uY4nqUQzbeADg08cdQl85ED8kfTdq7Cx'
  },
  {
    img: 'images/frestyle.jpeg',
    name: 'Please tell me why',
    artist: 'Frestyle Y',
    music: 'https://docs.google.com/uc?export=download&id=1nEu_sTDCg2LLwlrwmQ6QKiPaqHYcJSDh'
  },
  {
    img: 'images/zhangliyi.jpeg',
    name: 'Timeless',
    artist: 'Zhang Li Yin feat (Xiah)',
    music: 'https://docs.google.com/uc?export=download&id=1cuvoRn-iW2V56JKkSF5_KS1OCslFmPX_'
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Roly-Poly',
    artist: 'T-ara',
    music: 'https://docs.google.com/uc?export=download&id=1OSPgp-MgdO-4Ehb1Ht9oq1UmFuJfv_iI'
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Sugar Free',
    artist: 'T-ara',
    music: 'https://docs.google.com/uc?export=download&id=1tMVXGC8YsIxdy-vR8cRE1ToQ_bLQmxg_'
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Number 9',
    artist: 'T-ara',
    music: 'https://docs.google.com/uc?export=download&id=15POeWQ6EOiGcjJD4hTDRMFh1RdzrxOOq'
  },
  {
    img: 'images/NaraJang.jpeg',
    name: 'Sweet Dream',
    artist: 'Nara Jang',
    music: 'https://docs.google.com/uc?export=download&id=117gvHLnQjsRSE8Umdg2ZSSz2G8xt64HX'
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Sick Enough To Die',
    artist: 'Mc Mong feat JAMIE',
    music: 'https://docs.google.com/uc?export=download&id=1ECjeBz84MGilMMlnPwybjKSqBh39nr3X'
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Sick Enough To Die part 2',
    artist: 'Mc Mong feat JAMIE',
    music: 'https://docs.google.com/uc?export=download&id=1Xm07wqgv1MfMzsDqXQYF_FMnO-kQuCjq'
  },
  {
    img: 'images/vibe.jpg',
    name: 'Vibe The Guy The Girl Remix',
    artist: 'Vibe',
    music: 'https://docs.google.com/uc?export=download&id=10tDY5c6vnHRophIZ1WBGSQZv5ENpjQvj'
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Letter to you part 2',
    artist: 'Mc Mong feat LISA',
    music: 'https://docs.google.com/uc?export=download&id=1wl9l51wCW3jwz_F2fi31hrwq3BdYrtEJ'
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Letter to you part 2',
    artist: 'Mc Mong feat LISA',
    music: 'https://docs.google.com/uc?export=download&id=1wl9l51wCW3jwz_F2fi31hrwq3BdYrtEJ'
  },
  {
    img: 'images/diva.jpeg',
    name: 'That was Love is',
    artist: 'Diva',
    music: 'https://docs.google.com/uc?export=download&id=1SdXMnnn1vcd5Z9_B7C2XxBdxN1wFZ7Zo'
  },
  {
    img: 'images/taein.webp',
    name: 'if Love is Lonely',
    artist: 'Taein',
    music: 'https://docs.google.com/uc?export=download&id=1bqmjWorvkObrLZ8UdTe7TCB5G91FyF-T'
  },
  {
    img: 'images/5dolls.webp',
    name: 'LOV',
    artist: '5dolls',
    music: 'https://docs.google.com/uc?export=download&id=179Phedx0qzitUCgax8JYS5MI30a_ncwb'
  },
  {
    img: 'images/wildrose.jpeg',
    name: 'Only You',
    artist: 'Wild Rose Thorn',
    music: 'https://docs.google.com/uc?export=download&id=1x5jLYaQyHsQSfD-bjV_KQx7vdPnGcvuW'
  },
  {
    img: 'images/gogosing.jpg',
    name: 'Gogosing',
    artist: 'Blackpearl',
    music: 'https://docs.google.com/uc?export=download&id=1q9ru-cIXRfRkN7ArYs1ITqcCXL99eLj-'
  },
  {
    img: 'images/frappucino.jpeg',
    name: 'Frappucino',
    artist: 'J-Walk',
    music: 'https://docs.google.com/uc?export=download&id=1DS6iGSqi0ECTBRAl4bNVDk0XzFUpoY8Y'
  }
  
];

loadTrack(track_index);

function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  const track = music_list[index];
  curr_track.src = track.music;
  curr_track.load();

  track_art.style.backgroundImage = `url(${track.img})`;
  track_name.textContent = track.name;
  track_artist.textContent = track.artist;
  now_playing.textContent = `Playing music ${index + 1} of ${music_list.length}`;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener('ended', nextTrack);
//   random_bg_color();
}

function random_bg_color() {
  const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      const x = Math.round(Math.random() * 14);
      const y = hex[x];
      a += y;
    }
    return a;
  }

  const Color1 = populate('#');
  const Color2 = populate('#');
  const angle = 'to right';

  const gradient = `linear-gradient(${angle}, ${Color1}, ${Color2})`;
  document.body.style.background = gradient;
}

function reset() {
  curr_time.textContent = '00:00';
  total_duration.textContent = '00:00';
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
  const current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  wave.classList.add('loader');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  wave.classList.remove('loader');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && !isRandom) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom) {
    const random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  const seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
    }
    if (durationMinutes < 10) {
      durationMinutes = `0${durationMinutes}`;
    }

    curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}
