<<<<<<< HEAD
const pesquisarHome = document.querySelector("#pesquisarHome");
const containerCards = document.getElementById("containerCards");
const objetoPilotos = new Set(); // Para armazenar pilotos únicos

// Função para buscar os dados da API
fetch("https://api.openf1.org/v1/drivers")
    .then((response) => response.json())
    .then((data) => {
        // Chama a função para gerar os cards
        generateCards(data);
    })
    .catch((error) => console.log("Erro ao buscar dados: ", error));

// Função para gerar os cards
function generateCards(pilotos) {
    // Filtra pilotos únicos com base no nome
    const listaPilotosUnicos = pilotos.filter((piloto) => {
        if ([...objetoPilotos].some((pilotoReal) => pilotoReal.full_name === piloto.full_name)) {
            return false;
        }
        objetoPilotos.add(piloto);
        return true;
    });

    // Exibe todos os cards ao carregar os dados
    listaPilotosUnicos.forEach((piloto) => {
        const card = createCard(piloto);
        containerCards.appendChild(card);
    });
}

// Cria um card individual para o piloto
function createCard(piloto) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Cria a frente do card
    const cardFront = document.createElement("div");
    cardFront.classList.add("frenteCard");

    const img = document.createElement("img");
    img.src = piloto.headshot_url;
    img.classList.add("cardImagem");
    cardFront.appendChild(img);

    // Cria o verso do card
    const cardBack = document.createElement("div");
    cardBack.classList.add("cardInfo");

    const h2 = document.createElement("h2");
    h2.textContent = piloto.full_name;
    cardBack.appendChild(h2);

    const equipe = document.createElement("p");
    equipe.textContent = `Equipe: ${piloto.team_name}`;
    cardBack.appendChild(equipe);

    const nacionalidade = document.createElement("p");
    nacionalidade.textContent = `País: ${piloto.country_code}`;
    cardBack.appendChild(nacionalidade);

    const numero = document.createElement("p");
    numero.textContent = `Número: ${piloto.driver_number}`;
    cardBack.appendChild(numero);

    // Adiciona a frente e o verso no card
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    // Adiciona um evento de clique para abrir a modal
    card.addEventListener("click", () => {
        showModal(piloto);
    });

    return card;
}
=======

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

>>>>>>> 18c4666a471b12f6d322513806a2cfc0f2183c2d

// Função para abrir a modal
function showModal(piloto) {
    const infoCard = document.getElementById("infoCard");
    const nomeCard = document.getElementById("nomeCard");
    const imagemCard = document.getElementById("imagemCard");
    const equipeCard = document.getElementById("equipeCard");
    const nacionalidadeCard = document.getElementById("nacionalidadeCard");
    const numeroCard = document.getElementById("numeroCard");

<<<<<<< HEAD
    nomeCard.textContent = piloto.full_name;
    imagemCard.src = piloto.headshot_url;
    equipeCard.textContent = `Equipe: ${piloto.team_name}`;
    nacionalidadeCard.textContent = `Nacionalidade: ${piloto.country_code}`;
    numeroCard.textContent = `Número: ${piloto.driver_number}`;

    infoCard.style.display = "block";
}

// Função para fechar a modal
const fecharInfos = document.getElementById("close-btn");
fecharInfos.addEventListener("click", () => {
    const infoCard = document.getElementById("infoCard");
    infoCard.style.display = "none";
});

// Fechar a modal quando clicar fora da modal
window.addEventListener("click", (event) => {
    const infoCard = document.getElementById("infoCard");
    if (event.target === infoCard) {
        infoCard.style.display = "none";
    }
});

// Filtro de pesquisa
pesquisarHome.addEventListener("input", (event) => {
    const pesquisarEquipe = event.target.value.toLowerCase();

    // Limpa os cards exibidos antes de exibir os filtrados
    containerCards.innerHTML = '';

    // Filtra a lista de pilotos com base no nome da equipe
    const filtroPilotos = [...objetoPilotos].filter((piloto) => {
        const nomeEquipe = piloto.team_name || ''; // Verifica se existe o nome da equipe
        return nomeEquipe.toLowerCase().includes(pesquisarEquipe);
    });

    // Exibe os cards filtrados
    filtroPilotos.forEach((piloto) => {
        const card = createCard(piloto);
        containerCards.appendChild(card);
    });
});



=======
>>>>>>> 18c4666a471b12f6d322513806a2cfc0f2183c2d
