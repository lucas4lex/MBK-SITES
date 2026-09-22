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


/* ========================================
   FUNÇÕES
======================================== */

function normalizarChave(valor) {

    return String(valor || "")
        .toLowerCase()
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");

}


function encontrarCadastro(chave) {

    const chaveNormalizada =
        normalizarChave(chave);

    return cadastros.find(function(cadastro) {

        return normalizarChave(cadastro.chave)
            === chaveNormalizada;

    });

}


function encontrarCategoria(categoria) {

    const nome =
        String(categoria || "")
            .trim()
            .toLowerCase();

    return cadastros.filter(function(cadastro) {

        return cadastro.categoria
            .trim()
            .toLowerCase()
            === nome;

    });

}


function listarCategorias() {

    return [
        ...new Set(
            cadastros.map(function(cadastro) {
                return cadastro.categoria;
            })
        )
    ];

}


function quantidadeCategoria(categoria) {

    return encontrarCategoria(categoria).length;

}


/* ========================================
   INICIALIZAÇÃO DA PÁGINA
======================================== */

document.addEventListener("DOMContentLoaded", function() {

    const listaSites =
        document.getElementById("listaSites");

    const listaCategorias =
        document.getElementById("listaCategorias");

    const resultado =
        document.getElementById("resultado");


    if (!listaSites || !listaCategorias) {
        return;
    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const chave =
        parametros.get("c");

    const categoria =
        parametros.get("categoria");


    /* ====================================
       CARDS
    ==================================== */

    function criarCard(cadastro) {

        const card =
            document.createElement("article");

        card.className = "site-card";

        card.innerHTML = `
            <div class="card-categoria">
                <a href="?categoria=${encodeURIComponent(cadastro.categoria)}">
                    ${cadastro.categoria}
                </a>
            </div>

            <h2>
                ${cadastro.nome}
            </h2>

            <div class="card-url">
                ${cadastro.url}
            </div>

            <p>
                ${cadastro.descricao}
            </p>

            <a href="?c=${encodeURIComponent(cadastro.chave)}">
                VER CADASTRO →
            </a>
        `;

        listaSites.appendChild(card);
    }


    /* ====================================
       SITE INDIVIDUAL
    ==================================== */

    if (chave) {

        const cadastro =
            encontrarCadastro(chave);


        if (cadastro) {

            resultado.innerHTML = `
                <section class="pagina-site">

                    <div class="etiqueta">
                        SITE CADASTRADO
                    </div>

                    <h1>
                        ${cadastro.nome}
                    </h1>

                    <div class="endereco">
                        ${cadastro.url}
                    </div>

                    <p class="descricao">
                        ${cadastro.descricao}
                    </p>

                    <div class="informacoes">

                        <div>
                            <small>CATEGORIA</small>

                            <strong>
                                <a href="?categoria=${encodeURIComponent(cadastro.categoria)}">
                                    ${cadastro.categoria}
                                </a>
                            </strong>
                        </div>

                        <div>
                            <small>CADASTRADO EM</small>
                            <strong>${cadastro.data}</strong>
                        </div>

                    </div>

                    <a
                        href="${cadastro.urlCompleta}"
                        target="_blank"
                        rel="noopener"
                        class="botao"
                    >
                        VISITAR SITE →
                    </a>

                </section>
            `;

        }


        else {

            resultado.innerHTML = `
                <section class="pagina-site erro">

                    <div class="etiqueta">
                        NÃO ENCONTRADO
                    </div>

                    <h1>
                        Site não encontrado
                    </h1>

                    <p>
                        Não existe cadastro para:
                    </p>

                    <code>${chave}</code>

                </section>
            `;

        }


        cadastros.forEach(criarCard);

    }


    /* ====================================
       CATEGORIA
    ==================================== */

    else if (categoria) {

        const resultados =
            encontrarCategoria(categoria);


        resultado.innerHTML = `
            <section class="pagina-site">

                <div class="etiqueta">
                    CATEGORIA
                </div>

                <h1>
                    ${categoria}
                </h1>

                <p class="descricao">
                    Sites cadastrados nesta categoria.
                </p>

                <div class="contador">
                    ${resultados.length} site(s) encontrado(s)
                </div>

            </section>
        `;


        resultados.forEach(criarCard);

    }


    /* ====================================
       INICIAL
    ==================================== */

    else {

        resultado.innerHTML = `
            <section class="hero">

                <div class="etiqueta">
                    DIRETÓRIO DE SITES
                </div>

                <h1>
                    Encontre sites
                    <br>
                    na internet.
                </h1>

                <p>
                    Um catálogo simples,
                    rápido e organizado para
                    descobrir novos sites.
                </p>

                <div class="exemplo-url">
                    cadastrodesites.pages.dev/?c=seusite.com
                </div>

            </section>
        `;


        cadastros.forEach(criarCard);

    }


    /* ====================================
       CATEGORIAS
       SEMPRE MOSTRA
    ==================================== */

    listarCategorias().forEach(function(nomeCategoria) {

        const link =
            document.createElement("a");

        link.href =
            "?categoria=" +
            encodeURIComponent(nomeCategoria);

        link.innerHTML = `
            <span>
                ${nomeCategoria}
            </span>

            <small>
                ${quantidadeCategoria(nomeCategoria)}
            </small>
        `;

        listaCategorias.appendChild(link);

    });

});
