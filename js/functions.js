"use strict";

// functions Almdum 


function showTestAlbums() {
    if (albumsArray.length > 0) {
        for (let i = 0; i < albumsArray.length; i++) {
            let name = albumsArray[i].name;
            let id = albumsArray[i].id;
            createElementAlbum(name, id);
        }
    }
};


function createNewAlbum() {
    openModalWindow();
    let formModal = document.forms.modalForm;

    formModal.elements.submit.onclick = function () {
        let name = formModal.elements.name.value;
        let description = formModal.elements.description.value;
        if (name.length !== 0 && description.length !== 0) {
            createAlbum(name, description);
        } else {
            return;
        };
    }
};


function createId() {
    let newId = [];
    if (albumsArray.length > 0) {
        for (let i = 0; i < albumsArray.length; i++) {
            newId.push(albumsArray[i].id);
        }
        let maxId = Math.max(...newId);
        return maxId + 1;
    } else {
        return 0;
    }
};


function createAlbum(name, description) {
    let id = createId();
    let album = new Album(id, name, description);
    albumsArray.push(album);

    createElementAlbum(name, id);
    closeModalFunc();
    messageNotAlbums();
};


function createElementAlbum(name, index) {
    let album = document.getElementById("albums-container");

    let albumDiv = document.createElement("div");
    albumDiv.className = "album";
    albumDiv.setAttribute("album-index", index);
    album.appendChild(albumDiv);

    let img = document.createElement("img");
    img.setAttribute("src", "icon/icon_album.png");
    albumDiv.appendChild(img);

    let albumName = document.createElement("div");
    albumName.className = "album-name";
    let alName = document.createTextNode(name);
    albumName.appendChild(alName);
    albumDiv.appendChild(albumName);

    let buttonDiv = document.createElement("div");
    buttonDiv.className = "button-menu";
    let butEdit = document.createElement("button");
    butEdit.className = "controls-btn";
    butEdit.setAttribute("data", "edit");
    let butEditText = document.createTextNode("Edit");
    butEdit.appendChild(butEditText);
    buttonDiv.appendChild(butEdit);
    let butDelete = document.createElement("button");
    butDelete.className = "controls-btn";
    butDelete.setAttribute("data", "delete");
    let butDeleteText = document.createTextNode("Delete");
    butDelete.appendChild(butDeleteText);
    buttonDiv.appendChild(butDelete);

    albumDiv.appendChild(buttonDiv);
};


function deleteAlbum(index, parent, child) {
    let id = parseInt(index);
    parent.removeChild(child);
    for (let i = 0; i < albumsArray.length; i++) {
        if (id === albumsArray[i].id) {
            albumsArray.splice(i, 1);
        }
    }
    messageNotAlbums();
};


function editAlbum(index, child) {
    let id = parseInt(index);
    let formModal = document.forms.modalForm;

    openModalWindow();

    for (let i = 0; i < albumsArray.length; i++) {
        if (id === albumsArray[i].id) {
            formModal.elements.submit.onclick = function () {
                changeParametrsAlubum(formModal, id, child);
            };
        }
    }
};


function changeParametrsAlubum(formModal, id, child) {
    let name = formModal.elements.name.value;
    let description = formModal.elements.description.value;
    let indexAlbum = findIndexAlbum(id);
    if (name.length !== 0 && description.length !== 0) {
        albumsArray[indexAlbum].name = name;
        albumsArray[indexAlbum].description = description;
    } else {
        return;
    };

    let el = child.getElementsByClassName("album-name");
    el[0].innerHTML = name;
    closeModalFunc();
};


function openModalWindow() {
    let modalOverlay = document.getElementById("modal-overlay");
    let modalwin = document.getElementById("modal-window");

    modalOverlay.classList.toggle("modal-closed");
    modalwin.classList.toggle("modal-closed");
};


function closeModalFunc() {
    let modalOverlay = document.getElementById("modal-overlay");
    let modalwin = document.getElementById("modal-window");
    let formModal = document.forms.modalForm;

    modalOverlay.classList.toggle("modal-closed");
    modalwin.classList.toggle("modal-closed");
    formModal.reset();
};

