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

    videos.forEach((video) => {
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
        const descricao = video.querySelector(".titulo-canal").textContent.toLowerCase();

        if (titulo.includes(termo) || descricao.includes(termo)) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    });
}