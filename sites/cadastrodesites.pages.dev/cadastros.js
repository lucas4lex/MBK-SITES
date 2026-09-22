/*
    CADASTRO DE SITES
    Dados oficiais do diretório
*/

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


/* =========================
   FUNÇÕES
========================= */

function normalizar(valor) {

    return String(valor || "")
        .toLowerCase()
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");

}


function encontrarCadastro(chave) {

    const valor = normalizar(chave);

    return cadastros.find(function(site) {

        return normalizar(site.chave) === valor;

    });

}


function encontrarCategoria(categoria) {

    const valor = String(categoria || "")
        .trim()
        .toLowerCase();

    return cadastros.filter(function(site) {

        return site.categoria.toLowerCase() === valor;

    });

}


function listarCategorias() {

    return [
        ...new Set(
            cadastros.map(function(site) {
                return site.categoria;
            })
        )
    ];

}


function quantidadeCategoria(categoria) {

    return encontrarCategoria(categoria).length;

}


/* =========================
   LINKS EXTERNOS
========================= */

document.addEventListener("DOMContentLoaded", function() {

    const links = document.querySelectorAll(
        'a[href^="?c="]'
    );

    links.forEach(function(link) {

        link.addEventListener("click", function(event) {

            const url = link.getAttribute("href");

            const parametros = new URLSearchParams(
                url.replace("?", "")
            );

            const chave = parametros.get("c");

            const cadastro = encontrarCadastro(chave);

            if (!cadastro) {

                event.preventDefault();

                alert("Cadastro não encontrado.");

            }

        });

    });

});
