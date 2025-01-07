const subdomain = 'virteaching'; // Replace with your custom subdomain
const frame = document.getElementById('frame');

frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;

window.addEventListener('message', subscribe);
document.addEventListener('message', subscribe);

function subscribe(event) {
    const json = parse(event);

    if (json?.source !== 'readyplayerme') {
        return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
        frame.contentWindow.postMessage(
            JSON.stringify({
                target: 'readyplayerme',
                type: 'subscribe',
                eventName: 'v1.**'
            }),
            '*'
        );
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
        document.getElementById('frame').hidden = true;
        document.querySelector("#close-avatar").style.display = "none";
        document.getElementById("avatarViewer").src = json.data.url;
        document.getElementById("avatarViewer").style.display = "block"
        document.querySelector('#continer-buttons-avatar').style.display = "flex"
        document.querySelector('#container-frame').style.justifyContent = "flex-start";
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
}

function parse(event) {
    try {
        return JSON.parse(event.data);
    } catch (error) {
        return null;
    }
}

document.querySelector("#btn-open-avatar").addEventListener("click", () => {
    const btnCloseAvatar = document.querySelector("#close-avatar")

    document.getElementById('frame').hidden = false;
    document.querySelector("#btn-open-avatar").style.display = 'none';
    btnCloseAvatar.style.display = "block";
})

document.querySelector("#close-avatar").addEventListener("click", () => {
    const btnCloseAvatar = document.querySelector("#close-avatar")

    document.getElementById('frame').hidden = true;
    document.querySelector("#btn-open-avatar").style.display = 'block';
    btnCloseAvatar.style.display = "none";
})

document.querySelector('#select-other-btn').addEventListener("click", () => {
    document.querySelector('#continer-buttons-avatar').style.display = "none"
    frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;
    document.getElementById('frame').hidden = false;
    document.getElementById("avatarViewer").style.display = "none"
})

document.querySelector('#save-btn').addEventListener("click", () => {
    let url = document.getElementById("avatarViewer").src
    salvarAvatar(url)
})

async function salvarAvatar(avatarUrl) {
    try {
        const response = await fetch("http://localhost:5000/salvar-avatar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar_url: avatarUrl,
          }),
        });

        if (response.ok) {
            const data = await response.json();
            const downloadUrl = data.download_url;

            if (downloadUrl) {
                window.location.href = downloadUrl;
            } else {
                alert("Erro: URL de download não encontrada.") ;
            }
        } else {
            const errorData = await response.json();
            alert(`Erro ao salvar o avatar: ${errorData.error}`);
        }
    
      } catch (err) {
        console.error("Erro:", err);
      }
}

document.querySelector("#share-btn").addEventListener('click', () => {
    if (document.querySelector('#share-buttons').style.display == 'flex') {
        document.querySelector('#share-buttons').style.display = 'none'
    } else {
        document.querySelector('#share-buttons').style.display = 'flex'
    }
})

document.querySelector("#whats").addEventListener("click", () => {
    let urlAvatar = document.getElementById("avatarViewer").src
    window.open(`https://wa.me/?text=Olhe meu avatar clicando neste link: http://127.0.0.1:5000/ver-avatar?link=${encodeURIComponent(urlAvatar)}`)
})

document.getElementById('copy').addEventListener('click', function() {
    // Seleciona o texto que você quer copiar
    let urlAvatar = document.getElementById("avatarViewer").src
  
    // Tenta copiar o texto para a área de transferência
    navigator.clipboard.writeText(urlAvatar).then(function() {
        const notificacao = document.getElementById('notificacao');
        notificacao.classList.add('show');

        // Esconder a notificação após 3 segundos
        setTimeout(function() {
        notificacao.classList.remove('show');
        }, 3000);
    }).catch(function(err) {
      alert('Falha ao copiar o texto: ' + err);
    });
  });

document.querySelector('#print-btn').addEventListener('click', () => {
    let urlAvatar = document.getElementById("avatarViewer").src
    urlAvatar = urlAvatar.split('/').pop().split('.glb')[0];
    let request = `https://models.readyplayer.me/${urlAvatar}.png`
    printImage(request)
})

function printImage(image) {
    const newWindow = window.open('', '_blank');
    const imgHTML = `<img src="${image}" alt="Imagem a ser impressa" style="max-width:100%;height:auto;margin:20px 0;">`
    newWindow.document.write(`
        <html>
            <head>
                <style>
                    body {
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                ${imgHTML}
            </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.onload = () => newWindow.print();

}