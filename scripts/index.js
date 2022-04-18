const formLogin = document.getElementById("form_login");
const btnEnviar = document.getElementById("btnSubmit");
const email = document.getElementById("email");
const password = document.getElementById("password");
/* const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%¨&*-+_]).{8,25}$/;
const passwordTest = regEx.test(password.value); */

const route = {
  users: "/users",
  login: "/users/login",
  tasks: "/tasks"
};

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


const limparErro = (campo) => {
  if (campo.classList.contains("error")) {
    campo.classList.remove("error");
    campo.nextSibling.remove();
    error--;
  }
};

btnEnviar.disabled = true;
let error = 0;

email.addEventListener("blur", ()=>{
  if (email.value.length < 5) {
    if(email.classList.contains("error")){
      console.log("já contem a classe error");
    } else {
    email.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Insira um email válido";
    email.after(erro);
    error++;
    }
  }else{
    limparErro(email);
  }
});

password.addEventListener("blur", ()=>{
  if (password.value.length < 8) {
    if(password.classList.contains("error")){
      console.log("já contem a classe error");
      console.log(error);
    } else {
    password.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Senha inválida";
    password.after(erro);
    error++;
    }
  }else{
    limparErro(password);
  }
});

if (error === 0) {
  btnEnviar.disabled = false;
  /*
  limparErro(nome);
  limparErro(sobrenome);
  limparErro(email);
  limparErro(password);
  limparErro(confpassword); */
  };

btnEnviar.addEventListener("click", function (event) {
  const login = {
    email: email.value,
    password: password.value
  };
  const url = window.linkAPI + route.login;
  event.preventDefault();
    // Exibe o spinner
    showSpinner();

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (usuario) {
          if(usuario.jwt){
          localStorage.setItem("jwt", usuario.jwt)
          window.location.href = "tasks.html"
          } else {
            // Esconde o spinner
            hideSpinner();
            alert(" erro ")
          }
        })
        .catch((erro) => alert(erro));
  function limpaCamposFormulario() {
    email.value = "";
    password.value = "";
  }
});

//window puxa a função lá do utils.js
//chamada para recebermos o jwt
//  window.chamadaAPI("users/login", "POST", undefined, data)
//Obter o jwt pra salvar no localStorage
    //.then((dados) => localStorage.setItem("jwt", dados.jwt));
