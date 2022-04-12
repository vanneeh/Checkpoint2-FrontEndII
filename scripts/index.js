const formLogin = document.getElementById("form_login");
const btnEnviar = document.getElementById("btnSubmit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%¨&*-+_]).{8,25}$/;
const passwordTest = regEx.test(password.value);

const route = {
  users: "/users",
  login: "/users/login",
  tasks: "/tasks"
};


const login = {
  email: email.value,
  password: password.value
};
const localStorageKey = "dados: ";

const limparCampo = (campo) => {
  if (campo.classList.contains("error")) {
    campo.classList.remove("error");
    campo.nextSibling.remove();
  }
};

btnEnviar.addEventListener("click", function (event) {
  event.preventDefault();

  limparCampo(email);
  limparCampo(password);

  if (email.value === "" || email.value.lenght < 5) {
    email.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Insira um email válido";
    email.after(erro);
    if (passwordTest == false) {
      password.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "Senha inválida";
      password.after(erro);
    } else {
      console.log("enviado");
      const url = window.linkAPI + route.login;

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
          localStorage.setItem("jwt", usuario.jwt)
          window.location.href = "tasks.html"
        });
    }
  }
  function limpaCamposFormulario() {
    email.value = "";
    password.value = "";
  }
})

//window puxa a função lá do utils.js
//chamada para recebermos o jwt
//  window.chamadaAPI("users/login", "POST", undefined, data)
//Obter o jwt pra salvar no localStorage
    //.then((dados) => localStorage.setItem("jwt", dados.jwt));
