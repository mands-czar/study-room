unction perguntarChatGPT() {

    const input = document.getElementById("user-input");

    const pergunta = input.value.trim();


    if (pergunta === "") {

        input.focus();

        return;

    }


    const prompt = `
Você é minha professora particular de estudos.

Explique minha dúvida de forma simples e didática, começando do zero quando necessário.

Regras:

- Use linguagem fácil de entender.
- Explique passo a passo.
- Dê exemplos do cotidiano.
- Destaque o que é mais importante para uma prova.
- Não entregue apenas a resposta: ensine o raciocínio.
- No final, faça uma questão parecida para eu tentar sozinha.
- Se eu estiver estudando para uma prova, ajude a identificar o que preciso memorizar.

Minha dúvida é:

${pergunta}
`;


    navigator.clipboard.writeText(prompt)
        .then(() => {

            window.open(
                "https://chatgpt.com/",
                "_blank"
            );

        })
        .catch(() => {

            window.open(
                "https://chatgpt.com/",
                "_blank"
            );

        });

}


document
    .getElementById("user-input")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            perguntarChatGPT();

        }

    });
