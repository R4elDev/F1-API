//Função tela home
async function telaHome(){

    // Input de pesquisa da tela home
    const inputPesquisaHome = document.getElementById('pesquisarHome');
  
    // Detecta ao clicar enter no input
    inputPesquisaHome.addEventListener('keypress', async function(event) {
  
       if (event.key === 'Enter') {
           
         //Pega o valor digitado no input
         const nomeEquipeHome = inputPesquisaHome.value.trim();
  
         // Verifica se o nome da equipe foi informado
         if (nomeEquipeHome === "") {
           alert("Digite uma equipe!");
           return;
         }
  
         console.log(nomeEquipeHome);
  
         await buscarPiloto(nomeEquipeHome)
  
        }
    });
  
    //  // Verifica se o botão não teve erro ao executar
    //  if (botaoCard) {
    //    // Adiciona o click no botão
    //    botaoCard.addEventListener("click", function() {
    //        //Muda para a tela de dados dos pilotos
    //        window.location.href = "telaDadosPilotos.html";
    //    });
    // } else {
    //    console.error("Botão não encontrado!");
    // };
  
} 


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
  
    console.log(`retornando nome na funcao buscar pilotos: ${nomeEquipeLook}`)

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
  
                console.log(pilotoEncontrado.nacionalidade)
                criarCardPiloto(pilotoEncontrado)
                
                pilotoEncontrado = ""
  
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
  
  
  
      const card = document.createElement("div")
      card.classList.add = 'card'
  
      const botaoCard = document.createElement("button")
      botaoCard.classList.add = 'botaoCard'
  
      const pilotosContainer = document.createElement('div')
      pilotosContainer.classList.add = 'pilotosContainer'
  
      const retangulo = document.createElement('div')
      retangulo.classList.add = 'retangulo'
  
      const nomePiloto = document.createElement('h1')
      nomePiloto.classList.add = 'nomePiloto'
  
      const fotoPiloto = document.createElement('div')
      fotoPiloto.classList.add = 'fotoPiloto'
  
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
  
        paiCards.appendChild(pilotosContainer)
  
    }
  
}

telaHome()