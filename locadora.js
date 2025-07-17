let prompt = require("prompt-sync")();

let clientes = [];
let fitas = [];
let alugueis = [];

function cadastrarCliente() {
  let nome = prompt("Nome do cliente: ");
  let cpf = prompt("CPF do cliente: ");
  let endereco = prompt("Endereço do cliente: ");

  if (nome && cpf && endereco) {
    clientes.push({ nome, cpf, endereco });
    console.log("Cliente cadastrado com sucesso!");
  } else {
    console.log("Dados inválidos.");
  }
}

function excluirCliente() {
  let cpf = prompt("Digite o CPF do cliente a ser excluído: ");
  let index = clientes.findIndex((c) => c.cpf === cpf);
  if (index !== -1) {
    clientes.splice(index, 1);
    console.log("Cliente excluído com sucesso!");
  } else {
    console.log("Cliente não encontrado.");
  }
}

function cadastrarFita() {
  let titulo = prompt("Título da fita: ");
  let diaria = parseFloat(prompt("Valor da diária (R$): "));
  if (titulo && !isNaN(diaria) && diaria > 0) {
    fitas.push({ titulo, diaria });
    console.log("Fita cadastrada com sucesso!");
  } else {
    console.log("Dados inválidos.");
  }
}

function excluirFita() {
  let titulo = prompt("Digite o título da fita a ser excluída: ");
  let index = fitas.findIndex((f) => f.titulo === titulo);
  if (index !== -1) {
    fitas.splice(index, 1);
    console.log("Fita excluída com sucesso!");
  } else {
    console.log("Fita não encontrada.");
  }
}

function visualizarInformacoes() {
  console.log("\nClientes cadastrados:");
  if (clientes.length === 0) console.log("Nenhum cliente.");
  clientes.forEach((c) => {
    console.log(`- ${c.nome} | CPF: ${c.cpf} | Endereço: ${c.endereco}`);
  });

  console.log("\nFitas cadastradas:");
  if (fitas.length === 0) console.log("Nenhuma fita.");
  fitas.forEach((f) => {
    console.log(`- ${f.titulo} | Diária: R$${f.diaria.toFixed(2)}`);
  });

  console.log("\nAluguéis registrados:");
  if (alugueis.length === 0) console.log("Nenhum aluguel.");
  alugueis.forEach((a) => {
    console.log(
      `- ${a.cliente} alugou "${a.fita}" por ${
        a.dias
      } dias (Total: R$${a.total.toFixed(2)})`
    );
  });
}

function alugarFita() {
  if (clientes.length === 0 || fitas.length === 0) {
    console.log("É necessário ter clientes e fitas cadastrados.");
    return;
  }

  let cpf = prompt("CPF do cliente: ");
  let cliente = clientes.find((c) => c.cpf === cpf);
  if (!cliente) {
    console.log("Cliente não encontrado.");
    return;
  }

  console.log("\nFitas disponíveis:");
  fitas.forEach((f, i) =>
    console.log(`${i + 1} - ${f.titulo} (R$${f.diaria.toFixed(2)} por dia)`)
  );
  let escolha = parseInt(prompt("Escolha o número da fita: ")) - 1;

  if (escolha < 0 || escolha >= fitas.length) {
    console.log("Fita inválida.");
    return;
  }

  let dias = parseInt(prompt("Por quantos dias deseja alugar? "));
  if (isNaN(dias) || dias <= 0) {
    console.log("Quantidade de dias inválida.");
    return;
  }

  let fita = fitas[escolha];
  let total = dias * fita.diaria;
  alugueis.push({
    cliente: cliente.nome,
    fita: fita.titulo,
    dias,
    total,
  });

  console.log(
    `Fita "${fita.titulo}" alugada para ${
      cliente.nome
    }. Total: R$${total.toFixed(2)}`
  );
}

let tentativas = 0;
const senhaCorreta = "Senai123";

while (tentativas < 3) {
  let senha = prompt("Digite a senha para acessar o sistema: ");
  if (senha === senhaCorreta) {
    console.log("Acesso liberado!");
    break;
  } else {
    tentativas++;
    console.log(`Senha incorreta. Tentativas restantes: ${3 - tentativas}`);
  }
}

if (tentativas === 3) {
  console.log("Acesso negado.");
  process.exit();
}

let opcao;

do {
  opcao = prompt(
    "\nSistema de Locadora\n\n" +
      "1 - Cadastrar Cliente\n" +
      "2 - Excluir Cliente\n" +
      "3 - Cadastrar Fita\n" +
      "4 - Excluir Fita\n" +
      "5 - Visualizar Informações\n" +
      "6 - Alugar Fita\n" +
      "7 - Sair\n\n" +
      "Escolha uma opção: "
  );

  switch (opcao) {
    case "1":
      cadastrarCliente();
      break;
    case "2":
      excluirCliente();
      break;
    case "3":
      cadastrarFita();
      break;
    case "4":
      excluirFita();
      break;
    case "5":
      visualizarInformacoes();
      break;
    case "6":
      alugarFita();
      break;
    case "7":
      console.log("Saindo do sistema...");
      break;
    default:
      console.log("Opção inválida.");
  }
} while (opcao !== "7");
