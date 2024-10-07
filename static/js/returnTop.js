
window.onscroll = function() {
    let bannerHeight = document.getElementById("banner-section").offsetHeight;
    let tops = document.getElementById("tops");

    if (window.scrollY > bannerHeight) {
        tops.style.display = "block";
    } else {
        tops.style.display = "none";
    }
};
