const containerVideos = document.querySelector(".videos__container");


async function buscarEmostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json();
        videos.forEach((video) => {
            containerVideos.innerHTML += `
            <li class="videos__item">
            <iframe src="${video.url}" title="${video.title}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
            </li>
        `;
        });

    } catch (error) {
        containerVideos.innerHTML = `<p class="error">Erro ao carregar os vídeos: ${error.message}</p>`;
    }
}
buscarEmostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const termo = barraDePesquisa.value.toLowerCase();
    const videos = document.querySelectorAll(".videos__item");

    for (const video of videos) {
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
        const descricao = video.querySelector(".titulo-canal").textContent.toLowerCase();
        video.style.display = (titulo.includes(termo) || descricao.includes(termo)) ? "block" : "none";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        let nomeCategoria = botao.getAttribute("name").toLowerCase();
        botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
    });
});

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for (let video of videos) {
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
        video.style.display = titulo.includes(filtro) ? "block" : "none";
    }
}