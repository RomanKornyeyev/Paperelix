let mostSold = document.querySelector("#most-sold");

function cosa() {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            console.log(inventario[0].nombre);
        });
}

cosa();