
class AutoPause {


    constructor() {

        this.threshold = 0.25;
        this._handleIntersection = this._handleIntersection.bind(this);
        this._handleVisibilityChange = this._handleVisibilityChange.bind(this);

    }

    run(player) {

        this.player = player;

        const observer = new IntersectionObserver(this._handleIntersection, {
            threshold: this.threshold,
        });

        observer.observe(this.player.media);

        document.addEventListener('visibilitychange', this._handleVisibilityChange);

    }

    _handleIntersection(entries) {

        const entry = entries[0];

        const isVisible = entry.intersectionRatio >= this.threshold;

        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause();
        }

    }

    _handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible';
        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }

}

export default AutoPause;
