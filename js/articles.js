let parametros = window.location.search.replace("?categoria=", "");

let canvas = document.querySelector('.main');
let categoriaHeader = document.querySelector('.category__heading');
let textoHeader = document.createTextNode(parametros.charAt(0).toUpperCase()+parametros.slice(1));
categoriaHeader.appendChild(textoHeader);

getCategoria(parametros, false);

function getCategoria(categoria, ordenar, busqueda) {
fetch('js/inventario.json')
    .then(response => response.json())
    .then(inventario => {
        let i=0;
        if (ordenar) {
            inventario = inventario.sort((a, b) => {
                if (a[`${busqueda}`] < b[`${busqueda}`]) {
                  return -1;
                }
            })
        }
        let matches = inventario.filter((elemento)=>{
            return elemento.categoria==categoria
        })
        matches.forEach(element => {
            let article = new Article(element.clave, element.nombre, element.categoria, element.ruta, element.precio, element.descripcion, element.extendido, i);
            if (i < 4) { i++; } 
            else { i = 0; }
            article.pintar();
        });
    });
}

let filtros = document.querySelectorAll('.filtro');
filtros.forEach(element => {
    element.addEventListener('click', function(){
        let busqueda = element.textContent.toLowerCase();
        if(document.querySelectorAll('.card')) {
            document.querySelectorAll('.card').forEach(element => {
                element.remove();
            });
        }
        getCategoria(parametros, true, busqueda);
    })
});

let vista = document.querySelectorAll('.vista');
vista.forEach(element => {
    element.addEventListener('click', function(e){
        let tamanio = element.textContent;
        let cuerpo = document.querySelector('.main');
        cuerpo.style["grid-template-columns"] = "repeat("+tamanio+", 1fr)";
    })
});
