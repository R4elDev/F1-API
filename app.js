//Link API F1
const apiF1 = ""

//Função da tela inicial 
async function telaInicial() {
  
  //Recebe o nome da equipe 
  let nomeEquipe = document.getElementById("nomeEquipe").ariaValueMax;

  //Verifica se o nome da equipe inserido 
  if(nomeEquipe.trim() == ""){
    alert("Digite o nome de uma equipe!")
    return;
  }

  document.getElementById("pesquisarEquipe").addEventListener("Keydown", function(event){

    if(event.key == "Enter"){
      event.preventDefault();

      const  pesquisa = this.value;
      pesquisar(pesquisa); //faz a pesquisa pela função pesquisar

    }

  })

}

function pesquisar(){


}

async function telaHome() {
  
}

async function dadosPiloto(params) {
  
}