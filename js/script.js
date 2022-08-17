const musicas = [

    {artista: "MC Felipe Boladão", musica: "Tá difícil", dir: "musicas/FelipeBoladao-tadificil.mp3"},
    {artista: "MC Felipe Boladão", musica: "É, eu sei", dir: "musicas/FelipeBoladao-eeusei.mp3"},
    {artista: "MC Felipe Boladão", musica: "A viagem", dir: "musicas/FelipeBoladao-aviagem.mp3"}

];

const tocar = document.querySelector(".tocar");
const pausar = document.querySelector(".pausar");
const anterior = document.querySelector(".anterior");
const proxima = document.querySelector(".proxima");
const h2 = document.querySelector(".h2");
const i  = document.querySelector(".i");

const gerenciar = {

    tocar: 0,
    pausada: false,
    tempo: 0,
    construir() {
    
            gerenciar.audio = new Audio(musicas[gerenciar.tocar].dir);
            gerenciar.h2 = h2.innerHTML = musicas[gerenciar.tocar].musica;
            gerenciar.i = i.innerHTML = musicas[gerenciar.tocar].artista;
    
    },
    mostrarBotaoTocar() {
    
            tocar.style.display = "inline-block";
            pausar.style.display = "none";
    
    },
    ocultarBotaoTocar() {
            
            tocar.style.display = "none";
            pausar.style.display = "inline-block";
    
    },
    pararMusica() {
    
            gerenciar.audio.pause();
            gerenciar.audio.currentTime = 0;
            gerenciar.tempo = 0;
    
    },
    tocarMusica() {
    
           if(gerenciar.pausada == false) {
           
               gerenciar.audio.play();
               gerenciar.ocultarBotaoTocar();
           
           }
           
           else {
           
               gerenciar.audio.currentTime = gerenciar.tempo;
               gerenciar.pausada = false;
               gerenciar.tocarMusica();
           
           };
           
           gerenciar.audio.addEventListener("timeupdate", () => {
           
               if(gerenciar.audio.currentTime == gerenciar.audio.duration) {
               
                   progress.style.width = 0;
                   gerenciar.proximaMusica();
               
               }
               
               else {
               
                   progress.style.width = (gerenciar.audio.currentTime/gerenciar.audio.duration)*100+"%";
                   
               };
           
           });
    
    },
    pausarMusica() {
    
            gerenciar.tempo = gerenciar.audio.currentTime;
            gerenciar.pausada = true;
            gerenciar.audio.pause();
            gerenciar.mostrarBotaoTocar();
    
    },
    proximaMusica() {
    
            if(gerenciar.tocar < musicas.length - 1) {
            
               gerenciar.tocar += 1;
            
            }
            
            else {
            
                gerenciar.tocar = 0;
            
            };
            
            gerenciar.pararMusica();
            gerenciar.construir();
            gerenciar.tocarMusica();
    
    },
    anteriorMusica() {
    
            if(gerenciar.tocar > 0) {
            
               gerenciar.tocar -= 1;
            
            }
            
            else {
            
                gerenciar.tocar = musicas.length - 1;
            
            };
            
            gerenciar.pararMusica();
            gerenciar.construir();
            gerenciar.tocarMusica();
    
    },

};

if(tocar) {

   tocar.addEventListener("click", gerenciar.tocarMusica);

};

if(pausar) {

    pausar.addEventListener("click", gerenciar.pausarMusica);

};

if(proxima) {

   proxima.addEventListener("click", gerenciar.proximaMusica);

};

if(anterior) {

   anterior.addEventListener("click", gerenciar.anteriorMusica);

};

window.addEventListener("load", gerenciar.construir);