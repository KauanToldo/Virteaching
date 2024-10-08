var openButton = document.getElementById('open-menu')
var closeButton = document.getElementById('close-menu')

openButton.addEventListener('click', ()=> {
    document.querySelector('#menu-lateral-container').style.display = 'flex'
})

closeButton.addEventListener('click', ()=> {
    document.querySelector('#menu-lateral-container').style.display = 'none'
})