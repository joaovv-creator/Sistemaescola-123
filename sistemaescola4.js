let prompt = require("prompt-sync")();
// Importa a biblioteca 'prompt-sync' para permitir entrada de dados pelo terminal

let alunos = []; // Array de objetos: cada aluno terá nome e curso
let cursos = []; // Array de strings: cada item é o nome de um curso

// --- FUNÇÕES ---

/**
 * Cadastra um novo aluno solicitando o nome ao usuário.
 * Adiciona o aluno ao array 'alunos' com o curso inicial como nulo.
 */
function cadastrarAluno() {
  let nomeAluno = prompt("Digite o nome do aluno:");
  // Verifica se o nome do aluno foi digitado e não está vazio
  if (nomeAluno && nomeAluno.trim() !== "") {
    // Adiciona um novo objeto aluno ao array 'alunos'
    // O aluno é adicionado com o nome digitado e 'curso' como nulo (ainda não matriculado)
    alunos.push({ nome: nomeAluno.trim(), curso: null });
    console.log("Aluno cadastrado com sucesso!");
  } else {
    console.log("Nome inválido.");
  }
}

/**
 * Exclui um aluno existente do array 'alunos' com base no nome.
 * Se o aluno for encontrado, ele é removido.
 */
function excluirAluno() {
  let nomeExcluirAluno = prompt("Digite o nome do aluno a ser excluído:");
  let indexAlunoEncontrado = -1; // Variável para armazenar o índice do aluno
  // Percorre o array de alunos para encontrar o aluno a ser excluído
  for (let i = 0; i < alunos.length; i++) {
    // Compara o nome do aluno atual com o nome a ser excluído
    if (alunos[i].nome === nomeExcluirAluno) {
      indexAlunoEncontrado = i; // Se encontrou, armazena o índice
      break; // Sai do loop
    }
  }
  // Verifica se o aluno foi encontrado
  if (indexAlunoEncontrado !== -1) {
    // Remove o aluno do array 'alunos' usando o índice encontrado
    alunos.splice(indexAlunoEncontrado, 1);
    console.log("Aluno excluído com sucesso!");
  } else {
    console.log("Aluno não encontrado.");
  }
}

/**
 * Cadastra um novo curso solicitando o nome ao usuário.
 * Adiciona o curso ao array 'cursos'.
 */
function cadastrarCurso() {
  let nomeCurso = prompt("Digite o nome do curso:");
  // Verifica se o nome do curso foi digitado e não está vazio
  if (nomeCurso && nomeCurso.trim() !== "") {
    // Adiciona o nome do curso ao array 'cursos'
    cursos.push(nomeCurso.trim());
    console.log("Curso cadastrado com sucesso!");
  } else {
    console.log("Nome inválido.");
  }
}

/**
 * Exclui um curso existente do array 'cursos' com base no nome.
 * Se o curso for encontrado, ele é removido e todos os alunos matriculados nele são desvinculados.
 */
function excluirCurso() {
  let nomeExcluirCurso = prompt("Digite o nome do curso a ser excluído:");
  // Encontra o índice do curso no array 'cursos'
  let indexCursoEncontrado = cursos.indexOf(nomeExcluirCurso);
  // Verifica se o curso foi encontrado
  if (indexCursoEncontrado !== -1) {
    // Remove o curso do array 'cursos'
    cursos.splice(indexCursoEncontrado, 1);
    // Percorre o array de alunos para desvincular o curso excluído
    for (let i = 0; i < alunos.length; i++) {
      // Se o curso do aluno for igual ao curso que foi excluído, define como nulo
      if (alunos[i].curso === nomeExcluirCurso) {
        alunos[i].curso = null;
      }
    }
    console.log("Curso excluído com sucesso!");
  } else {
    console.log("Curso não encontrado.");
  }
}

/**
 * Visualiza as informações de todos os alunos e cursos cadastrados.
 * Exibe se o aluno está matriculado em algum curso ou não.
 */
function visualizarInformacoes() {
  console.log("\nAlunos Cadastrados:");
  // Verifica se existem alunos cadastrados
  if (alunos.length > 0) {
    // Percorre o array de alunos e exibe as informações de cada um
    for (let i = 0; i < alunos.length; i++) {
      // Verifica se o aluno tem um curso matriculado, senão exibe "Não matriculado"
      let statusCurso = alunos[i].curso ? alunos[i].curso : "Não matriculado";
      console.log("- " + alunos[i].nome + " (Curso: " + statusCurso + ")");
    }
  } else {
    console.log("Nenhum aluno cadastrado.");
  }

  console.log("\nCursos Cadastrados:");
  // Verifica se existem cursos cadastrados
  if (cursos.length > 0) {
    // Percorre o array de cursos e exibe o nome de cada um
    for (let i = 0; i < cursos.length; i++) {
      console.log("- " + cursos[i]);
    }
  } else {
    console.log("Nenhum curso cadastrado.");
  }
}

