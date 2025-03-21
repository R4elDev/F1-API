document.addEventListener("DOMContentLoaded", () => {
  telaInicial(); // Chame a função que precisa acessar os elementos
});

//Função tela inicial
async function telaInicial() {
    
  // Input de pesquisa da tela inicial
  const inputPesquisa = document.getElementById('pesquisarHome');

   // Detecta ao clicar enter no input
  inputPesquisa.addEventListener('keydown', function(event) {

      if (event.key === 'Enter') {
          
        //Pega o valor digitado no input
        let nomeEquipe = inputPesquisa.value.trim();
 
        // Verifica se o nome da equipe foi informado
        if (nomeEquipe === "") {
          alert("Digite uma equipe!");
          return alert;
        }
        
        buscarPiloto(nomeEquipe)

       }
   });


  // return nomeEquipe

}

//Função tela home
// async function telaHome(pilotoEncontrado){

//   // Verifica se o botão não teve erro ao executar
//   if (botaoCard) {
//     // Adiciona o click no botão
//     botaoCard.addEventListener("click", function() {
//         //Muda para a tela de dados dos pilotos
//         window.location.href = "telaDadosPilotos.html";
//     });
//   } else {
//     console.error("Botão não encontrado!");
//   };

  


// }

async function getBuscarPiloto(){
  // Realiza a requisição para buscar pilotos da equipe
  const url = `https://api.openf1.org/v1/drivers`;
  const response = await fetch(url);
  const data = await response.json();
  // Os objetos chegam aqui
  //console.log(data);

  return data
  
}

//Função para buscar piloto
async function buscarPiloto(nomeEquipeLook) {

        
  if (nomeEquipeLook === "") {
      alert("Digite uma equipe!");
      return alert;
  }
    const data = await getBuscarPiloto()
      
      const pilotoEncontrado = {
        foto: [],
        nome: [],
        equipe: [],
        nacionalidade: [],
        abreviacaoNome: [],
        numero: [],
        corEquipe: []
      }
      const listaEncontrados = {
        nomePiloto: [],
        nomeEquipe: []
      } 

      const equipePiloto = {
        nomePiloto: [],
        nomeEquipe: []
      }


      // Desta forma percorre o array
      
      data.forEach(function(item, indice){

        equipePiloto.nomeEquipe = item.team_name
        equipePiloto.nomePiloto = item.full_name


        if(nomeEquipeLook == equipePiloto.nomeEquipe){

          listaEncontrados.nomePiloto.push(equipePiloto.nomePiloto)
          listaEncontrados.nomeEquipe.push(equipePiloto.nomeEquipe)

        }
      })
    
      

      listaEncontrados.nomeEquipe.slice(0, 10).forEach(function(item) {


        if (nomeEquipeLook == item){

            data.slice(0, 10).forEach(function(item){
              pilotoEncontrado.foto.push(item['headshot_url'])
              pilotoEncontrado.nome.push(item['full_name'])
              pilotoEncontrado.equipe.push(item['team_name'])
              pilotoEncontrado.nacionalidade.push(item['country_code'])
              pilotoEncontrado.abreviacaoNome.push(item['name_acronym'])
              pilotoEncontrado.numero.push(item['driver_number'])
              pilotoEncontrado.corEquipe.push(item['team_colour'])

              console.log(pilotoEncontrado);
              criarCardPiloto(pilotoEncontrado)
              

          }); 
      
       }
      })
    

      if (!pilotoEncontrado || pilotoEncontrado.length === 0) {
          alert("Nenhuma equipe encontrada ou sem pilotos.");
          return alert;
      }    
    
}




// Função para criar um card de piloto
function criarCardPiloto(pilotoEncontrado) { 

  if (pilotoEncontrado === "") {
    return false
  }else{

    // ########## Faltou criar o card cabaço... #######

    const card = document.createElement("div")
    card.className = 'card'

    const botaoCard = document.createElement("button")
    botaoCard.className = 'botaoCard'

    const pilotosContainer = document.createElement('div')
    pilotosContainer.className = 'pilotosContainer'

    const retangulo = document.createElement('div')
    retangulo.className = 'retangulo'

    const nomePiloto = document.createElement('h1')
    nomePiloto.className = 'nomePiloto'

    const fotoPiloto = document.createElement('div')
    fotoPiloto.className = 'fotoPiloto'

    const img = document.createElement('img')

    const novoItem = document.createElement('li')


    //adicionando conteúdo na tag
    nomePiloto.textContent = pilotoEncontrado.nome
    img.src = `./${pilotoEncontrado.foto}`

    novoItem.style = `--cor-hover: ${pilotoEncontrado.corEquipe}`


     //adicionando no pai
     botaoCard.appendChild(pilotosContainer)
     pilotosContainer.appendChild(retangulo)
     pilotosContainer.appendChild(nomePiloto)
     pilotosContainer.appendChild(fotoPiloto)
     fotoPiloto.appendChild(img)



     // Adicionando o pai na tela
      const paiCards = document.getElementById('container--cards')

      paiCards.append(pilotosContainer)

  }

}


telaInicial()

