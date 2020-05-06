const btnPlay = document.getElementById('btnEmpezar');

const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const ULTIMO_NIVEL = 10;

class Game {

    secuencia;
    nivel;
    subnivel;
    colores;


    constructor() {
        this.init();
        this.generateSequence();
        setTimeout(this.nextLevel, 500);
    }

    init() {
        this.init = this.init.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.selectColor = this.selectColor.bind(this);
        this.toggleBtnStart();
        this.nivel = 1;
        this.colores = {
            celeste,    // Equivalente a celeste: celeste  (key, const celeste)
            violeta,
            naranja,
            verde
        };
    }

    toggleBtnStart() {
        if (btnPlay.classList.contains('hide')) {
            btnPlay.classList.remove('hide');
        } else {
            btnPlay.classList.add('hide');
        }
    }

    generateSequence() {
        // Array[10] = 0 for item inside, change item entre 0 y 3
        this.secuencia = new Array(10).fill(0).map(number => this.numberRandomBetween(4));
    }

    numberRandomBetween(n) {
        return Math.floor(Math.random() * n);
    }

    nextLevel() {
        this.subnivel = 0;
        this.illuminateSequence();
        this.addEventsClick();
    }

    illuminateSequence() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformNumberToColor(this.secuencia[i]);
            setTimeout(() => this.iluminateColor(color), 1000 * i);
        }
    }

    transformNumberToColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }

    iluminateColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.turnOffColor(color), 350);
    }

    turnOffColor(color) {
        this.colores[color].classList.remove('light');
    }

    addEventsClick() {
        this.colores.celeste.addEventListener('click', this.selectColor);
        this.colores.verde.addEventListener('click', this.selectColor);
        this.colores.violeta.addEventListener('click', this.selectColor);
        this.colores.naranja.addEventListener('click', this.selectColor);
    }

    deleteEventsClick() {
        this.colores.celeste.removeEventListener('click', this.selectColor);
        this.colores.verde.removeEventListener('click', this.selectColor);
        this.colores.violeta.removeEventListener('click', this.selectColor);
        this.colores.naranja.removeEventListener('click', this.selectColor);
    }

    selectColor(event) {
        const nameColor = event.target.dataset.color;
        const numeroColor = this.transformColorToNumber(nameColor);
        this.iluminateColor(nameColor);

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;
                this.deleteEventsClick();

                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    // Gano
                    this.gameWin();
                } else {
                    setTimeout(this.nextLevel, 1500);
                }
            }
        } else {
            // Perdio
            this.gameOver();
        }
    }

    gameWin() {
        swal('Ey', 'Felicitaciones, ganaste el juego!', 'success')
            .then(this.init);
    }

    gameNext(nivel) {
        swal('Ey', `Avanzas al siguiente nivel: ${nivel}!`, 'success')
            .then(this.init);
    }



    gameOver() {
        swal('Oops', 'lo lamentamos, perdiste :$', 'error')
            .then(() => {
                this.deleteEventsClick();
                this.init();
            });
    }
}




const startGame = () => {
    window.juego = new Game();
}