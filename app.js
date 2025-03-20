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
          return alert;
        }
        
        //Muda para a tela home  
        window.location.href = 'telaHome.html';

        buscarPiloto()

       }
   });

   console.log(nomeEquipe)

  return nomeEquipe

}

//Função tela home
async function telaHome(pilotoEncontrado){

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

    /*const botaoCard = document.createElement("button")
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
     fotoPiloto.appendChild(img)*/

  


}

//Função para buscar piloto
/*async function buscarPiloto(nomeEquipe) {

  console.log(nomeEquipe)
        
  if (nomeEquipe === "") {
      alert("Digite uma equipe!");
      return alert;
  }

      // Realiza a requisição para buscar pilotos da equipe
      const url1 = `https://ergast.com/api/f1/constructors/${nomeEquipe}/drivers.json`;
      const response1 = await fetch(url1);
      const data1 = await response1.json();
      const pilotos = data1.MRData.DriverTable.Drivers;
      const numeroPilotoEcontrado = []

      console.log(response1)

      dataDesc.forEach(function(item){
        numeroPilotoEcontrado.push(item['permanentNumber'])
      })

      if (!pilotos || pilotos.length === 0) {
          alert("Nenhuma equipe encontrada ou sem pilotos.");
          return alert;
      }

    return numeroPilotoEcontrado
  

}*/

async function getBuscarPiloto(){
  // Realiza a requisição para buscar pilotos da equipe
  const url = `https://api.openf1.org/v1/drivers`;
  const response = await fetch(url);
  const data = await response.json();
  const dataDesc =  await data.description
}

//Função para buscar piloto
async function buscarPiloto(nomeEquipe) {

  //console.log(nomeEquipe)
        
  if (nomeEquipe === "") {
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

      // console.log(data)
        
      // for (let p = 0; p < data.length; p++) {
      //   let pilotos = data[p].team_name
      //   console.log(pilotos)
      // }


     // let pilotos = data[0].team_name
     // console.log(pilotos)
      

      data.forEach(function(item, indice){

        console.log(item.team_name)

        item.team_name.forEach(function(itemEquipe){

          equipePioto.nomeEquipe = itemEquipe.team_name
          equipePioto.nomePiloto = itemEquipe.full_name

          console.log(equipePiloto)

          if(String(listaEncontrados.nomePiloto).includes(String(equipePioto.nomePiloto)))

          listaEncontrados.nomePiloto.push(equipePioto.nomePiloto)
          listaEncontrados.nomeEquipe.push(equipePioto.nomeEquipe)

        })
      })

      console.log(listaEncontrados)

      data.for

      if (String(nomeEquipe).toLowerCase == String(listaEncontrados.nomeEquipe).toLocaleLowerCase){

        dataDesc.forEach(function(item){
          pilotoEncontrado.foto.push(item['headshot_url'])
          pilotoEncontrado.nome.push(item['full_name'])
          pilotoEncontrado.equipe.push(item['team_name'])
          pilotoEncontrado.nacionalidade.push(item['country_code'])
          pilotoEncontrado.abreviacaoNome.push(item['name_acronym'])
          pilotoEncontrado.numero.push(item['driver_number'])
          pilotoEncontrado.corEquipe.push(item['team_colour'])
        }); 
      
      }

      if (!pilotoEncontrado || pilotoEncontrado.length === 0) {
          alert("Nenhuma equipe encontrada ou sem pilotos.");
          return alert;
      }

      console.log(pilotoEncontrado)

    return pilotoEncontrado
  

}




//Função para obter a foto do piloto na API OPEN F1
/*async function obterFotoPiloto(numeroPilotoEcontrado) {

  const url = `https://api.openf1.org/v1/drivers?driver_number=${numeroPilotoEcontrado}`;
  const response = await fetch(url);
  const data = await response.json();
  const pilotoEncontrado = {
    foto: [],
    nome: []
  }
    



  if (data.data && data.data.length > 0) {

    dataDesc.forEach(function(item){
      pilotoEncontrado.foto.push(item['headshot_url'])
      pilotoEncontrado.nome.push(item['full_name'])
    });


  }else{
    pilotoEncontrado.foto  = './User Male.png'
    pilotoEncontrado.name = 'Nome'
  }

  return pilotoEncontrado
}*/

// Função para criar um card de piloto
function criarCardPiloto(pilotoEncontrado) {

  if (pilotoEncontrado === "") {
    return false
  }else{

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

  }

}

async function telaDadosPilotos(){
  
  

}

telaInicial()

telaHome()

buscarPiloto()

pilotoEncontrado.forEach(criarCardPiloto)


