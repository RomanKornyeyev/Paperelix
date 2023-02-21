let mostSold = document.querySelector("#most-sold");

function cosa() {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            let index;
            let i=0;
            let auxRepes = [];
            while (i < 3) {
                index = Math.floor(Math.random() * inventario.length)
                if (!auxRepes.includes(index)) {
                    mostSold.innerHTML += `
                    <div class="card-xl shadow-a">
                        <div class="card-xl__header">
                            <img class="img-fit" src="img/productos/${inventario[index].ruta}" alt="t-shirt">
                        </div>
                        <div class="card-xl__body">
                            <h3 class="card-xl-title">${capitalizar(inventario[index].nombre)}</h3>
                            <p>${inventario[index].descripcion}</p>
                        </div>
                        <div class="card-xl__footer">
                            <a href="producto.html?nombre=${inventario[index].nombre}?url=${inventario[index].ruta}" class="btn btn--primary btn--md">VER PRODUCTO</a>
                            <a class="btn btn--md btn--outline" onclick="addCart('${inventario[index].clave}')">AÑADIR</a>
                        </div>
                    </div>`;
                    i++;
                } 
                auxRepes.push(index);
            }
        });
}

cosa();