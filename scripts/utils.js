window.linkAPI = "https://ctd-todo-api.herokuapp.com/v1";


//Obter valores do form

/* window.getValue = function(elementId){
    return document.getElementById(elementId).value;
}; */

//Fetch para API
window.chamadaAPI = function(caminho, metodo, jwt, dados){
    return fetch(window.linkAPI+caminho,{
        method: metodo,
        headers: {
            'Content-type': 'application/json',
            authorization: jwt
        },
        body: JSON.stringify(dados),
    }).then((resp) => resp.json())
}

