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

function createWave() {
  for (let i = 0; i < 78; i++) {
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
    music: 'music/1.mp3'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Accident',
    artist: 'Davichi',
    music: 'music/2.mp3'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Missing You Today',
    artist: 'Davichi',
    music: 'music/3.mp3'
  },
  {
    img: 'images/davichi.jpg',
    name: 'Sad Promise',
    artist: 'Davichi',
    music: 'music/4.mp3'
  },
  {
    img: 'images/frestyle.jpeg',
    name: 'Please tell me why',
    artist: 'Frestyle Y',
    music: 'music/5.mp3'
  },
  {
    img: 'images/zhangliyi.jpeg',
    name: 'Timeless',
    artist: 'Zhang Li Yin feat (Xiah)',
    music: 'music/6.mp3'
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Roly-Poly',
    artist: 'T-ara',
    music: 'music/7.mp3'
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Sugar Free',
    artist: 'T-ara',
    music: "music/8.mp3"
  },
  {
    img: 'images/t-araroly.jpeg',
    name: 'Number 9',
    artist: 'T-ara',
    music: "music/9.mp3"
  },
  {
    img: 'images/NaraJang.jpeg',
    name: 'Sweet Dream',
    artist: 'Nara Jang',
    music: "music/10.mp3"
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Sick Enough To Die',
    artist: 'Mc Mong feat JAMIE',
    music: "music/11.mp3"
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Sick Enough To Die part 2',
    artist: 'Mc Mong feat JAMIE',
    music: "music/12.mp3"
  },
  {
    img: 'images/vibe.jpg',
    name: 'Vibe The Guy The Girl Remix',
    artist: 'Vibe',
    music: "music/13.mp3"
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Letter to you part 2',
    artist: 'Mc Mong feat LISA',
    music: "music/14.mp3"
  },
  {
    img: 'images/mc-mong.jpeg',
    name: 'Letter to you part 2',
    artist: 'Mc Mong feat LISA',
    music: "music/15.mp3"
  },
  {
    img: 'images/diva.jpeg',
    name: 'That was Love is',
    artist: 'Diva',
    music: "music/16.mp3"
  },
  {
    img: 'images/taein.webp',
    name: 'if Love is Lonely',
    artist: 'Taein',
    music: "music/17.mp3"
  },
  {
    img: 'images/5dolls.webp',
    name: 'LOV',
    artist: '5dolls',
    music: "music/18.mp3"
  },
  {
    img: 'images/wildrose.jpeg',
    name: 'Only You',
    artist: 'Wild Rose Thorn',
    music: "music/19.mp3"
  },
  {
    img: 'images/gogosing.jpg',
    name: 'Gogosing',
    artist: 'Blackpearl',
    music: "music/20.mp3"
  },
  {
    img: 'images/frappucino.jpeg',
    name: 'Frappucino',
    artist: 'J-Walk',
    music: "music/21.mp3"
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
