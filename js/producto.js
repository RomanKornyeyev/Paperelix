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

let productoActual = [];

function getDescripcion(nombre) {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            inventario.forEach(elemento => {
                if (nombre == elemento.nombre) {
                    textoDescripcion = document.createTextNode(elemento.descripcion);
                    descripcion.appendChild(textoDescripcion);
                    
                    precio.innerHTML="Precio: "+elemento.precio+"€";
                    productoActual.push(elemento);
                }
            })
        });
}

let unfold = document.querySelector('.unfold');
let fold = document.querySelector('.fold');
let contenidoDesplegable = document.querySelector('.desplegableExt');


function verMas() {
    contenidoDesplegable.innerHTML="";
    let keys = Object.keys(productoActual[0]['extendido'])
    let values = Object.values(productoActual[0]['extendido'])
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
/* -------------------------------------------------------------------------------------------- */
let query = [];
getRelacionados(nombre);

function getRelacionados(nombre) {
    let index;
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            while (query.length < 3) {
                index = Math.floor(Math.random() * inventario.length)
                if (inventario[index]['nombre'] != nombre) {
                    query.push(inventario[index])
                }
            }
            pintarTodo(query);
        });
}

function pintarTodo(resultado) {
    let i = 0;
    resultado.forEach(contenido => {
        let categoria = contenido['categoria'];
        canvas.innerHTML += `
            <div class="card shadow-a">
            <a href="producto.html?nombre=`+contenido['nombre']+`?url=`+contenido['ruta']+`">
                    <div class="card__header color_`+ i + `">
                        <img class="img-fit product-img" src="IMG/productos/`+ contenido['ruta'] + `" alt="`+contenido['categoria']+" "+contenido['nombre']+`">
                    </div>
                    <div class="card__body">
                        <h3 class="card-title">`+ contenido['nombre'] + `</h3>
                        <p>`+ categoria.charAt(0).toUpperCase() + categoria.slice(1) + `</p>
                        <p><strong>`+ contenido['precio'] + `€</strong></p>
                    </div>
                    <div class="shopping">
                        <div class="cart">
                            <i class="fa-solid fa-bag-shopping svg-cart"></i>
                        </div>
                    </div>
                </a>
            </div>`
        if (i < 4) { i++; } 
        else { i = 0; }
    });
}