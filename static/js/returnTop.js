

window.onscroll = () => {

  let bannerHeight = document.getElementById("banner-section").offsetHeight;
    let tops = document.getElementById("tops");

    if (window.scrollY > bannerHeight) {
        tops.style.display = "block";
    } else {
        tops.style.display = "none";
    }

    document.querySelectorAll('.reveal').forEach(e => {
      if (e.getBoundingClientRect().top < window.innerHeight - 100) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    })
  }

