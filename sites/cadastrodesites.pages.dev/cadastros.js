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


/*
========================================
 NORMALIZAR CHAVE
========================================
*/

function normalizarChave(valor) {

    return valor
        .toLowerCase()
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");

}


/*
========================================
 PROCURAR SITE
========================================
*/

function encontrarCadastro(chave) {

    const chaveNormalizada =
        normalizarChave(chave);

    return cadastros.find(function(cadastro) {

        return normalizarChave(cadastro.chave)
            === chaveNormalizada;

    });

}


/*
========================================
 PROCURAR CATEGORIA
========================================
*/

function encontrarCategoria(categoria) {

    const categoriaNormalizada =
        categoria
            .toLowerCase()
            .trim();

    return cadastros.filter(function(cadastro) {

        return cadastro.categoria
            .toLowerCase()
            .trim()
            === categoriaNormalizada;

    });

}


/*
========================================
 PEGAR CATEGORIAS
========================================
*/

function listarCategorias() {

    return [
        ...new Set(
            cadastros.map(function(cadastro) {
                return cadastro.categoria;
            })
        )
    ];

}


/*
========================================
 CONTAR SITES DA CATEGORIA
========================================
*/

function quantidadeCategoria(categoria) {

    return encontrarCategoria(categoria).length;

}