function messageNotAlbums() {
    let informMessage = document.getElementById("inform-message");
    if (albumsArray.length === 0) {
        informMessage.classList.remove("inform-message-none");
    } else {
        informMessage.classList.add("inform-message-none");

    }
};


//function foto

function createFotoId(indexAlbum) {
    let newId = [];
    let albumFotos = albumsArray[indexAlbum].foto;
    if (albumFotos.length > 0) {
        for (let i = 0; i < albumFotos.length; i++) {
            newId.push(albumFotos[i].id);
        }
        let maxId = Math.max(...newId);
        return maxId + 1;
    } else {
        return 1;
    }
};


function showFoto(albumId) {
    let id = parseInt(albumId);
    let indexAlbum = findIndexAlbum(id);
    let countFoto = albumsArray[indexAlbum].foto.length;
    messageNotFoto(countFoto);
    if (countFoto > 0) {
        for (let i = 0; i < countFoto; i++) {
            createElementFoto(indexAlbum, i);
        }
    }

    albumInfo(indexAlbum);
    openCloseAlbum();
};


function findIndexAlbum(id) {
    let idAlbum = parseInt(id);
    for (let i = 0; i < albumsArray.length; i++) {
        if (idAlbum === albumsArray[i].id) {
            return i;
        };
    };
};


function messageNotFoto(countFoto = 0) {
    let informMessage = document.getElementById("inform-message-foto");

    if (countFoto === 0) {
        informMessage.classList.remove("inform-message-none");
    } else {
        informMessage.classList.add("inform-message-none");
    }
};


function createElementFoto(indexAlbum, indexFoto) {
    let foto = albumsArray[indexAlbum].foto[indexFoto].img;
    let id = albumsArray[indexAlbum].foto[indexFoto].id;
    let fotoPlace = document.getElementById("foto-place");

    let fotoDiv = document.createElement("div");
    fotoDiv.className = "foto";
    fotoDiv.setAttribute("album-index", indexAlbum);
    fotoDiv.setAttribute("foto-id", id);
    fotoPlace.appendChild(fotoDiv);

    let img = document.createElement("img");
    img.setAttribute("src", `${foto}`);
    img.setAttribute("sizes", "200x200");
    fotoDiv.appendChild(img);

    let fotoBtnDiv = document.createElement("div");
    fotoBtnDiv.className = "foto-button";
    fotoDiv.appendChild(fotoBtnDiv);

    let fotoBtn = document.createElement("button");
    fotoBtn.className = "controls-btn";
    fotoBtn.setAttribute("data", "delete-foto");
    let textBtn = document.createTextNode("Delete");
    fotoBtn.appendChild(textBtn);
    fotoBtnDiv.appendChild(fotoBtn);
};


function albumInfo(indexAlbum) {
    let albumName = albumsArray[indexAlbum].name;
    let albumDescription = albumsArray[indexAlbum].description;
    let countFoto = albumsArray[indexAlbum].getCountFoto();

    let albumTitle = document.getElementById("album-info-title");
    let textTitle = document.createTextNode("АЛЬБОМ:");
    albumTitle.appendChild(textTitle);

    let albumNameInfo = document.getElementById("album-info-name");
    albumNameInfo.setAttribute("data-album", indexAlbum);
    let textName = document.createTextNode(albumName);
    albumNameInfo.appendChild(textName);

    let albumDescriptionInfo = document.getElementById("album-description");
    let textDescription = document.createTextNode(albumDescription);
    albumDescriptionInfo.appendChild(textDescription);

    let fotoCountInfo = document.getElementById("foto-count");
    let textFotoCount = document.createTextNode(countFoto);
    fotoCountInfo.appendChild(textFotoCount);
};


function clearAlbumInfo() {
    let albumTitle = document.getElementById("album-info-title");
    let albumNameInfo = document.getElementById("album-info-name");
    let albumDescriptionInfo = document.getElementById("album-description");
    let fotoCountInfo = document.getElementById("foto-count");
    let fotoPlace = document.getElementById("foto-place");

    albumTitle.innerHTML = "";
    albumNameInfo.innerHTML = "";
    albumDescriptionInfo.innerHTML = "";
    fotoCountInfo.innerHTML = "";
    fotoPlace.innerHTML = "";
};


