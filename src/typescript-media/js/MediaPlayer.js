class MediaPlayer {

  constructor(config) {

    this.media = config.el;
    this.plugins = config.plugins || [];
    this.playbutton = config.button;
    this.initPlayer();
    this._initPlugins();

  }

  initPlayer() {

    this.container = document.createElement('div');
    this.container.style.position = 'relative';
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);

  }

  _initPlugins() {

    this.plugins.forEach(plugin => {
      plugin.run(this);
    });

  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  togglePlay() {

    if (this.media.paused) {
      this.play();
      this.addClassPlay();
    } else {
      this.pause();
      this.addClassPause();
    }

  }

  addClassPause() {
    this.playbutton.classList.remove('btn-success');
    this.playbutton.classList.add('btn-danger');
    this.playbutton.textContent = 'Pause';
  }

  addClassPlay() {
    this.playbutton.classList.remove('btn-danger');
    this.playbutton.classList.add('btn-success');
    this.playbutton.textContent = 'Play';
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

}

export default MediaPlayer;
