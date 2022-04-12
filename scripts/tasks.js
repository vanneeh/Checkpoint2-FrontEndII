const getUser = (jwt) => {
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
    });
};

const code = localStorage.getItem("jwt");

getUser(code);