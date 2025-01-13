let track = document.querySelector('.container-cards');
let leftChevron = document.getElementById('left-chevron');
let rightChevron = document.getElementById('right-chevron');

let cardWidth = 300 + 10; 
let positionInitial = 0; 

// Função para atualizar cardWidth conforme o tamanho da tela
function updateCardWidth() {
    if (window.innerWidth < 578) {
        cardWidth = 255 + 10; // Se a tela for menor que 578px, ajusta cardWidth
    } else {
        cardWidth = 300 + 10; // Valor padrão se a tela for maior ou igual a 578px
    }
}

// Atualiza cardWidth ao carregar a página e sempre que a tela for redimensionada
updateCardWidth();
window.addEventListener('resize', updateCardWidth);

rightChevron.addEventListener('click', () => {
    let trackWidth = track.scrollWidth; 
    let containerWidth = document.querySelector('.container-track').offsetWidth;

    if (positionInitial > - (trackWidth - containerWidth)) {
        positionInitial -= cardWidth;
        track.style.transform = `translateX(${positionInitial}px)`;
    }
});

leftChevron.addEventListener('click', () => {
    if (positionInitial < 0) {
        positionInitial += cardWidth;
        track.style.transform = `translateX(${positionInitial}px)`;
    }
});


const equipsDict = {
    "Óculos VR": {
        image: "../static/assets/oculos.png",
        conteudo: "Os óculos 3D criam profundidade ao projetar imagens diferentes para cada olho, aprimorando a imersão visual.",

    },
    "Mouse 3D": {
        image: "../static/assets/mouse.png",
        conteudo: "Os mouses 3D oferecem controle preciso em ambientes virtuais, permitindo movimentos em todas as direções.",

    },
    "Luvas": {
        image: "../static/assets/luvas.png",
        conteudo: "As luvas 3D capturam movimentos manuais, permitindo interação natural e precisa com ambientes virtuais.",

    },
    "Teclados": {
        image: "../static/assets/teclado.jpg",
        conteudo: "Permitem entrada de comandos e dados para interação com sistemas virtuais, similar a um ambiente tradicional.",

    },
    "Rastreadores": {
        image: "../static/assets/rastreador.jpg",
        conteudo: "Monitoram e registram o movimento do usuário, integrando-o com o ambiente virtual para uma experiência mais dinâmica.",
 
    },
    "Reconhecedores de Voz": {
        image: "../static/assets/alexa.jpg",
        conteudo: "Capturam comandos de voz, possibilitando controle por meio de comandos falados.",
 
    },
    "Displays visuais": {
        image: "../static/assets/displayVisual.jpg",
        conteudo: "Oferecem uma experiência visual imersiva.",

    },
    "Displays de áudio": {
        image: "../static/assets/fone.jpg",
        conteudo: "Proporcionam um som espacial envolvente.",

    },
    "Displays hápticos": {
        image: "../static/assets/hapticos.jpg",
        conteudo: "Simulam sensações táteis, adicionando uma dimensão extra à interação.",

    }
};

const containerCards = document.querySelector('.container-cards');

for (const [title, info] of Object.entries(equipsDict)) {
    const card = document.createElement('div');
    card.className = `cards `;
    
    const img = document.createElement('img');
    img.src = info.image;
    img.alt = title;

    const h4 = document.createElement('h4');
    h4.textContent = title;

    const p = document.createElement('p');
    p.className = 'text-equips';
    p.textContent = info.conteudo;

    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(p);
    containerCards.appendChild(card);
}
