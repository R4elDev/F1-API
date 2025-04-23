const pesquisarHome = document.querySelector("#pesquisarHome");
const containerCards = document.getElementById("containerCards");
const objetoPilotos = new Set(); // Para armazenar pilotos únicos

// Função para buscar os dados da API
fetch("https://api.openf1.org/v1/drivers")
    .then((response) => response.json())
    .then((data) => {
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

    const paiRetangulo = document.createElement('div')

    const paiImagem = document.createElement("div")
    paiImagem.className = "paiImagem"
    
    const retangulo = document.createElement("div")
    retangulo.className = "retangulo"

    const nomeFrente = document.createElement("p")
    nomeFrente.className = "nomeFrente"

    const img = document.createElement("img");
    img.className = "imagemCard"
    
    nomeFrente.textContent = piloto.broadcast_name;
    img.src = piloto.headshot_url || "User Male.png";
    

    paiRetangulo.appendChild(retangulo)
    paiRetangulo.appendChild(nomeFrente);
    cardFront.appendChild(paiRetangulo);
    paiImagem.appendChild(img);
    cardFront.appendChild(paiImagem);

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

//função para mostrar a modal com as informações
function showModal(piloto) {
    const infoCard = document.getElementById("infoCard");
    const nomeCard = document.getElementById("nomeCard");
    const imagemCard = document.getElementById("imagemCard");
    const equipeCard = document.getElementById("equipeCard");
    const nacionalidadeCard = document.getElementById("nacionalidadeCard");
    const numeroCard = document.getElementById("numeroCard");

    nomeCard.textContent = piloto.full_name.toUpperCase();
    imagemCard.src = piloto.headshot_url || "User Male.png";
    equipeCard.textContent = `Equipe: ${piloto.team_name || "N/A"}`;
    nacionalidadeCard.textContent = `Nacionalidade: ${piloto.country_code || "N/A"}`;
    numeroCard.textContent = `Número: ${piloto.driver_number || "N/A"}`;

    infoCard.style.display = "flex";
}

const fecharInfos = document.getElementById("close-btn");
fecharInfos.addEventListener("click", () => {
    document.getElementById("infoCard").style.display = "none";
});

window.addEventListener("click", (e) => {
    const infoCard = document.getElementById("infoCard");
    if (e.target === infoCard) {
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


