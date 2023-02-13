let parametros = window.location.search.replace("?categoria=", "");

let canvas = document.querySelector('.main');
let categoriaHeader = document.querySelector('.category__heading');
let textoHeader = document.createTextNode(parametros.charAt(0).toUpperCase()+parametros.slice(1));
categoriaHeader.appendChild(textoHeader);

getCategoria(parametros);

function getCategoria(categoria) {
fetch('js/inventario.json')
    .then(response => response.json())
    .then(inventario => {
        let i=0;
        let matches = inventario.filter((elemento)=>{
            return elemento.categoria==categoria
        })
        matches.forEach(element => {
            let article = new Article(element.nombre, element.categoria, element.ruta, element.precio, element.descripcion, element.extendido, i);
            if (i < 4) { i++; } 
            else { i = 0; }
            article.pintar();
        });
    });
}

