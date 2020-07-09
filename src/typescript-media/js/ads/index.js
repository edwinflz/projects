import Ads from './Ads.js';

class AdsPlugin {
  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement('div');
    this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
  }

  run(player) {
    this.player = player;
    this.player.container.appendChild(this.adsContainer);
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this._handleTimeUpdate);
  }

  _handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if (currentTime % 10 === 0) {
      this._renderAd();
    }
  }

  _renderAd() {
    if (this.currentAd) {
      return;
    }

    const ad = this.ads.getAd();
    this.currentAd = ad;
    this.adsContainer.innerHTML = `
      <div class="ads">
        <a class="ads__link" href="${this.currentAd.url}" target="_blank">
          <img class="ads__img" src="${this.currentAd.imageUrl}" />
          <div class="ads__info">
            <h5 class="ads__title">${this.currentAd.title}</h5>
            <p class="ads__body">${this.currentAd.body}</p>
          </div>
        </a>
      </div>
    `;

    setTimeout(() => {
      this.currentAd = null;
      this.adsContainer.innerHTML = '';
    }, 5000);
  }
  
}

export default AdsPlugin;
