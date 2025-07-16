let prompt = require("prompt-sync")();
let alunos = [];
let cursos = [];
let senha = prompt("Digite uma senha: ");
let opcao;
if (senha === "Senai123") {
  do {
    //Exibe o menu de opções
    opcao = prompt(
      "Sistema Escolar\n\n" +
        "1 - Cadastrar aluno\n" +
        "2 - Excluir aluno\n" +
        "3 - Cadastrar curso\n" +
        "4 - Excluir curso\n\n" +
        "5 - Visualizar Informações\n" +
        "6 - Matricular Aluno em Curso\n" +
        "7 - Sair\n\n" +
        "Escolha uma opção: \n"
    );
    switch (opcao) {
      case "1":
        //Cadstrar aluno
        let nomeAluno = prompt("Digite o nome do aluno: ");
        if (nomeAluno !== null && nomeAluno.trim() !== "") {
          alunos.push({ nome: nomeAluno.trim(), curso: null });
          //Adiciona aluno com curso nulo (não matriculado)
          console.log("Aluno cadstrado com sucesso!");
        } else {
          console.log("Nome inválido.");
        }
        break;
      case "2":
        //Excluir aluno
        let nomeExcluirAluno = prompt("Digite o nome do aluno a Excluir: ");
        let indexAluno = -1;
        for (let i = 0; i < alunos.length; i++) {
          if (alunos[i].nome === nomeExcluirAluno) {
            indexAluno = i;
            break;
          }
        }
        if (indexAluno !== -1) {
          alunos.splice(indexAluno, 1);
          // Remove o aluno do array
          console.log("Aluno excluído com sucesso!");
        } else {
          console.log("Aluno não encontrado.");
        }
        break;
      case "3":
        // Cadastrar de novo curso
        let nomeCurso = prompt("Digite o nome do curso: ");
        if (nomeCurso && nomeCurso.trim() !== "") {
          cursos.push(nomeCurso.trim());
          //Adiciona o curso ao array
          console.log("Curso cadstrado com sucesso");
        } else {
          console.log("Nome inválido.");
        }
        break;
      case "4":
        //Exclusão de curso
        let nomeExcluirCurso = prompt("Digite o nome do curso a excluir: ");
        let indexCurso = cursos.indexOf(nomeExcluirCurso);
        if (indexCurso !== -1) {
          cursos.splice(indexCurso, 1);
          for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].curso === nomeExcluirCurso) {
              alunos[i].curso = null;
            }
          }
          console.log("Curso excluído com sucesso!");
        } else {
          console.log("Curso não encontrado");
        }
        break;
      case "5":
        //Visualizar informações
        console.log("\nAlunos Cadastrados:");
        if (alunos.length > 0) {
          for (let i = 0; i < alunos.length; i++) {
            let curso;
            if (alunos[i].curso) {
              curso = alunos[i].curso;
            } else {
              curso = "Não matriculado";
            }
            console.log("- " + alunos[i].nome + "(Curso: " + curso + ")");
          }
        } else {
          console.log("Nenhum aluno cadastrado.");
        }
        console.log("\nCursos Cadastrados:");
        if (cursos.length > 0) {
          for (let i = 0; i < cursos.length; i++) {
            console.log("- " + cursos[i]);
          }
        } else {
        }
        break;

      case "6":
        if (alunos.length === 0 || cursos.length === 0) {
          console.log(
            "É necessário ter alunos e cursos cadastrados para realizar a matricula."
          );
          break;
        }
        let nomeMatricula = prompt("Digite o nome do aluno para matrícula.");
        let aluno = null;
        for (let i = 0; i < alunos.length; i++) {
          if (alunos[i].nome === nomeMatricula) {
            aluno = alunos[i];
            break;
          }
        }
        if (!aluno) {
          console.log("Aluno não encontrado.");
          break;
        }
        console.log("Cursos disponíveis:");
        for (let i = 0; i < cursos.length; i++) {
          console.log(i + 1 + "- " + cursos[i]);
        }
        let cursoIndex = parseInt(prompt("Escolha o número do curso:"));
        if (cursoIndex >= 0 && cursoIndex < cursos.length) {
          aluno.curso = cursos[cursoIndex];
          console.log(
            "Aluno " + aluno.nome + "matriculado no curso" + aluno.curso + "."
          );
        } else {
          console.log("Curso inválido.");
        }
        break;

      case "7":
        //Sair do sistema
        console.log("Saindo do sistema...");
        break;

      default:
        console.log("Opção inválida. Tente novamente.");
    }
  } while (opcao !== "7");
} else {
  console.log("Senha inválida.");
}
