let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function mostrarTarefas() {

    const lista = document.getElementById("task-list");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        const item = document.createElement("div");

        item.className = "task";

        item.innerHTML = `
            <input
                type="checkbox"
                ${tarefa.concluida ? "checked" : ""}
                onchange="marcarTarefa(${index})"
            >

            <span class="${tarefa.concluida ? "concluida" : ""}">
                ${tarefa.nome}
            </span>

            <button onclick="editarTarefa(${index})">
                editar
            </button>

            <button onclick="apagarTarefa(${index})">
                apagar
            </button>
        `;

        lista.appendChild(item);

    });

}

function adicionarTarefa() {

    const input = document.getElementById("task-input");

    const nome = input.value.trim();

    if (nome === "") {

        alert("Digite uma tarefa primeiro! ♡");

        return;

    }

    tarefas.push({

        nome: nome,

        concluida: false

    });

    salvarTarefas();

    input.value = "";

    mostrarTarefas();

}

function marcarTarefa(index) {

    tarefas[index].concluida = !tarefas[index].concluida;

    salvarTarefas();

    mostrarTarefas();

}

function editarTarefa(index) {

    const novoNome = prompt(
        "Edite sua tarefa:",
        tarefas[index].nome
    );

    if (novoNome === null) {

        return;

    }

    if (novoNome.trim() === "") {

        return;

    }

    tarefas[index].nome = novoNome.trim();

    salvarTarefas();

    mostrarTarefas();

}

function apagarTarefa(index) {

    const confirmar = confirm(
        "Deseja apagar esta tarefa? ♡"
    );

    if (!confirmar) {

        return;

    }

    tarefas.splice(index, 1);

    salvarTarefas();

    mostrarTarefas();

}
document.getElementById("task-input").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        adicionarTarefa();

    }

});

mostrarTarefas();
