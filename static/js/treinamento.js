document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os elementos com a classe 'header-area'
    const headers = document.querySelectorAll('.header-area');
    
    headers.forEach(function(header) {
        // Adiciona um listener de evento de clique para cada 'header-area'
        header.addEventListener('click', function() {


            // Seleciona o elemento pai (div.area) do header atual
            const area = header.closest('.area');
            // Seleciona o elemento 'body-area' dentro da área atual
            const bodyArea = area.querySelector('.body-area');
            // Seleciona o icone da flecha do header
            const spanEl = header.querySelector('.arrow-treinamento');
            // Alterna a classe do icone da flecha para abrir e fechar
            spanEl.classList.toggle('aberto');
            
            // Alterna o display entre 'none' e 'flex' do corpo da área
            if (bodyArea.style.display === 'flex') {
                bodyArea.style.display = 'none';
            } else {
                bodyArea.style.display = 'flex';
            }
        });
    });
});