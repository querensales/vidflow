const containerVideos = document.querySelector(".videos__container");

const api = fetch("http://localhost:3000/videos")
    .then(res => res.json())
    .then((videos) =>
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
        })
    )

    .catch((error) => {
        console.error("Erro ao carregar os vídeos:", error);
        containerVideos.innerHTML = "<p>Não foi possível carregar os vídeos.</p>";
    });