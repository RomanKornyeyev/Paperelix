let nombre = window.location.search.replace('?nombre=', "").replace(/\?url=producto-[a-zA-Z]*/, "").replace(/.png\b/, "").replace(/%20/, " ").replace(/%C3%B1/, "ñ");
/* window.location.search.replace(/\?nombre=/, '').replace(/\?url=[a-zA-Z\-\%230]*.png/, ''); */

let canvas = document.querySelector('.section__content--recomendations');
let nombreProducto = document.querySelector('.content__title');

let ruta = window.location.search.replace(/\?nombre=[a-zA-Z203%1]*\?url=/, "")
let imagen = document.createElement('img');
imagen.src = 'img/productos/'+ruta;
imagen.alt = 'Producto '+nombre;
let contenedorImagen = document.querySelector('.product__img-wrapper');
contenedorImagen.appendChild(imagen);
/* -------------------------------------------------------------------------------------------- */
//Seleccionamos el bloque de la descripcion
let descripcion = document.querySelector('.content__text');
let textoDescripcion;
getDescripcion(nombre);

//Seleccionamos elemento de tipo h4
let precio = document.querySelector('h4');

let productoActual;

function getDescripcion(nombre) {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            let elemento = inventario.find((objeto)=>{
                return objeto.nombre==nombre
            })

            let textoProducto = document.createTextNode(capitalizar(nombre));
            nombreProducto.appendChild(textoProducto);

            productoActual = new Article(elemento.clave, elemento.nombre, elemento.categoria, elemento.ruta, elemento.precio, elemento.descripcion, elemento.extendido, null);
            textoDescripcion = document.createTextNode(productoActual.descripcion);
            descripcion.appendChild(textoDescripcion);
            precio.innerHTML="Precio: "+productoActual.precio+"€";

            let btnCart = document.querySelector("#addCart")
            btnCart.addEventListener("click", function () {
                addCart(productoActual.clave, productoActual.nombre)
            }, productoActual.clave, productoActual.nombre)
        });
}

let unfold = document.querySelector('.unfold');
let fold = document.querySelector('.fold');
let contenidoDesplegable = document.querySelector('#desplegableExt');


function verMas() {
    contenidoDesplegable.innerHTML="";
    for (const [key, value] of Object.entries(productoActual.extendido)) {
        contenidoDesplegable.innerHTML+=`<strong>${key}:</strong> ${value}<br><br>`
    }

    contenidoDesplegable.classList.remove("folded");
    contenidoDesplegable.classList.add("unfolded");
    unfold.style.display="none";
    fold.style.display="block";
}

function verMenos() {
    contenidoDesplegable.classList.remove("unfolded");
    contenidoDesplegable.classList.add("folded");
    unfold.style.display="block";
    fold.style.display="none";
}
/*------------------------------------------------------------------------------------- */
getRelacionados(nombre);
function getRelacionados(nombre) {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            let index;
            let i=0;
            let auxRepes = [];
            while (i < 3) {
                index = Math.floor(Math.random() * inventario.length)
                if ((inventario[index]['nombre'] != nombre) && (!auxRepes.includes(index))) {
                    let article = new Article(inventario[index].clave, inventario[index].nombre, inventario[index].categoria, inventario[index].ruta, inventario[index].precio, inventario[index].descripcion, inventario[index].extendido, i);
                    i++;
                    article.pintar();
                } 
                auxRepes.push(index);
            }
        });
}