function openCloseAlbum() {
    let modalOverlay = document.getElementById("modal-overlay");
    let fotoCont = document.getElementById("foto-container");

    modalOverlay.classList.toggle("modal-closed");
    fotoCont.classList.toggle("foto-container-none");
};


function deleteFoto(indexAlbum, fotoId) {
    let index = parseInt(indexAlbum);
    let id = parseInt(fotoId);
    let myAlbum = albumsArray[index];

    myAlbum.deleteFoto(id);

    let countFoto = myAlbum.getCountFoto();
    let fotoCountInfo = document.getElementById("foto-count");
    fotoCountInfo.innerHTML = countFoto;
    if (countFoto === 0) {
        messageNotFoto();
    }
};


function addFoto(indexAlbum, src) {
    let index = parseInt(indexAlbum);
    let myAlbum = albumsArray[index];
    let id = createFotoId(indexAlbum);
    let newFoto = new Foto(id, src);
    myAlbum.downloadFoto(newFoto);

    let countFoto = myAlbum.getCountFoto();
    let fotoCountInfo = document.getElementById("foto-count");
    fotoCountInfo.innerHTML = countFoto;
    let indexFoto = countFoto - 1;
    createElementFoto(index, indexFoto);
    messageNotFoto(countFoto);
};


function informWrongFile() {
    let inform = document.getElementById("wrong-file");
    inform.classList.remove("wrong-file-none");

    setTimeout(function () {
        inform.classList.add("wrong-file-none");
    }, 3000);
};

function findIndexFoto(indexAlbum, id) {
    let index = parseInt(indexAlbum);
    let idFoto = parseInt(id);
    let album = albumsArray[index];

    for (let i = 0; i < album.foto.length; i++) {
        if (idFoto === album.foto[i].id) {
            return i;
        };
    };
};


//slider


let slider = {
    indexFoto: 0,
    interval: 0
}

function showElementSlider(indexAlbum) {
    let slideContainer = document.getElementById("slider-container");
    slideContainer.classList.remove("slider-container-none");

    for (let i = 0; i < albumsArray[indexAlbum].foto.length; i++) {

        let foto = albumsArray[indexAlbum].foto[i].img;
        createElementSlider(foto);
    }
};


function createElementSlider(foto) {
    let slideContainer = document.getElementById("slideShow-container");

    let slide = document.createElement("div");
    slide.className = "mySlides fade";

    let img = document.createElement("img");
    img.setAttribute("src", foto);
    slide.appendChild(img);

    slideContainer.appendChild(slide);
};


function plusSlides(n) {
    let slideIndex = slider.indexFoto;
    slideIndex += n;
    slider.indexFoto = slideIndex;
    showSlides(slideIndex);
};


function showSlides(step) {
    let slideIndex = step;
    slider.indexFoto = slideIndex;

    let slides = document.getElementsByClassName("mySlides");

    if (step >= slides.length) {
        slideIndex = 0;
        slider.indexFoto = slideIndex;
    }
    if (step < 0) {
        slideIndex = slides.length - 1;
        slider.indexFoto = slideIndex;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
};


function playShowSlides() {
    event.target.setAttribute("data-slider", "pause");
    let play = document.getElementById("showSlides");
    play.innerHTML = "Pause";
};


function pauseShowSlides() {
    event.target.setAttribute("data-slider", "play");
    let pause = document.getElementById("showSlides");
    pause.innerHTML = "Play";
};


function clearSliderInfo() {
    let slideContainer = document.getElementById("slideShow-container");
    slideContainer.innerHTML = "";
};


function closeSlider() {
    slider.indexFoto = 0;
    let sliderContainer = document.getElementById("slider-container");
    sliderContainer.classList.add("slider-container-none");
    clearSliderInfo()
};



// showTestAlbums();

// setTimeout(function () {
//     let light = document.getElementById("neon");
//     light.classList.toggle("light-none");
// }, 3000);