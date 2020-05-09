import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';
import AutoPause from './plugins/AutoPause.js';
import AdsPlugin from './ads/index.js';

const video = document.querySelector('video');
const playButton = document.querySelector('#playButton');
const player = new MediaPlayer({
  el: video,
  button: playButton,
  plugins: [new AutoPlay(), new AutoPause(), new AdsPlugin()],
});


// Esto realizado dentro de la clase
playButton.onclick = () => player.togglePlay();

// Esto realizado fuera de la clase
const muteButton = document.querySelector('#muteButton');
muteButton.onclick = () => {
  if (player.media.muted) {
    player.unmute();
    addClassUnMuted();
  } else {
    player.mute();
    addClassMuted();
  }
};


const addClassMuted = () => {
  muteButton.classList.remove('btn-danger');
  muteButton.classList.add('btn-info');
  muteButton.textContent = 'Sonido';
}

const addClassUnMuted = () => {
  muteButton.classList.remove('btn-info');
  muteButton.classList.add('btn-danger');
  muteButton.textContent = 'Silenciar';
}

