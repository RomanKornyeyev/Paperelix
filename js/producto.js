let nombre = window.location.search.replace('?nombre=', "").replace(/\?url=producto-[a-zA-Z]*/, "").replace(/.png\b/, "").replace(/%20/, " ").replace(/%C3%B1/, "ñ");
/* window.location.search.replace(/\?nombre=/, '').replace(/\?url=[a-zA-Z\-\%230]*.png/, ''); */

let canvas = document.querySelector('.section__content--recomendations');
let nombreProducto = document.querySelector('.content__title');
let textoProducto = document.createTextNode(nombre);
nombreProducto.appendChild(textoProducto);

let ruta = window.location.search.replace(/\?nombre=[a-zA-Z203%1]*\?url=/, "")
console.log(ruta);
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
            inventario.forEach(elemento => {
                if (nombre == elemento.nombre) {
                    productoActual = new Article(elemento.nombre, elemento.categoria, elemento.ruta, elemento.precio, elemento.descripcion, elemento.extendido, null);

                    textoDescripcion = document.createTextNode(productoActual.descripcion);
                    descripcion.appendChild(textoDescripcion);
                    
                    precio.innerHTML="Precio: "+productoActual.precio+"€";
                }
            })
        });
}

let unfold = document.querySelector('.unfold');
let fold = document.querySelector('.fold');
let contenidoDesplegable = document.querySelector('.desplegableExt');


function verMas() {
    contenidoDesplegable.innerHTML="";
    let keys = Object.keys(productoActual.extendido)
    let values = Object.values(productoActual.extendido)
    for (let i = 0; i < keys.length; i++) {
        contenidoDesplegable.innerHTML+=`<strong>${keys[i]}:</strong> ${values[i]}<br><br>`
    }
    contenidoDesplegable.style.display="block";
    unfold.style.display="none";
    fold.style.display="block";
    descripcion.style.paddingBottom="0";
}

function verMenos() {
    contenidoDesplegable.style.display="none";
    unfold.style.display="block";
    fold.style.display="none";
    descripcion.style.paddingBottom="var(--space-xl)";
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
                auxRepes.push(index);
                if ((inventario[index]['nombre'] != nombre) && (!auxRepes.includes(index))) {
                    console.log('entro');
                    let article = new Article(inventario[index].nombre, inventario[index].categoria, inventario[index].ruta, inventario[index].precio, inventario[index].descripcion, inventario[index].extendido, i);
                    i++;
                    article.pintar();
                }
            }
        });
}