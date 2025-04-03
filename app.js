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

// Função para abrir a modal
function showModal(piloto) {
    const infoCard = document.getElementById("infoCard");
    const nomeCard = document.getElementById("nomeCard");
    const imagemCard = document.getElementById("imagemCard");
    const equipeCard = document.getElementById("equipeCard");
    const nacionalidadeCard = document.getElementById("nacionalidadeCard");
    const numeroCard = document.getElementById("numeroCard");

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



