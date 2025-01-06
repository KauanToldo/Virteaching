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
    document.querySelector("#btn-open-avatar").hidden = true;
    btnCloseAvatar.style.display = "block";
})

document.querySelector("#close-avatar").addEventListener("click", () => {
    const btnCloseAvatar = document.querySelector("#close-avatar")

    document.getElementById('frame').hidden = true;
    document.querySelector("#btn-open-avatar").hidden = false;
    btnCloseAvatar.style.display = "none";
})
