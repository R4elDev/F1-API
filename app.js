//Link API F1
const apiF1 = "https://ergast.com/api/f1/constructors.json"

 // Faz o Js esperar o carregamento do html
 document.addEventListener('DOMContentLoaded', function() {

//Função tela inicial
async function telaInicial() {
    
  // Input de pesquisa da tela inicial
  const inputPesquisa = document.getElementById('pesquisarEquipe');

   // Detecta ao clicar enter no input
  inputPesquisa.addEventListener('keydown', function(event) {

      if (event.key === 'Enter') {
          
        //Pega o valor digitado no input
        let nomeEquipe = inputPesquisa.value.trim();
 
        // Verifica se o nome da equipe foi informado
        if (nomeEquipe === "") {
          alert("Digite uma equipe!");
          return;
        }
        
        //Muda para a tela home  
        window.location.href = 'telaHome.html';

        buscarPiloto()

       }
   });

}

//Função tela home
async function telaHome(){

  // Verifica se o botão não teve erro ao executar
  if (botaoCard) {
    // Adiciona o click no botão
    botaoCard.addEventListener("click", function() {
        //Muda para a tela de dados dos pilotos
        window.location.href = "telaDadosPilotos.html";
    });
  } else {
    console.error("Botão não encontrado!");
  };

}

//Função para buscar piloto
async function buscarPiloto() {
         

}

//Função para obter a foto do piloto na API OPEN F1
async function obterFotoPiloto() {

  
}

// Função para criar um card de piloto
function criarCardPiloto() {

}

async function telaDadosPilotos(){
  
  

}

telaInicial()

telaHome()

obterFotoPiloto()

criarCardPiloto()

})