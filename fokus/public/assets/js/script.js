const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconPauseAndPlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./assets/sons/luna-rise-part-one.mp3');
const tocar = new Audio('./assets/sons/play.wav');
const pausar = new Audio('./assets/sons/pause.mp3');
const parar = new Audio('./assets/sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');
musica.loop = true;
let intervaloId = null

let tempoDecorridoEmSegundos = 1500;

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./assets/img/${contexto}.png`);
    botoes.forEach(
        function(contexto){
            contexto.classList.remove('active');
        }
    );
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície<br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        parar.play();
        alert('Acabou o tempo');
        zerar();
        return;
    };
    tempoDecorridoEmSegundos -=1;
    mostrarTempo();
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        pausar.play();
        iconPauseAndPlay.setAttribute('src','./assets/img/play_arrow.png');
        zerar();
        return;
    };
    intervaloId = setInterval(contagemRegressiva, 1000);
    tocar.play();
    iniciarOuPausarBt.textContent = "Pausar";
    iconPauseAndPlay.setAttribute('src','./assets/img/pause.png');
};

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
    iconPauseAndPlay.setAttribute('src','./assets/img/play_arrow.png');
};

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
};

mostrarTempo();