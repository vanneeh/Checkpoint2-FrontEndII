// Obtem o spinner que está na tela
const spinner = document.querySelector(".spinner-container");

// Função que exibe o spinner
const showSpinner = () => {
    spinner.classList.add("show");
};

// Função que esconde o spinner
const hideSpinner = () => {
    spinner.classList.remove("show");
};

const sair = document.getElementById("closeApp");
const code = localStorage.getItem("jwt");

// identificando o usuario
const getUser = (jwt) => {
    // Exibe o spinner
    showSpinner();
    //chamada para identificar o usuario
    fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
        headers: {
            'Content-type': 'application/json',
            authorization: code
        },
    })
        .then((resp) => resp.json())
        .then((usuario) => {
            const el = document.getElementById("userName");
            el.innerHTML = `${usuario.firstName} ${usuario.lastName}`;
            // Esconde o spinner
            hideSpinner();
        })
        .catch((erro) => console.log(erro))
};
getUser(code);

// deslogando o usuario
sair.addEventListener("click", function (e) {
    // Exibe o spinner
    showSpinner();
    localStorage.removeItem("jwt");
    window.location.href = "index.html";
});

//buscando as tarefas do usuario logado
const obterLista = (code) => {
    // Chamada GET para tasks
    // O primeiro argumento é o endereço completo da API, no caso users/getMe é para obter as tarefas
    // Sempre enviamos a informação do Content-type para o servidor entender o tipo de informação que enviamos (uma string em formato JSON)
    // Para informações privadas (ou seja, que só um usuario autenticado pode acessar) precisamo informar o JWT (no authorization do header)
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        headers: {
            "Content-type": "application/json",
            authorization: code
        }
    })
        // O primeiro retorno é um objeto resposta, para acessar o valor da resposta (os dados) precisamos pedir para transformar a resposta em um objeto
        .then((resposta) => resposta.json())
        // O segundo retorno obtem a resposta em formato JSON
        .then((tasks) => {
            console.log(tasks); // Adiciona as tarefas na lista
            document.querySelector(".tarefas-pendentes").innerHTML =
            `<li>Tarefas Pendentes: ${tasks.length}</li>`;
            tasks.forEach(function (tasks) {
                if(tasks.completed == false){
                document.querySelector(".tarefas-pendentes").innerHTML +=
                    `
                     <li class="tarefa">
                     <div id="${tasks.id}" class="not-done"></div>
                     <div class="descricao">
                       <p class="nome">${tasks.description}</p>
                       <p class="timestamp">Criada em: ${tasks.createdAt}</p>
                     </div>
                   </li>
                  `;
                }
            })
            document.querySelector("#skeleton").removeAttribute("id");
        })
        .catch((erro) => console.log(erro))
};

// criando nova tarefa para o usuario logado
const addTask = (code) => {
    const novaTask = document.getElementById("novaTarefa");
    const taskData = {
        "description": novaTask.value,
        "completed": false
    }
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            authorization: code
        },
        body: JSON.stringify(taskData)
    })
        .then(() => {
            obterLista(code)
        })
        .catch((erro) => console.log(erro))
};

// Executa a função passando como argumento o JWT
obterLista(code);

const formTask = document.querySelector(".nova-tarefa")
formTask.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(code);
    console.log("nova tarefa enviada: ");

});