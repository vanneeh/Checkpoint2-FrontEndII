const formRegister = document.getElementById("form_register");
const btnCadastrar = document.getElementById("btnCadastrar");
const nome = document.getElementById("firstName");
const sobrenome = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confpassword = document.getElementById("confPassword");
const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%¨&*-+_]).{8,25}$/;
const passwordTest = regEx.test(password.value);


const userRegister = {
  firstName: nome.value,
  lastName: sobrenome.value,
  email: email.value,
  password: password.value
};


const route = {
  users: "/users",
  login: "/users/login",
  tasks: "/tasks"
};

const limparErro = (campo) => {
  if (campo.classList.contains("error")) {
    campo.classList.remove("error");
    campo.nextSibling.remove();
  }
};

btnCadastrar.addEventListener("click", function (event) {
  event.preventDefault();
  limparErro(nome);
  limparErro(sobrenome);
  limparErro(email);
  limparErro(password);
  limparErro(confpassword);

  if (nome.value.lenght < 2 || nome.value === "" ) {
    nome.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Informe o nome completo";
    nome.after(erro);
  } else if (sobrenome.value === "" || sobrenome.value.lenght < 2) {
    sobrenome.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Apelido precisa ter ao menos 8 caracteres";
    sobrenome.after(erro);
  } else if (email.value === "" || email.value < 5) {
    email.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Insira um email válido";
    email.after(erro);
  } else if (passwordTest == false ) {
    password.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "Senha inválida";
    password.after(erro);
  } else if (confpassword.value !== password.value) {
    confpassword.classList.add("error");
    const erro = document.createElement("small");
    erro.innerText = "As senhas não conferem";
    confpassword.after(erro);
  }  else {
    console.log("enviado");
    const url = window.linkAPI + route.users;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userRegister)
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (usuario) {
    localStorage.setItem("jwt", usuario.jwt)
    window.location.href = "tasks.html"
  });
function limparCampo() {
  nome.value = "";
  sobrenome.value = "";
  email.value = "";
  password.value = "";
  confpassword.value = "";
}
    }
});