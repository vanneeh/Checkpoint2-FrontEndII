const formRegister = document.getElementById("form_register");
const btnCadastrar = document.getElementById("btnCadastrar");
const nome = document.getElementById("firstName");
const sobrenome = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confpassword = document.getElementById("confPassword");
/* const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%¨&*-+_]).{8,25}$/g; */


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


const route = {
  users: "/users",
  login: "/users/login",
  tasks: "/tasks"
};

const limparErro = (campo) => {
  if (campo.classList.contains("error")) {
    campo.classList.remove("error");
    campo.nextSibling.remove();
    error--;
  }
};

btnCadastrar.disabled = true;
let error = 0;

nome.addEventListener("blur", () => {
  if (nome.value.length < 2) {
    if (nome.classList.contains("error")) {
      console.log("já contem a classe error");
    } else {
      nome.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "Informe o nome completo";
      nome.after(erro);
      error++;
    }
  } else {
    limparErro(nome);
  }
});

sobrenome.addEventListener("blur", () => {
  if (sobrenome.value.length < 2) {
    if (sobrenome.classList.contains("error")) {
      console.log("já contem a classe error");
    } else {
      sobrenome.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "Sobrenome não deve ser abreviado";
      sobrenome.after(erro);
      error++;
    }
  } else {
    limparErro(sobrenome);
  }
});

email.addEventListener("blur", () => {
  if (email.value === "" || email.value.length < 5) {
    if (email.classList.contains("error")) {
      console.log("já contem a classe error");
    } else {
      email.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "Insira um email válido";
      email.after(erro);
      error++;
    }
  } else {
    limparErro(email);
  }
});
password.addEventListener("blur", () => {
  /*
  const passwordTest = regEx.test(password.value);
  console.log(passwordTest);
  console.log(password.value); */
  if (password.value.length < 8) {
    if (password.classList.contains("error")) {
      console.log("já contem a classe error");
      console.log(error);
    } else {
      password.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "Senha inválida";
      password.after(erro);
      error++;
    }
  } else {
    limparErro(password);
  }
});

confpassword.addEventListener("blur", () => {
  if (confpassword.value === "" || confpassword.value !== password.value) {
    if (confpassword.classList.contains("error")) {
      console.log("já contem a classe error");
    } else {
      confpassword.classList.add("error");
      const erro = document.createElement("small");
      erro.innerText = "As senhas não conferem";
      confpassword.after(erro);
      error++;
    }
  } else {
    limparErro(confpassword);
  }
});

if (error === 0) {
  btnCadastrar.disabled = false;
  /*
  limparErro(nome);
  limparErro(sobrenome);
  limparErro(email);
  limparErro(password);
  limparErro(confpassword); */
}

btnCadastrar.addEventListener("click", function (event) {
  event.preventDefault();
  // Exibe o spinner
  showSpinner();
  console.log("enviado");

  const userRegister = {
    firstName: nome.value,
    lastName: sobrenome.value,
    email: email.value,
    password: password.value
  };

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
      if (usuario.jwt) {
        localStorage.setItem("jwt", usuario.jwt)
        console.log(localStorage.getItem("jwt"));
        window.location.href = "tasks.html";
      } else {
        // Esconde o spinner
        hideSpinner();
        alert(" erro ")
      }
    })
    .catch((erro) => alert(erro));

  function limparCampo() {
    nome.value = "";
    sobrenome.value = "";
    email.value = "";
    password.value = "";
    confpassword.value = "";
  }
});