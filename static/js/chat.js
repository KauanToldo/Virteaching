const socket = io({autoConnect: false});

document.querySelector("#addAcount").addEventListener("click", () => {
    let user = document.querySelector("#usernameCont").value;
    let password = document.querySelector("#senhaCont").value;

    let data = {
        username: user,
        password: password
    };

    fetch("/add_account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) {
            console.log("Resposta do servidor:", data.message);
            if (data.message === "Usuário ja existe ou indefinido"){
                const notificacaoAcount = document.getElementById('notificacaoAcount');
                notificacaoAcount.classList.add('show');
                setTimeout(() => {
                    notificacaoAcount.classList.remove('show');
                     }, 3000);
            }

            if (data.message === "Conta adicionada com sucesso!") {
                const land1 = document.querySelector("#land1");
                const land2 = document.querySelector("#land2");

                land1.style.display = "flex";
                land2.style.display = "none";
            }
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});



document.querySelector("#join-btn").addEventListener("click", function() {
    let username = document.getElementById("username").value;
    let senha = document.getElementById("senha").value;

    fetch("/validate_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, senha: senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == "success") {
            socket.connect();

            socket.on("connect", function() {
                socket.emit("user_join", username, senha); 
            });
        } else {
            console.log("Usuário ou senha inválidos");
          
            // Mostra a notificação
            const notificacaoChat = document.getElementById('notificacaoChat');
            notificacaoChat.classList.add('show');
          
            // Esconde a notificação após 3 segundos
            setTimeout(() => {
              notificacaoChat.classList.remove('show');
            }, 3000);
          }
          
    })
    .catch(error => {
        console.error("Erro ao fazer requisição para o backend:", error);
        alert("Ocorreu um erro ao tentar validar o usuário.");
    });
});




document.getElementById("message").addEventListener("keyup", function (event) {
    if (document.getElementById("message").value == "") {
        return;
    }
    if (event.key == "Enter") {
        let message = document.getElementById("message").value;
        socket.emit("new_message", message);
        document.getElementById("message").value = "";
    }
})
socket.on("error", (data) => {
    console.log("Usário invalido") 
});

document.getElementById("submit-msg").addEventListener("click", () => {
    if (document.getElementById("message").value == "") {
        return;
    }
    let message = document.getElementById("message").value;
    socket.emit("new_message", message);
    document.getElementById("message").value = "";
})
socket.on("error", (data) => {
    console.log("Usário invalido") 
});


socket.on("chato", function(data) {

    

    document.getElementById("msg-container").style.display = "flex";
    document.querySelector(".left-infos").style.display = "none";
    document.querySelector(".right-infos").style.display = "none";
    document.querySelector("#fields").style.display = 'flex';

    let divCont = document.createElement("div");
    divCont.id = "msgem";

    // Cria o corpo da mensagem
    let bodyMsg = document.createElement("div");
    bodyMsg.className = "body-msg ";

    // Cria o contêiner para os textos
    let textsContainer = document.createElement("div");
    textsContainer.className = "texts";

    let userName = document.createElement("span");
    userName.className = "name";
    userName.textContent = data['username']; // Nome do usuário

    let paragraph = document.createElement("p");
    paragraph.className = "paragrafos";
    paragraph.textContent = data['message']; // Mensagem do usuário

    textsContainer.appendChild(userName);
    textsContainer.appendChild(paragraph);

    bodyMsg.appendChild(textsContainer);

    if (data['username'] == data['set']){

        let arrowIcon = document.createElement("span");
        arrowIcon.className = "material-symbols-outlined";
        arrowIcon.id = 'expanded'
        arrowIcon.textContent = "expand_more";


        divCont.className = 'right'

        bodyMsg.appendChild(arrowIcon);
        
    }

    divCont.appendChild(bodyMsg);

    let chatContainer = document.getElementById("chat-messages");
    chatContainer.appendChild(divCont);

    chatContainer.scrollTop = chatContainer.scrollHeight;
});


document.querySelectorAll(".Acount").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
        const land1 = document.querySelector("#land1");
        const land2 = document.querySelector("#land2");

        if (land1.style.display === "flex") {
            land1.style.display = "none";
            land2.style.display = "flex";
        } else {
            land1.style.display = "flex";
            land2.style.display = "none";
        }
    });
});


socket.on('message_deleted', (data) => {
    // Handle the deletion by removing the relevant element
    const elements = document.querySelectorAll(".message"); 
    elements.forEach(element => {
        const span = element.querySelector('span');
        const text = element.querySelector('.text').textContent.trim();

        if (span.textContent === data.span && text === data.text) {
            element.remove();
        }
    });
});

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("material-symbols-outlined")) {
        let sim = event.target.parentElement.children[0];
        let span = sim.childNodes[0].textContent;
        let text = sim.childNodes[1].textContent.trim();

        const data = { span, text };
        fetch('/process-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do Flask:", data);
            if (data.success) {
                event.target.parentElement.parentElement.remove();
            } else {
                console.error("Erro no Flask:", data.message);
            }
        })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
        });
    }
});




