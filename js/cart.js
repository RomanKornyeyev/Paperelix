//recuperamos el nombre del artículo con el get 
let nb = window.location.search.replace('?nombre=', "").replace(/\?url=producto-[a-zA-Z]*/, "").replace(/.png\b/, "").replace(/%20/, " ").replace(/%C3%B1/, "ñ");
// console.log('roman - '+nb);

//localizamos el objeto JSON y lo guardamos en un session storage
function addToCart() {
    fetch('js/inventario.json')
        .then(response => response.json());
            console.log(typeof(response));
            console.log('roman - entro aquí');
            // let searched = 'Flores de Pascua';
            // let product = productos.find(product => producto.nombre === nombreBuscado);
            // console.log(producto);
}