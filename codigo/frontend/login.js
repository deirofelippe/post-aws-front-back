function login() {
  const login = {
    email: "",
    senha: "",
  };

  login.email = this.document.getElementById("email").value;
  login.senha = this.document.getElementById("senha").value;

  const urlProd = "http://18.231.40.15:8000";
  const urlLocal = "http://localhost:8000";
  let url = urlProd;

  fetch(url + "/login", {
    body: JSON.stringify(login),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      //   console.log(res);
      if (res.status === 200) {
        alert("Usuário logado!!");
        return;
      }
      alert("Email ou senha estão inválidos.");
    })
    .catch((error) => {
      console.error(error);
      alert("Ihhh");
    });
}

/* quando clicar no botão de login, executa o login() */
document.getElementById("login").addEventListener("click", function (event) {
  /* preventDefault não deixa a página ser atualizada quando aperta o botão de submit */
  event.preventDefault();
  login();
});

window.addEventListener("load", (event) => {
  this.document.getElementById("email").value = "teste@frontend.com.br";
  this.document.getElementById("senha").value = "front";
});
