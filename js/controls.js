"use strict";

let createAlbumBtn = document.getElementById("create-album");
let albumButton = document.getElementById("albums-container");
let closeModal = document.getElementById("modal-button-close");
let closeFotoList = document.getElementById("close-button-foto");
let albums = albumButton.getElementsByClassName("album");
let fotoPlace = document.getElementById("foto-place");
let addFotoButton = document.getElementById("addFoto");
let inputFoto = document.getElementById("addImg");
let sliderBtnClose = document.getElementById("slider-button-close");
let slideShow = document.getElementById("slider-container");
let btnLight = document.getElementById("btn-light");


btnLight.addEventListener("change", function () {
    let light = document.getElementById("neon");

    light.classList.toggle("light-none");
});


createAlbumBtn.onclick = function () {
    createNewAlbum();
};


albumButton.addEventListener("click", function (event) {

    if (event.target.tagName !== "BUTTON" && event.target.tagName !== "A") {
        return;
    } else {
        let data = event.target.getAttribute("data");
        let albumIndex = event.target.parentNode.parentNode.getAttribute("album-index");
        let child = event.target.parentNode.parentNode;
        switch (data) {
            case "edit":
                editAlbum(albumIndex, child);
                break;

            case "delete":
                deleteAlbum(albumIndex, albumButton, child);
                break;
        }
    }
});


albumButton.addEventListener("click", function (event) {
    if (event.target.tagName !== "IMG") {
        return;
    } else {
        let indexAlbum = event.target.parentNode.getAttribute("album-index");
        showFoto(indexAlbum);
    }
});

fotoPlace.addEventListener("click", function (event) {
    let target = event.target;

    if (target.tagName !== "BUTTON" && target.tagName !== "IMG") {
        return;
    } else {
        let data = target.tagName;
        switch (data) {
            case "BUTTON":
                let indexAlbum = target.parentNode.parentNode.getAttribute("album-index");
                let fotoId = target.parentNode.parentNode.getAttribute("foto-id");
                let child = target.parentNode.parentNode;
                fotoPlace.removeChild(child);
                deleteFoto(indexAlbum, fotoId);
                break;

            case "IMG":
                let index = target.parentNode.getAttribute("album-index");
                let id = target.parentNode.getAttribute("foto-id");
                let slideIndex = findIndexFoto(index, id);

                showElementSlider(index);
                showSlides(slideIndex);
        }
    }
});


closeModal.addEventListener("click", function () {
    closeModalFunc();
});


closeFotoList.addEventListener("click", function () {
    openCloseAlbum();
    clearAlbumInfo();
});

addFotoButton.addEventListener("click", function () {
    inputFoto.click();

});

inputFoto.addEventListener("change", function (event) {

    let album = document.getElementById("album-info-name");
    let indexAlbum = album.getAttribute("data-album");
    let fr = new FileReader();
    let file = event.target.files[0];

    if (/image.*/.test(file.type)) {
        fr.onload = function (event) {
            let src = event.target.result
            addFoto(indexAlbum, src);
        };
        fr.onerror = function (event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };
        fr.readAsDataURL(file);
        inputFoto.value = "";
    } else {
        informWrongFile();
        inputFoto.value = "";
    }
});

sliderBtnClose.onclick = function () {
    closeSlider();
    let sliderContainer = document.getElementById("slider-container");
    sliderContainer.classList.add("slider-container-none");
};


slideShow.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    } else {
        let data = event.target.getAttribute("data-slider");

        switch (data) {
            case "previous":
                plusSlides(-1);
                break;

            case "next":
                plusSlides(1);
                break;

            case "play":
                playShowSlides();
                let interval = setInterval(function () {
                    plusSlides(1);
                }, 2000);
                slider.interval = interval;
                break;

            case "pause":
                let stop = slider.interval;
                pauseShowSlides();
                clearInterval(stop);
                slider.interval = stop;
                break;
        }
    }
});