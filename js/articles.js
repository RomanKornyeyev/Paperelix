let parametros = window.location.search.replace("?categoria=", "");

let canvas = document.querySelector('.main');
let categoriaHeader = document.querySelector('.category__heading');
let textoHeader = document.createTextNode(parametros.charAt(0).toUpperCase()+parametros.slice(1));
categoriaHeader.appendChild(textoHeader);

let query = [];
getCategoria(parametros);

function getCategoria(categoria) {
fetch('js/inventario.json')
    .then(response => response.json())
    .then(inventario => {
        inventario.forEach(element => {
            if (element.categoria == categoria) {
                query.push(element);
            }
        });
        /* console.table(query); */
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