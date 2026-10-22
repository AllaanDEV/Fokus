const html=document.querySelector('html');
const curtoBt=document.querySelector('.app__card-button--curto');
const longoBt=document.querySelector('.app__card-button--longo');
const foco=document.querySelector('.app__card-button--foco');
const imagem=document.querySelector('.app__image');
const titulo=document.querySelector('.app__title');
const inputCheckbox=document.querySelector('.toggle-checkbox');
const audio= new Audio("./sons/luna-rise-part-one.mp3")
const começarPausar=document.querySelector("#start-pause span")
const imagemPausarOuComeçar=document.querySelector(".app__card-primary-butto-icon")
const timer=document.getElementById(("timer"))

let tempoDecorridoEmSegundos= 1500
let valorConatagem= null
inputCheckbox.addEventListener('change', () => {
    if(inputCheckbox.checked){
        audio.play();
        audio.loop=true;
    }else{
        audio.pause();
        audio.currentTime=0;
    }
})
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos= 300
    alterarContexto('descanso-curto', curtoBt);
    imagem.setAttribute("src", "./imagens/descanso-curto.png")
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos= 900
    alterarContexto('descanso-longo', longoBt);
    imagem.setAttribute("src", "./imagens/descanso-longo.png")
});

foco.addEventListener('click', () => {
    tempoDecorridoEmSegundos=  10
    alterarContexto('foco', foco);
    imagem.setAttribute("src", "./imagens/foco.png")

});



// Função para limpar as classes de todos e ativar o correto
function alterarContexto(contexto, botaoClicado){
    cronometro(tempoDecorridoEmSegundos)
    html.setAttribute('data-contexto', contexto);

    [curtoBt, longoBt, foco].forEach(botao => {
        botao.classList.remove('active');
    });

    botaoClicado.classList.add('active');

    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case  'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const botaoComeçar=document.getElementById("start-pause")
const somLigado= new Audio("./sons/play.wav")
const somDesLigado= new Audio("./sons/pause.mp3")
const somFinalizado=new Audio("./sons/beep.mp3")
const temporizador = () =>{

    tempoDecorridoEmSegundos -= 1
    cronometro(tempoDecorridoEmSegundos)
    if(tempoDecorridoEmSegundos <= 0){
        parar()
        somFinalizado.play()
        somFinalizado.volume= 0.3;
        const focoAtivo= html.getAttribute("data-contexto") === "foco"

        if(focoAtivo){
            const evento= new CustomEvent("tarefa finalizada")
            document.dispatchEvent(evento)
        }
        return
    }
}

botaoComeçar.addEventListener("click", ()=>{
    contagem()
    if(valorConatagem){
         somLigado.play()
         somLigado.volume= 0.3;
         começarPausar.textContent="Pausar"
        imagemPausarOuComeçar.setAttribute("src", "./imagens/pause.png")
    }else{
        somDesLigado.play()
        somDesLigado.volume= 0.3;
        começarPausar.textContent="Começar"
        imagemPausarOuComeçar.setAttribute("src", "./imagens/play_arrow.png")
    }
})

function contagem(){
    if(valorConatagem){
        parar()
        return
    }
    valorConatagem= setInterval(temporizador, 1000);
}

function parar(){
    clearInterval(valorConatagem)
    valorConatagem=null
}

function cronometro(tempoDecorridoEmSegundos){
    let data= new Date (tempoDecorridoEmSegundos * 1000)
    let formatacaoRelogio= data.toLocaleTimeString("pt-br", {
        minute: '2-digit',
        second: '2-digit'
    })
    timer.textContent= `${formatacaoRelogio}`
   
}





