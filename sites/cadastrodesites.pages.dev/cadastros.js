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
        chave: "litecom.pages.dev",

        nome: "LiteCom",

        url: "litecom.pages.dev",

        urlCompleta: "https://litecom.pages.dev/",

        categoria: "Empresas",

        data: "22/09/2026",

        descricao:
            "Site institucional da LiteCom."
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
 * PROCURA UM SITE
 */

function encontrarCadastro(chave) {

    chave =
        chave
            .toLowerCase()
            .trim()
            .replace(/^https?:\/\//, "")
            .replace(/\/$/, "");

    return cadastros.find(function(cadastro) {

        return cadastro.chave
            .toLowerCase()
            .replace(/^https?:\/\//, "")
            .replace(/\/$/, "")
            === chave;

    });

}
