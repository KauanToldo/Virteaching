const socket = io({autoConnect: false});

let users = {}


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
          
            const notificacaoChat = document.getElementById('notificacaoChat');
            notificacaoChat.classList.add('show');
          
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


let control = '';

socket.on("chato", function(data) {

    if (data['save']){
        control = data['set']
    }

    console.log(control)

    document.getElementById("msg-container").style.display = "flex";
    document.querySelector(".left-infos").style.display = "none";
    document.querySelector(".right-infos").style.display = "none";
    document.querySelector("#fields").style.display = 'flex';

    let divCont = document.createElement("div");
    divCont.id = "msgem";

    let bodyMsg = document.createElement("div");
    bodyMsg.className = "body-msg ";

    let textsContainer = document.createElement("div");
    textsContainer.className = "texts";

    let userName = document.createElement("span");
    userName.className = "name";
    userName.textContent = data['username'];

    let paragraph = document.createElement("p");
    paragraph.setAttribute('data-span', data['username'])
    paragraph.setAttribute('data-text', data['message'])
    paragraph.className = "paragrafos";
    paragraph.textContent = data['message']; 

    textsContainer.appendChild(userName);

    bodyMsg.appendChild(textsContainer);

    if (data['username'] == control){

        let arrowIcon = document.createElement("span");
        arrowIcon.className = "material-symbols-outlined";
        arrowIcon.id = 'expanded'
        arrowIcon.textContent = "delete";

        divCont.className = 'right'

        textsContainer.appendChild(arrowIcon);
        
    }

    bodyMsg.appendChild(paragraph)
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

document.body.addEventListener("click", (event) => {
    if (event.target.id == "expanded") {
        let sim = event.target.parentElement.parentElement.parentElement.children[0];
        let span = sim.children[0].children[0].textContent;
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
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
        });
    }
});

socket.on('delete_message', (data) => {

    const span = data.span;
    const text = data.text;

    const messageElement = document.querySelector(`[data-span="${span}"][data-text="${text}"]`).parentElement.parentElement;

    if (messageElement) {
      messageElement.remove(); 
    }
  });



