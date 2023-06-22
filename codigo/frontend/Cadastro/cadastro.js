var temErro = false;
const usuario = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  data: "",
  senha: "",
};

function validarFormularioCadastro() {
  temErro = false;

  validarNome();
  validarCPF();
  validarTelefone();
  validarEmail();
  validarSenha();
}

function validarNome() {
  let nome = this.document.getElementById("nome").value;
  usuario.nome = nome;

  if (nome === "") {
    alert("Nome não pode estar vazio.");
    temErro = true;
  }

  const possuiAlgumNumero = /[0-9]/.test(nome);
  if (possuiAlgumNumero) {
    alert("Nome não pode conter número.");
    temErro = true;
  }
}

function validarCPF() {
  let cpf = this.document.getElementById("cpf").value;
  usuario.cpf = cpf;

  if (cpf === "") {
    alert("CPF não pode estar vazio.");
    temErro = true;
  }

  if (cpf.length != 11) {
    alert("CPF deve conter somente 11 números.");
    temErro = true;
  }

  /* cpf deve ter de 0 a 9 ([0-9]), nenhuma ou várias vezes (*), no inicio (^) ao fim ($) */
  const possuiSomenteNumeros = /^[0-9]*$/.test(cpf);
  if (!possuiSomenteNumeros) {
    alert("CPF deve conter somente números.");
    temErro = true;
  }
}

function validarTelefone() {
  let telefone = this.document.getElementById("telefone").value;
  usuario.telefone = telefone;

  if (telefone === "") {
    alert("Telefone não pode estar vazio.");
    temErro = true;
  }

  /* telefone possui alguma letra de a à z minúsculo ou maiúsculo ([a-zA-Z]) */
  const possuiAlgumaLetra = /[a-zA-Z]/.test(telefone);
  if (possuiAlgumaLetra) {
    alert("Telefone deve conter somente números.");
    temErro = true;
  }
  if (telefone.length < 8 || telefone.length > 11) {
    alert("Telefone deve conter entre 8 e 11 números.");
    temErro = true;
  }
}

function validarEmail() {
  let email = this.document.getElementById("email").value;
  usuario.email = email;

  if (email === "") {
    alert("Email não pode estar vazio.");
    temErro = true;
  }

  const possuiFormatoDeEmail = /@/.test(email);
  if (!possuiFormatoDeEmail) {
    alert("Email deve possuir formato de email.");
    temErro = true;
  }
}

function validarSenha() {
  let senha = this.document.getElementById("senha").value;
  let confirmar_senha = this.document.getElementById("confirmar_senha").value;
  usuario.senha = senha;

  if (senha === "") {
    alert("Senha não pode estar vazia.");
    temErro = true;
  }

  if (confirmar_senha === "") {
    alert("Senha não pode estar vazia.");
    temErro = true;
  }

  if (confirmar_senha !== senha) {
    alert("Senha e confirmar senha devem ser iguais.");
    temErro = true;
  }
}

function cadastrar() {
  usuario.data = this.document.getElementById("data").value;

  const urlProd = "http://34.210.131.6:8000";
  const urlLocal = "http://localhost:8000";
  let url = urlProd;

  fetch(url + "/usuario", {
    body: JSON.stringify(usuario),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        alert("Usuário cadastrado!!");
        return;
      }
      alert("Houve algum problema.");
    })
    .catch(() => {
      console.error(error);
      alert("Ihhh");
    });
}

/* quando clicar no botão de entrar, executa o validarFormularioCadastro */
document.getElementById("entrar").addEventListener("click", function (event) {
  /* preventDefault não deixa a página ser atualizada quando aperta o botão de submit */
  event.preventDefault();
  validarFormularioCadastro();
  if (!temErro) {
    cadastrar();
  }
});

window.addEventListener("load", (event) => {
  this.document.getElementById("nome").value = "Teste Frontend";
  this.document.getElementById("data").value = "2023-07-16";
  this.document.getElementById("cpf").value = "59180508090";
  this.document.getElementById("telefone").value = "21912345678";
  this.document.getElementById("email").value = "teste@frontend.com.br";
  this.document.getElementById("senha").value = "front";
  this.document.getElementById("confirmar_senha").value = "front";
});
