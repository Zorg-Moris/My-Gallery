"use strict";
//Array Albums
let albumsArray = [];


function Album(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.foto = [];
    this.icon = "icon/icon_album.png";
};

Album.prototype.downloadFoto = function (foto) {
    this.foto.push(foto);
};

Album.prototype.deleteFoto = function (id) {
    for (let i = 0; i < this.foto.length; i++) {
        if (id === this.foto[i].id) {
            this.foto.splice(i, 1);
           return;
        };
    };
};

Album.prototype.getCountFoto = function(){
    return this.foto.length;
};

//Foto constructor
function Foto(id, img) {
    this.id = id;
    this.img = img
};


// test albums
let my_album1 = new Album(0, "my Album 1", "my cars");
albumsArray.push(my_album1);
let my_album2 = new Album(1, "my Album 2", "my work");
albumsArray.push(my_album2);

//test array foto
let fotoArray = [{
        id: 0,
        img: "image/chevrolet_corvette_1.jpg"
    },
    {
        id: 1,
        img: "image/chevrolet_corvette_2.jpg"
    },
    {
        id: 2,
        img: "image/chevrolet_corvette_3.jpg"
    },
    {
        id: 3,
        img: "image/Chevrolet_Corvette_all.jpg"
    },
    {
        id: 4,
        img: "image/Chevrolet-Corvette-1953.jpg"
    },
    {
        id: 5,
        img: "image/Chevrolet-corvette-1962.jpg"
    },
    {
        id: 6,
        img: "image/Chevrolet-corvette-1963.jpg",
    },
    {
        id: 7,
        img: "image/Chevrolet-corvette-1968.jpg"
    },
    {
        id: 8,
        img: "image/193px-1956_Chevrolet_Bel_Air_4_Door_Sedan_Front.jpg"
    },
    {
        id: 9,
        img: "image/193px-1967_Chevrolet_Camaro_RS_SS.jpg"
    },
    {
        id: 10,
        img: "image/193px-1971_Camaro_SS_(11).jpg"
    },
    {
        id: 11,
        img: "image/193px-1979_Chevrolet_Camaro_Z28_(8630991946).jpg"
    },
    {
        id: 12,
        img: "image/193px-Chevrolet_BelAir_Styleline_DeLuxe1952.jpg"
    },
    {
        id: 13,
        img: "image/193px-Flickr_-_DVS1mn_-_67_Chevrolet_Camaro_(2).jpg"
    },
    {
        id: 14,
        img: "image/198px-'69_Chevrolet_Camaro_Z28.jpg",
    },
    {
        id: 15,
        img: "image/218px-Chevrolet_Camaro_LT_(2837996263).jpg"
    },
    {
        id: 16,
        img: "image/220px-'67_Chevrolet_Camaro_SS_Convertible_(Auto_classique).jpg"
    },
    {
        id: 17,
        img: "image/220px-1954_Chevrolet_Bel_Air_2.-Door_HT_LRW466.jpg",
    },
    {
        id: 18,
        img: "image/220px-1957_Chevrolet_Bel_Air_2413_4-Door_ERL936.jpg"
    },
    {
        id: 19,
        img: "image/220px-1958_Chevrolet.jpg"
    },
    {
        id: 20,
        img: "image/220px-1970_Chevrolet_Camaro_Z28_-_Flickr_-_exfordy.jpg"
    },
];

///////////////////////////////////////

my_album1.foto = [...fotoArray];