/**
 * Matricula um aluno em um dos cursos disponíveis.
 * Requer que haja alunos e cursos cadastrados.
 */
function matricularAlunoEmCurso() {
  // Verifica se há alunos e cursos cadastrados para poder realizar a matrícula
  if (alunos.length === 0 || cursos.length === 0) {
    console.log(
      "É necessário ter alunos e cursos cadastrados para realizar a matrícula."
    );
    return; // Sai da função
  }

  let nomeMatricula = prompt("Digite o nome do aluno para matrícula:");
  let alunoEncontrado = null; // Variável para armazenar o aluno encontrado
  // Percorre o array de alunos para encontrar o aluno pelo nome
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome === nomeMatricula) {
      alunoEncontrado = alunos[i]; // Atribui o aluno encontrado à variável
      break; // Sai do loop
    }
  }

  // Verifica se o aluno foi encontrado
  if (!alunoEncontrado) {
    console.log("Aluno não encontrado.");
    return; // Sai da função
  }

  // Exibe os cursos disponíveis
  console.log("Cursos disponíveis:");
  // Percorre o array de cursos e exibe cada um com um número para seleção
  for (let i = 0; i < cursos.length; i++) {
    console.log(i + 1 + " - " + cursos[i]);
  }

  let cursoEscolhidoIndex = parseInt(prompt("Escolha o número do curso:")) - 1;

  // Verifica se o número do curso digitado é válido
  if (cursoEscolhidoIndex >= 0 && cursoEscolhidoIndex < cursos.length) {
    // Atribui o curso escolhido ao aluno encontrado
    alunoEncontrado.curso = cursos[cursoEscolhidoIndex];
    console.log(
      "Aluno " +
        alunoEncontrado.nome +
        " matriculado no curso " +
        alunoEncontrado.curso +
        "."
    );
  } else {
    console.log("Curso inválido.");
  }
}

// --- LÓGICA PRINCIPAL ---

let opcao; // Variável que armazenará a opção escolhida no menu
let senhaCorreta = "Senai123"; // Define a senha correta para acesso
let tentativasSenha = 0; // Contador de tentativas de senha

// Loop para solicitação de senha com limite de tentativas
while (tentativasSenha < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar o sistema: ");

  if (senhaDigitada === senhaCorreta) {
    console.log("Senha correta! Acesso concedido.");
    break; // Sai do loop de senha se a senha estiver correta
  } else {
    tentativasSenha++; // Incrementa o contador de tentativas
    // Informa ao usuário quantas tentativas restam
    console.log(
      "Senha incorreta. Tentativas restantes: " + (3 - tentativasSenha)
    );
  }
}

// Verifica se as tentativas de senha foram esgotadas
if (tentativasSenha === 3) {
  console.log("Acesso não autorizado. Você excedeu o número de tentativas.");
  process.exit(); // Encerra o programa
}

// Loop principal do sistema, só é acessado se a senha for validada
do {
  // Exibe o menu principal e armazena a escolha do usuário
  opcao = prompt(
    "Sistema Escolar\n\n" +
      "1 - Cadastrar Aluno\n" +
      "2 - Excluir Aluno\n" +
      "3 - Cadastrar Curso\n" +
      "4 - Excluir Curso\n" +
      "5 - Visualizar Informações\n" +
      "6 - Matricular Aluno em Curso\n" +
      "7 - Sair\n\n" +
      "Escolha uma opção:\n"
  );

  switch (opcao) {
    case "1":
      cadastrarAluno(); // Chama a função para cadastrar aluno
      break;

    case "2":
      excluirAluno(); // Chama a função para excluir aluno
      break;

    case "3":
      cadastrarCurso(); // Chama a função para cadastrar curso
      break;

    case "4":
      excluirCurso(); // Chama a função para excluir curso
      break;

    case "5":
      visualizarInformacoes(); // Chama a função para visualizar informações
      break;

    case "6":
      matricularAlunoEmCurso(); // Chama a função para matricular aluno em curso
      break;

    case "7":
      // Encerra o programa
      console.log("Saindo do sistema...");
      break;

    default:
      // Caso o usuário digite uma opção inválida
      console.log("Opção inválida. Tente novamente.");
  }
} while (opcao !== "7"); // Repete o menu até o usuário escolher sair
