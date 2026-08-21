const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".study-card");

const showFormButton = document.getElementById("showFormButton");

const studyForm = document.getElementById("studyForm");

const saveMaterialButton = document.getElementById("saveMaterialButton");

const cancelFormButton = document.getElementById("cancelFormButton");

const customMaterials = document.getElementById("customMaterials");


// ========================================
// PESQUISA
// ========================================

searchInput.addEventListener("input", function () {

    const pesquisa = searchInput.value
        .toLowerCase()
        .trim();

    const allCards = document.querySelectorAll(".study-card");

    allCards.forEach(function (card) {

        const texto = card.innerText.toLowerCase();

        if (texto.includes(pesquisa)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ========================================
// ABRIR FORMULÁRIO
// ========================================

showFormButton.addEventListener("click", function () {

    studyForm.style.display = "block";

    showFormButton.style.display = "none";

});


// ========================================
// CANCELAR
// ========================================

cancelFormButton.addEventListener("click", function () {

    studyForm.style.display = "none";

    showFormButton.style.display = "inline-block";

});


// ========================================
// SALVAR MATERIAL
// ========================================

saveMaterialButton.addEventListener("click", function () {

    const name = document
        .getElementById("materialName")
        .value
        .trim();

    const category = document
        .getElementById("materialCategory")
        .value;

    const subject = document
        .getElementById("materialSubject")
        .value
        .trim();

    const link = document
        .getElementById("materialLink")
        .value
        .trim();


    // Verificar campos

    if (name === "" || link === "") {

        alert("♡ Preencha pelo menos o nome e o link!");

        return;

    }


    // Criar objeto

    const material = {

        id: Date.now(),

        name: name,

        category: category,

        subject: subject,

        link: link

    };


    // Pegar materiais existentes

    let materials =
        JSON.parse(
            localStorage.getItem("studyMaterials")
        ) || [];


    // Adicionar novo

    materials.push(material);


    // Salvar no navegador

    localStorage.setItem(
        "studyMaterials",
        JSON.stringify(materials)
    );


    // Limpar formulário

    document.getElementById("materialName").value = "";

    document.getElementById("materialSubject").value = "";

    document.getElementById("materialLink").value = "";


    // Fechar formulário

    studyForm.style.display = "none";

    showFormButton.style.display = "inline-block";


    // Atualizar lista

    carregarMateriais();


    alert("♡ Material adicionado com sucesso!");

});


// ========================================
// MOSTRAR MATERIAIS
// ========================================

function carregarMateriais() {

    customMaterials.innerHTML = "";


    const materials =
        JSON.parse(
            localStorage.getItem("studyMaterials")
        ) || [];


    materials.forEach(function (material) {

        let icon = "🔗";


        if (material.category === "curso") {
            icon = "🎓";
        }

        if (material.category === "aula") {
            icon = "▶️";
        }

        if (material.category === "material") {
            icon = "📄";
        }

        if (material.category === "questoes") {
            icon = "📝";
        }


        const card = document.createElement("div");

        card.className = "study-card";


        card.innerHTML = `

            <h3>
                ${icon} ${material.name}
            </h3>

            <p>
                ${material.subject || "Material de estudos"}
            </p>

            <a
                href="${material.link}"
                target="_blank"
            >

                <button>
                    Abrir ♡
                </button>

            </a>

            <button
                class="delete-material"
                data-id="${material.id}"
            >
                🗑️ Excluir
            </button>

        `;


        customMaterials.appendChild(card);

    });


    // Botões excluir

    const deleteButtons =
        document.querySelectorAll(
            ".delete-material"
        );


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id = Number(
                button.dataset.id
            );


            let materials =
                JSON.parse(
                    localStorage.getItem("studyMaterials")
                ) || [];


            materials =
                materials.filter(
                    material => material.id !== id
                );


            localStorage.setItem(
                "studyMaterials",
                JSON.stringify(materials)
            );


            carregarMateriais();

        });

    });

}


// ========================================
// CARREGAR AO ABRIR A PÁGINA
// ========================================

carregarMateriais();