const cadastros = [
    {
        chave: "multipage.pages.dev",
        nome: "Multipage",
        url: "multipage.pages.dev",
        urlCompleta: "https://multipage.pages.dev/",
        categoria: "Criação de Sites",
        data: "22/09/2026",
        descricao:
            "Plataforma e projeto voltado para criação e desenvolvimento de sites."
    },

    {
        chave: "prsauto.pages.dev",
        nome: "PRS AUTO - CARROS",
        url: "prsauto.pages.dev",
        urlCompleta: "https://prsauto.pages.dev/",
        categoria: "Empresas",
        data: "22/09/2026",
        descricao:
            "Site institucional da PRS AUTO."
    },

    {
        chave: "cadastrodesites.pages.dev",
        nome: "Cadastro de Sites",
        url: "cadastrodesites.pages.dev",
        urlCompleta: "https://cadastrodesites.pages.dev/",
        categoria: "Tecnologia",
        data: "22/09/2026",
        descricao:
            "Diretório para encontrar e divulgar sites na internet."
    }
];


/* =========================================
   UTILIDADES
========================================= */

function normalizar(valor) {
    return String(valor || "")
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/+$/, "");
}


function buscarSite(chave) {
    const procurado = normalizar(chave);

    return cadastros.find(site =>
        normalizar(site.chave) === procurado
    );
}


function buscarCategoria(nome) {
    const procurada = String(nome || "")
        .trim()
        .toLowerCase();

    return cadastros.filter(site =>
        site.categoria.toLowerCase() === procurada
    );
}


/* =========================================
   URL BASE
========================================= */

function urlAtual() {
    return window.location.pathname;
}


function linkSite(chave) {
    return urlAtual() + "?c=" + encodeURIComponent(chave);
}


function linkCategoria(categoria) {
    return urlAtual() + "?categoria=" + encodeURIComponent(categoria);
}


/* =========================================
   CARD
========================================= */

function criarCard(site, numero) {

    return `
        <article class="site-card">

            <div class="card-topo">

                <span class="card-numero">
                    ${String(numero).padStart(3, "0")}
                </span>

                <a
                    class="card-categoria"
                    href="${linkCategoria(site.categoria)}"
                >
                    ${site.categoria.toUpperCase()}
                </a>

            </div>


            <div class="card-conteudo">

                <h3>${site.nome}</h3>

                <div class="url">
                    ${site.url}
                </div>

                <p>
                    ${site.descricao}
                </p>

            </div>


            <div class="card-rodape">

                <span>
                    ${site.data}
                </span>

                <a href="${linkSite(site.chave)}">
                    VER CADASTRO →
                </a>

            </div>

        </article>
    `;
}


/* =========================================
   PÁGINA INICIAL
========================================= */

function mostrarTodos(lista) {

    const container = document.getElementById("listaSites");

    if (!container) return;

    container.innerHTML = "";

    lista.forEach((site, index) => {
        container.innerHTML += criarCard(site, index + 1);
    });
}


/* =========================================
   CATEGORIA
========================================= */

function mostrarCategoria(nomeCategoria) {

    const encontrados = buscarCategoria(nomeCategoria);

    const container = document.getElementById("listaSites");

    if (!container) return;

    container.innerHTML = "";

    if (encontrados.length === 0) {

        container.innerHTML = `
            <div class="mensagem-vazia">
                <span>404</span>
                <h3>CATEGORIA NÃO ENCONTRADA</h3>
                <p>
                    Nenhum site foi encontrado nesta categoria.
                </p>

                <a href="${urlAtual()}">
                    ← VOLTAR PARA TODOS OS SITES
                </a>
            </div>
        `;

        return;
    }


    encontrados.forEach((site, index) => {

        container.innerHTML += criarCard(
            site,
            index + 1
        );

    });
}


/* =========================================
   CADASTRO INDIVIDUAL
========================================= */

function mostrarCadastro(chave) {

    const site = buscarSite(chave);

    const container = document.getElementById("listaSites");

    if (!container) return;


    if (!site) {

        container.innerHTML = `
            <div class="mensagem-vazia">

                <span>404</span>

                <h3>SITE NÃO ENCONTRADO</h3>

                <p>
                    O cadastro solicitado não existe
                    neste diretório.
                </p>

                <a href="${urlAtual()}">
                    ← VOLTAR PARA TODOS OS SITES
                </a>

            </div>
        `;

        return;
    }


    container.innerHTML = `

        <article class="cadastro-individual">

            <div class="individual-cabecalho">

                <span>
                    CADASTRO Nº
                    ${String(
                        cadastros.indexOf(site) + 1
                    ).padStart(3, "0")}
                </span>

                <span>
                    ${site.categoria.toUpperCase()}
                </span>

            </div>


            <div class="individual-corpo">

                <div class="individual-selo">
                    ◆
                </div>

                <div>

                    <h3>
                        ${site.nome}
                    </h3>

                    <div class="individual-url">
                        ${site.url}
                    </div>

                </div>

            </div>


            <div class="individual-info">

                <div>
                    <small>CATEGORIA</small>
                    <strong>
                        ${site.categoria}
                    </strong>
                </div>

                <div>
                    <small>CADASTRADO EM</small>
                    <strong>
                        ${site.data}
                    </strong>
                </div>

                <div>
                    <small>ENDEREÇO</small>
                    <strong>
                        ${site.url}
                    </strong>
                </div>

            </div>


            <div class="individual-descricao">

                <small>DESCRIÇÃO</small>

                <p>
                    ${site.descricao}
                </p>

            </div>


            <div class="individual-acoes">

                <a
                    href="${site.urlCompleta}"
                    target="_blank"
                    rel="noopener"
                >
                    VISITAR SITE ↗
                </a>

                <a href="${urlAtual()}">
                    ← TODOS OS SITES
                </a>

            </div>

        </article>

    `;
}


/* =========================================
   CATEGORIAS
========================================= */

function mostrarCategorias() {

    const container =
        document.getElementById("listaCategorias");

    if (!container) return;

    const categorias = [
        ...new Set(
            cadastros.map(site => site.categoria)
        )
    ];

    container.innerHTML = "";

    categorias.forEach(categoria => {

        const quantidade =
            buscarCategoria(categoria).length;

        container.innerHTML += `

            <a href="${linkCategoria(categoria)}">

                <span>
                    ${categoria}
                </span>

                <b>
                    ${String(quantidade).padStart(2, "0")}
                </b>

            </a>

        `;

    });
}


/* =========================================
   EXECUÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const cadastro =
            parametros.get("c");

        const categoria =
            parametros.get("categoria");


        /*
            PRIORIDADE:

            ?c=...
            depois
            ?categoria=...
            depois
            todos
        */

        if (cadastro) {

            mostrarCadastro(cadastro);

        } else if (categoria) {

            mostrarCategoria(categoria);

        } else {

            mostrarTodos(cadastros);

        }


        mostrarCategorias();

    }
);
