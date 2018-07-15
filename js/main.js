window.onload = function () {
    showTestAlbums();

    setTimeout(function () {
        let light = document.getElementById("neon");
        light.classList.toggle("light-none");
    }, 3000);
};