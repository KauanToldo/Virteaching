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
                alert("Erro: URL de download não encontrada.");
            }
        } else {
            const errorData = await response.json();
            alert(`Erro ao salvar o avatar: ${errorData.error}`);
        }
    
      } catch (err) {
        console.error("Erro:", err);
      }
}